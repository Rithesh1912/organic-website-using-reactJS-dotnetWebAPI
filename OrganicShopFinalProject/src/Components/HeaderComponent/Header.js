// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Navbar, Nav, DropdownButton, Dropdown } from 'react-bootstrap';
// import { Person, Cart3 } from 'react-bootstrap-icons';
// import { FaShieldAlt, FaUserCircle } from 'react-icons/fa'; // Added FaUserCircle for profile icon
// import { FaTruck } from 'react-icons/fa';
// import '../HeaderComponent/Header.css';

// const Header = ({ isAuthenticated, userEmail, handleLogout, isAdmin, isDeliveryTeam }) => {
//   const navigate = useNavigate();
//   const userToken = localStorage.getItem('user_token');
//   const user = userToken ? JSON.parse(atob(userToken.split('.')[1])) : null;
//   const [hoveredLink, setHoveredLink] = useState(null);

//   const handleMouseEnter = (link) => {
//     setHoveredLink(link);
//   };

//   const handleMouseLeave = () => {
//     setHoveredLink(null);
//   };

//   const logoutAndRedirect = () => {
//     handleLogout();
//     navigate('/');
//   };

//   return (
//     <Navbar
//       sticky="top"
//       variant="dark"
//       expand="lg"
//       className="shadow-sm"
//       style={{
//         height: 'auto',
//         background: '#812093', // Apply the linear gradient
//       }}
//     >
//       <div className="container">
//         <Navbar.Brand
//           href="/"
//           style={{
//             fontFamily: "'Poppins', sans-serif",
//             fontWeight: '700',
//             fontSize: '30px',
//             letterSpacing: '6px',
//             color: 'white',
//             transition: 'all 0.5s ease',
//             cursor: 'pointer',
//           }}
//           onMouseOver={(e) => {
//             e.currentTarget.style.letterSpacing = '8px';
//             e.currentTarget.style.transform = 'scale(1.05)';
//           }}
//           onMouseOut={(e) => {
//             e.currentTarget.style.letterSpacing = '6px';
//             e.currentTarget.style.transform = 'scale(1)';
//           }}
//         >
//           FRESHIO
//         </Navbar.Brand>

//         <Navbar.Toggle />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto" style={{ gap: '20px' }}> {/* Added gap between nav links */}
//             {/* Show Home for all users */}
//             <Nav.Link
//               as={Link}
//               to="/"
//               className="text-white"
//               onMouseEnter={() => handleMouseEnter('home')}
//               onMouseLeave={handleMouseLeave}
//               style={{
//                 borderBottom: '2px solid transparent',
//                 borderBottomColor: hoveredLink === 'home' ? 'white' : 'transparent',
//                 transition: 'border-bottom 0.3s ease',
//                 color: 'white',
//                 paddingBottom: '2px',
//               }}
//             >
//               Home
//             </Nav.Link>

//             {/* Show About Us and Products for non-delivery team users */}
//             {!isDeliveryTeam && (
//               <>
//                 <Nav.Link
//                   as={Link}
//                   to="/about"
//                   className="text-white"
//                   onMouseEnter={() => handleMouseEnter('about')}
//                   onMouseLeave={handleMouseLeave}
//                   style={{
//                     borderBottom: '2px solid transparent',
//                     borderBottomColor: hoveredLink === 'about' ? 'white' : 'transparent',
//                     transition: 'border-bottom 0.3s ease',
//                     color: 'white',
//                     paddingBottom: '2px',
//                   }}
//                 >
//                   About Us
//                 </Nav.Link>

//                 <Nav.Link
//                   as={Link}
//                   to="/allproducts"
//                   className="text-white"
//                   onMouseEnter={() => handleMouseEnter('products')}
//                   onMouseLeave={handleMouseLeave}
//                   style={{
//                     borderBottom: '2px solid transparent',
//                     borderBottomColor: hoveredLink === 'products' ? 'white' : 'transparent',
//                     transition: 'border-bottom 0.3s ease',
//                     color: 'white',
//                     paddingBottom: '2px',
//                   }}
//                 >
//                   Products
//                 </Nav.Link>
//               </>
//             )}

