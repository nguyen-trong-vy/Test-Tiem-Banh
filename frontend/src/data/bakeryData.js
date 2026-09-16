// Dữ liệu mẫu tập trung cho Yuu Cake (Tiệm Bánh Của Vy)
// Đồng bộ 100% với file seed.sql và các thư mục ảnh trong public/images

export const SLIDES_DATA = [
  {
    id: 1,
    type: 'image',
    src: '/images/slide/slide1.avif',
    tagline: 'BÁNH DÀNH CHO MÙA LỄ HỘI',
    title: 'Cùng nhau mở ra sự kỳ diệu!',
    ctaText: 'Khám phá Phụ kiện bánh',
    ctaLink: '#categories',
  },
  {
    id: 2,
    type: 'video',
    src: '/images/slide/slide2.mp4',
    tagline: 'TINH HOA NGHỆ THUẬT BÁNH NGỌT',
    title: 'Ngọt ngào từng khoảnh khắc!',
    ctaText: 'Xem Sản phẩm nổi bật',
    ctaLink: '#featured',
  },
  {
    id: 3,
    type: 'image',
    src: '/images/slide/slide3.avif',
    tagline: 'NGUYÊN LIỆU THƯỢNG HẠNG 100%',
    title: 'Hương vị chạm đến trái tim!',
    ctaText: 'Khám phá Bánh sinh nhật',
    ctaLink: '#categories',
  },
  {
    id: 4,
    type: 'image',
    src: '/images/slide/slide4.avif',
    tagline: 'BÁNH TƯƠI RA LÒ MỖI NGÀY',
    title: 'Món quà trọn vẹn yêu thương!',
    ctaText: 'Đặt bánh ngay',
    ctaLink: '#featured',
  },
  {
    id: 5,
    type: 'image',
    src: '/images/slide/slide5.avif',
    tagline: 'ĐẲNG CẤP TIỆM BÁNH THỦ CÔNG',
    title: 'Đậm đà phong vị Yuu Cake!',
    ctaText: 'Xem toàn bộ bánh',
    ctaLink: '#categories',
  }
];

export const TICKER_ITEMS = [
  { icon: '📞', text: 'Đặt bánh gọi ngay 0944100001' },
  { icon: '📦', text: 'Miễn phí vận chuyển trong phạm vi 2km' },
  { icon: '🎂', text: 'Bánh nướng tươi mỗi ngày, chuẩn vị thủ công' },
  { icon: '📞', text: 'Đặt bánh gọi ngay 09441000011' },
  { icon: '📦', text: 'Miễn phí vận chuyển trong phạm vi 2km' },
  { icon: '✨', text: 'Tặng kèm dao dĩa & nến nghệ thuật cho mỗi đơn bánh sinh nhật' }
];

export const CATEGORIES_DATA = [
  {
    id: 'banh-donut',
    slug: 'banh-donut',
    name: 'Bánh Donut',
    description: 'Miếng bánh tròn xoe, ngọt ngào, mềm xốp, ai cũng mê',
    image: '/images/danh mục sản phẩm/danh muc san pham 3.avif', // Bánh Donut
    count: 5
  },
  {
    id: 'phu-kien-banh',
    slug: 'phu-kien-banh',
    name: 'Phụ kiện bánh',
    description: 'Nến xoắn, thiệp chúc mừng và phụ kiện trang trí tiệc sinh nhật',
    image: '/images/danh mục sản phẩm/danh muc san pham 5.avif', // Phụ kiện bánh & thiệp
    count: 5
  },
  {
    id: 'banh-quy',
    slug: 'banh-quy',
    name: 'Bánh quy',
    description: 'Bánh quy bơ giòn rụm, béo ngậy chuẩn phong cách Pháp',
    image: '/images/danh mục sản phẩm/danh muc san pham 1.avif', // Đĩa bánh quy
    count: 4
  },
  {
    id: 'banh-sinh-nhat',
    slug: 'banh-sinh-nhat',
    name: 'Bánh sinh nhật',
    description: 'Kiệt tác bánh kem nghệ thuật sang trọng cho ngày đặc biệt',
    image: '/images/danh mục sản phẩm/danh muc san pham 4.avif', // Bánh sinh nhật socola
    count: 5
  },
  {
    id: 'banh-cupcake',
    slug: 'banh-cupcake',
    name: 'Bánh Cupcake',
    description: 'Chiếc bánh nhỏ xinh phủ kem bơ tươi mịn màng tan chảy',
    image: '/images/danh mục sản phẩm/danh muc san pham 2.avif', // Bánh Cupcake
    count: 4
  }
];

