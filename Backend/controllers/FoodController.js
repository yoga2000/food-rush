import mongoose from "mongoose";
import foodModel from "../models/FoodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  let img_filename = `${req.file.filename}`;
  console.log(img_filename);

  const { name, description, price, category } = req.body;

  const food = new foodModel({
    name,
    description,
    price,
    category,
    image: img_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// list all foods
const listAllFoods = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error not found" });
  }
};

// remove foodItem

const removeFood = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such workout" });
  }
  try {
    const food = await foodModel.findById(id);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }
    console.log(food);
    const imagePath = `uploads/${food.image.trim()}`;

    fs.unlink(imagePath, (err) => {
      if (err) throw err;
      console.log("Image deleted");
    });

    await foodModel.findByIdAndDelete(id);
    res.json({ success: true, message: "food removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: " Error" });
  }
};

// getById

const getById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "No such workout" });
  }
  const food = await foodModel.findById(id);

  if (!food) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(food);
};
export { addFood, removeFood, listAllFoods, getById };
