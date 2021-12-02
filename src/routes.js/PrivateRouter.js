import { Navigate } from "react-router-dom";

export const PrivateRouter = ({ children, isLoggedIn }) => {
  console.log(isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
};
