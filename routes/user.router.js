import { Router } from "express"
import { updateUser } from "../controllers/user.controller.js"
import uploadMulter from "../configs/multer.js"

const userRouter = Router()

userRouter.put("/update-user/:id",uploadMulter.single('avatar'),updateUser)

export default userRouter