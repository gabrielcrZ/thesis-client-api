import { clientModel, orderModel } from "../models/Models.js";
import { decodeAuthorizationToken } from "../middlewares/Auth.js";

export const addClient = async (req, res) => {
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

export const getToken = async (req, res) => {
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

export const addOrder = async (req, res) => {
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
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    let authFromHeaders = req.headers.authorization;
    const token = authFromHeaders.split(" ")[1];
    const decodedEmail = decodeAuthorizationToken(token).email;

    const clientOrders = await orderModel
      .find({ clientEmail: decodedEmail })
      .sort("createdAt");
    res.status(200).json({
      orders: clientOrders,
      count: clientOrders.length,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
