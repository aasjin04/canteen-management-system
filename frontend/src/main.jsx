import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";
import { FoodProvider } from "./context/FoodContext";
import { SpotProvider } from "./context/SpotContext";

import App from "./App";
import "./index.css";

import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
  <SpotProvider>
    <FoodProvider>
      <OrderProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </OrderProvider>
    </FoodProvider>
  </SpotProvider>
</BrowserRouter>
);