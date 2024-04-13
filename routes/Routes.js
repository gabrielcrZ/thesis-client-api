import { Router } from "express";
import {
  addOrder,
  getOrders,
  getOrder,
} from "../controllers/OrdersController.js";
import {
  addClient,
  getToken,
  updateClient,
} from "../controllers/ClientController.js";
import { cancelOrder } from "../async/CancelOrderAsync.js";
import {
  tokenRequestHandler,
  authorizationHandler,
  newClientHandler,
} from "../middlewares/Auth.js";

const router = Router();
router.route("/add-client").post(newClientHandler, addClient);
router.route("/get-token").post(tokenRequestHandler, getToken);
router.route("/update-client").patch(authorizationHandler, updateClient);

router.route("/add-order").post(authorizationHandler, addOrder);
router.route("/cancel-order").post(authorizationHandler, cancelOrder);
router.route("/get-orders").get(authorizationHandler, getOrders);
router.route("/get-order/:id").get(authorizationHandler, getOrder);

export default router;
