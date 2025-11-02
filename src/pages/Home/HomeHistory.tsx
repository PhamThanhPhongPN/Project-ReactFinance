import { useState, useEffect } from 'react'
import HomeHeader from '../../components/common/HomeHeader'
import info from "../../assets/images/info.png";
import cate from "../../assets/images/cate.png";
import history from "../../assets/images/history-active.png";
import "./Home.css"
import "./HomeHistory.css"
import { useNavigate } from 'react-router-dom';
import FinancialSummary from '../../components/common/FinancialSummary';
import Pagination from 'react-bootstrap/Pagination';
import { useAppSelector, useAppDispatch } from '../../stores/hooks/useRedux';
import { fetchAllCategoriesThunk } from '../../stores/thunks/categoryThunks';
import { 
  createTransactionThunk, 
  deleteTransactionThunk,
  fetchTransactionsByMonthlyBudgetThunk 
} from '../../stores/thunks/transactionThunks';
import { CategoryStatus } from '../../types/category.type';

type SortOrder = 'asc' | 'desc' | null;

export default function HomeHistory() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { user } = useAppSelector((state) => state.auth);
  const { categories } = useAppSelector((state) => state.categoryManagement);
  const { currentMonthlyCategory, selectedMonth } = useAppSelector((state) => state.monthlyCategory);
  const { transactions, isLoading } = useAppSelector((state) => state.transaction);
  
  const [amount, setAmount] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [note, setNote] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchAllCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (currentMonthlyCategory?.id) {
      dispatch(fetchTransactionsByMonthlyBudgetThunk(currentMonthlyCategory.id));
    }
  }, [currentMonthlyCategory?.id, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const activeCategories = categories.filter(cat => cat.status === CategoryStatus.ACTIVE);

  const getCategoryName = (categoryId: string | undefined | null) => {
    if (!categoryId) return 'Unknown';
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Unknown';
  };

  const handleAddTransaction = async () => {
    if (!amount || !selectedCategoryId || !note.trim()) {
      alert('Vui lòng điền đầy đủ thông tin (Số tiền, Danh mục, Ghi chú)');
      return;
    }
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      alert('Vui lòng nhập số tiền hợp lệ');
      return;
    }
    if (!currentMonthlyCategory) {
      alert('Vui lòng tạo ngân sách tháng trước khi thêm giao dịch');
      return;
    }
    if (!user) {
      alert('Không tìm thấy thông tin người dùng');
      return;
    }

    try {
      const today = new Date().toISOString().split('T')[0]; 
      
      await dispatch(createTransactionThunk({
        createDate: today,
        total: amountValue,
        description: note.trim(),
        categoryId: selectedCategoryId,
        monthlyCategories: currentMonthlyCategory.id,
        userId: user.id
      })).unwrap();

      alert('Thêm giao dịch thành công!');
      setAmount('');
      setSelectedCategoryId('');
      setNote('');
    } catch (error: any) {
      alert('Lỗi: ' + (error || 'Không thể thêm giao dịch'));
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa giao dịch này?')) return;

    try {
      await dispatch(deleteTransactionThunk(transactionId)).unwrap();
      alert('Xóa giao dịch thành công!');
    } catch (error: any) {
      alert('Lỗi: ' + (error || 'Không thể xóa giao dịch'));
    }
  };

  const filteredTransactions = transactions.filter(transaction => 
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getCategoryName(transaction.categoryId).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortOrder === 'asc') return a.total - b.total;
    if (sortOrder === 'desc') return b.total - a.total;
    return 0; 
  });

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = sortedTransactions.slice(startIndex, endIndex);

  const handleSortToggle = () => {
    if (sortOrder === null) setSortOrder('desc');
    else if (sortOrder === 'desc') setSortOrder('asc');
    else setSortOrder(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Pagination.Item>
      );
    }
    
    return items;
  };

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
            {!currentMonthlyCategory ? (
              <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                ⚠️ Vui lòng tạo ngân sách tháng ở trang Information trước khi thêm giao dịch
              </p>
            ) : (
              <>
                <input 
                  type='number' 
                  placeholder='Số tiền' 
                  className='history-input-field'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isLoading || !currentMonthlyCategory}
                />
                <select
                  className='history-input-field'
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  disabled={isLoading || !currentMonthlyCategory}
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">Chọn danh mục</option>
                  {activeCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <input 
                  type='text' 
                  placeholder='Ghi chú' 
                  className='history-input-field'
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  disabled={isLoading || !currentMonthlyCategory}
                />
                <button 
                  className='history-add-btn'
                  onClick={handleAddTransaction}
                  disabled={isLoading || !currentMonthlyCategory}
                >
                  {isLoading ? 'Đang thêm...' : 'Thêm'}
                </button>
              </>
            )}
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
                <button 
                  className='history-search-btn'
                  onClick={() => setSearchQuery(searchQuery)}
                >
                  🔍
                </button>
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <button 
                onClick={handleSortToggle}
                style={{
                  padding: '6px 12px',
                  fontSize: '13px',
                  border: '1px solid #DEE2E6',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Sắp xếp theo giá: {sortOrder === 'desc' ? '↓ Giảm dần' : sortOrder === 'asc' ? '↑ Tăng dần' : '○ Mặc định'}
              </button>
            </div>

            {paginatedTransactions.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                {searchQuery ? 'Không tìm thấy giao dịch nào' : 'Chưa có giao dịch nào. Vui lòng thêm giao dịch mới.'}
              </p>
            ) : (
              <>
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
                    {paginatedTransactions.map((transaction, index) => (
                      <tr key={transaction.id}>
                        <td className='history-stt'>{startIndex + index + 1}</td>
                        <td>{getCategoryName(transaction.categoryId)}</td>
                        <td>{formatCurrency(transaction.total)} VNĐ</td>
                        <td>{transaction.description}</td>
                        <td>
                          <button 
                            className='history-delete-btn'
                            onClick={() => handleDeleteTransaction(transaction.id)}
                            disabled={isLoading}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {totalPages > 1 && (
                  <Pagination className='history-pagination'>
                    <Pagination.Prev 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    />
                    {renderPaginationItems()}
                    <Pagination.Next 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}