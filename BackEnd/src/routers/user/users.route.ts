import { Router } from "express";
import {
  validateLogin,
  validateRegister,
  validateUpdate,
  validateIdFromParams
} from "./middlewares/validateUser";
import {
  isBody,
  hasTokenByCookie,
} from "../middlewares/sameValidations";
import {
  getMeController,
  getLogoutController,
  postRegisterController,
  postLoginController,
  putUpdateUserController,
  deleteUserController,
  getUserById,
} from "./controllers/userController";

const router = Router();

// Working
router.get("/me/cookie", hasTokenByCookie, getMeController);

// Working
router.get("/logout", hasTokenByCookie, getLogoutController);

// Working
router.get("/id/:id", validateIdFromParams, getUserById);

// Working
router.post("/register", isBody, validateRegister, postRegisterController);

// Working
router.post("/login", isBody, validateLogin, postLoginController);

router.put(
  "/change-user",
  isBody,
  validateUpdate,
  hasTokenByCookie,
  putUpdateUserController
);

// Working
router.delete("/user", hasTokenByCookie, deleteUserController);

export default router;
