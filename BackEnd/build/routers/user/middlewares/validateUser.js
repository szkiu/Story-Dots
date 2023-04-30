"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdate = exports.validateLogin = exports.validateRegister = exports.validateIdFromParams = void 0;
const express_validator_1 = require("express-validator");
const sameValidations_1 = require("../../middlewares/sameValidations");
exports.validateIdFromParams = [
    (0, express_validator_1.param)("id", "Id is required")
        .notEmpty()
        .isMongoId()
        .withMessage("Not a valid id")
];
exports.validateRegister = [
    (0, express_validator_1.body)("uniqueName", "uniqueName is a must")
        .notEmpty()
        .trim()
        .isLowercase()
        .withMessage("uniqueName must be in lowercase")
        .isLength({ min: 6 })
        .withMessage("uniqueName must be more than 6 letters")
        .isLength({ max: 18 })
        .withMessage("uniqueName must be less than 18 letters"),
    (0, express_validator_1.body)("username", "username is a must")
        .notEmpty()
        .trim()
        .isLength({ min: 4 })
        .withMessage("uniqueName must be more than 4 letters")
        .isLength({ max: 22 })
        .withMessage("uniqueName must be less than 22 letters")
        .custom((value) => {
        if (value.includes("@"))
            throw new Error("Username can't has @");
        return value;
    }),
    (0, express_validator_1.body)("email", "email is a must")
        .notEmpty()
        .trim()
        .isLength({ min: 8 })
        .withMessage("email must be more than 8 letters")
        .isLowercase()
        .withMessage("email must be in lowercase")
        .isEmail()
        .withMessage("Not a valid email")
        .normalizeEmail(),
    (0, express_validator_1.body)("password", "password is a must")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("password must be more than 8 letters")
        .custom((value) => {
        const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!regex.test(value))
            throw new Error("Password doesn't match with requirements.");
        return value;
    }),
    (0, express_validator_1.body)("age", "age is required")
        .notEmpty()
        .custom((value) => {
        if (typeof value !== "number")
            throw new Error("You must put a number");
        if (value < 12)
            throw new Error("You must be more than 12 years old");
        return value;
    }),
    (0, express_validator_1.body)("image")
        .optional()
        .isLength({ min: 300 })
        .withMessage("Not a valid image"),
    sameValidations_1.showErrors,
];
exports.validateLogin = [
    (0, express_validator_1.body)("user_email", "Missing field")
        .notEmpty()
        .trim()
        .custom((value) => {
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (value.includes("@")) {
            if (!regexEmail.test(value))
                throw new Error("Not a valid Email");
        }
        else {
            if (!value.length)
                throw new Error("Username must be more than 0");
            if (value.length > 22)
                throw new Error("Username must be less than 22");
            if (value.length < 4)
                throw new Error("Username must be more than 4");
        }
        return value;
    }),
    exports.validateRegister[3],
    sameValidations_1.showErrors,
];
exports.validateUpdate = [
    (0, express_validator_1.body)("uniqueName", "uniqueName is a must")
        .optional()
        .trim()
        .isLowercase()
        .withMessage("uniqueName must be in lowercase")
        .isLength({ min: 6 })
        .withMessage("uniqueName must be more than 6 letters")
        .isLength({ max: 18 })
        .withMessage("uniqueName must be less than 18 letters"),
    (0, express_validator_1.body)("username", "username is a must")
        .optional()
        .trim()
        .isLength({ min: 4 })
        .withMessage("uniqueName must be more than 4 letters")
        .isLength({ max: 22 })
        .withMessage("uniqueName must be less than 22 letters"),
    (0, express_validator_1.body)("email", "email is a must")
        .optional()
        .trim()
        .isLength({ min: 8 })
        .withMessage("email must be more than 8 letters")
        .isLowercase()
        .withMessage("email must be in lowercase")
        .isEmail()
        .withMessage("Not a valid email")
        .normalizeEmail(),
    (0, express_validator_1.body)("password", "password is a must")
        .not()
        .exists()
        .withMessage("password can't be changed"),
    (0, express_validator_1.body)("age")
        .optional()
        .custom((value) => {
        if (typeof value !== "number")
            throw new Error("You must put a number.");
        if (value < 18)
            throw new Error("You must be more than 18 years old.");
        return value;
    }),
    (0, express_validator_1.body)("image")
        .optional()
        .isLength({ min: 300 })
        .withMessage("Not a valid image"),
    sameValidations_1.showErrors,
];
