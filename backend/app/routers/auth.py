from fastapi import APIRouter, Depends, status
from app.schemas.user import UserRegister, UserLogin, LoginResponse, UserResponse
from app.services.auth import register_user, login_user
from app.dependencies import get_current_user, require_admin

router = APIRouter(prefix="/api/auth", tags=["Xác thực (Auth)"])
#D02-1.1
@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
    summary="Đăng ký tài khoản khách hàng mới",
    description="Nhận thông tin người dùng, kiểm tra email trùng lặp, băm mật khẩu và tạo tài khoản mới trong cơ sở dữ liệu."
)
async def register(user_data: UserRegister):
    user = await register_user(user_data)
    return {
        "success": True,
        "message": "Đăng ký tài khoản thành công!",
        "user": user
    }

# D02-1.2: Đăng nhập tài khoản & Cấp phát JWT Token
@router.post(
    "/login",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
    summary="Đăng nhập tài khoản",
    description="Xác thực thông tin tài khoản (email & mật khẩu), trả về chuỗi JWT Bearer Token và dữ liệu người dùng."
)
async def login(credentials: UserLogin):
    return await login_user(credentials)

@router.get(
    "/me",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
    summary="Lấy thông tin tài khoản đang đăng nhập",
    description="Sử dụng JWT Bearer Token để lấy thông tin chi tiết của người dùng hiện tại."
)
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user

# D02-1.4: Phân quyền Truy cập Protected Route - Chỉ dành cho Admin
@router.get(
    "/admin-only",
    status_code=status.HTTP_200_OK,
    summary="Kiểm tra quyền Quản trị viên (Admin Only)",
    description="Endpoint kiểm thử phân quyền: Chỉ chấp nhận JWT Bearer Token có role là 'admin'. Nếu không có quyền sẽ trả về HTTP 403 Forbidden."
)
async def admin_only_test(admin_user: dict = Depends(require_admin)):
    return {
        "success": True,
        "message": "Xác thực thành công: Bạn có toàn quyền Quản trị viên!",
        "admin": admin_user
    }



