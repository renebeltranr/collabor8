import { Request, RequestHandler as Middleware, Response } from "express";
export type User = { username: string; password: string };
import { Types } from 'mongoose';

type Method = "get" | "post" | "put" | "delete";

export type Handler = (req: Request, res: Response) => any;

export type Error = any;

export type Route = {
  method: Method;
  path: string;
  middleware: Middleware[];
  handler: Handler;
};


export type ITrack = {
  url: string,
  cid: string,
  username: string
}


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
  _id: Types.ObjectId;
  __v: any;
};

declare module "express-session" {
  export interface SessionData {
    uid: any;
  }
}

export type ICollab = {
  owner: Types.ObjectId;
  name: string;
  tracks: ITrack[];
  pendingtracks: ITrack[];
  createdAt: string;
  updatedAt: string;
  _id: Types.ObjectId;
  __v: any;
};

export interface RequestWithUser extends Request {
  user: IUser;
}

export type DataUpdate = {
  [key: string]: string;
};
