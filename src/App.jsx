import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SuperUser from "./pages/SuperUser";
import User from "./pages/User";
import Home from "./pages/Home";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/common/ProtectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute component={Dashboard} allowedRoles={["admin"]} />
        }
      />
      <Route
        path="/superuser"
        element={
          <ProtectedRoute component={SuperUser} allowedRoles={["superUser"]} />
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute
            component={User}
            allowedRoles={["user", "admin", "superUser"]}
          />
        }
      />
    </Routes>
  );
};

export default App;
