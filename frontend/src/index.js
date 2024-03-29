import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import {positions, transitions, Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'

//Configuration for alert pop up
const options = {
  timeout: 6000,
  position:  positions.BOTTOM_RIGHT,
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);

