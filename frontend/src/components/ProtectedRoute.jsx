import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * Component bảo vệ tuyến đường (Protected Route Guard)
 * @param {React.ReactNode} children Component con cần bảo vệ
 * @param {string} requiredRole Quyền bắt buộc (ví dụ: 'admin'), bỏ trống nếu chỉ cần đăng nhập
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        color: '#D97706',
        fontFamily: 'sans-serif'
      }}>
        <Loader2 size={28} className="animate-spin" />
        <span>Đang kiểm tra quyền truy cập...</span>
      </div>
    );
  }

  // 1. Chưa đăng nhập -> Đá về trang /login và lưu lại trang hiện tại để quay lại sau
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Đã đăng nhập nhưng không đủ quyền (ví dụ route yêu cầu admin nhưng user thường vào)
  if (requiredRole === 'admin' && user?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Đủ điều kiện -> Cho phép hiển thị nội dung
  return children;
}
