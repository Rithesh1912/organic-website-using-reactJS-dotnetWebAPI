import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser, faEnvelope, faLock, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent multiple spaces in Name field
    const newValue = name === "name" ? value.replace(/\s{2,}/g, " ") : value.replace(/\s/g, "");

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    // Validate the field after updating the form data
    validateField(name, newValue);
  };

  // General validation handling
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        validateName(value);
        break;
      case "email":
        validateEmail(value);
        break;
      case "password":
        validatePassword(value);
        break;
      case "phone":
        validatePhone(value);
        break;
      case "address":
        validateAddress(value);
        break;
      default:
        break;
    }
  };

  // Validate Name
  const validateName = (name) => {
    const validPattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/; // Allows only single spaces between words
    if (!name) {
      setErrors((prev) => ({ ...prev, name: "Name is required." }));
    } else if (/\s{2,}/.test(name)) {
      setErrors((prev) => ({ ...prev, name: "No consecutive spaces allowed." }));
    } else if (!validPattern.test(name)) {
      setErrors((prev) => ({ ...prev, name: "Only letters allowed." }));
    } else {
      setErrors((prev) => {
        const { name, ...rest } = prev;
        return rest;
      });
    }
  };

  // Validate Email
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required." }));
    } else if (!emailPattern.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format." }));
    } else {
      setErrors((prev) => {
        const { email, ...rest } = prev;
        return rest;
      });
    }
  };

  // Validate Password
  const validatePassword = (password) => {
    const trimmedPassword = password.replace(/\s/g, ""); // Remove spaces for length validation
    const validations = {
      minLength: trimmedPassword.length >= 8, // Check length accounting for spaces
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    setPasswordValidation(validations);

    // Only show requirements if there is a password
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
      setShowPasswordRequirements(false); // Hide conditions when no password provided
    } else {
      setErrors((prev) => {
        const { password, ...rest } = prev;
        return rest;
      });
      // Hide password requirements if all conditions are met
      setShowPasswordRequirements(
        !validations.minLength ||
          !validations.uppercase ||
          !validations.number ||
          !validations.specialChar
      );
    }
  };

  // Validate Phone Number
  const validatePhone = (phone) => {
    const phonePattern = /^[0-9]{10}$/; // Adjust if needed for different formats
    if (phone && !phonePattern.test(phone)) {
      setErrors((prev) => ({ ...prev, phone: "Phone must be 10 digits." }));
    } else {
      setErrors((prev) => {
        const { phone, ...rest } = prev;
        return rest;
      });
    }
  };

  // Validate Address
  const validateAddress = (address) => {
    if (address && address.length < 5) {
      setErrors((prev) => ({ ...prev, address: "Address must be at least 5 characters." }));
    } else {
      setErrors((prev) => {
        const { address, ...rest } = prev;
        return rest;
      });
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trigger validation for all required fields
    validateField("name", formData.name);
    validateField("email", formData.email);
    validateField("password", formData.password);

    // Check overall validation
    if (
      Object.keys(errors).length > 0 ||
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      setErrors({
        ...errors,
        name: formData.name ? undefined : "Name is required.",
        email: formData.email ? undefined : "Email is required.",
        password: formData.password ? undefined : "Password is required.",
      });
      return;
    }

    try {
      // Signup API call
      await axios.post("http://localhost:5062/api/auth/signup", formData);

      // Auto-login after signup
      const loginResponse = await axios.post("http://localhost:5062/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("user_token", loginResponse.data.token);
      alert("User Registered Successfully");
      navigate("/usersignin");
    } catch (error) {
      const errorMessage =
        error.response?.status === 400
          ? "This email is already registered. Please sign in or use a different email."
          : "Signup failed. Please try again.";

      setServerError(errorMessage);
    }
  };

  return (
    <div style={{ minHeight: "91vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: "url('/background.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="auth-container" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "40px", borderRadius: "15px", boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", textAlign: "center", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ color: "#812093", marginBottom: "20px", fontSize: "28px", fontWeight: "600" }}>Sign Up</h2>
        {serverError && <div className="text-danger" style={{ color: "#ff4d4d", marginBottom: "15px" }}>{serverError}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group" style={{ marginBottom: "10px", position: "relative" }}>
            <FontAwesomeIcon icon={faUser} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#812093" }} />
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              style={{ paddingLeft: "40px", borderRadius: "8px", border: "1px solid #ccc", width: "100%", padding: "10px", fontSize: "16px" }}
            />
            {errors.name && <div className="invalid-feedback" style={{ color: "#ff4d4d", fontSize: "14px", marginTop: "5px" }}>{errors.name}</div>}
          </div>

          <div className="input-group" style={{ marginBottom: "10px", position: "relative" }}>
            <FontAwesomeIcon icon={faEnvelope} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#812093" }} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              style={{ paddingLeft: "40px", borderRadius: "8px", border: "1px solid #ccc", width: "100%", padding: "10px", fontSize: "16px" }}
            />
            {errors.email && <div className="invalid-feedback" style={{ color: "#ff4d4d", fontSize: "14px", marginTop: "5px" }}>{errors.email}</div>}
          </div>

          <div className="input-group" style={{ marginBottom: "10px", position: "relative" }}>
            <FontAwesomeIcon icon={faLock} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#812093" }} />
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onFocus={() => setShowPasswordRequirements(true)}
              onBlur={() => {
                if (!formData.password) {
                  setShowPasswordRequirements(false);
                }
              }}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              style={{ paddingLeft: "40px", borderRadius: "8px", border: "1px solid #ccc", width: "100%", padding: "10px", fontSize: "16px" }}
            />
            <i onClick={() => setPasswordVisible(!passwordVisible)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#812093" }}>
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </i>
            {errors.password && <div className="invalid-feedback" style={{ color: "#ff4d4d", fontSize: "14px", marginTop: "5px" }}>{errors.password}</div>}
          </div>

          {showPasswordRequirements && (
            <ul className="password-requirements" style={{ textAlign: "left", marginBottom: "20px", color: "#666", fontSize: "14px" }}>
              <li className={passwordValidation.minLength ? "satisfied" : "invalid"}>At least 8 characters</li>
              <li className={passwordValidation.uppercase ? "satisfied" : "invalid"}>At least one uppercase letter</li>
              <li className={passwordValidation.number ? "satisfied" : "invalid"}>At least one number</li>
              <li className={passwordValidation.specialChar ? "satisfied" : "invalid"}>At least one special character</li>
            </ul>
          )}

          <div className="input-group" style={{ marginBottom: "10px", position: "relative" }}>
            <FontAwesomeIcon icon={faPhone} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#812093" }} />
            <input
              type="text"
              name="phone"
              placeholder="Phone (Optional)"
              onChange={handleChange}
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              style={{ paddingLeft: "40px", borderRadius: "8px", border: "1px solid #ccc", width: "100%", padding: "10px", fontSize: "16px" }}
            />
            {errors.phone && <div className="invalid-feedback" style={{ color: "#ff4d4d", fontSize: "14px", marginTop: "5px" }}>{errors.phone}</div>}
          </div>

          <div className="input-group" style={{ marginBottom: "10px", position: "relative" }}>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#812093" }} />
            <input
              type="text"
              name="address"
              placeholder="Address (Optional)"
              onChange={handleChange}
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              style={{ paddingLeft: "40px", borderRadius: "8px", border: "1px solid #ccc", width: "100%", padding: "10px", fontSize: "16px" }}
            />
            {errors.address && <div className="invalid-feedback" style={{ color: "#ff4d4d", fontSize: "14px", marginTop: "5px" }}>{errors.address}</div>}
          </div>

          <button
            type="submit"
            style={{
              background: "linear-gradient(45deg, #812093, #6a1b9a)",
              marginTop: "10px",
              padding: "12px 20px",
              borderRadius: "8px",
              color: "white",
              border: "none",
              width: "100%",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.background = "linear-gradient(45deg, #6a1b9a, #812093)")}
            onMouseOut={(e) => (e.target.style.background = "linear-gradient(45deg, #812093, #6a1b9a)")}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;