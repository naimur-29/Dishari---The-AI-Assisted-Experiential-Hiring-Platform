import { useState } from 'react'

import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/user/log-in/login'
import Signup from './pages/user/sign-up/signup'
import Profile from './pages/user/profile/Profile'
import Dashboard from './pages/user/dashboard/Dashboard'
import CompanyDashboard from './pages/company/dashboard/Dashboard'
import CompanyProfile from './pages/company/profile/Profile'
function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/user/dashboard' element={<Dashboard/>}/>
      <Route path='/user/profile' element={<Profile/>}/>
      <Route path='/company/dashboard' element={<CompanyDashboard/>}/>
      <Route path='/company/profile' element={<CompanyProfile/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
