import multer from "multer";

function fileFilter(req, file, cb) {
  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error('Only images are allowed'), false);
  } else {
    cb(null, true);
  }
}

const uploadMulter = multer({
  storage: multer.memoryStorage(), // 👉 DÙNG memoryStorage
  fileFilter,
});

export default uploadMulter;
