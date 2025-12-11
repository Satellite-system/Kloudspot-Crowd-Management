import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("token"); // simple example

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}