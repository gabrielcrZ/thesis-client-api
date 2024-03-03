import { clientModel, orderModel } from "../models/Models.js";
import { decodeAuthorizationToken } from "../middlewares/Auth.js";

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
    let authFromHeaders = req.headers.authorization;
    const token = authFromHeaders.split(" ")[1];
    const email = decodeAuthorizationToken(token).email;

    const newOrder = {
      clientEmail: email,
      currentStatus: "Registered by client",
      ...req.body,
    };
    // remained here, enrich new client call, enrich new order payload
    // check the commented code on authorization handler
    await orderModel.create(newOrder);
    res.status(200).json({
      msg: "Order was added successfully!",
      order: newOrder
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
