// import React from 'react';
// import { Carousel } from 'react-bootstrap';
// import { Modal, Button } from "react-bootstrap";
// import ProductCard from '../CardsComponents/ProductCard';
// import ReviewCard from '../CardsComponents/ReviewCard';
// import ServiceCard from '../CardsComponents/ServiceCard';
// import '../UserComponents/css/Home.css'; // Ensure your custom styles are imported'
// // Import assets
// import commonimage from '../../shared/constant/constantimage';

// const Home = () => (
  
//   <div
//   style={{ 
//     minHeight: '100vh', 
//     background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', // Light gradient background
//      // Add padding for content spacing
//   }}>
    
  
//     {/* Carousel Section */}
//     <Carousel 
//       className="custom-carousel" 
//       interval={3000} // Adjust interval for smoother transitions
//       style={{ 
//         height: '650px', 
//         overflow: 'hidden', 
//         position: 'relative', 
//       }}
//     >
//       {[
//         { 
//           image: commonimage.home, 
//           title: 'Welcome To Freshio Store', 
//           description: 'Freshio Organic Store offers a wide range of fresh, farm-to-table organic products, ensuring quality, sustainability, and healthy living.' 
//         },
//         { 
//           image: commonimage.Fruit, 
//           title: 'Fresh Fruits', 
//           description: 'Handpicked fresh fruits from the farm.' 
//         },
//         { 
//           image: commonimage.Vegetables, 
//           title: 'Healthy Vegetables', 
//           description: 'Fresh and nutritious vegetables for your health.' 
//         },
//       ].map((item, index) => (
//         <Carousel.Item key={index} style={{ height: '650px' }}>
//           <img 
//             src={item.image} 
//             alt={`carousel-item-${index}`} 
//             className="d-block w-100" 
//             style={{ 
//               height: '100%', 
//               objectFit: 'cover', // Ensure the image covers the entire area
//               filter: 'brightness(0.7)', // Darken the image for better text visibility
//             }} 
//           />
//           <div 
//             className="carousel-caption d-flex flex-column justify-content-center align-items-center" 
//             style={{ 
//               position: 'absolute', 
//               top: '50%', 
//               left: '50%', 
//               transform: 'translate(-50%, -50%)', 
//               textAlign: 'center', 
//               color: 'white', 
//               width: '80%', 
//               maxWidth: '800px', 
//             }}
//           >
//             <h3 style={{ 
//               fontSize: '3rem', 
//               fontWeight: '700', 
//               textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)', 
//               marginBottom: '20px', 
//             }}>
//               {item.title}
//             </h3>
//             <p style={{ 
//               fontSize: '1.2rem', 
//               textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)', 
//               lineHeight: '1.6', 
//             }}>
//               {item.description}
//             </p>
//           </div>
//         </Carousel.Item>
//       ))}
//     </Carousel>


//     {/* Services Section */}
//     <div className="container my-5" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
//   <h2 className="text-center fw-bold text-dark" style={{ 
//     fontSize: '36px', 
//     marginBottom: '30px', 
//     fontFamily: 'Arial, sans-serif',
//     background: 'linear-gradient(135deg, #812093, #d8bfd8)', // Gradient for the heading
//     WebkitBackgroundClip: 'text', // Clip text to the background
//     WebkitTextFillColor: 'transparent', // Make text transparent
//     letterSpacing: '2px', // Add spacing for better readability
//   }}>
//     Our Services
//   </h2>

//   <div className="service-container" 
//        style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(8, 1fr)', 
//         gap: '60px',
//         overflow: 'hidden',
//         // animation: 'moveContainer 40s linear infinite',
//       }}>

