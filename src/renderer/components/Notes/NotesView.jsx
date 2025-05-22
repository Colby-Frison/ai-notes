import React from 'react';
import './NotesView.css';

const NotesView = () => {
  // Placeholder notes data - in a real app, this would come from a store or API
  const notes = [
    { id: 1, title: 'Meeting Notes', preview: 'Discussed project timelines and deliverables...', date: '2025-05-21' },
    { id: 2, title: 'Ideas for AI Integration', preview: 'Use GPT-4 to summarize notes automatically...', date: '2025-05-20' },
    { id: 3, title: 'Learning Resources', preview: 'Electron, React, Vite tutorials and documentation...', date: '2025-05-19' },
  ];

  return (
    <div className="notes-view">
      <div className="notes-header">
        <h2>My Notes</h2>
        <button className="new-note-btn">+ New Note</button>
      </div>
      
      <div className="notes-list">
        {notes.map(note => (
          <div key={note.id} className="note-card">
            <h3 className="note-title">{note.title}</h3>
            <p className="note-preview">{note.preview}</p>
            <div className="note-footer">
              <span className="note-date">{note.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesView; 