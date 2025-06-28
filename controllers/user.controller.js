import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import User from '../models/user.model.js';
import { handleError } from '../helpers/handleError.js';

const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'users',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

export const updateUser = async (req, res, next) => {
  try {
  const userId = req.params.id;
  const data = req.body;

  const user = await User.findById(userId);
  if (!user) return next(handleError(404, 'Người dùng không tồn tại'));

  // So sánh mật khẩu nếu có
  if (data.password) {
    if (data.password !== data.confirmPassword) {
      return next(handleError(400, 'Mật khẩu xác nhận không khớp'));
    }
    user.password = data.password; // Model tự hash
  }

  // Cập nhật các field nếu có
  const fields = ['firstName', 'lastName', 'address', 'bio', 'phone', 'email'];
  fields.forEach((field) => {
    if (data[field]) user[field] = data[field];
  });

  // Upload avatar nếu có
  if (req.file?.buffer) {
    try {
      const { secure_url } = await uploadToCloudinary(req.file.buffer);
      user.avatar = secure_url;
    } catch (err) {
      return next(handleError(500, 'Tải ảnh lên Cloudinary thất bại'));
    }
  }

  await user.save();

  const updateUser = user.toObject({ getters: true });
  delete updateUser.password;

  res.status(200).json({
    message: 'Cập nhật người dùng thành công',
    data: updateUser,
  });
} catch (error) {
  next(handleError(500, 'Lỗi máy chủ nội bộ'));
}

};