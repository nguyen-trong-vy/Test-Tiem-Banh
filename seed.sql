-- ==============================================================================
-- FILE SEED DỮ LIỆU MẪU CHO YUU CAKE (TIỆM BÁNH CỦA VY)
-- Áp dụng cho Cơ sở dữ liệu: Supabase / PostgreSQL
-- ==============================================================================

-- BƯỚC 1: XÓA DỮ LIỆU CŨ (NẾU CÓ) ĐỂ TRÁNH TRÙNG LẶP
DELETE FROM public.order_items;
DELETE FROM public.orders;
DELETE FROM public.products;
DELETE FROM public.categories;

-- ==============================================================================
-- BƯỚC 2: CHÈN 5 DANH MỤC SẢN PHẨM CHÍNH
-- ==============================================================================
INSERT INTO public.categories (name, slug) VALUES
('Bánh Sinh Nhật', 'banh-sinh-nhat'),
('Bánh Cupcake', 'banh-cupcake'),
('Bánh Donut', 'banh-donut'),
('Bánh Quy', 'banh-quy'),
('Phụ Kiện Bánh', 'phu-kien-banh');

-- ==============================================================================
-- BƯỚC 3: CHÈN TẤT CẢ SẢN PHẨM KÈM ẢNH TỪ CÁC THƯ MỤC
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. DANH MỤC: BÁNH SINH NHẬT
-- ------------------------------------------------------------------------------
INSERT INTO public.products (category_id, name, slug, description, price, image_url) VALUES
(
    (SELECT id FROM public.categories WHERE slug = 'banh-sinh-nhat'),
    'Bánh sinh nhật Socola Cherry',
    'banh-sinh-nhat-socola-cherry',
    'Tùy chỉnh bánh sinh nhật theo ý thích, tạo nên món quà ý nghĩa cho người thân cùng quả cherry đỏ mọng và lớp socola đậm đà.',
    630000,
    '/images/sản phẩm nổi bật/banh sinh nhat.avif'
),
(
    (SELECT id FROM public.categories WHERE slug = 'banh-sinh-nhat'),
    'Bánh Socola mềm mịn',
    'banh-socola-mem-min',
    'Tùy chỉnh bánh sinh nhật theo ý thích, cốt bánh mềm xốp phủ kem ganache socola bỉ thượng hạng.',
    650000,
    '/images/bánh sinh nhật/sinh nhật 2.avif'
),
(
    (SELECT id FROM public.categories WHERE slug = 'banh-sinh-nhat'),
    'Bánh kem dâu tây hoàng gia',
    'banh-kem-dau-tay-hoang-gia',
    'Bánh kem dâu tươi hảo hạng với lớp kem phô mai béo ngậy và những quả dâu tây tươi mọng nước.',
    580000,
    '/images/bánh sinh nhật/sinh nhật 1.avif'
),
(
    (SELECT id FROM public.categories WHERE slug = 'banh-sinh-nhat'),
    'Bánh sinh nhật trái cây nhiệt đới',
    'banh-sinh-nhat-trai-cay-nhiet-doi',
    'Sự kết hợp hoàn hảo giữa xoài, kiwi, nho tươi và cốt bông lan mềm mịn mát lành cho ngày sinh nhật rực rỡ.',
    620000,
    '/images/bánh sinh nhật/sinh nhật 3.avif'
),
(
    (SELECT id FROM public.categories WHERE slug = 'banh-sinh-nhat'),
    'Bánh kem phô mai bắp thơm béo',
    'banh-kem-pho-mai-bap-thom-beo',
    'Hương vị bắp ngọt thanh dịu kết hợp lớp kem phô mai thơm ngậy nịnh miệng, ăn hoài không ngán.',
    590000,
    '/images/bánh sinh nhật/sinh nhật 4.avif'
);

