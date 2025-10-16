import React from 'react'
import { Route, Routes } from 'react-router'
import SignUp from './components/forms/SignUp'

export default function RouterConfig() {
  return (
    <div>
      <Routes>
        <Route path='sign-up' element={<SignUp/>}></Route>
      </Routes>
    </div>
  )
}
