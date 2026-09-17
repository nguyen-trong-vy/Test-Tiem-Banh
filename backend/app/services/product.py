import os
import re
import math
import uuid
import unicodedata
from pathlib import Path
from typing import List, Optional
from fastapi import HTTPException, UploadFile, status
from app.core.database import get_supabase
from app.core.config import settings

def slugify_vietnamese(text: str) -> str:
    """
    Chuyển đổi chuỗi tiếng Việt có dấu thành slug không dấu chuẩn URL.
    Ví dụ: 'Bánh Donut Dâu Tây' -> 'banh-donut-dau-tay'
    """
    text = text.lower().strip()
    text = text.replace('đ', 'd').replace('Đ', 'd')
    text = unicodedata.normalize('NFKD', text)
    text = ''.join(c for c in text if not unicodedata.combining(c))
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = re.sub(r'-+', '-', text).strip('-')
    return text or "banh"

async def upload_cake_image(file: UploadFile) -> str:
    """
    Upload file ảnh bánh lên Supabase Storage Bucket ('cake-images').
    Nếu có lỗi kết nối Bucket, tự động lưu fallback vào frontend/public/images/uploads/
    để đảm bảo hệ thống không bao giờ bị gián đoạn.
    """
    supabase = get_supabase()
    file_bytes = await file.read()
    ext = os.path.splitext(file.filename)[1].lower() if file.filename else ".jpg"
    if not ext or ext not in [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]:
        ext = ".jpg"

    filename = f"products/{uuid.uuid4()}{ext}"
    bucket_name = settings.SUPABASE_STORAGE_BUCKET or "cake-images"

    try:
        content_type = file.content_type or "image/jpeg"
        supabase.storage.from_(bucket_name).upload(
            filename,
            file_bytes,
            file_options={"content-type": content_type}
        )
        url = supabase.storage.from_(bucket_name).get_public_url(filename)
        return url
    except Exception as e:
        print(f"[WARN upload_cake_image] Supabase Storage upload không thành công ({e}). Lưu fallback vào public/images/uploads/...")
        try:
            # Lưu fallback vào thư mục public của Frontend
            upload_dir = Path(__file__).resolve().parent.parent.parent.parent / "frontend" / "public" / "images" / "uploads"
            upload_dir.mkdir(parents=True, exist_ok=True)
            local_name = f"{uuid.uuid4()}{ext}"
            target_file = upload_dir / local_name
            with open(target_file, "wb") as f:
                f.write(file_bytes)
            return f"/images/uploads/{local_name}"
        except Exception as local_err:
            print(f"[ERROR local save] {local_err}")
            return "/images/placeholder-cake.jpg"

async def get_all_products(
    category_slug: Optional[str] = None,
    search: Optional[str] = None
) -> List[dict]:
    """
    Truy vấn danh sách 22 sản phẩm từ bảng public.products (JOIN categories),
    chỉ lấy các món chưa bị xóa (is_deleted = False).
    Hỗ trợ lọc theo category_slug và tìm kiếm theo tên bánh.
    """
    supabase = get_supabase()
    try:
        query = supabase.table("products").select(
            "id, category_id, name, slug, description, price, image_url, is_deleted, created_at, categories(name, slug)"
        ).eq("is_deleted", False)

        if search and search.strip():
            query = query.ilike("name", f"%{search.strip()}%")

        res = query.order("created_at", desc=False).execute()
        products_raw = res.data or []

        result = []
        for p in products_raw:
            cat = p.get("categories") or {}
            c_name = cat.get("name") if isinstance(cat, dict) else None
            c_slug = cat.get("slug") if isinstance(cat, dict) else None

            if category_slug and category_slug != "all" and c_slug != category_slug:
                continue

            item = {
                "id": str(p.get("id")),
                "category_id": str(p.get("category_id")) if p.get("category_id") else None,
                "category_name": c_name,
                "category_slug": c_slug,
                "name": p.get("name"),
                "slug": p.get("slug"),
                "description": p.get("description"),
                "price": float(p.get("price") or 0),
                "image_url": p.get("image_url"),
                "is_deleted": p.get("is_deleted", False),
                "created_at": str(p.get("created_at")) if p.get("created_at") else None
            }
            result.append(item)

        return result
    except HTTPException:
        raise
    except Exception as e:
        print(f"[ERROR get_all_products] {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi khi truy vấn sản phẩm từ Supabase: {str(e)}"
        )

