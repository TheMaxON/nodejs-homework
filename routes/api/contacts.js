const express = require("express");
const router = express.Router();
const validateBody = require("../../middlewares/validateBody");
const controllerWrapper = require("../../helpers/controllerWrapper");
const contactsController = require("../../controllers/contacts");
const schema = require("../../schemas/contacts");
const auth = require("../../middlewares/auth");

router.get(
  "/",
  controllerWrapper(auth),
  controllerWrapper(contactsController.getAll)
);

router.get(
  "/:contactId",
  controllerWrapper(auth),
  controllerWrapper(contactsController.getById)
);

router.post(
  "/",
  validateBody(schema.contactSchema),
  controllerWrapper(auth),
  controllerWrapper(contactsController.add)
);

router.delete(
  "/:contactId",
  controllerWrapper(auth),
  controllerWrapper(contactsController.remove)
);

router.put(
  "/:contactId",
  validateBody(schema.contactSchema),
  controllerWrapper(auth),
  controllerWrapper(contactsController.updateById)
);

router.patch(
  "/:contactId/favorite",
  validateBody(schema.statusUpdateSchema),
  controllerWrapper(auth),
  controllerWrapper(contactsController.patchById)
);

module.exports = router;
