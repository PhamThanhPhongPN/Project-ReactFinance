import React from 'react'
import HomeHeader from '../../components/common/HomeHeader'
import info from "../../assets/images/info.png";
import cate from "../../assets/images/cate.png";
import history from "../../assets/images/history-active.png";
import "./Home.css"
import { useNavigate } from 'react-router-dom';
import FinancialSummary from '../../components/common/FinancialSummary';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <HomeHeader/>
      <div className='home-info-container'>
        <div className='home-info-nav'>
          <div className='info' onClick={()=>navigate("/home-info")}>
            <img src={info} alt="info" width="20px" height="20px"/>
            Information
          </div>
          <div className='cate' onClick={()=>navigate("/home-category")}>
            <img src={cate} alt="info" width="19px" height="20px"/>
            Category
          </div>
          <div className='history-active'>
            <img src={history} alt="info" width="22px" height="19px"/>
            History
          </div>
        </div>
        <FinancialSummary/>
      </div>
    </div>
  )
}
