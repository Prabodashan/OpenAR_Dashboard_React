import React from "react";
import { Outlet } from "react-router-dom";

import "./globalLayout.scss";

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "./../../components/navbar/Navbar";

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
