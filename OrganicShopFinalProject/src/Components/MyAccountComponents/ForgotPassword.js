import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setServerMessage("Email is required.");
      return;
    }

    setLoading(true); // ✅ Show loading state

    try {
      const response = await axios.post("http://localhost:5062/api/auth/forgot-password", { Email: trimmedEmail });
      setServerMessage(response.data.message || "A password reset link has been sent to your email.");

      // ✅ Redirect to login after success
      setTimeout(() => navigate("/usersignin"), 3000);
    } catch (error) {
      console.error("Password reset request failed:", error);

      if (error.response) {
        setServerMessage(error.response.data.message || "Something went wrong. Please try again.");
      } else {
        setServerMessage("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false); // ✅ Hide loading state
    }
  };

  return (
    <div
      style={{
        minHeight: "87vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9", // Light background for the page
      }}
    >
      <div
        className="auth-container"
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
          fontFamily: "'Roboto', sans-serif",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
        }}
      >
        {/* Title */}
        <h2 style={{ color: "#812093", marginBottom: "20px", fontSize: "28px", fontWeight: "bold" }}>
          Forgot Password
        </h2>

        {/* Server Message */}
        {serverMessage && (
          <div
            style={{
              padding: "10px",
              backgroundColor: serverMessage.includes("success") ? "#d4edda" : "#f8d7da",
              color: serverMessage.includes("success") ? "#155724" : "#721c24",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {serverMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <i
              className="fas fa-envelope"
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#777",
              }}
            ></i>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                outline: "none",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#812093";
                e.target.style.boxShadow = "0 0 8px rgba(129, 32, 147, 0.3)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ccc";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              fontWeight: "500",
              backgroundColor: "#812093",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#6b1a7a";
                e.currentTarget.style.transform = "scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = "#812093";
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin" style={{ marginRight: "8px" }}></i>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        
        
      </div>
    </div>
  );
};

export default ForgotPassword;