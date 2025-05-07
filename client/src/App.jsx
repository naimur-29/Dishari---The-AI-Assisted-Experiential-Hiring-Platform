import { useState } from 'react'

import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/user/log-in/login'
import Signup from './pages/user/sign-up/signup'

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/user/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
