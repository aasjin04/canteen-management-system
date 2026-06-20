import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("currentUser"));

      if (!token || !user) return;

      const url =
        user.role === "admin"
          ? "http://localhost:5000/api/orders"
          : "http://localhost:5000/api/orders/my";

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const placeOrder = async (order) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:5000/api/orders", order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders((prev) => [res.data, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? res.data : order)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        fetchOrders,
        placeOrder,
        updateOrderStatus,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
