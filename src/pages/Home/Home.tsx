import React, { useState } from 'react'
import HomeHeader from '../../components/common/HomeHeader'
import info from "../../assets/images/info-active.png";
import cate from "../../assets/images/cate.png";
import history from "../../assets/images/history.png";
import FinancialSummary from '../../components/common/FinancialSummary';
import ChangeInfoModal from '../../components/user/ChangeInfoModal';
import ChangePasswordModal from '../../components/user/ChangePasswordModal';
import "./Home.css"
import "./HomeInfo.css"
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../stores/hooks/useRedux';

export default function Home() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [showChangeInfo, setShowChangeInfo] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

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
                <input type="text" value={user.fullName} readOnly/>
              </div>
              <div className='infos'>
                <p className='info-texts'>Email <span style={{color: "red"}}>*</span></p>
                <input type="email" value={user.email} readOnly/>
              </div>
            </div>
            <div className='info-showcase'>
              <div className='infos'>
                <p className='info-texts'>Phone <span style={{color: "red"}}>*</span></p>
                <input type="text" value={user.phone || "Not provided"} readOnly />
              </div>
              <div className='infos'>
                <p className='info-texts'>Gender <span style={{color: "red"}}>*</span></p>
                <input type="text" value={user.gender ? "Male" : "Female"} readOnly />
              </div>
            </div>
          </div>
          <div className='info-change-button-container'>
            <button 
              className='info-change-btn'
              onClick={() => setShowChangeInfo(true)}
            >
              Change Information
            </button>
            <button 
              className='info-change-btn'
              onClick={() => setShowChangePassword(true)}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      <ChangeInfoModal 
        show={showChangeInfo} 
        onHide={() => setShowChangeInfo(false)}
      />
      <ChangePasswordModal 
        show={showChangePassword} 
        onHide={() => setShowChangePassword(false)}
      />
    </div>
  )
}