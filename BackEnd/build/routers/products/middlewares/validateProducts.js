"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyProductToUpdate = exports.verifyProductToDelete = exports.verifyProductToAdd = exports.verifyQueryProductLen = exports.validateProdIdParam = exports.validateProdAuthorParam = exports.validateProdCatParam = exports.validateProductQuery = void 0;
const mongoose_1 = require("mongoose");
const sameValidations_1 = require("../../middlewares/sameValidations");
const express_validator_1 = require("express-validator");
const Products_1 = require("../../../db/Models/Products");
const validateProductQuery = (req, res, next) => {
    try {
        if (!req.query.page)
            throw new Error("Query param page is missing");
        next();
    }
    catch (err) {
        res.status(400).json({ error: err.toString().split(":")[1].trim() });
    }
};
exports.validateProductQuery = validateProductQuery;
const validateProdCatParam = (req, res, next) => {
    try {
        if (!req.query.page)
            throw new Error("Query param page is missing");
        const categories = [
            "art",
            "technology",
            "science",
            "cinema",
            "design",
            "food",
        ];
        const cat = req.params.category;
        if (!cat)
            throw new Error("Param category is missing");
        if (!categories.includes(cat))
            throw new Error("Category passed doesn't match with the requires categories");
        next();
    }
    catch (err) {
        res.status(400).json({ error: err.toString().split(":")[1].trim() });
    }
};
exports.validateProdCatParam = validateProdCatParam;
const validateProdAuthorParam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.page)
            throw new Error("Query param page is missing");
        const author = req.params.author;
        const { page } = req.query;
        const LIMIT = 5;
        const newPage = Number(page) + 1;
        if (!author)
            throw new Error("Param author is missing");
        const products = yield Products_1.Product.find({ author }).limit(newPage * LIMIT);
        if (!products.length)
            throw new Error("No products found");
        res.locals.products = products;
        next();
    }
    catch (err) {
        res.status(400).json({ error: err.toString().split(":")[1].trim() });
    }
});
exports.validateProdAuthorParam = validateProdAuthorParam;
const validateProdIdParam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id)
            throw new Error("Param author is missing");
        const product = yield Products_1.Product.findOne({ _id: id });
        if (!product)
            throw new Error("No products found");
        res.locals.product = product;
        next();
    }
    catch (err) {
        res.status(400).json({ error: err.toString().split(":")[1].trim() });
    }
});
exports.validateProdIdParam = validateProdIdParam;
exports.verifyQueryProductLen = [
    (0, express_validator_1.query)("cat", "").optional().custom((value) => {
        const categories = [
            "art",
            "technology",
            "science",
            "cinema",
            "design",
            "food",
        ];
        if (!categories.includes(value.toString().toLowerCase()))
            throw new Error();
        return value;
    }),
    (0, express_validator_1.query)("author")
        .optional()
        .trim()
        .isLength({ min: 4 })
        .withMessage("Author must be more than 4")
        .isLength({ max: 20 })
        .withMessage("Author must be less than 20"),
    sameValidations_1.showErrors,
];
exports.verifyProductToAdd = [
    (0, express_validator_1.body)("author", "Not a valid Author")
        .trim()
        .isLength({ min: 4 })
        .withMessage("You need to login to create or update a product")
        .isLength({ max: 20 })
        .withMessage("Author must be less than 20"),
    (0, express_validator_1.body)("authorId", "The authorId is not a valid id").custom((value) => {
        if (!mongoose_1.Types.ObjectId.isValid(value))
            throw new Error();
        return value;
    }),
    (0, express_validator_1.body)("name", "Not a valid Name")
        .notEmpty()
        .trim()
        .isLength({ min: 8 })
        .withMessage("Name must be more than 8")
        .isLength({ max: 40 })
        .withMessage("Name must be less than 40"),
    (0, express_validator_1.body)("description", "Not a valid Body")
        .notEmpty()
        .trim()
        .isLength({ min: 50 })
        .withMessage("Description must be more than 50")
        .isLength({ max: 2000 })
        .withMessage("Description must be less than 2000"),
    (0, express_validator_1.body)("category", "Not a valid category").custom((value) => {
        const categories = [
            "art",
            "technology",
            "science",
            "cinema",
            "design",
            "food",
        ];
        if (!categories.includes(value.toString().toLowerCase()))
            throw new Error();
        return value;
    }),
    (0, express_validator_1.body)("image_url").optional(),
    (0, express_validator_1.body)("time", "Time must be a numeric value")
        .optional()
        .custom((value) => {
        if (typeof value === "number")
            return value;
        throw new Error();
    }),
    (0, express_validator_1.body)("price", "Price is required")
        .notEmpty()
        .toInt()
        .isNumeric()
        .withMessage("Price must be numeric")
        .custom((value) => {
        if (Number(value) <= 50)
            throw new Error("Price must be more than 50");
        if (Number(value) >= 999999)
            throw new Error("Price must be less than 999999");
        return value;
    }),
    sameValidations_1.showErrors,
];
exports.verifyProductToDelete = [
    (0, express_validator_1.query)("id", "The id is not a valid ObjectId")
        .notEmpty()
        .escape()
        .custom((value) => {
        if (!mongoose_1.Types.ObjectId.isValid(value))
            throw new Error();
        return value;
    }),
    (0, express_validator_1.query)("authorId", "The id is not a valid ObjectId")
        .notEmpty()
        .escape()
        .custom((value) => {
        if (!mongoose_1.Types.ObjectId.isValid(value))
            throw new Error();
        return value;
    }),
    sameValidations_1.showErrors,
];
exports.verifyProductToUpdate = [
    (0, express_validator_1.param)("id", "The id is not a valid ObjectId")
        .notEmpty()
        .escape()
        .custom((value) => {
        if (!mongoose_1.Types.ObjectId.isValid(value))
            throw new Error();
        return value;
    }),
    ...exports.verifyProductToAdd,
];
