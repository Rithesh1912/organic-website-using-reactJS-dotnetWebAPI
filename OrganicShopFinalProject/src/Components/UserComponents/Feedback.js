// import React, { useState } from 'react';

// const Feedback = () => {
//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     contact: '',
//     comments: '',
//     rating: 0,
//     attachment: null,
//   });

//   const [errors, setErrors] = useState({
//     firstname: '',
//     lastname: '',
//     contact: '',
//   });

//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');

//   const validateName = (name) => {
//     const regex = /^[A-Za-z]+(?: [A-Za-z]+)*$/; // Allows single spaces between words
//     return regex.test(name);
//   };

//   const validatePhone = (phone) => {
//     const regex = /^\d{10}$/; // Exactly 10 digits
//     return regex.test(phone);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Validate input on the fly
//     if (name === 'firstname' || name === 'lastname') {
//       if (!validateName(value)) {
//         setErrors({ ...errors, [name]: 'Invalid name format. No numbers or consecutive spaces allowed.' });
//       } else {
//         setErrors({ ...errors, [name]: '' });
//       }
//     } else if (name === 'contact') {
//       if (!validatePhone(value)) {
//         setErrors({ ...errors, [name]: 'Phone number must be exactly 10 digits.' });
//       } else {
//         setErrors({ ...errors, [name]: '' });
//       }
//     }
//   };

//   const handleRatingChange = (rating) => {
//     setFormData({ ...formData, rating });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, attachment: e.target.files[0] });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Final validation before submission
//     let isValid = true;
//     const newErrors = { ...errors };

//     if (!validateName(formData.firstname)) {
//       newErrors.firstname = 'Invalid first name format. No numbers or consecutive spaces allowed.';
//       isValid = false;
//     }

//     if (!validateName(formData.lastname)) {
//       newErrors.lastname = 'Invalid last name format. No numbers or consecutive spaces allowed.';
//       isValid = false;
//     }

//     if (!validatePhone(formData.contact)) {
//       newErrors.contact = 'Phone number must be exactly 10 digits.';
//       isValid = false;
//     }

//     setErrors(newErrors);

//     if (isValid) {
//       // Submit the form or perform further actions
//       console.log('Form submitted successfully:', formData);
//       setModalMessage('✅ Feedback Submitted Successfully!');
//       setModalVisible(true);

//       // Clear the form data
//       setFormData({
//         firstname: '',
//         lastname: '',
//         contact: '',
//         comments: '',
//         rating: 0,
//         attachment: null,
//       });
//     } else {
//       console.log('Form validation failed.');
//     }
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   // Styles
//   const containerStyle = {
//     width: '50%',
//     margin: '5px auto',
//     fontFamily: "'Roboto', sans-serif",
//     backgroundColor: '#fff',
//     padding: '30px',
//     borderRadius: '12px',
//     boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//   };

//   const rowStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     gap: '20px',
//   };

//   const colHalfStyle = {
//     width: '48%',
//   };

//   const formGroupStyle = {
//     marginBottom: '20px',
//   };

//   const labelStyle = {
//     display: 'block',
//     marginBottom: '8px',
//     fontWeight: 'bold',
//     color: '#333',
//     fontSize: '16px',
//     letterSpacing: '0.5px',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '14px',
//     fontSize: '16px',
//     border: '1px solid #ccc',
//     borderRadius: '8px',
//     transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
//     fontFamily: "'Roboto', sans-serif",
//     paddingLeft: '40px',
//   };

//   const buttonStyle = {
//     width: '100%',
//     backgroundColor: '#812093',
//     color: 'white',
//     border: 'none',
//     cursor: 'pointer',
//     padding: '14px',
//     fontSize: '16px',
//     borderRadius: '8px',
//     transition: 'background-color 0.3s ease, transform 0.2s ease',
//     fontFamily: "'Roboto', sans-serif",
//   };

//   const buttonHoverStyle = {
//     backgroundColor: '#6b1a7a',
//     transform: 'scale(1.05)',
//   };

//   const ratingStyle = {
//     display: 'flex',
//     gap: '10px',
//     marginBottom: '20px',
//   };

//   const starStyle = {
//     fontSize: '24px',
//     color: '#ccc',
//     cursor: 'pointer',
//     transition: 'color 0.3s ease',
//   };

//   const activeStarStyle = {
//     color: '#ffd700', // Gold color for selected stars
//   };

