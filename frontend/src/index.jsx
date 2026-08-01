import ReactDOM from 'react-dom/client';
import store from "./store";
import {Provider} from "react-redux";
import axios from "axios";
import { Toaster } from "sonner";
import App from './App';

// Suppress React 18 defaultProps deprecation warning
const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Support for defaultProps will be removed from function components')) {
    return;
  }
  originalError(...args);
};

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
    <Toaster position="bottom-right" richColors />
    <App />
  </Provider>
);


