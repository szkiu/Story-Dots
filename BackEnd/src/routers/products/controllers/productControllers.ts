import { Request, Response } from "express";
import { Product } from "../../../db/Models/Products";
import { User } from "../../../db/Models/User";
import {
  createTokenByRefreshToken,
  decodeRefresh,
} from "../../../utilities/users/utilitiesUser";
import jwt from "jsonwebtoken";

export const productsController = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    const LIMIT = 5;

    const newPage = Number(page) + 1;

    const products = await Product.find().limit(newPage * LIMIT);

    if (!products.length) throw new Error("No products now");

    res.json(products);
  } catch (err: any) {
    res.status(400).json({ error: err.toString().split(":")[1].trim() });
  }
};

export const lenProductsController = async (req: Request, res: Response) => {
  try {
    const { cat, author } = req.query;

    if (cat) {
      const catProducts = await Product.find({ category: cat });

      return res.json({ lenCat: catProducts.length });
    }

    if (author) {
      const authorProducts = await Product.find({ author });

      return res.json({ lenAuthor: authorProducts.length });
    }

    const allProducts = await Product.find();

    if (!allProducts.length) throw new Error("No products now");

    return res.json({ len: allProducts.length });
  } catch (err: any) {
    return res.status(400).json({ error: err.toString().split(":")[1].trim() });
  }
};

export const productsCatController = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { page } = req.query;
    const LIMIT = 5;

    const newPage = Number(page) + 1;

    const products = await Product.find({ category }).limit(newPage * LIMIT);

    if (!products.length) throw new Error("No products now");

    res.json(products);
  } catch (err: any) {
    res.status(400).json({ error: err.toString().split(":")[1].trim() });
  }
};

export const productsAuthorController = async (
  _req: Request,
  res: Response
) => {
  try {
    const { products } = res.locals;

    res.json(products);
  } catch (err: any) {
    res.status(400).json({ error: err.toString().split(":")[1].trim() });
  }
};

export const productIdController = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;
    const { product } = res.locals;

    // @ts-ignore
    const decodedToken = jwt.decode(refreshToken, process.env.JWT_REFRESH);

    if (createTokenByRefreshToken(refreshToken)) throw new Error("Not allowed");

    let id;
    decodedToken ? (id = decodedToken.id) : null;

    if (product.authorId !== id && createTokenByRefreshToken(refreshToken)) {
      const { authorId, __v, ...newProduct } = product.toObject();

      res.json(newProduct);
    } else {
      res.json(product);
    }
  } catch (err: any) {
    res.status(400).json({ error: err.toString().split(":")[1].trim() });
  }
};

export const productAddController = async (req: Request, res: Response) => {
  try {
    let { refreshToken } = req.cookies;
    const { body } = req;

    const id = decodeRefresh(refreshToken);

    if (!id) throw new Error("You need to login to create a product");

    if (createTokenByRefreshToken(refreshToken))
      throw new Error("You need to log in");

    const user = await User.findById(id);

    if (id !== body.authorId || user?.username !== body.author)
      throw new Error("You can't create products");

    const product = new Product(body);

    await product.save();

    const { authorId, ...newBody } = body;

    res.status(200).json(newBody);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const productDeleteController = async (req: Request, res: Response) => {
  try {
    const { id: idParams, authorId } = req.query;
    const { refreshToken } = req.cookies;

    const id = decodeRefresh(refreshToken);

    if (!id) throw new Error("You need to login to delete a product");

    if (createTokenByRefreshToken(refreshToken))
      throw new Error("You need to log in");

    if (id !== authorId) throw new Error("You can't delete products");
    const deletedPrd = await Product.findByIdAndDelete(idParams);

    if (!deletedPrd) throw new Error("The product doesn't exist");

    res.sendStatus(204);
  } catch (err: any) {
    res.status(400).json({ error: err.toString().split(":")[1].trim() });
  }
};

export const productUpdateConstroller = async (req: Request, res: Response) => {
  try {
    const { id: idParams } = req.params;
    const { body } = req;
    const { refreshToken } = req.cookies;

    const id = decodeRefresh(refreshToken);

    if (!id) throw new Error("You need to login to create a product");

    if (createTokenByRefreshToken(refreshToken))
      throw new Error("You need to log in");

    const user = await User.findById(id);
    if (id !== body.authorId || user?.username !== body.author)
      throw new Error("You can't create products");

    const updatedPro = await Product.findByIdAndUpdate(idParams, body);
    if (!updatedPro) throw new Error("The product doesn't exist");

    const { authorId, ...newBody } = body;

    res.status(200).json(newBody);
  } catch (err: any) {
    res.status(400).json({ error: err.toString().split(":")[1].trim() });
  }
};
