import { useState, type ChangeEvent, type FormEvent } from "react";
import "./AdminSignInForm.css";
import { Checkbox, type CheckboxProps } from "antd";
import { useNavigate } from "react-router";

const onChange: CheckboxProps["onChange"] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

interface ErrorState {
  email: string;
  password: string;
}

export default function AdminSignInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<ErrorState>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors: ErrorState = {
      email: "",
      password: "",
    };

    if (email.trim().length === 0) {
      valid = false;
      newErrors.email = "Please enter your email ...";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      newErrors.email = "Invalid email!";
    }

    if (password.trim().length === 0) {
      valid = false;
      newErrors.password = "Please enter your password ...";
    } else if (password.trim().length < 6) {
      (valid = false),
        (newErrors.password = "Password must be more than 6 characters!");
    }

    setError(newErrors);

    if (valid) {
      console.log("Sign in successful!");
    }
  };

  return (
    <div className="admin-form-container">
      <div className="admin-form">
        <p className="financial-manager">
          Financial <span style={{ color: "#4338CA" }}>Manager</span>
        </p>
        <p className="text-box-admin">Please sign in</p>
        <form className="admin-signin-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Please enter your email ..."
              className="admin-input"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
            {error.email && <p className="admin-error-text">{error.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Please enter your password ..."
            className="admin-input"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          {error.password && (
            <p className="admin-error-text">{error.password}</p>
          )}
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
