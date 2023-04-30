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
exports.encodePassword = exports.decodePassword = exports.getUserByUniqueName = exports.verifyUserByUniqueName = exports.deleteUserById = exports.getUserAndUpdateById = exports.findUserById = exports.addUserToDB = exports.createTokenByRefreshToken = exports.decodeRefresh = exports.decodeToken = exports.createTokenByRefresh = exports.createRefreshToken = exports.createToken = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../db/Models/User");
// Tokens
function createToken(payload) {
    const expiresIn = 60 * 15;
    // @ts-ignore
    const token = jsonwebtoken_1.default.sign({ id: payload }, process.env.JWT_SECRET, {
        expiresIn,
    });
    return { token, expiresIn };
}
exports.createToken = createToken;
function createRefreshToken(id, res = {}) {
    const expiresIn = 60 * 60 * 24 * 30;
    //@ts-ignore
    const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_REFRESH, { expiresIn });
    res.setHeader("Set-Cookie", `refreshToken=${token}; Secure; SameSite=None; HttpOnly; Path=/; Max-Age=${expiresIn * 1000}`);
    return token;
}
exports.createRefreshToken = createRefreshToken;
function createTokenByRefresh(res) {
    try {
        const refreshToken = res.locals.refreshToken;
        // @ts-ignore
        const refreshTokenObj = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH);
        const { token, expiresIn } = createToken(refreshTokenObj.id);
        return { token, expiresIn };
    }
    catch (err) {
        return { error: "Not autoriced" };
    }
}
exports.createTokenByRefresh = createTokenByRefresh;
function decodeToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 
        // @ts-ignore
        process.env.JWT_SECRET);
        return decoded === null || decoded === void 0 ? void 0 : decoded.id;
    }
    catch (_a) {
        return false;
    }
}
exports.decodeToken = decodeToken;
function decodeRefresh(refresh) {
    try {
        const decoded = jsonwebtoken_1.default.verify(refresh, 
        // @ts-ignore
        process.env.JWT_REFRESH);
        return decoded === null || decoded === void 0 ? void 0 : decoded.id;
    }
    catch (_a) {
        return false;
    }
}
exports.decodeRefresh = decodeRefresh;
function createTokenByRefreshToken(refreshToken) {
    try {
        createRefreshToken(refreshToken);
        return true;
    }
    catch (err) {
        return false;
    }
}
exports.createTokenByRefreshToken = createTokenByRefreshToken;
// DataBase
function addUserToDB(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const exist = yield verifyUserByUniqueName(user.uniqueName);
        if (!exist) {
            const newUser = new User_1.User(user);
            yield newUser.save();
            return newUser.id;
        }
        throw new Error("The user already exist");
    });
}
exports.addUserToDB = addUserToDB;
function findUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findById(id);
        if (!user)
            return false;
        return user.uniqueName;
    });
}
exports.findUserById = findUserById;
function getUserAndUpdateById(id, userParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const oldUser = yield User_1.User.findByIdAndUpdate(id, userParams);
        if (!oldUser)
            throw new Error("The user doesn't exist");
        const newUser = yield User_1.User.findById(id);
        //@ts-ignore
        const _a = newUser === null || newUser === void 0 ? void 0 : newUser.toJSON(), { __v, _id, password } = _a, user = __rest(_a, ["__v", "_id", "password"]);
        return user;
    });
}
exports.getUserAndUpdateById = getUserAndUpdateById;
function deleteUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const oldUser = yield User_1.User.findByIdAndRemove(id);
        if (!oldUser)
            throw new Error("The user doesn't exist");
        return true;
    });
}
exports.deleteUserById = deleteUserById;
function verifyUserByUniqueName(uniqueName) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ uniqueName: uniqueName });
        if (!user)
            return false;
        return true;
    });
}
exports.verifyUserByUniqueName = verifyUserByUniqueName;
function getUserByUniqueName(uniqueName) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ uniqueName: uniqueName }, { uniqueName: 1, username: 1, email: 1, image: 1, age: 1, _id: 0 });
        if (!user)
            return false;
        return user;
    });
}
exports.getUserByUniqueName = getUserByUniqueName;
// Password
function decodePassword(hashP, password) {
    return bcryptjs_1.default.compareSync(password, hashP);
}
exports.decodePassword = decodePassword;
function encodePassword(password) {
    return bcryptjs_1.default.hashSync(password, 10);
}
exports.encodePassword = encodePassword;
