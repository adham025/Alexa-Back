import userModel from "../../../DB/model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../services/email.js";
import { asyncHandler } from "../../../services/asyncHandler.js";
import { findOne, findOneAndUpdate } from "../../../DB/DBMethods.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const signUp = async (req, res, next) => {
  try {
    const { userName, email, password, cPassword } = req.body;
    if (password !== cPassword) {
      next(new Error("Passwords don't match", { cause: 409 }));
    } else {
      const user = await findOne({
        model: userModel,
        condition: { email },
        select: "email",
      });
      if (user) {
        next(new Error("This email already registered", { cause: 409 }));
      } else {
        let hashedPassword = bcrypt.hashSync(password, parseInt("9"));
        let addUser = new userModel({
          userName,
          email,
          password: hashedPassword,
        });
        let token = jwt.sign(
          { id: addUser._id, isLoggedIn: true },
          "c38fridayupvote1231",
          { expiresIn: 60 * 60 }
        );
        let link = `${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}`;

        let emailTemplatePath = path.join(
          __dirname,
          "./emailTemplates/email.html"
        );
        let emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");
        emailTemplate = emailTemplate.replace("{{link}}", link);

        let result = await sendEmail(email, "Verify Your Email", emailTemplate);

        if (result.accepted.length) {
          let savedUser = await addUser.save();
          res.status(201).json({ message: "Success", savedUser });
        } else {
          next(new Error("Invalid email", { cause: 404 }));
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const confirmEmail = async (req, res, next) => {
  try {
    let { token } = req.params;
    let decoded = jwt.verify(token, "c38fridayupvote1231");
    if (!decoded && !decoded.id) {
      return res.sendFile(
        path.join(__dirname, "./emailTemplates/email-failed.html")
      );
    } else {
      let updatedUser = await findOneAndUpdate({
        model: userModel,
        condition: { _id: decoded.id, confirmEmail: false },
        data: { confirmEmail: true },
        options: { new: true },
      });
      if (updatedUser) {
        return res.sendFile(
          path.join(__dirname, "./emailTemplates/email-success.html")
        );
      } else {
        return res.redirect("http://localhost:5173/login");
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findOne({ model: userModel, condition: { email } });
  if (!user) {
    next(new Error("You have to register first", { cause: 404 }));
  } else {
    let matched = bcrypt.compareSync(password, user.password, parseInt("9"));
    if (matched) {
      if (!user.confirmEmail) {
        next(new Error("You have to confirm your email first", { cause: 400 }));
      } else {
        let token = jwt.sign(
          { id: user._id, isLoggedIn: true },
          "c38juihjuujRoute",
          { expiresIn: 60 * 60 * 60 * 24 * 2 }
        );
        res.status(200).json({ message: "Success", user, token });
      }
    } else {
      next(new Error("Password don't match", { cause: 400 }));
    }
  }
});

export const updateRole = asyncHandler(async (req, res, next) => {
  let { userId } = req.body;
  let user = await findById({ model: userModel, id: userId });
  if (!user) {
    next(new Error("invalid user", { cause: 404 }));
  } else {
    if (!user.confirmEmail) {
      next(new Error("please confirm ur email", { cause: 400 }));
    } else {
      let updated = await findByIdAndUpdate({
        model: userModel,
        condition: { _id: user._id },
        data: { role: "Admin" },
        options: { new: true },
      });
      res.status(200).json({ message: "Success", updated });
    }
  }
});

export const sendCode = asyncHandler(async (req, res, next) => {
  let { email } = req.body;
  let user = await findOne({
    model: userModel,
    condition: { email },
    select: "email",
  });
  if (!user) {
    next(new Error("Email not found", { cause: 400 }));
  } else {
    let OTPCode = nanoid();
    await findByIdAndUpdate({
      model: userModel,
      condition: { _id: user._id },
      data: { code: OTPCode },
    });
    let message = `Your OTPCODE is ${OTPCode}`;
    await sendEmail(user.email, message);
    res.json({
      message: "Please check your email for the code",
    });
  }
});

export const forgetPassword = asyncHandler(async (req, res, next) => {
  let { code, email, password } = req.body;
  if (!code) {
    next(new Error(" Code is not valid", { cause: 400 }));
  } else {
    let user = await findOne({ model: userModel, condition: { email, code } });
    if (!user) {
      next(new Error(" email or code is not valid", { cause: 400 }));
    } else {
      const hashPass = await bcrypt.hash(password, 5);
      let updated = await findByIdAndUpdate({
        model: userModel,
        condition: { _id: user._id },
        data: { code: null, password: hashPass },
        options: { new: true },
      });
      res.json({ message: "Success", updated });
    }
  }
});
