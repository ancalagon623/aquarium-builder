import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/root-reducer';
import App from './App';
import Login from './Login';
import Signup from './Signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<App />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