//             {/* Show Admin Products and Users List only for Admin */}
//             {isAdmin && (
//               <>
//                 <Nav.Link
//                   as={Link}
//                   to="/admin/products"
//                   className="text-white"
//                   onMouseEnter={() => handleMouseEnter('adminproducts')}
//                   onMouseLeave={handleMouseLeave}
//                   style={{
//                     borderBottom: '2px solid transparent',
//                     borderBottomColor: hoveredLink === 'adminproducts' ? 'white' : 'transparent',
//                     transition: 'border-bottom 0.3s ease',
//                     color: 'white',
//                     paddingBottom: '2px',
//                   }}
//                 >
//                   Admin Products
//                 </Nav.Link>

//                 <Nav.Link
//                   as={Link}
//                   to="/admin/userslist"
//                   className="text-white"
//                   onMouseEnter={() => handleMouseEnter('usersList')}
//                   onMouseLeave={handleMouseLeave}
//                   style={{
//                     borderBottom: '2px solid transparent',
//                     borderBottomColor: hoveredLink === 'usersList' ? 'white' : 'transparent',
//                     transition: 'border-bottom 0.3s ease',
//                     color: 'white',
//                     paddingBottom: '2px',
//                   }}
//                 >
//                   Users List
//                 </Nav.Link>
//               </>
//             )}

//             {/* Show Cart and Feedback only for regular users (not Admin or Delivery Team) */}
//             {isAuthenticated && !isAdmin && !isDeliveryTeam && (
//               <>
//                 <Nav.Link
//                   as={Link}
//                   to="/cart"
//                   className="text-white"
//                   onMouseEnter={() => handleMouseEnter('cart')}
//                   onMouseLeave={handleMouseLeave}
//                   style={{
//                     borderBottom: '2px solid transparent',
//                     borderBottomColor: hoveredLink === 'cart' ? 'white' : 'transparent',
//                     transition: 'border-bottom 0.3s ease',
//                     color: 'white',
//                     paddingBottom: '2px',
//                   }}
//                 >
//                   <Cart3 /> Cart
//                 </Nav.Link>

//                 <Nav.Link
//                   as={Link}
//                   to="/feedback"
//                   className="text-white"
//                   onMouseEnter={() => handleMouseEnter('feedback')}
//                   onMouseLeave={handleMouseLeave}
//                   style={{
//                     borderBottom: '2px solid transparent',
//                     borderBottomColor: hoveredLink === 'feedback' ? 'white' : 'transparent',
//                     transition: 'border-bottom 0.3s ease',
//                     color: 'white',
//                     paddingBottom: '2px',
//                   }}
//                 >
//                   Feedback
//                 </Nav.Link>
//               </>
//             )}

//             {/* Show Delivery Orders link for Delivery Team */}
//             {isDeliveryTeam && (
//               <Nav.Link
//                 as={Link}
//                 to="/delivery/orders"
//                 className="text-white"
//                 onMouseEnter={() => handleMouseEnter('deliveryOrders')}
//                 onMouseLeave={handleMouseLeave}
//                 style={{
//                   borderBottom: '2px solid transparent',
//                   borderBottomColor: hoveredLink === 'deliveryOrders' ? 'white' : 'transparent',
//                   transition: 'border-bottom 0.3s ease',
//                   color: 'white',
//                   paddingBottom: '2px',
//                 }}
//               >
//                 Delivery Orders
//               </Nav.Link>
//             )}

//             {/* Profile Icon Dropdown for Authenticated Users */}
//             {isAuthenticated && (
//               <DropdownButton
//                 id="profile-dropdown"
//                 variant="text"
//                 title={
//                   <span style={{ color: 'white' }}>
//                     <FaUserCircle size={24} /> {/* Profile Icon */}
//                   </span>
//                 }
//                 align="end"
//                 style={{ marginLeft: '10px' }}
//               >
//                 <Dropdown.ItemText style={{ color: '#333', padding: '8px 16px' }}>
//                   Welcome, <strong>{userEmail}</strong>
//                 </Dropdown.ItemText>
//                 <Dropdown.Divider />
//                 <Dropdown.Item
//                   onClick={logoutAndRedirect}
//                   style={{ color: '#333', padding: '8px 16px' }}
//                 >
//                   Logout
//                 </Dropdown.Item>
//               </DropdownButton>
//             )}

