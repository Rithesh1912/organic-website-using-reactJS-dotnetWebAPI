// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({
//     element,
//     isAuth,
//     isAdmin,
//     isDeliveryTeam,
//     redirectTo = '/',
// }) => {
//     let elementName = element.type.name;

//     // Admin Route Protection
//     if (elementName === "AdminProducts" || elementName === "UsersList") {
//         if (!isAuth) {
//             return <Navigate to="/usersignin" replace />;
//         }

//         if (!isAdmin) {
//             return <Navigate to="/" replace />; // Redirect unauthorized admin users to home
//         }

//         return element; // Allow authorized admins to access
//     }

//     // Delivery Team Route Protection
//     if (elementName === "DeliveryOrders") {
//         if (!isAuth) {
//             return <Navigate to="/deliverylogin" replace />;
//         }

//         if (!isDeliveryTeam) {
//             return <Navigate to="/" replace />; // Redirect unauthorized delivery users to home
//         }

//         return element; // Allow authorized delivery users to access
//     }

//     // General User Protection (Redirect to signin if not authenticated)
//     if (!isAuth) {
//         return <Navigate to="/" replace />;
//     }

//     // If none of the above conditions are met, render the element. This handles the case
//     // where the user is authenticated and authorized, or the route doesn't require special protection.
//     return element;
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, authStatus, isAdmin, isDeliveryTeam, redirectTo }) => {
    const elementName = element.type.name;

    if (authStatus === "checking") {
        return <div>Loading...</div>;
    }

    if (authStatus === "unauthenticated") {
        return <Navigate to={redirectTo} replace />;
    }

    if (elementName === "AdminProducts" || elementName === "UsersList") {
        if (!isAdmin) {
            return <Navigate to="/" replace />;
        }
    }

    if (elementName === "DeliveryOrders") {
        if (!isDeliveryTeam) {
            return <Navigate to="/" replace />;
        }
    }

    return element;
};

export default ProtectedRoute;
