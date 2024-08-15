import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'modern-normalize';
import './index.css';
import './i18/i18n.js';
import App from './App.jsx';
import TranslationProvider from './tourProvider/TranslationProvider.jsx';
// import { ModalProvider } from '../src/context/ModalContext.jsx';
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <TranslationProvider>
            {/* <ModalProvider> */}
            <App />
            {/* </ModalProvider> */}
            <ToastContainer />
          </TranslationProvider>
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
