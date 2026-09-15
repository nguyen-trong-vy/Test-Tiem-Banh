//trang chủ tạm thời D02-1.2 & D02-1.4

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from './pages/Auth/LoginPage';
import UnauthorizedPage from './pages/Auth/UnauthorizedPage';
import ProfilePage from './pages/Client/ProfilePage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import { BookOpen } from 'lucide-react';

function HomePage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FDFBF7',
      fontFamily: 'sans-serif',
      padding: '2rem'
    }}>
      <div style={{
        background: '#FFFFFF',
        padding: '2.5rem 2rem',
        borderRadius: '16px',
        border: '1px solid #E7E5E4',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        maxWidth: '460px',
        width: '100%'
      }}>
        <h2 style={{ color: '#451A03', margin: '0 0 1.25rem 0' }}>🧁 Tiệm Bánh Của Vy</h2>

        {isAuthenticated ? (
          <div>
            <p style={{ fontSize: '1.05rem', color: '#166534', fontWeight: '600', marginBottom: '1.5rem' }}>
              Xin chào: <strong>{user?.full_name}</strong> ({user?.role})
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="http://localhost:8000/docs"
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: 'none',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '8px',
                  background: '#D97706',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}
              >
                Mở Swagger UI
              </a>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ color: '#78716C', marginBottom: '1.5rem' }}>
              Chào mừng bạn đến với Tiệm Bánh Của Vy.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/login"
                style={{
                  textDecoration: 'none',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '8px',
                  background: '#D97706',
                  color: '#FFFFFF',
                  fontWeight: '600'
                }}
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                style={{
                  textDecoration: 'none',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '8px',
                  background: '#F5EBE1',
                  color: '#451A03',
                  fontWeight: '600'
                }}
              >
                Đăng ký
              </Link>
              <a
                href="http://localhost:8000/docs"
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: 'none',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '8px',
                  background: '#451A03',
                  color: '#FFFFFF',
                  fontWeight: '600'
                }}
              >
                Swagger UI
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protected Client Route: Yêu cầu đăng nhập */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Route: Yêu cầu quyền Quản trị viên (admin) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

