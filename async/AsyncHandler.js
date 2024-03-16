import { ordersHistoryModel } from "../models/Models.js";

const handleOrderUpdate = async (messageBody) => {
  try {
    await ordersHistoryModel.create(messageBody).then(() => {
      console.log("Order update added to the database!");
    });
  } catch (error) {
    throw error;
  }
};

export default handleOrderUpdate;
