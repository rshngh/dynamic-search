import express from "express";
import City from "../models/city.model.js";

const router = express.Router();

router.get("/city", async (req, res) => {
  try {
    const search = req.query.search || "";
    console.log("req.query.search", search);
    const cities = await City.find({
      name: { $regex: search, $options: "i" },
    });
    console.log("cities", cities);
    res.status(200).json(cities);
  } catch (error) {
    console.log("error in city router", err);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export default router;

// const insertCities = async () => {
//   try {
//     const docs = await City.insertMany(citiesList);
//     return Promise.resolve(docs);
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

// insertCities()
//   .then((docs) => console.log(docs))
//   .catch((err) => console.log(err));
