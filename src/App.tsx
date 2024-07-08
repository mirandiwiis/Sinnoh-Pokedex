import { Outlet } from 'react-router-dom';
import './App.css';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import React from 'react';

function App() {

  return (
    <>
    <React.StrictMode>
      <TopBar/>
        <Outlet/>
      <Footer/>
    </React.StrictMode>
    </>
  )
};

export default App
