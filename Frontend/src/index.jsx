import ReactDOM from 'react-dom/client';
import store from "./store";
import {Provider} from "react-redux";
import axios from "axios";
import App from './App';

// Suppress React 18 defaultProps deprecation warning for third-party libraries (e.g. react-alert, react-redux)
const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Support for defaultProps will be removed from function components')) {
    return;
  }
  originalError(...args);
};

import {positions, transitions, Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
// if any error in notification part --> install -->npm i redux --force
const option = {
  timeout: 2000,
  position: positions.BOTTOM_RIGHT,
  transition: transitions.SCALE
}  //define configuration options for display the alert notification

if(import.meta.env.VITE_BACKEND_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
  axios.defaults.withCredentials = true;
}
else {
  throw new Error("Backend URL not found");
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...option}>
        <App />
      </AlertProvider>
  </Provider>
);

