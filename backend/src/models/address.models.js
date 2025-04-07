import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const addressSchema = new Schema(
    {
        addressLine1: {
            required: true,
            type: String,
        },
        addressLine2: {
            type: String,
        },
        city: {
            required: true,
            type: String,
        },
        province: {
            required: true,
            type: String,
        },
        pincode: {
            required: true,
            type: String,
        },
        country: {
            required: true,
            type: String,
            default: 'Nepal',
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

addressSchema.plugin(mongooseAggregatePaginate);

export const Address = mongoose.model('Address', addressSchema);
