import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { DarkModeContext } from "../../contexts/darkModeContext";
import UseAuth from "./../../hooks/UseAuth";

import "./sidebar.scss";
import axios from "../../libraries/axios";
import { API_URLS } from "../../configs/api.urls";
import useAxios from "../../hooks/axios";

const Sidebar = () => {
  const { auth, setAuth } = UseAuth();
  const { toggle } = useContext(DarkModeContext);
  const navigate = useNavigate();

    const { loading, fetchData } = useAxios();

  const handleLogout = async () => {
    try {
      const response = await fetchData({
        url: API_URLS.LOGOUT_URL,
        method: "POST",
      });
      console.log(response);
      setAuth(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">OpenAR Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          {auth.userType == "admin" ? (
            <>
              <Link to="/users" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Users</span>
                </li>
              </Link>{" "}
            </>
          ) : (
            ""
          )}
          {auth.userType == "user" ? (
            <>
              <Link to="/collection" style={{ textDecoration: "none" }}>
                <li>
                  <CreditCardIcon className="icon" />
                  <span>Collocations</span>
                </li>
              </Link>
              <Link to="/item" style={{ textDecoration: "none" }}>
                <li>
                  <DescriptionIcon className="icon" />
                  <span>Items</span>
                </li>
              </Link>
            </>
          ) : (
            ""
          )}
          {auth.userType == "dev" ? (
            <>
              <li>
                <LocalShippingIcon className="icon" />
                <span>Delivery</span>
              </li>
            </>
          ) : (
            ""
          )}
          <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => toggle({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => toggle({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
