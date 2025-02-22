const Contact = require("../../models/contacts");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.find({ owner });
  res.json(result);
};

module.exports = getAll;
