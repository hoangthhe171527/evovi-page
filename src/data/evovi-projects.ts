export type ProjectVerticalId =
  | "all"
  | "ooh-field"
  | "edtech-publishing"
  | "enterprise-lms"
  | "ai-workspace";

export type EvoviProjectItem = {
  id: string;
  code: string;
  name: string;
  vertical: Exclude<ProjectVerticalId, "all">;
  verticalLabel: string;
  tagline: string;
  problem: string;
  solution: string;
  architectureNote: string;
  repoClusterCount: number;
  repoHighlights: string[];
  stack: string[];
  metrics: Array<{ value: string; label: string }>;
  href?: string;
  hrefLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  scopePreset: string;
};

export const PROJECT_VERTICALS: Array<{
  id: ProjectVerticalId;
  label: string;
  count: number;
}> = [
  { id: "all", label: "Tất cả", count: 4 },
  { id: "ooh-field", label: "Thương mại & Hiện trường", count: 1 },
  { id: "edtech-publishing", label: "Giáo dục số", count: 1 },
  { id: "enterprise-lms", label: "Đào tạo Tập đoàn", count: 1 },
  { id: "ai-workspace", label: "Điều hành & AI", count: 1 },
];

/**
 * Dữ liệu tóm tắt phục vụ cấu trúc JSON-LD SEO của Evovi.
 */
export const EVOVI_PROJECTS: EvoviProjectItem[] = [
  {
    id: "ad-canvas",
    code: "PRJ-01",
    name: "Ad Canvas",
    vertical: "ooh-field",
    verticalLabel: "Thương mại & Hiện trường",
    tagline: "Nền tảng quản trị vị trí quảng cáo và nghiệm thu hiện trường trên Web & Mobile.",
    problem: "Quản lý vị trí rời rạc, dễ trùng lịch.",
    solution: "Đồng bộ lịch đặt chỗ và ảnh nghiệm thu tức thời.",
    architectureNote: "Web & Mobile đa tổ chức.",
    repoClusterCount: 2,
    repoHighlights: ["evo-adcanvas-doc", "vn.evovi.adcanvas"],
    stack: ["Web", "Mobile App", "Realtime"],
    metrics: [
      { value: "Đa vai trò", label: "Kinh doanh · Điều phối · Hiện trường" },
      { value: "Realtime", label: "Tồn kho & lịch đặt chỗ" },
      { value: "100%", label: "Ảnh nghiệm thu thực tế" },
    ],
    href: "/ad-canvas",
    hrefLabel: "Xem Ad Canvas",
    secondaryHref: "/ad-canvas/support",
    secondaryLabel: "Hỗ trợ",
    scopePreset: "Phần mềm quản lý kinh doanh và đội ngũ hiện trường",
  },
  {
    id: "elevator-360",
    code: "PRJ-03",
    name: "Elevator360",
    vertical: "ooh-field",
    verticalLabel: "ERP Kỹ thuật Công trình",
    tagline: "Hệ thống ERP/CRM quản trị lắp đặt và bảo trì thiết bị công trình.",
    problem: "Hợp đồng và lịch bảo trì rời rạc.",
    solution: "Điều phối kỹ thuật viên trên Web và ứng dụng di động.",
    architectureNote: "ERP đa công ty.",
    repoClusterCount: 4,
    repoHighlights: ["evo-elevator360-api", "evo-elevator360-web"],
    stack: ["ERP/CRM", "Mobile App", "Realtime"],
    metrics: [
      { value: "360°", label: "Khảo sát · Lắp đặt · Bảo trì" },
      { value: "Mobile", label: "App kỹ thuật viên" },
      { value: "Realtime", label: "Điều phối tức thời" },
    ],
    href: "/privacy/elevator-360",
    hrefLabel: "Chính sách Elevator360",
    scopePreset: "Hệ thống ERP/CRM quản lý dịch vụ kỹ thuật và bảo trì",
  },
];

