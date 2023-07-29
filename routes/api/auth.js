const express = require("express");
const controller = require("../../controllers/auth");
const controllerWrapper = require("../../helpers/controllerWrapper");
const validateBody = require("../../middlewares/validateBody");
const schema = require("../../schemas/user");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post(
  "/register",
  validateBody(schema.userSchema),
  controllerWrapper(controller.registration)
);

router.post(
  "/login",
  validateBody(schema.userSchema),
  controllerWrapper(controller.login)
);

router.post(
  "/logout",
  validateBody(schema.userSchema),
  controllerWrapper(auth),
  controllerWrapper(controller.logout)
);

router.get(
  "/current",
  validateBody(schema.userSchema),
  controllerWrapper(auth),
  controllerWrapper(controller.current)
);

module.exports = router;
