//D04-1.4

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, ArrowLeft, Users, Package, ShoppingBag, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      background: '#FDFBF7',
      padding: '2.5rem 1.5rem',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '2rem 2.5rem',
        border: '1px solid #F5EBE1',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#451A03', margin: 0 }}>
                Khu Vực Quản Trị (Admin)
              </h1>
              <span style={{ fontSize: '0.8rem', color: '#DC2626', fontWeight: '700' }}>
                PROTECTED ADMIN ROUTE
              </span>
            </div>
          </div>

          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.85rem',
              color: '#B45309',
              fontWeight: '600'
            }}
          >
            <ArrowLeft size={16} />
            Về Trang Chủ
          </Link>
        </div>

        <div style={{
          padding: '1.25rem',
          background: '#FEF2F2',
          border: '1px solid #FECACA',
          borderRadius: '14px',
          marginBottom: '2rem',
          color: '#991B1B',
          fontSize: '0.925rem',
          lineHeight: 1.5
        }}>
          Xin chào <strong>{user?.full_name}</strong>! Bạn đang truy cập với vai trò <strong>Quản trị viên</strong> của Tiệm Bánh Của Vy.
        </div>

        {/* Các mục quản lý chính */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{
            padding: '1.25rem',
            background: '#FAFAF9',
            borderRadius: '12px',
            border: '1px solid #E7E5E4',
            textAlign: 'center'
          }}>
            <Package size={28} color="#D97706" style={{ margin: '0 auto 0.5rem auto' }} />
            <div style={{ fontWeight: '700', color: '#451A03', fontSize: '0.95rem' }}>Quản lý Bánh</div>
            <div style={{ fontSize: '0.8rem', color: '#78716C' }}>Nhánh Catalog</div>
          </div>

          <Link
            to="/admin/orders"
            style={{
              padding: '1.25rem',
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1.5px solid #FDE68A',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'block',
              boxShadow: '0 4px 12px rgba(217, 119, 6, 0.08)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
          >
            <ShoppingBag size={28} color="#D97706" style={{ margin: '0 auto 0.5rem auto' }} />
            <div style={{ fontWeight: '700', color: '#451A03', fontSize: '0.95rem' }}>Quản lý Đơn hàng</div>
            <div style={{ fontSize: '0.8rem', color: '#B45309', fontWeight: '600' }}>4.2 & 4.3 Quản trị đơn ›</div>
          </Link>

          <div style={{
            padding: '1.25rem',
            background: '#FAFAF9',
            borderRadius: '12px',
            border: '1px solid #E7E5E4',
            textAlign: 'center'
          }}>
            <Users size={28} color="#D97706" style={{ margin: '0 auto 0.5rem auto' }} />
            <div style={{ fontWeight: '700', color: '#451A03', fontSize: '0.95rem' }}>Khách hàng</div>
            <div style={{ fontSize: '0.8rem', color: '#78716C' }}>Tài khoản người dùng</div>
          </div>

          <div style={{
            padding: '1.25rem',
            background: '#FAFAF9',
            borderRadius: '12px',
            border: '1px solid #E7E5E4',
            textAlign: 'center'
          }}>
            <Settings size={28} color="#D97706" style={{ margin: '0 auto 0.5rem auto' }} />
            <div style={{ fontWeight: '700', color: '#451A03', fontSize: '0.95rem' }}>Cài đặt</div>
            <div style={{ fontSize: '0.8rem', color: '#78716C' }}>Cấu hình hệ thống</div>
          </div>
        </div>
      </div>
    </div>
  );
}

