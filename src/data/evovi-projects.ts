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
  { id: "all", label: "Tất cả hệ thống", count: 9 },
  { id: "ooh-field", label: "OOH & Hiện trường", count: 3 },
  { id: "edtech-publishing", label: "Giáo dục & Xuất bản số", count: 3 },
  { id: "enterprise-lms", label: "LMS Doanh nghiệp & Công", count: 1 },
  { id: "ai-workspace", label: "AI & Điều hành nội bộ", count: 2 },
];

/**
 * Toàn bộ 9 hệ thống sản phẩm thực tế tổng hợp từ 39 repository thuộc GitHub organization `evovi-vn`.
 * Không chứa thông tin nhạy cảm hay khóa nội bộ.
 */
export const EVOVI_PROJECTS: EvoviProjectItem[] = [
  {
    id: "ad-canvas",
    code: "PRJ-01",
    name: "Ad Canvas",
    vertical: "ooh-field",
    verticalLabel: "Quảng cáo ngoài trời (OOH)",
    tagline: "Nền tảng CRM, tồn kho vị trí và điều phối chiến dịch OOH đa kênh trên Web & Mobile",
    problem:
      "Doanh nghiệp thuê dài hạn xe buýt, taxi, pano, màn hình TTTM rồi chia kỳ hạn bán lại thường xuyên lệch lịch trống và thất thoát vị trí chưa khai thác.",
    solution:
      "Đồng bộ khép kín từ quản lý cơ hội, báo giá, hợp đồng đến bản đồ tồn kho occupancy theo thời gian thực và ứng dụng di động nghiệm thu ảnh tại hiện trường.",
    architectureNote:
      "Kiến trúc đa tổ chức (multi-tenant), ứng dụng di động phân quyền theo vai trò kinh doanh, điều phối viên và đội thi công hiện trường.",
    repoClusterCount: 2,
    repoHighlights: ["evo-adcanvas-doc", "vn.evovi.adcanvas"],
    stack: ["TypeScript", "Mobile App", "Multi-Tenant API", "Real-time Occupancy"],
    metrics: [
      { value: "4 vai trò", label: "Sales · Ops · Tài xế · Quản lý" },
      { value: "Realtime", label: "Tồn kho & lịch đặt chỗ" },
      { value: "100%", label: "Ảnh proof hiện trường" },
    ],
    href: "/ad-canvas",
    hrefLabel: "Xem trang sản phẩm Ad Canvas",
    secondaryHref: "/ad-canvas/support",
    secondaryLabel: "Trung tâm hỗ trợ",
    scopePreset: "Hệ thống quản lý OOH, tồn kho vị trí và ứng dụng nghiệm thu hiện trường tương tự Ad Canvas",
  },
  {
    id: "evo-adtracker",
    code: "PRJ-02",
    name: "Evo AdTracker",
    vertical: "ooh-field",
    verticalLabel: "Quảng cáo đội xe & Tuân thủ",
    tagline: "Hệ thống giám sát quảng cáo trên phương tiện, đối soát công-tơ-mét và duyệt ảnh tự động",
    problem:
      "Chiến dịch quảng cáo trên hàng trăm xe taxi và xe dịch vụ khó kiểm soát độ phủ thực tế, tài xế di chuyển ở vùng sóng yếu khiến dữ liệu check-in đứt quãng.",
    solution:
      "Kết hợp cổng Web một bề mặt phân quyền chi tiết (permission-based), backend DDD 10 module và ứng dụng Flutter ưu tiên ngoại tuyến (offline-first) cho tài xế.",
    architectureNote:
      "Tự động hóa hàng đợi xác minh ảnh check-in hằng ngày, đối soát mốc công-tơ-mét đầu/cuối tuần và xuất báo cáo tuân thủ minh bạch cho nhãn hàng.",
    repoClusterCount: 4,
    repoHighlights: [
      "evo-adtracker-api",
      "evo-adtracker-web",
      "evo-adtracker-driver-app",
      "evo-adtracker-docs",
    ],
    stack: ["Python DDD", "TypeScript", "Flutter Offline-First", "Auto Photo QA"],
    metrics: [
      { value: "10 module", label: "Kiến trúc miền DDD" },
      { value: "14 ngày", label: "Lưu vết hành trình tài xế" },
      { value: "Offline", label: "Đồng bộ bền bỉ khi mất sóng" },
    ],
    scopePreset: "Nền tảng quản lý đội xe, ứng dụng di động offline-first và đối soát hình ảnh tự động",
  },
  {
    id: "elevator-360",
    code: "PRJ-03",
    name: "Elevator360",
    vertical: "ooh-field",
    verticalLabel: "ERP/CRM Kỹ thuật Thang máy",
    tagline: "Hệ thống ERP/CRM đa tenant quản trị lắp đặt, bảo trì định kỳ và kỹ thuật viên hiện trường",
    problem:
      "Công ty thang máy quản lý rời rạc giữa hợp đồng lắp đặt, lịch bảo trì hàng nghìn thiết bị theo từng tòa nhà và biên bản nghiệm thu giấy dễ thất lạc.",
    solution:
      "Quản trị trọn vòng đời từ khảo sát, báo giá, dự án lắp đặt đến lệnh công việc (work order) bảo trì định kỳ trên Web thời gian thực và app Flutter cho kỹ thuật viên.",
    architectureNote:
      "Modular Monolith trên Laravel 12 + MongoDB + FrankenPHP, cập nhật trạng thái tức thời qua Laravel Reverb và lưu trữ ảnh nghiệm thu trước/sau tại công trình.",
    repoClusterCount: 4,
    repoHighlights: [
      "evo-elevator360-api",
      "evo-elevator360-web",
      "evo-elevator360-app",
      "evo-ele360-doc",
    ],
    stack: ["Laravel 12", "MongoDB", "FrankenPHP", "TypeScript", "Flutter"],
    metrics: [
      { value: "360°", label: "Khảo sát · Lắp đặt · Bảo trì" },
      { value: "Multi-tenant", label: "Cô lập dữ liệu từng công ty" },
      { value: "Realtime", label: "Điều phối lệnh kỹ thuật" },
    ],
    href: "/privacy/elevator-360",
    hrefLabel: "Chính sách & thông tin Elevator360",
    scopePreset: "Hệ thống ERP/CRM dịch vụ kỹ thuật, lịch bảo trì thiết bị và app kỹ thuật viên hiện trường",
  },
  {
    id: "evo-books-lms",
    code: "PRJ-04",
    name: "Evo Books LMS · Để Học Tốt",
    vertical: "edtech-publishing",
    verticalLabel: "Giáo dục số K-12",
    tagline: "Hệ sinh thái học tập và luyện tập tương tác đa nền tảng cho học sinh, giáo viên và nhà trường",
    problem:
      "Nền tảng học tập phổ thông cần xử lý hàng chục dạng câu hỏi tương tác phức tạp đồng nhất giữa Web và Mobile mà không bị lệch logic chấm điểm hay quá tải giờ cao điểm.",
    solution:
      "Kiến trúc Monorepo chuẩn hóa lõi giao diện và bộ máy làm bài tập (~20.000 dòng mã exercise player), chia sẻ xuyên suốt giữa ứng dụng học sinh, quản trị và app React Native/Expo.",
    architectureNote:
      "Vận hành trên hạ tầng AWS tự động hóa toàn diện bằng Terraform, Packer và GitHub Actions kèm bộ công cụ kiểm thử tự động chuyên biệt (evo-books-qa).",
    repoClusterCount: 7,
    repoHighlights: [
      "evo-books-web-mono",
      "evo-books-api",
      "evo-books-mobile",
      "evo-books-infra",
      "evo-books-qa",
    ],
    stack: ["TypeScript Monorepo", "React Native / Expo", "Laravel 12", "AWS Terraform"],
    metrics: [
      { value: "20K+ LOC", label: "Engine bài tập tương tác" },
      { value: "5 phân khu", label: "Học sinh · Giáo viên · Trường" },
      { value: "IaC AWS", label: "Hạ tầng tự động hóa" },
    ],
    scopePreset: "Xây dựng nền tảng học trực tuyến EdTech, luyện tập tương tác Web + Mobile quy mô lớn",
  },
  {
    id: "digital-workbooks",
    code: "PRJ-05",
    name: "Sách Bài Tập Số & Ed Composer",
    vertical: "edtech-publishing",
    verticalLabel: "Xuất bản số & Học liệu tương tác",
    tagline: "Chuỗi nền tảng sách bài tập số hóa, hệ thống biên tập LCMS và ứng dụng đọc sách đa thiết bị",
    problem:
      "Đơn vị xuất bản giáo dục cần phát hành song song nhiều thương hiệu học liệu số độc lập, vừa đảm bảo tốc độ tải tức thì vừa có công cụ biên tập cấu trúc bài học chuẩn xác.",
    solution:
      "Phát triển hệ thống quản trị nội dung học tập Ed Composer (LCMS), nhánh phát hành chuyên biệt cho sách bài tập số NXBGD, vở bài tập tương tác nhẹ và ứng dụng đọc sách Flutter.",
    architectureNote:
      "Tách nhánh phát hành độc lập từ lõi monorepo để nhiều thương hiệu vận hành song song không chặn lịch ra mắt của nhau.",
    repoClusterCount: 7,
    repoHighlights: [
      "evo-books-web-sbt",
      "nxbgd-sbt-digital",
      "ebd-learning-admin-web",
      "ebd-learning-reader-app",
      "ebd-learning-api",
    ],
    stack: ["React", "TypeScript", "Flutter Reader", "Laravel HMVC", "MongoDB"],
    metrics: [
      { value: "Đa thương hiệu", label: "Phát hành độc lập, không nghẽn" },
      { value: "LCMS + Reader", label: "Biên tập đến tay người đọc" },
      { value: "Đa thiết bị", label: "Web · Tablet · Điện thoại" },
    ],
    scopePreset: "Hệ thống xuất bản học liệu số, trình đọc sách điện tử và công cụ biên tập LCMS",
  },
  {
    id: "evo-studio-ai",
    code: "PRJ-06",
    name: "Evo Books Studio & Evo AI Service",
    vertical: "edtech-publishing",
    verticalLabel: "AI Số hóa Sách & Gia sư AI",
    tagline: "Xưởng số hóa sách bằng AI, hậu kiểm học liệu chuẩn hóa và dịch vụ AI thời gian thực có kiểm soát",
    problem:
      "Số hóa sách in sang học liệu tương tác tốn hàng tháng nhập liệu thủ công; đồng thời tích hợp AI trực tiếp vào LMS dễ gây nghẽn luồng và thiếu lớp kiểm duyệt an toàn học đường.",
    solution:
      "Xây dựng Evo Books Studio bóc tách nội dung sách tự động bằng AI kèm luồng duyệt QA trên trình soạn thảo TipTap, song hành cùng dịch vụ Evo AI Service độc lập.",
    architectureNote:
      "Evo AI Service vận hành bằng FastAPI + SSE streaming + hàng đợi bất đồng bộ Redis Streams, tích hợp JSON schema validator và lớp chắn an toàn (guardrails).",
    repoClusterCount: 4,
    repoHighlights: [
      "evo-studio-web",
      "evo-studio-be",
      "evo-studio-docs",
      "evo-ai-service",
    ],
    stack: ["FastAPI", "React 19", "TipTap Editor", "Redis Streams", "SSE Guardrails"],
    metrics: [
      { value: "3 tiến trình", label: "API · Async Worker · Keeper" },
      { value: "SSE Live", label: "Phản hồi gia sư AI tức thời" },
      { value: "QA Pipeline", label: "Bóc tách & xuất đa định dạng" },
    ],
    scopePreset: "Ứng dụng AI bóc tách tài liệu, quy trình duyệt QA và dịch vụ AI doanh nghiệp có kiểm soát",
  },
  {
    id: "enterprise-public-lms",
    code: "PRJ-07",
    name: "Enterprise · EVN · Public Sector LMS",
    vertical: "enterprise-lms",
    verticalLabel: "Đào tạo Tập đoàn & Khu vực công",
    tagline: "Bộ ba hệ thống quản trị năng lực, đào tạo tuân thủ doanh nghiệp lớn và bồi dưỡng quy mô quốc gia",
    problem:
      "Các tổng công ty nhiều đơn vị thành viên và cơ quan nhà nước cần quản trị khung năng lực, đào tạo tuân thủ và tập huấn hàng chục nghìn cán bộ nhưng dữ liệu phân tán.",
    solution:
      "Thiết kế chuyên sâu 3 dòng sản phẩm: LMS Doanh nghiệp đa đơn vị, Hệ thống Quản trị năng lực & Đào tạo ngành Điện lực (EVNHCMC), và Public Sector LMS cho tập huấn diện rộng.",
    architectureNote:
      "Chuẩn hóa ma trận quy tắc nghiệp vụ chặt chẽ theo từng vị trí việc làm, tích hợp liền mạch với hệ thống nhân sự hiện hữu và báo cáo điều hành đa cấp.",
    repoClusterCount: 5,
    repoHighlights: [
      "evo-enterprise-lms-web",
      "evo-enterprise-lms-api",
      "evo-evn-lms-docs",
      "evo-public-sector-lms-docs",
      "evo-enterprise-lms-docs",
    ],
    stack: ["TypeScript", "Laravel 12", "Competency Matrix", "Multi-Org RBAC"],
    metrics: [
      { value: "3 mô hình", label: "Tập đoàn · Điện lực · Công vụ" },
      { value: "Đa cấp", label: "Phân quyền theo đơn vị & vị trí" },
      { value: "Data-driven", label: "Khung năng lực & tuân thủ" },
    ],
    scopePreset: "Hệ thống LMS đào tạo nội bộ, khung năng lực nhân sự cho tập đoàn hoặc tổ chức quy mô lớn",
  },
  {
    id: "evohub",
    code: "PRJ-08",
    name: "EvoHub",
    vertical: "ai-workspace",
    verticalLabel: "Không gian Vận hành Agent-Ready",
    tagline: "Nền tảng SaaS điều hành nội bộ đa tenant thiết kế đồng thời cho con người và tác nhân AI",
    problem:
      "Phần mềm quản lý công việc truyền thống chỉ thiết kế cho thao tác bấm chuột thủ công, khiến việc tự động hóa bằng AI về sau phải chắp vá và thiếu kiểm soát quyền hạn.",
    solution:
      "Hợp nhất Portfolio, Project, Task, hộp thư Intake và Identity trên Web & Flutter Mobile, nơi mọi hành động đều đi qua Capability Registry dùng chung cho cả UI và giao thức MCP.",
    architectureNote:
      "Kiến trúc Command Layer + Outbox + Activity Events đảm bảo mọi thao tác của nhân sự hay AI Agent đều minh bạch, đúng quyền tenant và lưu vết kiểm toán đầy đủ.",
    repoClusterCount: 4,
    repoHighlights: ["evohub-web", "evohub-api", "evohub-mobile", "evohub-docs"],
    stack: ["TypeScript", "Flutter (iOS/Android)", "MCP Surface", "Outbox Architecture"],
    metrics: [
      { value: "Dual-Surface", label: "Human UI + AI Agent MCP" },
      { value: "7 phân hệ", label: "Work · Intake · Identity · CRM" },
      { value: "iOS & Android", label: "Ứng dụng di động đồng bộ" },
    ],
    scopePreset: "Nền tảng quản trị vận hành nội bộ đa chi nhánh kết hợp tự động hóa AI Agent (Agent-Ready)",
  },
  {
    id: "evo-chief",
    code: "PRJ-09",
    name: "Evo Chief & Spec-Driven Skills",
    vertical: "ai-workspace",
    verticalLabel: "AI Điều hành & Kỹ thuật AI-Native",
    tagline: "Trợ lý Chánh văn phòng AI chủ động giám sát danh mục dự án và bộ quy chuẩn kỹ thuật AI-Native",
    problem:
      "Lãnh đạo điều hành song song 5 đến 15 dự án thường bị trễ thông tin do báo cáo rời rạc, phải tự đi hỏi tiến độ từng đầu mối mỗi tuần.",
    solution:
      "Evo Chief tự động đối chiếu bộ nhớ dự án (git-backed memory), phát hiện khoảng trống thông tin bằng tập luật định sẵn, chủ động hỏi đúng người và tổng hợp bản tin điều hành mỗi sáng.",
    architectureNote:
      "Đi kèm kho kỹ năng kỹ thuật dùng chung (evo-skills) giúp toàn bộ đội ngũ kỹ sư Evovi vận hành nhất quán theo phương pháp luận Spec-Driven AI-Native.",
    repoClusterCount: 3,
    repoHighlights: ["evo-chief-agent", "evo-chief-memory", "evo-skills"],
    stack: ["Python", "Rule-Based Gap Detection", "Git Memory", "Spec-Driven Methodology"],
    metrics: [
      { value: "5-15 dự án", label: "Giám sát danh mục song song" },
      { value: "Mỗi sáng", label: "Bản tin điều hành tự động" },
      { value: "6 bất biến", label: "Chuẩn Spec-Driven toàn đội" },
    ],
    scopePreset: "Trợ lý AI điều hành doanh nghiệp, tự động rà soát tiến độ và tổng hợp báo cáo cho lãnh đạo",
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
    id: "ooh-suite",
    title: "Ad Canvas & Evo AdTracker",
    domain: "Quảng cáo ngoài trời (OOH) · Vận tải",
    headline: "Điều phối vị trí OOH và đội xe tức thời",
    summary:
      "Từ bài toán chia kỳ hạn bán lại pano/màn hình LED đến đối soát công-tơ-mét và duyệt ảnh check-in ngoại tuyến trên xe taxi: toàn bộ vận hành trên một luồng dữ liệu duy nhất.",
    photoKey: "ooh",
    photoCaption: "Hệ sinh thái OOH Ad Canvas & Evo AdTracker vận hành từ trung tâm thương mại đến đội xe đô thị.",
    accentHex: "#f59422",
    livePanelTitle: "OOH TELEMETRY · CHIẾN DỊCH ĐÔ THỊ",
    liveStatus: "98.4% ĐỘ PHỦ XÁC MINH",
    liveRows: [
      { label: "Pano LED Trung tâm Quận 1", meta: "Occupancy Q4 · Đã khóa lịch", state: "100% Lấp đầy", tone: "emerald" },
      { label: "Đội xe Taxi TP.HCM (420 xe)", meta: "Đối soát Odometer tuần 44", state: "Đã xác minh", tone: "cobalt" },
      { label: "Tuyến Bus Thương mại Hà Nội", meta: "18 ảnh nghiệm thu mới tải lên", state: "Đang duyệt tự động", tone: "orange" },
    ],
    kpis: [
      { value: "6 Repo", label: "Web · Python DDD · Flutter" },
      { value: "Offline", label: "Chụp proof vùng sóng yếu" },
      { value: "Realtime", label: "Tồn kho & tỷ lệ lấp đầy" },
    ],
    routeHref: "/ad-canvas",
    routeLabel: "Khám phá Ad Canvas",
  },
  {
    id: "elevator-360",
    title: "Elevator360",
    domain: "ERP/CRM Đa Tenant · Kỹ thuật Công trình",
    headline: "Quản trị lắp đặt và bảo trì từng thang máy",
    summary:
      "Kết nối phòng kinh doanh, kế toán hợp đồng và đội kỹ thuật viên hiện trường. Mỗi thiết bị tại từng tòa nhà đều có hồ sơ bảo trì, lịch điều phối và ảnh nghiệm thu trước/sau minh bạch.",
    photoKey: "elevator",
    photoCaption: "Quản trị trọn vòng đời dự án lắp đặt và bảo trì thang máy cao tầng với Elevator360.",
    accentHex: "#0b6ef3",
    livePanelTitle: "ELEVATOR360 · ĐIỀU PHỐI KỸ THUẬT",
    liveStatus: "ĐỒNG BỘ REVERB REALTIME",
    liveRows: [
      { label: "Cụm thang Tháp Văn phòng A", meta: "Bảo trì định kỳ chu kỳ 30 ngày", state: "Hoàn tất nghiệm thu", tone: "emerald" },
      { label: "Dự án Tổ hợp Căn hộ Thủ Đức", meta: "Lắp đặt 8 thang tốc độ cao", state: "Đúng tiến độ GĐ3", tone: "cobalt" },
      { label: "Lệnh ứng cứu kỹ thuật #EL-409", meta: "Kỹ thuật viên cách 1.8km", state: "Đã nhận lệnh", tone: "orange" },
    ],
    kpis: [
      { value: "Laravel 12", label: "FrankenPHP + MongoDB" },
      { value: "Flutter App", label: "Nghiệm thu tại công trình" },
      { value: "Multi-tenant", label: "Tách biệt dữ liệu tuyệt đối" },
    ],
    routeHref: "/privacy/elevator-360",
    routeLabel: "Xem hồ sơ Elevator360",
  },
  {
    id: "edtech-ecosystem",
    title: "Evo Books · Xuất bản số & AI",
    domain: "Giáo dục K-12 · LCMS · AI Guardrails",
    headline: "Số hóa sách in thành học liệu và gia sư AI",
    summary:
      "Hệ sinh thái 18 repository kết hợp nền tảng Để Học Tốt, sách bài tập số NXBGD, xưởng bóc tách học liệu Evo Books Studio và dịch vụ Evo AI phản hồi tức thời qua luồng SSE.",
    photoKey: "studio",
    photoCaption: "Quy trình chuẩn hóa cấu trúc học liệu số và kiến trúc mô-đun dùng chung tại Evovi.",
    accentHex: "#3cb34a",
    livePanelTitle: "EVO BOOKS & STUDIO · PIPELINE HỌC LIỆU",
    liveStatus: "AI GUARDRAILS HOẠT ĐỘNG",
    liveRows: [
      { label: "Evo Books Exercise Engine", meta: "Monorepo @/core · Web & Expo", state: "Đồng bộ 100%", tone: "emerald" },
      { label: "Evo Studio AI Extraction", meta: "Bóc tách & hậu kiểm chương mục", state: "Xuất chuẩn JSON", tone: "cobalt" },
      { label: "Evo AI Tutor Stream (SSE)", meta: "Kiểm duyệt an toàn & định mức", state: "Phản hồi < 400ms", tone: "orange" },
    ],
    kpis: [
      { value: "18 Repo", label: "LMS · SBT · Studio · AI · IaC" },
      { value: "20K+ LOC", label: "Lõi tương tác bài tập" },
      { value: "AWS IaC", label: "Terraform & Packer CI/CD" },
    ],
  },
  {
    id: "enterprise-ai-ops",
    title: "Enterprise LMS · EvoHub · Evo Chief",
    domain: "Quản trị Năng lực · SaaS Agent-Ready",
    headline: "Nền tảng điều hành chung cho người và AI",
    summary:
      "Từ hệ thống Quản trị năng lực & Đào tạo ngành Điện lực, LMS Khu vực công đến không gian làm việc EvoHub chuẩn MCP và trợ lý Chánh văn phòng Evo Chief theo dõi 15 dự án song song.",
    photoKey: "factory",
    photoCaption: "Nền tảng vận hành số và quản trị năng lực cho các tổ chức đa đơn vị.",
    accentHex: "#0b6ef3",
    livePanelTitle: "EVOHUB & EVO CHIEF · TRUNG TÂM ĐIỀU HÀNH",
    liveStatus: "MCP CAPABILITY REGISTRY SẴN SÀNG",
    liveRows: [
      { label: "Khung năng lực & Đào tạo Tập đoàn", meta: "Đánh giá tuân thủ đa đơn vị", state: "Đạt chuẩn SLA", tone: "emerald" },
      { label: "EvoHub Portfolio & Intake", meta: "Đồng bộ Web · Flutter · MCP Agent", state: "0 xung đột quyền", tone: "cobalt" },
      { label: "Evo Chief Morning Executive Brief", meta: "Quét 12 dự án · Phát hiện 2 điểm nghẽn", state: "Đã gửi lúc 07:30", tone: "orange" },
    ],
    kpis: [
      { value: "12 Repo", label: "LMS · EvoHub · Evo Chief" },
      { value: "Dual-Surface", label: "Giao diện Người dùng + MCP" },
      { value: "Spec-Driven", label: "Kiểm soát nghiệp vụ gốc" },
    ],
  },
];

