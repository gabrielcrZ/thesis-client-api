import { Router } from "express";
import {
  clientRequest,
  tokenRequest,
  orderRequest,
  updateRequest,
} from "../controllers/OrdersController.js";
import {
  tokenRequestHandler,
  authorizationHandler,
  newClientHandler,
} from "../middlewares/Auth.js";

const router = Router();
router.route("/client-create").post(newClientHandler, clientRequest);
router.route("/token-request").post(tokenRequestHandler, tokenRequest);
router.route("/order-request").post(authorizationHandler, orderRequest);
router.route("/order-update").post(authorizationHandler, updateRequest);

export default router;
