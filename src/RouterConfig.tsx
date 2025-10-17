import React from 'react'
import { Route, Routes } from 'react-router'
import SignUpPage from './pages/auth/SignUpPage'
import SignInPage from './pages/auth/SignInPage'
import Home from './pages/Home/Home'

export default function RouterConfig() {
  return (
    <div>
      <Routes>
        <Route path='sign-up' element={<SignUpPage/>}></Route>
        <Route path='sign-in' element={<SignInPage/>}></Route>
        <Route path='*' element={<Home/>}></Route>
      </Routes>
    </div>
  )
}