export type FlagshipSlide = {
  id: string;
  title: string;
  domain: string;
  headline: string;
  summary: string;
  photoKey: "ooh" | "elevator" | "studio" | "factory";
  photoCaption: string;
  accentHex: string;
  livePanelTitle: string;
  liveStatus: string;
  liveRows: Array<{ label: string; meta: string; state: string; tone: "emerald" | "cobalt" | "orange" }>;
  kpis: Array<{ value: string; label: string }>;
  routeHref?: string;
  routeLabel?: string;
};

export const FLAGSHIP_SLIDES: FlagshipSlide[] = [
  {
    id: "enterprise-erp",
    title: "Quản trị & Vận hành Doanh nghiệp",
    domain: "ERP · CRM · Điều phối hiện trường",
    headline: "Số hóa quy trình từ văn phòng ra hiện trường",
    summary:
      "Evovi xây dựng hệ thống quản trị khớp đúng luồng việc của doanh nghiệp, kết nối kinh doanh, kế toán và đội ngũ hiện trường.",
    photoKey: "elevator",
    photoCaption: "Hệ thống vận hành đồng bộ giữa trung tâm điều hành và đội ngũ hiện trường.",
    accentHex: "#0b6ef3",
    livePanelTitle: "VẬN HÀNH DOANH NGHIỆP ĐỒNG BỘ",
    liveStatus: "THỜI GIAN THỰC",
    liveRows: [
      { label: "Kinh doanh & Hợp đồng", meta: "Báo giá, phê duyệt và theo dõi tiến độ", state: "Tự động hóa", tone: "emerald" },
      { label: "Ứng dụng Hiện trường", meta: "Cập nhật công việc và hình ảnh trên điện thoại", state: "Chạy cả khi mất sóng", tone: "cobalt" },
      { label: "Báo cáo Điều hành", meta: "Số liệu tổng hợp trực tiếp cho lãnh đạo", state: "Tức thời", tone: "orange" },
    ],
    kpis: [
      { value: "May đo", label: "Khớp 100% nghiệp vụ" },
      { value: "Web & App", label: "Trải nghiệm đồng nhất" },
      { value: "Bảo mật", label: "Phân quyền chặt chẽ" },
    ],
  },
  {
    id: "ooh-suite",
    title: "Thương mại & Dịch vụ Đô thị",
    domain: "Tồn kho · Đặt lịch · Nghiệm thu",
    headline: "Kiểm soát tài sản và lịch khai thác chính xác",
    summary:
      "Giải pháp quản lý tài sản, lịch đặt chỗ và nghiệm thu hình ảnh thực tế cho doanh nghiệp dịch vụ, truyền thông và vận tải.",
    photoKey: "ooh",
    photoCaption: "Quản lý tài sản thương mại và đội ngũ vận hành ngoài đô thị.",
    accentHex: "#f59422",
    livePanelTitle: "QUẢN TRỊ TÀI SẢN & DỊCH VỤ",
    liveStatus: "ĐỒNG BỘ TỨC THỜI",
    liveRows: [
      { label: "Quản lý Tồn kho & Lịch trống", meta: "Tránh trùng lịch, tối ưu công suất khai thác", state: "Chính xác 100%", tone: "emerald" },
      { label: "Nghiệm thu Di động", meta: "Xác thực hình ảnh và vị trí tại điểm triển khai", state: "Đã xác minh", tone: "cobalt" },
      { label: "Cổng Khách hàng & Đối tác", meta: "Theo dõi tiến độ minh bạch theo phân quyền", state: "Trực tuyến", tone: "orange" },
    ],
    kpis: [
      { value: "Đa kênh", label: "Web · iOS · Android" },
      { value: "Offline", label: "Lưu trữ bền bỉ" },
      { value: "Realtime", label: "Cập nhật tức thì" },
    ],
    routeHref: "/ad-canvas",
    routeLabel: "Xem sản phẩm Ad Canvas",
  },
  {
    id: "edtech-ecosystem",
    title: "Đào tạo & Tri thức Số",
    domain: "LMS Tập đoàn · Học liệu số · EdTech",
    headline: "Nền tảng đào tạo và đánh giá năng lực quy mô lớn",
    summary:
      "Thiết kế hệ thống đào tạo nội bộ cho tập đoàn, quản trị khung năng lực nhân sự và nền tảng xuất bản học liệu tương tác.",
    photoKey: "studio",
    photoCaption: "Không gian thiết kế kiến trúc phần mềm và nền tảng tri thức số tại Evovi.",
    accentHex: "#3cb34a",
    livePanelTitle: "ĐÀO TẠO & QUẢN TRỊ NĂNG LỰC",
    liveStatus: "CHỊU TẢI CAO",
    liveRows: [
      { label: "Khung Năng lực Nhân sự", meta: "Lộ trình đào tạo theo từng vị trí công việc", state: "Đa chi nhánh", tone: "emerald" },
      { label: "Học tập Đa thiết bị", meta: "Đồng bộ kết quả trên Web, Tablet và Điện thoại", state: "Mượt mà", tone: "cobalt" },
      { label: "Số hóa Tài liệu Nhanh", meta: "Công cụ biên tập và bóc tách nội dung thông minh", state: "Tiết kiệm 70% giờ", tone: "orange" },
    ],
    kpis: [
      { value: "Đa cấp", label: "Mô hình Tập đoàn" },
      { value: "Tương tác", label: "Trải nghiệm hiện đại" },
      { value: "Cloud", label: "Co giãn tự động" },
    ],
  },
  {
    id: "enterprise-ai-ops",
    title: "Trợ lý AI & Tự động hóa Nội bộ",
    domain: "AI Doanh nghiệp · Báo cáo thông minh",
    headline: "Đưa AI vào hỗ trợ công việc hằng ngày an toàn",
    summary:
      "Tích hợp trợ lý AI có kiểm duyệt vào quy trình doanh nghiệp: tự động bóc tách hồ sơ, tra cứu nội bộ và tổng hợp báo cáo.",
    photoKey: "factory",
    photoCaption: "Kết hợp con người và trợ lý AI trên một không gian vận hành thống nhất.",
    accentHex: "#0b6ef3",
    livePanelTitle: "TRỢ LÝ AI DOANH NGHIỆP",
    liveStatus: "AN TOÀN DỮ LIỆU",
    liveRows: [
      { label: "Bóc tách & Xử lý Tài liệu", meta: "Chuyển văn bản, biểu mẫu sang dữ liệu chuẩn", state: "Tự động", tone: "emerald" },
      { label: "Trợ lý Điều hành Nội bộ", meta: "Rà soát tiến độ và nhắc việc đúng người phụ trách", state: "Chủ động", tone: "cobalt" },
      { label: "Bảo mật Dữ liệu Doanh nghiệp", meta: "Cô lập dữ liệu riêng, không rò rỉ ra bên ngoài", state: "Kiểm soát 100%", tone: "orange" },
    ],
    kpis: [
      { value: "An toàn", label: "Bảo mật dữ liệu riêng" },
      { value: "< 1 giây", label: "Phản hồi nhanh" },
      { value: "Thực chất", label: "Bám sát nghiệp vụ" },
    ],
  },
];

