import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from "../../stores/hooks/useRedux";
import { updateMonthlyCategoryThunk } from "../../stores/thunks/monthlyCategoryThunks";
import type { MonthlyCategory, CategoryBudget } from "../../types/monthlycategory.type";

interface CategoryBudgetModalProps {
  show: boolean;
  onHide: () => void;
  categoryBudget: CategoryBudget;
  currentMonthlyCategory: MonthlyCategory | null;
}

export default function CategoryBudgetModal({ 
  show, 
  onHide, 
  categoryBudget,
  currentMonthlyCategory 
}: CategoryBudgetModalProps) {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categoryManagement);
  const { isLoading } = useAppSelector((state) => state.monthlyCategory);
  
  const [budget, setBudget] = useState<string>(categoryBudget.budget.toString());

  useEffect(() => {
    setBudget(categoryBudget.budget.toString());
  }, [categoryBudget]);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Unknown';
  };

  const handleSave = async () => {
    if (!currentMonthlyCategory) return;

    const budgetValue = parseFloat(budget);
    if (isNaN(budgetValue) || budgetValue <= 0) {
      alert('Vui lòng nhập số tiền hợp lệ');
      return;
    }

    try {
      const updatedCategories = currentMonthlyCategory.categories.map(cb => 
        cb.id === categoryBudget.id 
          ? { ...cb, budget: budgetValue }
          : cb
      );

      await dispatch(updateMonthlyCategoryThunk({
        monthlyCategoryId: currentMonthlyCategory.id,
        categoryData: { categories: updatedCategories }
      })).unwrap();

      alert('Cập nhật danh mục thành công!');
      onHide();
    } catch (error: any) {
      alert('Lỗi: ' + (error || 'Không thể cập nhật danh mục'));
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sửa Ngân Sách Danh Mục</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ fontWeight: 500, fontSize: '14px', marginBottom: '5px', display: 'block' }}>
              Tên danh mục
            </label>
            <input 
              type="text" 
              className="form-control"
              value={getCategoryName(categoryBudget.categoryId)}
              disabled
              style={{ backgroundColor: '#f5f5f5' }}
            />
          </div>
          
          <div>
            <label style={{ fontWeight: 500, fontSize: '14px', marginBottom: '5px', display: 'block' }}>
              Ngân sách (VNĐ) <span style={{color: 'red'}}>*</span>
            </label>
            <input 
              type="number" 
              className="form-control"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Nhập số tiền"
              min="0"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary" 
          onClick={onHide}
          disabled={isLoading}
        >
          Hủy
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSave}
          disabled={isLoading}
          style={{ backgroundColor: '#4F46E5' }}
        >
          {isLoading ? 'Đang lưu...' : 'Lưu'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}