export const TRANSFORMATION_BEATS = [
  {
    painTitle: "Dữ liệu tản mát trên Excel và chat",
    painDesc:
      "Nhân sự mất hàng giờ mỗi tuần để gộp file báo cáo, số liệu giữa kinh doanh - kho - kế toán lệch nhau ngay khi quy mô vượt 30 người.",
    systemTitle: "Một nguồn dữ liệu chuẩn duy nhất",
    systemDesc:
      "Mọi giao dịch từ báo giá, hợp đồng đến nghiệm thu tự động liên thông theo thời gian thực, phân quyền chính xác tới từng thao tác.",
    metricBefore: "4-6 giờ đối soát/ngày",
    metricAfter: "Tức thời · 0 nhập lặp",
    activeModule: "IDENTITY & UNIFIED LEDGER",
  },
  {
    painTitle: "Phần mềm đóng gói gò ép quy trình",
    painDesc:
      "Mua phần mềm có sẵn nhưng chỉ dùng được 30% tính năng, phần nghiệp vụ đặc thù quan trọng nhất lại phải quay về xử lý thủ công bên ngoài.",
    systemTitle: "Luồng nghiệp vụ may đo theo vai trò",
    systemDesc:
      "Evovi đặc tả hóa đúng luồng vận hành thực tế của doanh nghiệp thành giao diện tinh gọn: nhân sự không rành kỹ thuật mở lên là thao tác được ngay.",
    metricBefore: "11 bước vòng vèo",
    metricAfter: "3 chạm đúng vai trò",
    activeModule: "SPEC-DRIVEN WORKFLOW ENGINE",
  },
  {
    painTitle: "Đứt gãy giữa điều hành và hiện trường",
    painDesc:
      "Tài xế, kỹ thuật viên bảo trì hay đội thi công OOH làm việc ngoài đường sóng yếu, gửi ảnh qua chat dễ thất lạc và không thể kiểm chứng.",
    systemTitle: "App hiện trường ưu tiên ngoại tuyến",
    systemDesc:
      "Ứng dụng Flutter / React Native lưu đệm bền bỉ khi mất mạng, tự đồng bộ ảnh chụp kèm mốc thời gian và kiểm duyệt tự động ngay khi có sóng.",
    metricBefore: "Thất lạc minh chứng",
    metricAfter: "99.8% đồng bộ hiện trường",
    activeModule: "FIELD MOBILE & AUTO-VERIFY",
  },
  {
    painTitle: "Hệ thống cũ chắp vá, khó mở rộng",
    painDesc:
      "Thiếu tài liệu đặc tả gốc và kiến trúc tách lớp khiến mỗi lần thêm tính năng mới đều phát sinh lỗi dây chuyền, không thể tích hợp AI an toàn.",
    systemTitle: "Kiến trúc Spec-Driven sẵn sàng AI",
    systemDesc:
      "Mọi hệ thống Evovi đều khởi nguồn từ bộ đặc tả nghiệp vụ sống, kiểm thử tự động và hạ tầng chuẩn hóa, sẵn sàng mở rộng quy mô 10x và kết nối AI.",
    metricBefore: "Rủi ro gián đoạn cao",
    metricAfter: "Sẵn sàng mở rộng & AI",
    activeModule: "TERRAFORM CLOUD & AI GUARDRAILS",
  },
] as const;

