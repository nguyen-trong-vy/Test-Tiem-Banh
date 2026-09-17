import { fetchClient } from './fetchClient';

/**
 * Tính năng 5.1: Admin xem danh sách bánh có phân trang
 * @param {Object} params - { page?: number, limit?: number, category_id?: string, search?: string }
 */
export async function getAdminProducts(params = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page);
  if (params.limit) query.append('limit', params.limit);
  if (params.category_id && params.category_id !== 'all') {
    query.append('category_id', params.category_id);
  }
  if (params.search && params.search.trim()) {
    query.append('search', params.search.trim());
  }

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return await fetchClient(`/products/admin-list${queryString}`, {
    method: 'GET',
  });
}

/**
 * Tính năng 5.2: Admin thêm bánh mới kèm Upload file ảnh
 * @param {FormData} formData - Gồm name, price, category_id, description, file (ảnh)
 */
export async function createProduct(formData) {
  return await fetchClient('/products', {
    method: 'POST',
    body: formData, // fetchClient tự động phát hiện FormData và không set Content-Type JSON
  });
}

/**
 * Tính năng 5.3: Admin chỉnh sửa thông tin bánh & đổi ảnh đại diện (UPDATE)
 * @param {string} productId
 * @param {FormData} formData - Gồm name, price, category_id, description, file (ảnh nếu có)
 */
export async function updateProduct(productId, formData) {
  return await fetchClient(`/products/${productId}`, {
    method: 'PUT',
    body: formData,
  });
}

/**
 * Tính năng 5.4: Admin xóa mềm bánh (Soft Delete bảo toàn đơn hàng)
 * @param {string} productId
 */
export async function deleteProduct(productId) {
  return await fetchClient(`/products/${productId}`, {
    method: 'DELETE',
  });
}

export * from './catalogApi';
