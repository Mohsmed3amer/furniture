import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // التحقق من حالة تسجيل الدخول
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(userRole === 'admin');
    }
  }, []);

  const handleLogin = (userData) => {
    // userData يمكن أن يكون كائن مباشر أو يحتوي على user
    const user = userData.user || userData;
    
    localStorage.setItem('token', userData.token || 'fake-jwt-token');
    localStorage.setItem('role', user.role);
    localStorage.setItem('userId', user.id || (user.role === 'admin' ? '1' : '2'));
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('username', user.name);
    
    setIsAuthenticated(true);
    setIsAdmin(user.role === 'admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('userData');
    localStorage.removeItem('username');
    localStorage.removeItem('cart'); // تنظيف العربة أيضاً
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="app">
            {isAuthenticated && <Header onLogout={handleLogout} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />}
            <div className="main-container">
              {isAuthenticated && <Sidebar isOpen={sidebarOpen} isAdmin={isAdmin} />}
              <div className={`content ${sidebarOpen && isAuthenticated ? 'sidebar-open' : ''}`}>
                <Routes>
                  <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
                  <Route path="/register" element={!isAuthenticated ? <Register onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                  <Route path="/products" element={isAuthenticated ? <Products isAdmin={isAdmin} /> : <Navigate to="/login" />} />
                  <Route path="/orders" element={isAuthenticated ? <Orders isAdmin={isAdmin} /> : <Navigate to="/login" />} />
                  <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
                  <Route path="/cart" element={isAuthenticated && !isAdmin ? <Cart /> : <Navigate to="/dashboard" />} />
                  <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;