export const PRODUCTS_DATA = [
  // Bánh Sinh Nhật
  {
    id: 'p-sn-1',
    categorySlug: 'banh-sinh-nhat',
    categoryName: 'Bánh sinh nhật',
    name: 'Bánh sinh nhật Socola Cherry',
    slug: 'banh-sinh-nhat-socola-cherry',
    price: 630000,
    formattedPrice: '630.000đ',
    description: 'Tùy chỉnh bánh sinh nhật theo ý thích, tạo nên món quà ý nghĩa cho người thân cùng quả cherry đỏ mọng và lớp socola đậm đà.',
    image: '/images/sản phẩm nổi bật/banh sinh nhat.avif',
    isFeatured: true,
    rating: 5.0,
    sold: 142
  },
  {
    id: 'p-sn-2',
    categorySlug: 'banh-sinh-nhat',
    categoryName: 'Bánh sinh nhật',
    name: 'Bánh Socola mềm mịn',
    slug: 'banh-socola-mem-min',
    price: 650000,
    formattedPrice: '650.000đ',
    description: 'Tùy chỉnh bánh sinh nhật theo ý thích, cốt bánh mềm xốp phủ kem ganache socola bỉ thượng hạng.',
    image: '/images/bánh sinh nhật/sinh nhật 2.avif',
    isFeatured: true,
    rating: 4.9,
    sold: 98
  },
  {
    id: 'p-sn-3',
    categorySlug: 'banh-sinh-nhat',
    categoryName: 'Bánh sinh nhật',
    name: 'Bánh kem dâu tây hoàng gia',
    slug: 'banh-kem-dau-tay-hoang-gia',
    price: 580000,
    formattedPrice: '580.000đ',
    description: 'Bánh kem dâu tươi hảo hạng với lớp kem phô mai béo ngậy và những quả dâu tây tươi mọng nước.',
    image: '/images/bánh sinh nhật/sinh nhật 1.avif',
    isFeatured: false,
    rating: 4.8,
    sold: 86
  },
  {
    id: 'p-sn-4',
    categorySlug: 'banh-sinh-nhat',
    categoryName: 'Bánh sinh nhật',
    name: 'Bánh sinh nhật trái cây nhiệt đới',
    slug: 'banh-sinh-nhat-trai-cay-nhiet-doi',
    price: 620000,
    formattedPrice: '620.000đ',
    description: 'Sự kết hợp hoàn hảo giữa xoài, kiwi, nho tươi và cốt bông lan mềm mịn mát lành cho ngày sinh nhật rực rỡ.',
    image: '/images/bánh sinh nhật/sinh nhật 3.avif',
    isFeatured: false,
    rating: 4.9,
    sold: 74
  },
  {
    id: 'p-sn-5',
    categorySlug: 'banh-sinh-nhat',
    categoryName: 'Bánh sinh nhật',
    name: 'Bánh kem phô mai bắp thơm béo',
    slug: 'banh-kem-pho-mai-bap-thom-beo',
    price: 590000,
    formattedPrice: '590.000đ',
    description: 'Hương vị bắp ngọt thanh dịu kết hợp lớp kem phô mai thơm ngậy nịnh miệng, ăn hoài không ngán.',
    image: '/images/bánh sinh nhật/sinh nhật 4.avif',
    isFeatured: false,
    rating: 4.7,
    sold: 63
  },

  // Bánh Cupcake
  {
    id: 'p-cc-1',
    categorySlug: 'banh-cupcake',
    categoryName: 'Bánh Cupcake',
    name: 'Bánh CupCake đào',
    slug: 'banh-cupcake-dao',
    price: 45000,
    formattedPrice: '45.000đ',
    description: 'Tan chảy vị ngọt ngào của kem tươi, cốt bánh mềm mịn trong từng chiếc bánh nhỏ xinh vị đào dịu nhẹ.',
    image: '/images/sản phẩm nổi bật/banh cupcake.avif',
    isFeatured: true,
    rating: 4.9,
    sold: 215
  },
  {
    id: 'p-cc-2',
    categorySlug: 'banh-cupcake',
    categoryName: 'Bánh Cupcake',
    name: 'CupCake dâu tây kem tươi',
    slug: 'cupcake-dau-tay-kem-tuoi',
    price: 45000,
    formattedPrice: '45.000đ',
    description: 'Chiếc bánh nhỏ xinh với lớp kem bơ dâu hồng ngọt ngào, trang trí bằng hạt cốm rực rỡ.',
    image: '/images/bánh cupcake/cupcake1.png',
    isFeatured: false,
    rating: 4.8,
    sold: 180
  },
  {
    id: 'p-cc-3',
    categorySlug: 'banh-cupcake',
    categoryName: 'Bánh Cupcake',
    name: 'CupCake socola hạnh nhân',
    slug: 'cupcake-socola-hanh-nhan',
    price: 42000,
    formattedPrice: '42.000đ',
    description: 'Cốt bánh socola đen béo ngậy, phủ lớp kem chocolate mềm mịn và hạt hạnh nhân rang bùi thơm.',
    image: '/images/bánh cupcake/cupcake2.png',
    isFeatured: false,
    rating: 4.8,
    sold: 140
  },
  {
    id: 'p-cc-4',
    categorySlug: 'banh-cupcake',
    categoryName: 'Bánh Cupcake',
    name: 'CupCake Matcha đậu đỏ',
    slug: 'cupcake-matcha-dau-do',
    price: 48000,
    formattedPrice: '48.000đ',
    description: 'Hương trà xanh Uji thanh mát kết hợp lớp nhân đậu đỏ bùi ngọt truyền thống kiểu Nhật.',
    image: '/images/bánh cupcake/cupcake3.png',
    isFeatured: false,
    rating: 4.9,
    sold: 165
  },

  // Bánh Donut
  {
    id: 'p-dn-1',
    categorySlug: 'banh-donut',
    categoryName: 'Bánh Donut',
    name: 'Bánh Donut Socola',
    slug: 'banh-donut-socola',
    price: 53000,
    formattedPrice: '53.000đ',
    description: 'Bánh donut - Miếng bánh tròn xoe, ngọt ngào, mềm xốp, ai cũng mê đắm với sốt socola sánh mịn.',
    image: '/images/sản phẩm nổi bật/banh donut.avif',
    isFeatured: true,
    rating: 5.0,
    sold: 310
  },
  {
    id: 'p-dn-2',
    categorySlug: 'banh-donut',
    categoryName: 'Bánh Donut',
    name: 'Donut kem hồng cốm dâu',
    slug: 'donut-kem-hong-com-dau',
    price: 35000,
    formattedPrice: '35.000đ',
    description: 'Bánh donut chiên phồng xốp mềm phủ lớp men đường vị dâu hồng đáng yêu và cốm đủ sắc màu.',
    image: '/images/bánh donut/donut 1.avif',
    isFeatured: false,
    rating: 4.8,
    sold: 220
  },
  {
    id: 'p-dn-3',
    categorySlug: 'banh-donut',
    categoryName: 'Bánh Donut',
    name: 'Donut socola hạnh nhân giòn',
    slug: 'donut-socola-hanh-nhan-gion',
    price: 38000,
    formattedPrice: '38.000đ',
    description: 'Bánh donut mềm tơi ngập tràn trong lớp socola sữa và vụn hạnh nhân sấy giòn tan.',
    image: '/images/bánh donut/donut2.avif',
    isFeatured: false,
    rating: 4.9,
    sold: 195
  },
  {
    id: 'p-dn-4',
    categorySlug: 'banh-donut',
    categoryName: 'Bánh Donut',
    name: 'Donut socola sốt vani xoắn',
    slug: 'donut-socola-sot-vani-xoan',
    price: 35000,
    formattedPrice: '35.000đ',
    description: 'Cốt bánh mềm xốp nướng bơ vàng ươm cùng đường vân socola đen sánh quyện hài hòa.',
    image: '/images/bánh donut/donut 3.avif',
    isFeatured: false,
    rating: 4.7,
    sold: 154
  },
  {
    id: 'p-dn-5',
    categorySlug: 'banh-donut',
    categoryName: 'Bánh Donut',
    name: 'Donut caramel bắp rang bơ',
    slug: 'donut-caramel-bap-rang-bo',
    price: 40000,
    formattedPrice: '40.000đ',
    description: 'Sự kết hợp độc đáo giữa sốt caramel muối mặn béo ngậy và hạt bắp rang giòn thơm khó cưỡng.',
    image: '/images/bánh donut/donut 4.avif',
    isFeatured: false,
    rating: 4.8,
    sold: 132
  },

  // Bánh Quy
  {
    id: 'p-bq-1',
    categorySlug: 'banh-quy',
    categoryName: 'Bánh quy',
    name: 'Bánh quy bơ hạt dẻ giòn',
    slug: 'banh-quy-bo-hat-de-gion',
    price: 75000,
    formattedPrice: '75.000đ',
    description: 'Bánh quy giòn tan với nhân hạt dẻ cười nướng bùi béo, món ăn nhẹ hoàn hảo cho tiệc trà.',
    image: '/images/sản phẩm nổi bật/banh quy.avif',
    isFeatured: false,
    rating: 4.9,
    sold: 110
  },
  {
    id: 'p-bq-2',
    categorySlug: 'banh-quy',
    categoryName: 'Bánh quy',
    name: 'Bánh quy bơ socola chip',
    slug: 'banh-quy-bo-socola-chip',
    price: 65000,
    formattedPrice: '65.000đ',
    description: 'Bánh quy nướng bơ vàng ruộm điểm xuyết hạt chocolate chip Bỉ giòn rụm thơm lừng.',
    image: '/images/bánh quy/banhquy2.avif',
    isFeatured: false,
    rating: 4.8,
    sold: 175
  },
  {
    id: 'p-bq-3',
    categorySlug: 'banh-quy',
    categoryName: 'Bánh quy',
    name: 'Hộp bánh quy bơ thượng hạng',
    slug: 'hop-banh-quy-bo-thuong-hang',
    price: 120000,
    formattedPrice: '120.000đ',
    description: 'Hộp bánh quy bơ lạt kiểu Pháp giòn rụm béo ngậy, đóng gói sang trọng thích hợp làm quà tặng.',
    image: '/images/bánh quy/banhquy3.avif',
    isFeatured: false,
    rating: 5.0,
    sold: 89
  },
  {
    id: 'p-bq-4',
    categorySlug: 'banh-quy',
    categoryName: 'Bánh quy',
    name: 'Bánh quy yến mạch mật ong',
    slug: 'banh-quy-yen-mach-mat-ong',
    price: 55000,
    formattedPrice: '55.000đ',
    description: 'Bánh quy ngũ cốc yến mạch tốt cho sức khỏe, vị ngọt dịu nhẹ từ mật ong hoa rừng nguyên chất.',
    image: '/images/bánh quy/banhquy4.avif',
    isFeatured: false,
    rating: 4.7,
    sold: 94
  },

  // Phụ Kiện Bánh
  {
    id: 'p-pk-1',
    categorySlug: 'phu-kien-banh',
    categoryName: 'Phụ kiện bánh',
    name: 'Nến xoắn ánh kim cao cấp',
    slug: 'nen-xoan-anh-kim-cao-cap',
    price: 25000,
    formattedPrice: '25.000đ',
    description: 'Set nến nghệ thuật xoắn ốc mạ vàng ánh kim lấp lánh cho bữa tiệc sinh nhật thêm lung linh sang trọng.',
    image: '/images/phụ kiện bánh/phukien1.avif',
    isFeatured: false,
    rating: 4.9,
    sold: 230
  },
  {
    id: 'p-pk-2',
    categorySlug: 'phu-kien-banh',
    categoryName: 'Phụ kiện bánh',
    name: 'Thiệp chúc mừng handmade dễ thương',
    slug: 'thiep-chuc-mung-handmade-de-thuong',
    price: 20000,
    formattedPrice: '20.000đ',
    description: 'Thiệp giấy mỹ thuật cao cấp kèm phong bì xanh pastel dễ thương gửi gắm những lời chúc ý nghĩa.',
    image: '/images/phụ kiện bánh/phukien2.avif',
    isFeatured: false,
    rating: 4.8,
    sold: 190
  },
  {
    id: 'p-pk-3',
    categorySlug: 'phu-kien-banh',
    categoryName: 'Phụ kiện bánh',
    name: 'Set nón sinh nhật & pháo hoa giấy',
    slug: 'set-non-sinh-nhat-phao-hoa-giay',
    price: 35000,
    formattedPrice: '35.000đ',
    description: 'Bộ phụ kiện nón sinh nhật họa tiết đáng yêu cùng pháo giấy kim tuyến rộn ràng niềm vui.',
    image: '/images/phụ kiện bánh/phukien3.avif',
    isFeatured: false,
    rating: 4.8,
    sold: 145
  },
  {
    id: 'p-pk-4',
    categorySlug: 'phu-kien-banh',
    categoryName: 'Phụ kiện bánh',
    name: 'Bộ dao dĩa & đĩa giấy thân thiện',
    slug: 'bo-dao-dia-dia-giay-than-thien',
    price: 30000,
    formattedPrice: '30.000đ',
    description: 'Bộ dao cắt bánh chuyên dụng kèm dĩa muỗng giấy thân thiện với môi trường, tiện lợi cho mọi buổi tiệc.',
    image: '/images/phụ kiện bánh/phukien4.avif',
    isFeatured: false,
    rating: 4.9,
    sold: 210
  },
  {
    id: 'p-pk-5',
    categorySlug: 'phu-kien-banh',
    categoryName: 'Phụ kiện bánh',
    name: 'Thiệp mừng & Phụ kiện nến sinh nhật',
    slug: 'thiep-mung-va-phu-kien-nen-sinh-nhat',
    price: 25000,
    formattedPrice: '25.000đ',
    description: 'Gói combo thiệp chúc mừng thiết kế độc quyền và nến số sinh nhật theo yêu cầu.',
    image: '/images/sản phẩm nổi bật/phu kien banh.avif',
    isFeatured: false,
    rating: 4.9,
    sold: 160
  }
];

