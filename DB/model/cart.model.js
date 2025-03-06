import { Schema, model, Types } from "mongoose";

const cartSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Created by is required"],
      unique: true,
    },
    bikes: {
      type: [
        {
          bikeId: {
            type: Types.ObjectId,
            ref: "Bike",
            required: [true, "Bike is required"],
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const cartModel = model("Cart", cartSchema);
export default cartModel;
