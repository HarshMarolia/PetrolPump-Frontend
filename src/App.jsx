import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Ops from "./pages/Ops";
import SuperUser from "./pages/SuperUser";
import User from "./pages/User";
import Home from "./pages/Home";
import PasswordReset from "./pages/PasswordReset";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/common/ProtectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/reset-password/:userId/:token"
        element={<PasswordReset />}
      />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute component={Dashboard} allowedRoles={["admin"]} />
        }
      />
      <Route
        path="/dashboard/users"
        element={<ProtectedRoute component={Users} allowedRoles={["admin"]} />}
      />
      <Route
        path="/dashboard/operations"
        element={<ProtectedRoute component={Ops} allowedRoles={["admin"]} />}
      />
      <Route
        path="/superuser"
        element={
          <ProtectedRoute component={SuperUser} allowedRoles={["superUser"]} />
        }
      />
      <Route
        path="/user"
        element={<ProtectedRoute component={User} allowedRoles={["user"]} />}
      />
    </Routes>
  );
};

export default App;
