import jwt from "jsonwebtoken";

const tokenRequestHandler = async (req, res, next) => {
  const { email, clientCode } = req.body;
  if (!email || !clientCode) {
    return res.status(400).json({
      msg: "Email address or client code was not provided or is invalid!",
    });
  } else {
    const token = jwt.sign({ email, clientCode }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.token = token;

    next();
  }
};

const authenticationHandler = async (req, res, next) => {
  const authFromHeaders = req.headers.authorization;

  if (!authFromHeaders || !authFromHeaders.startsWith("Bearer")) {
    res.status(401).json({
      msg: "Authorization token was not provided!",
    });
  }

  const token = authFromHeaders.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { email, clientCode } = decodedToken;

    ///aici am ramas. Verificat cu datele din baza de date.

    next();
  } catch (error) {
    res.status(401).json({
      msg: "You are not authorized to access this resource!",
    });
  }
};

export { tokenRequestHandler, authenticationHandler };