//   return (
//     <div
//       style={{
//         marginTop: '30px',
//         marginBottom: '30px',
//         padding: '1px',
//       }}
//     >
//       <div style={containerStyle}>
//         <h2 style={{ textAlign: 'center', color: '#812093', marginBottom: '20px', fontSize: '28px', fontWeight: 'bold' }}>
//           FEEDBACK FORM
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <div style={rowStyle}>
//             <div style={colHalfStyle}>
//               <div style={formGroupStyle}>
//                 <label style={labelStyle} htmlFor="firstname">
//                   First Name:
//                 </label>
//                 <div style={{ position: 'relative' }}>
//                   <i className="fas fa-user" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#777' }}></i>
//                   <input
//                     style={inputStyle}
//                     type="text"
//                     id="firstname"
//                     name="firstname"
//                     placeholder="Enter your first name"
//                     value={formData.firstname}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 {errors.firstname && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.firstname}</p>}
//               </div>
//             </div>
//             <div style={colHalfStyle}>
//               <div style={formGroupStyle}>
//                 <label style={labelStyle} htmlFor="lastname">
//                   Last Name:
//                 </label>
//                 <div style={{ position: 'relative' }}>
//                   <i className="fas fa-user" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#777' }}></i>
//                   <input
//                     style={inputStyle}
//                     type="text"
//                     id="lastname"
//                     name="lastname"
//                     placeholder="Enter your last name"
//                     value={formData.lastname}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 {errors.lastname && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.lastname}</p>}
//               </div>
//             </div>
//           </div>

//           <div style={formGroupStyle}>
//             <label style={labelStyle} htmlFor="contact">
//               Contact Number:
//             </label>
//             <div style={{ position: 'relative' }}>
//               <i className="fas fa-phone" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#777' }}></i>
//               <input
//                 style={inputStyle}
//                 type="tel"
//                 id="contact"
//                 name="contact"
//                 placeholder="Enter your contact number"
//                 value={formData.contact}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             {errors.contact && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{errors.contact}</p>}
//           </div>

//           {/* Rating System */}
//           <div style={formGroupStyle}>
//             <label style={labelStyle}>Rating:</label>
//             <div style={ratingStyle}>
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <span
//                   key={star}
//                   style={{
//                     ...starStyle,
//                     ...(formData.rating >= star ? activeStarStyle : {}),
//                   }}
//                   onClick={() => handleRatingChange(star)}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* File Upload */}
//           <div style={formGroupStyle}>
//             <label style={labelStyle} htmlFor="attachment">
//               Attach File (Optional):
//             </label>
//             <input
//               type="file"
//               id="attachment"
//               name="attachment"
//               onChange={handleFileChange}
//               style={{ width: '100%', padding: '10px', fontSize: '16px' }}
//             />
//           </div>

//           <div style={formGroupStyle}>
//             <label style={labelStyle} htmlFor="comments">
//               Comments:
//             </label>
//             <div style={{ position: 'relative' }}>
//               <textarea
//                 style={{ ...inputStyle, height: '120px', resize: 'vertical' }}
//                 id="comments"
//                 name="comments"
//                 placeholder="Write your comments here"
//                 value={formData.comments}
//                 onChange={handleInputChange}
//                 required
//               ></textarea>
//             </div>
//           </div>

//           <div style={formGroupStyle}>
//             <button
//               type="submit"
//               style={buttonStyle}
//               onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
//               onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
//             >
//               Submit
//             </button>
//           </div>
//         </form>

//         {/* Confirmation Modal */}
//         {modalVisible && (
//           <div
//             style={{
//               position: 'fixed',
//               top: 0,
//               left: 0,
//               width: '100%',
//               height: '100%',
//               backgroundColor: 'rgba(0, 0, 0, 0.5)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               zIndex: 1000,
//             }}
//           >
//             <div
//               style={{
//                 backgroundColor: '#fff',
//                 padding: '20px',
//                 borderRadius: '10px',
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
//                 textAlign: 'center',
//                 animation: 'fadeIn 0.3s ease',
//               }}
//             >
//               <h3 style={{ color: '#812093', marginBottom: '10px' }}>Success!</h3>
//               <p>{modalMessage}</p>
//               <button
//                 onClick={closeModal}
//                 style={{
//                   padding: '10px 20px',
//                   backgroundColor: '#812093',
//                   color: '#fff',
//                   border: 'none',
//                   borderRadius: '5px',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.3s ease',
//                 }}
//                 onMouseOver={(e) => (e.target.style.backgroundColor = '#6b1a7a')}
//                 onMouseOut={(e) => (e.target.style.backgroundColor = '#812093')}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Office Location Section */}
//         <div>
//           <h2 style={{ textAlign: 'center', color: '#812093', marginBottom: '20px', fontSize: '28px', fontWeight: 'bold' }}>OUR OFFICE</h2>
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.2556350554073!2d80.21724077507399!3d12.82675068747546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525a688f3d32f1%3A0x769131751ee5a50e!2sChangepond%20Technologies!5e0!3m2!1sen!2sin!4v1739183175927!5m2!1sen!2sin"
//             width="100%"
//             height="450"
//             frameBorder="0"
//             style={{ border: 0 }}
//             allowFullScreen=""
//             loading="lazy"
//           ></iframe>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Feedback;

import React, { useState } from 'react';

