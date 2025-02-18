import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-4" style={{background: '#812093'}}>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          {/* Copyright Section */}
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0" style={{color:'white',fontWeight: 'bold'}}>&copy; 2025 Freshio | All Rights Reserved</p>
          </div>

          {/* Social Media Links */}
          <div className="col-md-6 text-center text-md-end">
            <a
              href="https://www.instagram.com/freshio_store?igsh=cHJ2djBzOXFjaGY5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light mx-3 social-icon"
              style={{ fontSize: '1.5rem' }}
            >
              <FaInstagram style={{ color:'white'}}/>
            </a>
            <span className="text-white mx-3" style={{ color:'white'}}>|</span>
            <a
              href="https://www.facebook.com/profile.php?id=61572482049101"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light mx-3 social-icon"
              style={{ fontSize: '1.5rem' }}
            >
              <FaFacebook style={{ color:'white'}}/>
            </a>
            <span className="text-white mx-3" style={{ color:'white'}}>|</span>
            <a
              href="https://x.com/Freshio467569?t=hscFqpaz1ekBDKn_EM-rMA&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light mx-3 social-icon"
              style={{ fontSize: '1.5rem' }}
            >
              <FaTwitter style={{ color:'white'}}/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
