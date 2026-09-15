import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Phone, Shield, Calendar, ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      background: '#FDFBF7',
      padding: '2.5rem 1.5rem',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        maxWidth: '560px',
        margin: '0 auto',
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '2rem 2.5rem',
        border: '1px solid #F5EBE1',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#451A03', margin: 0 }}>
            Thông Tin Cá Nhân
          </h1>
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
            Quay lại
          </Link>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1.25rem',
          background: '#FEF3C7',
          borderRadius: '14px',
          marginBottom: '1.75rem'
        }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: '#D97706',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '1.3rem'
          }}>
            {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: '700', color: '#451A03' }}>
              {user?.full_name}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#92400E' }}>
              Quyền hạn: <strong>{user?.role === 'admin' ? '👑 Quản trị viên' : 'Khách hàng thân thiết'}</strong>
            </div>
          </div>
        </div>

        {/* Bảng chi tiết */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: '#FAFAF9', borderRadius: '10px' }}>
            <Mail size={18} color="#78716C" />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.75rem', color: '#78716C', display: 'block' }}>Email</span>
              <strong style={{ fontSize: '0.95rem', color: '#292524' }}>{user?.email}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: '#FAFAF9', borderRadius: '10px' }}>
            <Phone size={18} color="#78716C" />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.75rem', color: '#78716C', display: 'block' }}>Số điện thoại</span>
              <strong style={{ fontSize: '0.95rem', color: '#292524' }}>{user?.phone || 'Chưa cập nhật'}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: '#FAFAF9', borderRadius: '10px' }}>
            <Shield size={18} color="#78716C" />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.75rem', color: '#78716C', display: 'block' }}>Mã định danh (User ID)</span>
              <code style={{ fontSize: '0.85rem', color: '#D97706' }}>{user?.id}</code>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: '#FAFAF9', borderRadius: '10px' }}>
            <Calendar size={18} color="#78716C" />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.75rem', color: '#78716C', display: 'block' }}>Ngày tạo tài khoản</span>
              <strong style={{ fontSize: '0.95rem', color: '#292524' }}>{user?.created_at ? new Date(user.created_at).toLocaleString('vi-VN') : 'Mới tạo'}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
