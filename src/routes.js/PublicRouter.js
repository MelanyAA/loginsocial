import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children, isLoggedIn }) => {
    console.log(isLoggedIn);
  return isLoggedIn ? <Navigate to="/" /> : children;
};
