const express = require("express");

const {
  getOrders,
  getMyOrders,
  placeOrder,
  updateOrderStatus,
  cancelOrder,
  deleteOrder,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();


// student + admin
router.post(
  "/",
  authMiddleware,
  placeOrder
);


// admin ke liye all orders
router.get(
  "/",
  authMiddleware,
  getOrders
);


// student ke apne orders
router.get(
  "/my",
  authMiddleware,
  getMyOrders
);


// student apna pending/accepted order cancel kar sakta hai
router.put(
  "/:id/cancel",
  authMiddleware,
  cancelOrder
);

// admin status update
router.put(
  "/:id",
  authMiddleware,
  updateOrderStatus
);

// student apni history delete kar sakta hai, admin kisi bhi order ko
router.delete(
  "/:id",
  authMiddleware,
  deleteOrder
);


module.exports = router;
