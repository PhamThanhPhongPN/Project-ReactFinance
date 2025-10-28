import React from 'react'
import  UserLogo from "../../assets/images/SupervisedUserCircle.png"
import "./AdminNavbar.css"

export default function AdminNavbar() {
  return (
    <div className='navbar-container'>
      <div className='text-logo'>
        <p>
          Financial <span style={{ color: "#4338CA" }}>Manager</span>
        </p>
      </div>
      <img src={UserLogo} alt="UserLogo" className='userlogo'/>
    </div>
  )
}
