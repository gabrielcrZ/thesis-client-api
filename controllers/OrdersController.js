import {
  clientModel,
  orderModel,
  ordersHistoryModel,
} from "../models/Models.js";
import { decodeAuthorizationToken } from "../middlewares/Auth.js";
import { mapNewOrder, mapNewOrderUpdate } from "../helpers/PayloadMapper.js";
import bcrypt from "bcrypt";

export const addClient = async (req, res) => {
  try {
    await clientModel.create({ ...req.body }).then(() => {
      res.status(200).json({
        msg: "User created!",
      });
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
    const newOrder = mapNewOrder(email, req.body);

    await orderModel.create(newOrder).then(async (addedOrder) => {
      const newOrderUpdate = mapNewOrderUpdate(addedOrder);

      await ordersHistoryModel.create(newOrderUpdate).then(() => {
        res.status(200).json({
          msg: "Order was added successfully!",
          order: addedOrder,
        });
      });
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

    await orderModel
      .find({ clientEmail: decodedEmail })
      .sort("createdAt")
      .then((clientOrders) => {
        res.status(200).json({
          orders: clientOrders || [],
          count: clientOrders.length,
        });
      });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    let authFromHeaders = req.headers.authorization;
    const token = authFromHeaders.split(" ")[1];
    const decodedEmail = decodeAuthorizationToken(token).email;

    await orderModel
      .findOne({
        _id: req.params.id,
        clientEmail: decodedEmail,
      })
      .then((foundOrder) => {
        res.status(200).json({
          order: foundOrder || "",
        });
      });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export const updateClient = async (req, res) => {
  try {
    let authFromHeaders = req.headers.authorization;
    const token = authFromHeaders.split(" ")[1];
    const decodedEmail = decodeAuthorizationToken(token).email;
    const updateRequest = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedClientCode = await bcrypt.hash(updateRequest.clientCode, salt);

    const filters = { _id: req.params.id, email: decodedEmail };
    const updateBody = {
      email: updateRequest.email,
      clientName: updateRequest.clientName,
      clientAddress: updateRequest.clientAddress,
      clientPhone: updateRequest.clientPhone,
      clientCode: hashedClientCode,
    };
    await clientModel.findOneAndUpdate(filters, updateBody);
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