//             {/* Show My Account dropdown for unauthenticated users */}
//             {!isAuthenticated && (
//               <DropdownButton
//                 id="user-dropdown"
//                 variant="text"
//                 title={<span style={{ color: 'white' }}><Person /> My Account</span>}
//               >
//                 <Dropdown.Item as={Link} to="/usersignin" className="text-black">
//                   <Person style={{ marginRight: '8px' }} /> User Login
//                 </Dropdown.Item>
//                 <Dropdown.Item as={Link} to="/adminlogin" className="text-black">
//                   <FaShieldAlt style={{ marginRight: '8px' }} /> Admin Login
//                 </Dropdown.Item>
//                 <Dropdown.Item as={Link} to="/deliverylogin" className="text-black">
//                   <FaTruck style={{ marginRight: '8px' }} /> Delivery Login
//                 </Dropdown.Item>
//               </DropdownButton>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </div>
//     </Navbar>
//   );
// };

// export default Header;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Navbar, Nav, DropdownButton, Dropdown } from 'react-bootstrap';
// import { Person, Cart3 } from 'react-bootstrap-icons';
// import { FaShieldAlt, FaUserCircle } from 'react-icons/fa'; // Added FaUserCircle for profile icon
// import { FaTruck } from 'react-icons/fa';
// import '../HeaderComponent/Header.css';

// const Header = ({ isAuthenticated, userEmail, handleLogout, isAdmin, isDeliveryTeam }) => {
//   const navigate = useNavigate();
//   const userToken = localStorage.getItem('user_token');
//   const user = userToken ? JSON.parse(atob(userToken.split('.')[1])) : null;
//   const [hoveredLink, setHoveredLink] = useState(null);

//   const handleMouseEnter = (link) => {
//     setHoveredLink(link);
//   };

//   const handleMouseLeave = () => {
//     setHoveredLink(null);
//   };

//   const logoutAndRedirect = () => {
//     handleLogout();
//     navigate('/');
//   };

//   return (
//     <Navbar
//       sticky="top"
//       variant="dark"
//       expand="lg"
//       className="shadow-sm"
//       style={{
//         height: 'auto',
//         background: '#812093', // Apply the linear gradient
//       }}
//     >
//       <div className="container">
//         <Navbar.Brand
//           href="/"
//           style={{
//             fontFamily: "'Poppins', sans-serif",
//             fontWeight: '700',
//             fontSize: '30px',
//             letterSpacing: '6px',
//             color: 'white',
//             transition: 'all 0.5s ease',
//             cursor: 'pointer',
//           }}
//           onMouseOver={(e) => {
//             e.currentTarget.style.letterSpacing = '8px';
//             e.currentTarget.style.transform = 'scale(1.05)';
//           }}
//           onMouseOut={(e) => {
//             e.currentTarget.style.letterSpacing = '6px';
//             e.currentTarget.style.transform = 'scale(1)';
//           }}
//         >
//           FRESHIO
//         </Navbar.Brand>

//         <Navbar.Toggle />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto" style={{ gap: '20px' }}> {/* Added gap between nav links */}
//             {/* Show Home for all users */}
//             <Nav.Link
//               as={Link}
//               to="/"
//               className="text-white"
//               onMouseEnter={() => handleMouseEnter('home')}
//               onMouseLeave={handleMouseLeave}
//               style={{
//                 borderBottom: '2px solid transparent',
//                 borderBottomColor: hoveredLink === 'home' ? 'white' : 'transparent',
//                 transition: 'border-bottom 0.3s ease',
//                 color: 'white',
//                 paddingBottom: '2px',
//               }}
//             >
//               Home
//             </Nav.Link>

//             {/* Show About Us and Products for non-delivery team users */}
//             {!isDeliveryTeam && (
//               <>
//                 <Nav.Link
//                   as={Link}
//                   to="/about"
//                   className="text-white"
//                   onMouseEnter={() => handleMouseEnter('about')}
//                   onMouseLeave={handleMouseLeave}
//                   style={{
//                     borderBottom: '2px solid transparent',
//                     borderBottomColor: hoveredLink === 'about' ? 'white' : 'transparent',
//                     transition: 'border-bottom 0.3s ease',
//                     color: 'white',
//                     paddingBottom: '2px',
//                   }}
//                 >
//                   About Us
//                 </Nav.Link>