-- ------------------------------------------------------------------------------
-- 2. DANH MỤC: BÁNH CUPCAKE
-- ------------------------------------------------------------------------------
INSERT INTO public.products (category_id, name, slug, description, price, image_url) VALUES
(
    (SELECT id FROM public.categories WHERE slug = 'banh-cupcake'),
    'Bánh CupCake đào',
    'banh-cupcake-dao',
    'Tan chảy vị ngọt ngào của kem tươi, cốt bánh mềm mịn trong từng chiếc bánh nhỏ xinh vị đào dịu nhẹ.',
    45000,
    '/images/sản phẩm nổi bật/banh cupcake.avif'
),
(
    (SELECT id FROM public.categories WHERE slug = 'banh-cupcake'),
    'CupCake dâu tây kem tươi',
    'cupcake-dau-tay-kem-tuoi',
    'Chiếc bánh nhỏ xinh với lớp kem bơ dâu hồng ngọt ngào, trang trí bằng hạt cốm rực rỡ.',
    45000,
    '/images/bánh cupcake/cupcake1.png'
),
(
    (SELECT id FROM public.categories WHERE slug = 'banh-cupcake'),
    'CupCake socola hạnh nhân',
    'cupcake-socola-hanh-nhan',
    'Cốt bánh socola đen béo ngậy, phủ lớp kem chocolate mềm mịn và hạt hạnh nhân rang bùi thơm.',
    42000,
    '/images/bánh cupcake/cupcake2.png'
),
(
    (SELECT id FROM public.categories WHERE slug = 'banh-cupcake'),
    'CupCake Matcha đậu đỏ',
    'cupcake-matcha-dau-do',
    'Hương trà xanh Uji thanh mát kết hợp lớp nhân đậu đỏ bùi ngọt truyền thống kiểu Nhật.',
    48000,
    '/images/bánh cupcake/cupcake3.png'
);

-- ------------------------------------------------------------------------------
-- 3. DANH MỤC: BÁNH DONUT
-- ------------------------------------------------------------------------------
INSERT INTO public.products (category_id, name, slug, description, price, image_url) VALUES
(
    (SELECT id FROM public.categories WHERE slug = 'banh-donut'),
    'Bánh Donut Socola',
    'banh-donut-socola',
    'Bánh donut - Miếng bánh tròn xoe, ngọt ngào, mềm xốp, ai cũng mê đắm với sốt socola sánh mịn.',
    53000,
    '/images/sản phẩm nổi bật/banh donut.avif'
),
(
    (SELECT id FROM public.categories WHERE slug = 'banh-donut'),
    'Donut kem hồng cốm dâu',
    'donut-kem-hong-com-dau',
    'Bánh donut chiên phồng xốp mềm phủ lớp men đường vị dâu hồng đáng yêu và cốm đủ sắc màu.',
    35000,
    '/images/bánh donut/donut 1.avif'
),
(
    (SELECT id FROM public.categories WHERE slug = 'banh-donut'),
    'Donut socola hạnh nhân giòn',
    'donut-socola-hanh-nhan-gion',
    'Bánh donut mềm tơi ngập tràn trong lớp socola sữa và vụn hạnh nhân sấy giòn tan.',
    38000,
    '/images/bánh donut/donut2.avif'
),
(
    (SELECT id FROM public.categories WHERE slug = 'banh-donut'),
    'Donut socola sốt vani xoắn',
    'donut-socola-sot-vani-xoan',
    'Cốt bánh mềm xốp nướng bơ vàng ươm cùng đường vân socola đen sánh quyện hài hòa.',
    35000,
    '/images/bánh donut/donut 3.avif'
),
(
    (SELECT id FROM public.categories WHERE slug = 'banh-donut'),
    'Donut caramel bắp rang bơ',
    'donut-caramel-bap-rang-bo',
    'Sự kết hợp độc đáo giữa sốt caramel muối mặn béo ngậy và hạt bắp rang giòn thơm khó cưỡng.',
    40000,
    '/images/bánh donut/donut 4.avif'
);

