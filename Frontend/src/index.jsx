import React from 'react';
import ReactDOM from 'react-dom/client';
import store from "./store";
import {Provider} from "react-redux";
import App from './App';

import {positions, transitions, Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
// if any error in notification part --> install -->npm i redux --force
const option = {
  timeout: 2000,
  position: positions.BOTTOM_RIGHT,
  transition: transitions.SCALE
}  //define configuration options for display the alert notification




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...option}>
        <App />
      </AlertProvider>
  </Provider>
);

