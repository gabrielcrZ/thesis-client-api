import mongoose from "mongoose";

export const clientModel = mongoose.model(
  "Clients",
  new mongoose.Schema({
    email: {
      type: String,
      required: [true, "Please enter an email!"],
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Please enter a valid email!",
      ],
      unique: true,
    },
    clientCode: {
      type: String,
      required: [true, "Please enter a valid client code!"],
    },
  })
);