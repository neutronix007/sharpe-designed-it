import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// After a deploy, a page opened before it still asks for the old code-split files, which no longer
// exist and come back as HTML, leaving a blank page. Reload once to pick up the new build.
window.addEventListener('vite:preloadError', (event) => {
  if (sessionStorage.getItem('reloaded-after-deploy')) return;
  sessionStorage.setItem('reloaded-after-deploy', '1');
  event.preventDefault();
  window.location.reload();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
