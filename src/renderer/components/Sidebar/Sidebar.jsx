import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'notes', icon: '📝', label: 'Notes' },
    { id: 'chat', icon: '💬', label: 'Chat' },
    { id: 'search', icon: '🔍', label: 'Search' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-icons">
        {tabs.map((tab) => (
          <div 
            key={tab.id}
            className={`sidebar-icon ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            title={tab.label}
          >
            <span className="icon">{tab.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 