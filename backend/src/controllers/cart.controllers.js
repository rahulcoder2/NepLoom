import { Cart } from '../../../models/apps/ecommerce/cart.models.js';
import { Coupon } from '../../../models/apps/ecommerce/coupon.models.js';
import { Product } from '../../../models/apps/ecommerce/product.models.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';

const getUserCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ owner: req.user._id })
        .populate({ path: 'items.productId' })
        .populate('coupon');

    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    let cartTotal = 0;
    cart.items.forEach((item) => {
        cartTotal += item.productId.price * item.quantity;
    });

    let discountedTotal = cartTotal;
    if (cart.coupon) {
        discountedTotal = cartTotal - cart.coupon.discountValue;
    }

    const cartWithTotals = {
        _id: cart._id,
        items: cart.items.map((item) => ({
            _id: item._id,
            product: item.productId,
            quantity: item.quantity,
        })),
        cartTotal,
        discountedTotal,
        coupon: cart.coupon,
    };

    return res.status(200).json({
        data: cartWithTotals,
        message: 'Cart fetched successfully',
    });
});

const addItemOrUpdateItemQuantity = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { quantity = 1 } = req.body;

    const cart = await Cart.findOne({ owner: req.user._id });

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({ message: 'Product does not exist' });
    }

    if (quantity > product.stock) {
        return res.status(400).json({
            message:
                product.stock > 0
                    ? 'Only ' +
                      product.stock +
                      ' products are remaining. But you are adding ' +
                      quantity
                    : 'Product is out of stock',
        });
    }

    const addedProduct = cart.items?.find(
        (item) => item.productId.toString() === productId
    );

    if (addedProduct) {
        addedProduct.quantity = quantity;
        if (cart.coupon) {
            cart.coupon = null;
        }
    } else {
        cart.items.push({
            productId,
            quantity,
        });
    }

    await cart.save({ validateBeforeSave: true });

    const updatedCart = await Cart.findOne({ owner: req.user._id })
        .populate({ path: 'items.productId' })
        .populate('coupon');

    let cartTotal = 0;
    updatedCart.items.forEach((item) => {
        cartTotal += item.productId.price * item.quantity;
    });

    let discountedTotal = cartTotal;
    if (updatedCart.coupon) {
        discountedTotal = cartTotal - updatedCart.coupon.discountValue;
    }

    const cartWithTotals = {
        _id: updatedCart._id,
        items: updatedCart.items.map((item) => ({
            _id: item._id,
            product: item.productId,
            quantity: item.quantity,
        })),
        cartTotal,
        discountedTotal,
        coupon: updatedCart.coupon,
    };

    return res.status(200).json({
        data: cartWithTotals,
        message: 'Item added successfully',
    });
});

const removeItemFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({ message: 'Product does not exist' });
    }

    const updatedCart = await Cart.findOneAndUpdate(
        {
            owner: req.user._id,
        },
        {
            $pull: {
                items: {
                    productId: productId,
                },
            },
        },
        { new: true }
    )
        .populate({ path: 'items.productId' })
        .populate('coupon');

    let cartTotal = 0;
    updatedCart.items.forEach((item) => {
        cartTotal += item.productId.price * item.quantity;
    });

    let discountedTotal = cartTotal;
    if (updatedCart.coupon) {
        discountedTotal = cartTotal - updatedCart.coupon.discountValue;
    }

    if (updatedCart.coupon && cartTotal < updatedCart.coupon.minimumCartValue) {
        updatedCart.coupon = null;
        await updatedCart.save({ validateBeforeSave: false });
        const recalculatedCart = await Cart.findOne({ owner: req.user._id })
            .populate({ path: 'items.productId' })
            .populate('coupon');
        updatedCart = recalculatedCart;
        cartTotal = 0;
        updatedCart.items.forEach((item) => {
            cartTotal += item.productId.price * item.quantity;
        });

        discountedTotal = cartTotal;
        if (updatedCart.coupon) {
            discountedTotal = cartTotal - updatedCart.coupon.discountValue;
        }
    }

    const cartWithTotals = {
        _id: updatedCart._id,
        items: updatedCart.items.map((item) => ({
            _id: item._id,
            product: item.productId,
            quantity: item.quantity,
        })),
        cartTotal,
        discountedTotal,
        coupon: updatedCart.coupon,
    };

    return res.status(200).json({
        data: cartWithTotals,
        message: 'Cart item removed successfully',
    });
});

const clearCart = asyncHandler(async (req, res) => {
    await Cart.findOneAndUpdate(
        {
            owner: req.user._id,
        },
        {
            $set: {
                items: [],
                coupon: null,
            },
        },
        { new: true }
    );
    const cart = await Cart.findOne({ owner: req.user._id })
        .populate({ path: 'items.productId' })
        .populate('coupon');

    let cartTotal = 0;
    cart.items.forEach((item) => {
        cartTotal += item.productId.price * item.quantity;
    });

    let discountedTotal = cartTotal;
    if (cart.coupon) {
        discountedTotal = cartTotal - cart.coupon.discountValue;
    }

    const cartWithTotals = {
        _id: cart._id,
        items: cart.items.map((item) => ({
            _id: item._id,
            product: item.productId,
            quantity: item.quantity,
        })),
        cartTotal,
        discountedTotal,
        coupon: cart.coupon,
    };

    return res.status(200).json({
        data: cartWithTotals,
        message: 'Cart has been cleared',
    });
});

export {
    getUserCart,
    addItemOrUpdateItemQuantity,
    removeItemFromCart,
    clearCart,
};
