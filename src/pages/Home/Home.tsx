import React from 'react'
import HomeHeader from '../../components/common/HomeHeader'
import info from "../../assets/images/info-active.png";
import cate from "../../assets/images/cate.png";
import history from "../../assets/images/history.png";
import FinancialSummary from '../../components/common/FinancialSummary';
import "./Home.css"
import "./HomeInfo.css"
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <HomeHeader/>
      <div className='home-info-container'>
        <div className='home-info-nav'>
          <div className='info-active'>
            <img src={info} alt="info" width="20px" height="20px"/>
            Information
          </div>
          <div className='cate' onClick={()=>navigate("/home-category")}>
            <img src={cate} alt="info" width="19px" height="20px"/>
            Category
          </div>
          <div className='history' onClick={()=>navigate("/home-history")}>
            <img src={history} alt="info" width="22px" height="19px"/>
            History
          </div>
        </div>
        <div className='info-main-container'>
          <FinancialSummary/>
          <div className='input-money-container'>
            <p>💰 Ngân sách tháng:</p>
            <input type="text" placeholder='VD: 5000000'/>
            <button>Lưu</button>
          </div>
          <h2 className='info-title'>Quản Lý Thông tin cá nhân</h2>
          <div className='info-showcase-container'>
            <div className='info-showcase'>
              <div className='infos'>
                <p className='info-texts'>Name <span style={{color: "red"}}>*</span></p>
                <input type="text" value="Nguyen Van A" readOnly/>
              </div>
              <div className='infos'>
                <p className='info-texts'>Email <span style={{color: "red"}}>*</span></p>
                <input type="email" value="nguyenvana@gmail.com" readOnly/>
              </div>
            </div>
            <div className='info-showcase'>
              <div className='infos'>
                <p className='info-texts'>Phone <span style={{color: "red"}}>*</span></p>
                <input type="text" value="0987654321"readOnly />
              </div>
              <div className='infos'>
                <p className='info-texts'>Gender <span style={{color: "red"}}>*</span></p>
                <input type="text" value="Male"readOnly />
              </div>
            </div>
          </div>
          <div className='info-change-button-container'>
            <button className='info-change-btn'>Change Information</button>
            <button className='info-change-btn'>Change Password</button>
          </div>
        </div>
      </div>
    </div>
  )
}
