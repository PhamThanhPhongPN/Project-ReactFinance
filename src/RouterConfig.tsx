import React from 'react'
import { Route, Routes } from 'react-router'
import SignUp from './components/forms/SignUp'
import SignIn from './components/forms/SignIn'

export default function RouterConfig() {
  return (
    <div>
      <Routes>
        <Route path='sign-up' element={<SignUp/>}></Route>
        <Route path='sign-in' element={<SignIn/>}></Route>
      </Routes>
    </div>
  )
}
