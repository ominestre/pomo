import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';

import App from './components/App'

const rootElement = document.getElementById('root')!;

if (rootElement === null) {
  /* TODO hook-up application error monitoring and log a critical failure due
    missing root element */
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  React.createElement(
    App
  )
);
