import React from "react";
import "./AdminSidebar.css";
import dashboard from "../../assets/images/dashboard.png";
import user from "../../assets/images/user.png";
import category from "../../assets/images/category.png";
import signout from "../../assets/images/signout.png";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="sidebar-container">
        <div className="navigate-box" onClick={() => navigate("/admin-user")}>
          <img src={dashboard} alt="dashboardLogo" width="20px" height="20px" />
          <p className="navigate-text">Dashboard</p>
        </div>
        <div className="navigate-box" onClick={() => navigate("/admin-user")}>
          <img src={user} alt="userLogo" width="30px" height="15px" />
          <p className="navigate-text">Users</p>
        </div>
        <div
          className="navigate-box"
          onClick={() => navigate("/admin-category")}
        >
          <img src={category} alt="categoryLogo" width="25px" height="25px" />
          <p className="navigate-text">Category</p>
        </div>
      </div>
      <div
        className="signout-container"
        onClick={() => {
          if (confirm("Do you want to sign out?")) {
            navigate("/sign-in");
          }
        }}
      >
        <img src={signout} alt="signout" width="20px" height="20px" />
        <p className="signout-text">Sign out</p>
      </div>
    </div>
  );
}
