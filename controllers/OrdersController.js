import {
  clientModel,
  orderModel,
  ordersHistoryModel,
} from "../models/Models.js";
import { decodeAuthorizationToken } from "../middlewares/Auth.js";
import {
  mapNewOrder,
  mapNewOrderUpdate,
  mapOrdersToClientOrders,
} from "../helpers/PayloadMapper.js";

export const addOrder = async (req, res) => {
  try {
    let authFromHeaders = req.headers.authorization;
    const token = authFromHeaders.split(" ")[1];
    const decodedToken = decodeAuthorizationToken(token);
    const decodedEmail = decodedToken.email;
    const decodedClientId = decodedToken.clientId;

    var client = await clientModel.findOne({
      email: decodedEmail,
      _id: decodedClientId,
    });
    const newOrder = mapNewOrder(
      decodedEmail,
      client._id,
      client.clientName,
      client.clientPhone,
      req.body
    );

    await orderModel.create(newOrder).then(async (addedOrder) => {
      if (!addedOrder) {
        res.status(400).json({
          msg: `Order could not be added`,
        });
      } else {
        const newOrderUpdate = mapNewOrderUpdate(addedOrder);

        await ordersHistoryModel
          .create(newOrderUpdate)
          .then(async (newOrderUpdate) => {
            if (!newOrderUpdate) {
              await orderModel.deleteOne(addedOrder).then(() => {
                res.status(400).json({
                  msg: `Order ${addedOrder._id} was not added because the initial update failed`,
                });
              });
            } else {
              res.status(200).json({
                msg: "Order was added successfully!",
                orderId: addedOrder.id,
              });
            }
          });
      }
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
    const decodedClientId = decodeAuthorizationToken(token).clientId;
    await orderModel
      .find({ clientId: decodedClientId })
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
    const decodedClientId = decodeAuthorizationToken(token).clientId;

    await orderModel
      .findOne({
        _id: req.params.id,
        clientId: decodedClientId,
      })
      .then((foundOrder) => {
        if (!foundOrder) {
          res.status(400).json({
            msg: `No order with id ${req.params.id} was found`,
          });
        }
        res.status(200).json({
          order: mapOrdersToClientOrders([foundOrder]) || "",
        });
      });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
