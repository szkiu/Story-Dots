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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.putUpdateUserController = exports.postLoginController = exports.postRegisterController = exports.getUserById = exports.getLogoutController = exports.getMeController = void 0;
const User_1 = require("../../../db/Models/User");
const utilitiesUser_1 = require("../../../utilities/users/utilitiesUser");
const getMeController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, expiresIn: _expiresIn, error } = (0, utilitiesUser_1.createTokenByRefresh)(res);
        if (error || !token)
            throw new Error("Not autorized");
        const id = (0, utilitiesUser_1.decodeToken)(token);
        const userDB = yield User_1.User.findById(id);
        if (!userDB)
            throw new Error("The user doesn't exist");
        const _a = userDB.toJSON(), { password } = _a, user = __rest(_a, ["password"]);
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.toString().split(":")[1].trim() });
    }
});
exports.getMeController = getMeController;
const getLogoutController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("refreshToken", {
            sameSite: "none",
            httpOnly: true,
            secure: true,
        });
        res.sendStatus(204);
    }
    catch (err) {
        res.status(400).json({ error: err.toString().split(":")[1].trim() });
    }
});
exports.getLogoutController = getLogoutController;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.User.findOne({ id }, { __v: 0 });
        if (!user)
            throw new Error("No user found");
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.toString().split(":")[1].trim() });
    }
});
exports.getUserById = getUserById;
const postRegisterController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        user.password = (0, utilitiesUser_1.encodePassword)(user.password);
        const idUser = yield (0, utilitiesUser_1.addUserToDB)(user);
        const { token, expiresIn } = (0, utilitiesUser_1.createToken)(idUser);
        (0, utilitiesUser_1.createRefreshToken)(idUser, res);
        res.status(201).json({ token, expiresIn });
    }
    catch (err) {
        res.status(400).json({ error: err.message.split(":")[2].trim() });
    }
});
exports.postRegisterController = postRegisterController;
const postLoginController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_email, password } = res.locals.user;
        let user;
        if (user_email.includes("@")) {
            const pasagerUser = yield User_1.User.findOne({ email: user_email });
            if (!pasagerUser)
                throw new Error("The user not exist");
            const _b = pasagerUser.toJSON(), { username, email, age } = _b, newUser = __rest(_b, ["username", "email", "age"]);
            user = newUser;
        }
        else {
            const pasagerUser = yield User_1.User.findOne({ username: user_email });
            if (!pasagerUser)
                throw new Error("The user not exist");
            const _c = pasagerUser.toJSON(), { username, email, age } = _c, newUser = __rest(_c, ["username", "email", "age"]);
            user = newUser;
        }
        const isEqualsPassword = (0, utilitiesUser_1.decodePassword)(user.password, password);
        if (!isEqualsPassword)
            throw new Error("Password not correct");
        const { token, expiresIn } = (0, utilitiesUser_1.createToken)(user._id.toString());
        (0, utilitiesUser_1.createRefreshToken)(user._id.toString(), res);
        res.status(200).json({ token, expiresIn });
    }
    catch (err) {
        res.status(400).json({ error: err.toString().split(":")[1].trim() });
    }
});
exports.postLoginController = postLoginController;
const putUpdateUserController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const { token, error } = (0, utilitiesUser_1.createTokenByRefresh)(res);
        if (error || !token)
            throw new Error("Not autorized");
        const id = (0, utilitiesUser_1.decodeToken)(token);
        const newUser = yield (0, utilitiesUser_1.getUserAndUpdateById)(id, user);
        res.json(newUser);
    }
    catch (err) {
        res.status(400).json({ error: err.toString().split(":")[1].trim() });
    }
});
exports.putUpdateUserController = putUpdateUserController;
const deleteUserController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, error } = (0, utilitiesUser_1.createTokenByRefresh)(res);
        if (error || !token)
            throw new Error("Not autorized");
        const id = (0, utilitiesUser_1.decodeToken)(token);
        if (!id)
            throw new Error("Invalid token");
        const uniqueName = yield (0, utilitiesUser_1.findUserById)(id);
        if (!uniqueName)
            throw new Error("The user doesn't exist");
        yield (0, utilitiesUser_1.deleteUserById)(id);
        res.clearCookie("refreshToken", {
            sameSite: "none",
            httpOnly: true,
            secure: true,
        });
        res.sendStatus(204);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.deleteUserController = deleteUserController;
