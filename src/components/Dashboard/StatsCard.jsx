import React from 'react';

const StatsCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'stat-blue',
    green: 'stat-green',
    orange: 'stat-orange',
    purple: 'stat-purple'
  };

  return (
    <div className={`stat-card ${colorClasses[color] || ''}`}>
      <div className="stat-header">
        <div className="stat-icon">{icon}</div>
        <h3 className="stat-title">{title}</h3>
      </div>
      <div className="stat-value">{value}</div>
    </div>
  );
};

export default StatsCard;