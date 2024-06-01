const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
});

const userSchema = Joi.object({
  nome: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
});

module.exports = {
  loginSchema,
  userSchema
};