-- ------------------------------------------------------------------------------
-- 4. DANH MỤC: BÁNH QUY
-- ------------------------------------------------------------------------------
INSERT INTO public.products (category_id, name, slug, description, price, image_url) VALUES
(
    (SELECT id FROM public.categories WHERE slug = 'banh-quy'),
    'Bánh quy bơ socola chip',
    'banh-quy-bo-socola-chip',
    'Bánh quy nướng bơ vàng ruộm điểm xuyết hạt chocolate chip Bỉ giòn rụm thơm lừng.',
    65000,
    '/images/bánh quy/banhquy2.avif'
),
(
    (SELECT id FROM public.categories WHERE slug = 'banh-quy'),
    'Hộp bánh quy bơ thượng hạng',
    'hop-banh-quy-bo-thuong-hang',
    'Hộp bánh quy bơ lạt kiểu Pháp giòn rụm béo ngậy, đóng gói sang trọng thích hợp làm quà tặng.',
    120000,
    '/images/bánh quy/banhquy3.avif'
),
(
    (SELECT id FROM public.categories WHERE slug = 'banh-quy'),
    'Bánh quy yến mạch mật ong',
    'banh-quy-yen-mach-mat-ong',
    'Bánh quy ngũ cốc yến mạch tốt cho sức khỏe, vị ngọt dịu nhẹ từ mật ong hoa rừng nguyên chất.',
    55000,
    '/images/bánh quy/banhquy4.avif'
),
(
    (SELECT id FROM public.categories WHERE slug = 'banh-quy'),
    'Bánh quy bơ hạt dẻ giòn',
    'banh-quy-bo-hat-de-gion',
    'Bánh quy giòn tan với nhân hạt dẻ cười nướng bùi béo, món ăn nhẹ hoàn hảo cho tiệc trà.',
    75000,
    '/images/sản phẩm nổi bật/banh quy.avif'
);

-- ------------------------------------------------------------------------------
-- 5. DANH MỤC: PHỤ KIỆN BÁNH
-- ------------------------------------------------------------------------------
INSERT INTO public.products (category_id, name, slug, description, price, image_url) VALUES
(
    (SELECT id FROM public.categories WHERE slug = 'phu-kien-banh'),
    'Nến xoắn ánh kim cao cấp',
    'nen-xoan-anh-kim-cao-cap',
    'Set nến nghệ thuật xoắn ốc mạ vàng ánh kim lấp lánh cho bữa tiệc sinh nhật thêm lung linh sang trọng.',
    25000,
    '/images/phụ kiện bánh/phukien1.avif'
),
(
    (SELECT id FROM public.categories WHERE slug = 'phu-kien-banh'),
    'Thiệp chúc mừng handmade dễ thương',
    'thiep-chuc-mung-handmade-de-thuong',
    'Thiệp giấy mỹ thuật cao cấp kèm phong bì xanh pastel dễ thương gửi gắm những lời chúc ý nghĩa.',
    20000,
    '/images/phụ kiện bánh/phukien2.avif'
),
(
    (SELECT id FROM public.categories WHERE slug = 'phu-kien-banh'),
    'Set nón sinh nhật & pháo hoa giấy',
    'set-non-sinh-nhat-phao-hoa-giay',
    'Bộ phụ kiện nón sinh nhật họa tiết đáng yêu cùng pháo giấy kim tuyến rộn ràng niềm vui.',
    35000,
    '/images/phụ kiện bánh/phukien3.avif'
),
(
    (SELECT id FROM public.categories WHERE slug = 'phu-kien-banh'),
    'Bộ dao dĩa & đĩa giấy thân thiện',
    'bo-dao-dia-dia-giay-than-thien',
    'Bộ dao cắt bánh chuyên dụng kèm dĩa muỗng giấy thân thiện với môi trường, tiện lợi cho mọi buổi tiệc.',
    30000,
    '/images/phụ kiện bánh/phukien4.avif'
),
(
    (SELECT id FROM public.categories WHERE slug = 'phu-kien-banh'),
    'Thiệp mừng & Phụ kiện nến sinh nhật',
    'thiep-mung-va-phu-kien-nen-sinh-nhat',
    'Gói combo thiệp chúc mừng thiết kế độc quyền và nến số sinh nhật theo yêu cầu.',
    25000,
    '/images/sản phẩm nổi bật/phu kien banh.avif'
);

-- ==============================================================================
-- HOÀN TẤT SEED DỮ LIỆU!
-- Kiểm tra lại bằng lệnh:
-- SELECT * FROM public.categories;
-- SELECT c.name AS danh_muc, p.name AS ten_banh, p.price, p.image_url 
-- FROM public.products p 
-- JOIN public.categories c ON p.category_id = c.id;
-- ==============================================================================
