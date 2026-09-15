from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

# Khoi tao ung dung FastAPI kem tai lieu truc quan Swagger UI
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Hệ thống Backend API cho Tiệm Bánh Của Vy (Yuu Cake) - FastAPI + Supabase",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Cau hinh CORS cho phep Frontend React ket noi
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Chào mừng đến với API Tiệm Bánh Của Vy!",
        "docs_url": "/docs",
        "health_check": "/api/health",
        "version": settings.VERSION
    }

@app.get("/api/health", tags=["Health Check"])
def health_check():
    """
    Endpoint kiem tra tinh trang hoat dong cua Backend FastAPI.
    """
    return {
        "status": "ok",
        "service": "Yuu Cake Backend",
        "version": settings.VERSION,
        "database": "Supabase PostgreSQL (Ready)",
        "storage": "Supabase Storage Bucket (cake-images)"
    }