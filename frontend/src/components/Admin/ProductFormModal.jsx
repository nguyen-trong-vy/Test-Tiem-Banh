import React, { useState, useEffect, useRef } from 'react';
import { getCategories } from '../../api/catalogApi';
import { createProduct } from '../../api/productApi';
import {
  X,
  UploadCloud,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  Check,
  Plus
} from 'lucide-react';

export default function ProductFormModal({ isOpen, onClose, onSuccess }) {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // Quản lý file ảnh & preview
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Nạp danh mục khi mở modal
  useEffect(() => {
    if (!isOpen) return;

    // Reset form
    setName('');
    setPrice('');
    setDescription('');
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMsg(null);

    const fetchCats = async () => {
      try {
        setLoadingCategories(true);
        const data = await getCategories();
        const cats = Array.isArray(data) ? data : [];
        setCategories(cats);
        if (cats.length > 0) {
          setCategoryId(cats[0].id);
        }
      } catch (err) {
        console.error('Lỗi khi tải danh mục:', err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCats();
  }, [isOpen]);

  // Xử lý chọn file ảnh
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorMsg('Vui lòng chọn đúng định dạng file hình ảnh (JPG, PNG, WebP...).');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrorMsg(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Vui lòng nhập tên bánh.');
      return;
    }
    if (!price || Number(price) < 0) {
      setErrorMsg('Vui lòng nhập đơn giá hợp lệ (từ 0đ trở lên).');
      return;
    }
    if (!categoryId) {
      setErrorMsg('Vui lòng chọn danh mục bánh.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg(null);

      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('price', Number(price));
      formData.append('category_id', categoryId);
      if (description.trim()) {
        formData.append('description', description.trim());
      }
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const created = await createProduct(formData);
      onSuccess?.(created);
      onClose();
    } catch (err) {
      console.error('Lỗi khi thêm bánh:', err);
      setErrorMsg(err.message || 'Không thể thêm bánh mới. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
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
        maxWidth: '560px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        boxShadow: '0 12px 40px rgba(69, 26, 3, 0.15)',
        border: '1px solid #F3EDE8',
        position: 'relative'
      }}>
        {/* Nút đóng */}
        <button
          onClick={onClose}
          disabled={isSubmitting}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: '#FDFBF7',
            border: '1px solid #E5D7CC',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#78655A',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Tiêu đề modal */}
        <div style={{ marginBottom: '1.5rem', paddingRight: '2rem' }}>
          <span style={{
            fontSize: '0.78rem',
            fontWeight: '700',
            color: '#D97706',
            backgroundColor: '#FEF3C7',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            display: 'inline-block',
            marginBottom: '0.5rem'
          }}>
            TÍNH NĂNG 5.2 • CREATE PRODUCT
          </span>
          <h2 style={{
            fontSize: '1.45rem',
            fontWeight: '800',
            color: '#3D1C06',
            margin: '0 0 0.35rem 0',
            fontFamily: 'var(--font-heading)'
          }}>
            Thêm Bánh Mới Vào Thực Đơn
          </h2>
          <p style={{ color: '#8A7366', fontSize: '0.88rem', margin: 0 }}>
            Điền thông tin và tải ảnh bánh lên máy chủ để phục vụ khách hàng
          </p>
        </div>

        {/* Thông báo lỗi */}
        {errorMsg && (
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form nhập liệu */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          {/* Tên bánh */}
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#451A03', marginBottom: '0.35rem' }}>
              Tên loại bánh <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Bánh Mousse Dâu Tây Hoàng Gia"
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: '1px solid #E5D7CC',
                outline: 'none',
                fontSize: '0.92rem',
                backgroundColor: '#FDFBF7'
              }}
            />
          </div>

          {/* Danh mục & Đơn giá */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#451A03', marginBottom: '0.35rem' }}>
                Danh mục bánh <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                disabled={loadingCategories}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid #E5D7CC',
                  outline: 'none',
                  fontSize: '0.92rem',
                  backgroundColor: '#FDFBF7',
                  cursor: 'pointer'
                }}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#451A03', marginBottom: '0.35rem' }}>
                Đơn giá (VND) <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ví dụ: 320000"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid #E5D7CC',
                  outline: 'none',
                  fontSize: '0.92rem',
                  backgroundColor: '#FDFBF7'
                }}
              />
              {price && Number(price) > 0 && (
                <div style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: '700', marginTop: '3px' }}>
                  = {Number(price).toLocaleString('vi-VN')}đ
                </div>
              )}
            </div>
          </div>

          {/* Mô tả bánh */}
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#451A03', marginBottom: '0.35rem' }}>
              Mô tả hương vị & nguyên liệu (Tùy chọn)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Mô tả độ mềm xốp, hương thơm tự nhiên, thành phần kem tươi hảo hạng..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: '1px solid #E5D7CC',
                outline: 'none',
                fontSize: '0.92rem',
                fontFamily: 'inherit',
                backgroundColor: '#FDFBF7',
                resize: 'none'
              }}
            />
          </div>

          {/* Khu vực tải ảnh & Preview */}
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#451A03', marginBottom: '0.35rem' }}>
              Ảnh đại diện bánh (Upload lên Supabase Storage)
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />

            {previewUrl ? (
              /* Đã chọn ảnh -> Hiển thị khung xem trước */
              <div style={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '2px solid #D97706',
                height: '180px',
                backgroundColor: '#FDFBF7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={previewUrl}
                  alt="Ảnh xem trước"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={16} />
                </button>
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  color: '#FFFFFF',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {selectedFile?.name}
                </div>
              </div>
            ) : (
              /* Chưa chọn ảnh -> Khung bấm tải ảnh */
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '2px dashed #D97706',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  backgroundColor: '#FDFBF7',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s'
                }}
              >
                <UploadCloud size={32} color="#D97706" style={{ margin: '0 auto 0.5rem auto' }} />
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#451A03' }}>
                  Bấm để chọn ảnh từ máy tính
                </div>
                <div style={{ fontSize: '0.78rem', color: '#8A7366', marginTop: '2px' }}>
                  Hỗ trợ JPG, PNG, WebP (Tự động tải lên Supabase Bucket)
                </div>
              </div>
            )}
          </div>

          {/* Nút hành động */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{
                flex: 1,
                padding: '0.85rem',
                borderRadius: '12px',
                border: '1px solid #E5D7CC',
                backgroundColor: '#FFFFFF',
                color: '#78655A',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              Hủy bỏ
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                flex: 1,
                padding: '0.85rem',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#451A03',
                color: '#FFFFFF',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(69, 26, 3, 0.25)'
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Đang tải bánh lên...</span>
                </>
              ) : (
                <>
                  <Plus size={18} />
                  <span>Lưu Bánh Mới</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
