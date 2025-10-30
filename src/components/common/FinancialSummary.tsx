import { useState } from "react";
import "./FinancialSummary.css";

export default function FinancialSummary() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  return (
    <div className="financial-summary">
      <div className="summary-header">
        🎯 Kiểm soát chi tiêu thông minh
        <p>Theo dõi ngân sách và thu chi hàng tháng dễ dàng</p>
      </div>
      <h3 className="summary-title">📊 Quản Lý Tài Chính Cá Nhân</h3>
      <div className="summary-money">
        <p>Số tiền còn lại</p>
        <h2>0 VNĐ</h2>
      </div>
      <div className="summary-choose-month">
        <p>📅 Chọn tháng:</p>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
    </div>
  );
}
