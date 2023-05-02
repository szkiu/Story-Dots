import { Response, Request } from "express";
import { UserNormal, User } from "../../../db/Models/User";
import {
  addUserToDB,
  encodePassword,
  createToken,
  decodeToken,
  decodePassword,
  createTokenByRefresh,
  createRefreshToken,
  getUserAndUpdateById,
  deleteUserById,
  findUserById,
} from "../../../utilities/users/utilitiesUser";
import { deleteManyProductsByUniqueName } from "../../../utilities/products/utilitiesProduct";

export const getMeController = async (_req: Request, res: Response) => {
  try {
    const { token, expiresIn: _expiresIn, error } = createTokenByRefresh(res);

    if (error || !token) throw new Error("Not autorized");

    const id = decodeToken(token);

    const userDB = await User.findById(id);

    if (!userDB) throw new Error("The user doesn't exist");

    const { password, ...user } = userDB.toJSON();

    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.toString().split(":")[1].trim() });
  }
};

export const getLogoutController = async (_req: Request, res: Response) => {
  try {
    res.clearCookie("refreshToken", {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });

    res.sendStatus(204);
  } catch (err: any) {
    res.status(400).json({ error: err.toString().split(":")[1].trim() });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ id }, { __v: 0 });

    if (!user) throw new Error("No user found");

    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.toString().split(":")[1].trim() });
  }
};

export const postRegisterController = async (_req: Request, res: Response) => {
  try {
    const user: UserNormal = res.locals.user;

    user.password = encodePassword(user.password);

    const idUser = await addUserToDB(user);

    const { token, expiresIn } = createToken(idUser);

    createRefreshToken(idUser, res);

    res.status(201).json({ token, expiresIn });
  } catch (err: any) {
    res.status(400).json({ error: err.message.split(":")[2].trim() });
  }
};

export const postLoginController = async (_req: Request, res: Response) => {
  try {
    const { user_email, password } = res.locals.user;
    let user;

    if (user_email.includes("@")) {
      const pasagerUser = await User.findOne({ email: user_email });
      if (!pasagerUser) throw new Error("The user not exist");
      const { username, email, age, ...newUser } = pasagerUser.toJSON();
      user = newUser;
    } else {
      const pasagerUser = await User.findOne({ username: user_email });
      if (!pasagerUser) throw new Error("The user not exist");
      const { username, email, age, ...newUser } = pasagerUser.toJSON();
      user = newUser;
    }

    const isEqualsPassword = decodePassword(user.password, password);

    if (!isEqualsPassword) throw new Error("Password not correct");

    const { token, expiresIn } = createToken(user._id.toString());

    createRefreshToken(user._id.toString(), res);

    res.status(200).json({ token, expiresIn });
  } catch (err: any) {
    res.status(400).json({ error: err.toString().split(":")[1].trim() });
  }
};

export const putUpdateUserController = async (_req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    const { token, error } = createTokenByRefresh(res);

    if (error || !token) throw new Error("Not autorized");

    const id = decodeToken(token);

    const newUser = await getUserAndUpdateById(id, user);

    res.json(newUser);
  } catch (err: any) {
    res.status(400).json({ error: err.toString().split(":")[1].trim() });
  }
};

export const deleteUserController = async (_req: Request, res: Response) => {
  try {
    const { token, error } = createTokenByRefresh(res);

    if (error || !token) throw new Error("Not autorized");

    const id = decodeToken(token);

    if (!id) throw new Error("Invalid token");

    const uniqueName = await findUserById(id);

    if (!uniqueName) throw new Error("The user doesn't exist");

    const deletedProperties = await deleteManyProductsByUniqueName(
      uniqueName
    );

    if (!deletedProperties) throw new Error("Properties doesn't deleted yet");

    await deleteUserById(id);

    res.clearCookie("refreshToken", {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });

    res.sendStatus(204);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
