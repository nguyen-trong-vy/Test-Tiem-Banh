from typing import List, Optional
from fastapi import APIRouter, Query, status
from app.schemas.product import ProductResponse
from app.services.product import get_all_products

router = APIRouter(prefix="/api/products", tags=["Sản phẩm bánh (Products)"])

@router.get(
    "",
    response_model=List[ProductResponse],
    status_code=status.HTTP_200_OK,
    summary="Lấy danh sách sản phẩm bánh",
    description="Truy vấn danh sách 22 sản phẩm bánh từ bảng public.products trên Supabase. Hỗ trợ lọc theo category_slug và tìm kiếm theo tên bánh."
)
async def list_products(
    category: Optional[str] = Query(None, description="Lọc theo slug danh mục (ví dụ: banh-donut, banh-sinh-nhat)"),
    search: Optional[str] = Query(None, description="Tìm kiếm theo tên bánh")
):
    return await get_all_products(category_slug=category, search=search)
