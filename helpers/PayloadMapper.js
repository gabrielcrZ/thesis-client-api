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
      pickupId: null,
      pickupStatus: "Not assigned",
      pickupClient: {
        clientEmail: clientEmail,
        clientName: clientName,
        clientPhone: clientPhone,
      },
    },
    shippingDetails: {
      ...orderRequest.shippingDetails,
      shippingId: null,
      shippingStatus: "Not assigned",
    },
    currentStatus: "Registered by client",
    currentLocation: "At pickup client address",
    estimatedRevenue: orderRevenue,
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

export const mapCancelOrderMessage = (clientEmail, orderId, cancelReason) => {
  return {
    email: clientEmail,
    shortMessage: "Order cancellation has been requested by client",
    longMessage: `Order has been marked for cancellation for the following reason: ${cancelReason}.`,
    referenceId: orderId,
  };
};

export const mapNewClientMessage = (client) => {
  return {
    email: client.email,
    shortMessage: "A newly client has been created",
    longMessage: `A client has been created. Client: ${client.clientName}, Address: ${client.clientAddress}, Phone: ${client.clientPhone}.`,
    referenceId: client._id,
  };
};

export const mapUpdateClientMessage = (client) => {
  return {
    email: client.email,
    shortMessage: "A client's information has been updated.",
    longMessage: `Client: ${client.clientName} has updated his information.`,
    referenceId: client._id,
  };
};

export const mapNewOrderMessage = (order) => {
  return {
    email: order.pickupDetails.pickupClient.clientEmail,
    shortMessage: "A order has been added by a client.",
    longMessage: `Order: ${order._id} has been created by client: ${order.clientId}. Pickup city: ${order.pickupDetails.pickupCity} and delivery city: ${order.shippingDetails.shippingCity}.`,
    referenceId: order._id,
  };
};
