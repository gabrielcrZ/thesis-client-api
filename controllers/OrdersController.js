import { clientModel } from "../models/Models.js";

export const clientRequest = async (req, res) => {
  try {
    await clientModel.create({ ...req.body });
    res.status(200).json({
      msg: "User created!",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export const tokenRequest = async (req, res) => {
  if (!res.token) {
    res.status(400).json({
      body: req.body,
    });
  } else {
    res.status(200).json({
      token: res.token,
    });
  }
};

export const orderRequest = async (req, res) => {
  try {
    res.status(200).json({
      msg: "You reached order controller",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export const updateRequest = async (req, res) => {
  req.status(200).json({
    body: req.body,
  });
};
