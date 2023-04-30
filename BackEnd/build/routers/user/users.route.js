"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateUser_1 = require("./middlewares/validateUser");
const sameValidations_1 = require("../middlewares/sameValidations");
const userController_1 = require("./controllers/userController");
const router = (0, express_1.Router)();
// Working
router.get("/me/cookie", sameValidations_1.hasTokenByCookie, userController_1.getMeController);
// Working
router.get("/logout", sameValidations_1.hasTokenByCookie, userController_1.getLogoutController);
// Working
router.get("/id/:id", validateUser_1.validateIdFromParams, userController_1.getUserById);
// Working
router.post("/register", sameValidations_1.isBody, validateUser_1.validateRegister, userController_1.postRegisterController);
// Working
router.post("/login", sameValidations_1.isBody, validateUser_1.validateLogin, userController_1.postLoginController);
router.put("/change-user", sameValidations_1.isBody, validateUser_1.validateUpdate, sameValidations_1.hasTokenByCookie, userController_1.putUpdateUserController);
// Working
router.delete("/user", sameValidations_1.hasTokenByCookie, userController_1.deleteUserController);
exports.default = router;
