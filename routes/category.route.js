import { Router } from "express"
import { addCategory,getAllCategory,getOneCategory } from "../controllers/category.controller.js"

const categoryRoute = Router()

categoryRoute.post("/add-category",addCategory)
categoryRoute.get("/get-all-list",getAllCategory)
categoryRoute.get("/get-one-category/:cte_id",getOneCategory)

export default categoryRoute