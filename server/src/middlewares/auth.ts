import { IUser, RequestWithUser } from "../types/types";
import User from "../models/user";
import { NextFunction, Response } from "express";
import { SessionData } from "express-session";

const authMiddleware: any = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uid } = req.session;
    const user: IUser = await User.findOne({ _id: uid }) as IUser;
    if (!user) console.log("User not authenticated");
    req.user = user;
    console.log('Auth', req.method)
    next();
  } catch (error) {
    console.log("Authentication Middleware error: ", error)
    return res.status(401);
  }
};

export default authMiddleware;
