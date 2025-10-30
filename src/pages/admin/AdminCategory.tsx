import AdminNavbar from "../../components/common/AdminNavbar";
import AdminSidebar from "../../components/common/AdminSidebar";
import CategoryTable from "../../components/category/CategoryTable";
import CategoryAddModal from "../../components/category/CategoryAddModal";
import CategoryPagination from "../../components/category/CategoryPagination";
import search from "../../assets/images/search.png";
import "./AdminPage.css";
import { useState } from "react";

export default function AdminCategory() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 4;

  const categoryData = [
    { id: 1, name: "Tiền tích lũy", image: "", status: true },
    { id: 2, name: "Tiền xăng", image: "", status: false },
    { id: 3, name: "Tiền ăn", image: "", status: true },
    { id: 4, name: "Tiền đi chơi", image: "", status: true },
    { id: 5, name: "Tiền cho con", image: "", status: false },
    { id: 6, name: "Tiền du phòng", image: "", status: true },
    { id: 7, name: "Tiền sữa đỗ", image: "", status: true },
    { id: 8, name: "Tiền cà phê", image: "", status: false },
  ];

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const filteredData = categoryData.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="category-container">
          <div className="category-utils">
            <button className="add-category-btn" onClick={handleShow}>
              Add Category
            </button>
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
          </div>
          <CategoryTable data={currentData} />
          <CategoryPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <CategoryAddModal show={showModal} handleClose={handleClose} />
    </div>
  );
}