const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
  app.quit();
}

// Keep a global reference of the window object to prevent garbage collection
let mainWindow;

const createWindow = () => {
  console.log('Creating main window');

  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // In development, directly load the Vite dev server
  const VITE_DEV_SERVER_URL = 'http://localhost:5173';
  console.log('Loading from Vite dev server at', VITE_DEV_SERVER_URL);
  
  mainWindow.loadURL(VITE_DEV_SERVER_URL);
  
  // Open DevTools
  mainWindow.webContents.openDevTools();
  
  // Log when the window has finished loading
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Vite dev server loaded successfully');
  });
  
  // Log any load errors
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load Vite dev server:', errorDescription);
  });

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    // Dereference the window object
    mainWindow = null;
  });
};

// This method will be called when Electron has finished initialization
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // On macOS it is common for applications to stay open until the user quits explicitly
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the dock icon is clicked
  if (mainWindow === null) {
    createWindow();
  }
}); 