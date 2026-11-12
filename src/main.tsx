import {StrictMode, type ComponentType} from 'react';
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

const root = createRoot(document.getElementById('root')!);
const start = (promoPage?: ComponentType) =>
  root.render(
    <StrictMode>
      <App promoPage={promoPage} />
    </StrictMode>,
  );

// Ad visitors land on /promo: load that page's code before the first render (promo.html already started
// downloading it), so the quick-look version in promo.html is replaced by the real page in one step.
if (window.location.pathname.replace(/\/$/, '') === '/promo') {
  import('./components/Promo').then((m) => start(m.default), () => start());
} else {
  start();
}
