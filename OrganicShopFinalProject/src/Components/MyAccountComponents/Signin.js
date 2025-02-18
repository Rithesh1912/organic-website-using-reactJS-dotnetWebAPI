// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import PropTypes from "prop-types";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
// import "./Auth.css";
// import { jwtDecode } from 'jwt-decode';

// const Signin = ({ setIsAuthenticated, setIsAdmin, setUserEmail, setCart, setUserId, setIsDeliveryTeam }) => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [serverMessage, setServerMessage] = useState("");
//   const navigate = useNavigate();

//   const validateInput = (input) => {
//     if (!input.email || !input.password) {
//       return "Email and Password are required.";
//     }

//     if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.email)) {
//       return "Invalid email format.";
//     }

//     return null;
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationError = validateInput(formData);
//     if (validationError) {
//       setServerMessage(validationError);
//       return;
//     }

//     // Check for specific emails *before* attempting to log in
//     if (formData.email === "saiakash200236@gmail.com") {
//       setServerMessage("Please log in as an admin.");
//       return;
//     }

//     if (formData.email === "osdeliveryteam@gmail.com") {
//       setServerMessage("Please log in as a delivery team member.");
//       return;
//     }
  
//     try {
//       const response = await axios.post("http://localhost:5062/api/auth/login", formData);
//       const token = response.data.token;
//       const decodedToken = jwtDecode(token);
  
//       setIsAuthenticated(true);
//       setIsAdmin(decodedToken.role === "Admin");
//       setIsDeliveryTeam(decodedToken.role === "DeliveryTeam"); // Set delivery team state
//       setUserEmail(decodedToken.email);
//       setUserId(decodedToken.userId);
  
//       localStorage.setItem("user_token", token);
//       localStorage.setItem("user_email", decodedToken.email);
//       localStorage.setItem("user_id", decodedToken.userId);
  
//       navigate("/"); // Redirect to home or last visited page
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         setServerMessage("Invalid email or password.");
//       } else {
//         setServerMessage("An error occurred while logging in.");
//       }
//       console.error("Login failed:", error);
//     }
//   };
//   return (
//     <div style={{ minHeight: '87vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: "url('/background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
//       <div
//         className="auth-container"
//         style={{
//           backgroundColor: 'rgba(255, 255, 255, 0.9)',
//           padding: '40px',
//           borderRadius: '15px',
//           boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
//           textAlign: 'center',
//           width: '100%',
//           maxWidth: '400px',
//         }}
//       >
//         <h2 style={{ color: '#812093', marginBottom: '20px', fontSize: '28px', fontWeight: '600' }}>Sign In</h2>
//         {serverMessage && <div className="server-message" style={{ color: '#ff4d4d', marginBottom: '15px' }}>{serverMessage}</div>}
//         <form onSubmit={handleSubmit} noValidate>
//           <div className="input-group" style={{ marginBottom: '20px', position: 'relative' }}>
//             <FontAwesomeIcon icon={faEnvelope} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#812093' }} />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               className="form-control"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value.trim() })}
//               required
//               style={{ paddingLeft: '40px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', padding: '10px', fontSize: '16px' }}
//             />
//           </div>
//           <div className="input-group" style={{ marginBottom: '20px', position: 'relative' }}>
//             <FontAwesomeIcon icon={faLock} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#812093' }} />
//             <input
//               type={passwordVisible ? 'text' : 'password'}
//               name="password"
//               placeholder="Password"
//               className="form-control"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value.trim() })}
//               required
//               style={{ paddingLeft: '40px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', padding: '10px', fontSize: '16px' }}
//             />
//             <i onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#812093' }}>
//               <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
//             </i>
//           </div>
//           <button
//             type="submit"
//             style={{
//               background: 'linear-gradient(45deg, #812093, #6a1b9a)',
//               marginTop: '10px',
//               padding: '12px 20px',
//               borderRadius: '8px',
//               color: 'white',
//               border: 'none',
//               width: '100%',
//               fontSize: '16px',
//               fontWeight: '600',
//               cursor: 'pointer',
//               transition: 'background 0.3s ease',
//             }}
            
//           >
//             Sign In
//           </button>
//         </form>

//         <div className="signup-link" style={{ marginTop: '20px' }}>
//           <Link to="/usersignup" style={{ textDecoration: 'none' }}>
//             <button
//               style={{
//               background: 'linear-gradient(45deg, #812093, #6a1b9a)',
//               marginTop: '10px',
//               padding: '12px 20px',
//               borderRadius: '8px',
//               color: 'white',
//               border: 'none',
//               width: '100%',
//               fontSize: '16px',
//               fontWeight: '600',
//               cursor: 'pointer',
//               transition: 'background 0.3s ease',
//               }}
              
