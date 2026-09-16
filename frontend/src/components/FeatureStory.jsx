import React from 'react';

export default function FeatureStory({ onOrderClick }) {
  return (
    <section
      id="about"
      style={{
        backgroundColor: '#FBF7F4',
        padding: '5rem 1.5rem',
        overflow: 'hidden'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '3.5rem',
        flexWrap: 'wrap'
      }}>
        {/* Cột trái: Văn bản giới thiệu */}
        <div style={{ flex: '1 1 450px', maxWidth: '540px' }}>
          <h2 style={{
            color: '#3D1C06',
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 4vw, 3rem)',
            fontWeight: '700',
            lineHeight: 1.2,
            margin: '0 0 1.5rem 0',
            letterSpacing: '-0.02em'
          }}>
            Kiệt tác bánh ngọt,<br />
            chinh phục mọi giác quan
          </h2>

          <p style={{
            color: '#4A3728',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            margin: '0 0 2rem 0',
            fontWeight: '400'
          }}>
            Những chiếc bánh được chế tác tỉ mỉ, kết hợp hài hòa giữa hương vị và nghệ thuật, mang đến trải nghiệm ẩm thực đẳng cấp.
          </p>

          <button
            onClick={() => {
              if (onOrderClick) {
                onOrderClick();
              } else {
                document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={{
              backgroundColor: '#5C2C16',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.85rem 1.85rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(92, 44, 22, 0.25)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#451A03';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(69, 26, 3, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#5C2C16';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(92, 44, 22, 0.25)';
            }}
          >
            <span>👉 Đặt hàng ngay</span>
          </button>
        </div>

        {/* Cột phải: Đĩa bánh socola nghệ thuật nổi 3D */}
        <div style={{
          flex: '1 1 450px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Vầng sáng nền mềm mại */}
          <div style={{
            position: 'absolute',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            backgroundColor: '#F3E4D6',
            filter: 'blur(40px)',
            zIndex: 0,
            opacity: 0.6
          }} />

          {/* Ảnh bánh socola kiệt tác */}
          <img
            src="/images/bánh sinh nhật/sinh nhật 2.avif"
            alt="Kiệt tác bánh ngọt Yuu Cake"
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: '100%',
              maxHeight: '440px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 30px rgba(69, 26, 3, 0.2))',
              animation: 'floatingCake 4s ease-in-out infinite'
            }}
            onError={(e) => {
              e.target.src = '/images/sản phẩm nổi bật/banh sinh nhat.avif';
            }}
          />
        </div>
      </div>
    </section>
  );
}
