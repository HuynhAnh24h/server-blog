import User from "../models/user.model.js";
import { handleError } from "../helpers/handleError.js"

export const updateUser = async (req, res, next) => {
  try {
    // const {
    //   firstName, lastName, phone, address,
    //   email, name, password, avatar, bio
    // } = req.body;

    // const {userId} = req.params

    // const user = await User.findById({_id:userId});
    // if (!user) return next(handleError(401, "Không tìm thấy user"));

    // // Cập nhật các field nếu có
    // if (firstName) user.firstName = firstName;
    // if (lastName) user.lastName = lastName;
    // if (phone) user.phone = phone;
    // if (address) user.address = address;
    // if (email) user.email = email;
    // if (name) user.name = name;
    // if (avatar) user.avatar = avatar;
    // if (bio) user.bio = bio;
    // if (password) user.password = password; // sẽ được hash trong pre-save hook

    // await user.save(); // lúc này password sẽ được hash nếu thay đổi
    // const response = user.toObject({ getters: true })
    // delete response.password
    // return res.status(200).json({
    //   success: true,
    //   message: "Cập nhật user thành công",
    //   data: response,
    // });
    console.log(req.body)
  } catch (error) {
    return next(handleError(500, "Lỗi máy chủ nội bộ"));
  }
};