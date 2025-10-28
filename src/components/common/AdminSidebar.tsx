import React from "react";
import "./AdminSidebar.css";
import dashboard from "../../assets/images/dashboard.png";
import user from "../../assets/images/user.png";
import category from "../../assets/images/category.png";
import signout from "../../assets/images/signout.png";

export default function AdminSidebar() {
  return (
    <div>
      <div className="sidebar-container">
        <div className="navigate-box">
          <img src={dashboard} alt="dashboardLogo" width="20px" height="20px" />
          <p className="navigate-text">Dashboard</p>
        </div>
        <div className="navigate-box">
          <img src={user} alt="userLogo" width="30px" height="15px" />
          <p className="navigate-text">Users</p>
        </div>
        <div className="navigate-box">
          <img src={category} alt="categoryLogo" width="25px" height="25px" />
          <p className="navigate-text">Category</p>
        </div>
      </div>
      <div className="signout-container">
        <img src={signout} alt="signout" width="20px" height="20px" />
        <p className="signout-text">Sign out</p>
      </div>
    </div>
  );
}
