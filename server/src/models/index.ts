import mongoose from "mongoose";
const PORT = 27017;
const NAME = "collabor8";
const URI = `mongodb://127.0.0.1:${PORT}/${NAME}`;
const db = () => {
  mongoose.connect(URI);
  mongoose.connection.once("open", () => {
    console.log(`DB Service listening on port ${PORT}`);
  });
  mongoose.connection.on("Error connecting to DB", console.error);
};


export default db;