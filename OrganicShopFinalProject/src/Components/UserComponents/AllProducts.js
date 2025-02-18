import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../UserComponents/css/AllProducts.css';
import { FaSpinner, FaShoppingCart } from 'react-icons/fa'; // Importing a spinner and cart icon

const AllProducts = ({ cart, setCart, isLoggedIn, userId }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5062/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        console.log("AllProducts API Response Data:", data);

        if (data?.$values && Array.isArray(data.$values)) {
          setProducts(data.$values);
        } else {
          console.error('Expected $values to be an array but got:', data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("user_token");
    const existingItem = cart.find(item => item.productId === product.productId);

    if (!token) {
      // Store the product and last visited page, then redirect
      localStorage.setItem("productToAdd", JSON.stringify(product));
      localStorage.setItem("lastVisitedPage", window.location.pathname);
      navigate('/usersignin');
    } else {
      if (!existingItem) {
        const updatedCart = [...cart, { ...product, quantity: 1 }];
        setCart(updatedCart);
        localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
      }
    }
  };

  const handleViewCart = () => {
    if (!isLoggedIn) {
      navigate('/usersignin');
    } else {
      navigate('/cart');
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const loadingStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Center it in the viewport
  };

  const spinnerStyle = {
    fontSize: '50px', // Size of the spinner icon
    animation: 'spin 1s linear infinite', // Spin animation
  };

  if (loading) return (
    <div>
      {loading ? (
        <div style={loadingStyle}>
          <FaSpinner style={spinnerStyle} />
          <p>Loading products...</p>
        </div>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );

  if (!products.length) return <div className="no-results">No products found.</div>;

  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <div style={{ minHeight: '80vh', position: 'relative' }}>
      {/* Floating Cart Icon */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#812093',
          color: '#fff',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'transform 0.3s ease, background-color 0.3s ease',
        }}
        onClick={handleViewCart}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.backgroundColor = '#6b1a7a';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = '#812093';
        }}
      >
        <FaShoppingCart size={24} />
        {cart.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              backgroundColor: '#ff4757',
              color: '#fff',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {cart.length}
          </div>
        )}
      </div>

      {/* Product Page */}
      <div className="product-page" style={{ padding: '20px' }}>
        {/* Search Bar */}
        <div className="search-bar" style={{ textAlign: 'center', marginBottom: '20px' }}>
  <div
    style={{
      position: 'relative',
      width: '80%',
      maxWidth: '600px', // Limit the width for better readability
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '30px', // Rounded corners
      border: '1px solid #ddd',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      overflow: 'hidden', // Ensure child elements respect rounded corners
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 123, 255, 0.2)';
      e.currentTarget.style.transform = 'scale(1.02)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.transform = 'scale(1)';
    }}
  >
    {/* Search Icon */}
    <i
      className="fa fa-search"
      style={{
        position: 'absolute',
        left: '20px',
        fontSize: '20px',
        color: '#888',
        pointerEvents: 'none',
        transition: 'color 0.3s ease',
      }}
    ></i>

    {/* Search Input */}
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={handleSearchChange}
      style={{
        flex: 1,
        padding: '12px 20px 12px 50px', // Padding to create space for the icon
        fontSize: '16px',
        border: 'none',
        outline: 'none',
        color: '#333',
        backgroundColor: 'transparent',
        transition: 'background-color 0.3s ease',
      }}
      onFocus={(e) => {
        e.target.style.backgroundColor = '#f8f9fa';
        e.target.parentElement.style.boxShadow = '0 6px 16px rgba(0, 123, 255, 0.3)';
      }}
      onBlur={(e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.parentElement.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
    />

    {/* Clear Button (Visible when searchTerm is not empty) */}
    {searchTerm && (
      <button
        onClick={() => setSearchTerm('')}
        style={{
          padding: '10px',
          fontSize: '16px',
          color: '#888',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: 'color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#ff4757'; // Red color on hover
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#888';
        }}
      >
        <i className="fa fa-times"></i>
      </button>
    )}

    {/* Search Button */}
    <button
      onClick={() => console.log('Search:', searchTerm)} // Add your search logic here
      style={{
        padding: '12px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#812093',
        border: 'none',
        borderRadius: '0 30px 30px 0', // Rounded right corners
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
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
      Search
    </button>
  </div>
</div>

        {/* Category Filter */}
        <div className="category-filter" style={{ marginBottom: '20px', textAlign: 'center' }}>
  <label
    htmlFor="category"
    style={{
      fontSize: '18px',
      marginRight: '10px',
      fontWeight: '600',
      color: '#555',
    }}
  >
    Category:
  </label>

  <div
    style={{
      display: 'inline-block',
      position: 'relative',
      width: '250px',
    }}
  >
    {/* Custom dropdown container */}
    <select
      id="category"
      value={selectedCategory}
      onChange={handleCategoryChange}
      style={{
        width: '100%',
        padding: '12px 20px',
        fontSize: '16px',
        borderRadius: '30px', // Rounded corners
        border: '1px solid #ddd',
        backgroundColor: '#f8f9fa',
        color: '#333',
        appearance: 'none',
        outline: 'none',
        transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
      onFocus={(e) => {
        e.target.style.backgroundColor = '#fff';
        e.target.style.borderColor = '#812093';
        e.target.style.boxShadow = '0 6px 16px rgba(129, 32, 147, 0.2)';
      }}
      onBlur={(e) => {
        e.target.style.backgroundColor = '#f8f9fa';
        e.target.style.borderColor = '#ddd';
        e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = '0 6px 16px rgba(129, 32, 147, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
    >
      <option value="All">All</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </option>
      ))}
    </select>

    {/* Custom arrow icon */}
    <span
      style={{
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '18px',
        color: '#888',
        pointerEvents: 'none',
        transition: 'color 0.3s ease',
      }}
    >
      &#9662; {/* Downward arrow */}
    </span>
  </div>

  {/* Clear Selection Button (Visible when a category is selected) */}
  {selectedCategory !== 'All' && (
    <button
      onClick={() => setSelectedCategory('All')}
      style={{
        marginLeft: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#ff4757', // Red color for the clear button
        border: 'none',
        borderRadius: '30px', // Rounded corners
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#e84118';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#ff4757';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      Clear
    </button>
  )}
</div>

        {/* Product List */}
        <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {filteredProducts.length === 0 ? (
            <div className="no-matching-results">No matching results found.</div>
          ) : (
            filteredProducts.map((product) => {
              const imageUrl = product.images?.$values?.length > 0 ? `http://localhost:5062${product.images.$values[0]}` : "/default-image.jpg";
              const isOutOfStock = product.quantityInStock === 0;
              const isAddedToCart = cart.some(item => item.productId === product.productId);

              return (
                <div
  key={product.productId}
  className={`product-cards ${isOutOfStock ? 'out-of-stock' : ''}`}
  title={isOutOfStock ? 'Out of Stock' : ''}
  style={{
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    cursor: 'pointer',
    width: '250px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  }}
>
  {/* Out of Stock Message */}
  {isOutOfStock && (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 0, 0, 0.9)', // Solid red background
        color: '#fff', // White text
        padding: '8px 16px',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '600',
        zIndex: 2,
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      Out of Stock
    </div>
  )}

  {/* Product Image */}
  <img
    src={imageUrl}
    alt={product.title}
    loading="lazy"
    style={{
      width: '100%',
      height: '200px',
      objectFit: 'contain',
      borderRadius: '8px',
      opacity: isOutOfStock ? '0.6' : '1', // Reduce opacity if out of stock
    }}
  />

  {/* Product Title */}
  <h3 style={{ fontSize: '18px', marginTop: '10px', color: '#333' }}>{product.title}</h3>

  {/* Product Price */}
  <p style={{ fontSize: '16px', color: '#888' }}>₹{product.price.toFixed(2)}</p>

  {/* Add to Cart Button */}
  <button
    id={product.productId}
    onClick={() => handleAddToCart(product)}
    disabled={isAddedToCart || isOutOfStock}
    style={{
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      backgroundColor: isAddedToCart ? '#28a745' : isOutOfStock ? '#ccc' : '#812093', // Gray if out of stock
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: isAddedToCart || isOutOfStock ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.3s ease',
    }}
  >
    {isAddedToCart ? '✔ Added' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
  </button>
</div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;