export const TRANSFORMATION_BEATS = [
  {
    painTitle: "Dữ liệu rời rạc trên Excel và chat",
    painDesc:
      "Mất nhiều giờ gộp báo cáo, số liệu giữa các phòng ban lệch nhau.",
    systemTitle: "Hợp nhất trên một hệ thống",
    systemDesc:
      "Mọi bộ phận làm việc trên một nguồn dữ liệu chuẩn, cập nhật tức thời.",
    metricBefore: "Gộp báo cáo thủ công",
    metricAfter: "Số liệu tức thời",
    activeModule: "UNIFIED PLATFORM",
  },
  {
    painTitle: "Phần mềm đóng gói gò ép quy trình",
    painDesc:
      "Mua phần mềm có sẵn nhưng lệch nghiệp vụ, nhân sự ngại sử dụng.",
    systemTitle: "May đo khớp đúng quy trình",
    systemDesc:
      "Giao diện thiết kế riêng theo đúng thói quen và vai trò của từng nhân sự.",
    metricBefore: "Thao tác phức tạp",
    metricAfter: "3 chạm đúng việc",
    activeModule: "TAILORED UX",
  },
  {
    painTitle: "Đứt gãy thông tin ngoài hiện trường",
    painDesc:
      "Nhân sự di chuyển bên ngoài khó cập nhật tiến độ và hình ảnh.",
    systemTitle: "Ứng dụng di động mượt mà",
    systemDesc:
      "App iOS & Android thao tác một tay, lưu tốt cả khi mất sóng.",
    metricBefore: "Báo cáo qua tin nhắn",
    metricAfter: "Đồng bộ tự động",
    activeModule: "MOBILE FIRST",
  },
  {
    painTitle: "Khó nâng cấp khi công ty lớn lên",
    painDesc:
      "Hệ thống cũ chắp vá, dễ lỗi khi tăng nhân sự hoặc thêm tính năng.",
    systemTitle: "Kiến trúc bền vững, sẵn sàng AI",
    systemDesc:
      "Nền tảng vững chắc, dễ dàng mở rộng quy mô và tích hợp AI an toàn.",
    metricBefore: "Khó mở rộng",
    metricAfter: "Sẵn sàng tăng trưởng",
    activeModule: "SCALABLE & AI-READY",
  },
] as const;