//     {[ 
//       { title: 'Farm Fresh', description: 'Locally sourced, fresh produce', icon: '🌾', color: '#4CAF50' },
//       { title: 'Eco-Friendly Packaging', description: 'Sustainable and biodegradable materials', icon: '📦🌿', color: '#8BC34A' },
//       { title: 'Vegan Products', description: '100% plant-based and cruelty-free items', icon: '🌱', color: '#009688' },
//       { title: 'Seasonal Picks', description: 'Fresh, seasonal organic items', icon: '🍎', color: '#FF9800' },
//       { title: 'Non-GMO', description: 'No genetically modified ingredients', icon: '🌽', color: '#FFC107' },
//       { title: 'Fair Trade', description: 'Ethically sourced goods for a better world', icon: '🤝', color: '#795548' },
//       { title: 'Herbal Wellness', description: 'Organic herbs for health and beauty', icon: '🌿💧', color: '#673AB7' },
//       { title: 'Zero Waste', description: 'Sustainable shopping with minimal waste', icon: '♻️', color: '#2196F3' }
//     ].map((item, index) => (
//       <div key={index} style={{ 
//         gridColumn: 'span 2',
//         backgroundColor: '#fff', 
//         marginBottom: '30px', 
//         borderRadius: '12px', 
//         padding: '25px',
//         boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', 
//         textAlign: 'center', 
//         transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
//         cursor: 'pointer',
//         border: `2px solid ${item.color}`, // Add a border with the item's color
//       }} 
           
//       >
//         <div style={{ 
//           fontSize: '50px', 
//           marginBottom: '20px',
//           transition: 'transform 0.3s ease', 
//           color: item.color, // Set icon color to match the item's theme
//         }}>
//           {item.icon}
//         </div>
//         <h4 style={{ 
//           fontSize: '22px', 
//           fontWeight: '600', 
//           color: '#333', 
//           marginBottom: '10px',
//           fontFamily: 'Arial, sans-serif',
//           letterSpacing: '1px', 
//         }}>
//           {item.title}
//         </h4>
//         <p style={{ 
//           fontSize: '16px', 
//           color: '#777', 
//           marginTop: '10px', 
//           lineHeight: '1.6', 
//           fontFamily: 'Verdana, sans-serif',
//         }}>
//           {item.description}
//         </p>
//       </div>
//     ))}

//   </div>

//   <style>
//     {`
//       @keyframes moveContainer {
//         0% { transform: translateX(100%); }
//         100% { transform: translateX(-100%); }
//       }

//       /* Media Queries for Responsiveness */
//       @media (max-width: 1200px) {
//         .service-container {
//           grid-template-columns: repeat(4, 1fr);
//         }
//       }

//       @media (max-width: 768px) {
//         .service-container {
//           grid-template-columns: repeat(2, 1fr);
//         }
//       }

//       @media (max-width: 480px) {
//         .service-container {
//           grid-template-columns: 1fr;
//         }
//       }

//       /* Adding a subtle animation to icons */
//       .service-container div:hover div {
//         transform: rotate(15deg);
//       }
//     `}
//   </style>
// </div>


//     {/* Best Selling Products Section */}
//     <div className="container my-5" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
//   <h2 className="text-center mb-4" style={{ 
//     fontWeight: 'bold', 
//     color: '#333', 
//     fontSize: '36px',
//     background: 'linear-gradient(135deg, #812093, #d8bfd8)', // Gradient for the heading
//     WebkitBackgroundClip: 'text', // Clip text to the background
//     WebkitTextFillColor: 'transparent', // Make text transparent
//     letterSpacing: '2px', // Add spacing for better readability
//   }}>
//     Top Selling Products
//   </h2>
  
