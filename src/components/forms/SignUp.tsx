import { useState, type FormEvent } from "react";
import "./SignUp.css";

export default function SignUp() {
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({fullName: "", password: "", confirmPassword: ""})

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let valid = true

    const newErrors = {
      fullName: "",
      password: "",
      confirmPassword: ""
    }

    if (fullName.length == 0) {
      valid = false
      newErrors.fullName = "Please enter your username ..."
    }

    if (password.length == 0) {
      valid = false
      newErrors.password = "Please enter your password ..."
    }

    if (confirmPassword.length == 0) {
      valid = false
      newErrors.confirmPassword = "Please enter your confirm password ..."
    }

    if (password.length < 6) {
      valid = false
      newErrors.password = "Password must be more than 6 characters!"
    }

    if (confirmPassword != password) {
      valid = false
      newErrors.confirmPassword = "Confirm password must be the same as password!"
    }

    setErrors(newErrors)
    if (valid) {
      console.log("Đăng nhập thành công!")
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-box">
        <div className="text-box">
          Sign Up
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input type="text" name="fullName" onChange={(e) => {
            setFullName((e.target as any).fullName.value)
          }} className={`form-input ${errors.fullName ? "error" : ""}`} placeholder="Username here ..." />
          {errors.fullName && <p className="error-text">{errors.fullName}</p>}
          <input type="password" name="password" onChange={(e) => {
            setPassword((e.target as any).password.value)
          }} className={`form-input ${errors.password ? "error" : ""}`} placeholder="Password here ..." />
          {errors.password && <p className="error-text">{errors.password}</p>}
          <input type="password" name="confirmPassword" onChange={(e) => {
            setConfirmPassword((e.target as any).confirmPassword.value)
          }} className={`form-input ${errors.confirmPassword ? "error" : ""}`} placeholder="Confirm password here ..." />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          <button className="submit-btn" type="submit">Sign Up</button>
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
