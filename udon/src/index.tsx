import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@styles/global.css';
import '@styles/reset.css';
import { Provider } from 'react-redux';
import { store } from "./views/store/store";
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_ROOT
// axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);

