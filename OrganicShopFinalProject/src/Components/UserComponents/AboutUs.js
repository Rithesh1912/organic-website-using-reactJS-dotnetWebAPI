import React from 'react';
import manager1 from '../../Assets/manager.jpg';
import manager2 from '../../Assets/manager4.jpg';
import sus from '../../Assets/sustainability.jpg';
import fresh from '../../Assets/fresh.png';
import com from '../../Assets/community.png';
import support from '../../Assets/supplocal.png'
import farmer from '../../Assets/farmer.jpg'
import promotion from '../../Assets/sustainable.png'
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// AboutUs Component
const AboutUs = () => {
  
  // Inline styles for various sections
  const sectionStyle = {
    
    background: 'black',
    padding: '10px 0',
    textAlign: 'center',
    color: '#fff',
    
   
  };
  const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '50px',
  };

  const cardStyle = {
    width: '18rem',
    marginBottom: '0px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const carouselStyle = {
    width: '100%',
    height: '400px',
  };

  const headingStyle = {
    fontSize: '3.5rem',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    textShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)',
    marginBottom: '20px',
    animation: 'fadeInUp 1.5s ease-out forwards',
  };

  const paragraphStyle = {
    fontSize: '1.5rem',
    lineHeight: '1.8',
    maxWidth: '600px',
    margin: '0 auto',
    textShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
    opacity: '0.8',
  };

  return (
    <div
    style={{     
      minHeight: '100vh',     
    }}
  >
    <div>
      {/* Hero Section */}
      <section
  style={{
    background: 'linear-gradient(135deg, #812093, #6b1a7a)', // Gradient background
    padding: '80px 20px',
    textAlign: 'center',
    color: '#fff',
    borderRadius: '12px',
    margin: '20px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    animation: 'fadeIn 1s ease',
  }}
>
  <div>
    <h1
      style={{
        marginTop: '25px',
        fontSize: '3.5rem',
        fontWeight: '700',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        textShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
        animation: 'slideIn 1s ease',
      }}
    >
      Welcome to Freshio Store
    </h1>
    <p
      style={{
        fontSize: '1.5rem',
        lineHeight: '1.8',
        maxWidth: '800px',
        margin: '0 auto',
        textShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
        opacity: '0.9',
        animation: 'fadeInUp 1.5s ease',
      }}
    >
      Your local hub for fresh, sustainably-sourced, and organic products.
    </p>
  </div>
</section>
      {/* Store Background Section */}
      {/* Store Background Section with enhanced UI */}
      <section
  style={{
    padding: '100px 0',
    background: 'linear-gradient(135deg, #f9f9f9, #e6f7e6)', // Subtle gradient background
    borderRadius: '10px',
    animation: 'fadeInUp 1s ease-out forwards',
  }}
>
  <Container>
    {/* Centered Heading */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Centers horizontally
        alignItems: 'center', // Centers vertically
        marginBottom: '50px', // Adds space below the heading
      }}
    >
      <h2
        style={{
          color: '#812093',
          fontSize: '2.8rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          textShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          display: 'inline-block',
          textAlign: 'center', // Ensures text is centered within the heading
        }}
      >
        Store Background
        <span
          style={{
            content: '',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '4px',
            backgroundColor: '#812093',
            borderRadius: '2px',
          }}
        ></span>
      </h2>
    </div>

    {/* Content Section */}
    <Row>
      <Col md={12}>
        <div
          style={{
            position: 'relative',
            padding: '40px',
            borderRadius: '15px',
            background: '#fff',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
          }}
        >
          <p
            style={{
              fontSize: '1.2rem',
              lineHeight: '1.8',
              color: '#555',
              textAlign: 'center',
              margin: '0 auto',
              maxWidth: '800px',
            }}
          >
            Our journey began in 2010 with a passion for providing fresh, organic produce to our community.
            Founded by a group of nature enthusiasts, we wanted to create a store that brought organic food
            straight from local farms to your table. Our mission is to make organic living accessible to all.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '30px',
              gap: '20px',
            }}
          >
            {['🌱', '🍎', '👨‍🌾'].map((icon, index) => (
              <div
                key={index}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#812093',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.5rem',
                  boxShadow: '0 4px 10px rgba(129, 32, 147, 0.3)',
                  transition: 'transform 0.3s ease, background 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.background = '#6b1a7a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = '#812093';
                }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  </Container>
</section>

      {/* Mission Statement Section with Rich UI Design */}
      <section
  style={{
    padding: '100px 0',
    background: 'linear-gradient(135deg, #812093, #6b1a7a)', // Gradient background
    borderRadius: '10px',
    animation: 'fadeInUp 1s ease-out forwards',
  }}
>
  <Container>
    {/* Centered Heading */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Centers horizontally
        alignItems: 'center', // Centers vertically
        marginBottom: '40px', // Adds space below the heading
      }}
    >
      <h2
        style={{
          color: '#fff',
          fontSize: '2.8rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          textShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          display: 'inline-block',
          textAlign: 'center', // Ensures text is centered within the heading
        }}
      >
        Mission Statement
        <span
          style={{
            content: '',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '4px',
            backgroundColor: '#fff',
            borderRadius: '2px',
          }}
        ></span>
      </h2>
    </div>

    {/* Content Box */}
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        maxWidth: '800px',
        margin: '0 auto', // Centers the box horizontally
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
      }}
    >
      <p
        style={{
          fontSize: '1.2rem',
          lineHeight: '1.8',
          color: '#555',
          textAlign: 'center',
          margin: '0 auto',
        }}
      >
        Our mission is to provide fresh, organic, and sustainably sourced products that nourish the body and
        the planet. We strive to create a space where our customers can shop with confidence, knowing they are
        supporting eco-friendly practices and local farmers.
      </p>
    </div>
  </Container>