//                 <Nav.Link
//                   as={Link}
//                   to="/allproducts"
//                   className="text-white"
//                   onMouseEnter={() => handleMouseEnter('products')}
//                   onMouseLeave={handleMouseLeave}
//                   style={{
//                     borderBottom: '2px solid transparent',
//                     borderBottomColor: hoveredLink === 'products' ? 'white' : 'transparent',
//                     transition: 'border-bottom 0.3s ease',
//                     color: 'white',
//                     paddingBottom: '2px',
//                   }}
//                 >
//                   Products
//                 </Nav.Link>
//               </>
//             )}

//             {/* Show Admin Products and Users List only for Admin */}
//             {isAdmin && (
//               <>
//                 <Nav.Link
//                   as={Link}
//                   to="/admin/products"
//                   className="text-white"
//                   onMouseEnter={() => handleMouseEnter('adminproducts')}
//                   onMouseLeave={handleMouseLeave}
//                   style={{
//                     borderBottom: '2px solid transparent',
//                     borderBottomColor: hoveredLink === 'adminproducts' ? 'white' : 'transparent',
//                     transition: 'border-bottom 0.3s ease',
//                     color: 'white',
//                     paddingBottom: '2px',
//                   }}
//                 >
//                   Admin Products
//                 </Nav.Link>

//                 <Nav.Link
//                   as={Link}
//                   to="/admin/userslist"
//                   className="text-white"
//                   onMouseEnter={() => handleMouseEnter('usersList')}
//                   onMouseLeave={handleMouseLeave}
//                   style={{
//                     borderBottom: '2px solid transparent',
//                     borderBottomColor: hoveredLink === 'usersList' ? 'white' : 'transparent',
//                     transition: 'border-bottom 0.3s ease',
//                     color: 'white',
//                     paddingBottom: '2px',
//                   }}
//                 >
//                   Users List
//                 </Nav.Link>
//               </>
//             )}

//             {/* Show Cart and Feedback only for regular users (not Admin or Delivery Team) */}
//             {isAuthenticated && !isAdmin && !isDeliveryTeam && (
//               <>
//                 <Nav.Link
//                   as={Link}
//                   to="/cart"
//                   className="text-white"
//                   onMouseEnter={() => handleMouseEnter('cart')}
//                   onMouseLeave={handleMouseLeave}
//                   style={{
//                     borderBottom: '2px solid transparent',
//                     borderBottomColor: hoveredLink === 'cart' ? 'white' : 'transparent',
//                     transition: 'border-bottom 0.3s ease',
//                     color: 'white',
//                     paddingBottom: '2px',
//                   }}
//                 >
//                   <Cart3 /> Cart
//                 </Nav.Link>

//                 <Nav.Link
//                   as={Link}
//                   to="/feedback"
//                   className="text-white"
//                   onMouseEnter={() => handleMouseEnter('feedback')}
//                   onMouseLeave={handleMouseLeave}
//                   style={{
//                     borderBottom: '2px solid transparent',
//                     borderBottomColor: hoveredLink === 'feedback' ? 'white' : 'transparent',
//                     transition: 'border-bottom 0.3s ease',
//                     color: 'white',
//                     paddingBottom: '2px',
//                   }}
//                 >
//                   Feedback
//                 </Nav.Link>
//               </>
//             )}

//             {/* Show Delivery Orders link for Delivery Team */}
//             {isDeliveryTeam && (
//               <Nav.Link
//                 as={Link}
//                 to="/delivery/orders"
//                 className="text-white"
//                 onMouseEnter={() => handleMouseEnter('deliveryOrders')}
//                 onMouseLeave={handleMouseLeave}
//                 style={{
//                   borderBottom: '2px solid transparent',
//                   borderBottomColor: hoveredLink === 'deliveryOrders' ? 'white' : 'transparent',
//                   transition: 'border-bottom 0.3s ease',
//                   color: 'white',
//                   paddingBottom: '2px',
//                 }}
//               >
//                 Delivery Orders
//               </Nav.Link>
//             )}

