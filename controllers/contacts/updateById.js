const Contact = require("../../models/contacts");
const errorHandler = require("../../helpers/errorHandler");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw errorHandler(404, "Contact not found");
  }
  res.json(result);
};

module.exports = updateById;
