import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Cart = ({ cart, setCart, isVisible, setIsVisible, userId }) => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [shouldUpdateHistory, setShouldUpdateHistory] = useState(false);

    // Load cart from localStorage on component mount
    useEffect(() => {
        const savedCart = localStorage.getItem(`cart_${userId}`);
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, [userId, setCart]);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    }, [cart, userId]);

    // Fetch order history when userId changes
    useEffect(() => {
        if (userId) {
            fetchOrderHistory();
        } else {
            setOrderHistory([]); // Reset history when user logs out
        }
    }, [userId]);

    // Fetch order history when shouldUpdateHistory is true
    useEffect(() => {
        if (shouldUpdateHistory) {
            fetchOrderHistory();
            setShouldUpdateHistory(false);
        }
    }, [shouldUpdateHistory]);

    // Fetch order history from the API
    const fetchOrderHistory = async () => {
        if (!userId) return;
        try {
            const response = await fetch(`http://localhost:5062/api/orders/history/${userId}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch order history: ${errorText}`);
            }

            const data = await response.json();
            console.log("📜 Order History:", data);

            // Format order history data
            const formattedOrders = (data?.$values || data || []).map(order => ({
                ...order,
                orderItems: order.orderItems?.$values || order.orderItems || [],
                orderDate: order.orderDate ? new Date(order.orderDate) : null,
                shippedDate: order.shippedDate ? new Date(order.shippedDate) : null,
                deliveredDate: order.deliveredDate ? new Date(order.deliveredDate) : null,
            }));

            setOrderHistory(formattedOrders);
        } catch (error) {
            console.error("🚨 Error fetching order history:", error.message);
            setOrderHistory([]); // Prevent UI crash if error occurs
        }
    };

    // Handle placing an order
    const handleProceedToOrder = async () => {
        console.log("Proceeding to order...");
        if (!userId) {
            showModal("❌ User is not logged in.");
            return;
        }

        if (cart.length === 0) {
            showModal("❌ Your cart is empty.");
            return;
        }

        setLoading(true);

        const order = {
            userId: parseInt(userId),
            totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
            orderItems: cart.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price ?? 0,
            })),
        };
        console.log("Order object:", order);

        try {
            const response = await fetch("http://localhost:5062/api/orders/placeorder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            });

            console.log("API Response:", response); // Add this line
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`🚨 Failed to place order: ${errorMessage}`);
            }

            // Update stock for each product in the cart
            await Promise.all(cart.map(async (item) => {
                const response = await fetch(`http://localhost:5062/api/products/${item.productId}/update-stock`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ quantity: item.quantity }),
                });

                if (!response.ok) {
                    throw new Error(`🚨 Stock update failed for product ID: ${item.productId}`);
                }
            }));

            // Clear the cart
            setCart([]);
            localStorage.setItem(`cart_${userId}`, JSON.stringify([]));

            // Show success message and trigger order history update
            showModal("✅ Your products has been ordered!", true);
        } catch (error) {
            console.error("🚨 Order placement failed:", error);
            showModal("❌ Order failed! Check console logs.");
        } finally {
            setLoading(false);
        }
    };

    const formatDateTime = (date) => {
        if (!date) return 'Pending';
        return date.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    };

    const renderTrackingSteps = (order) => {
        const isShipped = order.status === 'Shipped' || order.status === 'Delivered';
        const isDelivered = order.status === 'Delivered';

        const statuses = [
            {
                status: 'Ordered',
                date: order.orderDate,
                isCompleted: true,
                icon: '📦', // Icon for Ordered
            },
            {
                status: 'Shipped',
                date: order.shippedDate,
                isCompleted: isShipped,
                icon: '🚚', // Icon for Shipped
            },
            {
                status: 'Delivered',
                date: order.deliveredDate,
                isCompleted: isDelivered,
                icon: '✅', // Icon for Delivered
            },
        ];

        return (
            <div style={{ margin: '20px 0', position: 'relative' }}>
    {/* Steps */}
    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
        {statuses.map((step, index) => (
            <div
                key={index}
                style={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: step.isCompleted ? '#6a1b9a' : '#e0e0e0', // Purple for completed, gray for pending
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: step.isCompleted ? '#fff' : '#999', // White text for completed, gray for pending
                        fontSize: '1.2rem',
                        marginBottom: '8px',
                        border: `2px solid ${step.isCompleted ? '#6a1b9a' : '#e0e0e0'}`, // Border color matches background
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {step.icon} {/* Display icon */}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: '500', color: step.isCompleted ? '#333' : '#999' }}>
                    {step.status}
                </div>
                {step.date && (
                    <div style={{ fontSize: '0.75rem', color: step.isCompleted ? '#6a1b9a' : '#999' }}>
                        {step.isCompleted ? formatDateTime(step.date) : 'Pending'}
                    </div>
                )}
            </div>
        ))}
    </div>
</div>
        );
    };

    const showModal = (message, shouldUpdate = false) => {
        setModalMessage(message);
        setModalVisible(true);
        if (shouldUpdate) {
            setShouldUpdateHistory(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);

        // Re-fetch order history if the modal was showing a success message
        if (modalMessage.includes("✅ Your products has been ordered!")) {
            fetchOrderHistory();
        }
    };

    return (
        <div style={{ minHeight: "100vh" }}>
            <div style={{ minHeight: "100vh", paddingBottom: "30px", color: "#333", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "left", rowGap: '30px' }}>
                {/* Cart Section */}
                <div
  style={{
    background: "lavenderblush",
    borderRadius: "12px",
    padding: "20px",
    width: "75%",
    maxWidth: "800px",
    marginTop: "25px",
    position: "relative",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
  }}
>
  {/* Clear Cart Button */}
  {cart.length > 0 && (
    <button
      onClick={() => {
        setCart([]); // Empty the cart
        localStorage.setItem(`cart_${userId}`, JSON.stringify([]));
      }}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "#fff",
        color: "red",
        border: "none",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        cursor: "pointer",
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
      }}
    >
      ×
    </button>
  )}

  {/* Cart Title */}
  <h2
    className="text-center"
    style={{
      fontFamily: "'Poppins', sans-serif",
      fontWeight: "bold",
      color: "#812093",
      marginBottom: "20px",
    }}
  >
    YOUR CART
  </h2>

  {/* Empty Cart Message */}
  {cart.length === 0 ? (
  <div
    style={{
      textAlign: "center",
      padding: "40px",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e0e0e0",
      transition: "all 0.3s ease",
      animation: "fadeIn 0.5s ease",
    }}
  >
    {/* Animated Shopping Cart Icon */}
    <div
      style={{
        fontSize: "60px",
        color: "#812093",
        marginBottom: "20px",
        animation: "bounce 2s infinite",
      }}
    >
      🛒
    </div>

    {/* Empty Cart Title */}
    <h2
      style={{
        fontSize: "24px",
        fontWeight: "600",
        color: "#333",
        marginBottom: "10px",
      }}
    >
      Your Cart is Empty
    </h2>

    {/* Empty Cart Description */}
    <p
      style={{
        fontSize: "16px",
        color: "#666",
        marginBottom: "20px",
        lineHeight: "1.6",
      }}
    >
      Looks like you haven't added anything to your cart yet. Start shopping now to explore our amazing products!
    </p>

    {/* Call-to-Action Button */}
    {/* <button
    //   onClick={() => navigate("/products")} // Redirect to the products page
      style={{
        padding: "12px 24px",
        fontSize: "16px",
        fontWeight: "500",
        color: "#fff",
        backgroundColor: "#812093",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#6b1a7a";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#812093";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      Start Shopping
    </button> */}
  </div>
) : (
    <>
      {/* Cart Items */}
      {cart.map((item) => (
        <div
          key={item.productId}
          className="card mb-3"
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          {/* Product Image */}
          <img
            src={
              item.images?.$values?.length > 0
                ? `http://localhost:5062${item.images.$values[0]}`
                : "/default-image.jpg"
            }
            alt={item.title}
            style={{
              width: "100px",
              height: "auto",
              marginRight: "20px",
              borderRadius: "8px",
            }}
          />

          {/* Product Details */}
          <div style={{ flex: 1 }}>
            <h5 style={{ margin: 0, fontWeight: "bold" }}>{item.title}</h5>
            <p style={{ margin: "5px 0" }}>Price: ₹{item.price.toFixed(2)}</p>
            <p style={{ margin: "5px 0" }}>
              Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
            </p>
          </div>

          {/* Quantity Controls */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() => {
                if (item.quantity > 1) {
                  setCart(
                    cart.map((i) =>
                      i.productId === item.productId
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                    )
                  );
                }
              }}
              className="btn btn-outline-secondary btn-sm"
              disabled={loading}
              style={{ marginRight: "10px", borderRadius: "50%" }}
            >
              <i className="fas fa-minus"></i>
            </button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value, 10);
                if (newQuantity > 0 && newQuantity <= item.quantityInStock) {
                  setCart(
                    cart.map((i) =>
                      i.productId === item.productId
                        ? { ...i, quantity: newQuantity }
                        : i
                    )
                  );
                }
              }}
              style={{
                width: "50px",
                textAlign: "center",
                margin: "0 10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                padding: "5px",
              }}
            />
            <button
              onClick={() => {
                if (item.quantity < item.quantityInStock) {
                  setCart(
                    cart.map((i) =>
                      i.productId === item.productId
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                    )
                  );
                } else {
                  setModalMessage(`Only ${item.quantityInStock} ${item.title} available.`);
                  setModalVisible(true);
                }
              }}
              className="btn btn-outline-secondary btn-sm"
              disabled={loading}
              style={{ marginLeft: "10px", borderRadius: "50%" }}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>

          {/* Remove Item Button */}
          <button
            onClick={() =>
              setCart(cart.filter((i) => i.productId !== item.productId))
            }
            className="btn btn-danger btn-sm"
            disabled={loading}
            style={{
              height: "30px",
              marginBlock: "auto",
              marginLeft: "10px",
              borderRadius: "50%",
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      ))}

      {/* Discount Code Input */}
      {/* <div style={{ marginTop: "20px", textAlign: "right" }}>
        <input
          type="text"
          placeholder="Enter discount code"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginRight: "10px",
          }}
        />
        <button
          className="btn btn-primary"
          style={{ borderRadius: "8px" }}
          onClick={() => alert("Discount code applied!")}
        >
          Apply
        </button>
      </div> */}

      {/* Total and Proceed to Order */}
      <h3
        className="text-right"
        style={{ textAlign: "end", fontWeight: "bold", marginTop: "20px" }}
      >
        Total: ₹{cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
      </h3>
      <button
        onClick={handleProceedToOrder}
        className="btn btn-success btn-block mt-3"
        disabled={loading}
        style={{
          margin: "10px auto",
          borderRadius: "8px",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {loading ? "Processing..." : "Proceed to Order"}
      </button>
    </>
  )}
</div>

                {/* Previous Orders Section */}
                {orderHistory.length > 0 && (
                    <div style={{
                        background: "lavenderblush",
                        padding: "30px",
                        marginTop: "20px",
                        borderRadius: "16px",
                        width: "75%",
                        maxWidth: "800px",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
                        margin: "0 auto"
                    }}>
                        <h2 className="text-center" style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "700",
                            color: '#6a1b9a',
                            fontSize: "2rem",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            marginBottom: "30px"
                        }}>
                            Your Orders

                        </h2>
                        {orderHistory.map((order) => (
                            <div
                                key={order.uniqueOrderId}
                                className="card mb-3"
                                style={{
                                    padding: "25px",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "12px",
                                    marginBottom: "20px",
                                    backgroundColor: "#fff",
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <h5 style={{
                                    color: "#6a1b9a",
                                    fontWeight: "600",
                                    fontSize: "1.4rem",
                                    marginBottom: "15px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px"
                                }}>
                                    <span style={{ fontSize: "1.2em" }}>📦</span> {/* Icon for order ID */}
                                    Order ID: {order.uniqueOrderId}
                                </h5>
                                {order.orderItems.map((item, index) => (
                                    <p
                                        key={`${order.uniqueOrderId}-${item.productId}`}
                                        style={{
                                            color: "#555",
                                            marginBottom: "10px",
                                            fontSize: "1rem",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px"
                                        }}
                                    >
                                        <span style={{ fontSize: "1.2em" }}>🛒</span> {/* Icon for product items */}
                                        <strong>{item.productTitle || "Unknown Product"}</strong> - {item.quantity} x ₹{item.price.toFixed(2)}
                                    </p>
                                ))}
                                <div style={{
                                    marginTop: "20px",
                                    fontWeight: "700",
                                    fontSize: "1.3rem",
                                    color: "#333",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px"
                                }}>
                                    <span style={{ fontSize: "1.2em" }}>💰</span> {/* Icon for total price */}
                                    Total Price: ₹{(order.totalAmount ?? 0).toFixed(2)}
                                </div>
                                {renderTrackingSteps(order)}
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal Notification Section */}
                {modalVisible && (
  <div
    style={{
      display: 'block',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease',
    }}
  >
    <div
      style={{
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '20%',
        animation: 'slideIn 0.3s ease',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '16px',
            backgroundColor: '#812093',
            color: '#fff',
            textAlign: 'center',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <h5
            style={{
              margin: 0,
              fontFamily: "'Poppins', sans-serif",
              fontSize: '20px',
              fontWeight: '600',
            }}
          >
            Notification
          </h5>
        </div>

        {/* Modal Body */}
        <div
          style={{
            padding: '20px',
            textAlign: 'center',
            fontFamily: "'Roboto', sans-serif",
            fontSize: '16px',
            color: '#333',
          }}
        >
          <p>{modalMessage}</p>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '16px',
            textAlign: 'right',
            borderTop: '1px solid #e0e0e0',
          }}
        >
          <button
            type="button"
            onClick={closeModal}
            style={{
              padding: '10px 20px',
              backgroundColor: '#812093',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#6b1a7a';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#812093';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}
            </div>
        </div>
    );
};

Cart.propTypes = {
    cart: PropTypes.array.isRequired,
    setCart: PropTypes.func.isRequired,
    isVisible: PropTypes.bool,
    setIsVisible: PropTypes.func,
    userId: PropTypes.number.isRequired,
};

export default Cart;