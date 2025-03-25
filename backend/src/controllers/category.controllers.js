import { Category } from '../models/category.models.js';
import { asyncHandle } from '../utils/asyncHandler.js';
import { getMongoosePaginationOptions } from '../utils/helpers.js';

export const createCategory = asyncHandle(async (req, res) => {
    // get data from user
    const { name } = req.body;

    // create category
    const newcategory = new Category({
        name,
        owner: req.user._id,
    });

    // save in db
    await newcategory.save();

    return res.status(201).json({
        newcategory,
        message: 'Category created successfully',
    });
});

export const getAllCategories = asyncHandle(async (req, res) => {
    const { page = 1, limit = 8 } = req.query;

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
        message: 'Categories get successfully',
    });
});

export const getCategoryById = asyncHandle(async (req, res) => {
    // get category id
    const { categoryId } = req.params;
    // find category in db

    const category = await Category.findById(categoryId);

    if (!category) {
        return res.status(404).json({
            message: 'category is not found',
        });
    }

    return res.status(200).json({
        category,
        message: 'category get successfully',
    });
});

export const updateCategoryById = asyncHandle(async (req, res) => {
    // get categoryid and name of category
    const { categoryId } = req.params;
    const { name } = req.body;

    // check and update category
    const category = await Category.findByIdAndUpdate(
        categoryId,
        {
            $set: {
                name,
            },
        },
        { new: true }
    );

    if (!category) {
        return res.status(404).json({
            message: 'Category does not exist',
        });
    }

    return res.status(200).json({
        category,
        message: 'Category updated successfully',
    });
});

export const deleteCategoryById = asyncHandle(async (req, res) => {
    // get categoryid to delete
    const {categoryId} = req.params;
    // check and delete category
    const category = await Category.findByIdAndDelete(categoryId)

    if(!category){
        return res.status(404).json({
            message: "Category does not exist"
        })
    }

    return res.status(200).json({
        message: "Category deleted successfully"
    })
})