//             {/* Profile Icon Dropdown for Authenticated Users */}
//             {isAuthenticated && (
//               <DropdownButton
//                 id="profile-dropdown"
//                 variant="text"
//                 title={
//                   <span style={{ color: 'white' }}>
//                     <FaUserCircle size={24} /> {/* Profile Icon */}
//                   </span>
//                 }
//                 align="end"
//                 style={{ marginLeft: '10px' }}
//               >
//                 <Dropdown.ItemText style={{ color: '#333', padding: '8px 16px' }}>
//                   Welcome, <strong>{userEmail}</strong>
//                 </Dropdown.ItemText>
//                 <Dropdown.Divider />
//                 <Dropdown.Item
//                   onClick={logoutAndRedirect}
//                   style={{ color: '#333', padding: '8px 16px' }}
//                 >
//                   Logout
//                 </Dropdown.Item>
//               </DropdownButton>
//             )}

//             {/* Show My Account dropdown for unauthenticated users */}
//             {!isAuthenticated && (
//               <DropdownButton
//                 id="user-dropdown"
//                 variant="text"
//                 title={<span style={{ color: 'white' }}><Person /> My Account</span>}
//               >
//                 <Dropdown.Item as={Link} to="/usersignin" className="text-black">
//                   <Person style={{ marginRight: '8px' }} /> User Login
//                 </Dropdown.Item>
//                 <Dropdown.Item as={Link} to="/adminlogin" className="text-black">
//                   <FaShieldAlt style={{ marginRight: '8px' }} /> Admin Login
//                 </Dropdown.Item>
//                 <Dropdown.Item as={Link} to="/deliverylogin" className="text-black">
//                   <FaTruck style={{ marginRight: '8px' }} /> Delivery Login
//                 </Dropdown.Item>
//               </DropdownButton>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </div>
//     </Navbar>
//   );
// };

// export default Header;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import { Person, Cart3 } from 'react-bootstrap-icons';
import { FaShieldAlt, FaUserCircle } from 'react-icons/fa';
import { FaTruck } from 'react-icons/fa';
import '../HeaderComponent/Header.css';

