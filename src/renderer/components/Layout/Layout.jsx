import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ContentPanel from '../ContentPanel/ContentPanel';
import './Layout.css';

const Layout = () => {
  const [activeTab, setActiveTab] = useState('notes');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <ContentPanel activeTab={activeTab} />
    </div>
  );
};

export default Layout; 