</section>

      {/* Values and Philosophy Section */}
      <section
  style={{
    background: '#f4f4f4',
    padding: '80px 0',
    display: 'flex',
    justifyContent: 'center', // Centers horizontally
    alignItems: 'center', // Centers vertically
    minHeight: '100vh', // Ensures the section takes the full viewport height
  }}
>
  <Container>
    {/* Centered Heading */}
    <div
      style={{
        textAlign: 'center',
        marginBottom: '60px',
      }}
    >
      <h2
        style={{
          color: '#812093',
          fontSize: '2.8rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          textShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          display: 'inline-block',
        }}
      >
        Values and Philosophy
        <span
          style={{
            content: '',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '4px',
            backgroundColor: '#812093',
            borderRadius: '2px',
          }}
        ></span>
      </h2>
    </div>

    {/* Cards Section */}
    <Row>
      {[
        {
          title: 'Sustainability',
          description:
            'We are committed to promoting eco-friendly practices and sustainability in every aspect of our operations.',
          icon: '🌱',
        },
        {
          title: 'Integrity',
          description:
            'We believe in honesty and transparency, ensuring that our customers always know where their products come from.',
          icon: '🤝',
        },
        {
          title: 'Community',
          description:
            "We're dedicated to supporting our local community and creating a positive impact through partnerships and collaboration.",
          icon: '👨‍🌾',
        },
      ].map((item, index) => (
        <Col key={index} md={4} className="mb-4">
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '15px',
              padding: '30px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              height: '100%',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div
              style={{
                fontSize: '2.5rem',
                marginBottom: '20px',
              }}
            >
              {item.icon}
            </div>
            <h5
              style={{
                color: '#812093',
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '15px',
              }}
            >
              {item.title}
            </h5>
            <p
              style={{
                color: '#555',
                fontSize: '1rem',
                lineHeight: '1.6',
                marginBottom: '0',
              }}
            >
              {item.description}
            </p>
          </div>
        </Col>
      ))}
    </Row>
  </Container>
