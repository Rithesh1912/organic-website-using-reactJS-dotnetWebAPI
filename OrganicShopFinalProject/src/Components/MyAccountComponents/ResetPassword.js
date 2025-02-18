// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// // Custom hook to extract query parameters
// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

// const ResetPassword = () => {
//   const query = useQuery();
//   const token = query.get("token"); // Extract token from the URL query parameters
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [serverMessage, setServerMessage] = useState("");
//   const [loading, setLoading] = useState(false); // For loading state
//   const navigate = useNavigate();

//   // On token change, show an error message if no token is found
//   useEffect(() => {
//     if (!token) {
//       setServerMessage("Invalid or missing token.");
//     }
//   }, [token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Trim and check for matching passwords
//     if (newPassword.trim() !== confirmPassword.trim()) {
//       setServerMessage("Passwords do not match.");
//       return;
//     }

//     // Show loading state while making the request
//     setLoading(true);

//     try {
//       // Make API call to reset the password
//       const response = await axios.post("http://localhost:5062/api/auth/reset-password", {
//         token,
//         newPassword: newPassword.trim(),
//       });

//       setServerMessage(response.data.message || "Password reset successfully!");

//       // After success, redirect to sign-in page
//       setTimeout(() => navigate("/usersignin"), 3000);
//     } catch (error) {
//       setServerMessage("An error occurred. Please try again later.");
//       console.error("Password reset failed:", error);
//     } finally {
//       setLoading(false); // Hide loading state after the request
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "80vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f9f9f9", // Light background for the page
//       }}
//     >
//       <div
//         className="auth-container"
//         style={{
//           backgroundColor: "#fff",
//           padding: "30px",
//           borderRadius: "12px",
//           boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
//           textAlign: "center",
//           maxWidth: "400px",
//           width: "100%",
//           fontFamily: "'Roboto', sans-serif",
//           transition: "transform 0.3s ease, box-shadow 0.3s ease",
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.transform = "translateY(-5px)";
//           e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)";
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.transform = "translateY(0)";
//           e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
//         }}
//       >
//         {/* Title */}
//         <h2 style={{ color: "#812093", marginBottom: "20px", fontSize: "28px", fontWeight: "bold" }}>
//           Reset Password
//         </h2>

//         {/* Server Message */}
//         {serverMessage && (
//           <div
//             style={{
//               padding: "10px",
//               backgroundColor: serverMessage.includes("success") ? "#d4edda" : "#f8d7da",
//               color: serverMessage.includes("success") ? "#155724" : "#721c24",
//               borderRadius: "8px",
//               marginBottom: "20px",
//               fontSize: "14px",
//             }}
//           >
//             {serverMessage}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit}>
//           <div style={{ position: "relative", marginBottom: "20px" }}>
//             <i
//               className="fas fa-lock"
//               style={{
//                 position: "absolute",
//                 left: "10px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 color: "#777",
//               }}
//             ></i>
//             <input
//               type="password"
//               placeholder="New Password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//               style={{
//                 width: "100%",
//                 padding: "12px 12px 12px 40px",
//                 fontSize: "16px",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//                 outline: "none",
//                 transition: "border-color 0.3s ease, box-shadow 0.3s ease",
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = "#812093";
//                 e.target.style.boxShadow = "0 0 8px rgba(129, 32, 147, 0.3)";
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = "#ccc";
//                 e.target.style.boxShadow = "none";
//               }}
//             />
//           </div>

