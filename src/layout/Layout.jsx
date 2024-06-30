import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import logo from '../assets/logo.svg'
import DropdownMenu from "../components/DropdownMenu";
import { useAuth } from "../context/context"

import { ShopLogo } from "../components/ShopLogo";
import { LoginButton } from "../components/LoginButton";
import ReactSwitch from "react-switch";
import { ThemeContext } from '../App';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const {isAuthenticated, logout} = useAuth();  


  const { toggleTheme, theme } = useContext(ThemeContext)

  const navigate = useNavigate();

  const location = useLocation();
 
  const handleClick = () => {
    if (!isAuthenticated) {
      navigate('/')
    }
    
  }

  const [showLogin, setShowLogin] = useState(true)

  
  useEffect(() => {
    if (location.pathname !== '/') {
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  }, [location.pathname]);
  

 
  return <div>
            <header className="header">
              <div className="header-container">
                <ShopLogo onClick={handleClick}/>

                <div className="themeSwitch">
                  <label>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</label>
                  <ReactSwitch onChange={ toggleTheme } checked={ theme === 'dark' }/>
                </div>
                {isAuthenticated && <DropdownMenu /> } 
                {!isAuthenticated && showLogin && <LoginButton />}
              </div>
            </header>
            
            <main>
              <div className='main-container'>
                {children}
              </div>
            </main>

            <footer>
              <div className="footer-container">
                <img className='shop-logo' src={logo} alt="Shop Logo" />
              </div>
            </footer>
        </div>
}

export default Layout