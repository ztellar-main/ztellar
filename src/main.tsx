
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import axios from 'axios';
import { store, persistor } from './state/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL_API;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ToastContainer />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <React.StrictMode> */}
        <GoogleOAuthProvider clientId="530681781457-chkbrjvnjktuapvhsl2odld2l26fohsv.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
        {/* </React.StrictMode> */}
      </PersistGate>
    </Provider>
  </>
);
