const express = require("express");
const controller = require("../../controllers/auth");
const controllerWrapper = require("../../helpers/controllerWrapper");
const schema = require("../../schemas/user");
const { validateBody, auth, upload } = require("../../middlewares");

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

router.patch(
  "/avatars",
  controllerWrapper(auth),
  upload.single("avatar"),
  controllerWrapper(controller.changeAvatar)
);

module.exports = router;
