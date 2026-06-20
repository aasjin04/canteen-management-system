import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";


import Dashboard from "../pages/admin/Dashboard";
import ManageFoods from "../pages/admin/ManageFoods";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageSpots from "../pages/admin/ManageSpots";

import ProtectedRoute from "./ProtectedRoute";


export default function AppRoutes() {

  return (

    <Routes>


      {/* Public */}

      <Route path="/login" element={<Login />} />

      <Route 
        path="/register" 
        element={<Register />} 
      />



      {/* Student */}

      <Route
        path="/"
        element={<Home />}
      />


      <Route
        path="/menu"
        element={
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        }
      />


      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />


      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />



      {/* ADMIN */}


      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        }
      />


      <Route
        path="/admin/foods"
        element={
          <ProtectedRoute role="admin">
            <ManageFoods />
          </ProtectedRoute>
        }
      />


      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute role="admin">
            <ManageOrders />
          </ProtectedRoute>
        }
      />


      <Route
        path="/admin/spots"
        element={
          <ProtectedRoute role="admin">
            <ManageSpots />
          </ProtectedRoute>
        }
      />


    </Routes>
  );
}
