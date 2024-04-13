import {
  clientModel,
  orderModel,
  ordersHistoryModel,
} from "../models/Models.js";
import { decodeAuthorizationToken } from "../middlewares/Auth.js";
import { mapNewOrder, mapNewOrderUpdate, mapOrdersToClientOrders } from "../helpers/PayloadMapper.js";

export const addOrder = async (req, res) => {
  try {
    let authFromHeaders = req.headers.authorization;
    const token = authFromHeaders.split(" ")[1];
    const decodedEmail = decodeAuthorizationToken(token).email;

    var client = await clientModel.findOne({email : decodedEmail})
    const newOrder = mapNewOrder(decodedEmail, client.clientName, client.clientPhone, req.body);

    await orderModel.create(newOrder).then(async (addedOrder) => {
      const newOrderUpdate = mapNewOrderUpdate(addedOrder);

      await ordersHistoryModel.create(newOrderUpdate).then(() => {
        res.status(200).json({
          msg: "Order was added successfully!",
          orderNr: addedOrder.id,
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
          orders: mapOrdersToClientOrders(clientOrders) || [],
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
          order: mapOrdersToClientOrders(foundOrder) || "",
        });
      });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};


