import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// 🔥 VERSION 3.0 - HISTORICO DE IMC - 21 OCT 2025 23:33 🔥
console.log("🚀🚀🚀 MAIN.TSX VERSION 3.0 CARGADO 🚀🚀🚀");
console.log("✅ Histórico de IMC implementado");
console.log("📅 Timestamp:", new Date().toISOString());

createRoot(document.getElementById("root")!).render(<App />);

// SERVICE WORKER DESACTIVADO TEMPORALMENTE PARA DESARROLLO
// Registrar Service Worker para PWA
if (false && 'serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker registrado:', registration.scope);
        
        // Verificar actualizaciones
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // Hay una nueva versión disponible
                if (confirm('Nueva versión disponible. ¿Actualizar ahora?')) {
                  newWorker.postMessage({ type: 'SKIP_WAITING' });
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error('❌ Error al registrar Service Worker:', error);
      });
  });
}