//   <div className="row d-flex justify-content-evenly mt-5" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
//     {[ 
//       { image: commonimage.milk, title: 'Milk', color: '#4CAF50' },
//       { image: commonimage.Apple, title: 'Apple', color: '#FF9800' },
//       { image: commonimage.Strawberry, title: 'Strawberry', color: '#E91E63' },
//       { image: commonimage.Potato, title: 'Potato', color: '#795548' },
//       { image: commonimage.Onion, title: 'Onion', color: '#9C27B0' },
//       { image: commonimage.Egg, title: 'Egg', color: '#FFC107' }
//     ].map((item, index) => (
//       <div key={index} style={{ 
//         animation: `fadeInUp 0.6s ease-out ${index * 0.3}s`, 
//         width: 'calc(33.33% - 20px)', 
//         minWidth: '250px', 
//         maxWidth: '300px',
//       }}>
//         <div className="product-card" style={{ 
//           backgroundColor: '#fff', 
//           borderRadius: '12px', 
//           boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', 
//           overflow: 'hidden', 
//           transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
//           textAlign: 'center', 
//           padding: '0px',
//           cursor: 'pointer',
//           border: `2px solid ${item.color}`, // Add a border with the item's color
//         }} 
//         onMouseEnter={(e) => {
//           e.currentTarget.style.transform = 'scale(1.05)';
//           e.currentTarget.style.boxShadow = `0 12px 24px ${item.color}40`; // Hover shadow with item's color
//         }} 
//         onMouseLeave={(e) => {
//           e.currentTarget.style.transform = 'scale(1)';
//           e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
//         }}
//         >
//           <img 
//             src={item.image} 
//             alt={item.title} 
//             style={{ 
//               width: '100%', 
//               height: '200px', 
//               objectFit: 'contain', 
//               marginBottom: '15px',
//               padding: '10px', // Add padding to the image
//             }} 
//           />
//           <h5 style={{ 
//             fontWeight: '600', 
//             fontSize: '20px', 
//             color: '#333', 
//             marginBottom: '15px',
//             fontFamily: 'Arial, sans-serif',
//             letterSpacing: '1px', // Add spacing for better readability
//           }}>
//             {item.title}
//           </h5>
//         </div>
//       </div>
//     ))}
//   </div>

//   <style>
//     {`
//       @keyframes fadeInUp {
//         0% {
//           opacity: 0;
//           transform: translateY(20px);
//         }
//         100% {
//           opacity: 1;
//           transform: translateY(0);
//         }
//       }

//       .product-card {
//         transition: transform 0.3s ease, box-shadow 0.3s ease;
//       }
//       .product-card:hover {
//         transform: scale(1.05); /* Slight zoom on hover */
//         box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
//       }
//     `}
//   </style>
// </div>


