import { useEffect, useState } from "react";
import AdminNavbar from "../../components/common/AdminNavbar";
import AdminSidebar from "../../components/common/AdminSidebar";
import CategoryTable from "../../components/category/CategoryTable";
import CategoryAddModal from "../../components/category/CategoryAddModal";
import CategoryPagination from "../../components/category/CategoryPagination";
import search from "../../assets/images/search.png";
import "./AdminPage.css";
import { useAppDispatch, useAppSelector } from "../../stores/hooks/useRedux";
import { fetchAllCategoriesThunk } from "../../stores/thunks/categoryThunks";

export default function AdminCategory() {
  const dispatch = useAppDispatch();
  const { categories, isLoading, error, selectedCategory } = useAppSelector((state) => state.categoryManagement);
  
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 4;

  useEffect(() => {
    dispatch(fetchAllCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      setShowModal(true);
    }
  }, [selectedCategory]);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const filteredData = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  if (isLoading && categories.length === 0) {
    return (
      <div>
        <AdminNavbar />
        <div className="body-container">
          <AdminSidebar />
          <div className="category-container">
            <p>Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && categories.length === 0) {
    return (
      <div>
        <AdminNavbar />
        <div className="body-container">
          <AdminSidebar />
          <div className="category-container">
            <p>Error: {error}</p>
            <button onClick={() => dispatch(fetchAllCategoriesThunk())}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

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