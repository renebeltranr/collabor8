import { IUser, RequestWithUser } from "../types/types";
import User from "../models/user";
import { NextFunction, Response } from "express";
import { SessionData } from "express-session";

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const uid: SessionData = req.session;
    const user: IUser = await User.findOne({ _id: uid }) as IUser;
    if (!user) throw new Error("Error at authMiddleware");
    req.user = user;
    next();
  } catch (error) {
    return res.status(401);
  }
};

export default authMiddleware;
