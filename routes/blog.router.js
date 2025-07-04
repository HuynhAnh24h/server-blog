import { createBlog,getBlogBySlug,getAllBlog,getBlogByCategory } from "../controllers/blog.controller.js"
import { Router } from "express"

const blogRouter = Router()

blogRouter.post('/create-blog',createBlog)
blogRouter.get('/get-blog/:slug',getBlogBySlug)
blogRouter.get('/get-all-blog',getAllBlog)
blogRouter.get('/get-blog-by-category-id/:cte_id',getBlogByCategory)

export default blogRouter