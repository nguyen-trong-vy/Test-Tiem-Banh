import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  //D02-1.2 : hàm đăng nhập 
  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);//D02-1.2 : lưu tonken vào localstorage
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };
  //D02-1.2 : hàm đăng xuất 
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };
  //D02-1.2 : hàm cập nhật thông tin user 
  const updateUser = (newUserData) => {
    const updated = { ...user, ...newUserData };
    localStorage.setItem('user', JSON.stringify(updated));
    setUser(updated);
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === 'admin';





  //D02-1.2
  return (
    <AuthContext.Provider
      value={{
        token,
        user, //cung cấp thông tin user
        loading,
        isAuthenticated,
        isAdmin,
        login, //hàm đăng nhập
        logout, //hàm đăng xuất
        updateUser,//hàm cập nhật thông tin user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
