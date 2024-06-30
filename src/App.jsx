import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AllProductsPage } from "./pages/AllProductsPage";
import { SingleProductPage } from "./pages/SingleProductPage";

import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import Layout from "./layout/Layout";
import ProtectedRoute from "./hoc/ProtectedRoute";
import { NotFoundPage } from "./pages/NotFoundPage";
import {UserProfilePage} from "./pages/UserProfilePage";
import { createContext, useState, useEffect } from "react";
import './index.css';
export const ThemeContext = createContext(null);


function App() {

 
  
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      return currentTheme === 'light' ? 'dark' : 'light';
    });
  };

  return (
    <ThemeContext.Provider value={ { theme, setTheme, toggleTheme } }>
      <div className={'App'} id={theme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route element={<ProtectedRoute role={'admin'} />}>
                <Route path="/products" element={<AllProductsPage />} />
                <Route path="/products/:productId" element={<SingleProductPage />} />
                <Route path="/profile/:userProfileId" element={<UserProfilePage />} />
              </Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
   </ThemeContext.Provider>
  )
}

export default App
