import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

window.addEventListener('error', (e) => {
  document.body.innerHTML = `<div style="color:red;background:black;padding:20px;font-family:monospace;z-index:9999;position:relative"><h1>Runtime Error:</h1><p>${e.message}</p><pre>${e.error?.stack}</pre></div>`;
});

window.addEventListener('unhandledrejection', (e) => {
  console.error(e.reason);
  // Optional: document.body.innerHTML += ...
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