const Feedback = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    contact: '',
    comments: '',
    rating: 0,
    attachment: null,
  });

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    contact: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const validateName = (name) => {
    const regex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    return regex.test(name);
  };

  const validatePhone = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'firstname' || name === 'lastname') {
      setErrors({
        ...errors,
        [name]: validateName(value) ? '' : 'Invalid name format. No numbers or consecutive spaces allowed.',
      });
    } else if (name === 'contact') {
      setErrors({
        ...errors,
        [name]: validatePhone(value) ? '' : 'Phone number must be exactly 10 digits.',
      });
    }
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      firstname: validateName(formData.firstname) ? '' : 'Invalid first name format. No numbers or consecutive spaces allowed.',
      lastname: validateName(formData.lastname) ? '' : 'Invalid last name format. No numbers or consecutive spaces allowed.',
      contact: validatePhone(formData.contact) ? '' : 'Phone number must be exactly 10 digits.',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === '')) {
      console.log('Form submitted successfully:', formData);
      setModalMessage('✅ Feedback Submitted Successfully!');
      setModalVisible(true);

      setFormData({
        firstname: '',
        lastname: '',
        contact: '',
        comments: '',
        rating: 0,
        attachment: null,
      });
      setErrors({firstname:'', lastname:'', contact:''}) // clear error messages
    } else {
      console.log('Form validation failed.');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const buttonStyle = {
    width: '100%',
         backgroundColor: '#812093',
         color: 'white',
         border: 'none',
    cursor: 'pointer',
        padding: '14px',
        fontSize: '16px',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        fontFamily: "'Roboto', sans-serif",
      };

  return (
    <div className="container mt-3 mb-3"> {/* Bootstrap container for responsiveness */}
      <div className="card p-4 shadow"> {/* Bootstrap card for styling */}
        <h2 className="text-center mb-4 fw-bold" style={{color: '#812093'}}>FEEDBACK FORM</h2> {/* Bootstrap styling */}

        <form onSubmit={handleSubmit}>
          <div className="row g-3"> {/* Bootstrap row and gutters */}
            <div className="col-md-6"> {/* Responsive columns */}
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label fw-bold">First Name:</label>
                <div className="input-group"> {/* Input group for icon */}
                  <span className="input-group-text"><i className="fas fa-user"></i></span>
                  <input
                    type="text"
                    className="form-control"  
                    id="firstname"
                    name="firstname"
                    placeholder="Enter your first name"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {errors.firstname && <p className="text-danger mt-1">{errors.firstname}</p>} {/* Bootstrap text-danger */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label fw-bold">Last Name:</label>
                <div className="input-group">
                  <span className="input-group-text"><i className="fas fa-user"></i></span>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    placeholder="Enter your last name"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {errors.lastname && <p className="text-danger mt-1">{errors.lastname}</p>}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="contact" className="form-label fw-bold">Contact Number:</label>
            <div className="input-group">
              <span className="input-group-text"><i className="fas fa-phone"></i></span>
              <input
                type="tel"
                className="form-control"
                id="contact"
                name="contact"
                placeholder="Enter your contact number"
                value={formData.contact}
                onChange={handleInputChange}
                required
              />
            </div>
            {errors.contact && <p className="text-danger mt-1">{errors.contact}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Rating:</label>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`fa fa-star ${formData.rating >= star ? 'text-warning' : 'text-secondary'} me-1`} // Font Awesome stars with Bootstrap colors
                  style={{ cursor: 'pointer', fontSize: '20px' }}
                  onClick={() => handleRatingChange(star)}
                ></span>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="attachment" className="form-label fw-bold">Attach File (Optional):</label>
            <input
              type="file"
              className="form-control"
              id="attachment"
              name="attachment"
              onChange={handleFileChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="comments" className="form-label fw-bold">Comments:</label>
            <textarea
              className="form-control"
              id="comments"
              name="comments"
              placeholder="Write your comments here"
              value={formData.comments}
              onChange={handleInputChange}
              rows="4" // Set number of rows
              required
            ></textarea>
          </div>

          <div className="d-grid"> {/* Center the button */}
            <button type="submit" style={buttonStyle}> {/* Bootstrap button */}
              Submit
            </button>
          </div>
        </form>

        {/* Modal */}
        {modalVisible && (
          <div className="modal fade show" style={{ display: 'block' }}> {/* Bootstrap modal */}
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-success">Success!</h5> {/* Success message in modal */}
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <p>{modalMessage}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Office Location Section */}
        <div className="mt-5"> {/* Margin top for spacing */}
          <h2 style={{color: '#812093', textAlign:"center"}} >OUR OFFICE</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.2556350554073!2d80.21724077507399!3d12.82675068747546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525a688f3d32f1%3A0x769131751ee5a50e!2sChangepond%20Technologies!5e0!3m2!1sen!2sin!4v1739183175927!5m2!1sen!2sin"
            width="100%"
            height="450"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
