import { Send } from "./AsyncSend";

export const cancelOrder = (req, res) => {
  const rabbit = new Send().execute(req.body);

  res.json({
    message: "Order cancel request successfully sent!",
  });
};