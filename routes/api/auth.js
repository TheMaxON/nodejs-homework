const express = require("express");
const controller = require("../../controllers/auth");
const controllerWrapper = require("../../helpers/controllerWrapper");
const validateBody = require("../../middlewares/validateBody");
const schema = require("../../schemas/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schema.userSchema),
  controllerWrapper(controller.registration)
);

module.exports = router;
