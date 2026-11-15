import express from "express";
import menu from "../data/menu.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string" || message.length > 1000) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid message."
    });
  }

  const text = message.toLowerCase();

  const matchingFoods = menu.filter((food) =>
    `${food.name} ${food.category} ${food.cuisine} ${food.description}`
      .toLowerCase()
      .split(/\s+/)
      .some((word) => word.length > 2 && text.includes(word))
  );

  let reply;

  if (text.includes("breakfast")) {
    reply = "Our breakfast menu includes Chole Bhature, Dhokla and Masala Dosa.";
  } else if (text.includes("punjabi")) {
    reply = "Try our Punjabi Chole Bhature, Paneer Butter Masala and Dal Makhani.";
  } else if (text.includes("gujarati")) {
    reply = "Try our Gujarati Thali, Khaman Dhokla and Gujarati Kadhi.";
  } else if (matchingFoods.length) {
    reply = `You may like: ${matchingFoods
      .slice(0, 3)
      .map((food) => food.name)
      .join(", ")}.`;
  } else {
    reply = "Welcome to DesiBite! Ask me about Punjabi food, Gujarati food, breakfast, lunch or dinner.";
  }

  res.json({
    success: true,
    reply,
    suggestions: matchingFoods.slice(0, 3).map((food) => food.name)
  });
});

export default router;