const joi = require("joi");

const userSchema = joi.object({
  password: joi.string().required(),
  email: joi.string().required(),
});

module.exports = { userSchema };
