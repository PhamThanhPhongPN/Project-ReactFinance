import React from 'react'
import { Route, Routes } from 'react-router'
import SignUpPage from './pages/auth/SignUpPage'
import SignInPage from './pages/auth/SignInPage'
import AdminSignInPage from './pages/admin/AdminSignInPage'
import Home from './pages/Home/Home'
import AdminUser from './pages/admin/AdminUser'
import AdminCategory from './pages/admin/AdminCategory'
import HomeCategory from './pages/Home/HomeCategory'
import HomeHistory from './pages/Home/HomeHistory'

export default function RouterConfig() {
  return (
    <div>
      <Routes>
        <Route path='sign-up' element={<SignUpPage/>}></Route>
        <Route path='sign-in' element={<SignInPage/>}></Route>
        <Route path='admin-sign-in' element={<AdminSignInPage/>}></Route>
        <Route path='admin-user' element={<AdminUser/>}></Route>
        <Route path='*' element={<Home/>}></Route>
        <Route path='admin-category' element={<AdminCategory/>}></Route>
        <Route path='home-category' element={<HomeCategory/>}></Route>
        <Route path='home-history' element={<HomeHistory/>}></Route>
      </Routes>
    </div>
  )
}
