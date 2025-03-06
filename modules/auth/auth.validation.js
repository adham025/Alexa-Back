import Joi from "joi";

export const signUpValidation = {
  body: Joi.object()
    .required()
    .keys({
      userName: Joi.string().min(3).max(30).required(),
      email: Joi.string().email(),
      password: Joi.string()
        .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=/{}|?]).{8,}$/)
        .messages({
          "string.pattern.base":
            "Password must contain at least one letter, one number, and one special character (!@#$%^&*).",
        })
        .required(),
      cPassword: Joi.string().valid(Joi.ref("password")).required(),
    }),
};

export const updateRole = {
  body: Joi.object()
    .required()
    .keys({
      userId: Joi.string().required().min(24).max(24),
    }),
};