//     {/* Customer Reviews Section */}
//     <div className="container my-5" style={{ 
//   position: 'relative', 
//   padding: '40px 20px', 
//   borderRadius: '15px', 
//   background: 'linear-gradient(135deg, #E6E6FA, #D8BFD8)', // Gradient background
//   boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Add shadow to the container
// }}>
//   <h2 className="text-center fw-bold mb-4" style={{ 
//     fontSize: '36px', 
//     color: '#333', 
//     background: 'linear-gradient(135deg, #812093, #d8bfd8)', // Gradient for the heading
//     WebkitBackgroundClip: 'text', // Clip text to the background
//     WebkitTextFillColor: 'transparent', // Make text transparent
//     letterSpacing: '2px', // Add spacing for better readability
//   }}>
//     Customer Reviews
//   </h2>
//   <div className="row" style={{ gap: '20px', justifyContent: 'center' }}>
//     {[ 
//       { 
//         image: commonimage.person1, 
//         name: 'John Doe', 
//         review: 'The organic dairy products are amazing! Fresh and tasty.', 
//         rating: 4, 
//         date: '2023-10-15' 
//       },
//       { 
//         image: commonimage.person2, 
//         name: 'Jane Smith', 
//         review: 'Handpicked organic vegetables are just top quality.', 
//         rating: 4, 
//         date: '2023-10-10' 
//       },
//       { 
//         image: commonimage.person3, 
//         name: 'Mark Johnson', 
//         review: 'Delicious and fresh organic fruits. Perfect for healthy eating!', 
//         rating: 5, 
//         date: '2023-10-05' 
//       }
//     ].map((item, index) => (
//       <div key={index} className="col-md-4" style={{ 
//         animation: `zoomIn 0.6s ease-out ${index * 0.3}s`, 
//         minWidth: '300px', 
//         maxWidth: '350px',
//       }}>
//         <div className="review-card" style={{ 
//           backgroundColor: '#fff', 
//           borderRadius: '15px', 
//           boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', 
//           overflow: 'hidden', 
//           transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
//           textAlign: 'center', 
//           padding: '20px',
//           cursor: 'pointer',
//         }} 
//         onMouseEnter={(e) => {
//           e.currentTarget.style.transform = 'translateY(-10px)';
//           e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
//         }} 
//         onMouseLeave={(e) => {
//           e.currentTarget.style.transform = 'translateY(0)';
//           e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
//         }}
//         >
//           <img 
//             src={item.image} 
//             alt={item.name} 
//             style={{ 
//               width: '100px', 
//               height: '100px', 
//               borderRadius: '50%', 
//               objectFit: 'cover', 
//               marginBottom: '15px',
//               border: '3px solid #812093', // Add a border to the image
//             }} 
//           />
//           <h5 style={{ 
//             fontWeight: '600', 
//             fontSize: '20px', 
//             color: '#333', 
//             marginBottom: '10px',
//             fontFamily: 'Arial, sans-serif',
//           }}>
//             {item.name}
//           </h5>
//           <div style={{ 
//             display: 'flex', 
//             justifyContent: 'center', 
//             gap: '5px', 
//             marginBottom: '10px',
//           }}>
//             {Array.from({ length: 5 }, (_, i) => (
//               <span key={i} style={{ 
//                 color: i < item.rating ? '#FFD700' : '#ccc', // Gold for filled stars, gray for empty
//                 fontSize: '20px',
//               }}>
//                 ★
//               </span>
//             ))}
//           </div>
//           <p style={{ 
//             fontSize: '16px', 
//             color: '#555', 
//             marginBottom: '10px', 
//             lineHeight: '1.6', 
//             fontFamily: 'Verdana, sans-serif',
//           }}>
//             {item.review}
//           </p>
//           <p style={{ 
//             fontSize: '14px', 
//             color: '#777', 
//             fontStyle: 'italic', 
//             marginBottom: '0',
//           }}>
//             Reviewed on: {new Date(item.date).toLocaleDateString()}
//           </p>
//         </div>
//       </div>
//     ))}
//   </div>

//   <style>
//     {`
//       @keyframes zoomIn {
//         0% {
//           transform: scale(0.5);
//           opacity: 0;
//         }
//         100% {
//           transform: scale(1);
//           opacity: 1;
//         }
//       }

//       .review-card {
//         transition: transform 0.3s ease, box-shadow 0.3s ease;
//       }
//       .review-card:hover {
//         transform: translateY(-10px); /* Lift the card on hover */
//         box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
//       }
//     `}
//   </style>
// </div>


