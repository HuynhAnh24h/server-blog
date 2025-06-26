import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { handleError } from "../helpers/handleError.js";

const userSchema = new mongoose.Schema({
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    phone: { type: String, unique: true, trim: true },
    address: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    name: {type: String, trim:true},
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user', trim:true },
    avatar: { type: String, default: 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png' },
    bio: { type: String, default: 'This is my bio', trim: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
            return next(handleError(500, "Lỗi khi mã hóa mật khẩu"));
        }
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {  
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw handleError(500, "Lỗi khi so sánh mật khẩu"); 
    }
};

const User = mongoose.model('User', userSchema);

export default User;