//             >
//               Sign Up
//             </button>
//           </Link>
//         </div>

//         <div className="forgot-password-link" style={{ marginTop: '15px' }}>
//           <Link to="/forgot-password" style={{ color: '#812093', textDecoration: 'none', fontSize: '14px' }}>
//             Forgot Password?
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// Signin.propTypes = {
//   setIsAuthenticated: PropTypes.func.isRequired,
//   setIsAdmin: PropTypes.func.isRequired,
//   setUserEmail: PropTypes.func.isRequired,
//   setCart: PropTypes.func.isRequired,
//   setUserId: PropTypes.func.isRequired,
//   setIsDeliveryTeam: PropTypes.func.isRequired,
// };

// export default Signin;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "./Auth.css";
import { jwtDecode } from 'jwt-decode';

const Signin = ({ setIsAuthenticated, setIsAdmin, setUserEmail, setCart, setUserId, setIsDeliveryTeam }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const navigate = useNavigate();

  const validateInput = (input) => {
    if (!input.email || !input.password) {
      return "Email and Password are required.";
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.email)) {
      return "Invalid email format.";
    }

    return null;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateInput(formData);
    if (validationError) {
      setServerMessage(validationError);
      return;
    }

    // Check for specific emails *before* attempting to log in
    if (formData.email === "saiakash200236@gmail.com") {
      setServerMessage("Please log in as an admin.");
      return;
    }

    if (formData.email === "osdeliveryteam@gmail.com") {
      setServerMessage("Please log in as a delivery team member.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5062/api/auth/login", formData);
      const token = response.data.token;
      const decodedToken = jwtDecode(token);
  
      setIsAuthenticated(true);
      setIsAdmin(decodedToken.role === "Admin");
      setIsDeliveryTeam(decodedToken.role === "DeliveryTeam"); // Set delivery team state
      setUserEmail(decodedToken.email);
      setUserId(decodedToken.userId);
  
      localStorage.setItem("user_token", token);
      localStorage.setItem("user_email", decodedToken.email);
      localStorage.setItem("user_id", decodedToken.userId);
  
      navigate("/"); // Redirect to home or last visited page
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setServerMessage("Invalid email or password.");
      } else {
        setServerMessage("An error occurred while logging in.");
      }
      console.error("Login failed:", error);
    }
  };

  const handleEmailChange = (e) => {
      const email = e.target.value.trim();
      setFormData({...formData, email: email});

      if (email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
          setServerMessage("Invalid email format.");
      } else {
          setServerMessage(""); // Clear error message if valid
      }
  };

  return (
    <div style={{ minHeight: '87vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: "url('/background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div
        className="auth-container"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ color: '#812093', marginBottom: '20px', fontSize: '28px', fontWeight: '600' }}>Sign In</h2>
        {serverMessage && <div className="server-message" style={{ color: '#ff4d4d', marginBottom: '15px' }}>{serverMessage}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group" style={{ marginBottom: '20px', position: 'relative' }}>
            <FontAwesomeIcon icon={faEnvelope} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#812093' }} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={formData.email}
              onChange={handleEmailChange} // Use the new handler
              required
              style={{ paddingLeft: '40px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div className="input-group" style={{ marginBottom: '20px', position: 'relative' }}>
            <FontAwesomeIcon icon={faLock} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#812093' }} />
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="form-control"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value.trim() })}
              required
              style={{ paddingLeft: '40px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', padding: '10px', fontSize: '16px' }}
            />
            <i onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#812093' }}>
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </i>
          </div>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(45deg, #812093, #6a1b9a)',
              marginTop: '10px',
              padding: '12px 20px',
              borderRadius: '8px',
              color: 'white',
              border: 'none',
              width: '100%',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
            }}
            
          >
            Sign In
          </button>
        </form>

        <div className="signup-link" style={{ marginTop: '20px' }}>
          <Link to="/usersignup" style={{ textDecoration: 'none' }}>
            <button
              style={{
              background: 'linear-gradient(45deg, #812093, #6a1b9a)',
              marginTop: '10px',
              padding: '12px 20px',
              borderRadius: '8px',
              color: 'white',
              border: 'none',
              width: '100%',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
              }}
              
            >
              Sign Up
            </button>
          </Link>
        </div>

        <div className="forgot-password-link" style={{ marginTop: '15px' }}>
          <Link to="/forgot-password" style={{ color: '#812093', textDecoration: 'none', fontSize: '14px' }}>
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

Signin.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setIsAdmin: PropTypes.func.isRequired,
  setUserEmail: PropTypes.func.isRequired,
  setCart: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired,
  setIsDeliveryTeam: PropTypes.func.isRequired,
};

export default Signin;