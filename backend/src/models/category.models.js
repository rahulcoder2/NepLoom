import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const { Schema, model } = mongoose;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            trim: true,
            unique: true, 
            index: true,
        },
        description: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

// Pagination plugin
categorySchema.plugin(mongooseAggregatePaginate);

export const Category = model('Category', categorySchema);
