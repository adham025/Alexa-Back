import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, HME, myMulter } from "../../services/multer.js";
import { endPoints } from "./category.endPoint.js";
import * as categoryController from "./controller/category.controller.js"
const router = Router()


router.post("/add", auth(endPoints.addCategory), myMulter(fileValidation.image).single("image"), HME, categoryController.addCategory)
router.get("/all", categoryController.categories)
router.get("/:categoryId", categoryController.getCategoryById)
router.put("/update/:id", auth(endPoints.updateCategory), myMulter(fileValidation.image).single("image"), HME, categoryController.updateCategory)



export default router