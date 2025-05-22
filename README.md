# AI Notes

A modern AI-powered note-taking application built with Electron and React. Create, organize, and enhance your notes with AI assistance.

![AI Notes Screenshot](resources/screenshots/app-screenshot.png)

## Features

- **Modern UI**: Clean, VSCode/Obsidian-inspired interface
- **Note Management**: Create, edit, and organize your notes
- **AI Assistant**: Intelligent chat assistant to help with your notes
- **Cross-Platform**: Works on Windows, macOS, and Linux

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-notes.git
cd ai-notes

# Install dependencies
npm install
```

### Development

The application uses a dual-process architecture with Electron and React:

```bash
# Start the Vite development server (Terminal 1)
npm run dev

# Start Electron (Terminal 2)
npm start
```

### Building for Production

```bash
# Build the React app and package Electron
npm run package
```

## Project Structure

```
AI Notes/
├── app/               # Electron output directory
│   └── dist/          # Built React app (production)
├── src/               # Source code
│   ├── electron/      # Electron main process
│   │   ├── main.js    # Main entry point
│   │   └── preload.js # Preload script for security
│   └── renderer/      # React application (renderer process)
│       ├── components/# React components
│       │   ├── Layout/     # Layout components
│       │   ├── Sidebar/    # Sidebar navigation
│       │   ├── Notes/      # Notes interface
│       │   ├── Chat/       # AI chat interface
│       │   └── ContentPanel/ # Main content area
│       ├── App.jsx    # Main React component
│       └── main.jsx   # React entry point
├── microservices/     # Backend services (optional)
│   ├── notes-api/     # Notes storage and retrieval
│   └── ai-service/    # AI processing services
└── package.json       # Project dependencies and scripts
```

## Documentation

For more detailed information about the application architecture, component structure, and development workflow, see the [Technical Documentation](DOCUMENTATION.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Electron](https://www.electronjs.org/) - Desktop application framework
- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Frontend build tool
