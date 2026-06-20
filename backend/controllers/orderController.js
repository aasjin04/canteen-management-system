const Order = require("../models/Order");

// =========================
// GET ALL ORDERS (ADMIN)
// =========================

const getOrders = async (req, res) => {
  try {
    // only admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// GET MY ORDERS (STUDENT)
// =========================

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// PLACE ORDER
// =========================

const placeOrder = async (req, res) => {
  try {
    const order = await Order.create({
      userId: req.user._id,

      userName: req.user.name,

      items: req.body.items,

      total: req.body.total,

      pickupSpot: req.body.pickupSpot,

      paymentMethod: req.body.paymentMethod,

      paymentStatus: req.body.paymentStatus,

      status: "Pending",

      orderTime: req.body.orderTime,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// UPDATE STATUS (ADMIN)
// =========================

const updateOrderStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin allowed",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,

      {
        status: req.body.status,
      },

      {
        new: true,
        runValidators: true,
      },
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// CANCEL ORDER (STUDENT)
// =========================

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const isOwner = order.userId.toString() === req.user._id.toString();

    if (!isOwner) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    if (!["Pending", "Accepted"].includes(order.status)) {
      return res.status(400).json({
        message: "This order cannot be cancelled now",
      });
    }

    order.status = "Cancelled";
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================
// DELETE ORDER HISTORY
// =========================

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const isOwner = order.userId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.json({
      message: "Order deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getOrders,

  getMyOrders,

  placeOrder,

  updateOrderStatus,

  cancelOrder,

  deleteOrder,
};
