import React from 'react'
import { Route, Routes } from 'react-router'
import SignUpPage from './pages/auth/SignUpPage'
import SignInPage from './pages/auth/SignInPage'
import AdminSignInPage from './pages/admin/AdminSignInPage'
import Home from './pages/Home/Home'
import AdminUser from './pages/admin/AdminUser'

export default function RouterConfig() {
  return (
    <div>
      <Routes>
        <Route path='sign-up' element={<SignUpPage/>}></Route>
        <Route path='sign-in' element={<SignInPage/>}></Route>
        <Route path='admin-sign-in' element={<AdminSignInPage/>}></Route>
        <Route path='admin-user' element={<AdminUser/>}></Route>
        <Route path='*' element={<Home/>}></Route>
      </Routes>
    </div>
  )
}
