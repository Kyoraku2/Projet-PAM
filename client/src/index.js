import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AlertProvider} from "./components/context/alerts/AlertContext";
import {AuthProvider} from "./components/context/AuthContext";
import {PositionProvider} from "./components/context/position/PositionContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PositionProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </PositionProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
