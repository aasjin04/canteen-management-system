const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    userName: {
      type: String,
      required: true,
    },


    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],


    total: {
      type: Number,
      required: true,
    },


    pickupSpot: {
      type: String,
      required: true,
    },


    paymentMethod: {
      type: String,
      default: "Cash",
    },


    paymentStatus: {
      type: String,
      default: "Pending",
    },


    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Rejected",
        "Cancelled",
        "Preparing",
        "Ready",
        "Delivered",
        "Completed"
      ],
      default: "Pending",
    },


    orderTime: {
      type: String,
    },


  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model(
  "Order",
  orderSchema
);
