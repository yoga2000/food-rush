import mongoose from "mongoose";
import { app } from "../server.js";

const port = process.env.PORT || 4000;
export const connectDb = async () => {
  await mongoose
    .connect(
      "mongodb+srv://root:root@yogaraj.m4uknnq.mongodb.net/?retryWrites=true&w=majority&appName=FOOD_DELIVERY"
    )
    .then(() =>
      app.listen(port, () => {
        console.log(`server is running on ${port}`);
      })
    );
};
