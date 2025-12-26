import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = ({ isOpen, isAdmin }) => {
  const { isDarkMode } = useTheme();

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'لوحة التحكم' },
    { path: '/products', icon: '🛋️', label: 'المنتجات' },
    { path: '/orders', icon: '📦', label: 'الطلبات' },
    { path: '/profile', icon: '👤', label: 'الملف الشخصي' },
  ];

  if (isAdmin) {
    menuItems.push({ path: '/admin', icon: '⚙️', label: 'الإدارة' });
  }

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'} ${isDarkMode ? 'dark' : ''}`}>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;