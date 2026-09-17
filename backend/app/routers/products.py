from typing import List, Optional
from fastapi import APIRouter, Depends, Query, File, Form, UploadFile, status
from app.schemas.product import ProductResponse, ProductPaginatedResponse
from app.services.product import (
    get_all_products,
    get_admin_products_paginated,
    create_product_service,
    update_product_service,
    soft_delete_product_service
)
from app.dependencies import require_admin

router = APIRouter(prefix="/api/products", tags=["Sản phẩm bánh (Products)"])

@router.get(
    "",
    response_model=List[ProductResponse],
    status_code=status.HTTP_200_OK,
    summary="Lấy danh sách sản phẩm bánh công khai",
    description="Truy vấn danh sách 22 sản phẩm bánh từ bảng public.products trên Supabase. Hỗ trợ lọc theo category_slug và tìm kiếm theo tên bánh."
)
async def list_products(
    category: Optional[str] = Query(None, description="Lọc theo slug danh mục (ví dụ: banh-donut, banh-sinh-nhat)"),
    search: Optional[str] = Query(None, description="Tìm kiếm theo tên bánh")
):
    return await get_all_products(category_slug=category, search=search)

@router.get(
    "/admin-list",
    response_model=ProductPaginatedResponse,
    status_code=status.HTTP_200_OK,
    summary="Tính năng 5.1: Admin xem danh sách bánh có phân trang",
    description="Yêu cầu quyền Quản trị viên (admin). Hỗ trợ phân trang, lọc theo category_id và tìm kiếm theo tên."
)
async def list_admin_products(
    page: int = Query(1, ge=1, description="Số trang (bắt đầu từ 1)"),
    limit: int = Query(10, ge=1, le=50, description="Số lượng mỗi trang"),
    category_id: Optional[str] = Query(None, description="Lọc theo ID danh mục"),
    search: Optional[str] = Query(None, description="Tìm kiếm theo tên bánh"),
    current_admin: dict = Depends(require_admin)
):
    return await get_admin_products_paginated(
        page=page,
        limit=limit,
        category_id=category_id,
        search=search
    )

@router.post(
    "",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Tính năng 5.2: Admin thêm bánh mới kèm upload ảnh",
    description="Yêu cầu quyền Quản trị viên (admin). Nhận dữ liệu multipart/form-data, upload ảnh lên Supabase Storage và lưu vào bảng products."
)
async def create_new_product(
    name: str = Form(..., description="Tên bánh"),
    price: float = Form(..., ge=0, description="Đơn giá bánh (VND)"),
    category_id: str = Form(..., description="ID danh mục bánh"),
    description: Optional[str] = Form(None, description="Mô tả bánh"),
    file: Optional[UploadFile] = File(None, description="Ảnh đại diện bánh"),
    current_admin: dict = Depends(require_admin)
):
    return await create_product_service(
        name=name,
        price=price,
        category_id=category_id,
        description=description,
        file=file
    )

@router.put(
    "/{product_id}",
    response_model=ProductResponse,
    status_code=status.HTTP_200_OK,
    summary="Tính năng 5.3: Admin chỉnh sửa thông tin bánh & đổi ảnh đại diện (UPDATE)",
    description="Yêu cầu quyền Quản trị viên. Nhận dữ liệu cập nhật, nếu có file ảnh mới thì upload và đổi image_url, nếu không thì giữ nguyên ảnh cũ."
)
async def update_product(
    product_id: str,
    name: str = Form(..., description="Tên bánh mới"),
    price: float = Form(..., ge=0, description="Đơn giá bánh mới"),
    category_id: str = Form(..., description="ID danh mục bánh"),
    description: Optional[str] = Form(None, description="Mô tả bánh"),
    file: Optional[UploadFile] = File(None, description="Ảnh đại diện mới (nếu muốn đổi)"),
    current_admin: dict = Depends(require_admin)
):
    return await update_product_service(
        product_id=product_id,
        name=name,
        price=price,
        category_id=category_id,
        description=description,
        file=file
    )

@router.delete(
    "/{product_id}",
    status_code=status.HTTP_200_OK,
    summary="Tính năng 5.4: Admin xóa mềm bánh (Soft Delete)",
    description="Yêu cầu quyền Quản trị viên. Cập nhật is_deleted=True, ẩn bánh khỏi thực đơn nhưng bảo toàn toàn bộ đơn hàng cũ."
)
async def delete_product(
    product_id: str,
    current_admin: dict = Depends(require_admin)
):
    return await soft_delete_product_service(product_id=product_id)
