import { Router } from "express";
import {
  addOrder,
  getOrders,
  getOrder,
} from "../controllers/OrdersController.js";
import {
  addClient,
  getClient,
  getToken,
  updateClient,
} from "../controllers/ClientController.js";
import { cancelOrder, deleteClient } from "../async/AsyncOperations.js";
import {
  tokenRequestHandler,
  authorizationHandler,
  newClientHandler,
} from "../middlewares/Auth.js";

const router = Router();
//Client
router.route("/add-client").post(newClientHandler, addClient);
router.route("/get-token").post(tokenRequestHandler, getToken);
router.route("/update-client/:id").patch(authorizationHandler, updateClient);
router.route("/get-client/:id").get(authorizationHandler, getClient);
router.route("/delete-client/:id").delete(authorizationHandler, deleteClient);

//Orders
router.route("/add-order").post(authorizationHandler, addOrder);
router.route("/cancel-order/:id").post(authorizationHandler, cancelOrder);
router.route("/get-orders").get(authorizationHandler, getOrders);
router.route("/get-order/:id").get(authorizationHandler, getOrder);

export default router;
