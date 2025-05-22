// Direct electron starter - bypassing the build directory
const { spawn } = require('child_process');
const electron = require('electron');
const path = require('path');
const http = require('http');

// Set the environment variable to development
process.env.NODE_ENV = 'development';

// Try to detect the actual Vite server port
let vitePort = 5173; // Default Vite port
const maxPort = 5200; // Don't try forever

function checkPortAvailability(port) {
  return new Promise((resolve) => {
    const server = http.createServer();
    
    server.once('error', () => {
      // Port is in use, so Vite might be running here
      resolve(false);
    });
    
    server.once('listening', () => {
      // Port is available (not used by Vite)
      server.close();
      resolve(true);
    });
    
    server.listen(port);
  });
}

async function findVitePort() {
  console.log('Detecting Vite server port...');
  
  // Start with the default port
  let port = vitePort;
  
  // Check ports until we find one that's in use (likely Vite)
  while (port <= maxPort) {
    const isAvailable = await checkPortAvailability(port);
    
    if (!isAvailable) {
      console.log(`Found Vite server likely running on port ${port}`);
      return port;
    }
    
    port++;
  }
  
  // If we couldn't find a port in use, default back to 5173
  console.log('Could not detect Vite server port, using default 5173');
  return vitePort;
}

// Start Electron after finding the Vite port
async function startElectron() {
  // Find the Vite server port
  const port = await findVitePort();
  
  // Set the electron app start URL with the detected port
  process.env.ELECTRON_START_URL = `http://localhost:${port}`;
  
  console.log('Starting Electron directly from src/electron/main.js');
  console.log('Development server URL:', process.env.ELECTRON_START_URL);
  
  // Spawn electron
  const electronProcess = spawn(electron, [path.join(__dirname, 'src/electron/main.js')], {
    stdio: 'inherit'
  });
  
  electronProcess.on('close', (code) => {
    console.log(`Electron process exited with code ${code}`);
    process.exit(code);
  });
}

// Start the process
startElectron(); 