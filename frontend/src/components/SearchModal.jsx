import React, { useState, useMemo } from 'react';
import { X, Search, ShoppingBag } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/bakeryData';
import { useCart } from '../context/CartContext';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  const [query, setQuery] = useState('');
  const { addToCart } = useCart();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS_DATA.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '80px',
      backgroundColor: 'rgba(44, 24, 16, 0.6)',
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '560px',
        backgroundColor: '#FFFFFF',
        borderRadius: '18px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        margin: '0 1rem'
      }}>
        {/* Search input bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid #F3EDE8',
          gap: '0.75rem'
        }}>
          <Search size={22} color="#8A7366" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên bánh (Socola, Donut, Cupcake, Nến...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.05rem',
              color: '#3D1C06',
              fontFamily: 'inherit'
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#8A7366',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search results */}
        <div style={{
          maxHeight: '400px',
          overflowY: 'auto',
          padding: '1rem'
        }}>
          {query.trim() === '' ? (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: '#8A7366', fontSize: '0.9rem' }}>
              Nhập từ khóa để tìm kiếm các món bánh ngọt ngào của Yuu Cake...
            </div>
          ) : results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#8A7366' }}>
              Không tìm thấy món bánh nào khớp với "{query}"
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {results.map(product => (
                <div
                  key={product.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                    padding: '0.625rem 0.875rem',
                    borderRadius: '12px',
                    backgroundColor: '#FDFBF7',
                    border: '1px solid #F4EBE3',
                    transition: 'all 0.2s'
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      objectFit: 'cover'
                    }}
                  />
                  <div
                    style={{ flex: 1, cursor: 'pointer' }}
                    onClick={() => {
                      if (onSelectProduct) onSelectProduct(product);
                      onClose();
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#3D1C06' }}>
                      {product.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: '600' }}>
                      {product.formattedPrice} • <span style={{ color: '#8A7366' }}>{product.categoryName}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product, 1)}
                    style={{
                      backgroundColor: '#451A03',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.45rem 0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <ShoppingBag size={14} />
                    <span>Mua</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
