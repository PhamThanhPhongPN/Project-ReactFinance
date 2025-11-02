import { useState, useEffect } from 'react'
import HomeHeader from '../../components/common/HomeHeader'
import info from "../../assets/images/info.png";
import cate from "../../assets/images/cate-active.png";
import history from "../../assets/images/history.png";
import "./Home.css"
import "./HomeCategory.css"
import { useNavigate } from 'react-router-dom';
import FinancialSummary from '../../components/common/FinancialSummary';
import { useAppSelector, useAppDispatch } from '../../stores/hooks/useRedux';
import { fetchAllCategoriesThunk } from '../../stores/thunks/categoryThunks';
import { 
  fetchMonthlyCategoryByMonthAndUserThunk,
  updateMonthlyCategoryThunk,
  createMonthlyCategoryThunk 
} from '../../stores/thunks/monthlyCategoryThunks';
import { CategoryStatus } from '../../types/category.type';
import CategoryBudgetModal from '../../components/category/CategoryBudgetModal';

export default function HomeCategory() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { categories } = useAppSelector((state) => state.categoryManagement);
  const { currentMonthlyCategory, selectedMonth, isLoading } = useAppSelector((state) => state.monthlyCategory);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [budgetAmount, setBudgetAmount] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategoryBudget, setEditingCategoryBudget] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchAllCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (user && selectedMonth) {
      dispatch(fetchMonthlyCategoryByMonthAndUserThunk({
        userId: user.id,
        month: selectedMonth
      }));
    }
  }, [user, selectedMonth, dispatch]);

  const activeCategories = categories.filter(cat => cat.status === CategoryStatus.ACTIVE);

  const categoryBudgets = currentMonthlyCategory?.categories || [];

  const handleAddCategoryBudget = async () => {
    if (!selectedCategoryId || !budgetAmount || !user) {
      alert('Vui lòng chọn danh mục và nhập số tiền');
      return;
    }

    const budget = parseFloat(budgetAmount);
    if (isNaN(budget) || budget <= 0) {
      alert('Vui lòng nhập số tiền hợp lệ');
      return;
    }

    const existingCategory = categoryBudgets.find(cb => cb.categoryId === selectedCategoryId);
    if (existingCategory) {
      alert('Danh mục này đã tồn tại. Vui lòng chỉnh sửa thay vì thêm mới.');
      return;
    }

    try {
      if (currentMonthlyCategory) {
        const newCategories = [
          ...categoryBudgets,
          {
            id: Date.now().toString(),
            categoryId: selectedCategoryId,
            budget: budget
          }
        ];

        await dispatch(updateMonthlyCategoryThunk({
          monthlyCategoryId: currentMonthlyCategory.id,
          categoryData: { categories: newCategories }
        })).unwrap();

        alert('Thêm danh mục thành công!');
      } else {
        await dispatch(createMonthlyCategoryThunk({
          month: selectedMonth,
          balance: 0,
          userId: user.id,
          categories: [{
            categoryId: selectedCategoryId,
            budget: budget
          }]
        })).unwrap();

        alert('Tạo danh mục tháng mới thành công!');
      }

      setSelectedCategoryId('');
      setBudgetAmount('');
    } catch (error: any) {
      alert('Lỗi: ' + (error || 'Không thể thêm danh mục'));
    }
  };

  const handleEditCategoryBudget = (categoryBudget: any) => {
    setEditingCategoryBudget(categoryBudget);
    setShowEditModal(true);
  };

  const handleDeleteCategoryBudget = async (categoryBudgetId: string) => {
    if (!currentMonthlyCategory) return;

    if (!window.confirm('Bạn có chắc muốn xóa danh mục này?')) return;

    try {
      const newCategories = categoryBudgets.filter(cb => cb.id !== categoryBudgetId);

      await dispatch(updateMonthlyCategoryThunk({
        monthlyCategoryId: currentMonthlyCategory.id,
        categoryData: { categories: newCategories }
      })).unwrap();

      alert('Xóa danh mục thành công!');
    } catch (error: any) {
      alert('Lỗi: ' + (error || 'Không thể xóa danh mục'));
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Unknown';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
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
                <select 
                  className='category-select'
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="">Tên danh mục</option>
                  {activeCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <input 
                  type='number' 
                  placeholder='Giới hạn (VNĐ)' 
                  className='category-input'
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  disabled={isLoading}
                />
                <button 
                  className='add-category-button'
                  onClick={handleAddCategoryBudget}
                  disabled={isLoading || !selectedCategoryId || !budgetAmount}
                >
                  Thêm danh mục
                </button>
              </div>
            </div>
            <div className='category-grid'>
              {categoryBudgets.length === 0 ? (
                <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#666', padding: '20px' }}>
                  Chưa có danh mục nào. Vui lòng thêm danh mục mới.
                </p>
              ) : (
                categoryBudgets.map((categoryBudget) => (
                  <div key={categoryBudget.id} className='category-card'>
                    <div className='category-icon'>$</div>
                    <div className='category-info'>
                      <p className='category-name'>{getCategoryName(categoryBudget.categoryId)}</p>
                      <p className='category-amount'>{formatCurrency(categoryBudget.budget)} VNĐ</p>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button 
                        className='category-edit'
                        onClick={() => handleEditCategoryBudget(categoryBudget)}
                      >
                        ✏️
                      </button>
                      <button 
                        className='category-edit'
                        onClick={() => handleDeleteCategoryBudget(categoryBudget.id)}
                        style={{ color: 'red' }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {editingCategoryBudget && (
        <CategoryBudgetModal
          show={showEditModal}
          onHide={() => {
            setShowEditModal(false);
            setEditingCategoryBudget(null);
          }}
          categoryBudget={editingCategoryBudget}
          currentMonthlyCategory={currentMonthlyCategory}
        />
      )}
    </div>
  )
}