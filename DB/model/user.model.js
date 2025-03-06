import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Name is required"],
      min: [2, "minimum length 2 char"],
      max: [20, "max length 2 char"],
    },
    email: {
      type: String,
      unique: [true, "email must be unique value"],
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      default: "User",
      enum: ["Admin", "User"],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
    },
    image: String,
    wishlist: [
      {
        type: Types.ObjectId,
        ref: "product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = model("user", userSchema);
export default userModel;
