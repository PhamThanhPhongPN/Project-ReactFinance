import React from "react";
import "./AdminSignInForm.css";
import { Checkbox, type CheckboxProps } from "antd";
import { useNavigate } from "react-router";

const onChange: CheckboxProps["onChange"] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

export default function AdminSignInForm() {
  const navigate = useNavigate();
  return (
    <div className="admin-form-container">
      <div className="admin-form">
        <p className="financial-manager">
          Financial <span style={{ color: "#4338CA" }}>Manager</span>
        </p>
        <p className="text-box-admin">Please sign in</p>
        <form className="admin-signin-form">
          <input
            type="text"
            placeholder="Please enter your email ..."
            className="admin-input"
          />
          <input
            type="password"
            placeholder="Please enter your password ..."
            className="admin-input"
          />
          <div className="admin-form-extra">
            <Checkbox onChange={onChange} style={{ fontSize: "16px" }}>
              Remember me
            </Checkbox>
            <p>
              Don't have an account?{" "}
              <span
                className="admin-to-signup"
                onClick={() => {
                  navigate("/sign-up");
                }}
              >
                Click here!
              </span>
            </p>
          </div>
          <button className="admin-signin-btn">Sign in</button>
          <p className="admin-signin-footer">© 2025 - Rikkei Education</p>
        </form>
      </div>
    </div>
  );
}
