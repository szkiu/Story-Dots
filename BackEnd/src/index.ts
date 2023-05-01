//Imports
import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import "./db/connectDataBase";
import usersRouter from "./routers/user/users.route";
import productsRouter from "./routers/products/product.route";

//Declare app
const app: Express = express();

//Interpreters
const whiteList = [
  process.env.ORIGIN_1,
  process.env.ORIGIN_2,
  "http://localhost:5050",
  "http://localhost:3000",
];

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: function (origin, callback) {
      
      if (!origin || whiteList?.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Error CORS origin ${origin}, not autorized!`));
    },
    credentials: true,
  })
);

//Routers
app.use("/api/v1/auth", usersRouter);
app.use("/api/v1/products", productsRouter);

//Port and Listen
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});