export const BLOG_POSTS_DATA = [
  {
    id: 1,
    tag: 'Tin tức',
    title: 'Giáng sinh ngập tràn - Nhận ưu đãi giảm giá',
    excerpt: 'Mùa Giáng Sinh an lành đang đến gần, không khí se lạnh hòa cùng niềm hân hoan của mỗi nhà. Tiệm bánh YuuCake gửi tặng bạn voucher khủng giảm tới 50% cho tất cả các mẫu bánh mùa lễ hội...',
    content: 'Những chiếc bánh khúc cây socola bồng bềnh, bánh kem ông già Noel và bánh quy gừng thơm lừng đã sẵn sàng trên kệ. Hãy ghé ngay tiệm bánh của Vy hoặc đặt hàng trực tuyến để nhận ưu đãi lên đến 50% ngay hôm nay!',
    image: '/images/blog/blog 1.avif',
    author: {
      name: 'Vy Vy (Chủ tiệm)',
      avatar: '/images/danh mục sản phẩm/danh muc san pham 1.avif'
    },
    date: '23/12/2024',
    isHero: true
  },
  {
    id: 2,
    tag: 'Mẹo hay',
    title: 'Bí quyết chọn size bánh sinh nhật vừa vặn cho từng bữa tiệc',
    excerpt: 'Làm thế nào để chọn chiếc bánh vừa vặn số lượng khách mà vẫn giữ trọn nét tinh tế, sang trọng? Cùng YuuCake khám phá hướng dẫn chọn bánh chuẩn xác...',
    content: 'Chọn bánh 16cm cho tiệc gia đình 4-6 người, 20cm cho nhóm bạn 8-12 người và bánh 2 tầng lộng lẫy cho các bữa tiệc sinh nhật đông vui trên 20 khách...',
    image: '/images/blog/blog 2.avif',
    author: {
      name: 'Yuu Baker',
      avatar: '/images/danh mục sản phẩm/danh muc san pham 2.avif'
    },
    date: '18/12/2024',
    isHero: false
  },
  {
    id: 3,
    tag: 'Câu chuyện',
    title: 'Hành trình tìm kiếm socola Bỉ thượng hạng cho chiếc bánh của Vy',
    excerpt: 'Mỗi chiếc bánh kem socola tại Yuu Cake đều khởi nguồn từ những thanh sô-cô-la Bỉ nguyên chất 70%, kết tinh hương vị đắng êm dịu và thơm ngậy khó quên...',
    content: 'Chúng tôi tin rằng nguyên liệu tử tế tạo nên hương vị chân thực. Từng mẻ kem ganache được khuấy bằng tay tỉ mỉ mỗi sáng để đảm bảo độ bóng mịn hoàn hảo...',
    image: '/images/blog/blog 3.avif',
    author: {
      name: 'Vy Vy (Chủ tiệm)',
      avatar: '/images/danh mục sản phẩm/danh muc san pham 1.avif'
    },
    date: '10/12/2024',
    isHero: false
  }
];
