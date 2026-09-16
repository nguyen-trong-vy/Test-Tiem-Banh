import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  Search,
  ShoppingBag,
  ChevronDown,
  User,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  Cake
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/bakeryData';
import SearchModal from './SearchModal';

export default function Header({ onSelectProduct }) {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isHome = location.pathname === '/';

  return (
    <>
      <header style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #EFEAE6',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 2px 10px rgba(69, 26, 3, 0.04)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          {/* Brand Logo - Yuu Cake */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              color: '#3D1C06'
            }}
          >
            <span style={{
              fontFamily: 'var(--font-brand), "Pacifico", cursive',
              fontSize: '1.9rem',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              color: '#3D1C06',
              textShadow: '0 1px 2px rgba(69,26,3,0.1)'
            }}>
              Yuu Cake
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem'
            }}
            className="desktop-nav"
          >
            {/* Trang chủ */}
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                padding: '0.45rem 1.1rem',
                borderRadius: '8px',
                backgroundColor: isHome ? '#E2B89D' : 'transparent',
                color: '#3D1C06',
                fontWeight: isHome ? '700' : '600',
                fontSize: '0.98rem',
                transition: 'all 0.2s',
                letterSpacing: '-0.01em'
              }}
            >
              Trang chủ
            </Link>

            {/* Bài viết */}
            <a
              href="/#blog"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                textDecoration: 'none',
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                color: '#3D1C06',
                fontWeight: '600',
                fontSize: '0.98rem',
                transition: 'all 0.2s'
              }}
            >
              Bài viết
            </a>

            {/* Sản phẩm Dropdown */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.45rem 0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  color: '#3D1C06',
                  fontWeight: '600',
                  fontSize: '0.98rem',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <span>Sản phẩm</span>
                <ChevronDown
                  size={16}
                  style={{
                    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                  }}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '110%',
                  left: 0,
                  width: '230px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  boxShadow: '0 12px 30px rgba(69, 26, 3, 0.12)',
                  border: '1px solid #F0E8E2',
                  padding: '0.5rem',
                  zIndex: 60,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}>
                  <Link
                    to="/categories"
                    onClick={() => setIsDropdownOpen(false)}
                    style={{
                      padding: '0.6rem 0.85rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: '#451A03',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      backgroundColor: '#FDFBF7'
                    }}
                  >
                    ✨ Xem tất cả bánh
                  </Link>
                  <div style={{ height: '1px', backgroundColor: '#F3EDE8', margin: '4px 0' }} />
                  {CATEGORIES_DATA.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/categories/${cat.slug}`}
                      onClick={() => setIsDropdownOpen(false)}
                      style={{
                        padding: '0.55rem 0.85rem',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: '#4A2818',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'background-color 0.15s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FDFBF7'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <span>{cat.name}</span>
                      <span style={{ fontSize: '0.75rem', color: '#A89990' }}>({cat.count})</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Đặt hàng */}
            <a
              href="/#featured"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                textDecoration: 'none',
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                color: '#3D1C06',
                fontWeight: '600',
                fontSize: '0.98rem'
              }}
            >
              Đặt hàng
            </a>

            {/* Hỏi đáp */}
            <a
              href="/#faq"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  alert('Tiệm bánh Yuu Cake sẵn sàng hỗ trợ bạn qua hotline 0944100001 (8:00 - 21:00 hàng ngày)!');
                }
              }}
              style={{
                textDecoration: 'none',
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                color: '#3D1C06',
                fontWeight: '600',
                fontSize: '0.98rem'
              }}
            >
              Hỏi đáp
            </a>

            {/* Về YuuCake */}
            <a
              href="/#about"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                textDecoration: 'none',
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                color: '#3D1C06',
                fontWeight: '600',
                fontSize: '0.98rem'
              }}
            >
              Về YuuCake
            </a>
          </nav>

          {/* Right Action Icons: Search & Cart & Auth */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Search Button (Dark brown rounded box as in mockup) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              title="Tìm kiếm bánh"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#5C2C16',
                border: 'none',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.15s, background-color 0.15s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#451A03'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5C2C16'}
            >
              <Search size={18} />
            </button>

            {/* Cart Button with badge count (Dark brown rounded box as in mockup) */}
            <button
              onClick={() => setIsCartOpen(true)}
              title="Xem giỏ hàng"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: '#5C2C16',
                border: 'none',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 0.15s, background-color 0.15s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#451A03'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5C2C16'}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  border: '2px solid #FFFFFF'
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Auth Dropdown */}
            <div ref={userMenuRef} style={{ position: 'relative' }}>
              {isAuthenticated ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    backgroundColor: '#FDFBF7',
                    border: '1px solid #E7DDD4',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#FEF3C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#B45309'
                  }}>
                    {isAdmin ? <ShieldCheck size={16} /> : <User size={16} />}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#451A03', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user?.full_name || 'Tài khoản'}
                  </span>
                </button>
              ) : (
                <Link
                  to="/login"
                  style={{
                    textDecoration: 'none',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    backgroundColor: '#F7EFE9',
                    color: '#451A03',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    border: '1px solid #E5D5C8',
                    transition: 'all 0.15s'
                  }}
                >
                  Đăng nhập
                </Link>
              )}

              {/* User Dropdown Menu */}
              {isAuthenticated && isUserMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '115%',
                  right: 0,
                  width: '200px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(69,26,3,0.15)',
                  border: '1px solid #F0E8E2',
                  padding: '0.5rem',
                  zIndex: 60
                }}>
                  <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #F4EDE8', marginBottom: '4px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#451A03' }}>
                      {user?.full_name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: isAdmin ? '#DC2626' : '#78655A' }}>
                      {isAdmin ? 'Quản trị viên' : 'Khách hàng'}
                    </div>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsUserMenuOpen(false)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none',
                        color: '#B45309',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}
                    >
                      <ShieldCheck size={16} />
                      Trang Admin
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textDecoration: 'none',
                      color: '#451A03',
                      fontSize: '0.85rem',
                      fontWeight: '500'
                    }}
                  >
                    <User size={16} />
                    Hồ sơ cá nhân
                  </Link>

                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'none',
                      border: 'none',
                      color: '#DC2626',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <LogOut size={16} />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={onSelectProduct}
      />
    </>
  );
}
