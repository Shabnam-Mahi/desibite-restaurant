import express from "express";
import menu from "../data/menu.js";

const router = express.Router();

const orders = [];

router.post("/", (req, res) => {
  const { items, customer, fulfillment } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Your cart is empty."
    });
  }

  if (!customer?.name || !customer?.phone) {
    return res.status(400).json({
      success: false,
      message: "Customer name and phone are required."
    });
  }

  const orderItems = [];

  for (const item of items) {
    const food = menu.find((food) => food.id === item.id);
    const quantity = Number(item.quantity);

    if (!food || !Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
      return res.status(400).json({
        success: false,
        message: "Invalid food item or quantity."
      });
    }

    orderItems.push({
      id: food.id,
      name: food.name,
      price: food.price,
      quantity
    });
  }

  const subtotal = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const order = {
    id: `DB-${Date.now()}`,
    customer,
    fulfillment: fulfillment || "Pickup",
    items: orderItems,
    subtotal: Number(subtotal.toFixed(2)),
    status: "Received",
    createdAt: new Date().toISOString()
  };

  orders.push(order);

  res.status(201).json({
    success: true,
    message: "Order received successfully!",
    order
  });
});

router.get("/:id", (req, res) => {
  const order = orders.find((item) => item.id === req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found."
    });
  }

  res.json({
    success: true,
    order
  });
});

export default router;