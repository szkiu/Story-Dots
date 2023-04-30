"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("./db/connectDataBase");
const users_route_1 = __importDefault(require("./routers/user/users.route"));
const product_route_1 = __importDefault(require("./routers/products/product.route"));
//Declare app
const app = (0, express_1.default)();
//Interpreters
const whiteList = [
    process.env.ORIGIN_1,
    process.env.ORIGIN_2,
    "http://localhost:5050",
    "http://localhost:3000",
];
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || (whiteList === null || whiteList === void 0 ? void 0 : whiteList.includes(origin))) {
            return callback(null, true);
        }
        return callback(new Error(`Error CORS origin ${origin}, not autorized!`));
    },
    credentials: true,
}));
//Routers
app.use("/api/v1/auth", users_route_1.default);
app.use("/api/v1/products", product_route_1.default);
//Port and Listen
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
