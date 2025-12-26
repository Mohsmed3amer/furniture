import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {isDarkMode ? '☀️' : '🌙'}
      <span>{isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}</span>
    </button>
  );
};

export default ThemeToggle;