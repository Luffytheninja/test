import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TaxProvider } from './contexts/TaxContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TaxProvider>
      <App />
    </TaxProvider>
  </React.StrictMode>,
);
