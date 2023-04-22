import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, isLoading, children }) => {
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute
