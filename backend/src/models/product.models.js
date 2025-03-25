import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const productSchema = new Schema(
    {
        name: {
            type: String,
            require: [true, 'Product name is required'],
            trim: true,
            maxLength: [100, 'Product name cannot exceed 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            maxLength: [2000, 'Product name cannot exceed 2000 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
            min: [0, 'Price must be non-negative'],
        },
        discountPrice: {
            type: Number,
            required: [true, 'Please add a discountPrice'],
            min: [0, 'Price must be non-negative'],
        },
        stock: {
            type: Number,
            min: [0, 'Stock must be non-negative'],
            default: 0,
        },
        mainImage: {
            required: true,
            type: {
                url: String,
                localPath: String,
            },
        },
        subImages: {
            type: [
                {
                    url: String,
                    localPath: String,
                },
            ],
            default: [],
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        ratings: {
            type: Number,
            default: 0,
            min: [0, 'Rating must be at least 0'],
            max: [5, 'Rating cannot be more than 5'],
        },

    },
    { timestamps: true }
);

export const Product = model('Product', productSchema);
