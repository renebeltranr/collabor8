import { Handler, Error } from "./types/types";

const express = require("express");
const cors = require("cors");
const db = require("./models/index");
const userRouter = require("./router/user.router");
const collabRouter = require("./router/collab.router");
const session = require("express-session");

const PORT = 3001;
const app = express();

const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

const sid = {
  name: "sid",
  secret: "SuperSecretPassword",
  saveUninitialized: false,
  resave: false,
  cookie: {
    httpOnly: false,
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

app.listen(PORT, (err: Error) => {
  if (err) {
    console.log(`Server couldn't start. Error: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
    db();
  }
});
