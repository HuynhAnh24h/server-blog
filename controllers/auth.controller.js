import User from "../models/user.model.js"
import { handleError } from "../helpers/handleError.js";

export const register = async (req, res,next) => {
    try {
        const { firstName, lastName, phone, email, password,address } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // If user exists, return error
            return next(handleError(400, "Email đã được sử dụng"));
        }
        // Create new user
        const newUser = new User({
            firstName,
            lastName,   
            phone,
            email,
            address,
            password
        });

        await newUser.save();

        return res.status(201).json({ message: "Đăng ký thành công" });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return next(handleError(400, "Email không tồn tại"));
        }
        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next(handleError(400, "Mật khẩu không đúng"));
        }
        // Return success response
        return res.status(200).json({ message: "Đăng nhập thành công", user });
    } catch (error) {
        console.error("Login error:", error);
        return next(handleError(500, "Lỗi máy chủ nội bộ"));
    }
}