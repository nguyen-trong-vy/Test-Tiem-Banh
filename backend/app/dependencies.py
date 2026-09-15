from fastapi import Header, HTTPException, status

async def get_current_user(authorization: str = Header(None)):
    """
    Dependency lay thong tin nguoi dung hien tai tu JWT Bearer Token.
    Se duoc hoan thien chi tiet o Nhanh 1 (Ngay 2 & Ngay 3).
    """
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Chưa đăng nhập hoặc thiếu Bearer Token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"id": "sample-id", "role": "user"}

async def require_admin(authorization: str = Header(None)):
    """
    Dependency kiem tra quyen Quan tri vien (Admin).
    """
    user = await get_current_user(authorization)
    if user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bạn không có quyền thực hiện thao tác này (Yêu cầu quyền Admin)"
        )
    return user