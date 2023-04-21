import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-tbhd11g52ckde1t1.us.auth0.com"
      clientId="hvauV7hljQhfjJrYlmbbIoR0yOsUs4Ly"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/dashboard",
        audience: "https://dev-tbhd11g52ckde1t1.us.auth0.com/api/v2/",
        scope: "read:current_user update:current_user_metadata"
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
