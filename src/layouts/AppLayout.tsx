import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";

const AppLayout = () => {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
