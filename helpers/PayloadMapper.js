import { calculateOrderRevenue } from "./RevenueCalculation";

export const mapNewOrder = (clientEmail, orderRequest) => {
  const orderRevenue = calculateOrderRevenue(
    orderRequest.products,
    orderRequest.pickupDetails.region,
    orderRequest.shippingDetails.region
  );
  return {
    contactDetails: {
      email: clientEmail,
      name: orderRequest.contactDetails.clientName,
      phone: orderRequest.contactDetails.phoneNr,
    },
    currentStatus: "Registered by client",
    lastUpdatedBy: clientEmail,
    estimatedRevenue: orderRevenue,
    ...orderRequest,
  };
};

export const mapNewOrderUpdate = (newOrder) => {
  return {
    operationType: "Update",
    orderId: newOrder.id,
    clientEmail: newOrder.contactDetails.email,
    currentLocation: newOrder.pickupDetails.address,
    currentStatus: newOrder.currentStatus,
    updatedBy: newOrder.contactDetails.clientEmail,
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