export const CAPABILITIES = [
  {
    code: "CAP-A",
    title: "Tư vấn & Đặc tả nghiệp vụ Spec-Driven",
    summary:
      "Ngồi cùng lãnh đạo và đội vận hành để bóc tách điểm nghẽn, chuyển hóa quy tắc kinh doanh thành bộ đặc tả chuẩn xác trước khi viết dòng code đầu tiên.",
    deliverable: "Product Brief · Ma trận quy tắc nghiệp vụ · Prototype luồng thật",
  },
  {
    code: "CAP-B",
    title: "Phát triển Hệ thống Web & SaaS Đa Tenant",
    summary:
      "Xây dựng ERP, CRM, LMS và cổng điều hành tốc độ cao với phân quyền chi tiết theo đơn vị, chịu tải lớn và giao diện sắc nét trên mọi kích thước màn hình.",
    deliverable: "React 19 / TypeScript · Laravel 12 / Python FastAPI · Multi-tenant RBAC",
  },
  {
    code: "CAP-C",
    title: "Ứng dụng Di động Hiện trường (iOS & Android)",
    summary:
      "Phát triển app Flutter và React Native tối ưu cho đội ngũ di chuyển liên tục: thao tác một tay, hoạt động ngoại tuyến bền bỉ, chụp ảnh nghiệm thu chuẩn xác.",
    deliverable: "Flutter / Expo · Lưu trữ Offline-First · Push Notification theo sự kiện",
  },
  {
    code: "CAP-D",
    title: "Tích hợp AI Chuyên dụng & Tác nhân Điều hành",
    summary:
      "Triển khai dịch vụ AI bóc tách tài liệu, gia sư/trợ lý chuyên ngành và Chief-of-Staff Agent có lớp kiểm soát an toàn (guardrails), không lộ lọt dữ liệu nội bộ.",
    deliverable: "FastAPI SSE · Async Worker · MCP Capability Registry · JSON Validator",
  },
  {
    code: "CAP-E",
    title: "Kết nối API & Hiện đại hóa Hệ thống Di sản",
    summary:
      "Đồng bộ dữ liệu hai chiều giữa phần mềm hiện hữu, kế toán, thanh toán, thiết bị công trình và tái cấu trúc các hệ thống cũ chậm chạp mà không làm gián đoạn kinh doanh.",
    deliverable: "API Gateway · Outbox Event Sync · Tối ưu truy vấn & chuyển đổi dữ liệu",
  },
  {
    code: "CAP-F",
    title: "Hạ tầng Cloud IaC & Bảo mật 24/7",
    summary:
      "Thiết lập hạ tầng AWS/Cloud bằng mã nguồn (IaC), đường ống CI/CD không gián đoạn, sao lưu định kỳ, giám sát lỗi chủ động và đồng hành kỹ thuật 24/7.",
    deliverable: "Terraform / Docker · Giám sát SLA · Phân quyền & Sao lưu tự động",
  },
] as const;

