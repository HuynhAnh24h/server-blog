import { createBlog } from "../controllers/blog.controller.js"
import { Router } from "express"

const blogRouter = Router()

blogRouter.post('/create-blog',createBlog)

export default blogRouter