import multer from 'multer';
import { getRandomNumber } from '../utils/helpers.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/temp');
    },
    filename: (req, file, cb) => {
        let getFileExtension = '';
        if (file.originalname.split('.').length > 1) {
            getFileExtension = file.originalname.substring(
                file.originalname.lastIndexOf('.')
            );
        }

        const getFileNameWithoutExtension = file.originalname
            .toLowerCase()
            .split(' ')
            .join('-')
            ?.split('.')[0];
        cb(
            null,
            getFileNameWithoutExtension +
                Date.now() +
                Math.ceil(getRandomNumber(1e5)) +
                getFileExtension
        );
    },
});

// Middleware responsible to read form data and upload the File object to the mentioned path
export const upload = multer({
    storage,
    limits: {
        fileSize: 1 * 1000 * 1000,
    },
});
