const bcrypt = require("bcrypt");
const User = require("./../models/user");

const create = async (req, res) => {
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
    console.log(error);
    res.status(400).send({ error, message: "Could not create user" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    req.session.uid = user._id;
    res.status(200).send(user);
  } catch (error) {
    res
      .status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error, message: "User not found" });
  }
};

const profileUpdate = async (req, res) => {
  try {
    const uid = req.params.id;
    if (uid === req.body._id) {
      let dataToUpdate = {};
      if (req.body.country) dataToUpdate.country = req.body.country;
      if (req.body.bio) dataToUpdate.bio = req.body.bio;
      const result = await User.findOneAndUpdate({ _id: uid }, dataToUpdate, {
        new: true,
      });
      result.password = undefined;
      res.status(201).send(result);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: "Error updating profile" });
  }
};

const me = async (req, res) => {
  try {
    const { _id, username, country, bio, owncollabs } = req.user;
    const user = { _id, username, country, bio, owncollabs };
    res.status(200).send(user);
  } catch {
    res.status(404).send({ error, message: "User not found" });
  }
};

const logout = (req, res) => {
  req.session.destroy((error) => {
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

module.exports = { create, login, profile, me, logout, profileUpdate };
