import multer from 'multer';
import path from 'path';
import os from 'os';

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir()); // Use the system's temporary directory
  },
  filename: function (req, file, cb) {
    // Create a unique filename to avoid collisions
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Set up file size limits
const fileFilter = (req, file, cb) => {
  // Accept all file types
  cb(null, true);
};

// Create the multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB size limit
    files: 5 // Maximum 5 files
  },
  fileFilter: fileFilter
});

export default upload; 