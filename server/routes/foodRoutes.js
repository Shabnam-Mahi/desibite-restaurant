import express from "express";
import menu from "../data/menu.js";

const router = express.Router();

router.get("/", (req, res) => {
  const { category, cuisine, search } = req.query;

  let foods = [...menu];

  if (category && category !== "All") {
    foods = foods.filter(
      (food) => food.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (cuisine && cuisine !== "All") {
    foods = foods.filter(
      (food) => food.cuisine.toLowerCase() === cuisine.toLowerCase()
    );
  }

  if (search) {
    foods = foods.filter((food) =>
      `${food.name} ${food.description}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  res.json({
    success: true,
    count: foods.length,
    foods
  });
});

export default router;