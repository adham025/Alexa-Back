import { Schema, model, Types } from "mongoose";

const bikeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Bike name is required"],
      min: [2, "Bike name minimum length 2 char"],
      max: [30, "Bike name max length 30 char"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Description is required"],
      min: [2, "Description minimum length 2 char"],
      max: [200, "Description max length 200 char"],
    },
    images: {
      type: [String],
      required: [true, "Bike images are required"],
    },
    publicImageIds: [String],
    stock: {
      type: Number,
      default: 1,
      required: [true, "Stock is required"],
    },
    endStock: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    discount: {
      type: Number,
    },
    finalPrice: {
      type: Number,
    },
    color: {
      type: String,
    },
    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
      required: [true, "CategoryId is required"],
    },
    brandId: {
      type: Types.ObjectId,
      ref: "Brand",
      required: [true, "BrandId is required"],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "Created by is required"],
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    soldItems: Number,
    totalItems: Number,
  },
  {
    timestamps: true,
  }
);

const bikeModel = model("Bike", bikeSchema);

export default bikeModel;
