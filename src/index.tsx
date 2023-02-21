import React from 'react';
import { Provider } from 'react-redux';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ReactDOM from 'react-dom/client';
import { store } from './state/store';
import './index.scss';

import App from './App';

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
  </React.StrictMode>,
);
