const express = require("express");
const router = express.Router();
const { contactSchema, statusUpdateSchema } = require("../../schemas/contacts");
const Contact = require("../../models/contacts");
const errorHandler = require("../../helpers/errorHandler");
const validateBody = require("../../middlewares/validateBody");
const controllerWrapper = require("../../helpers/controllerWrapper");
const contactsController = require("../../controllers/contacts");
const schema = require("../../schemas/contacts");

router.get("/", controllerWrapper(contactsController.getAll));

router.get("/:contactId", controllerWrapper(contactsController.getById));

router.post(
  "/",
  validateBody(schema.contactSchema),
  controllerWrapper(contactsController.add)
);

router.delete("/:contactId", controllerWrapper(contactsController.remove));

router.put(
  "/:contactId",
  validateBody(schema.contactSchema),
  controllerWrapper(contactsController.updateById)
);

router.patch(
  "/:contactId/favorite",
  validateBody(schema.statusUpdateSchema),
  controllerWrapper(contactsController.patchById)
);

module.exports = router;
