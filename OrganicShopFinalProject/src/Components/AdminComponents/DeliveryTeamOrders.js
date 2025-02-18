import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeliveryTeamOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:5062/api/orders/delivery");
                console.log("Fetched Orders Response:", JSON.stringify(response.data, null, 2));

                // Ensure correct format before mapping
                if (!response.data || !Array.isArray(response.data.$values)) {
                    console.error("Unexpected API response structure:", response.data);
                    setOrders([]);
                    return;
                }

                // Extract and format the orders
                const formattedOrders = response.data.$values.map(order => ({
                    uniqueOrderId: order.uniqueOrderId,
                    userName: order.name || "Unknown User",
                    status: order.status,
                    orderDate: order.orderDate,
                    shippedDate: order.shippedDate,
                    deliveredDate: order.deliveredDate,
                }));

                setOrders(formattedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError(error.message || "An error occurred.");
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId, status) => {
        try {
            const response = await axios.put(
                `http://localhost:5062/api/orders/update-status/${orderId}`,
                { status }, // Ensure this matches the backend model
                { headers: { "Content-Type": "application/json" } } // Add headers
            );

            setOrders(orders.map(o =>
                o.uniqueOrderId === orderId
                    ? {
                          ...o,
                          status,
                          shippedDate: status === 'Shipped' ? new Date().toISOString() : o.shippedDate,
                          deliveredDate: status === 'Delivered' ? new Date().toISOString() : o.deliveredDate,
                      }
                    : o
            ));
        } catch (error) {
            console.error('Error updating order status:', error);
            setError(error.response?.data || "An error occurred.");
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Ordered':
                return { color: 'black' };
            case 'Shipped':
                return { color: 'orange' };
            case 'Delivered':
                return { color: 'green' };
            default:
                return { color: 'gray' };
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    };

    // if (loading) {
    //     return <div>Loading orders...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    // return (
    //     <div style={{ padding: '20px' }}>
    //         <h2>Delivery Team Orders</h2>
    //         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    //             <thead>
    //                 <tr>
    //                     <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Order ID</th>
    //                     <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>User Name</th>
    //                     <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
    //                     <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {Array.isArray(orders) &&
    //                     orders.map((order) => (
    //                         <tr key={order.uniqueOrderId}>
    //                             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{order.uniqueOrderId}</td>
    //                             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{order.userName}</td>
    //                             <td
    //                                 style={{
    //                                     padding: '8px',
    //                                     border: '1px solid #ddd',
    //                                     ...getStatusStyle(order.status),
    //                                 }}
    //                             >
    //                                 {order.status}
    //                                 {order.status === 'Shipped' && <p>Shipped: {formatDate(order.shippedDate)}</p>}
    //                                 {order.status === 'Delivered' && <p>Delivered: {formatDate(order.deliveredDate)}</p>}
    //                             </td>
    //                             <td style={{ padding: '8px', border: '1px solid #ddd' }}>
    //                                 {order.status === 'Ordered' && (
    //                                     <button onClick={() => updateOrderStatus(order.uniqueOrderId, 'Shipped')}>
    //                                         Mark as Shipped
    //                                     </button>
    //                                 )}
    //                                 {order.status === 'Shipped' && (
    //                                     <button onClick={() => updateOrderStatus(order.uniqueOrderId, 'Delivered')}>
    //                                         Mark as Delivered
    //                                     </button>
    //                                 )}
    //                             </td>
    //                         </tr>
    //                     ))}
    //             </tbody>
    //         </table>
    //     </div>
    // );
    if (loading) {
        return <div>Loading orders...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    if (Array.isArray(orders) && orders.length === 0) {
        return (
        <div
            style={{
              minHeight: "87vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f9f9f9", // Light background for the page
            }}
          > <div>No orders found.</div></div>
            )
    }
    
    return (
        <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center'}}>
       <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', width: '100vw', margin: '0', boxSizing: 'border-box' }}>
    <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px',fontWeight: 'bold',color: '#812093', }}>Delivery Team Orders</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold', color: 'black', verticalAlign: 'middle' }}>Order ID</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold', color: 'black', verticalAlign: 'middle' }}>User Name</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold', color: 'black', verticalAlign: 'middle' }}>Status</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold', color: 'black', verticalAlign: 'middle' }}>Actions</th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order) => (
                <tr key={order.uniqueOrderId} style={{ borderBottom: '1px solid #ddd', transition: 'background-color 0.3s' }}>
                    <td style={{ padding: '12px', border: '1px solid #ddd', color: '#333', textAlign: 'center', verticalAlign: 'middle' }}>{order.uniqueOrderId}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd', color: '#333', textAlign: 'center', verticalAlign: 'middle' }}>{order.userName}</td>
                    <td
                        style={{
                            padding: '12px',
                            border: '1px solid #ddd',
                            color: '#333',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            ...getStatusStyle(order.status),
                        }}
                    >
                        {order.status}
                        {order.status === 'Shipped' && <p style={{ margin: '5px 0 0', fontSize: '0.9em', color: '#666', textAlign: 'center' }}>Shipped: {formatDate(order.shippedDate)}</p>}
                        {order.status === 'Delivered' && <p style={{ margin: '5px 0 0', fontSize: '0.9em', color: '#666', textAlign: 'center' }}>Delivered: {formatDate(order.deliveredDate)}</p>}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'center', verticalAlign: 'middle' }}>
    {order.status === 'Ordered' && (
        <button
            onClick={() => updateOrderStatus(order.uniqueOrderId, 'Shipped')}
            style={{
                padding: '8px 12px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
        >
            Mark as Shipped
        </button>
    )}
    {order.status === 'Shipped' && (
        <button
            onClick={() => updateOrderStatus(order.uniqueOrderId, 'Delivered')}
            style={{
                padding: '8px 12px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
        >
            Mark as Delivered
        </button>
    )}
    {order.status === 'Delivered' && (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#28a745' }}>
        <span>Delivered Successfully</span>
        <i className="fas fa-check-circle" style={{ fontSize: '1.2em' }}></i> {/* FontAwesome tick icon */}
    </div>
)}
</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
        </div>
    );
};

export default DeliveryTeamOrders;
