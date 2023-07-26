const Contact = require("../../models/contacts");
const errorHandler = require("../../helpers/errorHandler");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw errorHandler(404, "Contact not found");
  }
  res.json("Contact deleted");
};

module.exports = remove;
