import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/user";
import { RequestWithUser, DataUpdate } from "../types/types";

const create = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (user)
    return res
      .status(409)
      .send({ error: "409", message: "User already exists" });
  try {
    if (password === "") throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const user = await newUser.save();
    req.session.uid = user._id;
    
    res.status(201).send(user);
  } catch (error) {
    console.log('Controller create User error:', error);
    res.status(400).send({ error, message: "Could not create user" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user !== null) {
      const validatedPass = await bcrypt.compare(password, user.password!);
      if (!validatedPass) throw new Error();
    }
    if (user !== null) req.session.uid = user._id;
    res.status(200).send(user);
  } catch (error) {
    console.log('Controller login error:', error),
    res
      .status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};

const profile = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error: Error, message: "User not found" });
  }
};

const profileUpdate = async (req: Request, res: Response) => {
  try {
    const uid = req.params.id;
    if (uid === req.body._id) {
      let dataToUpdate: DataUpdate = {};
      if (req.body.country) dataToUpdate.country = req.body.country;
      if (req.body.bio) dataToUpdate.bio = req.body.bio;
      const result = await User.findOneAndUpdate({ _id: uid }, dataToUpdate, {
        new: true,
      });
      if (result !== null) result.password = undefined;
      res.status(201).send(result);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log('Controller profileUpdate error:', error);
    res.status(400).send({ error, message: "Error updating profile" });
  }
};

const me = async (req: RequestWithUser, res: Response) => {
  try {
    const { _id, username, country, bio, owncollabs } = req.user;
    const user = { _id, username, country, bio, owncollabs };
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error: Error, message: "User not found" });
  }
};

const logout = (req: Request, res: Response) => {
  req.session.destroy((error: Error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: "Could not log out, please try again" });
    } else {
      res.clearCookie("sid");
      res.status(200).send({ message: "Logout successful" });
    }
  });
};

export default { create, login, profile, me, logout, profileUpdate };
