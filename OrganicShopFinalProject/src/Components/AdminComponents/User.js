import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert
import "./UserList.css"; // Import custom CSS styles

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Fetch users with order count
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5062/api/admin/users");
      console.log("Response from API:", response.data);

      // Ensure response is an array
      let allUsers = response.data;
      if (!Array.isArray(allUsers)) {
        allUsers = allUsers.$values || [];
      }

      // Filter out unwanted users
      const filteredUsers = allUsers.filter(
        (user) => user.email !== "saiakash200236@gmail.com"
      );

      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]); // Set to empty array to avoid issues
    }
  };

  // Delete user with confirmation
  const deleteUser = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#f8f9fa",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        confirmButton: "custom-swal-confirm-button",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5062/api/admin/users/${userId}`);
          fetchUsers();
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
            background: "#f8f9fa",
            customClass: {
              popup: "custom-swal-popup",
              title: "custom-swal-title",
              confirmButton: "custom-swal-confirm-button",
            },
          });
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting the user.",
            icon: "error",
            background: "#f8f9fa",
            customClass: {
              popup: "custom-swal-popup",
              title: "custom-swal-title",
              confirmButton: "custom-swal-confirm-button",
            },
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ minHeight: "78vh", backgroundColor: "#f8f9fa", padding: "20px" }}>
      <div className="container mt-4">
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#812093",
            textAlign: "center",
            marginBottom: "30px",
            fontFamily: '"Roboto", sans-serif',
          }}
        >
          Users List
        </h2>
        {users.length === 0 ? (
          <div
            style={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              fontSize: "1.2rem",
              color: "#555",
            }}
          >
            No users found.
          </div>
        ) : (
          <div className="row">
            {users.map((user) => (
              <div className="col-md-4 mb-4" key={user.userId}>
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "15px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                    border: "1px solid #e0e0e0",
                  }}
                  className="user-card"
                  onMouseOver={(e) =>
                    (e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)")
                  }
                >
                  <div style={{ padding: "20px" }}>
                    <h5
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#333",
                        marginBottom: "15px",
                        fontFamily: '"Roboto", sans-serif',
                      }}
                    >
                      {user.name}
                    </h5>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#555",
                        marginBottom: "10px",
                        lineHeight: "1.6",
                      }}
                    >
                      <strong>User ID:</strong> {user.userId}
                    </p>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#555",
                        marginBottom: "10px",
                        lineHeight: "1.6",
                      }}
                    >
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#555",
                        marginBottom: "10px",
                        lineHeight: "1.6",
                      }}
                    >
                      <strong>Role:</strong> {user.role}
                    </p>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#555",
                        marginBottom: "10px",
                        lineHeight: "1.6",
                      }}
                    >
                      <strong>Orders:</strong> {user.orderCount || 0}
                    </p>
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                      <button
                        style={{
                          padding: "10px 20px",
                          fontSize: "1rem",
                          fontWeight: "600",
                          borderRadius: "30px",
                          backgroundColor: "#e74c3c",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#c0392b")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "#e74c3c")
                        }
                        onClick={() => deleteUser(user.userId)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;