export const CAPABILITIES = [
  {
    code: "CAP-A",
    title: "Tư vấn & Thiết kế Hệ thống",
    summary:
      "Cùng doanh nghiệp tháo gỡ điểm nghẽn và chuẩn hóa luồng nghiệp vụ trước khi lập trình.",
    deliverable: "Sơ đồ quy trình · Giao diện mẫu · Lộ trình rõ ràng",
  },
  {
    code: "CAP-B",
    title: "Phát triển Phần mềm Web & Quản trị",
    summary:
      "Xây dựng hệ thống điều hành, ERP, CRM và nền tảng đào tạo tốc độ cao, dễ sử dụng.",
    deliverable: "Cổng điều hành Web · Phân quyền đa cấp · Báo cáo trực tiếp",
  },
  {
    code: "CAP-C",
    title: "Phát triển Ứng dụng Di động",
    summary:
      "Làm ứng dụng iOS & Android gọn nhẹ cho khách hàng và đội ngũ nhân sự hiện trường.",
    deliverable: "iOS & Android · Chạy tốt khi mất sóng · Thông báo tức thời",
  },
  {
    code: "CAP-D",
    title: "Ứng dụng AI & Vận hành Cloud 24/7",
    summary:
      "Tích hợp trợ lý AI an toàn dữ liệu, thiết lập hạ tầng Cloud bảo mật và đồng hành dài hạn.",
    deliverable: "Trợ lý AI nội bộ · Hạ tầng Cloud · Hỗ trợ kỹ thuật 24/7",
  },
] as const;

export const DELIVERY_STEPS = [
  {
    phase: "BƯỚC 1",
    title: "Lắng nghe & Khảo sát",
    detail: "Nắm rõ bài toán và mục tiêu thực tế của doanh nghiệp.",
  },
  {
    phase: "BƯỚC 2",
    title: "Thiết kế Giải pháp",
    detail: "Chốt luồng nghiệp vụ và giao diện mẫu dễ hiểu.",
  },
  {
    phase: "BƯỚC 3",
    title: "Xây dựng & Ra bản dùng sớm",
    detail: "Bàn giao từng phần chạy thật sau mỗi 1–2 tuần.",
  },
  {
    phase: "BƯỚC 4",
    title: "Bàn giao & Đồng hành 24/7",
    detail: "Đào tạo nhân sự, vận hành ổn định và nâng cấp dài hạn.",
  },
] as const;