//     {/* Brands Section */}
//     <div className="container my-5" style={{ 
//   padding: '40px 20px', 
//   borderRadius: '15px', 
//   background: 'linear-gradient(135deg, #E6E6FA, #D8BFD8)', // Gradient background
//   boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Add shadow to the container
// }}>
//   <h2 className="text-center fw-bold mb-5" style={{ 
//     fontSize: '36px', 
//     color: '#333', 
//     background: 'linear-gradient(135deg, #812093, #d8bfd8)', // Gradient for the heading
//     WebkitBackgroundClip: 'text', // Clip text to the background
//     WebkitTextFillColor: 'transparent', // Make text transparent
//     letterSpacing: '2px', // Add spacing for better readability
//     textTransform: 'uppercase', // Uppercase text
//   }}>
//     Our Brands
//   </h2>
//   <div className="row justify-content-center align-items-center" style={{ 
//     display: 'flex', 
//     flexWrap: 'nowrap', // Ensure all images stay in a single line
//     gap: '20px', // Add spacing between images
//     overflowX: 'auto', // Enable horizontal scrolling for smaller screens
//     padding: '10px 0', // Add padding for better spacing
//   }}>
//     {[commonimage.brand1, commonimage.brand2, commonimage.brand3, commonimage.brand4].map((brand, index) => (
//       <div key={index} className="brand-card" style={{ 
//         flex: '0 0 auto', // Prevent flex items from shrinking or growing
//         width: '200px', // Fixed width for all brand cards
//         height: '150px', // Fixed height for all brand cards
//         backgroundColor: '#fff', 
//         borderRadius: '15px', 
//         boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', 
//         overflow: 'hidden', 
//         transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
//         padding: '10px',
//         cursor: 'pointer',
//         border: '2px solid #812093', // Add a border for a polished look
//       }} 
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = 'scale(1.05)';
//         e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
//       }} 
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = 'scale(1)';
//         e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
//       }}
//       >
//         <img 
//           src={brand} 
//           alt={`Brand ${index + 1}`} 
//           style={{ 
//             width: '100%', 
//             height: '100%', 
//             objectFit: 'contain', // Ensure the image fits within the container
//             borderRadius: '10px', // Add rounded corners to the image
//           }} 
//         />
//       </div>
//     ))}
//   </div>
// </div>



//   </div>
// );

// export default Home;


import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Modal, Button } from "react-bootstrap";
import ProductCard from '../CardsComponents/ProductCard';
import ReviewCard from '../CardsComponents/ReviewCard';
import ServiceCard from '../CardsComponents/ServiceCard';
import '../UserComponents/css/Home.css'; // Ensure your custom styles are imported'
// Import assets
import commonimage from '../../shared/constant/constantimage';

