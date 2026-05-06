import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/hero-dashboard.jpg";
import logo from "@/assets/evovi-logo.png";
import {
  ArrowRight, Sparkles, Code2, Layers, Plug, Wrench, Lightbulb,
  AlertTriangle, Workflow, Settings2, CheckCircle2, Zap, Shield,
  TrendingUp, Clock, MessageCircle, Mail, Phone, MapPin, Quote,
  ChevronRight, Target, Cog, Rocket, LifeBuoy, Search, PenTool,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Evovi — Giải pháp phần mềm thiết kế riêng cho doanh nghiệp" },
      { name: "description", content: "Evovi cung cấp giải pháp phần mềm theo yêu cầu: tư vấn, thiết kế, phát triển web/app, tích hợp API và tối ưu hệ thống cho doanh nghiệp." },
      { property: "og:title", content: "Evovi — Phần mềm thiết kế riêng cho doanh nghiệp" },
      { property: "og:description", content: "Giải pháp phần mềm theo yêu cầu, dễ dùng, dễ mở rộng, phù hợp đúng cách bạn đang vận hành." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  component: LandingPage,
});

function Navbar() {
  const links = [
    { href: "#solution", label: "Giải pháp" },
    { href: "#services", label: "Dịch vụ" },
    { href: "#process", label: "Quy trình" },
    { href: "#cases", label: "Dự án" },
    { href: "#contact", label: "Liên hệ" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
          <img src={logo} alt="Evovi" width={32} height={32} className="w-8 h-8 object-contain drop-shadow-[0_0_12px_oklch(0.62_0.22_285/0.5)]" />
          <span className="text-gradient">Evovi</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
          ))}
        </nav>
        <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-primary-gradient text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-elegant hover:shadow-glow transition-all">
          Tư vấn miễn phí <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-hero-gradient text-white">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-primary-glow/40 blur-3xl animate-glow" />
        <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full bg-primary/40 blur-3xl animate-glow" />
      </div>
      <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur">
            <Sparkles className="w-3.5 h-3.5" /> Phần mềm thiết kế riêng cho doanh nghiệp
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1.05]">
            Giải pháp phần mềm <span className="bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">thiết kế riêng</span> cho doanh nghiệp của bạn
          </h1>
          <p className="mt-6 text-lg text-white/75 max-w-xl">
            Evovi giúp bạn làm việc nhanh hơn, quản lý gọn hơn, dữ liệu rõ ràng hơn. Bạn chỉ cần nói “đang vướng ở đâu” — tụi mình sẽ cùng bạn chốt cách làm đơn giản và hiệu quả.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-6 py-3 font-semibold shadow-elegant hover:shadow-glow transition-all">
              Nhận tư vấn miễn phí <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold hover:bg-white/10 transition-all">
              Xem dịch vụ
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[["50+","Dự án"],["98%","Hài lòng"],["24/7","Hỗ trợ"]].map(([n,l]) => (
              <div key={l}>
                <div className="font-display text-2xl md:text-3xl font-bold">{n}</div>
                <div className="text-xs text-white/60 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative animate-fade-in">
          <div className="absolute -inset-6 bg-primary-glow/30 blur-3xl rounded-full" />
          <img
            src={heroImg}
            alt="Evovi dashboard"
            width={1536}
            height={1024}
            className="relative rounded-2xl shadow-glow border border-white/10 animate-float"
          />
        </div>
      </div>
    </section>
  );
}

