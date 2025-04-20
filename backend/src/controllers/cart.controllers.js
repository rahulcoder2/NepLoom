import { Cart } from '../models/cart.models.js';
import { Product } from '../models/product.models.js';
import { asyncHandle } from '../utils/asyncHandler.js';

const getCart = async (userId) => {
    const cartAggregation = await Cart.aggregate([
        { $match: { owner: userId } },
        { $unwind: '$items' },
        {
            $lookup: {
                from: 'products',
                localField: 'items.productId',
                foreignField: '_id',
                as: 'product',
            },
        },
        {
            $project: {
                product: { $first: '$product' },
                quantity: '$items.quantity',
                coupon: 1,
            },
        },
        {
            $group: {
                _id: '$_id',
                items: { $push: '$$ROOT' },
                coupon: { $first: '$coupon' },
                cartTotal: {
                    $sum: { $multiply: ['$product.price', '$quantity'] },
                },
            },
        },
        {
            $lookup: {
                from: 'coupons',
                localField: 'coupon',
                foreignField: '_id',
                as: 'coupon',
            },
        },
        { $addFields: { coupon: { $first: '$coupon' } } },
        {
            $addFields: {
                discountedTotal: {
                    $ifNull: [
                        {
                            $subtract: ['$cartTotal', '$coupon.discountValue'],
                        },
                        '$cartTotal',
                    ],
                },
            },
        },
    ]);

    return (
        cartAggregation[0] ?? {
            _id: null,
            items: [],
            cartTotal: 0,
            discountedTotal: 0,
        }
    );
};

export const addItemOrUpdateItemQuantity = asyncHandle(async (req, res) => {
    const { productId } = req.params;
    const { quantity = 1 } = req.body;

    let cart = await Cart.findOne({ owner: req.user._id });

    if (!cart) {
        cart = await Cart.create({ owner: req.user._id, items: [] });
    }

    const product = await Product.findById(productId);
    if (!product)
        return res.status(404).json({ message: 'Product does not exist' });
    if (quantity > product.stock)
        return res.status(400).json({
            message:
                product.stock > 0
                    ? `Only ${product.stock} products are remaining. But you are adding ${quantity}`
                    : 'Product is out of stock',
        });

    const addedProduct = cart.items?.find(
        (item) => item.productId.toString() === productId
    );

    if (addedProduct) {
        addedProduct.quantity = quantity;
        if (cart.coupon) cart.coupon = null;
    } else {
        cart.items.push({ productId, quantity });
    }

    await cart.save({ validateBeforeSave: true });
    const newCart = await getCart(req.user._id);

    res.status(200).json({ newCart, message: 'Item added successfully' });
});

export const getUserCart = asyncHandle(async (req, res) => {
    const cart = await getCart(req.user._id);
    res.status(200).json({ cart, message: 'Cart fetched successfully' });
});

export const removeItemFromCart = asyncHandle(async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product)
        return res.status(404).json({ message: 'Product does not exist' });

    const updatedCart = await Cart.findOneAndUpdate(
        { owner: req.user._id },
        { $pull: { items: { productId: productId } } },
        { new: true }
    );
    let cart = await getCart(req.user._id);

    if (cart.coupon && cart.cartTotal < cart.coupon.minimumCartValue) {
        updatedCart.coupon = null;
        await updatedCart.save({ validateBeforeSave: false });
        cart = await getCart(req.user._id);
    }

    res.status(200).json({
        cart,
        message: 'Cart item removed successfully',
    });
});

export const clearCart = asyncHandle(async (req, res) => {
    await Cart.findOneAndUpdate(
        { owner: req.user._id },
        { $set: { items: [], coupon: null } },
        { new: true }
    );
    const cart = await getCart(req.user._id);
    res.status(200).json({ cart, message: 'Cart has been cleared' });
});
