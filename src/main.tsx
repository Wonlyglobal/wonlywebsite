import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initCmsCanvasBridge } from './lib/cms-canvas-bridge'
import AppErrorBoundary from './components/AppErrorBoundary.tsx'

initCmsCanvasBridge();
window.addEventListener("vite:preloadError", event => {
  event.preventDefault();
  const key = "wonly:preload-recovery";
  if (sessionStorage.getItem(key) === location.href) return;
  sessionStorage.setItem(key, location.href);
  window.location.reload();
});

createRoot(document.getElementById("root")!).render(
  <AppErrorBoundary><App /></AppErrorBoundary>
);
