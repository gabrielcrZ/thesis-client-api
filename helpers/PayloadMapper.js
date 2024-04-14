import { calculateOrderRevenue } from "./RevenueCalculation.js";

export const mapNewOrder = (
  clientEmail,
  clientName,
  clientPhone,
  orderRequest
) => {
  const orderRevenue = calculateOrderRevenue(
    orderRequest.products,
    orderRequest.pickupDetails.pickupRegion,
    orderRequest.shippingDetails.shippingRegion
  );
  orderRequest.currentStatus = "Registered by client";
  orderRequest.currentLocation = "At pickup client address";
  orderRequest.lastUpdatedBy = clientEmail;
  orderRequest.estimatedRevenue = orderRevenue;
  orderRequest.pickupDetails.pickupId = null;
  orderRequest.pickupDetails.pickupStatus = "Not assigned";
  orderRequest.pickupDetails.pickupClient.clientEmail = clientEmail;
  orderRequest.pickupDetails.pickupClient.clientName = clientName;
  orderRequest.pickupDetails.pickupClient.clientPhone = clientPhone;
  orderRequest.shippingDetails.shippingId = null;
  orderRequest.shippingDetails.shippingStatus = "Not assigned";

  return orderRequest;
};

export const mapNewOrderUpdate = (newOrder) => {
  return {
    operationType: "Update",
    orderId: newOrder.id,
    updatedBy: newOrder.pickupDetails.pickupClient.clientEmail,
    additionalInfo: "Order has been created by the client!",
  };
};

export const mapOrdersToClientOrders = (orders) => {
  const mappedOrders = orders.map((order) => {
    order.products,
      order.pickupDetails,
      order.shippingDetails,
      order.currentStatus,
      order.currentLocation;
  });

  return mappedOrders;
};
