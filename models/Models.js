import mongoose from "mongoose";

const clientModel = mongoose.model(
  "Clients",
  new mongoose.Schema({
    email: {
      type: String,
      required: [true, "No email provided!"],
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        "Email address is invalid!",
      ],
      unique: true,
    },
    clientCode: {
      type: String,
      required: [true, "Client code is invalid!"],
    },
  })
);

const orderModel = mongoose.model(
  "Orders",
  new mongoose.Schema(
    {
      clientEmail: {
        type: String,
        required: [true, "No email provided!"],
        match: [
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          "Email address is not valid!",
        ],
      },
      products: {
        type: [String],
        required: [true, "A list of products is required!"],
      },
      departFrom: {
        type: String,
        required: [true, "No departure location provided!"],
      },
      shipTo: {
        type: String,
        required: [true, "No delivery location provided!"],
      },
      shipmentWeight: {
        type: String,
        match: [
          /\d+\.{0,1}\d{1,3}kg$/gm,
          "Provided weight format is not valid (only kg's)!",
        ],
      },
      currentLocation: {
        type: String,
        required: [true, "No current location provided for the shipment!"],
      },
      currentStatus: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
);

export { clientModel, orderModel };