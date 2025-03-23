import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import connectDB from "./db.js";

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

try {
  app.listen(PORT, () => {
    console.log(`Successfully connected to the server at port ${PORT}.`);
    connectDB(process.env.MONGODB_URI);
  });
} catch (error) {
  console.log("Error connecting to the server!");
}

app.get("/", (req, res) => {
  res.send("Server is running.");
});
