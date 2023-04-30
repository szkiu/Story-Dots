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
exports.hasTokenByCookie = exports.showErrors = exports.isBody = void 0;
const express_validator_1 = require("express-validator");
const isBody = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Object.keys(req.body).length) {
        res.status(400).json({ error: "Body is needed" });
        return;
    }
    res.locals.user = req.body;
    next();
    return;
});
exports.isBody = isBody;
const showErrors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array()[0].msg });
        return;
    }
    next();
});
exports.showErrors = showErrors;
const hasTokenByCookie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //Cookie version
    if (!req.cookies.refreshToken)
        return res.status(401).json({ error: "You don't have a token" });
    res.locals.refreshToken = req.cookies.refreshToken;
    next();
    return undefined;
});
exports.hasTokenByCookie = hasTokenByCookie;
