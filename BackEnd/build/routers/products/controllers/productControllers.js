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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUpdateConstroller = exports.productDeleteController = exports.productAddController = exports.productIdController = exports.productsAuthorController = exports.productsCatController = exports.lenProductsController = exports.productsController = void 0;
const Products_1 = require("../../../db/Models/Products");
const User_1 = require("../../../db/Models/User");
const utilitiesUser_1 = require("../../../utilities/users/utilitiesUser");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const productsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.query;
        const LIMIT = 5;
        const newPage = Number(page) + 1;
        const products = yield Products_1.Product.find().limit(newPage * LIMIT);
        if (!products.length)
            throw new Error("No products now");
        res.json(products);
    }
    catch (err) {
        res.status(400).json({ error: err.toString().split(":")[1].trim() });
    }
});
exports.productsController = productsController;
const lenProductsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cat, author } = req.query;
        if (cat) {
            const catProducts = yield Products_1.Product.find({ category: cat });
            return res.json({ lenCat: catProducts.length });
        }
        if (author) {
            const authorProducts = yield Products_1.Product.find({ author });
            return res.json({ lenAuthor: authorProducts.length });
        }
        const allProducts = yield Products_1.Product.find();
        if (!allProducts.length)
            throw new Error("No products now");
        return res.json({ len: allProducts.length });
    }
    catch (err) {
        return res.status(400).json({ error: err.toString().split(":")[1].trim() });
    }
});
exports.lenProductsController = lenProductsController;
const productsCatController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        const { page } = req.query;
        const LIMIT = 5;
        const newPage = Number(page) + 1;
        const products = yield Products_1.Product.find({ category }).limit(newPage * LIMIT);
        if (!products.length)
            throw new Error("No products now");
        res.json(products);
    }
    catch (err) {
        res.status(400).json({ error: err.toString().split(":")[1].trim() });
    }
});
exports.productsCatController = productsCatController;
const productsAuthorController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products } = res.locals;
        res.json(products);
    }
    catch (err) {
        res.status(400).json({ error: err.toString().split(":")[1].trim() });
    }
});
exports.productsAuthorController = productsAuthorController;
const productIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.cookies;
        const { product } = res.locals;
        // @ts-ignore
        const decodedToken = jsonwebtoken_1.default.decode(refreshToken, process.env.JWT_REFRESH);
        if ((0, utilitiesUser_1.createTokenByRefreshToken)(refreshToken))
            throw new Error("Not allowed");
        let id;
        decodedToken ? (id = decodedToken.id) : null;
        if (product.authorId !== id && (0, utilitiesUser_1.createTokenByRefreshToken)(refreshToken)) {
            const _a = product.toObject(), { authorId, __v } = _a, newProduct = __rest(_a, ["authorId", "__v"]);
            res.json(newProduct);
        }
        else {
            res.json(product);
        }
    }
    catch (err) {
        res.status(400).json({ error: err.toString().split(":")[1].trim() });
    }
});
exports.productIdController = productIdController;
const productAddController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { refreshToken } = req.cookies;
        const { body } = req;
        const id = (0, utilitiesUser_1.decodeRefresh)(refreshToken);
        if (!id)
            throw new Error("You need to login to create a product");
        if ((0, utilitiesUser_1.createTokenByRefreshToken)(refreshToken))
            throw new Error("You need to log in");
        const user = yield User_1.User.findById(id);
        if (id !== body.authorId || (user === null || user === void 0 ? void 0 : user.username) !== body.author)
            throw new Error("You can't create products");
        const product = new Products_1.Product(body);
        yield product.save();
        const { authorId } = body, newBody = __rest(body, ["authorId"]);
        res.status(200).json(newBody);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.productAddController = productAddController;
const productDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: idParams, authorId } = req.query;
        const { refreshToken } = req.cookies;
        const id = (0, utilitiesUser_1.decodeRefresh)(refreshToken);
        if (!id)
            throw new Error("You need to login to delete a product");
        if ((0, utilitiesUser_1.createTokenByRefreshToken)(refreshToken))
            throw new Error("You need to log in");
        if (id !== authorId)
            throw new Error("You can't delete products");
        const deletedPrd = yield Products_1.Product.findByIdAndDelete(idParams);
        if (!deletedPrd)
            throw new Error("The product doesn't exist");
        res.sendStatus(204);
    }
    catch (err) {
        res.status(400).json({ error: err.toString().split(":")[1].trim() });
    }
});
exports.productDeleteController = productDeleteController;
const productUpdateConstroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: idParams } = req.params;
        const { body } = req;
        const { refreshToken } = req.cookies;
        const id = (0, utilitiesUser_1.decodeRefresh)(refreshToken);
        if (!id)
            throw new Error("You need to login to create a product");
        if ((0, utilitiesUser_1.createTokenByRefreshToken)(refreshToken))
            throw new Error("You need to log in");
        const user = yield User_1.User.findById(id);
        if (id !== body.authorId || (user === null || user === void 0 ? void 0 : user.username) !== body.author)
            throw new Error("You can't create products");
        const updatedPro = yield Products_1.Product.findByIdAndUpdate(idParams, body);
        if (!updatedPro)
            throw new Error("The product doesn't exist");
        const { authorId } = body, newBody = __rest(body, ["authorId"]);
        res.status(200).json(newBody);
    }
    catch (err) {
        res.status(400).json({ error: err.toString().split(":")[1].trim() });
    }
});
exports.productUpdateConstroller = productUpdateConstroller;
