import { Outlet } from 'react-router-dom';
import './styles/index.scss';
import { TopBar } from './components/topBar/TopBar';
import React from 'react';

function App() {

  return (
    <>
    <React.StrictMode>
        <TopBar/>
        <Outlet/>
    </React.StrictMode>
    </>
  )
};

export default App
