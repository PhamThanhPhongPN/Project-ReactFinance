import { useState, useEffect } from "react";
import AdminNavbar from "../../components/common/AdminNavbar";
import AdminSidebar from "../../components/common/AdminSidebar";
import search from "../../assets/images/search.png";
import UserTable from "../../components/user/UserTable";
import UserPagination from "../../components/user/UserPagination";
import "./AdminPage.css";
import { useAppDispatch, useAppSelector } from "../../stores/hooks/useRedux";
import { fetchAllUsersThunk, toggleUserStatusThunk } from "../../stores/thunks/userThunks";
import { UserStatus } from "../../types/user.type";

export default function AdminUser() {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector((state: { userManagement: any; }) => state.userManagement);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 4;

  useEffect(() => {
    dispatch(fetchAllUsersThunk());
  }, [dispatch]);

  const filteredData = users.filter((user: { fullName: string; email: string; phone: string | string[]; }) => 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  const handleToggleStatus = async (userId: string, currentStatus: UserStatus) => {
    if (confirm(`Are you sure you want to ${currentStatus === UserStatus.ACTIVE ? 'deactivate' : 'activate'} this user?`)) {
      await dispatch(toggleUserStatusThunk({ userId, currentStatus }));
    }
  };

  if (isLoading && users.length === 0) {
    return (
      <div>
        <AdminNavbar />
        <div className="body-container">
          <AdminSidebar />
          <div className="user-container">
            <p>Loading users...</p>
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
        <div className="user-container">
          {error && (
            <div style={{ 
              padding: '10px', 
              background: '#ffebee', 
              color: '#c62828', 
              borderRadius: '4px',
              marginBottom: '20px'
            }}>
              Error: {error}
            </div>
          )}
          
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

          {currentData.length === 0 ? (
            <p style={{ marginTop: '50px', textAlign: 'center', color: '#888' }}>
              No users found
            </p>
          ) : (
            <>
              <UserTable 
                data={currentData} 
                onToggleStatus={handleToggleStatus}
              />
              <UserPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}