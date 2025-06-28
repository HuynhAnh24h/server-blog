import multer from "multer";
export const handleError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.message = message;
    return error;
}

export function multerErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError || err.message === 'Only images are allowed') {
    return res.status(400).json({ error: err.message });
  }
  next(err); // lỗi khác thì tiếp tục để error handler chính xử lý
}
