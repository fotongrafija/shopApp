import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import '../styles/dropdownMenu.css';
import { useAuth } from '../context/context';
import { PiSignOutBold } from 'react-icons/pi';
import { FiUser } from "react-icons/fi";
import { Link } from 'react-router-dom';

const DropdownMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const menuRef = useRef(null);
  

  const navigate = useNavigate();

  const { logout, state } = useAuth();
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
        document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Handle logout functionality
    logout()
    setIsMenuOpen(false);
    navigate('/login');
  };    

  const handleUserProfile = () => {
    // Handle user profile functionality
    setIsMenuOpen(false);
    navigate(`/profile/${state?.user?.id}`);
  };
  

  return (
    <nav>
      <div className="profile" onClick={toggleMenu} ref={profileRef}>
        
        <div className="user">
          <h3>{state?.user?.firstName}</h3>
          <p>@{state?.user?.username}</p>
        </div>
        <div className="img-box">
          <img src={state?.user?.image} alt="some user image" />
        </div>
      </div>
      {isMenuOpen && (
        <div className='menu active' ref={menuRef}>
          <ul>
            <li>
              <Link to={`/profile/${state?.user?.id}`} onClick={handleUserProfile}>
                <FiUser id="user-icon" />
                <i className="ph-bold ph-user"></i>My Profile
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={handleLogout}>
                <PiSignOutBold id="signout-icon" />
                <i className="ph-bold ph-sign-out"></i>Sign Out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default DropdownMenu;
