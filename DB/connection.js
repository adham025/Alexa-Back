import mongoose from "mongoose";

const connection = async () => {
  return await mongoose
    .connect("mongodb+srv://adhamgalal500:BuTXeh5sJBGCi306@alexa.t8ceg.mongodb.net/?retryWrites=true&w=majority&appName=Alexa")
    .then(() => {
      console.log("Database connected");
    })
    .catch(() => {
      console.log("Database error");
    });
};

export default connection;
