const joi = require("joi");

const contactSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

const statusUpdateSchema = joi.object({
  favorite: joi.boolean().required(),
});

module.exports = { contactSchema, statusUpdateSchema };
