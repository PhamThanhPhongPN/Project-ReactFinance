import { Route, Routes } from "react-router";
import SignUpPage from "./pages/auth/SignUpPage";
import SignInPage from "./pages/auth/SignInPage";
import AdminSignInPage from "./pages/admin/AdminSignInPage";
import Home from "./pages/Home/Home";
import AdminUser from "./pages/admin/AdminUser";
import AdminCategory from "./pages/admin/AdminCategory";
import HomeCategory from "./pages/Home/HomeCategory";
import HomeHistory from "./pages/Home/HomeHistory";
import ProtectedRoute from "./components/common/ProtectedRoute";

export default function RouterConfig() {
  return (
    <div>
      <Routes>
        <Route path="sign-up" element={<SignUpPage />}></Route>
        <Route path="sign-in" element={<SignInPage />}></Route>
        <Route path="admin-sign-in" element={<AdminSignInPage />}></Route>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="home-category"
          element={
            <ProtectedRoute>
              <HomeCategory />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="home-history"
          element={
            <ProtectedRoute>
              <HomeHistory />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="admin-user"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminUser />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="admin-category"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminCategory />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}
