import React from 'react'
import HomeDropDown from '../ui/HomeDropDown'
import './HomeHeader.css'

export default function HomeHeader() {
  return (
    <div className='header-main'>
        <div className='header-info-box'>
            <p className='header-textbox'>📒 Tài Chính Cá Nhân K24_Rikkei</p>
            <HomeDropDown/>
        </div>
    </div>
  )
}
