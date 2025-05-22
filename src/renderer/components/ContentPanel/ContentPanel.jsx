import React from 'react';
import './ContentPanel.css';
import NotesView from '../Notes/NotesView';
import ChatView from '../Chat/ChatView';

// Placeholder Components - These would be separate component files in a real app
const SearchView = () => <div className="search-placeholder">Search Interface</div>;
const SettingsView = () => <div className="settings-placeholder">Settings Interface</div>;

const ContentPanel = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'notes':
        return <NotesView />;
      case 'chat':
        return <ChatView />;
      case 'search':
        return <SearchView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <NotesView />;
    }
  };

  return (
    <div className="content-panel">
      {renderContent()}
    </div>
  );
};

export default ContentPanel; 