import { Router } from "express";
import {
  addClient,
  getToken,
  addOrder,
  getOrders,
  updateOrder,
} from "../controllers/OrdersController.js";
import {
  tokenRequestHandler,
  authorizationHandler,
  newClientHandler,
} from "../middlewares/Auth.js";

const router = Router();
router.route("/add-client").post(newClientHandler, addClient);
router.route("/get-token").post(tokenRequestHandler, getToken);
router.route("/add-order").post(authorizationHandler, addOrder);
router.route("/get-orders").get(authorizationHandler, getOrders);
router.route("/update-order").patch(authorizationHandler, updateOrder);

export default router;