//           <div style={{ position: "relative", marginBottom: "20px" }}>
//             <i
//               className="fas fa-lock"
//               style={{
//                 position: "absolute",
//                 left: "10px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 color: "#777",
//               }}
//             ></i>
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               style={{
//                 width: "100%",
//                 padding: "12px 12px 12px 40px",
//                 fontSize: "16px",
//                 border: "1px solid #ccc",
//                 borderRadius: "8px",
//                 outline: "none",
//                 transition: "border-color 0.3s ease, box-shadow 0.3s ease",
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = "#812093";
//                 e.target.style.boxShadow = "0 0 8px rgba(129, 32, 147, 0.3)";
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = "#ccc";
//                 e.target.style.boxShadow = "none";
//               }}
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               width: "100%",
//               padding: "12px",
//               fontSize: "16px",
//               fontWeight: "500",
//               backgroundColor: "#812093",
//               color: "#fff",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//               transition: "background-color 0.3s ease, transform 0.2s ease",
//             }}
//             onMouseEnter={(e) => {
//               if (!loading) {
//                 e.currentTarget.style.backgroundColor = "#6b1a7a";
//                 e.currentTarget.style.transform = "scale(1.05)";
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (!loading) {
//                 e.currentTarget.style.backgroundColor = "#812093";
//                 e.currentTarget.style.transform = "scale(1)";
//               }
//             }}
//           >
//             {loading ? (
//               <>
//                 <i className="fas fa-spinner fa-spin" style={{ marginRight: "8px" }}></i>
//                 Resetting...
//               </>
//             ) : (
//               "Reset Password"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './ResetPassword.css'; // Import custom CSS styles

// Custom hook to extract query parameters
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ResetPassword = () => {
    const query = useQuery();
    const token = query.get("token"); // Extract token from the URL query parameters
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [serverMessage, setServerMessage] = useState("");
    const [loading, setLoading] = useState(false); // For loading state
    const navigate = useNavigate();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState({
        minLength: false,
        oneUpperCase: false,
        oneLowerCase: false,
        oneNumber: false,
        oneSpecialChar: false,
    });
    const [showRequirements, setShowRequirements] = useState(false); // State to show password requirements

    // Password validation function
    const validatePassword = (password) => {
        const newRequirements = {
            minLength: password.length >= 7,
            oneUpperCase: /[A-Z]/.test(password),
            oneLowerCase: /[a-z]/.test(password),
            oneNumber: /[0-9]/.test(password),
            oneSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
        setPasswordRequirements(newRequirements);

        const allRequirementsMet = Object.values(newRequirements).every(Boolean);
        setShowRequirements(!allRequirementsMet);
    };

    // On token change, show an error message if no token is found
    useEffect(() => {
        if (!token) {
            setServerMessage("Invalid or missing token.");
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Trim and check for matching passwords
        if (newPassword.trim() !== confirmPassword.trim()) {
            setServerMessage("Passwords do not match.");
            return;
        }

        const allRequirementsMet = Object.values(passwordRequirements).every(Boolean);
        if (!allRequirementsMet) {
            setServerMessage("Please meet all password requirements.");
            setShowRequirements(true);
            return;
        }

        // Show loading state while making the request
        setLoading(true);

        try {
            // Make API call to reset the password
            const response = await axios.post("http://localhost:5062/api/auth/reset-password", {
                token,
                newPassword: newPassword.trim(),
            });

            setServerMessage(response.data.message || "Password reset successfully!");

            // After success, redirect to sign-in page
            setTimeout(() => navigate("/usersignin"), 3000);
        } catch (error) {
            setServerMessage("An error occurred. Please try again later.");
            console.error("Password reset failed:", error);
        } finally {
            setLoading(false); // Hide loading state after the request
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
        <div className="reset-password-container">
            <div className="auth-container">
                <h2 className="auth-title">Reset Password</h2>
                {serverMessage && <div className="server-message">{serverMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                            required
                        />
                        <span className="password-toggle" onClick={() => setShowNewPassword(!showNewPassword)}>
                            <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    <div className="input-container">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <span className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    {showRequirements && (
                        <div className="password-requirements">
                            <ul>
                                <li className={passwordRequirements.minLength ? 'valid' : 'invalid'}>At least 7 characters</li>
                                <li className={passwordRequirements.oneUpperCase ? 'valid' : 'invalid'}>One uppercase letter</li>
                                <li className={passwordRequirements.oneLowerCase ? 'valid' : 'invalid'}>One lowercase letter</li>
                                <li className={passwordRequirements.oneNumber ? 'valid' : 'invalid'}>One number</li>
                                <li className={passwordRequirements.oneSpecialChar ? 'valid' : 'invalid'}>One special character</li>
                            </ul>
                        </div>
                    )}
                    <button type="submit" disabled={loading} className="auth-button">
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default ResetPassword;

