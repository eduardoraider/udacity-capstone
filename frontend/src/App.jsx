import React from "react";
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import './App.css'

function App(props) {

  const pathname = window.location.pathname

  return (
    <div className="App">
        {pathname !== '/login' ? <header> <Navbar /> </header> : ""} 
        <section className={pathname === '/login' ? 'login-container' : 'container'}>
          <Outlet />
        </section>
    </div>
  )
}

export default App
