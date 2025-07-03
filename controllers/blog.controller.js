import { handleError } from "../helpers/handleError.js";
import Blog from "../models/blog.model.js";

export const createBlog = async (req, res, next) => {
    try {
        const {
            title,
            slug,
            content,
            category,
            author,
        } = req.body
        const existed = await Blog.findOne({ $or: [{ title }, { slug }] })
        if (existed) {
            return next(handleError(401, "Trùng tên và đường dẫn"))
        }
        const blog = await Blog.create({ title, slug, content, category, author });
        if(!blog){
            return next(handleError(402,"Tạo blog không thành công"))
        }

        return res.status(200).json({
            success: true,
            message: "Tạo bài viết thành công",
            data: blog
        })

    } catch (error) {
        console.log("Error Detail", error.message)
        return next(handleError(500, "Lỗi máy chủ nội bộ"))
    }
}