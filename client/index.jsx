import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx'
import { store } from './utils/store.js';
import './css/index.css';
import { BrowserRouter as Router } from 'react-router-dom';

if (module.hot) module.hot.accept();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
