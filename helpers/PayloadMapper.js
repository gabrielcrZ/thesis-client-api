import { calculateOrderRevenue } from "./RevenueCalculation.js";

export const mapNewOrder = (
  clientEmail,
  clientId,
  clientName,
  clientPhone,
  orderRequest
) => {
  const orderRevenue = calculateOrderRevenue(
    orderRequest.products,
    orderRequest.pickupDetails.pickupRegion,
    orderRequest.shippingDetails.shippingRegion
  );

  return {
    clientId: clientId,
    products: orderRequest.products,
    pickupDetails: {
      ...orderRequest.pickupDetails,
      pickupClient: {
        clientEmail: clientEmail,
        clientName: clientName,
        clientPhone: clientPhone,
      },
    },
    shippingDetails: orderRequest.shippingDetails,
    currentStatus: "Registered by client",
    currentLocation: "At pickup client address",
    estimatedRevenue: orderRevenue,
    assignedTransport: "Not assigned",
    lastUpdatedBy: clientEmail,
  };
};

export const mapNewOrderUpdate = (newOrder) => {
  return {
    operationType: "Create order",
    orderId: newOrder.id,
    updatedBy: newOrder.pickupDetails.pickupClient.clientEmail,
    additionalInfo: "Order has been created by the client!",
  };
};

export const mapOrdersToClientOrders = (orders) => {
  const mappedOrders = orders.map((order) => {
    return {
      products: order.products,
      pickupDetails: order.pickupDetails,
      shippingDetails: order.shippingDetails,
      currentStatus: order.currentStatus,
      currentLocation: order.currentLocation,
    };
  });

  return mappedOrders;
};

export const mapClientInformation = (clientModel) => {
  return {
    email: clientModel.email,
    clientName: clientModel.clientName,
    clientAddress: clientModel.clientAddress,
    clientPhone: clientModel.clientPhone,
  };
};
