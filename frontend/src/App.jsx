import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/Client/HomePage';
import CategoryPage from './pages/Client/CategoryPage';
import CheckoutPage from './pages/Client/CheckoutPage';
import OrderSuccessPage from './pages/Client/OrderSuccessPage';
import RegisterPage from './pages/Auth/RegisterPage';
import LoginPage from './pages/Auth/LoginPage';
import UnauthorizedPage from './pages/Auth/UnauthorizedPage';
import ProfilePage from './pages/Client/ProfilePage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import OrderManagePage from './pages/Admin/OrderManagePage';
import ProductManagePage from './pages/Admin/ProductManagePage';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Thanh điều hướng Header toàn cục */}
            <Header onSelectProduct={(p) => setSelectedProduct(p)} />

            {/* Khay giỏ hàng trượt sang từ mép phải */}
            <CartDrawer />

            {/* Các tuyến đường chính */}
            <main style={{ flex: 1 }}>
              <Routes>
                {/* Trang chủ với 5 khối giao diện chuẩn mẫu */}
                <Route path="/" element={<HomePage />} />

                {/* Trang danh mục bánh chi tiết */}
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/categories/:slug" element={<CategoryPage />} />

                {/* Nhánh Đặt hàng & Thanh toán gặp mặt (Checkout Flow) */}
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />

                {/* Nhánh Auth & Quản trị */}
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <OrderManagePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <ProductManagePage />
                    </ProtectedRoute>
                  }
                />

                {/* Mặc định quay về Trang chủ */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>

            {/* Chân trang Yuu Cake */}
            <Footer />

            {/* Modal xem nhanh khi chọn bánh từ thanh tìm kiếm Header */}
            {selectedProduct && (
              <ProductModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
              />
            )}
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}


