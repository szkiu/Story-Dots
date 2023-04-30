import { body, param } from "express-validator";
import { showErrors } from "../../middlewares/sameValidations";

export const validateIdFromParams = [
  param("id", "Id is required")
  .notEmpty()
  .isMongoId()
  .withMessage("Not a valid id")
]

export const validateRegister = [
  body("uniqueName", "uniqueName is a must")
    .notEmpty()
    .trim()
    .isLowercase()
    .withMessage("uniqueName must be in lowercase")
    .isLength({ min: 6 })
    .withMessage("uniqueName must be more than 6 letters")
    .isLength({ max: 18 })
    .withMessage("uniqueName must be less than 18 letters"),

  body("username", "username is a must")
    .notEmpty()
    .trim()
    .isLength({ min: 4 })
    .withMessage("uniqueName must be more than 4 letters")
    .isLength({ max: 22 })
    .withMessage("uniqueName must be less than 22 letters")
    .custom((value) => {
      if (value.includes("@")) throw new Error("Username can't has @");

      return value;
    }),

  body("email", "email is a must")
    .notEmpty()
    .trim()
    .isLength({ min: 8 })
    .withMessage("email must be more than 8 letters")
    .isLowercase()
    .withMessage("email must be in lowercase")
    .isEmail()
    .withMessage("Not a valid email")
    .normalizeEmail(),

  body("password", "password is a must")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("password must be more than 8 letters")
    .custom((value) => {
      const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      if (!regex.test(value))
        throw new Error("Password doesn't match with requirements.");

      return value;
    }),

  body("age", "age is required")
    .notEmpty()
    .custom((value) => {
      if (typeof value !== "number") throw new Error("You must put a number");

      if (value < 12) throw new Error("You must be more than 12 years old");

      return value;
    }),

  body("image")
    .optional()
    .isLength({ min: 300 })
    .withMessage("Not a valid image"),

  showErrors,
];

export const validateLogin = [
  body("user_email", "Missing field")
    .notEmpty()
    .trim()
    .custom((value) => {
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (value.includes("@")) {
        if (!regexEmail.test(value)) throw new Error("Not a valid Email");
      } else {
        if (!value.length) throw new Error("Username must be more than 0");

        if (value.length > 22) throw new Error("Username must be less than 22");

        if (value.length < 4) throw new Error("Username must be more than 4");
      }

      return value;
    }),
  validateRegister[3],
  showErrors,
];

export const validateUpdate = [
  body("uniqueName", "uniqueName is a must")
    .optional()
    .trim()
    .isLowercase()
    .withMessage("uniqueName must be in lowercase")
    .isLength({ min: 6 })
    .withMessage("uniqueName must be more than 6 letters")
    .isLength({ max: 18 })
    .withMessage("uniqueName must be less than 18 letters"),

  body("username", "username is a must")
    .optional()
    .trim()
    .isLength({ min: 4 })
    .withMessage("uniqueName must be more than 4 letters")
    .isLength({ max: 22 })
    .withMessage("uniqueName must be less than 22 letters"),

  body("email", "email is a must")
    .optional()
    .trim()
    .isLength({ min: 8 })
    .withMessage("email must be more than 8 letters")
    .isLowercase()
    .withMessage("email must be in lowercase")
    .isEmail()
    .withMessage("Not a valid email")
    .normalizeEmail(),

  body("password", "password is a must")
    .not()
    .exists()
    .withMessage("password can't be changed"),

  body("age")
    .optional()
    .custom((value) => {
      if (typeof value !== "number") throw new Error("You must put a number.");

      if (value < 18) throw new Error("You must be more than 18 years old.");

      return value;
    }),

  body("image")
    .optional()
    .isLength({ min: 300 })
    .withMessage("Not a valid image"),

  showErrors,
];
