import React from 'react';
import ReactDOM from 'react-dom/client';
import './utils/firebase.ts';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './config/configureMobX.ts';
import './index.scss';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
