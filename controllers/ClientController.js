import bcrypt from "bcrypt";
import { clientModel, messagesModel } from "../models/Models.js";
import { decodeAuthorizationToken } from "../middlewares/Auth.js";
import {
  mapClientInformation,
  mapNewClientMessage,
  mapUpdateClientMessage,
} from "../helpers/PayloadMapper.js";

export const addClient = async (req, res) => {
  try {
    await clientModel.create({ ...req.body }).then(async (newClient) => {
      if (!newClient) {
        res.status(400).json({
          msg: `Create new client operation failed`,
        });
      }
      const messageBody = mapNewClientMessage(newClient);
      await messagesModel.create(messageBody);

      res.status(200).json({
        msg: `Client ${newClient.id} created successfully!`,
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
  }
  res.status(200).json({
    token: res.token,
  });
};

export const updateClient = async (req, res) => {
  try {
    let authFromHeaders = req.headers.authorization;
    const token = authFromHeaders.split(" ")[1];
    const decodedEmail = decodeAuthorizationToken(token).email;
    const updateRequest = req.body;

    if (updateRequest.clientCode) {
      const salt = await bcrypt.genSalt(10);
      updateRequest.clientCode = await bcrypt.hash(
        updateRequest.clientCode,
        salt
      );
    }

    const filters = { _id: req.params.id, email: decodedEmail };
    await clientModel
      .findOneAndUpdate(filters, updateRequest)
      .then(async (foundClient) => {
        if (!foundClient) {
          res.status(400).json({
            msg: `Client ${req.params.id} can't be updated or is invalid`,
          });
        }

        const messageBody = mapUpdateClientMessage(foundClient);
        await messagesModel.create(messageBody);

        res.status(200).json({
          msg: `Client ${req.params.id} has been updated successfully`,
          updates: updateRequest,
        });
      });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export const getClient = async (req, res) => {
  try {
    let authFromHeaders = req.headers.authorization;
    const token = authFromHeaders.split(" ")[1];
    const decodedEmail = decodeAuthorizationToken(token).email;

    await clientModel
      .findOne({ _id: req.params.id, email: decodedEmail })
      .then((foundClient) => {
        if (!foundClient) {
          res.status(400).json({
            msg: `Client ${req.params.id} could not be found`,
          });
        }
        res.status(200).json({
          client: mapClientInformation(foundClient),
        });
      });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
