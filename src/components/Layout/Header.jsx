import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // ← مسار مصحح
import ThemeToggle from './ThemeToggle';

const Header = ({ onLogout, toggleSidebar }) => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const username = localStorage.getItem('username') || 'المستخدم';
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <h1 className="logo">
          <Link to="/dashboard">معرض الأثاث</Link>
        </h1>
      </div>
      <div className="header-right">
        <ThemeToggle />
        
        <div className="header-actions">
          {userRole === 'user' && (
            <Link to="/cart" className="cart-icon">
              🛒
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          )}
          
          <div className="user-menu">
            <span className="username">مرحباً، {username}</span>
            <button className="logout-btn" onClick={handleLogout}>
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;