import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { POST } from '../../shared/service/HTTP.Service'; 
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import '../MyAccountComponents/Auth.css'; 

const DeliveryLogin = ({ setIsAuthenticated, setIsDeliveryTeam, setUserEmail }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [serverMessage, setServerMessage] = useState(null);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email) {
            setEmailError("Email is required");
            return;
        } else if (!email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9\-]+\.[a-zA-Z]{2,})$/)) {
            setEmailError("Invalid email address");
            return;
        } else {
            setEmailError(null);
        }
    
        if (!password) {
            setPasswordError("Password is required");
            return;
        } else if (password.includes(" ")) {
            setPasswordError("Password cannot contain spaces");
            return;
        } else if (password.length < 8) {
            setPasswordError("Password should be at least 8 characters long");
            return;
        } else {
            setPasswordError(null);
        }
    
        try {
            const response = await POST("/auth/login", { email, password });
            localStorage.setItem("user_token", response.token);
            const decoded = jwtDecode(response.token);
            
            // Role-based validation
            if (decoded.role !== "DeliveryTeam") {
                if (decoded.role === "Admin") {
                    setServerMessage("Please login as Admin.");
                } else {
                    setServerMessage("Please sign in as a User.");
                }
                localStorage.removeItem("user_token"); // Remove token if wrong role
                return;
            }
    
            setIsAuthenticated(true);
            setIsDeliveryTeam(true);
            setUserEmail(decoded.email);
            navigate("/delivery/orders", { replace: true });
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setServerMessage("Invalid credentials. Please check your email and password.");
                } else {
                    setServerMessage("An unexpected error occurred. Please try again later.");
                }
            } else {
                setServerMessage("Could not connect to the server. Please try again.");
            }
            console.error("Login failed:", error);
        }
    };

    return (
        <div style={{ minHeight: '87vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: "url('/background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="auth-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', textAlign: 'center', width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4" style={{ color: '#812093', fontSize: '28px', fontWeight: '600' }}>Delivery Team Login</h2>
                {serverMessage && <div className="server-message" style={{ color: '#ff4d4d', marginBottom: '15px' }}>{serverMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group" style={{ marginBottom: '20px', position: 'relative' }}>
                        <FontAwesomeIcon icon={faEnvelope} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#812093' }} />
                        <input
                            type="email"
                            placeholder="Email"
                            className={`form-control ${emailError ? 'is-invalid' : ''}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ paddingLeft: '40px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', padding: '10px', fontSize: '16px' }}
                        />
                        {emailError && <div className="invalid-feedback" style={{ color: '#ff4d4d', fontSize: '14px', marginTop: '5px' }}>{emailError}</div>}
                    </div>

                    <div className="input-group" style={{ marginBottom: '20px', position: 'relative' }}>
                        <FontAwesomeIcon icon={faLock} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#812093' }} />
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Password"
                            className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ paddingLeft: '40px', borderRadius: '8px', border: '1px solid #ccc', width: '100%', padding: '10px', fontSize: '16px' }}
                        />
                        <i onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#812093' }}>
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                        </i>
                        {passwordError && <div className="invalid-feedback" style={{ color: '#ff4d4d', fontSize: '14px', marginTop: '5px' }}>{passwordError}</div>}
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
                        onMouseOver={(e) => (e.target.style.background = 'linear-gradient(45deg, #6a1b9a, #812093)')}
                        onMouseOut={(e) => (e.target.style.background = 'linear-gradient(45deg, #812093, #6a1b9a)')}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DeliveryLogin;