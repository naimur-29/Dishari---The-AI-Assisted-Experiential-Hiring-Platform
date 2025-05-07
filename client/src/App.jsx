import { useState } from 'react'

import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/user/log-in/login'
import Signup from './pages/user/sign-up/signup'
import Profile from './pages/user/profile/Profile'
import Dashboard from './pages/user/dashboard/Dashboard'
import CompanyDashboard from './pages/company/dashboard/Dashboard'
import CompanyProfile from './pages/company/profile/Profile'
import BrowsePost from './pages/user/browse-post/BrowsePost'
import JobDetails from './pages/user/job-details/JobDetails'
import JobApply from './pages/user/job-apply/JobApply'
import AppliedPost from './pages/user/applied-post/AppliedPost'
function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/user/dashboard' element={<Dashboard/>}/>
      <Route path='/user/profile' element={<Profile/>}/>
      <Route path='/user/browse-post' element={<BrowsePost/>}/>
      <Route path='/user/job-details/:id' element={<JobDetails/>}/>
      <Route path='/user/job-apply/:id' element={<JobApply/>}/>
      <Route path='/user/applied-post' element={<AppliedPost/>}/>


      <Route path='/company/dashboard' element={<CompanyDashboard/>}/>
      <Route path='/company/profile' element={<CompanyProfile/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
