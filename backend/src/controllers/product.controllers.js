import { asyncHandle } from '../utils/asyncHandler.js';
import { Category } from '../models/category.models.js';
import { Product } from '../models/product.models.js';
import {
    uploadFileOnCloudinaryBylocalFilePath,
    deleteFileFromCloudinary,
    getPublicIdFromUrl,
} from '../utils/cloudinary.js';
import { getMongoosePaginationOptions } from '../utils/helpers.js';
import mongoose from 'mongoose';

// ✅ Create Product
export const createProduct = asyncHandle(async (req, res) => {
    const { name, description, category, price, stock, size, discountPrice } =
        req.body;

    // Validate category
    const categoryToAdded = await Category.findById(category);
    if (!categoryToAdded) {
        return res.status(404).json({ message: 'Category does not exist' });
    }

    // Validate image upload
    const imageLocalPath = req.files?.image?.[0]?.path;
    if (!imageLocalPath) {
        return res.status(400).json({ message: 'Image field is required' });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadFileOnCloudinaryBylocalFilePath(
        imageLocalPath,
        'productImage'
    );
    if (!uploadedImage) {
        return res.status(400).json({ message: 'Failed to upload image' });
    }

    // Create product
    const owner = req.user?._id;
    const newProduct = new Product({
        name,
        description,
        category,
        categoryName: categoryToAdded.name,
        price,
        image: { url: uploadedImage.url },
        owner,
        stock,
        size: size || [],
        discountPrice: discountPrice || 0, 
    });

    const product = await newProduct.save();
    if (!product) {
        return res.status(500).json({ message: 'Failed to create product' });
    }

    return res
        .status(201)
        .json({ product, message: 'Product created successfully' });
});

// ✅ Get All Product
export const getAllProducts = asyncHandle(async (req, res) => {
    const { page = 1, limit = 12 } = req.query;

    const productAggregate = Product.aggregate([{ $match: {} }]);

    const products = await Product.aggregatePaginate(
        productAggregate,
        getMongoosePaginationOptions({
            page,
            limit,
            customLabels: {
                totalDocs: 'totalProducts',
                docs: 'products',
            },
        })
    );

    return res.status(200).json({
        products,
        message: 'Products fetched successfully',
    });
});

// ✅ Get Product ById
export const getProductById = asyncHandle(async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({
            product,
            message: 'Product does not exist.',
        });
    }

    return res.status(200).json({
        product,
        message: 'Product fetch successfully',
    });
});

// ✅ Get All Product By Category
export const getProductsByCategory = asyncHandle(async (req, res) => {
    const { page = 1, limit = 8 } = req.query;
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId).select('name _id');

    if (!category) {
        return res.status(404).json({ message: 'Category does not exist' });
    }

    const productAggregate = Product.aggregate([
        {
            // match the products with provided category
            $match: {
                category: new mongoose.Types.ObjectId(categoryId),
            },
        },
    ]);

    const products = await Product.aggregatePaginate(
        productAggregate,
        getMongoosePaginationOptions({
            page,
            limit,
            customLabels: {
                totalDocs: 'totalProducts',
                docs: 'products',
            },
        })
    );

    return res.status(200).json({
        products,
        category,
        message: 'Category products fetched successfully',
    });
});

// ✅ Update Product
export const updateProduct = asyncHandle(async (req, res) => {
    const { productId } = req.params;
    const { name, description, stock, price, discountPrice, category, size } = req.body;

    // Find existing product
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product does not exist' });
    }

    let categoryNameToUse = product.categoryName;
    if (category) {
        const categoryToUpdate = await Category.findById(category);
        if (categoryToUpdate) {
            categoryNameToUse = categoryToUpdate.name;
        } else {
            return res.status(404).json({ message: 'Category does not exist' });
        }
    }

    // Handle image update
    let newImageUrl = product.image.url; // Keep old image by default
    const imageLocalPath = req.files?.image?.[0]?.path;

    if (imageLocalPath) {
        // Upload new image
        const uploadedImage = await uploadFileOnCloudinaryBylocalFilePath(
            imageLocalPath,
            'productImage'
        );
        if (uploadedImage) {
            newImageUrl = uploadedImage.url;

            // Delete old image
            const publicId = getPublicIdFromUrl(product.image.url);
            if (publicId) await deleteFileFromCloudinary(publicId);
        }
    }

    // Update product details
    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            $set: {
                name,
                description,
                stock,
                price,
                category,
                categoryName: categoryNameToUse,
                image: { url: newImageUrl },
                size: size || product.size,
                discountPrice:
                    discountPrice !== undefined
                        ? discountPrice
                        : product.discountPrice,
            },
        },
        { new: true }
    );

    return res.status(200).json({
        product: updatedProduct,
        message: 'Product updated successfully',
    });
});

// ✅ Delete Product
export const deleteProduct = asyncHandle(async (req, res) => {
    const { productId } = req.params;

    // Find product before deleting
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product does not exist' });
    }

    // Delete product image from Cloudinary
    const publicId = getPublicIdFromUrl(product.image.url);
    if (publicId) await deleteFileFromCloudinary(publicId);

    // Delete product from database
    await Product.findByIdAndDelete(productId);

    return res.status(200).json({ message: 'Product deleted successfully' });
});
