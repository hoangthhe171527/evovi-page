/** Ad Canvas — URLs & copy for App Store Connect (evovi.vn). */
export const adCanvasApp = {
  name: "Ad Canvas",
  tagline: "Quản lý vải quảng cáo OOH trên di động",
  packageId: "vn.evovi.adcanvas",
  developer: "Evovi",
  supportEmail: "support@evovi.vn",
  hotline: "0868661235",
  website: "https://evovi.vn",
  apiHost: "adcanvas-api.app.evovi.vn",
  /** App Store Connect — Marketing URL */
  marketingPath: "/ad-canvas",
  /** App Store Connect — Support URL */
  supportPath: "/ad-canvas/support",
  /** App Store Connect — Privacy Policy URL */
  privacyPath: "/privacy/ad-canvas",
  features: [
    {
      title: "CRM bán hàng",
      description: "Quản lý tiềm năng, khách hàng, cơ hội, báo giá và hợp đồng trên một nền tảng.",
    },
    {
      title: "Tồn kho & occupancy",
      description: "Theo dõi vị trí quảng cáo, lịch đặt chỗ và tình trạng sử dụng vải theo thời gian thực.",
    },
    {
      title: "Triển khai & vận hành",
      description: "Điều phối campaign, gán tài sản và theo dõi tiến độ triển khai tại hiện trường.",
    },
    {
      title: "Check-in & minh chứng",
      description: "Ghi nhận hiện trường, chụp ảnh proof và báo cáo sự cố ngay trên thiết bị di động.",
    },
  ],
  audiences: [
    "Đội kinh doanh OOH",
    "Vận hành & triển khai",
    "Tài xế / hiện trường",
    "Quản lý doanh nghiệp",
  ],
} as const;

export function adCanvasAbsoluteUrl(path: string): string {
  const base = adCanvasApp.website.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
