import { Address } from '../models/address.models.js';
import { asyncHandle } from '../utils/asyncHandler.js';
import { getMongoosePaginationOptions } from '../utils/helpers.js';

// Create Address
export const createAddress = asyncHandle(async (req, res) => {
    const { addressLine1, addressLine2, city, province, pincode, country } =
        req.body;

    const newAddress = new Address({
        addressLine1,
        addressLine2,
        city,
        province,
        pincode,
        country,
        owner: req.user._id,
    });

    const address = await newAddress.save();

    if (!address) {
        return res.status(500).json({ message: 'Failed to create address' });
    }

    return res
        .status(201)
        .json({ address, message: 'Address created successfully' });
});

// Get All Addresses for User
export const getAllAddresses = asyncHandle(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const addressAggregate = Address.aggregate([
        { $match: { owner: req.user._id } },
    ]);

    const addresses = await Address.aggregatePaginate(
        addressAggregate,
        getMongoosePaginationOptions({
            page,
            limit,
            customLabels: {
                totalDocs: 'totalAddresses',
                docs: 'addresses',
            },
        })
    );

    return res
        .status(200)
        .json({ addresses, message: 'Addresses fetched successfully' });
});

// Get Address by ID
export const getAddressById = asyncHandle(async (req, res) => {
    const { addressId } = req.params;

    const address = await Address.findById(addressId);

    if (!address) {
        return res.status(404).json({ message: 'Address not found' });
    }

    return res
        .status(200)
        .json({ address, message: 'Address fetched successfully' });
});

// Update Address
export const updateAddress = asyncHandle(async (req, res) => {
    const { addressId } = req.params;
    const { addressLine1, addressLine2, city, province, pincode, country } =
        req.body;

    const updatedAddress = await Address.findByIdAndUpdate(
        addressId,
        {
            $set: {
                addressLine1,
                addressLine2,
                city,
                province,
                pincode,
                country,
            },
        },
        { new: true }
    );

    if (!updatedAddress) {
        return res.status(404).json({ message: 'Address not found' });
    }

    return res
        .status(200)
        .json({
            address: updatedAddress,
            message: 'Address updated successfully',
        });
});

// Delete Address
export const deleteAddress = asyncHandle(async (req, res) => {
    const { addressId } = req.params;

    const deletedAddress = await Address.findByIdAndDelete(addressId);

    if (!deletedAddress) {
        return res.status(404).json({ message: 'Address not found' });
    }

    return res.status(200).json({ message: 'Address deleted successfully' });
});
