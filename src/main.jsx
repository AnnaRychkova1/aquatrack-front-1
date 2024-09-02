import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-toastify/dist/ReactToastify.css';
import 'modern-normalize';
import './index.css';
import './i18/i18n.js';
import App from './App.jsx';
import GuideProvider from './tourProvider/GuideProvider.jsx';
import { ModalProvider } from '../src/context/ModalContext.jsx';
import { persistor, store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <HelmetProvider>
            <ModalProvider>
              <GuideProvider>
                <App />
                <ToastContainer />
              </GuideProvider>
            </ModalProvider>
          </HelmetProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
