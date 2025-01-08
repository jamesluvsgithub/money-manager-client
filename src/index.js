import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './scrollWheel.css';
import './searchBox.css';
import './entries.css'
import './goals.css'
import App from './App';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (process.env.NODE_ENV === 'production') disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
