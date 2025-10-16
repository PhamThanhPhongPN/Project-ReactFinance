import React from "react";
import "./SignUp.css";

export default function SignUp() {
  return (
    <div className="signup-page">
      <div className="signup-box">
        <div className="text-box">
          Sign Up
        </div>
        <form className="signup-form">
          <input type="text" className="form-input" placeholder="Username here ..."/>
          <input type="password" className="form-input" placeholder="Password here ..."/>
          <input type="password" className="form-input" placeholder="Confirm password here ..."/>
          <button className="submit-btn">Sign Up</button>
        </form>
        <div className="signup-footer">
          <div className="footer1">
            You have account?
          </div>
          <div className="footer2">
            Sign in
          </div>
        </div>
      </div>
    </div>
  );
}
