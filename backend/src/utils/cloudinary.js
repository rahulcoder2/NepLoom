import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFileOnCloudinaryBylocalFilePath = async (
    localFilePath,
    folderName
) => {
    try {
        if (!localFilePath) {
            return null;
        }
        // upload file

        const uploadFile = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            folder: `neploom/${folderName}`,
            transformation: [
                {
                    width: 800,
                    height: 800,
                    crop: 'limit',
                    quality: 'auto',
                    fetch_format: 'auto',
                },
            ],
        });

        fs.unlinkSync(localFilePath);

        return uploadFile;
    } catch (error) {
        // remove unuploadfile
        // console.error('Cloudinary upload error:', error);
        fs.unlinkSync(localFilePath);
        return null;
    }
};

// Extract Public ID from Cloudinary URL
export const getPublicIdFromUrl = (imageUrl) => {
    if (!imageUrl) return null; // Return null if the URL is missing

    // Split the URL into parts by '/'
    const parts = imageUrl.split('/');

    // Find the "upload" part and get everything after it
    const uploadIndex = parts.indexOf('upload');

    // If "upload" is not found or there's no path after it, return null
    if (uploadIndex === -1 || uploadIndex + 2 >= parts.length) return null;

    // Extract the public ID by getting everything after "upload" and before the file extension
    const publicIdWithExt = parts.slice(uploadIndex + 2).join('/'); // Get the part after "upload"
    const publicId = publicIdWithExt.split('.')[0]; // Remove file extension

    return publicId;
};

// Delete Image from Cloudinary
export const deleteFileFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return 'Public ID is required to delete the image';
        return await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        return 'Error deleting image from Cloudinary';
    }
};
