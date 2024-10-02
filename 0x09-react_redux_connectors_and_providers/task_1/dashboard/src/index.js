import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import uiReducer from './reducers/uiReducer';
import { createRoot } from 'react-dom/client';

const store = createStore(uiReducer);
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
