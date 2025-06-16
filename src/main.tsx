import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './routes';
import './index.css';
import { PrintProvider } from './context/PrintContext';
import './i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/ai-printing">
      <PrintProvider>
        <App />
      </PrintProvider>
    </BrowserRouter>
  </React.StrictMode>
);
