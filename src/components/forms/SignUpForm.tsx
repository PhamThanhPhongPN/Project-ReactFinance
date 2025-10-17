import { useState, type FormEvent, type ChangeEvent } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router";

interface ErrorState {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<ErrorState>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newErrors: ErrorState = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (email.trim().length === 0) {
      valid = false;
      newErrors.email = "Please enter your email ...";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      newErrors.email = "Please enter a valid email address!";
    }

    if (password.trim().length === 0) {
      valid = false;
      newErrors.password = "Please enter your password ...";
    } else if (password.length < 6) {
      valid = false;
      newErrors.password = "Password must be more than 6 characters!";
    }

    if (confirmPassword.trim().length === 0) {
      valid = false;
      newErrors.confirmPassword = "Please confirm your password ...";
    } else if (confirmPassword !== password) {
      valid = false;
      newErrors.confirmPassword = "Passwords do not match!";
    }

    setErrors(newErrors);

    if (valid) {
      setIsSuccess(true)
      console.log("Sign up successful!");
      if (confirm("Do you want to go to signIn page?") == true) {
        navigate("/sign-in");
      }
    } else {
      setIsSuccess(false)
    }
  };

  const hasAnyError =
    errors.email !== "" ||
    errors.password !== "" ||
    errors.confirmPassword !== "";

  return (
    <div className="signup-page">
      <div className={`signup-box ${hasAnyError ? "form-error" : ""}`}>
        <div className="text-box">Sign Up</div>
        {isSuccess && <p className="success-text">Sign Up Successfully</p>}

        <form
          className={`signup-form ${hasAnyError ? "form-error" : ""}`}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className={`form-input ${errors.email ? "error" : ""}`}
            placeholder="Email here ..."
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className={`form-input ${errors.password ? "error" : ""}`}
            placeholder="Password here ..."
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            className={`form-input ${errors.confirmPassword ? "error" : ""}`}
            placeholder="Confirm password here ..."
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword}</p>
          )}

          <button className="submit-btn" type="submit">
            Sign Up
          </button>
        </form>

        <div className="signup-footer">
          <div className="footer1">You have account?</div>
          <div className="footer2" onClick={() => {
            navigate("/sign-in")
          }}>Sign in</div>
        </div>
      </div>
    </div>
  );
}
