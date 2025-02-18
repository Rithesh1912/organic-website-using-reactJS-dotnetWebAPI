import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import * as bootstrap from "bootstrap";
import './Admin.css'; // Import the CSS file here
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon


function Admin() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    quantityInStock: "",
    weight: "",
    category: "vegetables",
    availabilityStatus: "available",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null); // Create a ref for file input

  const categories = ["vegetables", "essentials", "eggandmeat", "fruits"];
  const availabilityOptions = ["In Stock", "No Stock"];

  // Function to validate title and description
  const validateText = (text) => {
    // Remove numbers and consecutive spaces
    return text.replace(/[0-9]/g, '').replace(/\s{2,}/g, ' ');
  };

  // Handle input change for title and description
  const handleTextChange = (e, key) => {
    const value = validateText(e.target.value);
    setCurrentProduct({ ...currentProduct, [key]: value });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5062/api/products");
        console.log('Admin API Response:', response.data); // Log the response data

        // Check if response contains the $values array
        if (response.data?.$values && Array.isArray(response.data.$values)) {
          setProducts(response.data.$values);
          setFilteredProducts(response.data.$values); // Initialize with all products
        } else {
          console.error("Expected products to be an array but got:", response.data);
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on the search query
    if (searchQuery.trim() !== "") {
      const result = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(result);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const openModal = () => {
    const modalElement = document.getElementById("productModal");
    if (modalElement) {
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  };

  const closeModal = () => {
    const modalElement = document.getElementById("productModal");
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) modalInstance.hide();
    }
  };

  const handleAddProduct = async () => {
    const existingProduct = products.find(product => product.title.toLowerCase() === currentProduct.title.toLowerCase());
    if (existingProduct) {
      alert("The product you have entered already exists.");
      return;
    }

    if (!currentProduct.title || !currentProduct.description || !currentProduct.price) {
      alert("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    Object.keys(currentProduct).forEach((key) => formData.append(key, currentProduct[key]));

    if (selectedImage) {
      formData.append("imageFile", selectedImage);
    } else {
      alert("Image file is required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5062/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts([response.data, ...products]);
      setFilteredProducts([response.data, ...filteredProducts]);
      resetForm();
      closeModal();
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert(`Error adding product: ${error.response?.data || error.message}`);
    }
  };

  
  const handleUpdateProduct = async () => {
    if (!currentProduct.title || !currentProduct.description || !currentProduct.price) {
      alert("Please fill all required fields.");
      return;
    }
  
    // Ensure "In Stock" when quantity is 1 or more
    const updatedProduct = { 
      ...currentProduct, 
      availabilityStatus: parseInt(currentProduct.quantityInStock) > 0 ? "In Stock" : "No Stock" 
    };
  
    if (!selectedImage) {
      delete updatedProduct.imageFile;
    } else {
      updatedProduct.imageFile = selectedImage;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5062/api/products/${currentProduct.productId}`,
        updatedProduct,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      // Update products in state
      setProducts(products.map((product) =>
        product.productId === currentProduct.productId ? response.data : product
      ));
      setFilteredProducts(filteredProducts.map((product) =>
        product.productId === currentProduct.productId ? response.data : product
      ));
  
      resetForm();
      closeModal();
    } catch (error) {
      console.error("Error updating product:", error.response?.data);
      alert(`Error updating product: ${JSON.stringify(error.response?.data, null, 2)}`);
    }
  };
  
  
  const handleEditProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = ''; 
    openModal();
  };

  const handleDeleteProduct = async (productId, productTitle) => {
    if (window.confirm(`Are you sure you want to delete ${productTitle}?`)) {
      try {
        await axios.delete(`http://localhost:5062/api/products/${productId}`);
        setProducts(products.filter((product) => product.productId !== productId));
        setFilteredProducts(filteredProducts.filter((product) => product.productId !== productId));
        alert(`${productTitle} has been deleted.`);
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product.");
      }
    }
  };

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentProduct({
      title: "",
      description: "",
      price: "",
      discountPercentage: "",
      quantityInStock: "",
      weight: "",
      category: "vegetables",
      availabilityStatus: "available",
    });
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const groupProductsByCategory = (products) => {
    if (!Array.isArray(products)) {
      console.error("Expected products to be an array but got:", products);
      return {};
    }
    return products.reduce((acc, product) => {
      const { category } = product;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupProductsByCategory(filteredProducts);

  const getImageUrl = (img) => {
    if (img && img.$values && img.$values.length > 0) {
      return `http://localhost:5062${img.$values[0]}`;
    } else {
      return "/default-image.jpg";
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="container-fluid">
        {/* Search Bar with Icon Inside */}
        <div className="d-flex justify-content-between mb-3 inside" style={{ marginTop: '15px' }}>
  {/* Add Product Button */}
  <button
    className="btn btn-success d-flex align-items-center"
    onClick={() => {
      resetForm();
      openModal();
    }}
    style={{
      borderRadius: '30px',
      padding: '10px 25px',
      fontSize: '1.2rem',
      fontWeight: '600',
      background: 'linear-gradient(135deg, #28a745, #218838)', // Gradient background
      border: 'none',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    }}
    onMouseOver={(e) => {
      e.target.style.background = 'linear-gradient(135deg, #218838, #1e7e34)'; // Darker gradient on hover
      e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)'; // Larger shadow on hover
    }}
    onMouseOut={(e) => {
      e.target.style.background = 'linear-gradient(135deg, #28a745, #218838)'; // Restore gradient
      e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Restore shadow
    }}
    onMouseDown={(e) => {
      e.target.style.transform = 'scale(0.98)'; // Slight shrink on click
    }}
    onMouseUp={(e) => {
      e.target.style.transform = 'scale(1)'; // Restore size
    }}
  >
    <AddIcon style={{ marginRight: '10px', fontSize: '1.5rem', color: '#fff' }} /> {/* Add Icon */}
    Add Product
  </button>

  {/* Search Bar */}
  <div className="input-group" style={{ width: '300px', maxWidth: '100%' }}>
    <span
      className="input-group-text"
      style={{
        backgroundColor: '#fff',
        border: '1px solid #ced4da',
        borderRight: 'none',
        borderTopLeftRadius: '25px',
        borderBottomLeftRadius: '25px',
        padding: '10px 15px',
        cursor: 'pointer',
      }}
    >
      <SearchIcon style={{ fontSize: '1.5rem', color: '#6c757d' }} />
    </span>
    <input
      type="text"
      className="form-control"
      placeholder="Search product by name"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{
        border: '1px solid #ced4da',
        borderLeft: 'none',
        borderTopRightRadius: '25px',
        borderBottomRightRadius: '25px',
        padding: '10px 15px',
        fontSize: '1rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
      }}
      onFocus={(e) => {
        e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Highlight on focus
        e.target.style.borderColor = '#86b7fe'; // Change border color on focus
      }}
      onBlur={(e) => {
        e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)'; // Restore shadow
        e.target.style.borderColor = '#ced4da'; // Restore border color
      }}
    />
  </div>
</div>

        {/* Display Products Grouped by Category */}
        <div className="container-fluid">
  {/* Display Products Grouped by Category */}
  <div className="row">
    {Object.keys(groupedProducts).map((category) => (
      <div key={category} className="col-12 mb-4">
        <h4
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            color: "white",
            textAlign: "center",
            backgroundColor: "#812093",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "25px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h4>
        <div className="row">
          {groupedProducts[category].map((product) => (
            <div key={product.productId} className="col-md-3 mb-4">
              <div
                style={{
                  borderRadius: "15px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  backgroundColor: "#fff",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "1px solid #e0e0e0",
                }}
                className="custom-card"
                onMouseOver={(e) =>
                  (e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)")
                }
              >
                {/* Product Image */}
                <img
                  src={getImageUrl(product.images)}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "200px",
                    
                  }}
                  alt={product.title}
                />

                {/* Product Details */}
                <div
                  style={{
                    padding: "20px",
                    backgroundColor: "#fff",
                  }}
                >
                  <h5
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#333",
                      textAlign: "center",
                      marginBottom: "15px",
                      fontFamily: '"Roboto", sans-serif',
                      letterSpacing: "0.5px",
                    }}
                  >
                    {product.title}
                  </h5>

                  <div
                    style={{
                      fontSize: "1rem",
                      color: "#555",
                      marginBottom: "10px",
                      lineHeight: "1.6",
                    }}
                  >
                    <p>
                      <strong>Price:</strong> ₹{product.price}
                    </p>
                    <p>
                      <strong>Stock:</strong> {product.quantityInStock}
                    </p>
                    <p>
                      <strong>Availability:</strong> {product.availabilityStatus}
                    </p>
                    <p>
                      <strong>Category:</strong> {product.category}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div
  style={{
    textAlign: "center",
    marginTop: "15px",
    padding: "15px",
    backgroundColor: "#f8f9fa",
    borderTop: "1px solid #e0e0e0",
  }}
>
  {/* Edit Button */}
  <button
    style={{
      padding: "10px 20px",
      fontSize: "1rem",
      fontWeight: "600",
      borderRadius: "30px",
      backgroundColor: "#4CAF50", // Professional green
      color: "#fff",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginRight: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    }}
    onMouseOver={(e) =>
      (e.currentTarget.style.backgroundColor = "#45a049") // Darker green on hover
    }
    onMouseOut={(e) =>
      (e.currentTarget.style.backgroundColor = "#4CAF50") // Restore green
    }
    onClick={() => handleEditProduct(product)}
  >
    <EditIcon style={{ marginRight: "8px", fontSize: "1.2rem" }} /> Edit
  </button>

  {/* Delete Button */}
  <button
    style={{
      padding: "10px 20px",
      fontSize: "1rem",
      fontWeight: "600",
      borderRadius: "30px",
      backgroundColor: "#F44336", // Professional red
      color: "#fff",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    }}
    onMouseOver={(e) =>
      (e.currentTarget.style.backgroundColor = "#d32f2f") // Darker red on hover
    }
    onMouseOut={(e) =>
      (e.currentTarget.style.backgroundColor = "#F44336") // Restore red
    }
    onClick={() => handleDeleteProduct(product.productId, product.title)}
  >
    <DeleteIcon style={{ marginRight: "8px", fontSize: "1.2rem" }} /> Delete
  </button>
</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>

        {/* Bootstrap Modal for Add/Edit Product */}
        <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content" style={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      {/* Modal Header */}
      <div className="modal-header" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
        <h5 className="modal-title" style={{ fontWeight: 'bold', margin: 0 }}>
          {isEditing ? "EDIT PRODUCT" : "ADD PRODUCT"}
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={closeModal}
          style={{ border: 'none', backgroundColor: 'transparent' }}
        ></button>
      </div>

      {/* Modal Body */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          isEditing ? handleUpdateProduct() : handleAddProduct();
        }}
        encType="multipart/form-data"
      >
        <div className="modal-body">
          {/* Dynamic Input Fields */}
          {["title", "description", "price", "discountPercentage", "quantityInStock", "weight"].map((key) => (
            <div key={key} style={{ marginBottom: '1rem' }}>
              <label
                className="form-label"
                style={{
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: '#6c757d',
                  marginBottom: '0.5rem',
                  display: 'block',
                }}
              >
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={["price", "discountPercentage", "quantityInStock", "weight"].includes(key) ? "number" : "text"}
                className="form-control"
                value={currentProduct[key]}
                onChange={(e) => {
                  if (key === "title" || key === "description") {
                    handleTextChange(e, key);
                  } else {
                    setCurrentProduct({ ...currentProduct, [key]: e.target.value });
                  }
                }}
                required
                style={{
                  borderRadius: '6px',
                  border: '1px solid #ced4da',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.9rem',
                  width: '100%',
                }}
              />
            </div>
          ))}

          {/* Category Dropdown */}
          <div style={{ marginBottom: '1rem' }}>
            <label
              className="form-label"
              style={{
                textTransform: 'uppercase',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: '#6c757d',
                marginBottom: '0.5rem',
                display: 'block',
              }}
            >
              Category
            </label>
            <select
              className="form-select"
              value={currentProduct.category}
              onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
              style={{
                borderRadius: '6px',
                border: '1px solid #ced4da',
                padding: '0.5rem 0.75rem',
                fontSize: '0.9rem',
                width: '100%',
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Status Dropdown */}
          <div style={{ marginBottom: '1rem' }}>
            <label
              className="form-label"
              style={{
                textTransform: 'uppercase',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: '#6c757d',
                marginBottom: '0.5rem',
                display: 'block',
              }}
            >
              Availability Status
            </label>
            <select
              className="form-select"
              value={currentProduct.availabilityStatus}
              onChange={(e) => setCurrentProduct({ ...currentProduct, availabilityStatus: e.target.value })}
              style={{
                borderRadius: '6px',
                border: '1px solid #ced4da',
                padding: '0.5rem 0.75rem',
                fontSize: '0.9rem',
                width: '100%',
              }}
            >
              {availabilityOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload (Only for Add Product) */}
          {!isEditing && (
            <div style={{ marginBottom: '1rem' }}>
              <label
                className="form-label"
                style={{
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: '#6c757d',
                  marginBottom: '0.5rem',
                  display: 'block',
                }}
              >
                Product Image
              </label>
              <input
                type="file"
                className="form-control"
                ref={fileInputRef}
                onChange={handleImageChange}
                required={!isEditing}
                style={{
                  borderRadius: '6px',
                  border: '1px solid #ced4da',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.9rem',
                  width: '100%',
                }}
              />
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer" style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #e9ecef' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#0d6efd',
              border: 'none',
              borderRadius: '6px',
              color: '#fff',
              fontWeight: 'bold',
              padding: '0.75rem',
              fontSize: '1rem',
              width: '100%',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0b5ed7')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#0d6efd')}
          >
            {isEditing ? "SAVE CHANGES" : "ADD PRODUCT"}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}

export default Admin;
