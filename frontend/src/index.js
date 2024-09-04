import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Encuentra el elemento raíz donde se montará la aplicación
ReactDOM.createRoot(document.getElementById('app-root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);