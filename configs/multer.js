import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

function fileFilter(req, file, cb) {
  const allowedFile = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
  if (!allowedFile.includes(file.mimetype)) {
    cb(new Error('Only images are allowed'), false);
  } else {
    cb(null, true);
  }
}

const uploadMulter = multer({ storage: storage, fileFilter: fileFilter });

export default uploadMulter