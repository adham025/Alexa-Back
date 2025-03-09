import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, HME, myMulter } from "../../services/multer.js";
import { endPoints } from "./bikes.endPoint.js";
import * as bikeController from "./controller/bikes.controller.js";
// import wishList from '../wishList/wishList.router.js'
const router = Router();

// router.use("/:bikeId/wishlist", wishList)
router.get("/all", bikeController.allBikes);

router.post(
  "/add/:categoryId/:brandId",
  auth(endPoints.create),
  myMulter(fileValidation.image).array("image", 7),
  HME,
  bikeController.addBike
);
router.get("/:bikeId", bikeController.getBikeById);
router.get("/category/:categoryId", bikeController.getBikesByCategory);
router.get("/brand/:brandId", bikeController.getBikesByBrand);
router.delete("/:bikeId", bikeController.deleteBike);
router.put(
  "/update/:bikeId",
  auth(endPoints.create),
  myMulter(fileValidation.image).array("image", 7),
  HME,
  bikeController.updateBike
);

export default router;
