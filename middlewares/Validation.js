import bcrypt from "bcrypt";

export const newClientHandler = async (req, res, next) => {
  const { email, clientCode } = req.body;

  if (!email || !clientCode) {
    return res.status(400).json({
      msg: "Email or client code was not provided!",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedClientCode = await bcrypt.hash(clientCode, salt);

  req.body = { email, clientCode: hashedClientCode };
  next();
};
