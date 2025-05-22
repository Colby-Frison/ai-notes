// This file is responsible for redirecting to our React app

// Detect the environment
const isDev = process.env.NODE_ENV === 'development';

// In development, redirect to the Vite dev server
// In production, redirect to the built React app in app/dist
if (isDev) {
  window.location.href = 'http://localhost:5173';
} else {
  window.location.href = './dist/index.html';
}
