import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRoute = ({ component: Component, allowedRoles }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  const currentDate = new Date();
  const subscriptionExpiryDate = new Date(user.subscription_expiry);

  const isAuthenticated =
    allowedRoles.includes(user.role) &&
    (user.role === "admin" ||
      (subscriptionExpiryDate > currentDate && !user.blacklisted));

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
