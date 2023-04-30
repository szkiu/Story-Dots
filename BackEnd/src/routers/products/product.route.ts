import { Router } from "express";
import {
  validateProductQuery,
  validateProdCatParam,
  validateProdAuthorParam,
  validateProdIdParam,
  verifyProductToAdd,
  verifyProductToDelete,
  verifyProductToUpdate,
  verifyQueryProductLen,
} from "./middlewares/validateProducts";
import {
  productsController,
  productsCatController,
  productsAuthorController,
  productIdController,
  productAddController,
  productDeleteController,
  productUpdateConstroller,
  lenProductsController,
} from "./controllers/productControllers";
import { isBody, hasTokenByCookie } from "../middlewares/sameValidations";

const router = Router();

router.get("/", validateProductQuery, productsController);

router.get("/len/global", verifyQueryProductLen, lenProductsController);

router.get("/cat/:category", validateProdCatParam, productsCatController);

router.get(
  "/author/:author",
  validateProdAuthorParam,
  productsAuthorController
);

router.get("/:id", validateProdIdParam, productIdController);

router.post("/", isBody, verifyProductToAdd, productAddController);

router.delete(
  "/",
  hasTokenByCookie,
  verifyProductToDelete,
  productDeleteController
);

router.put("/:id", isBody, verifyProductToUpdate, productUpdateConstroller);

export default router;
