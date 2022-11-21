import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { store } from './state/store';
import './style.scss';

import App from './App'

const rootElement = document.getElementById('root')!;

if (rootElement === null) {
  /* TODO hook-up application error monitoring and log a critical failure due
    missing root element */
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