const Home = () => (
  <div
    style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', // Light gradient background
    }}
  >
    {/* Carousel Section */}
    <Carousel
      className="custom-carousel"
      interval={3000} // Adjust interval for smoother transitions
      style={{
        height: '650px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {[
        {
          image: commonimage.home,
          title: 'Welcome To Freshio Store',
          description:
            'Freshio Organic Store offers a wide range of fresh, farm-to-table organic products, ensuring quality, sustainability, and healthy living.',
        },
        {
          image: commonimage.Fruit,
          title: 'Fresh Fruits',
          description: 'Handpicked fresh fruits from the farm.',
        },
        {
          image: commonimage.Vegetables,
          title: 'Healthy Vegetables',
          description: 'Fresh and nutritious vegetables for your health.',
        },
      ].map((item, index) => (
        <Carousel.Item key={index} style={{ height: '650px' }}>
          <img
            src={item.image}
            alt={`carousel-item-${index}`}
            className="d-block w-100"
            style={{
              height: '100%',
              objectFit: 'cover', // Ensure the image covers the entire area
              filter: 'brightness(0.7)', // Darken the image for better text visibility
            }}
          />
          <div
            className="carousel-caption d-flex flex-column justify-content-center align-items-center"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'white',
              width: '80%',
              maxWidth: '800px',
            }}
          >
            <h3
              style={{
                fontSize: '3rem',
                fontWeight: '700',
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
                marginBottom: '20px',
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: '1.2rem',
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
                lineHeight: '1.6',
              }}
            >
              {item.description}
            </p>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>

    {/* Services Section */}
    <div className="container my-5" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
      <h2
        className="text-center fw-bold text-dark"
        style={{
          fontSize: '36px',
          marginBottom: '30px',
          fontFamily: 'Arial, sans-serif',
          background: 'linear-gradient(135deg, #812093, #d8bfd8)', // Gradient for the heading
          WebkitBackgroundClip: 'text', // Clip text to the background
          WebkitTextFillColor: 'transparent', // Make text transparent
          letterSpacing: '2px', // Add spacing for better readability
        }}
      >
        Our Services
      </h2>

      <div
        className="service-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Responsive grid
          gap: '20px',
          padding: '20px',
        }}
      >
        {[
          { title: 'Farm Fresh', description: 'Locally sourced, fresh produce', icon: '🌾', color: '#4CAF50' },
          { title: 'Eco-Friendly Packaging', description: 'Sustainable and biodegradable materials', icon: '📦🌿', color: '#8BC34A' },
          { title: 'Vegan Products', description: '100% plant-based and cruelty-free items', icon: '🌱', color: '#009688' },
          { title: 'Seasonal Picks', description: 'Fresh, seasonal organic items', icon: '🍎', color: '#FF9800' },
          { title: 'Non-GMO', description: 'No genetically modified ingredients', icon: '🌽', color: '#FFC107' },
          { title: 'Fair Trade', description: 'Ethically sourced goods for a better world', icon: '🤝', color: '#795548' },
          { title: 'Herbal Wellness', description: 'Organic herbs for health and beauty', icon: '🌿💧', color: '#673AB7' },
          { title: 'Zero Waste', description: 'Sustainable shopping with minimal waste', icon: '♻️', color: '#2196F3' },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              border: `2px solid ${item.color}`,
            }}
          >
            <div
              style={{
                fontSize: '50px',
                marginBottom: '20px',
                transition: 'transform 0.3s ease',
                color: item.color,
              }}
            >
              {item.icon}
            </div>
            <h4
              style={{
                fontSize: '22px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '10px',
                fontFamily: 'Arial, sans-serif',
                letterSpacing: '1px',
              }}
            >
              {item.title}
            </h4>
            <p
              style={{
                fontSize: '16px',
                color: '#777',
                marginTop: '10px',
                lineHeight: '1.6',
                fontFamily: 'Verdana, sans-serif',
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Best Selling Products Section */}
    <div className="container my-5" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
      <h2
        className="text-center mb-4"
        style={{
          fontWeight: 'bold',
          color: '#333',
          fontSize: '36px',
          background: 'linear-gradient(135deg, #812093, #d8bfd8)', // Gradient for the heading
          WebkitBackgroundClip: 'text', // Clip text to the background
          WebkitTextFillColor: 'transparent', // Make text transparent
          letterSpacing: '2px', // Add spacing for better readability
        }}
      >
        Top Selling Products
      </h2>

      <div className="row d-flex justify-content-evenly mt-5" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        {[
          { image: commonimage.milk, title: 'Milk', color: '#4CAF50' },
          { image: commonimage.Apple, title: 'Apple', color: '#FF9800' },
          { image: commonimage.Strawberry, title: 'Strawberry', color: '#E91E63' },
          { image: commonimage.Potato, title: 'Potato', color: '#795548' },
          { image: commonimage.Onion, title: 'Onion', color: '#9C27B0' },
          { image: commonimage.Egg, title: 'Egg', color: '#FFC107' },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.3}s`,
              width: 'calc(33.33% - 20px)',
              minWidth: '250px',
              maxWidth: '300px',
            }}
          >
            <div
              className="product-card"
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                textAlign: 'center',
                padding: '0px',
                cursor: 'pointer',
                border: `2px solid ${item.color}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = `0 12px 24px ${item.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'contain',
                  marginBottom: '15px',
                  padding: '10px',
                }}
              />
              <h5
                style={{
                  fontWeight: '600',
                  fontSize: '20px',
                  color: '#333',
                  marginBottom: '15px',
                  fontFamily: 'Arial, sans-serif',
                  letterSpacing: '1px',
                }}
              >
                {item.title}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Customer Reviews Section */}
    <div
      className="container my-5"
      style={{
        position: 'relative',
        padding: '40px 20px',
        borderRadius: '15px',
        background: 'linear-gradient(135deg, #E6E6FA, #D8BFD8)', // Gradient background
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Add shadow to the container
      }}
    >
      <h2
        className="text-center fw-bold mb-4"
        style={{
          fontSize: '36px',
          color: '#333',
          background: 'linear-gradient(135deg, #812093, #d8bfd8)', // Gradient for the heading
          WebkitBackgroundClip: 'text', // Clip text to the background
          WebkitTextFillColor: 'transparent', // Make text transparent
          letterSpacing: '2px', // Add spacing for better readability
        }}
      >
        Customer Reviews
      </h2>
      <div className="row" style={{ gap: '20px', justifyContent: 'center' }}>
        {[
          {
            image: commonimage.person1,
            name: 'John Doe',
            review: 'The organic dairy products are amazing! Fresh and tasty.',
            rating: 4,
            date: '2023-10-15',
          },
          {
            image: commonimage.person2,
            name: 'Jane Smith',
            review: 'Handpicked organic vegetables are just top quality.',
            rating: 4,
            date: '2023-10-10',
          },
          {
            image: commonimage.person3,
            name: 'Mark Johnson',
            review: 'Delicious and fresh organic fruits. Perfect for healthy eating!',
            rating: 5,
            date: '2023-10-05',
          },
        ].map((item, index) => (
          <div
            key={index}
            className="col-md-4"
            style={{
              animation: `zoomIn 0.6s ease-out ${index * 0.3}s`,
              minWidth: '300px',
              maxWidth: '350px',
            }}
          >
            <div
              className="review-card"
              style={{
                backgroundColor: '#fff',
                borderRadius: '15px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                textAlign: 'center',
                padding: '20px',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '15px',
                  border: '3px solid #812093',
                }}
              />
              <h5
                style={{
                  fontWeight: '600',
                  fontSize: '20px',
                  color: '#333',
                  marginBottom: '10px',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                {item.name}
              </h5>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '5px',
                  marginBottom: '10px',
                }}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    style={{
                      color: i < item.rating ? '#FFD700' : '#ccc',
                      fontSize: '20px',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p
                style={{
                  fontSize: '16px',
                  color: '#555',
                  marginBottom: '10px',
                  lineHeight: '1.6',
                  fontFamily: 'Verdana, sans-serif',
                }}
              >
                {item.review}
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: '#777',
                  fontStyle: 'italic',
                  marginBottom: '0',
                }}
              >
                Reviewed on: {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Brands Section */}
    <div
      className="container my-5"
      style={{
        padding: '40px 20px',
        borderRadius: '15px',
        background: 'linear-gradient(135deg, #E6E6FA, #D8BFD8)', // Gradient background
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Add shadow to the container
      }}
    >
      <h2
        className="text-center fw-bold mb-5"
        style={{
          fontSize: '36px',
          color: '#333',
          background: 'linear-gradient(135deg, #812093, #d8bfd8)', // Gradient for the heading
          WebkitBackgroundClip: 'text', // Clip text to the background
          WebkitTextFillColor: 'transparent', // Make text transparent
          letterSpacing: '2px', // Add spacing for better readability
          textTransform: 'uppercase', // Uppercase text
        }}
      >
        Our Brands
      </h2>
      <div
        className="row justify-content-center align-items-center"
        style={{
          display: 'flex',
          flexWrap: 'wrap', // Allow wrapping for smaller screens
          gap: '20px',
          padding: '10px 0',
        }}
      >
        {[commonimage.brand1, commonimage.brand2, commonimage.brand3, commonimage.brand4].map((brand, index) => (
          <div
            key={index}
            className="brand-card"
            style={{
              flex: '1 1 200px', // Allow flexible sizing
              maxWidth: '200px',
              height: '150px',
              backgroundColor: '#fff',
              borderRadius: '15px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              padding: '10px',
              cursor: 'pointer',
              border: '2px solid #812093',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
            }}
          >
            <img 
          src={brand} 
          alt={`Brand ${index + 1}`} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain', // Ensure the image fits within the container
            borderRadius: '10px', // Add rounded corners to the image
          }} 
        />
      </div>
    ))}
  </div>
</div>



  </div>
);

export default Home;
