import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import connectDB from "./server.js";
import cityRouter from "./routes/city.routes.js";
import path from "path";

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../search-client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../search-client", "dist", "index.html")
    );
  });
}
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

app.use("/api/cities", cityRouter);