export const DELIVERY_STEPS = [
  {
    phase: "CHẨN ĐOÁN",
    title: "Tiếp nhận & Khảo sát thực địa",
    detail: "Lắng nghe đúng chỗ đang vướng của từng phòng ban, đo lường chi phí thời gian đang thất thoát.",
  },
  {
    phase: "ĐẶC TẢ",
    title: "Chốt Product Brief & Luồng nghiệp vụ",
    detail: "Mô hình hóa quy tắc kinh doanh, phân quyền và màn hình mẫu dễ hiểu để hai bên thống nhất 100%.",
  },
  {
    phase: "KIẾN TRÚC",
    title: "Thiết kế Dữ liệu & Giao diện thực chiến",
    detail: "Thiết lập mô hình dữ liệu mở rộng dài hạn, chuẩn hóa Design System riêng cho thương hiệu khách hàng.",
  },
  {
    phase: "XÂY DỰNG",
    title: "Phát triển theo Sprint · Ra bản dùng sớm",
    detail: "Bàn giao từng phân hệ chạy thật sau mỗi chặng ngắn để đội ngũ dùng thử và tinh chỉnh sát thực tế.",
  },
  {
    phase: "KIỂM ĐỊNH",
    title: "Kiểm thử tự động & Chuyển giao vận hành",
    detail: "Kiểm tra tải, rà soát bảo mật phân quyền, đào tạo trực tiếp từng nhóm nhân sự trước giờ go-live.",
  },
  {
    phase: "ĐỒNG HÀNH",
    title: "Vận hành 24/7 & Mở rộng giai đoạn tiếp",
    detail: "Theo dõi độ ổn định chủ động, bảo trì định kỳ và nâng cấp tính năng khi doanh nghiệp tăng trưởng.",
  },
] as const;
