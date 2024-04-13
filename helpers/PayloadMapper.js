import { calculateOrderRevenue } from "./RevenueCalculation.js";

export const mapNewOrder = (clientEmail, orderRequest) => {
  const orderRevenue = calculateOrderRevenue(
    orderRequest.products,
    orderRequest.pickupDetails.pickupRegion,
    orderRequest.shippingDetails.shippingRegion
  );

  orderRequest.contactDetails.contactEmail = clientEmail;
  orderRequest.currentStatus = "Registered by client";
  orderRequest.lastUpdatedBy = clientEmail;
  orderRequest.estimatedRevenue = orderRevenue;

  return orderRequest;
};

export const mapNewOrderUpdate = (newOrder) => {
  return {
    operationType: "Update",
    orderId: newOrder.id,
    clientEmail: newOrder.contactDetails.contactEmail,
    currentLocation: `${newOrder.pickupDetails.pickupCity}, ${newOrder.pickupDetails.pickupCountry}`,
    currentStatus: newOrder.currentStatus,
    updatedBy: newOrder.contactDetails.contactEmail,
    additionalInfo: "Order has been created by the client!",
  };
};

export const mapOrdersToClientOrders = (orders) => {
  const mappedOrders = orders.map((order) => {
    order.contactDetails,
      order.products,
      order.pickupDetails,
      order.shippingDetails,
      order.currentStatus;
  });

  return mappedOrders;
};
