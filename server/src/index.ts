import {Handler, Error} from "./types/types";

import express from "express";
import cors from "cors";
import db from "./models/index";
import userRouter from "./router/user.router";
import collabRouter from "./router/collab.router";
import session from "express-session";
import morgan from 'morgan';

const PORT = 3001;
const app = express();

const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(morgan('dev'));
app.use(cors(corsConfig));
app.use(express.json());

const sid = {
  name: "sid",
  secret: "SuperSecretPassword",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1hr
    httpOnly: false,
    sameSite: true,
    secure: false,
  },
};

app.use(session(sid));
app.use(userRouter);
app.use("/collab", collabRouter);

const notFound: Handler = (req, res) => {
  res.status(404).send("404 not found");
}

app.get("*", notFound);

const serverDidntStart: any = (err: any) => {
  if (err) {
    console.log(`Server couldn't start. Error: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
    db();
  }
}

app.listen(PORT, serverDidntStart);
module.exports = app;
