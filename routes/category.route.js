import { Router } from "express"
import { addCategory,getAllCategory,getOneCategory,deleteCategory,updateCategory } from "../controllers/category.controller.js"

const categoryRoute = Router()

categoryRoute.post("/add-category",addCategory)
categoryRoute.get("/get-all-list",getAllCategory)
categoryRoute.get("/get-one-category/:cte_id",getOneCategory)
categoryRoute.put("/update-caterogy/:cte_id",updateCategory)
categoryRoute.delete("/delete-caterogy/:cte_id",deleteCategory)

export default categoryRoute