import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import uiReducer from './reducers/uiReducer';
import { createRoot } from 'react-dom/client';
// Import composeWithDevTools from redux-devtools-extension
import { composeWithDevTools } from 'redux-devtools-extension';

// Create the store and enable Redux DevTools with thunk middleware
const store = createStore(
  uiReducer, 
  composeWithDevTools(applyMiddleware(thunk))
);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
