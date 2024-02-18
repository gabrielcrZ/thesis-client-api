import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { clientModel } from "../models/Models.js";

const tokenRequestHandler = async (req, res, next) => {
  const { email, clientCode } = req.body;
  if (!email || !clientCode) {
    return res.status(400).json({
      msg: "Email address or client code was not provided or is invalid!",
    });
  }

  const token = jwt.sign({ email, clientCode }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.token = token;

  next();
};

const authorizationHandler = async (req, res, next) => {
  const authFromHeaders = req.headers.authorization;
  const { email, clientCode } = req.body;
  if (!email || !clientCode) {
    return res.status(400).json({
      msg: "Email address or client code was not provided or is invalid!",
    });
  }

  if (!authFromHeaders || !authFromHeaders.startsWith("Bearer")) {
    res.status(401).json({
      msg: "Authorization token was not provided!",
    });
  }

  const token = authFromHeaders.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const decodedEmail = decodedToken.email;
  const decodedClientCode = decodedToken.clientCode;
  try {
    const client = clientModel.findOne({email})
    ///ramas aici
    if (!client) {
      throw new Error(`No client found with email: ${email}`)
    }
    next();
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
};

const newClientHandler = async (req, res, next) => {
  const { email, clientCode } = req.body;
  if (!email || !clientCode) {
    return res.status(400).json({
      msg: "Email address or client code was not provided or is invalid!",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedClientCode = await bcrypt.hash(clientCode, salt);

  req.body = { email, clientCode: hashedClientCode };
  next();
};

export { tokenRequestHandler, authorizationHandler, newClientHandler };
