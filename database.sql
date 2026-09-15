-- 1. BẬT EXTENSION TẠO UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TẠO BẢNG USERS TỰ QUẢN LÝ (Thay thế auth.users của Supabase)
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,                
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    reset_token TEXT,                        
    reset_token_expiry TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TẠO BẢNG CATEGORIES (Danh mục bánh , bao gồm : Bánh sinh nhật , Bánh cupcake , bánh donut , bánh quy , phụ kiện bánh) 
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TẠO BẢNG PRODUCTS (Sản phẩm bánh)
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    price NUMERIC(12, 0) NOT NULL CHECK (price >= 0),
    image_url TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE, 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TẠO BẢNG ORDERS (Đơn hàng)
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL, 
    recipient_name TEXT NOT NULL,
    recipient_phone TEXT NOT NULL,
    recipient_email TEXT,
    delivery_address TEXT NOT NULL,
    delivery_date DATE NOT NULL,
    delivery_time_slot TEXT NOT NULL,
    greeting_card_message TEXT,
    payment_method TEXT NOT NULL DEFAULT 'DIRECT_MEETUP', 
    payment_status TEXT NOT NULL DEFAULT 'UNPAID' CHECK (payment_status IN ('UNPAID', 'PAID')),
    order_status TEXT NOT NULL DEFAULT 'PENDING' CHECK (order_status IN ('PENDING', 'CONFIRMED', 'DELIVERING', 'COMPLETED', 'CANCELLED')),
    total_amount NUMERIC(12, 0) NOT NULL CHECK (total_amount >= 0),
    paid_at TIMESTAMPTZ,                    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TẠO BẢNG ORDER_ITEMS (Chi tiết đơn hàng)
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,               
    unit_price NUMERIC(12, 0) NOT NULL CHECK (unit_price >= 0), 
    quantity INT NOT NULL CHECK (quantity > 0),
    subtotal NUMERIC(12, 0) NOT NULL CHECK (subtotal >= 0)
);

-- Chỉ mục tối ưu tốc độ truy vấn
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_orders_status ON public.orders(payment_status, order_status);
CREATE INDEX idx_orders_paid_at ON public.orders(paid_at);
CREATE INDEX idx_products_is_deleted ON public.products(is_deleted);