import bcrypt from "bcrypt";
import { clientModel } from "../models/Models.js";
import { decodeAuthorizationToken } from "../middlewares/Auth.js";


export const addClient = async (req, res) => {
    try {
      await clientModel.create({ ...req.body }).then((newClient) => {
        res.status(200).json({
          msg: `User ${newClient.id} created!`,
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