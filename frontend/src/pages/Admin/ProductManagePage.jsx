import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getCategories } from '../../api/catalogApi';
import { getAdminProducts, deleteProduct } from '../../api/productApi';
import ProductFormModal from '../../components/Admin/ProductFormModal';
import {
  Package,
  Plus,
  Search,
  Filter,
  RefreshCw,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Edit3,
  Trash2,
  X,
  AlertTriangle
} from 'lucide-react';

export default function ProductManagePage() {
  const { user } = useAuth();

  // Dữ liệu sản phẩm & danh mục
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Phân trang
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Bộ lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Modal thêm mới & chỉnh sửa bánh (Tính năng 5.2 & 5.3)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Modal xác nhận Xóa mềm (Tính năng 5.4)
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Nạp danh mục
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Lỗi nạp categories:', err);
      }
    };
    fetchCats();
  }, []);

  // Nạp danh sách bánh (Tính năng 5.1)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await getAdminProducts({
        page,
        limit,
        category_id: selectedCategory,
        search: searchTerm
      });

      setProducts(res.items || []);
      setTotal(res.total || 0);
      setTotalPages(res.total_pages || 1);
    } catch (err) {
      console.error('Lỗi khi tải danh sách bánh:', err);
      setErrorMsg(err.message || 'Không thể tải danh sách sản phẩm bánh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, selectedCategory]);

  // Tìm kiếm khi gõ xong hoặc nhấn Enter
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  // Tự động tắt toast
  useEffect(() => {
    if (successMsg) {
      const t = setTimeout(() => setSuccessMsg(null), 4000);
      return () => clearTimeout(t);
    }
  }, [successMsg]);

  // Mở modal thêm bánh mới
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  // Mở modal sửa bánh (Tính năng 5.3)
  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Xử lý sau khi Thêm mới hoặc Cập nhật bánh thành công
  const handleProductSaved = (savedProd, isEdit) => {
    if (isEdit) {
      // Cập nhật trực tiếp dòng bánh trong bảng
      setProducts(prev => prev.map(p => p.id === savedProd.id ? { ...p, ...savedProd } : p));
      setSuccessMsg(`Đã cập nhật thông tin bánh "${savedProd.name}" thành công!`);
    } else {
      // Thêm mới: Quay về trang 1 để xem bánh mới
      setSuccessMsg(`Đã thêm thành công bánh "${savedProd.name}" vào thực đơn!`);
      setPage(1);
      fetchProducts();
    }
  };

  // Xử lý xác nhận xóa mềm bánh (Tính năng 5.4)
  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    try {
      setIsDeleting(true);
      await deleteProduct(deletingProduct.id);

      // Loại bỏ bánh khỏi danh sách hiển thị
      setProducts(prev => prev.filter(p => p.id !== deletingProduct.id));
      setTotal(t => Math.max(0, t - 1));
      setSuccessMsg(`Đã xóa mềm bánh "${deletingProduct.name}" thành công. Các đơn hàng cũ vẫn được bảo toàn.`);
      setDeletingProduct(null);
    } catch (err) {
      console.error('Lỗi khi xóa bánh:', err);
      setErrorMsg(err.message || 'Không thể xóa bánh. Vui lòng thử lại.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FDFBF7', minHeight: 'calc(100vh - 70px)', padding: '2rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header điều hướng & Nút Thêm mới */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <Link
              to="/admin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#78655A',
                textDecoration: 'none',
                fontSize: '0.88rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}
            >
              <ArrowLeft size={16} />
              <span>Về Bảng Điều Khiển Admin</span>
            </Link>
            <h1 style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
              fontWeight: '800',
              color: '#3D1C06',
              margin: '0 0 0.35rem 0',
              fontFamily: 'var(--font-heading)'
            }}>
              Quản Lý Thực Đơn Bánh
            </h1>
            <p style={{ color: '#8A7366', fontSize: '0.92rem', margin: 0 }}>
              Xem toàn bộ danh sách, thêm bánh mới, chỉnh sửa thông tin hoặc xóa bánh an toàn
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={fetchProducts}
              disabled={loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#FFFFFF',
                color: '#451A03',
                border: '1px solid #E5D7CC',
                borderRadius: '12px',
                padding: '0.65rem 1rem',
                fontWeight: '700',
                fontSize: '0.88rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 6px rgba(69, 26, 3, 0.04)'
              }}
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              <span>Làm mới</span>
            </button>

            {/* Nút Thêm Bánh Mới (Tính năng 5.2) */}
            <button
              onClick={handleOpenCreateModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#451A03',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                padding: '0.65rem 1.25rem',
                fontWeight: '700',
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(69, 26, 3, 0.25)',
                transition: 'all 0.15s'
              }}
            >
              <Plus size={18} />
              <span>Thêm Bánh Mới</span>
            </button>
          </div>
        </div>

        {/* Thông báo thành công / lỗi */}
        {successMsg && (
          <div style={{
            backgroundColor: '#DCFCE7',
            border: '1px solid #BBF7D0',
            color: '#166534',
            padding: '0.85rem 1.25rem',
            borderRadius: '14px',
            marginBottom: '1.25rem',
            fontSize: '0.95rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}>
            <CheckCircle2 size={20} />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            padding: '0.85rem 1.25rem',
            borderRadius: '14px',
            marginBottom: '1.25rem',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}>
            <AlertCircle size={20} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Thanh tìm kiếm & lọc danh mục */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          padding: '1.25rem',
          border: '1px solid #F3EDE8',
          boxShadow: '0 4px 16px rgba(69, 26, 3, 0.03)',
          marginBottom: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Form tìm kiếm */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#FDFBF7',
              border: '1px solid #E5D7CC',
              borderRadius: '10px',
              padding: '0.55rem 0.85rem',
              flex: '1 1 320px'
            }}
          >
            <Search size={18} color="#8A7366" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo tên bánh (nhấn Enter)..."
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                fontSize: '0.92rem',
                color: '#3D1C06'
              }}
            />
          </form>

          {/* Lọc danh mục */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Filter size={16} color="#8A7366" />
            <span style={{ fontSize: '0.88rem', color: '#78655A', fontWeight: '600' }}>Danh mục:</span>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              style={{
                padding: '0.55rem 0.85rem',
                borderRadius: '10px',
                border: '1px solid #E5D7CC',
                backgroundColor: '#FFFFFF',
                fontSize: '0.88rem',
                color: '#3D1C06',
                fontWeight: '600',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="">-- Tất cả danh mục bánh ({total}) --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bảng danh sách bánh (Tính năng 5.1, 5.3 & 5.4) */}
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '5rem 1rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #F3EDE8'
          }}>
            <Loader2 size={36} className="animate-spin" color="#D97706" style={{ margin: '0 auto 1rem auto' }} />
            <p style={{ color: '#8A7366', margin: 0, fontSize: '0.95rem' }}>Đang nạp danh sách bánh từ Supabase...</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #F3EDE8'
          }}>
            <Package size={48} color="#D97706" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.2rem', color: '#3D1C06', margin: '0 0 0.5rem 0' }}>Không tìm thấy loại bánh nào</h3>
            <p style={{ color: '#8A7366', margin: '0 0 1.5rem 0', fontSize: '0.9rem' }}>
              Thử thay đổi bộ lọc danh mục hoặc từ khóa tìm kiếm.
            </p>
            <button
              onClick={handleOpenCreateModal}
              style={{
                backgroundColor: '#451A03',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                padding: '0.65rem 1.25rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              + Thêm bánh mới ngay
            </button>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #F3EDE8',
            boxShadow: '0 4px 20px rgba(69, 26, 3, 0.04)',
            overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '920px' }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#FDFBF7',
                    borderBottom: '1px solid #EFEAE6',
                    color: '#78655A',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}>
                    <th style={{ padding: '1rem 1.25rem', width: '80px' }}>Hình ảnh</th>
                    <th style={{ padding: '1rem 1.25rem' }}>Tên bánh & Slug</th>
                    <th style={{ padding: '1rem 1.25rem' }}>Danh mục</th>
                    <th style={{ padding: '1rem 1.25rem' }}>Đơn giá</th>
                    <th style={{ padding: '1rem 1.25rem' }}>Mô tả</th>
                    <th style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>Trạng thái</th>
                    <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => {
                    const fallbackImg = '/images/placeholder-cake.jpg';
                    const cakeImg = p.image_url || fallbackImg;

                    return (
                      <tr
                        key={p.id}
                        style={{
                          borderBottom: '1px solid #F7F3EF',
                          transition: 'background-color 0.15s'
                        }}
                      >
                        {/* Hình ảnh */}
                        <td style={{ padding: '0.85rem 1.25rem', verticalAlign: 'middle' }}>
                          <img
                            src={cakeImg}
                            alt={p.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = fallbackImg;
                            }}
                            style={{
                              width: '56px',
                              height: '56px',
                              borderRadius: '12px',
                              objectFit: 'cover',
                              border: '1px solid #EAE2DB',
                              backgroundColor: '#FDFBF7'
                            }}
                          />
                        </td>

                        {/* Tên bánh & Slug */}
                        <td style={{ padding: '0.85rem 1.25rem', verticalAlign: 'middle' }}>
                          <div style={{ fontWeight: '700', color: '#3D1C06', fontSize: '0.98rem' }}>
                            {p.name}
                          </div>
                          <div style={{
                            fontSize: '0.78rem',
                            color: '#8A7366',
                            fontFamily: 'monospace',
                            marginTop: '2px'
                          }}>
                            /{p.slug}
                          </div>
                        </td>

                        {/* Danh mục */}
                        <td style={{ padding: '0.85rem 1.25rem', verticalAlign: 'middle' }}>
                          <span style={{
                            fontSize: '0.82rem',
                            fontWeight: '700',
                            color: '#92400E',
                            backgroundColor: '#FEF3C7',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '8px',
                            border: '1px solid #FDE68A',
                            display: 'inline-block'
                          }}>
                            {p.category_name || 'Bánh ngọt'}
                          </span>
                        </td>

                        {/* Đơn giá */}
                        <td style={{ padding: '0.85rem 1.25rem', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                          <span style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.05rem',
                            fontWeight: '800',
                            color: '#451A03'
                          }}>
                            {Number(p.price).toLocaleString('vi-VN')}đ
                          </span>
                        </td>

                        {/* Mô tả */}
                        <td style={{ padding: '0.85rem 1.25rem', verticalAlign: 'middle', maxWidth: '220px' }}>
                          <div style={{
                            fontSize: '0.82rem',
                            color: '#6E5648',
                            lineHeight: 1.4,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {p.description || 'Chưa có mô tả chi tiết'}
                          </div>
                        </td>

                        {/* Trạng thái */}
                        <td style={{ padding: '0.85rem 1.25rem', verticalAlign: 'middle', textAlign: 'center' }}>
                          <span style={{
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            color: '#166534',
                            backgroundColor: '#DCFCE7',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '9999px',
                            border: '1px solid #BBF7D0',
                            display: 'inline-block'
                          }}>
                            Đang mở bán
                          </span>
                        </td>

                        {/* Cột Thao tác: Sửa (5.3) & Xóa mềm (5.4) */}
                        <td style={{ padding: '0.85rem 1.25rem', verticalAlign: 'middle', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center' }}>
                            {/* Nút Sửa (Tính năng 5.3) */}
                            <button
                              onClick={() => handleOpenEditModal(p)}
                              title="Chỉnh sửa thông tin bánh"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                backgroundColor: '#EFF6FF',
                                color: '#1D4ED8',
                                border: '1px solid #BFDBFE',
                                borderRadius: '8px',
                                padding: '0.4rem 0.65rem',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.15s'
                              }}
                            >
                              <Edit3 size={14} />
                              <span>Sửa</span>
                            </button>

                            {/* Nút Xóa mềm (Tính năng 5.4) */}
                            <button
                              onClick={() => setDeletingProduct(p)}
                              title="Xóa mềm bánh khỏi thực đơn"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                backgroundColor: '#FEF2F2',
                                color: '#DC2626',
                                border: '1px solid #FECACA',
                                borderRadius: '8px',
                                padding: '0.4rem 0.65rem',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.15s'
                              }}
                            >
                              <Trash2 size={14} />
                              <span>Xóa</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Thanh điều khiển phân trang (Tính năng 5.1) */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '1rem 1.5rem',
              backgroundColor: '#FDFBF7',
              borderTop: '1px solid #EFEAE6'
            }}>
              <div style={{ fontSize: '0.88rem', color: '#78655A' }}>
                Hiển thị <strong>{(page - 1) * limit + 1}</strong> - <strong>{Math.min(page * limit, total)}</strong> trên tổng số <strong>{total}</strong> loại bánh
              </div>

              {/* Các nút trang */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page <= 1 || loading}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '0.45rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #E5D7CC',
                    backgroundColor: '#FFFFFF',
                    color: page <= 1 ? '#C4B5AA' : '#451A03',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: page <= 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>Trang trước</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      border: num === page ? 'none' : '1px solid #E5D7CC',
                      backgroundColor: num === page ? '#451A03' : '#FFFFFF',
                      color: num === page ? '#FFFFFF' : '#451A03',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      cursor: 'pointer'
                    }}
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages || loading}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '0.45rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #E5D7CC',
                    backgroundColor: '#FFFFFF',
                    color: page >= totalPages ? '#C4B5AA' : '#451A03',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: page >= totalPages ? 'not-allowed' : 'pointer'
                  }}
                >
                  <span>Trang sau</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL THÊM / SỬA BÁNH (Tính năng 5.2 & 5.3) */}
        <ProductFormModal
          isOpen={isModalOpen}
          initialData={editingProduct}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          onSuccess={handleProductSaved}
        />

        {/* MODAL XÁC NHẬN XÓA MỀM BÁNH (Tính năng 5.4) */}
        {deletingProduct && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1.25rem'
          }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '460px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
              border: '1px solid #F3EDE8',
              textAlign: 'center'
            }}>
              {/* Icon cảnh báo */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                <Trash2 size={28} />
              </div>

              <span style={{
                fontSize: '0.78rem',
                fontWeight: '700',
                color: '#DC2626',
                backgroundColor: '#FEF2F2',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                display: 'inline-block',
                marginBottom: '0.5rem'
              }}>
                TÍNH NĂNG 5.4 • SOFT DELETE
              </span>

              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '800',
                color: '#3D1C06',
                margin: '0 0 0.5rem 0'
              }}>
                Xác Nhận Xóa Bánh Khỏi Thực Đơn?
              </h3>

              <p style={{ color: '#6E5648', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 1.25rem 0' }}>
                Bạn có chắc chắn muốn xóa bánh <strong>"{deletingProduct.name}"</strong> ({Number(deletingProduct.price).toLocaleString('vi-VN')}đ)?
              </p>

              {/* Hộp giải thích nghiệp vụ Soft Delete */}
              <div style={{
                backgroundColor: '#FEF3C7',
                border: '1px solid #FDE68A',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
                color: '#92400E',
                fontSize: '0.82rem',
                textAlign: 'left',
                lineHeight: 1.45,
                marginBottom: '1.5rem',
                display: 'flex',
                gap: '0.5rem'
              }}>
                <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>Quy tắc bảo toàn dữ liệu:</strong> Hệ thống sẽ thực hiện <em>Xóa mềm</em> (ẩn bánh khỏi thực đơn của khách). Toàn bộ lịch sử các đơn hàng cũ đã đặt chiếc bánh này vẫn được giữ nguyên vẹn 100%.
                </span>
              </div>

              {/* Nút bấm */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setDeletingProduct(null)}
                  style={{
                    flex: 1,
                    padding: '0.8rem',
                    borderRadius: '12px',
                    border: '1px solid #E5D7CC',
                    backgroundColor: '#FFFFFF',
                    color: '#78655A',
                    fontWeight: '700',
                    fontSize: '0.92rem',
                    cursor: isDeleting ? 'not-allowed' : 'pointer'
                  }}
                >
                  Hủy bỏ
                </button>

                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleConfirmDelete}
                  style={{
                    flex: 1,
                    padding: '0.8rem',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#DC2626',
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '0.92rem',
                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)'
                  }}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Đang xóa...</span>
                    </>
                  ) : (
                    <span>Xác nhận xóa</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
