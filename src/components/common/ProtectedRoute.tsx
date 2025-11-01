import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../stores/hooks/useRedux';
import { UserRole } from '../../types/user.type';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  if (!isAuthenticated || !user) {
    return <Navigate to="/sign-in" replace />;
  }
  if (requireAdmin && user.role !== UserRole.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}