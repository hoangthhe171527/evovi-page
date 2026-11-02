import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { AppPageLayout } from "@/components/apps/app-page-layout";
import {
  HeroTriSpectrumCanvas,
  HorizonSignalCanvas,
} from "@/components/landing/EvoviSignalCanvas";
import { EditorialPhotoFrame } from "@/components/ui/EditorialPhotoFrame";
import { adCanvasApp } from "@/data/apps/ad-canvas";
import {
  AD_CANVAS_OG_IMAGE,
  buildAdCanvasJsonLd,
  buildSeoHead,
} from "@/lib/seo";
import oohCityImg from "@/assets/evovi-ooh-city.jpg";
import elevatorArchImg from "@/assets/evovi-elevator-arch.jpg";
import studioBlueprintImg from "@/assets/evovi-studio-blueprint.jpg";
import factoryOpsImg from "@/assets/evovi-factory-ops.jpg";

export const Route = createFileRoute("/ad-canvas/")({
  head: () =>
    buildSeoHead({
      title: `${adCanvasApp.name} · ${adCanvasApp.tagline} | Evovi`,
      description:
        "Ad Canvas là nền tảng và ứng dụng di động của Evovi giúp doanh nghiệp quảng cáo ngoài trời (OOH) quản lý CRM, tồn kho vị trí, tỷ lệ lấp đầy, triển khai chiến dịch và nghiệm thu ảnh hiện trường.",
      path: "/ad-canvas",
      ogImage: AD_CANVAS_OG_IMAGE,
      ogImageAlt: "Ad Canvas - Nền tảng quản trị quảng cáo ngoài trời OOH trên di động của Evovi",
      jsonLd: buildAdCanvasJsonLd(adCanvasApp),
    }),
  component: AdCanvasMarketingPage,
});

function AdCanvasMarketingPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroScrollRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined" || !rootRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-ac-hero]",
        { y: 12, opacity: 0.48 },
        { y: 0, opacity: 1, duration: 0.46, stagger: 0.05, ease: "power2.out" },
      );

      ScrollTrigger.create({
        trigger: "[data-ac-stage]",
        start: "top top",
        end: "bottom top",
        scrub: 0.45,
        onUpdate: (self) => {
          heroScrollRef.current = self.progress;
        },
      });

      gsap.fromTo(
        "[data-ac-conduit]",
        { scaleY: 0.08, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-ac-list]",
            start: "top 75%",
            end: "bottom 50%",
            scrub: 0.45,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-ac-heading]", rootRef.current).forEach((el) => {
        gsap.fromTo(
          el,
          { y: 22, opacity: 0.52 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 64%",
              scrub: 0.35,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-ac-step]", rootRef.current).forEach((el) => {
        gsap.fromTo(
          el,
          { y: 20, opacity: 0.62 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "top 60%",
              scrub: 0.35,
            },
          },
        );
      });

      gsap.fromTo(
        "[data-ac-photo]",
        { scale: 1.09 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-ac-gallery]",
            start: "top 85%",
            end: "bottom 20%",
            scrub: 0.45,
          },
        },
      );
    }, rootRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <AppPageLayout appName={adCanvasApp.name} flushMain>
      <div ref={rootRef}>
        {/* HERO STAGE */}
        <section
          data-ac-stage
          className="relative overflow-hidden bg-[#050b16] py-16 text-[#f5f8ff] md:py-24"
        >
          <HeroTriSpectrumCanvas scrollProgressRef={heroScrollRef} />

          <div className="container-evo relative z-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="order-2 lg:order-1 lg:col-span-5" data-ac-hero>
                <p className="max-w-[38ch] text-evo-body text-[#d6e2f5]">
                  Ad Canvas dành cho doanh nghiệp khai thác quảng cáo ngoài trời trên xe buýt, taxi, pano và màn hình trung tâm thương mại. Từ cơ hội bán hàng, hợp đồng, lịch đặt chỗ đến ảnh nghiệm thu hiện trường đều đồng bộ tức thời.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to="/ad-canvas/support"
                    className="evo-btn-primary evo-btn-lg"
                  >
                    <span>Liên hệ hỗ trợ triển khai</span>
                    <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/privacy/ad-canvas"
                    className="evo-btn-ghost evo-btn-lg"
                  >
                    <span>Chính sách quyền riêng tư</span>
                  </Link>
                </div>
              </div>

              <div className="order-1 lg:order-2 lg:col-span-7" data-ac-hero>
                <h1 className="font-display text-evo-hero font-bold text-[#f5f8ff]">
                  {adCanvasApp.name}
                </h1>
                <p className="mt-3 font-display text-evo-h3 font-semibold text-[#5ca4ff]">
                  {adCanvasApp.tagline}
                </p>

                <div
                  data-ui="adcanvas-hero-media"
                  className="evo-surface-card mt-8 overflow-hidden rounded-xl"
                >
                  <EditorialPhotoFrame
                    src={oohCityImg}
                    alt="Màn hình quảng cáo ngoài trời OOH tại đô thị vận hành qua Ad Canvas"
                    width={1600}
                    height={900}
                    tag="Ad Canvas · iOS, Android & Web"
                    caption="Quản trị đồng bộ tồn kho vị trí, tỷ lệ lấp đầy và ảnh nghiệm thu hiện trường"
                    aspectClassName="aspect-[16/9]"
                    eager
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE WORKFLOW CONDUIT + LIVE TELEMETRY (#081224 Midnight Navy) */}
        <section className="bg-[#081224] py-20 text-[#f5f8ff] md:py-28">
          <div className="container-evo">
            {/* Pillar 2 & 3: H2 leads first on Mobile, 16px mobile proximity */}
            <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8">
              <div className="order-2 lg:order-1 lg:col-span-5">
                <p className="max-w-[38ch] text-evo-body text-[#d6e2f5]">
                  Giải quyết trọn vẹn bài toán thuê vị trí dài hạn rồi chia kỳ hạn bán lại cho nhiều nhãn hàng mà không trùng lịch hay thất thoát tồn kho.
                </p>
              </div>
              <div className="order-1 lg:order-2 lg:col-span-7">
                <h2
                  data-ac-heading
                  className="font-display text-evo-h2 font-bold text-[#f5f8ff]"
                >
                  Bốn phân hệ nghiệp vụ cốt lõi
                </h2>
              </div>
            </div>

            <div className="mt-12 grid gap-12 md:mt-14 lg:grid-cols-12 lg:items-start">
              <div data-ac-list className="relative pl-8 lg:col-span-6">
                <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-[#132747]">
                  <div
                    data-ac-conduit
                    className="h-full w-full bg-[#247eff] will-change-transform"
                  />
                </div>

                <ol className="list-decimal space-y-8 pl-6 marker:font-display marker:text-evo-h3 marker:font-bold marker:text-[#5ca4ff]">
                  {adCanvasApp.features.map((f) => (
                    <li key={f.title} data-ac-step className="py-1">
                      <h3 className="font-display text-evo-h3 font-semibold text-[#f5f8ff]">
                        {f.title}
                      </h3>
                      <p className="mt-2 max-w-[52ch] text-evo-body text-[#d6e2f5]">
                        {f.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="lg:sticky lg:top-24 lg:col-span-6">
                <div
                  data-ui="adcanvas-occupancy"
                  className="evo-surface-card rounded-xl p-6 text-[#f5f8ff] md:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-evo-small font-semibold text-[#f5f8ff]">
                      Ad Canvas · Tồn kho & chiến dịch trực tiếp
                    </span>
                    <span className="evo-chip-success text-evo-small font-semibold">
                      <span className="h-2 w-2 rounded-full bg-[#6ee7b7]" />
                      Đồng bộ tức thời
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        name: "Cụm Pano & Màn LED TTTM Quận 1",
                        sub: "Đã khóa lịch 14/14 vị trí quý 4",
                        badge: "100% Occupancy",
                        chip: "evo-chip-success",
                      },
                      {
                        name: "Tuyến Xe buýt Đô thị (68 xe)",
                        sub: "Tài xế đã gửi ảnh proof đầu kỳ",
                        badge: "Đã nghiệm thu",
                        chip: "evo-chip-info",
                      },
                      {
                        name: "Kỳ hạn mở bán tháng tới",
                        sub: "9 vị trí trống sẵn sàng báo giá",
                        badge: "Sẵn sàng chào bán",
                        chip: "evo-chip-warning",
                      },
                    ].map((row) => (
                      <div
                        key={row.name}
                        data-ac-step
                        className="evo-surface-well flex flex-wrap items-center justify-between gap-3 rounded-lg p-4"
                      >
                        <div>
                          <div className="text-evo-body font-semibold text-[#f5f8ff]">
                            {row.name}
                          </div>
                          <div className="mt-0.5 text-evo-small text-[#9eb2d0]">
                            {row.sub}
                          </div>
                        </div>
                        <span className={`text-evo-small font-semibold ${row.chip}`}>
                          {row.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ARCHITECTURAL PHOTOGRAPHY & MULTI-ROLE OPERATIONS (#050b16 Abyssal Navy) */}
        <section className="bg-[#050b16] py-20 text-[#f5f8ff] md:py-28">
          <div className="container-evo">
            <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8">
              <div className="order-2 lg:order-1 lg:col-span-5">
                <p className="max-w-[38ch] text-evo-body text-[#d6e2f5]">
                  Mỗi vai trò trong tổ chức mở ứng dụng lên đều thấy đúng việc cần làm trên một nguồn dữ liệu thống nhất.
                </p>
              </div>
              <div className="order-1 lg:order-2 lg:col-span-7">
                <h2
                  data-ac-heading
                  className="font-display text-evo-h2 font-bold text-[#f5f8ff]"
                >
                  Vận hành liên thông bốn vai trò
                </h2>
              </div>
            </div>

            <div
              data-ac-gallery
              className="mt-12 grid gap-3 overflow-hidden rounded-xl bg-[#081224] p-3 lg:grid-cols-12"
            >
              <div className="overflow-hidden rounded-lg lg:col-span-4">
                <EditorialPhotoFrame
                  src={factoryOpsImg}
                  alt="Điều phối viên kiểm tra tiến độ triển khai chiến dịch quảng cáo trên thiết bị di động"
                  width={1080}
                  height={1440}
                  tag="Điều phối & Hiện trường"
                  caption="Ghi nhận ảnh nghiệm thu trực tiếp từ ứng dụng di động"
                  aspectClassName="aspect-[4/3]"
                  imgDataAttr="ac"
                />
              </div>
              <div className="overflow-hidden rounded-lg lg:col-span-4">
                <EditorialPhotoFrame
                  src={studioBlueprintImg}
                  alt="Thiết kế kiến trúc phân quyền đa tổ chức cho nền tảng Ad Canvas tại Evovi"
                  width={1440}
                  height={810}
                  tag="Phân quyền Multi-Tenant"
                  caption="Cô lập dữ liệu kinh doanh và tồn kho theo từng tổ chức"
                  aspectClassName="aspect-[4/3]"
                  imgDataAttr="ac"
                />
              </div>
              <div className="overflow-hidden rounded-lg lg:col-span-4">
                <EditorialPhotoFrame
                  src={elevatorArchImg}
                  alt="Không gian tòa nhà thương mại khai thác quảng cáo màn hình và sảnh thang máy"
                  width={1080}
                  height={1440}
                  tag="Màn hình Tòa nhà & TTTM"
                  caption="Kiểm soát tỷ lệ lấp đầy theo từng khung thời gian hợp đồng"
                  aspectClassName="aspect-[4/3]"
                  imgDataAttr="ac"
                />
              </div>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h3 className="font-display text-evo-h3 font-semibold text-[#f5f8ff]">
                  Nhóm người dùng trong doanh nghiệp
                </h3>
                <p className="mt-3 max-w-[38ch] text-evo-body text-[#d6e2f5]">
                  Ad Canvas cấp tài khoản theo từng tổ chức khách hàng với phân quyền tách biệt rõ ràng.
                </p>
              </div>
              <div className="lg:col-span-7">
                <ul className="space-y-3" data-ui="role-list">
                  {adCanvasApp.audiences.map((a) => (
                    <li
                      key={a}
                      data-ac-step
                      className="evo-surface-card rounded-r-xl border-l-4 border-l-[#247eff] px-6 py-4 text-evo-body font-medium text-[#f5f8ff]"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSING CTA STAGE (#081224 Midnight Navy) */}
        <section className="relative overflow-hidden bg-[#081224] py-20 text-[#f5f8ff]">
          <HorizonSignalCanvas />
          <div className="container-evo relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2
                data-ac-heading
                className="font-display text-evo-h2 font-bold text-[#f5f8ff]"
              >
                Sẵn sàng chuẩn hóa vận hành OOH?
              </h2>
              <p className="mt-3 max-w-[50ch] text-evo-body text-[#d6e2f5]">
                Liên hệ đội ngũ kỹ thuật Evovi để được tư vấn triển khai tổ chức mới hoặc hỗ trợ tài khoản đang sử dụng trên hệ thống {adCanvasApp.apiHost}.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <Link to="/ad-canvas/support" className="evo-btn-primary evo-btn-lg">
                <span>Mở trung tâm hỗ trợ</span>
                <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
              </Link>
              <Link to="/" className="evo-btn-ghost evo-btn-lg">
                <span>Khám phá hệ sinh thái Evovi</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AppPageLayout>
  );
}
