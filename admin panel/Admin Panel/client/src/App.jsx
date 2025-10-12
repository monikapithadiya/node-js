import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route, Navigate, BrowserRouter} from 'react-router-dom'
import Login from './Pages/Login'
import AdminDashboard from './Pages/AdminDashboard'
import EmployeeDashboard from './Pages/EmployeeDashboard'

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path='' element={<Navigate to={"/admin-dashboard"}/>}> </Route>
              <Route path='/login' element={<Login/>}> </Route>
              <Route path='/admin-dashboard' element={<AdminDashboard/>}> </Route>
              <Route path='/employee-dashboard' element={<EmployeeDashboard/>}> </Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
