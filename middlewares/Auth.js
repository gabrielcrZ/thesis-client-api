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
  // const { email, clientCode } = req.body;
  // if (!email || !clientCode) {
  //   return res.status(400).json({
  //     msg: "Email address or client code was not provided or is invalid!",
  //   });
  // }

  if (!authFromHeaders || !authFromHeaders.startsWith("Bearer")) {
    res.status(401).json({
      msg: "Authorization token was not provided!",
    });
  }

  const token = authFromHeaders.split(" ")[1];
  const decodedToken = decodeAuthorizationToken(token);
  const decodedEmail = decodedToken.email;
  const decodedClientCode = decodedToken.clientCode;

  // if (email !== decodedEmail || clientCode !== decodedClientCode) {
  //   return res.status(400).json({
  //     msg: "Authorization information does not match!",
  //   });
  // }
  try {
    const client = await clientModel.findOne({ email: decodedEmail });
    if (!client) {
      throw new Error(`No client found with email: ${decodedEmail}`);
    }

    const isMatchingClientCode = await bcrypt.compare(
      decodedClientCode,
      client.clientCode
    );
    if (!isMatchingClientCode) {
      throw new Error(
        `Provided client code is not valid for client: ${client.email}!`
      );
    }
    next();
  } catch (error) {
    // To do an error handling mechanism
    res.status(400).json({
      msg: error.message,
    });
  }
};

const newClientHandler = async (req, res, next) => {
  const { email, clientCode } = req.body;
  if (!email || !clientCode) {
    return res.status(400).json({
      msg: "Email address or client code was not provided!",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedClientCode = await bcrypt.hash(clientCode, salt);

  req.body = { email, clientCode: hashedClientCode };
  next();
};

const decodeAuthorizationToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export {
  tokenRequestHandler,
  authorizationHandler,
  newClientHandler,
  decodeAuthorizationToken,
};
