import { Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, UserNormal } from "../../db/Models/User";

// Tokens
export function createToken(payload: string) {
  const expiresIn = 60 * 15;

  // @ts-ignore
  const token: string = jwt.sign({ id: payload }, process.env.JWT_SECRET, {
    expiresIn,
  });

  return { token, expiresIn };
}

export function createRefreshToken(id: string, res: Response = {} as Response) {
  const expiresIn = 60 * 60 * 24 * 30;

  //@ts-ignore
  const token = jwt.sign({ id }, process.env.JWT_REFRESH, { expiresIn });

  res.setHeader(
    "Set-Cookie",
    `refreshToken=${token}; Secure; SameSite=None; HttpOnly; Path=/; Max-Age=${
      expiresIn * 1000
    }`
  );

  return token;
}

export function createTokenByRefresh(res: Response) {
  try {
    const refreshToken = res.locals.refreshToken;

    // @ts-ignore
    const refreshTokenObj = jwt.verify(refreshToken, process.env.JWT_REFRESH);
    
    const { token, expiresIn } = createToken(refreshTokenObj.id);
    return { token, expiresIn };
  } catch (err) {
    return { error: "Not autoriced" };
  }
}

export function decodeToken(token: string) {
  try{
    const decoded: jwt.Jwt & jwt.JwtPayload = jwt.verify(
      token,
      // @ts-ignore
      process.env.JWT_SECRET
    );
  
    return decoded?.id;
  }catch{
    return false;
  }
}

export function decodeRefresh(refresh: string){
  try{
    const decoded: jwt.Jwt & jwt.JwtPayload = jwt.verify(
      refresh,
      // @ts-ignore
      process.env.JWT_REFRESH
    );
    
    return decoded?.id;
  }catch{
    return false;
  }
}

export function createTokenByRefreshToken(refreshToken: string) {
  try {
    createRefreshToken(refreshToken);

    return true;
  } catch (err) {
    return false;
  }
}

// DataBase
export async function addUserToDB(user: UserNormal) {
  const exist = await verifyUserByUniqueName(user.uniqueName);

  if (!exist) {
    const newUser = new User(user);
    await newUser.save();
    return newUser.id;
  }

  throw new Error("The user already exist");
}

export async function findUserById(id: string) {
  const user = await User.findById(id);

  if (!user) return false;

  return user.uniqueName;
}

export async function getUserAndUpdateById(id: string, userParams: any) {
  const oldUser = await User.findByIdAndUpdate(id, userParams);

  if (!oldUser) throw new Error("The user doesn't exist");

  const newUser = await User.findById(id);

  //@ts-ignore
  const { __v, _id, password, ...user } = newUser?.toJSON();

  return user;
}

export async function deleteUserById(id: string) {
  const oldUser = await User.findByIdAndRemove(id);

  if (!oldUser) throw new Error("The user doesn't exist");

  return true;
}

export async function verifyUserByUniqueName(uniqueName: string) {
  const user = await User.findOne({ uniqueName: uniqueName });

  if (!user) return false;

  return true;
}

export async function getUserByUniqueName(uniqueName: string) {
  const user = await User.findOne(
    { uniqueName: uniqueName },
    { uniqueName: 1, username: 1, email: 1, image: 1, age: 1, _id: 0 }
  );

  if (!user) return false;

  return user;
}

// Password
export function decodePassword(hashP: string, password: string) {
  return bcrypt.compareSync(password, hashP);
}

export function encodePassword(password: string) {
  return bcrypt.hashSync(password, 10);
}
