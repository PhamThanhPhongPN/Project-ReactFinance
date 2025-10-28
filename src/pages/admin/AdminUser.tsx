import AdminNavbar from "../../components/common/AdminNavbar";
import AdminSidebar from "../../components/common/AdminSidebar";
import search from "../../assets/images/search.png";
import UserTable from "../../components/user/UserTable";
import UserPagination from "../../components/user/UserPagination";
import "./AdminUser.css"

export default function AdminUser() {
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
            />
            <img
              src={search}
              alt="search"
              width="16px"
              height="16px"
              className="search-icon"
            />
          </div>
          <UserTable/>
          <UserPagination/>
        </div>
      </div>
    </div>
  );
}
