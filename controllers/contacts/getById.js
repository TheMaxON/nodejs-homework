const Contact = require("../../models/contacts");
const errorHandler = require("../../helpers/errorHandler");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw errorHandler(404, "Contact not found");
  }
  res.json(result);
};

module.exports = getById;
