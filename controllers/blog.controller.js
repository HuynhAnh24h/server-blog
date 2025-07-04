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

export const getBlogBySlug = async (req,res,next)=>{
    try{
        const {slug} = req.params
        const response = await Blog.findOne({slug})
        if(!response){
            return next(401,"Không tìm thấy bài viết")
        }
        return res.status(200).json({
            success: true,
            data: response
        })
    }catch(error){
        return next(handleError(500, "Lỗi máy chủ nội bộ"))
    }
}

export const getAllBlog = async (req,res,next)=>{
  try{
    const response = await Blog.find()
    if(response.length === 0){
      return res.status(400).json({success: false, message: "Không có dữ liệu"})
    }
    return res.status(200).json({
      success: true,
      data: response
    })
  }catch(error){
    console.log("Log Error:", error.message)
    next(handleError(500,"Lỗi máy chủ nội bộ"))
  }
}

export const getBlogByCategory = async (req,res,next) =>{
    try{
        const {cte_id} = req.params
        const response = await Blog.find({ category: cte_id }).populate("category")
        if(response){
            return res.status(200).json({
                success: true,
                data: response
            })
        }
        return next(handleError(401, "Không thể lấy danh mục bài viết"))

    }catch(error){
        return next(handleError(500, "Lỗi máy chủ nội bộ"))
    }
}