</section>

      {/* Commitment to Organic Standards Section */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
  <Container>
    {/* Centered Heading */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Centers horizontally
        alignItems: 'center', // Centers vertically
        marginBottom: '40px', // Adds space below the heading
      }}
    >
      <h2
        style={{
          color: '#812093',
          fontSize: '2.5rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          textShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          display: 'inline-block',
          textAlign: 'center', // Ensures text is centered within the heading
        }}
      >
        Commitment to Organic Standards
        <span
          style={{
            content: '',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '4px',
            backgroundColor: '#812093',
            borderRadius: '2px',
          }}
        ></span>
      </h2>
    </div>

    {/* Content */}
    <Row>
      <Col md={12}>
        <p
          style={{
            fontSize: '1.2rem',
            lineHeight: '1.8',
            color: '#555',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          We are dedicated to upholding the highest organic standards. Our store is certified by the USDA Organic,
          ensuring that all of our products are free from harmful pesticides, fertilizers, and chemicals.
          We believe in offering our customers the safest, most nutritious food available.
        </p>
      </Col>
    </Row>
  </Container>
</section>

{/* Local Community Involvement Section */}
<section style={{ background: '#f4f4f4', padding: '80px 0' }}>
  <Container>
    {/* Centered Heading */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Centers horizontally
        alignItems: 'center', // Centers vertically
        marginBottom: '40px', // Adds space below the heading
      }}
    >
      <h2
        style={{
          color: '#812093',
          fontSize: '2.5rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          textShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          display: 'inline-block',
          textAlign: 'center', // Ensures text is centered within the heading
        }}
      >
        Local Community Involvement
        <span
          style={{
            content: '',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '4px',
            backgroundColor: '#812093',
            borderRadius: '2px',
          }}
        ></span>
      </h2>
    </div>

    {/* Content */}
    <p
      style={{
        fontSize: '1.2rem',
        lineHeight: '1.8',
        color: '#555',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto 40px',
      }}
    >
      We believe in the power of community. Our store actively participates in local events, partnerships, and
      initiatives that promote healthy living, environmental awareness, and support for local farmers.
      We’re proud to be part of a community that values sustainability.
    </p>

    {/* Image Cards */}
    <Row className="text-center">
      {[
        { img: support, text: 'Supporting Local Events' },
        { img: farmer, text: 'Farmers Market Partnerships' },
        { img: promotion, text: 'Promoting Sustainable Practices' },
      ].map(({ img, text }, idx) => (
        <Col key={idx} md={4} className="mb-4">
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '15px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              height: '100%',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }}
          >
            <img
              src={img}
              alt={text}
              className="img-fluid rounded"
              style={{ height: '200px', width: '100%', objectFit: 'cover' }}
            />
            <p style={{ color: '#555', marginTop: '15px', fontSize: '1.1rem' }}>{text}</p>
          </div>
        </Col>
      ))}
    </Row>
  </Container>
</section>
      

      {/* Values Section */}
      <section style={{ marginTop: '15px', padding: '10px 0', borderRadius: '8px' }}>
  <div style={{ textAlign: 'center', marginBottom: '30px' }}>
    <h2 style={{ ...headingStyle, color: '#812093',marginTop:'10px' }}>Our Values</h2>
    <p style={{ ...paragraphStyle, color: '#555' }}>Our core values guide every aspect of our business, ensuring that we always strive for the highest standards.</p>
  </div>

  {/* Values Cards Container */}
  <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
    {/* Sustainability Card */}
    <div className="card" style={{
      ...cardStyle,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '15px',
      width: '280px',
      backgroundColor: '#fff',
      marginBottom: '30px',
      textAlign: 'center',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    }}>
      <img
        src={sus}
        className="card-img-top"
        alt="Sustainability"
        style={{
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px',
          height: '220px',
          objectFit: 'cover',
        }}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ color: '#812093' }}>Sustainability</h5>
        <p className="card-text" style={{ color: '#777' }}>We prioritize eco-friendly and sustainable practices in all our operations.</p>
      </div>
    </div>

    {/* Fresh Produce Card */}
    <div className="card" style={{
      ...cardStyle,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '15px',
      width: '280px',
      backgroundColor: '#fff',
      marginBottom: '30px',
      textAlign: 'center',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    }}>
      <img
        src={fresh}
        className="card-img-top"
        alt="Fresh Produce"
        style={{
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px',
          height: '220px',
          objectFit: 'cover',
        }}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ color: '#812093' }}>Fresh Produce</h5>
        <p className="card-text" style={{ color: '#777' }}>We offer the freshest, locally sourced organic fruits and vegetables.</p>
      </div>
    </div>

    {/* Community Card */}
    <div className="card" style={{
      ...cardStyle,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '15px',
      width: '280px',
      backgroundColor: '#fff',
      marginBottom: '30px',
      textAlign: 'contain',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    }}>
      <img
        src={com}
        className="card-img-top"
        alt="Community"
        style={{
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px',
          height: '220px',
          objectFit: 'contain',
        }}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ color: '#812093' }}>Community</h5>
        <p className="card-text" style={{ color: '#777' }}>We're committed to supporting local farmers and building a strong community.</p>
      </div>
    </div>
  </div>
      </section>


      {/* Team Section */}
      <section style={{ marginTop: '50px', backgroundColor: '#f9f9f9', padding: '50px 0', borderRadius: '8px' }}>
  <div style={{ textAlign: 'center', marginBottom: '30px' }}>
    <h2 style={{ ...headingStyle, color: '#812093' }}>Meet Our Team</h2>
    <p style={{ ...paragraphStyle, color: '#555' }}>Meet the passionate people behind our organic journey!</p>
  </div>

  {/* Team Cards Container */}
  <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
    {/* Card 1 */}
    <div className="card" style={{
      ...cardStyle,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      transformStyle: 'preserve-3d',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '15px',
      width: '280px',
      backgroundColor: '#fff',
      marginBottom: '30px',
      textAlign: 'center',
    }} 
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'rotateY(10deg) scale(1.05)';
      e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
    }} 
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'rotateY(0deg) scale(1)';
      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    }}>
      <img
        src={manager1}
        className="card-img-top"
        alt="Rachel"
        style={{
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px',
          height: '220px',
          objectFit: 'cover',
        }}
      />
      <div className="card-body">
        <h5 className="card-title">Rachel</h5>
        <p className="card-text">Organic Produce Expert</p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="card" style={{
      ...cardStyle,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      transformStyle: 'preserve-3d',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '15px',
      width: '280px',
      backgroundColor: '#fff',
      marginBottom: '30px',
      textAlign: 'center',
    }} 
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'rotateY(-10deg) scale(1.05)';
      e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
    }} 
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'rotateY(0deg) scale(1)';
      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    }}>
      <img
        src={manager2}
        className="card-img-top"
        alt="Tom"
        style={{
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px',
          height: '220px',
          objectFit: 'cover',
        }}
      />
      <div className="card-body">
        <h5 className="card-title">Lisa</h5>
        <p className="card-text">Sustainability Coordinator</p>
      </div>
    </div>
  </div>
