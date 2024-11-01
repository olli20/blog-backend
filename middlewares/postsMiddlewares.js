import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../configs/cloudinaryConfig.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'images', 
    allowedFormats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });
export default upload;