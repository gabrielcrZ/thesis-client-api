import { Send } from "./AsyncSend.js";
import { clientModel, orderModel } from "../models/Models.js";
import { decodeAuthorizationToken } from "../middlewares/Auth.js";

export const cancelOrder = async (req, res) => {
  try {
    let authFromHeaders = req.headers.authorization;
    const token = authFromHeaders.split(" ")[1];
    const decodedClientId = decodeAuthorizationToken(token).clientId;

    await orderModel
      .findOne({ _id: req.params.id, clientId: decodedClientId })
      .then((foundOrder) => {
        if (!foundOrder.currentStatus === "Registered by client") {
          res.status(400).json({
            msg: `Order ${req.params.id} can't be cancelled because it was already processed or is invalid`,
            currentStatus: foundOrder.currentStatus,
          });
        } else {
          const message = {
            orderId: req.params.id,
            ...req.body,
          };
          new Send().execute(message);

          res.status(200).json({
            message: "Order cancel request successfully sent!",
          });
        }
      });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export const deleteClient = async (req, res) => {
  try {
    let authFromHeaders = req.headers.authorization;
    const token = authFromHeaders.split(" ")[1];
    const decodedEmail = decodeAuthorizationToken(token).email;

    await clientModel
      .findOne({
        _id: req.params.id,
        email: decodedEmail,
      })
      .then((foundClient) => {
        if (!foundClient) {
          res.status(400).json({
            msg: `No client with id: ${req.params.id} was found`,
          });
        } else {
          const message = {
            clientId: req.params.id,
            ...req.body,
          };

          new Send().execute(message);
          res.status(200).json({
            msg: `Delete request for client ${req.params.id} has been sent`,
          });
        }
      });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
