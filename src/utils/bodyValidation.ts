import Joi from "joi";

export const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const orderSchema = Joi.object({
  productId: Joi.string().required(),
  count: Joi.number().integer().min(1).required(),
});
