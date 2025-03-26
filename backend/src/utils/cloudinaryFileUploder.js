import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFileOnCloudinaryBylocalFilePath = async (
    localFilePath,
    folder
) => {
    try {
        if (!localFilePath) {
            return null;
        }
        // upload file

        const uploadFile = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            folder: `neploom/${folder}`,
            transformation: [
                {
                    width: 800,
                    height: 800,
                    crop: 'limit',
                    quality: 'auto',
                    fetch_format: 'auto',
                },
                {
                    width: 500,
                    height: 500,
                    crop: 'limit',
                    quality: 'auto',
                    fetch_format: 'auto',
                    dpr: 'auto',
                },
            ],
        });

        fs.unlinkSync(localFilePath);
        
        return uploadFile;
    } catch (error) {
        // remove unuploadfile
        console.error('Cloudinary upload error:', error);
        fs.unlinkSync(localFilePath);
        return null;
    }
};
