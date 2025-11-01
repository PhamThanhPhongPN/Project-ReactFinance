import { useEffect } from "react";
import "./FinancialSummary.css";
import { useAppSelector, useAppDispatch } from "../../stores/hooks/useRedux";
import { setSelectedMonth } from "../../stores/slices/monthlyCategorySlice";
import { fetchMonthlyCategoryByMonthAndUserThunk } from "../../stores/thunks/monthlyCategoryThunks";
import { fetchTransactionsByMonthlyBudgetThunk } from "../../stores/thunks/transactionThunks";

export default function FinancialSummary() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { currentMonthlyCategory, selectedMonth, isLoading } = useAppSelector(
    (state) => state.monthlyCategory
  );
  const { transactions } = useAppSelector((state) => state.transaction);

  useEffect(() => {
    if (currentMonthlyCategory && currentMonthlyCategory.id) {
      dispatch(
        fetchTransactionsByMonthlyBudgetThunk(currentMonthlyCategory.id)
      );
    }
  }, [currentMonthlyCategory, dispatch]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;

    const lastDayOfMonth = new Date(selectedDate + "-01");
    lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1);
    lastDayOfMonth.setDate(0);
    const formattedMonth = lastDayOfMonth.toISOString().split("T")[0];

    dispatch(setSelectedMonth(formattedMonth));

    if (user) {
      dispatch(
        fetchMonthlyCategoryByMonthAndUserThunk({
          userId: user.id,
          month: formattedMonth,
        })
      );
    }
  };

  const calculateRemainingBalance = () => {
    if (!currentMonthlyCategory) return 0;

    const totalSpent = transactions.reduce((sum, transaction) => {
      return sum + transaction.total;
    }, 0);

    return currentMonthlyCategory.balance - Math.abs(totalSpent);
  };

  const remainingBalance = calculateRemainingBalance();
  const isNegative = remainingBalance < 0;

  const monthInputValue = selectedMonth.substring(0, 7);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(Math.abs(amount));
  };

  return (
    <div className="financial-summary">
      <div className="summary-header">
        🎯 Kiểm soát chi tiêu thông minh
        <p>Theo dõi ngân sách và thu chi hàng tháng dễ dàng</p>
      </div>
      <h3 className="summary-title">📊 Quản Lý Tài Chính Cá Nhân</h3>
      <div className="summary-money">
        <p>Số tiền còn lại</p>
        <h2 style={{ color: isNegative ? "red" : "green" }}>
          {isLoading ? (
            "Đang tải..."
          ) : (
            <>
              {isNegative && "-"}
              {formatCurrency(remainingBalance)} VNĐ
            </>
          )}
        </h2>
        {currentMonthlyCategory && (
          <p style={{ fontSize: "14px", color: "#666", marginTop: "8px" }}>
            Ngân sách: {formatCurrency(currentMonthlyCategory.balance)} VNĐ
          </p>
        )}
      </div>
      <div className="summary-choose-month">
        <p>📅 Chọn tháng:</p>
        <input
          type="month"
          value={monthInputValue}
          onChange={handleMonthChange}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
