import { Category } from '../models/category.models.js';
import { asyncHandle } from '../utils/asyncHandler.js';
import { getMongoosePaginationOptions } from '../utils/helpers.js';
import {
    uploadFileOnCloudinaryBylocalFilePath,
    deleteFileFromCloudinary,
    getPublicIdFromUrl,
} from '../utils/cloudinary.js';

// Create Category
export const createCategory = asyncHandle(async (req, res) => {
    const { name } = req.body;

    const imageLocalPath = req.files?.image?.[0]?.path;
    if (!imageLocalPath) {
        return res.status(400).json({ message: 'Image field is required' });
    }

    const uploadedImage = await uploadFileOnCloudinaryBylocalFilePath(
        imageLocalPath,
        'categoryImage'
    );
    if (!uploadedImage) {
        return res.status(500).json({ message: 'Failed to upload image' });
    }

    const newCategory = new Category({
        name,
        image: { url: uploadedImage.url },
        owner: req.user._id,
    });

    const category = await newCategory.save();

    return res.status(201).json({
        category,
        message: 'Category created successfully',
    });
});

// Get All Categories (Paginated)
export const getAllCategories = asyncHandle(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const categoryAggregate = Category.aggregate([{ $match: {} }]);

    const categories = await Category.aggregatePaginate(
        categoryAggregate,
        getMongoosePaginationOptions({
            page,
            limit,
            customLabels: {
                totalDocs: 'totalCategories',
                docs: 'categories',
            },
        })
    );

    return res.status(200).json({
        categories,
        message: 'Categories fetched successfully',
    });
});

// Get Category by ID
export const getCategoryById = asyncHandle(async (req, res) => {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId).lean();
    if (!category) {
        return res.status(404).json({ message: 'Category does not exist' });
    }

    return res.status(200).json({
        category,
        message: 'Category fetched successfully',
    });
});

// Update Category
export const updateCategoryById = asyncHandle(async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
        return res.status(404).json({ message: 'Category does not exist' });
    }

    let newImageUrl = category.image?.url;
    const imageLocalPath = req.files?.image?.[0]?.path;

    if (imageLocalPath) {
        const uploadedImage = await uploadFileOnCloudinaryBylocalFilePath(
            imageLocalPath,
            'categoryImage'
        );
        if (uploadedImage) {
            newImageUrl = uploadedImage.url;

            const oldPublicId = getPublicIdFromUrl(category.image?.url);
            if (oldPublicId) await deleteFileFromCloudinary(oldPublicId);
        }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        {
            $set: {
                name,
                owner: req.user._id,
                image: { url: newImageUrl },
            },
        },
        { new: true }
    );

    return res.status(200).json({
        category: updatedCategory,
        message: 'Category updated successfully',
    });
});

// Delete Category
export const deleteCategoryById = asyncHandle(async (req, res) => {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
        return res.status(404).json({ message: 'Category does not exist' });
    }

    const publicId = getPublicIdFromUrl(category.image?.url);
    if (publicId) await deleteFileFromCloudinary(publicId);

    await Category.findByIdAndDelete(categoryId);

    return res.status(200).json({ message: 'Category deleted successfully' });
});