async def get_admin_products_paginated(
    page: int = 1,
    limit: int = 10,
    category_id: Optional[str] = None,
    search: Optional[str] = None
) -> dict:
    """
    Tính năng 5.1: Admin xem danh sách bánh kèm phân trang, tìm kiếm và lọc danh mục.
    """
    supabase = get_supabase()
    try:
        query = supabase.table("products").select(
            "id, category_id, name, slug, description, price, image_url, is_deleted, created_at, categories(name, slug)",
            count="exact"
        ).eq("is_deleted", False)

        if category_id and category_id.strip():
            query = query.eq("category_id", category_id.strip())

        if search and search.strip():
            query = query.ilike("name", f"%{search.strip()}%")

        offset = (page - 1) * limit
        res = query.order("created_at", desc=True).range(offset, offset + limit - 1).execute()

        total = res.count if res.count is not None else len(res.data or [])
        total_pages = max(1, math.ceil(total / limit))

        items = []
        for p in res.data or []:
            cat = p.get("categories") or {}
            c_name = cat.get("name") if isinstance(cat, dict) else None
            c_slug = cat.get("slug") if isinstance(cat, dict) else None

            items.append({
                "id": str(p.get("id")),
                "category_id": str(p.get("category_id")) if p.get("category_id") else None,
                "category_name": c_name,
                "category_slug": c_slug,
                "name": p.get("name"),
                "slug": p.get("slug"),
                "description": p.get("description"),
                "price": float(p.get("price") or 0),
                "image_url": p.get("image_url"),
                "is_deleted": p.get("is_deleted", False),
                "created_at": str(p.get("created_at")) if p.get("created_at") else None
            })

        return {
            "items": items,
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": total_pages
        }
    except Exception as e:
        print(f"[ERROR get_admin_products_paginated] {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi khi truy vấn danh sách bánh phân trang: {str(e)}"
        )

async def create_product_service(
    name: str,
    price: float,
    category_id: str,
    description: Optional[str] = None,
    file: Optional[UploadFile] = None
) -> dict:
    """
    Tính năng 5.2: Admin thêm bánh mới kèm upload ảnh lên Supabase Storage.
    """
    if not name or not name.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Tên bánh không được để trống.")
    if price < 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Đơn giá bánh không được âm.")

    supabase = get_supabase()

    # 1. Sinh slug và kiểm tra trùng lặp
    base_slug = slugify_vietnamese(name)
    slug = base_slug
    try:
        check = supabase.table("products").select("id").eq("slug", slug).execute()
        if check.data and len(check.data) > 0:
            slug = f"{base_slug}-{uuid.uuid4().hex[:6]}"
    except Exception:
        pass

    # 2. Upload ảnh nếu có
    image_url = None
    if file and file.filename:
        image_url = await upload_cake_image(file)

    # 3. Insert vào bảng public.products
    payload = {
        "name": name.strip(),
        "slug": slug,
        "price": price,
        "category_id": category_id,
        "description": description.strip() if description else None,
        "image_url": image_url,
        "is_deleted": False
    }

    try:
        res = supabase.table("products").insert(payload).execute()
        if not res.data or len(res.data) == 0:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Không thể lưu thông tin bánh vào cơ sở dữ liệu."
            )

        new_prod = res.data[0]
        # Lấy tên category
        cat_name = None
        cat_slug = None
        try:
            c_res = supabase.table("categories").select("name, slug").eq("id", category_id).execute()
            if c_res.data and len(c_res.data) > 0:
                cat_name = c_res.data[0].get("name")
                cat_slug = c_res.data[0].get("slug")
        except Exception:
            pass

        return {
            "id": str(new_prod.get("id")),
            "category_id": str(new_prod.get("category_id")),
            "category_name": cat_name,
            "category_slug": cat_slug,
            "name": new_prod.get("name"),
            "slug": new_prod.get("slug"),
            "description": new_prod.get("description"),
            "price": float(new_prod.get("price") or 0),
            "image_url": new_prod.get("image_url"),
            "is_deleted": new_prod.get("is_deleted", False),
            "created_at": str(new_prod.get("created_at")) if new_prod.get("created_at") else None
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"[ERROR create_product_service] {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Lỗi hệ thống khi thêm bánh mới: {str(e)}"
        )
