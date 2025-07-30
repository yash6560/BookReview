const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');
const multer = require('multer');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'BookReviews_uploads',  // Folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // Allowed file formats
  },
});

const upload = multer({ storage });

module.exports = upload;