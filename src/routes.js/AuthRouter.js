import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginScreen } from "../Components/auth/LoginScreen";
import { RegisterScreen } from "../Components/auth/RegisterScreen";

export const AuthRouter = () => {
  console.log("Auth");
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Routes>
          <Route exact path="/auth/login" element={<LoginScreen />} />
          <Route exact path="/auth/register" element={<RegisterScreen />} />
          <Route path="*" element={<LoginScreen />} />
        </Routes>
      </div>
    </div>
  );
};
