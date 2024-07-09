import { Outlet } from 'react-router-dom';
import './styles/index.scss';
import { TopBar } from './components/topBar/TopBar';
import { Footer } from './components/footer/Footer';
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
