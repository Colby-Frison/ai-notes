// Simple script to start both Vite and Electron
const { spawn, exec } = require('child_process');
const path = require('path');
const os = require('os');

// Check if we're on Windows
const isWindows = os.platform() === 'win32';

// Function to run a command
function runCommand(command, args, options = {}) {
  console.log(`Running command: ${command} ${args.join(' ')}`);
  
  // On Windows with spaces in paths, we need to handle this differently
  if (isWindows && command.includes(' ')) {
    // Don't use shell on Windows with paths containing spaces
    return spawn(command, args, {
      stdio: 'inherit',
      shell: false,
      ...options
    });
  }
  
  return spawn(command, args, {
    stdio: 'inherit',
    shell: true,
    ...options
  });
}

// Kill any process using port 5173
console.log('Trying to kill any process using port 5173...');
if (isWindows) {
  exec('for /f "tokens=5" %a in (\'netstat -ano ^| findstr :5173\') do taskkill /F /PID %a', 
    (error, stdout, stderr) => {
      if (error) {
        console.log('No process found or could not kill process on port 5173');
      } else {
        console.log('Successfully killed process on port 5173');
      }
      startViteAndElectron();
    });
} else {
  exec('lsof -i tcp:5173 | grep LISTEN | awk \'{print $2}\' | xargs kill -9', 
    (error, stdout, stderr) => {
      if (error) {
        console.log('No process found or could not kill process on port 5173');
      } else {
        console.log('Successfully killed process on port 5173');
      }
      startViteAndElectron();
    });
}

function startViteAndElectron() {
  console.log('Starting Vite development server...');

  // Use npx to ensure we're using the local version of Vite
  const viteProcess = runCommand('npx', ['vite', 'serve', 'src/renderer', '--port', '5173', '--strictPort']);

  // Wait 5 seconds for Vite to start
  setTimeout(() => {
    console.log('Starting Electron...');
    
    // A simpler approach - run electron directly without path issues
    let electronProcess;
    if (isWindows) {
      // On Windows, use npx to run electron
      electronProcess = runCommand('npx', ['electron', '.']);
    } else {
      // On other platforms, use the node_modules path
      const electronPath = path.join(__dirname, 'node_modules', '.bin', 'electron');
      electronProcess = runCommand(electronPath, ['.']);
    }
    
    // Handle process exit
    electronProcess.on('close', (code) => {
      console.log(`Electron process exited with code ${code}`);
      viteProcess.kill();
      process.exit(code);
    });
    
    viteProcess.on('close', (code) => {
      console.log(`Vite process exited with code ${code}`);
      if (electronProcess) {
        electronProcess.kill();
      }
      process.exit(code);
    });
  }, 5000); // 5 second delay to ensure Vite is ready
} 