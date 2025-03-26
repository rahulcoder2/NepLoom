import mongoose from "mongoose";

/**
 *
 * @param {{page: number; limit: number; customLabels: mongoose.CustomLabels;}} options
 * @returns {mongoose.PaginateOptions}
 */
export const getMongoosePaginationOptions = ({
    page = 1,
    limit = 10,
    customLabels,
}) => {
    return {
        page: Math.max(page, 1),
        limit: Math.max(limit, 1),
        pagination: true,
        customLabels: {
            pagingCounter: 'serialNumberStartFrom',
            ...customLabels,
        },
    };
};

/**
 * Generates a random number between 0 (inclusive) and a specified maximum value (exclusive).
 * 
 * @param {number|string} max - The upper bound (exclusive) for the random number. It can be either a number or a string that can be converted to a number.
 * @returns {number} A random number between 0 (inclusive) and `max` (exclusive).
 */
export const getRandomNumber = (max) => {
    return (Math.random() * max);
}
