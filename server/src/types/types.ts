import { Request, RequestHandler as Middleware, Response } from "express";
export type User = { username: string; password: string };

type Method = "get" | "post" | "put" | "delete";

export type Handler = (req: Request, res: Response) => any;

export type Error = any;

export type Route = {
  method: Method;
  path: string;
  middleware: Middleware[];
  handler: Handler;
};

export type IUser = {
  username: string;
  password: string | undefined;
  bio: string;
  profilepic: string;
  country: string;
  instruments: any;
  owncollabs: Array<any>;
  othercollabs: any;
  createdAt: string;
  updatedAt: string;
  _id: string;
};

declare module "express-session" {
  export interface SessionData {
    uid: string;
  }
}

export type ICollab = {
  owner: IUser;
  name: string;
  tracks: any;
  pendingtracks: any;
  createdAt: string;
  updatedAt: string;
  _id: string;
};

export interface RequestWithUser extends Request {
  user: IUser;
}

export type DataUpdate = {
  [key: string]: string;
};
