export const mapNewOrder = (clientEmail, orderRequest) => {
  return {
    clientEmail: clientEmail,
    currentStatus: "Registered by client",
    lastUpdatedBy: clientEmail,
    ...orderRequest,
  };
};

export const mapNewOrderUpdate = (newOrder) => {
  return {
    operationType: "Update",
    orderId: newOrder.id,
    clientEmail: newOrder.clientEmail,
    currentLocation: newOrder.currentLocation,
    currentStatus: newOrder.currentStatus,
    updatedBy: newOrder.clientEmail,
    additionalInfo: "Order has been created by the client!",
  };
};
