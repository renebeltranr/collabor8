import { Request, RequestHandler as Middleware, Response } from "express";
export type User = { username: string; password: string };

type Method =
  | "get"
  | "post"
  | "put"
  | "delete";

export type Handler = (req: Request, res: Response) => any;

export type Error = any;

export type Route = {
  method: Method;
  path: string;
  middleware: Middleware[];
  handler: Handler;
};

export type IUser = {
  username: string,
  password: string,
  bio: string,
  profilepic: string,
  country: string,
  instruments: any,
  owncollabs: Array<any>,
  othercollabs: any,
  createdAt: any
  updatedAt: any
}

declare module 'express-session' {
  export interface SessionData {
    uid: string;
  }
}