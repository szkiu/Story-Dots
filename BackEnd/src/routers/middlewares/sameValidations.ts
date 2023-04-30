import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const isBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ error: "Body is needed" });
    return;
  }

  res.locals.user = req.body;

  next();
  return;
};

export const showErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ error: errors.array()[0].msg });
    return;
  }

  next();
};

export const hasTokenByCookie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Cookie version
  if (!req.cookies.refreshToken)
    return res.status(401).json({ error: "You don't have a token" });
    
  res.locals.refreshToken = req.cookies.refreshToken;
  next();
  return undefined;
};