import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, HME, myMulter } from "../../services/multer.js";
import { endPoints } from "./brand.endPoint.js";
import * as brandController from "./controller/brand.controller.js";
const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Brand Module" });
});
router.get("/all", brandController.brands);
router.post(
  "/add",
  auth(endPoints.createBrand),
  myMulter(fileValidation.image).single("image", HME),
  brandController.addBrand
);
router.put(
  "/:brandId",
  auth(endPoints.updateBrand),
  myMulter(fileValidation.image).single("image", HME),
  brandController.updateBrand
);
router.delete("/:brandId", brandController.deleteBrand);

export default router;
