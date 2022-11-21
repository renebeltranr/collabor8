import { IUser, RequestWithUser } from "../types/types";
import User from "../models/user";
import { NextFunction, Response } from "express";
import { SessionData } from "express-session";

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const uid: any = req.session as any;
    const user: any = await User.findOne({ _id: uid }) as any;
    if (!user) throw new Error("Error at authMiddleware");
    req.user = user;
    console.log('Auth', req.method)
    next();
  } catch (error) {
    console.log(error)
    return res.status(401);
  }
};

export default authMiddleware;