function PainPoints() {
  const items = [
    { icon: AlertTriangle, t: "Phần mềm không khớp cách làm việc", d: "Dùng phải “mẫu có sẵn” nên làm vòng vèo, tốn thời gian." },
    { icon: Workflow, t: "Nhiều file, nhiều nhóm chat", d: "Dữ liệu nằm rải rác, khó tổng hợp và dễ sai." },
    { icon: Settings2, t: "Hệ thống cũ chậm và hay lỗi", d: "Càng dùng càng ì, sửa mãi không dứt." },
    { icon: Shield, t: "Lo mất dữ liệu", d: "Thiếu sao lưu/bảo mật rõ ràng nên rủi ro cao." },
  ];
  return (
    <section className="py-24 bg-background">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Vấn đề thường gặp</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Doanh nghiệp đang gặp khó khăn vì đâu?</h2>
          <p className="mt-4 text-muted-foreground">Đa số không phải vì bạn “làm sai”, mà vì công cụ hiện tại chưa đúng với cách đội ngũ đang vận hành.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <div key={i} className="group p-6 rounded-2xl border border-border bg-card hover:shadow-card-soft hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 grid place-items-center rounded-xl bg-accent text-primary group-hover:bg-primary-gradient group-hover:text-white transition-all">
                <it.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">{it.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const steps = [
    { icon: Search, t: "Hiểu đúng nhu cầu", d: "Ngồi cùng bạn để hiểu quy trình, điểm nghẽn và mục tiêu." },
    { icon: PenTool, t: "Đề xuất cách làm dễ dùng", d: "Thiết kế màn hình & luồng thao tác rõ ràng, ai cũng dùng được." },
    { icon: Rocket, t: "Làm nhanh, ra bản dùng sớm", d: "Chia nhỏ theo từng đợt, có bản chạy được sớm để thử và chỉnh." },
  ];
  return (
    <section id="solution" className="py-24 relative overflow-hidden" style={{ background: "var(--gradient-soft)" }}>
      <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Cách Evovi giải quyết</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Từ bài toán kinh doanh đến giải pháp công nghệ</h2>
          <p className="mt-4 text-muted-foreground">Evovi không bán “phần mềm đóng gói”. Tụi mình làm theo đúng cách bạn đang vận hành — đơn giản, rõ ràng và có thể mở rộng khi doanh nghiệp lớn lên.</p>
          <div className="mt-8 space-y-5">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl bg-card border border-border shadow-card-soft">
                <div className="shrink-0 w-12 h-12 grid place-items-center rounded-xl bg-primary-gradient text-white shadow-glow">
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{s.t}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square max-w-md mx-auto relative">
            <div className="absolute inset-0 bg-primary-gradient rounded-[3rem] rotate-6 opacity-20 blur-2xl" />
            <div className="relative h-full rounded-[2.5rem] bg-card border border-border shadow-elegant p-8 flex flex-col justify-between">
              {[
                { icon: Lightbulb, label: "Khảo sát nhu cầu", c: "from-blue-500 to-indigo-500" },
                { icon: Layers, label: "Thiết kế giải pháp", c: "from-indigo-500 to-purple-500" },
                { icon: Code2, label: "Xây dựng & kiểm thử", c: "from-purple-500 to-pink-500" },
                { icon: Zap, label: "Triển khai & tối ưu", c: "from-pink-500 to-orange-400" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-accent/50">
                  <div className={`w-10 h-10 grid place-items-center rounded-lg bg-gradient-to-br ${b.c} text-white`}>
                    <b.icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">{b.label}</span>
                  <ChevronRight className="ml-auto w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { icon: Lightbulb, t: "Tư vấn & lên phương án", d: "Cùng bạn gỡ rối quy trình và chọn cách làm phù hợp nhất." },
    { icon: Code2, t: "Làm web / app theo yêu cầu", d: "Giao diện rõ ràng, dùng dễ, chạy mượt." },
    { icon: Layers, t: "Thiết kế hệ thống", d: "Sắp xếp dữ liệu & luồng xử lý gọn gàng để mở rộng về sau." },
    { icon: Plug, t: "Kết nối hệ thống đang có", d: "Đồng bộ dữ liệu giữa các công cụ (CRM/ERP/thanh toán…)."},
    { icon: Wrench, t: "Nâng cấp hệ thống cũ", d: "Sửa chậm/lỗi, tối ưu lại để ổn định và dễ bảo trì." },
    { icon: Shield, t: "Bảo mật & vận hành", d: "Thiết lập sao lưu, phân quyền, theo dõi hệ thống để yên tâm." },
  ];
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Dịch vụ</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Một đối tác — đầy đủ giải pháp</h2>
          <p className="mt-4 text-muted-foreground">Từ ý tưởng đến vận hành, Evovi đồng hành cùng bạn ở mọi giai đoạn.</p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="group relative p-7 rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all shadow-card-soft">
              <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-primary-gradient opacity-0 group-hover:opacity-20 blur-2xl transition-opacity" />
              <div className="w-12 h-12 grid place-items-center rounded-xl bg-primary-gradient text-white shadow-glow">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-5 font-semibold text-lg">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Xem chi tiết <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { icon: MessageCircle, t: "Tiếp nhận yêu cầu" },
    { icon: Search, t: "Phân tích & tư vấn" },
    { icon: Target, t: "Thiết kế giải pháp" },
    { icon: Code2, t: "Phát triển" },
    { icon: Rocket, t: "Triển khai" },
    { icon: LifeBuoy, t: "Bảo trì" },
  ];
  return (
    <section id="process" className="py-24" style={{ background: "var(--gradient-soft)" }}>
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Quy trình</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">6 bước — minh bạch từ A đến Z</h2>
        </div>
        <div className="mt-14 relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center relative">
                <div className="mx-auto w-24 h-24 grid place-items-center rounded-2xl bg-card border border-border shadow-card-soft relative z-10">
                  <s.icon className="w-8 h-8 text-primary" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 grid place-items-center rounded-full bg-primary-gradient text-white text-xs font-bold shadow-glow">{i+1}</span>
                </div>
                <h3 className="mt-4 font-semibold text-sm">{s.t}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  const cases = [
    {
      tag: "Quản lý sản xuất",
      t: "Tự động hoá vận hành nhà máy 500+ nhân sự",
      problem: "Quản lý sản xuất rời rạc trên Excel, sai sót cao.",
      result: "Giảm 60% thao tác thủ công, tăng 35% hiệu suất.",
      stats: [["−60%","Thao tác"],["+35%","Hiệu suất"],["3 tháng","Triển khai"]],
    },
    {
      tag: "Thanh toán",
      t: "Nền tảng thanh toán cho startup tăng trưởng nhanh",
      problem: "Hệ thống cũ không scale, downtime cao mùa cao điểm.",
      result: "Xử lý 1M+ giao dịch/ngày, uptime 99.99%.",
      stats: [["1M+","Tx/ngày"],["99.99%","Uptime"],["−45%","Cost"]],
    },
    {
      tag: "Chăm sóc khách hàng",
      t: "Tích hợp CRM đa kênh cho chuỗi 80 cửa hàng",
      problem: "Dữ liệu khách hàng phân mảnh giữa các kênh.",
      result: "Tăng 28% repeat-rate nhờ insight thống nhất.",
      stats: [["+28%","Repeat"],["80","Cửa hàng"],["6 tuần","Go-live"]],
    },
  ];
  return (
    <section id="cases" className="py-24 bg-background">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Dự án tiêu biểu</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Kết quả thực tế, đo lường được</h2>
          </div>
          <p className="text-muted-foreground max-w-md">Một vài dự án tiêu biểu Evovi đã đồng hành cùng khách hàng.</p>
        </div>
        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <article key={i} className="group p-7 rounded-2xl bg-card border border-border shadow-card-soft hover:shadow-elegant transition-all">
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-accent text-primary">{c.tag}</span>
              <h3 className="mt-4 font-semibold text-xl leading-snug">{c.t}</h3>
              <div className="mt-5 space-y-3 text-sm">
                <p><span className="font-semibold text-foreground">Vấn đề: </span><span className="text-muted-foreground">{c.problem}</span></p>
                <p><span className="font-semibold text-foreground">Kết quả: </span><span className="text-muted-foreground">{c.result}</span></p>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 pt-5 border-t border-border">
                {c.stats.map(([n,l]) => (
                  <div key={l}>
                    <div className="font-display text-lg font-bold text-gradient">{n}</div>
                    <div className="text-xs text-muted-foreground mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyEvovi() {
  const items = [
    { icon: Cog, t: "Làm theo đúng nhu cầu", d: "Không ép bạn theo khuôn mẫu có sẵn." },
    { icon: TrendingUp, t: "Chi phí hợp lý", d: "Làm đúng phần cần làm trước, mở rộng sau." },
    { icon: Clock, t: "Có bản dùng sớm", d: "Ra bản chạy được sớm để thử ngay." },
    { icon: LifeBuoy, t: "Có người hỗ trợ", d: "Sau khi chạy thật vẫn có đội ngũ đồng hành." },
    { icon: Shield, t: "An toàn dữ liệu", d: "Phân quyền, sao lưu, theo dõi hệ thống rõ ràng." },
    { icon: CheckCircle2, t: "Minh bạch tiến độ", d: "Mỗi giai đoạn đều rõ việc – rõ thời gian – rõ kết quả." },
  ];
  return (
    <section className="py-24 bg-hero-gradient text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-primary-glow/30 blur-3xl" />
      </div>
      <div className="container-x relative">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-primary-glow uppercase tracking-wider">Vì sao chọn Evovi</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Đối tác công nghệ — không chỉ là nhà cung cấp</h2>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors">
              <div className="w-11 h-11 grid place-items-center rounded-xl bg-white/10">
                <it.icon className="w-5 h-5 text-primary-glow" />
              </div>
              <h3 className="mt-4 font-semibold">{it.t}</h3>
              <p className="mt-2 text-sm text-white/70">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: "Evovi không chỉ code — họ thực sự hiểu bài toán kinh doanh của chúng tôi.", n: "Nguyễn Minh Anh", r: "CEO, RetailPro" },
    { q: "Hệ thống chạy ổn định, đội ngũ hỗ trợ nhanh và chuyên nghiệp.", n: "Trần Hữu Phúc", r: "CTO, FintechX" },
    { q: "Sản phẩm scale tốt khi user tăng 10x mà không cần viết lại.", n: "Lê Thị Hương", r: "Founder, EduNow" },
  ];
  return (
    <section className="py-24 bg-background">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Khách hàng nói gì</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Niềm tin từ những doanh nghiệp tăng trưởng</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <div key={i} className="p-7 rounded-2xl bg-card border border-border shadow-card-soft relative">
              <Quote className="w-8 h-8 text-primary/30 absolute top-5 right-5" />
              <p className="text-foreground/90 leading-relaxed">"{t.q}"</p>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border">
                <div className="w-11 h-11 grid place-items-center rounded-full bg-primary-gradient text-white font-bold">
                  {t.n[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="contact" className="py-24" style={{ background: "var(--gradient-soft)" }}>
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-hero-gradient text-white p-8 md:p-14 shadow-elegant">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary-glow/40 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">Đặt lịch tư vấn ngay hôm nay</h2>
              <p className="mt-5 text-white/75 max-w-md">Bạn không cần biết kỹ thuật. Chỉ cần mô tả vấn đề đang gặp — Evovi sẽ gợi ý hướng làm rõ ràng và dễ triển khai.</p>
              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary-glow" /> admin@evovi.vn</div>
                <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary-glow" /> 0559726689</div>
                <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary-glow" /> Hà Nội · TP. Hồ Chí Minh</div>
              </div>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 space-y-4"
            >
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-14 h-14 mx-auto text-primary-glow" />
                  <h3 className="mt-4 text-xl font-semibold">Đã gửi thành công!</h3>
                  <p className="mt-2 text-white/70 text-sm">Evovi sẽ liên hệ sớm để hẹn lịch trao đổi.</p>
                </div>
              ) : (
                <>
                  {[
                    { n: "name", t: "text", l: "Họ và tên", p: "Nguyễn Văn A" },
                    { n: "company", t: "text", l: "Tên công ty", p: "Công ty TNHH ABC" },
                    { n: "email", t: "email", l: "Email", p: "you@company.com" },
                    { n: "phone", t: "tel", l: "Số điện thoại", p: "0909 000 000" },
                  ].map(f => (
                    <div key={f.n}>
                      <label className="block text-xs font-medium mb-1.5 text-white/80">{f.l}</label>
                      <input required type={f.t} name={f.n} placeholder={f.p} maxLength={255}
                        className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-primary-glow focus:bg-white/15 transition" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-white/80">Chức vụ</label>
                    <select required name="role" defaultValue=""
                      className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-glow focus:bg-white/15 transition appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-no-repeat bg-[right_1rem_center]">
                      <option value="" disabled className="text-foreground">-- Chọn chức vụ --</option>
                      <option value="ceo" className="text-foreground">CEO / Founder</option>
                      <option value="cto" className="text-foreground">CTO / Tech Lead</option>
                      <option value="manager" className="text-foreground">Quản lý / Trưởng phòng</option>
                      <option value="product" className="text-foreground">Product Manager</option>
                      <option value="marketing" className="text-foreground">Marketing / Sales</option>
                      <option value="developer" className="text-foreground">Developer / Engineer</option>
                      <option value="other" className="text-foreground">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-white/80">Nhu cầu</label>
                    <textarea required rows={3} name="need" maxLength={1000} placeholder="Bạn đang gặp vấn đề gì? Ví dụ: quản lý đơn hàng, quản lý kho, báo cáo, chăm sóc khách hàng..."
                      className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-primary-glow focus:bg-white/15 transition resize-none" />
                  </div>
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white text-primary px-6 py-3.5 font-semibold hover:shadow-glow transition-all">
                    Gửi thông tin để được gọi lại <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background/80 py-14">
      <div className="container-x grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display font-bold text-xl text-background">
            <img src={logo} alt="Evovi" width={32} height={32} loading="lazy" className="w-8 h-8 object-contain" />
            Evovi
          </div>
          <p className="mt-4 text-sm max-w-sm">Giải pháp phần mềm thiết kế riêng, giúp doanh nghiệp tăng trưởng bền vững bằng công nghệ.</p>
        </div>
        <div>
          <h4 className="text-background font-semibold mb-4">Công ty</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-background">Về Evovi</a></li>
            <li><a href="#services" className="hover:text-background">Dịch vụ</a></li>
            <li><a href="#cases" className="hover:text-background">Dự án</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-background font-semibold mb-4">Liên hệ</h4>
          <ul className="space-y-2 text-sm">
            <li>admin@evovi.vn</li>
            <li>0559726689</li>
            <li>Hà Nội · TP. HCM</li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-10 pt-6 border-t border-background/10 text-xs flex flex-col md:flex-row justify-between gap-3">
        <span>© {new Date().getFullYear()} Evovi. Bảo lưu mọi quyền.</span>
      </div>
    </footer>
  );
}

function FloatingChat() {
  return (
    <a href="#contact" aria-label="Chat với Evovi"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 grid place-items-center rounded-full bg-primary-gradient text-white shadow-glow hover:scale-110 transition-transform">
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <Solution />
        <Services />
        <Process />
        <CaseStudies />
        <WhyEvovi />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
}
