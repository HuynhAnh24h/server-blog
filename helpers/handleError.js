import multer from "multer";
export const handleError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.message = message;
    return error;
}

export const errorHandlerClient = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Đã xảy ra lỗi";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        // Nếu muốn debug chi tiết hơn, bạn có thể thêm:
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};
export function multerErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError || err.message === 'Only images are allowed') {
    return res.status(400).json({ error: err.message });
  }
  next(err); // lỗi khác thì tiếp tục để error handler chính xử lý
}
