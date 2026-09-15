import { fetchClient } from './fetchClient';

//D02-1.1
/**
 * API Đăng ký tài khoản khách hàng mới
 * @param {Object} formData { full_name, email, password, phone }
 * @returns {Promise<Object>} { success, message, user }
 */
export async function registerUser(formData) {
  return await fetchClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}





//D02-1.2
/**
 * API Đăng nhập tài khoản & Nhận JWT Bearer Token
 * @param {Object} credentials { email, password }
 * @returns {Promise<Object>} { token, token_type, user }
 */
export async function loginUser(credentials) {
  return await fetchClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

/**
 * API Lấy thông tin tài khoản hiện tại (Protected)
 * @returns {Promise<Object>} user
 */
export async function getMe() {
  return await fetchClient('/auth/me', {
    method: 'GET',
  });
}

// D04-1.4: API kiểm tra quyền Quản trị viên (Admin Only)
/**
 * API Gọi endpoint bảo vệ chỉ dành cho Admin
 * @returns {Promise<Object>} { success, message, admin }
 */
export async function checkAdminOnly() {
  return await fetchClient('/auth/admin-only', {
    method: 'GET',
  });
}
