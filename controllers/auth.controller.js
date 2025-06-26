import User from "../models/user.model.js"
import { handleError } from "../helpers/handleError.js"
import  jwt  from "jsonwebtoken"

export const register = async (req, res,next) => {
    try {
        const { firstName, lastName, phone, email, password} = req.body
        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            // If user exists, return error
            return next(handleError(400, "Email đã được sử dụng"))
        }
        // Create new user
        const newUser = new User({
            firstName,
            lastName,   
            phone,
            email,
            password
        })

        await newUser.save()

        return res.status(201).json({ message: "Đăng ký thành công" })
    } catch (error) {
        console.error("Registration error:", error)
        return res.status(500).json({ message: "Lỗi máy chủ nội bộ" })
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        // Check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return next(handleError(400, "Email không tồn tại"))
        }
        // Check password
        const isMatch = await user.comparePassword(password)
        
        // Create token
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar
        }, process.env.JWT_SECRET)

        // Save cookies access token
        res.cookie("access-token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            path: "/"  
        })

        if (!isMatch) {
            return next(handleError(400, "Mật khẩu không đúng"))
        }

        const newUser = user.toObject({getters: true})
        delete newUser.password
        // Return success response
        return res.status(200).json({ message: "Đăng nhập thành công", newUser })
    } catch (error) {
        console.error("Login error:", error)
        return next(handleError(500, "Lỗi máy chủ nội bộ"))
    }
}

export const googleLogin = async(req,res) =>{
    try{
        const { name, email, avatar } = req.body

     // Check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            const password = Math.round(Math.random() * 10000000)
            const newuser = new User({
                name,
                email,
                avatar,
                password
            })
        }
        
        // Create token
        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar
        }, process.env.JWT_SECRET)

        // Save cookies access token
        res.cookie("access-token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            path: "/"  
        })

        const newUser = user.toObject({getters: true})
        delete newUser.password
        // Return success response
        return res.status(200).json({ message: "Đăng nhập thành công", newUser })
    } catch (error) {
        console.error("Login error:", error)
        return next(handleError(500, "Lỗi máy chủ nội bộ"))
    }
}