import { asyncHandle } from '../utils/asyncHandler.js';
import { Category } from '../models/category.models.js';
import { uploadFileOnCloudinaryBylocalFilePath } from '../utils/cloudinaryFileUploder.js';
import { Product } from '../models/product.models.js';

export const createProduct = asyncHandle(async (req, res) => {
    // get data from create product form
    const { title, description, category, price, stock } = req.body();

    // find category and added or not
    const categoryToAdded = await Category.findById(categories);

    if (!categoryToAdded) {
        return res.status(404).json({
            message: 'Category does not exist',
        });
    }

    // get product image from local path and check
    const imageLocalPath = req.files?.image[0]?.path;
    if (!imageLocalPath) {
        return res.status(400).json({
            message: 'Image field is required',
        });
    }

    // upload localImage on sdk cdn and check
    const image = await uploadFileOnCloudinaryBylocalFilePath(
        imageLocalPath,
        productImage
    );

    if (!image) {
        return res.status(400).json({
            message: 'Image is required',
        });
    }
    // req user
    const owner = req.user?._id;

    // create product, save and check
    const newProduct = new Product({
        title,
        description,
        category,
        price,
        image: {
            url: image.url,
        },
        owner,
        stock,
    });

    await newProduct.save();

    if (!newProduct) {
        return res.status(500).json({
            message: 'Something went wrong while creating the new product',
        });
    }

    return res.status(201).json({
        newProduct,
        message: 'Product created successfully',
    });
});

export const updateProduct = asyncHandle(async (req, res) => {
    
})