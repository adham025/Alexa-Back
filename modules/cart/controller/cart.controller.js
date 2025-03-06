import {
  create,
  findByIdAndUpdate,
  findOne,
  findOneAndUpdate,
} from "../../../DB/DBMethods.js";
import cartModel from "../../../DB/model/cart.model.js";
import bikeModel from "../../../DB/model/bike.model.js";
import { asyncHandler } from "../../../services/asyncHandler.js";
import mongoose from "mongoose";

export const createCart = asyncHandler(async (req, res, next) => {
  let { _id } = req.user; // Get logged-in user ID
  req.body.userId = _id;

  if (!Array.isArray(req.body.bikes)) {
    return res.status(400).json({ message: "Bikes must be an array" });
  }

  // Find the cart for the logged-in user
  let cart = await findOne({ model: cartModel, condition: { userId: _id } });

  if (!cart) {
    // If no cart exists, create a new cart for this user
    let added = await create({ model: cartModel, data: req.body });
    return res
      .status(201)
      .json({ message: "Cart created successfully", added });
  }

  for (const bike of req.body.bikes) {
    let matched = cart.bikes.find((b) => b.bikeId.toString() === bike.bikeId);

    if (matched) {
      matched.quantity += bike.quantity || 1;
    } else {
      cart.bikes.push({ bikeId: bike.bikeId, quantity: bike.quantity || 1 });
    }
  }

  // **Update only the bikes array, not the entire cart object**
  let updatedCart = await findOneAndUpdate({
    model: cartModel,
    condition: { userId: _id },
    data: { bikes: cart.bikes },
    options: { new: true },
  });

  res.status(200).json({ message: "Cart updated successfully", updatedCart });
});

export const removeFromCart = asyncHandler(async (req, res, next) => {
  let { _id } = req.user;
  let { bikeId } = req.params;
  let cart = await findOne({ model: cartModel, condition: { userId: _id } });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  let updatedBikes = cart.bikes.filter(
    (bike) => bike.bikeId.toString() !== bikeId
  );

  let updatedCart = await findOneAndUpdate({
    model: cartModel,
    condition: { userId: _id },
    data: { bikes: updatedBikes },
    options: { new: true },
  });

  res.status(200).json({
    message: "Bike removed from cart",
    cart: updatedCart,
  });
});

export const cart = asyncHandler(async (req, res, next) => {
  let { _id } = req.user;

  let userCart = await findOne({
    model: cartModel,
    condition: { userId: _id },
    populate: [
      {
        path: "bikes.bikeId",
      },
    ],
  });

  if (!userCart) {
    return res.status(200).json({
      success: true,
      message: "Cart is empty",
      cart: { userId: _id, bikes: [] },
    });
  }
  res.status(200).json({
    success: true,
    message: "Cart fetched successfully",
    cart: userCart,
  });
});

export const updateCartQuantity = asyncHandler(async (req, res) => {
  try {
    const { bikeId } = req.params;
    const { quantity } = req.body;
    let { _id } = req.user; 

    const bikeObjectId = new mongoose.Types.ObjectId(bikeId);

    const bike = await bikeModel.findById(bikeObjectId);
    if (!bike) {
      return res.status(404).json({ success: false, message: "Bike not found" });
    }
    if (quantity > bike.stock) {
      return res.status(400).json({ success: false, message: "Quantity exceeds stock availability" });
    }
    const cart = await cartModel.findOneAndUpdate(
      {
        userId: _id,
        "bikes.bikeId": bikeObjectId,
      },
      { $set: { "bikes.$.quantity": quantity } },
      { new: true }
    ).populate("bikes.bikeId");

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    res.json({ success: true, cart });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