</section>


      {/* Contact Section */}
      <section
  style={{
    marginTop: '20px',
    padding: '80px 0',
    background: 'linear-gradient(135deg, #f9f9f9, #e6f7e6)', // Subtle gradient background
    borderRadius: '8px',
  }}
>
  <Container>
    {/* Centered Heading */}
    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
      <h2
        style={{
          color: '#812093',
          fontSize: '2.5rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          textShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          display: 'inline-block',
        }}
      >
        Contact Us
        <span
          style={{
            content: '',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '4px',
            backgroundColor: '#812093',
            borderRadius: '2px',
          }}
        ></span>
      </h2>
      <p
        style={{
          fontSize: '1.2rem',
          lineHeight: '1.8',
          color: '#555',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        We’d love to hear from you! Reach out to us via email, phone, or visit our store.
      </p>
    </div>

    {/* Contact Cards */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        flexWrap: 'wrap',
      }}
    >
      {/* Address Card */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          width: '280px',
          textAlign: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-10px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        }}
      >
        <div
          style={{
            fontSize: '2.5rem',
            color: '#812093',
            marginBottom: '20px',
          }}
        >
          📍
        </div>
        <h5 style={{ color: '#812093', fontSize: '1.5rem', marginBottom: '15px' }}>
          Our Address
        </h5>
        <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.6' }}>
          123 Green Lane, <br />
          Organic Town, India
        </p>
      </div>

      {/* Phone Card */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          width: '280px',
          textAlign: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-10px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        }}
      >
        <div
          style={{
            fontSize: '2.5rem',
            color: '#812093',
            marginBottom: '20px',
          }}
        >
          📞
        </div>
        <h5 style={{ color: '#812093', fontSize: '1.5rem', marginBottom: '15px' }}>
          Call Us
        </h5>
        <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.6' }}>
          Phone: <a href="tel:+1234567890" style={{ color: '#2d5d34', textDecoration: 'none' }}>
            (+91) 8967547830
          </a>
        </p>
      </div>

      {/* Email Card */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          width: '280px',
          textAlign: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-10px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        }}
      >
        <div
          style={{
            fontSize: '2.5rem',
            color: '#812093',
            marginBottom: '20px',
          }}
        >
          ✉️
        </div>
        <h5 style={{ color: '#812093', fontSize: '1.5rem', marginBottom: '15px' }}>
          Email Us
        </h5>
        <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.6' }}>
          Email: <a href="mailto:contact@organicearthstore.com" style={{ color: '#2d5d34', textDecoration: 'none' }}>
            contact@organicearthstore.com
          </a>
        </p>
      </div>
    </div>
  </Container>
</section>

    </div>
    </div>
  );
};

export default AboutUs;