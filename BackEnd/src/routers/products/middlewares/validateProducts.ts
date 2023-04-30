import { Types } from "mongoose";
import { showErrors } from "../../middlewares/sameValidations";
import { Request, Response, NextFunction } from "express";
import { body, query, param } from "express-validator";
import { Product } from "../../../db/Models/Products";

export const validateProductQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query.page) throw new Error("Query param page is missing");

    next();
  } catch (err: any) {
    res.status(400).json({ error: err.toString().split(":")[1].trim() });
  }
};

export const validateProdCatParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query.page) throw new Error("Query param page is missing");

    const categories = [
      "art",
      "technology",
      "science",
      "cinema",
      "design",
      "food",
    ];
    const cat = req.params.category;

    if (!cat) throw new Error("Param category is missing");
    if (!categories.includes(cat))
      throw new Error(
        "Category passed doesn't match with the requires categories"
      );
    next();
  } catch (err: any) {
    res.status(400).json({ error: err.toString().split(":")[1].trim() });
  }
};

export const validateProdAuthorParam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query.page) throw new Error("Query param page is missing");

    const author = req.params.author;
    const { page } = req.query;
    const LIMIT = 5;

    const newPage = Number(page) + 1;

    if (!author) throw new Error("Param author is missing");

    const products = await Product.find({ author }).limit(newPage * LIMIT);

    if (!products.length) throw new Error("No products found");

    res.locals.products = products;
    next();
  } catch (err: any) {
    res.status(400).json({ error: err.toString().split(":")[1].trim() });
  }
};

export const validateProdIdParam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) throw new Error("Param author is missing");

    const product = await Product.findOne({ _id: id });

    if (!product) throw new Error("No products found");

    res.locals.product = product;
    next();
  } catch (err: any) {
    res.status(400).json({ error: err.toString().split(":")[1].trim() });
  }
};

export const verifyQueryProductLen = [
  query("cat", "").optional().custom((value: any) => {
    const categories = [
      "art",
      "technology",
      "science",
      "cinema",
      "design",
      "food",
    ];

    if (!categories.includes(value.toString().toLowerCase())) throw new Error();

    return value;
  }),
  
  query("author")
    .optional()
    .trim()
    .isLength({ min: 4 })
    .withMessage("Author must be more than 4")
    .isLength({ max: 20 })
    .withMessage("Author must be less than 20"),

  showErrors,
];

export const verifyProductToAdd = [
  body("author", "Not a valid Author")
    .trim()
    .isLength({ min: 4 })
    .withMessage("You need to login to create or update a product")
    .isLength({ max: 20 })
    .withMessage("Author must be less than 20"),

  body("authorId", "The authorId is not a valid id").custom((value: any) => {
    if (!Types.ObjectId.isValid(value)) throw new Error();

    return value;
  }),

  body("name", "Not a valid Name")
    .notEmpty()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Name must be more than 8")
    .isLength({ max: 40 })
    .withMessage("Name must be less than 40"),

  body("description", "Not a valid Body")
    .notEmpty()
    .trim()
    .isLength({ min: 50 })
    .withMessage("Description must be more than 50")
    .isLength({ max: 2000 })
    .withMessage("Description must be less than 2000"),

  body("category", "Not a valid category").custom((value: any) => {
    const categories = [
      "art",
      "technology",
      "science",
      "cinema",
      "design",
      "food",
    ];

    if (!categories.includes(value.toString().toLowerCase())) throw new Error();

    return value;
  }),

  body("image_url").optional(),

  body("time", "Time must be a numeric value")
    .optional()
    .custom((value: any) => {
      if (typeof value === "number") return value;

      throw new Error();
    }),

  body("price", "Price is required")
    .notEmpty()
    .toInt()
    .isNumeric()
    .withMessage("Price must be numeric")
    .custom((value: any) => {
      if (Number(value) <= 50) throw new Error("Price must be more than 50");

      if (Number(value) >= 999999)
        throw new Error("Price must be less than 999999");

      return value;
    }),

  showErrors,
];

export const verifyProductToDelete = [
  query("id", "The id is not a valid ObjectId")
    .notEmpty()
    .escape()
    .custom((value: any) => {
      if (!Types.ObjectId.isValid(value)) throw new Error();

      return value;
    }),

  query("authorId", "The id is not a valid ObjectId")
    .notEmpty()
    .escape()
    .custom((value: any) => {
      if (!Types.ObjectId.isValid(value)) throw new Error();

      return value;
    }),

  showErrors,
];

export const verifyProductToUpdate = [
  param("id", "The id is not a valid ObjectId")
    .notEmpty()
    .escape()
    .custom((value: any) => {
      if (!Types.ObjectId.isValid(value)) throw new Error();

      return value;
    }),
  ...verifyProductToAdd,
];
