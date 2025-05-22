# AI Notes - Technical Documentation

This document provides a comprehensive overview of the AI Notes application architecture, components, and development workflow.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Application Structure](#application-structure)
3. [Main Process (Electron)](#main-process-electron)
4. [Renderer Process (React)](#renderer-process-react)
5. [Data Flow](#data-flow)
6. [Component Structure](#component-structure)
7. [Development Workflow](#development-workflow)
8. [Building and Packaging](#building-and-packaging)
9. [Troubleshooting](#troubleshooting)

## Architecture Overview

AI Notes is built using a modern Electron architecture with a clear separation between the main and renderer processes:

- **Main Process**: Runs Node.js and manages the application lifecycle, window creation, and system interactions
- **Renderer Process**: Runs a React application that handles the UI and user interactions
- **Microservices**: Optional Node.js services for handling notes storage and AI processing

This architecture follows the principle of separation of concerns, with each part of the application responsible for specific functions.

```
┌────────────────────────────────────────────────────────────┐
│                     Electron Application                   │
│                                                            │
│  ┌─────────────────┐            ┌─────────────────────┐    │
│  │                 │            │                     │    │
│  │   Main Process  │◄──────────►│  Renderer Process   │    │
│  │    (Node.js)    │    IPC     │      (React)        │    │
│  │                 │            │                     │    │
│  └─────────────────┘            └─────────────────────┘    │
│           ▲                              ▲                 │
└───────────┼──────────────────────────────┼─────────────────┘
            │                              │
            ▼                              ▼
┌───────────────────────┐      ┌─────────────────────────┐
│                       │      │                         │
│ File System Access    │      │ User Interface          │
│ Native OS Integration │      │ Note Management         │
│ Window Management     │      │ AI Chat Interface       │
│                       │      │                         │
└───────────────────────┘      └─────────────────────────┘
```

## Application Structure

The application follows a structured directory layout:

```
AI Notes/
├── app/               # Electron output directory
│   └── dist/          # Built React app (production)
├── config/            # Configuration files
├── e2e/               # End-to-end tests
├── microservices/     # Backend services
│   ├── ai-service/    # AI processing service
│   └── notes-api/     # Notes storage and retrieval API
├── resources/         # Static resources
│   └── icons/         # Application icons
├── src/               # Source code
│   ├── electron/      # Electron main process
│   │   ├── main.js    # Main entry point
│   │   └── preload.js # Preload script for security
│   ├── helpers/       # Shared utility functions
│   ├── menu/          # Application menu definitions
│   └── renderer/      # React application (renderer process)
│       ├── assets/    # Static assets for UI
│       ├── components/# React components
│       │   ├── Chat/         # AI chat interface components
│       │   ├── ContentPanel/ # Main content area components
│       │   ├── Layout/       # Layout components
│       │   ├── Notes/        # Notes interface components
│       │   └── Sidebar/      # Sidebar navigation components
│       ├── context/    # React context providers
│       ├── hooks/      # Custom React hooks
│       ├── pages/      # Page components
│       ├── public/     # Public assets
│       ├── App.jsx     # Main React component
│       └── main.jsx    # React entry point
└── stylesheets/       # Global styles
```

## Main Process (Electron)

The Electron main process is responsible for:

1. Application lifecycle management (start, quit, etc.)
2. Window creation and management
3. System integration (menus, tray, file system access)
4. Inter-process communication (IPC) with the renderer

### Key Files:

- `src/electron/main.js`: The entry point for the Electron application
- `src/electron/preload.js`: Securely exposes APIs to the renderer process
- `src/menu/menu.js`: Defines the application menu structure

### Security Considerations:

The application uses Electron's contextIsolation and a preload script to securely expose APIs from the main process to the renderer, preventing direct access to Node.js APIs from the renderer process.

## Renderer Process (React)

The React application runs in the renderer process and is responsible for:

1. User interface rendering
2. Handling user interactions
3. Managing application state
4. Communicating with the main process via IPC

### Key Components:

- `Layout`: The main layout component that structures the application
- `Sidebar`: Navigation component for switching between notes and chat
- `ContentPanel`: Container for the main content area
- `Notes`: Components for creating, editing, and managing notes
- `Chat`: Components for the AI chat interface

### State Management:

The application uses React's Context API for state management, with separate contexts for:

- User preferences
- Notes data
- AI chat state

## Data Flow

Data flows through the application in a predictable pattern:

1. User interacts with the UI (React)
2. React components update local state or call context methods
3. Context providers communicate with the main process via IPC when necessary
4. Main process performs file system operations or communicates with microservices
5. Results are sent back to the renderer process
6. UI updates to reflect the new state

This unidirectional data flow helps maintain a predictable application state.

## Component Structure

Each component follows a structured approach:

```jsx
// Import statements
import React, { useState, useEffect } from 'react';
import './ComponentName.css';

// Component definition
const ComponentName = ({ props }) => {
  // State hooks
  const [state, setState] = useState(initialState);
  
  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // Event handlers
  const handleEvent = () => {
    // Handle event
  };
  
  // Render
  return (
    <div className="component-name">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

## Development Workflow

The application uses a two-terminal development workflow:

### Terminal 1: Vite Development Server

```bash
npm run dev
```

This starts the Vite development server for the React application on port 5173 with hot module replacement.

### Terminal 2: Electron Process

```bash
npm start
```

This starts the Electron process, which loads the React application from the Vite development server.

### Combined Development Script

For convenience, you can use the combined development script:

```bash
npm run dev:all
```

This script:
1. Kills any existing process on port 5173
2. Starts the Vite development server
3. Waits for Vite to start, then launches Electron

## Building and Packaging

The application uses electron-builder for packaging:

```bash
npm run package
```

This command:
1. Builds the React application using Vite
2. Packages the Electron application using electron-builder
3. Creates installers for the target platform (Windows, macOS, or Linux)

The resulting installers will be placed in the `dist` directory.

## Troubleshooting

### Common Issues:

1. **"React is not defined" Error**
   - Ensure React is properly imported in every component
   - Check that the Vite configuration includes the React plugin

2. **Blank Window in Electron**
   - Verify that the Vite server is running
   - Check the Electron console for errors
   - Ensure the correct URL is being loaded in the BrowserWindow

3. **Cannot Find Module Error**
   - Run `npm install` to ensure all dependencies are installed
   - Check for typos in import statements
   - Verify that the path to the module is correct

4. **Hot Reload Not Working**
   - Ensure the Vite server is running with hot module replacement enabled
   - Check that the Electron window is configured to accept changes

For additional support, please open an issue on the GitHub repository. 