import React, { useState } from 'react'
import HomeHeader from '../../components/common/HomeHeader'
import info from "../../assets/images/info.png";
import cate from "../../assets/images/cate-active.png";
import history from "../../assets/images/history.png";
import "./Home.css"
import "./HomeCategory.css"
import { useNavigate } from 'react-router-dom';
import FinancialSummary from '../../components/common/FinancialSummary';

export default function HomeCategory() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const categories = [
    { id: 1, name: "Tiền tích lũy", amount: "2,000 $" },
    { id: 2, name: "Tiền tích lũy", amount: "2,000 $" },
    { id: 3, name: "Tiền tích lũy", amount: "2,000 $" },
    { id: 4, name: "Tiền tích lũy", amount: "2,000 $" },
    { id: 5, name: "Tiền tích lũy", amount: "2,000 $" },
    { id: 6, name: "Tiền tích lũy", amount: "2,000 $" },
    { id: 7, name: "Tiền tích lũy", amount: "2,000 $" },
  ];

  return (
    <div>
      <HomeHeader/>
      <div className='home-info-container'>
        <div className='home-info-nav'>
          <div className='info' onClick={()=>navigate("/home-info")}>
            <img src={info} alt="info" width="20px" height="20px"/>
            Information
          </div>
          <div className='cate-active'>
            <img src={cate} alt="info" width="19px" height="20px"/>
            Category
          </div>
          <div className='history' onClick={()=>navigate("/home-history")}>
            <img src={history} alt="info" width="22px" height="19px"/>
            History
          </div>
        </div>
        <div className='category-main-container'>
          <FinancialSummary/>
          <div className='category-management-box'>
            <div className='category-header'>
              <h3>📊 Quản lý danh mục (Theo tháng)</h3>
              <div className='category-controls'>
                <select className='category-select'>
                  <option>Tên danh mục</option>
                </select>
                <input 
                  type='text' 
                  placeholder='Giới hạn (VNĐ)' 
                  className='category-input'
                />
                <button className='add-category-button'>Thêm danh mục</button>
              </div>
            </div>
            <div className='category-grid'>
              {categories.map((category) => (
                <div key={category.id} className='category-card'>
                  <div className='category-icon'>$</div>
                  <div className='category-info'>
                    <p className='category-name'>{category.name}</p>
                    <p className='category-amount'>{category.amount}</p>
                  </div>
                  <button className='category-edit'>✏️</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}