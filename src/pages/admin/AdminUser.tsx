import { useState } from "react";
import AdminNavbar from "../../components/common/AdminNavbar";
import AdminSidebar from "../../components/common/AdminSidebar";
import search from "../../assets/images/search.png";
import UserTable from "../../components/user/UserTable";
import UserPagination from "../../components/user/UserPagination";
import "./AdminPage.css"

export default function AdminUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 4;

  const userData = [
    { id: 1, name: "Nguyen Van A", email: "nguyenvana@gmail.com", phone: "0987654321", gender: "Female", status: "active" },
    { id: 2, name: "Pham Thi B", email: "phamthib@gmail.com", phone: "0987654321", gender: "Male", status: "active" },
    { id: 3, name: "Pham Thi C", email: "phamthic@gmail.com", phone: "0987654321", gender: "Male", status: "deactivate" },
    { id: 4, name: "Le Van D", email: "levand@gmail.com", phone: "0987654321", gender: "Male", status: "active" },
    { id: 5, name: "Tran Thi E", email: "tranthie@gmail.com", phone: "0987654321", gender: "Female", status: "active" },
  ];

  const filteredData = userData.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="body-container">
        <AdminSidebar />
        <div className="user-container">
          <div className="search-wrapper">
            <input
              type="text"
              className="user-search-box"
              placeholder="Search here ..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <img
              src={search}
              alt="search"
              width="16px"
              height="16px"
              className="search-icon"
            />
          </div>
          <UserTable data={currentData} />
          <UserPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}