import React, { useState } from 'react'
import HomeHeader from '../../components/common/HomeHeader'
import info from "../../assets/images/info.png";
import cate from "../../assets/images/cate.png";
import history from "../../assets/images/history-active.png";
import "./Home.css"
import "./HomeHistory.css"
import { useNavigate } from 'react-router-dom';
import FinancialSummary from '../../components/common/FinancialSummary';
import Pagination from 'react-bootstrap/Pagination';

export default function HomeHistory() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [currentPage, setCurrentPage] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");

  const historyData = [
    { id: 1, category: "Tiền đi chơi", budget: "2,000 $", note: "Đi chơi sapa" },
    { id: 2, category: "Tiền đi học", budget: "1,500 $", note: "Học online" },
    { id: 3, category: "Tiền cà phê", budget: "1,500 $", note: "Đi uống nước" },
    { id: 4, category: "Tiền cho con", budget: "1,500 $", note: "Mua bỉm sữa" },
    { id: 5, category: "Tiền ăn", budget: "1,500 $", note: "Ăn trưa" },
  ];

  const totalPages = 7;

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
        <div className='history-main-container'>
          <FinancialSummary/>
          <div className='history-add-box'>
            <input type='text' placeholder='Số tiền' className='history-input-field' />
            <input type='text' placeholder='Tiền chi tiêu' className='history-input-field' />
            <input type='text' placeholder='Ghi chú' className='history-input-field' />
            <button className='history-add-btn'>Thêm</button>
          </div>

          <div className='history-list-box'>
            <div className='history-list-header'>
              <h3>📋 Lịch sử giao dịch (theo tháng)</h3>
              <div className='history-search-bar'>
                <input 
                  type='text' 
                  placeholder='Tìm mô tả...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='history-search-input'
                />
                <button className='history-search-btn'>🔍</button>
              </div>
            </div>

            <table className='history-table'>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Category</th>
                  <th>Budget</th>
                  <th>Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((item) => (
                  <tr key={item.id}>
                    <td className='history-stt'>{item.id}</td>
                    <td>{item.category}</td>
                    <td>{item.budget}</td>
                    <td>{item.note}</td>
                    <td>
                      <button className='history-delete-btn'>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination className='history-pagination'>
              <Pagination.Prev 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              />
              {[1, 2, 3, 4, 5, 6, 7].map((page) => (
                <Pagination.Item 
                  key={page}
                  active={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Pagination.Item>
              ))}
              <Pagination.Next 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  )
}