import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from './Components/HeaderComponent/Header';
import Home from './Components/UserComponents/Home';
import Footer from './Components/FooterComponent/Footer';
import AboutUs from './Components/UserComponents/AboutUs';
import AllProducts from './Components/UserComponents/AllProducts';
import Cart from './Components/UserComponents/Cart';
import Signin from './Components/MyAccountComponents/Signin';
import Signup from './Components/MyAccountComponents/Signup';
import ForgotPassword from './Components/MyAccountComponents/ForgotPassword';
import ResetPassword from './Components/MyAccountComponents/ResetPassword';
import AdminProducts from './Components/AdminComponents/Admin';
import UsersList from './Components/AdminComponents/User';
import ProtectedRoute from './routing/ProtectedRoute';
import { jwtDecode } from 'jwt-decode';
import AdminLogin from './Components/MyAccountComponents/AdminLogin';
import Feedback from './Components/UserComponents/Feedback';
import DeliveryLogin from './Components/AdminComponents/DeliveryTeamLogin';
import DeliveryOrders from './Components/AdminComponents/DeliveryTeamOrders';

const App = () => {
    const [authStatus, setAuthStatus] = useState("checking");
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDeliveryTeam, setIsDeliveryTeam] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [userId, setUserId] = useState(null);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("user_token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setIsAdmin(decoded.role === "Admin");
                setIsDeliveryTeam(decoded.role === "DeliveryTeam");
                setUserEmail(decoded.email);
                setUserId(decoded.userId);
                localStorage.setItem("user_id", decoded.userId);

                const savedCart = localStorage.getItem(`cart_${decoded.userId}`);
                setCart(savedCart ? JSON.parse(savedCart) : []);
                setAuthStatus("authenticated");

                if (decoded.role !== "Admin" && location.pathname.startsWith("/admin")) {
                    navigate("/", { replace: true });
                }
                if (decoded.role !== "DeliveryTeam" && location.pathname.startsWith("/delivery")) {
                    navigate("/", { replace: true });
                }

            } catch (error) {
                console.error("Error decoding token:", error);
                handleLogout();
            }
        } else {
            setAuthStatus("unauthenticated");
        }
    }, [location, navigate]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5062/api/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (userId) {
            localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
        }
    }, [cart, userId]);

    const handleLogout = () => {
        localStorage.removeItem("user_token");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_id");
        setAuthStatus("unauthenticated");
        setIsAdmin(false);
        setIsDeliveryTeam(false);
        setUserEmail("");
        setUserId(null);
        setCart([]);
        navigate("/", { replace: true });
    };

    if (authStatus === "checking") {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header
                isAuthenticated={authStatus === "authenticated"}
                userEmail={userEmail}
                handleLogout={handleLogout}
                isAdmin={isAdmin}
                isDeliveryTeam={isDeliveryTeam}
            />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/allproducts" element={<AllProducts cart={cart} setCart={setCart} products={products} isLoggedIn={authStatus === "authenticated"} />} />
                <Route path="/usersignin" element={<Signin setIsAuthenticated={() => {}} setIsAdmin={setIsAdmin} setUserEmail={setUserEmail} setCart={setCart} setUserId={setUserId} setIsDeliveryTeam={setIsDeliveryTeam} />} />
                <Route path="/usersignup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/adminlogin" element={<AdminLogin setIsAuthenticated={() => {}} setIsAdmin={setIsAdmin} setUserEmail={setUserEmail} />} />
                <Route path="/deliverylogin" element={<DeliveryLogin setIsAuthenticated={() => {}} setIsDeliveryTeam={setIsDeliveryTeam} setUserEmail={setUserEmail} setUserId={setUserId} />} />

                {/* Protected Routes */}
                <Route path="/admin/products" element={<ProtectedRoute element={<AdminProducts />} authStatus={authStatus} isAdmin={isAdmin} redirectTo="/" />} />
                <Route path="/admin/userslist" element={<ProtectedRoute element={<UsersList />} authStatus={authStatus} isAdmin={isAdmin} redirectTo="/" />} />
                <Route path="/delivery/orders" element={<ProtectedRoute element={<DeliveryOrders />} authStatus={authStatus} isDeliveryTeam={isDeliveryTeam} redirectTo="/" />} />
                <Route path="/cart" element={<ProtectedRoute element={<Cart cart={cart} setCart={setCart} isVisible={true} setIsVisible={() => {}} userId={userId} />} authStatus={authStatus} redirectTo="/usersignin" />} />
                <Route path="/feedback" element={<ProtectedRoute element={<Feedback />} authStatus={authStatus} redirectTo="/usersignin" />} />
            </Routes>
            <Footer />
        </>
    );
};

const AppWithRouter = () => (
    <Router>
        <App />
    </Router>
);

export default AppWithRouter;
