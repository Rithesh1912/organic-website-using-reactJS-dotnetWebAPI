// import React from 'react';

// const ServiceCard = ({ icon, title, description }) => {
//   return (
//     <div className="col-md-3 mb-4">
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between', // Aligns items within the container
//           padding: '20px',
//           backgroundColor: '#333',
//           borderRadius: '10px',
//           boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
//           textAlign: 'center',
//           height: '100%', // Allow the box to fill up the column's height
//           minHeight: '150px', // Set a minimum height
//           overflow: 'hidden', // Prevent content overflow
//         }}
//       >
//         <div style={{ fontSize: '30px', marginBottom: '15px', color: '#fff' }}>{icon}</div>
//         <h5 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: '0' }}>{title}</h5>
//         <p style={{ fontSize: '14px', color: '#ccc', margin: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ServiceCard;


import React from 'react';
import './cards.css';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="col-md-3 mb-4">
      <div className="service-card">
        <div className="service-icon">{icon}</div>
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
