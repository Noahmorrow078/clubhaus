import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Portfolio from './portfolio/Portfolio';
import ContactFixed from './home/ContactFixed';

ReactDOM.render(
  <BrowserRouter>
    <Routes>

      {["/", "/STRATEGY", "/BRANDING", "/WEB", "/CONTENT","/contact"].map((path, index) => 
        <Route path={path} component={App} key={index} element={<App/>} />
    )}

    <Route path="sales" element={<Portfolio />} />

    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
