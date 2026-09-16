import React, { useState } from 'react';
import HeroSlider from '../../components/HeroSlider';
import FeatureStory from '../../components/FeatureStory';
import CategorySection from '../../components/CategorySection';
import FeaturedProducts from '../../components/FeaturedProducts';
import BlogSection from '../../components/BlogSection';
import ProductModal from '../../components/ProductModal';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div style={{ backgroundColor: '#FDFBF7', minHeight: '100vh' }}>
      {/* 1. Hero Banner Slider kèm Ticker (Mẫu trang chủ 1.png) */}
      <HeroSlider />

      {/* 2. Điểm nhấn nghệ thuật bánh & Đặt hàng ngay (Mẫu trang chủ 2.png) */}
      <FeatureStory
        onOrderClick={() => {
          document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Danh mục sản phẩm 5 loại bánh (Mẫu trang chủ 3.png) */}
      <CategorySection />

      {/* 4. Sản phẩm nổi bật & Bán chạy (Mẫu trang chủ 4.png) */}
      <FeaturedProducts
        onQuickView={(product) => setQuickViewProduct(product)}
      />

      {/* 5. Blog & Tin tức ưu đãi lễ hội (Mẫu trang chủ 5.png) */}
      <BlogSection />

      {/* Modal xem nhanh sản phẩm khi bấm vào icon mắt */}
      {quickViewProduct && (
        <ProductModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
