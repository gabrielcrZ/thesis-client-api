import { Router } from "express";
import {
  clientRequest,
  tokenRequest,
  orderRequest,
  cancelRequest,
  updateRequest,
} from "../controllers/OrdersController.js";
import {
  tokenRequestHandler,
  authenticationHandler,
} from "../middlewares/Auth.js";
import { newClientHandler } from "../middlewares/Validation.js";

const router = Router();
router.route("/client-create").post(newClientHandler, clientRequest);
router.route("/token-request").post(tokenRequestHandler, tokenRequest);
router.route("/order-request").post(authenticationHandler, orderRequest);
router.route("/order-cancel").post(authenticationHandler, cancelRequest);
router.route("/order-update").post(authenticationHandler, updateRequest);

export default router;
