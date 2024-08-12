import React, { lazy } from "react";
import { Outlet } from "react-router-dom";

import "./globalLayout.scss";

const Sidebar = lazy(() => import("../../components/sidebar/Sidebar"));
const Navbar = lazy(() => import("../../components/navbar/Navbar"));

// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "./../../components/navbar/Navbar";

const GlobalLayout = () => {
  return (
    <main className="layout">
      <Sidebar />
      <div className="container">
        <Navbar />
        <Outlet />
      </div>
    </main>
  );
};

export default GlobalLayout;
