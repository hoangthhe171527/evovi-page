import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppPageLayout } from "@/components/apps/app-page-layout";
import {
  HeroTriSpectrumCanvas,
  HorizonSignalCanvas,
} from "@/components/landing/EvoviSignalCanvas";
import { adCanvasApp } from "@/data/apps/ad-canvas";
import { AD_CANVAS_OG_IMAGE, buildSeoHead, SITE_URL } from "@/lib/seo";
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
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: adCanvasApp.name,
          applicationCategory: "BusinessApplication",
          operatingSystem: "iOS, Android, Web",
          softwareAddOn: adCanvasApp.packageId,
          description:
            "Ứng dụng quản trị quảng cáo ngoài trời (OOH): CRM bán hàng, tồn kho vị trí, theo dõi occupancy và chụp ảnh minh chứng hiện trường.",
          url: `${SITE_URL}/ad-canvas`,
          image: AD_CANVAS_OG_IMAGE,
          publisher: {
            "@type": "Organization",
            name: adCanvasApp.developer,
            url: SITE_URL,
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Evovi", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Ad Canvas", item: `${SITE_URL}/ad-canvas` },
          ],
        },
      ],
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
        { y: 12, opacity: 0.45 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: "power2.out" },
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

      gsap.utils.toArray<HTMLElement>("[data-ac-step]", rootRef.current).forEach((el) => {
        gsap.fromTo(
          el,
          { y: 20 },
          {
            y: 0,
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
        { scale: 1.08 },
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
          className="relative overflow-hidden bg-[#070d18] py-16 text-[#f4f7fb] md:py-24"
        >
          <HeroTriSpectrumCanvas scrollProgressRef={heroScrollRef} />

          <div className="container-evo relative z-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="order-2 lg:order-1 lg:col-span-5" data-ac-hero>
                <p className="max-w-[38ch] text-evo-body text-[#a6b4c8]">
                  Ad Canvas dành cho doanh nghiệp khai thác quảng cáo ngoài trời trên xe buýt, taxi, pano và màn hình trung tâm thương mại. Từ cơ hội bán hàng, hợp đồng, lịch đặt chỗ đến ảnh nghiệm thu hiện trường đều đồng bộ tức thời.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to="/ad-canvas/support"
                    className="inline-flex items-center gap-2 rounded-md bg-[#095fd6] px-6 py-3.5 text-evo-small font-semibold text-white transition-colors hover:bg-[#2480ff]"
                  >
                    Liên hệ hỗ trợ triển khai →
                  </Link>
                  <Link
                    to="/privacy/ad-canvas"
                    className="inline-flex items-center gap-2 rounded-md bg-[#0d1728] px-5 py-3.5 text-evo-small font-semibold text-[#f4f7fb] transition-colors hover:bg-[#142238]"
                  >
                    Chính sách quyền riêng tư
                  </Link>
                </div>
              </div>

              <div className="order-1 lg:order-2 lg:col-span-7" data-ac-hero>
                <h1 className="font-display text-evo-hero font-extrabold text-[#f4f7fb]">
                  {adCanvasApp.name}
                </h1>
                <p className="mt-3 font-display text-evo-h3 font-bold text-[#f59422]">
                  {adCanvasApp.tagline}
                </p>

                <div className="mt-8 overflow-hidden bg-[#0d1728]">
                  <img
                    src={oohCityImg}
                    alt="Màn hình quảng cáo ngoài trời OOH tại đô thị vận hành qua Ad Canvas"
                    width={1600}
                    height={900}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE WORKFLOW CONDUIT + LIVE TELEMETRY */}
        <section className="bg-[#eef2f6] py-20 text-[#0b1320] md:py-28">
          <div className="container-evo">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
                <p className="max-w-[36ch] text-evo-body text-[#465468]">
                  Giải quyết trọn vẹn bài toán thuê vị trí dài hạn rồi chia kỳ hạn bán lại cho nhiều nhãn hàng mà không trùng lịch hay thất thoát tồn kho.
                </p>
              </div>
              <div className="lg:col-span-7">
                <h2 className="font-display text-evo-h2 font-extrabold text-[#0b1320]">
                  Bốn phân hệ nghiệp vụ cốt lõi
                </h2>
              </div>
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-start">
              <div data-ac-list className="relative pl-8 lg:col-span-6">
                <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-[#c3cfdf]">
                  <div
                    data-ac-conduit
                    className="h-full w-full bg-[#095fd6] will-change-transform"
                  />
                </div>

                <ol className="list-decimal space-y-8 pl-6 marker:font-display marker:text-evo-h3 marker:font-extrabold marker:text-[#095fd6]">
                  {adCanvasApp.features.map((f) => (
                    <li key={f.title} data-ac-step className="py-1">
                      <h3 className="font-display text-evo-h3 font-bold text-[#0b1320]">
                        {f.title}
                      </h3>
                      <p className="mt-2 max-w-[52ch] text-evo-body text-[#465468]">
                        {f.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="lg:sticky lg:top-24 lg:col-span-6">
                <div
                  data-ui="adcanvas-occupancy"
                  className="rounded-lg bg-[#070d18] p-6 text-[#f4f7fb] md:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-evo-small font-semibold text-[#f4f7fb]">
                      AD CANVAS · TỒN KHO & CHIẾN DỊCH TRỰC TIẾP
                    </span>
                    <span className="rounded bg-[#3cb34a] px-3 py-1 text-evo-small font-bold text-[#070d18]">
                      ĐỒNG BỘ TỨC THỜI
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        name: "Cụm Pano & Màn LED TTTM Quận 1",
                        sub: "Đã khóa lịch 14/14 vị trí quý 4",
                        badge: "100% Occupancy",
                        bg: "bg-[#3cb34a] text-[#070d18]",
                      },
                      {
                        name: "Tuyến Xe buýt Đô thị (68 xe)",
                        sub: "Tài xế đã gửi ảnh proof đầu kỳ",
                        badge: "Đã nghiệm thu",
                        bg: "bg-[#095fd6] text-white",
                      },
                      {
                        name: "Kỳ hạn mở bán tháng tới",
                        sub: "9 vị trí trống sẵn sàng báo giá",
                        badge: "Sẵn sàng chào bán",
                        bg: "bg-[#f59422] text-[#070d18]",
                      },
                    ].map((row) => (
                      <div
                        key={row.name}
                        data-ac-step
                        className="flex flex-wrap items-center justify-between gap-3 rounded bg-[#0d1728] p-4"
                      >
                        <div>
                          <div className="text-evo-body font-semibold text-[#f4f7fb]">
                            {row.name}
                          </div>
                          <div className="mt-0.5 text-evo-small text-[#a6b4c8]">
                            {row.sub}
                          </div>
                        </div>
                        <span className={`rounded px-3 py-1 text-evo-small font-semibold ${row.bg}`}>
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

        {/* ARCHITECTURAL PHOTOGRAPHY & MULTI-ROLE OPERATIONS */}
        <section className="bg-[#dfe6ef] py-20 text-[#0b1320] md:py-28">
          <div className="container-evo">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
                <p className="max-w-[36ch] text-evo-body text-[#465468]">
                  Mỗi vai trò trong tổ chức mở ứng dụng lên đều thấy đúng việc cần làm trên một nguồn dữ liệu thống nhất.
                </p>
              </div>
              <div className="lg:col-span-7">
                <h2 className="font-display text-evo-h2 font-extrabold text-[#0b1320]">
                  Vận hành liên thông bốn vai trò
                </h2>
              </div>
            </div>

            <div
              data-ac-gallery
              className="mt-12 grid overflow-hidden bg-[#070d18] lg:grid-cols-12"
            >
              <div className="overflow-hidden lg:col-span-4">
                <img
                  data-ac-photo
                  src={factoryOpsImg}
                  alt="Điều phối viên kiểm tra tiến độ triển khai chiến dịch quảng cáo trên thiết bị di động"
                  width={1080}
                  height={1440}
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover will-change-transform"
                />
              </div>
              <div className="overflow-hidden lg:col-span-4">
                <img
                  data-ac-photo
                  src={studioBlueprintImg}
                  alt="Thiết kế kiến trúc phân quyền đa tổ chức cho nền tảng Ad Canvas tại Evovi"
                  width={1440}
                  height={810}
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover will-change-transform"
                />
              </div>
              <div className="overflow-hidden lg:col-span-4">
                <img
                  data-ac-photo
                  src={elevatorArchImg}
                  alt="Không gian tòa nhà thương mại khai thác quảng cáo màn hình và sảnh thang máy"
                  width={1080}
                  height={1440}
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover will-change-transform"
                />
              </div>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h3 className="font-display text-evo-h3 font-bold text-[#0b1320]">
                  Nhóm người dùng trong doanh nghiệp
                </h3>
                <p className="mt-3 max-w-[38ch] text-evo-body text-[#465468]">
                  Ad Canvas cấp tài khoản theo từng tổ chức khách hàng với phân quyền tách biệt rõ ràng.
                </p>
              </div>
              <div className="lg:col-span-7">
                <ul className="space-y-4">
                  {adCanvasApp.audiences.map((a) => (
                    <li
                      key={a}
                      data-ac-step
                      className="border-l-4 border-[#095fd6] bg-white px-6 py-4 text-evo-body font-medium text-[#0b1320]"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSING CTA STAGE */}
        <section className="relative overflow-hidden bg-[#070d18] py-20 text-[#f4f7fb]">
          <HorizonSignalCanvas />
          <div className="container-evo relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="font-display text-evo-h2 font-extrabold text-[#f4f7fb]">
                Sẵn sàng chuẩn hóa vận hành OOH?
              </h2>
              <p className="mt-3 max-w-[50ch] text-evo-body text-[#a6b4c8]">
                Liên hệ đội ngũ kỹ thuật Evovi để được tư vấn triển khai tổ chức mới hoặc hỗ trợ tài khoản đang sử dụng trên hệ thống {adCanvasApp.apiHost}.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <Link
                to="/ad-canvas/support"
                className="inline-flex items-center gap-2 rounded-md bg-[#095fd6] px-6 py-3.5 text-evo-small font-semibold text-white transition-colors hover:bg-[#2480ff]"
              >
                Mở trung tâm hỗ trợ →
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-md bg-[#0d1728] px-5 py-3.5 text-evo-small font-semibold text-[#f4f7fb] transition-colors hover:bg-[#142238]"
              >
                Khám phá hệ sinh thái Evovi
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AppPageLayout>
  );
}
