import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store,persistor } from './state/store'
import { Provider } from 'react-redux'
import  {PersistGate}  from 'redux-persist/lib/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000/api";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  {/* <React.StrictMode> */}
  <GoogleOAuthProvider clientId="530681781457-chkbrjvnjktuapvhsl2odld2l26fohsv.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  {/* </React.StrictMode> */}
  </PersistGate>
  </Provider>
);