const Header = ({ isAuthenticated, userEmail, handleLogout, isAdmin, isDeliveryTeam }) => {
    const navigate = useNavigate();
    const [hoveredLink, setHoveredLink] = useState(null);

    const handleMouseEnter = (link) => {
        setHoveredLink(link);
    };

    const handleMouseLeave = () => {
        setHoveredLink(null);
    };

    const logoutAndRedirect = () => {
        handleLogout();
        navigate('/');
    };

    return (
        <Navbar sticky="top" variant="dark" expand="lg" className="shadow-sm" style={{ height: 'auto', background: '#812093' }}>
            <div className="container">
                <Navbar.Brand href="/" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '700', fontSize: '30px', letterSpacing: '6px', color: 'white', transition: 'all 0.5s ease', cursor: 'pointer' }}
                    onMouseOver={(e) => { e.currentTarget.style.letterSpacing = '8px'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.letterSpacing = '6px'; e.currentTarget.style.transform = 'scale(1)'; }}>
                    FRESHIO
                </Navbar.Brand>

                <Navbar.Toggle />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto" style={{ gap: '20px' }}>
                        <Nav.Link as={Link} to="/" className="text-white"
                            onMouseEnter={() => handleMouseEnter('home')}
                            onMouseLeave={handleMouseLeave}
                            style={{ borderBottom: '2px solid transparent', borderBottomColor: hoveredLink === 'home' ? 'white' : 'transparent', transition: 'border-bottom 0.3s ease', color: 'white', paddingBottom: '2px' }}>
                            Home
                        </Nav.Link>

                        {!isDeliveryTeam && (
                            <>
                                <Nav.Link as={Link} to="/about" className="text-white"
                                    onMouseEnter={() => handleMouseEnter('about')}
                                    onMouseLeave={handleMouseLeave}
                                    style={{ borderBottom: '2px solid transparent', borderBottomColor: hoveredLink === 'about' ? 'white' : 'transparent', transition: 'border-bottom 0.3s ease', color: 'white', paddingBottom: '2px' }}>
                                    About Us
                                </Nav.Link>
                                <Nav.Link as={Link} to="/allproducts" className="text-white"
                                    onMouseEnter={() => handleMouseEnter('products')}
                                    onMouseLeave={handleMouseLeave}
                                    style={{ borderBottom: '2px solid transparent', borderBottomColor: hoveredLink === 'products' ? 'white' : 'transparent', transition: 'border-bottom 0.3s ease', color: 'white', paddingBottom: '2px' }}>
                                    Products
                                </Nav.Link>
                            </>
                        )}

                        {isAdmin && (
                            <>
                                <Nav.Link as={Link} to="/admin/products" className="text-white"
                                    onMouseEnter={() => handleMouseEnter('adminproducts')}
                                    onMouseLeave={handleMouseLeave}
                                    style={{ borderBottom: '2px solid transparent', borderBottomColor: hoveredLink === 'adminproducts' ? 'white' : 'transparent', transition: 'border-bottom 0.3s ease', color: 'white', paddingBottom: '2px' }}>
                                    Admin Products
                                </Nav.Link>
                                <Nav.Link as={Link} to="/admin/userslist" className="text-white"
                                    onMouseEnter={() => handleMouseEnter('usersList')}
                                    onMouseLeave={handleMouseLeave}
                                    style={{ borderBottom: '2px solid transparent', borderBottomColor: hoveredLink === 'usersList' ? 'white' : 'transparent', transition: 'border-bottom 0.3s ease', color: 'white', paddingBottom: '2px' }}>
                                    Users List
                                </Nav.Link>
                            </>
                        )}

                        {isAuthenticated && !isAdmin && !isDeliveryTeam && (
                            <>
                                <Nav.Link as={Link} to="/cart" className="text-white"
                                    onMouseEnter={() => handleMouseEnter('cart')}
                                    onMouseLeave={handleMouseLeave}
                                    style={{ borderBottom: '2px solid transparent', borderBottomColor: hoveredLink === 'cart' ? 'white' : 'transparent', transition: 'border-bottom 0.3s ease', color: 'white', paddingBottom: '2px' }}>
                                    <Cart3 /> Cart
                                </Nav.Link>
                                <Nav.Link as={Link} to="/feedback" className="text-white"
                                    onMouseEnter={() => handleMouseEnter('feedback')}
                                    onMouseLeave={handleMouseLeave}
                                    style={{ borderBottom: '2px solid transparent', borderBottomColor: hoveredLink === 'feedback' ? 'white' : 'transparent', transition: 'border-bottom 0.3s ease', color: 'white', paddingBottom: '2px' }}>
                                    Feedback
                                </Nav.Link>
                            </>
                        )}

                        {isDeliveryTeam && (
                            <Nav.Link as={Link} to="/delivery/orders" className="text-white"
                                onMouseEnter={() => handleMouseEnter('deliveryOrders')}
                                onMouseLeave={handleMouseLeave}
                                style={{ borderBottom: '2px solid transparent', borderBottomColor: hoveredLink === 'deliveryOrders' ? 'white' : 'transparent', transition: 'border-bottom 0.3s ease', color: 'white', paddingBottom: '2px' }}>
                                Delivery Orders
                            </Nav.Link>
                        )}

                        {isAuthenticated ? (
                            <DropdownButton id="profile-dropdown" variant="text" title={<span style={{ color: 'white' }}><FaUserCircle size={24} /></span>} align="end" style={{ marginLeft: '10px' }}>
                                <Dropdown.ItemText style={{ color: '#333', padding: '8px 16px' }}>Welcome, <strong>{userEmail}</strong></Dropdown.ItemText>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={logoutAndRedirect} style={{ color: '#333', padding: '8px 16px' }}>Logout</Dropdown.Item>
                            </DropdownButton>
                        ) : (
                            <DropdownButton id="user-dropdown" variant="text" title={<span style={{ color: 'white' }}><Person /> My Account</span>}>
                                <Dropdown.Item as={Link} to="/usersignin" className="text-black"><Person style={{ marginRight: '8px' }} /> User Login</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/adminlogin" className="text-black"><FaShieldAlt style={{ marginRight: '8px' }} /> Admin Login</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/deliverylogin" className="text-black"><FaTruck style={{ marginRight: '8px' }} /> Delivery Login</Dropdown.Item>
                            </DropdownButton>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Header;