import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Home } from "./components/Home";





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div class="fixed top-0  z-[-2] h-full w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_90%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]"></div>
    <Home/>

  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

