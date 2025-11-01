import { useState, type FormEvent, type ChangeEvent, useEffect } from "react";
import "./SignIn.css";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../stores/hooks/useRedux";
import { signInThunk } from "../../stores/thunks/authThunk";
import { clearError } from "../../stores/slices/authSlice";
import { UserRole } from "../../types/user.type";

interface ErrorState {
  email: string;
  password: string;
}

export default function SignInForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error: apiError, isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (isAuthenticated && user && isSuccess) {
      const timer = setTimeout(() => {
        if (user.role === UserRole.ADMIN) {
          if (confirm("Sign In successful! Access the admin page?")) {
            navigate("/admin-user");
          }
        } else {
          if (confirm("Sign In successful! Access the home page?")) {
            navigate("/");
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, isSuccess, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newErrors: ErrorState = {
      email: "",
      password: ""
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

    setErrors(newErrors);

    if (valid) {
      const result = await dispatch(signInThunk({ email, password }));
      
      if (signInThunk.fulfilled.match(result)) {
        setIsSuccess(true);
        console.log("Sign in successful!");
      } else {
        setIsSuccess(false);
      }
    } else {
      setIsSuccess(false);
    }
  };

  const hasAnyError =
    errors.email !== "" ||
    errors.password !== "";

  return (
    <div className="signin-page">
      <div className={`signin-box ${hasAnyError || apiError ? "form-error" : ""}`}>
        <div className="text-box">🔐 Sign In</div>
        {isSuccess && <p className="success-text">Sign In Successfully</p>}
        {apiError && <p className="error-text">{apiError}</p>}

        <form
          className={`signin-form ${hasAnyError ? "form-error" : ""}`}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className={`form-input-in ${errors.email ? "error" : ""}`}
            placeholder="Email here ..."
            disabled={isLoading}
          />
          {errors.email && <p className="error-text-in">{errors.email}</p>}

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className={`form-input-in ${errors.password ? "error" : ""}`}
            placeholder="Password here ..."
            disabled={isLoading}
          />
          {errors.password && <p className="error-text-in">{errors.password}</p>}

          <button className="submit-btn-in" type="submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="signin-footer">
          <div className="footer3">{hasAnyError ? "Don't have account?" : "You don't have account?"}</div>
          <div className="footer4" onClick={() => {
            navigate("/sign-up")
          }}>Sign Up Now</div>
        </div>
      </div>
    </div>
  );
}