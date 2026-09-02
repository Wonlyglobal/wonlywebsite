import { Link } from "react-router-dom";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useSeo, SITE_URL } from "@/lib/seo";
import { BASE, CHAMP_BG, DARK, GOLD, MUTED, SiteHeader, SiteFooter, CtaBand } from "@/lib/site-ui";

export type DoorGrade = "metal-1-0" | "metal-1-0-pro" | "metal-2-0" | "metal-3-0" | "smart-3-0-pro" | "smart-3-0-max" | "smart-4-0" | "smart-5-0";

type Model = { name: string; image: string; href?: string };
type GradeData = {
  family: "Metal Door" | "Smart Door";
  grade: string;
  path: string;
  title: string;
  description: string;
  summary: string;
  capabilities: string[];
  models: Model[];
  hero: string;
};

const model = (name: string, image: string, href?: string): Model => ({ name, image: `${BASE}${image}`, href });

const DATA: Record<DoorGrade, GradeData> = {
  "metal-1-0": {
    family: "Metal Door", grade: "1.0", path: "/products/metal-doors/1-0",
    title: "Metal Door 1.0",
    description: "Understand WONLY Metal Door 1.0, the conventional security-door baseline used to compare later anti-pinch, durability and connected entrance generations.",
    summary: "The conventional metal security-door baseline: a mechanical entrance platform for projects that do not require the enhanced anti-pinch, monitoring or powered functions of later generations.",
    capabilities: ["Conventional mechanical entrance", "Metal security-door construction", "Project sizing and finish consultation"],
    models: [], hero: `${BASE}images/category-renders/metal-door.webp`,
  },
  "metal-1-0-pro": {
    family: "Metal Door", grade: "1.0 Pro", path: "/products/metal-doors/1-0-pro",
    title: "Metal Door 1.0 Pro",
    description: "Explore WONLY Metal Door 1.0 Pro models from the 2026 retail catalogue, including N9518, P101 and Y106.",
    summary: "An early upgraded security-door generation with a broader design range for residential entrances. WONLY's later 2.0 and 3.0 platforms add further lock-body and lifecycle advances.",
    capabilities: ["Residential metal-door platform", "Multiple panel and finish designs", "Made-to-measure project configuration"],
    models: [model("N9518", "images/category-renders/metal-door.webp"), model("P101", "images/alu-t200.webp"), model("Y106", "images/alu-40.webp")],
    hero: `${BASE}images/category-renders/metal-door.webp`,
  },
  "metal-2-0": {
    family: "Metal Door", grade: "2.0", path: "/products/metal-doors/2-0",
    title: "Metal Door 2.0",
    description: "Explore the WONLY Metal Door 2.0 security-door generation and P106 model with an anti-pinch lock-body architecture.",
    summary: "The 2.0 generation introduces an anti-pinch lock-body concept to the conventional metal security door, forming the bridge between basic mechanical entrances and the more durable 3.0 platform.",
    capabilities: ["Anti-pinch lock-body architecture", "Residential security-door construction", "Project finish and handing options"],
    models: [model("P106", "images/alu-t200.webp")], hero: `${BASE}images/alu-t200.webp`,
  },
  "metal-3-0": {
    family: "Metal Door", grade: "3.0", path: "/products/metal-doors/3-0",
    title: "Metal Door 3.0",
    description: "Compare WONLY Metal Door 3.0 security-door models with anti-pinch architecture, high picking resistance and long-cycle closing performance.",
    summary: "The mature mechanical security-door generation in WONLY's 2026 selection guide, combining anti-pinch architecture with stronger picking resistance and long-term closing stability.",
    capabilities: ["Anti-pinch lock-body architecture", "36× Class C picking resistance in catalogue testing", "Designed to retain stable closing performance over long service life"],
    models: ["S101", "S116", "P102", "P103", "GL097 Pro", "GL098 Pro", "Y118", "Y119"].map((name, i) => model(name, i % 2 ? "images/alu-40.webp" : "images/alu-k300pro.webp")),
    hero: `${BASE}images/alu-k300pro.webp`,
  },
  "smart-3-0-pro": {
    family: "Smart Door", grade: "3.0 Pro", path: "/products/smart-doors/3-0-pro",
    title: "Smart Door 3.0 Pro",
    description: "Explore WONLY Smart Door 3.0 Pro models K300 Pro and L5857 with a 10.1-inch display, formaldehyde monitoring and threshold-free sealing.",
    summary: "The starting point of the integrated Smart Door range: the door, access hardware, indoor display, environmental sensing and threshold seal are planned as one entrance system.",
    capabilities: ["10.1-inch HD touchscreen", "24/7 formaldehyde monitoring", "Threshold-free automatic seal", "Anti-pinch architecture and backup power"],
    models: [model("K300 Pro", "images/alu-k300pro.webp"), model("L5857", "images/alu-k300max.webp")], hero: `${BASE}images/alu-k300pro.webp`,
  },
  "smart-3-0-max": {
    family: "Smart Door", grade: "3.0 Max", path: "/products/smart-doors/3-0-max",
    title: "Smart Door 3.0 Max",
    description: "Explore WONLY Smart Door 3.0 Max models K300 Max-C, K300 Max and L5601 with integrated monitoring, display and entrance protection.",
    summary: "An expanded 3.0 smart entrance platform that builds on the integrated display, air monitoring and threshold-free seal with privacy-conscious doorway monitoring.",
    capabilities: ["Integrated 10.1-inch display", "Environmental monitoring", "Privacy-masked doorway monitoring", "Threshold-free seal and backup power"],
    models: [model("K300 Max-C", "images/alu-k300max.webp"), model("K300 Max", "images/alu-k300max.webp"), model("L5601", "images/alu-40.webp")], hero: `${BASE}images/alu-k300max.webp`,
  },
  "smart-4-0": {
    family: "Smart Door", grade: "4.0", path: "/products/smart-doors/4-0",
    title: "Smart Door 4.0",
    description: "Explore WONLY Smart Door 4.0 models T200 and L5859 with integrated display, air monitoring, privacy masking and threshold-free access.",
    summary: "A recommended integrated entrance generation focused on daily usability: visual control, environmental monitoring, privacy protection and accessible threshold-free passage.",
    capabilities: ["10.1-inch HD touchscreen", "Formaldehyde and air-quality monitoring", "Privacy-masked monitoring", "Threshold-free seal and dual-power protection"],
    models: [model("T200", "images/catalog-2026/hero-renders/t200.webp", "/products/security-doors/t200"), model("L5859", "images/alu-k300max.webp")], hero: `${BASE}images/catalog-2026/hero-renders/t200.webp`,
  },
  "smart-5-0": {
    family: "Smart Door", grade: "5.0", path: "/products/smart-doors/5-0",
    title: "Smart Door 5.0",
    description: "Compare WONLY Smart Door 5.0 models with automatic opening, long-range arrival sensing, anti-pinch protection and whole-home connectivity.",
    summary: "WONLY's top smart entrance generation, designed to recognize an authorized arrival, coordinate automatic opening and connect the entrance with the wider home experience.",
    capabilities: ["Automatic opening and closing", "Arrival sensing from approximately 5–6 m in the catalogue scenario", "Anti-pinch sensing and whole-home connection", "Integrated display, air monitoring, privacy masking and backup power"],
    models: [
      model("X70 Shunliu", "images/catalog-2026/hero-renders/x70.webp", "/products/security-doors/x70"),
      model("X70 Jinxiu", "images/catalog-2026/hero-renders/x70.webp", "/products/security-doors/x70"),
      model("X60 Max", "images/catalog-2026/models/x60-max.webp", "/products/security-doors/x60-max"),
      model("X60 Pro", "images/catalog-2026/models/x60-pro.webp", "/products/security-doors/x60-pro"),
      model("X50 Max", "images/catalog-2026/models/x50-max.webp", "/products/security-doors/x50-max"),
      model("X50 Pro", "images/catalog-2026/hero-renders/x50-pro.webp", "/products/security-doors/x50-pro"),
    ], hero: `${BASE}images/catalog-2026/hero-renders/x70.webp`,
  },
};

export default function DoorGradePage({ grade }: { grade: DoorGrade }) {
  const data = DATA[grade];
  useSeo({
    title: `${data.title} — Models & Capabilities | WONLY`,
    description: data.description,
    path: data.path,
    type: "website",
    jsonLd: {
      "@context": "https://schema.org", "@type": "ItemList", name: `${data.title} models`,
      itemListElement: data.models.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}) })),
    },
  });

  return <div className="min-h-screen font-sans antialiased" style={{ background: CHAMP_BG, color: DARK }}>
    <SiteHeader />
    <main>
      <section className="px-[7vw] pt-36 pb-20 md:pt-44 md:pb-28 bg-white">
        <div className="mx-auto max-w-[1500px] grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] font-medium" style={{ color: GOLD }}>{data.family} · {data.grade}</p>
            <h1 className="mt-5 text-[44px] md:text-[68px] leading-[1.02] font-light tracking-[-0.03em]">{data.title}</h1>
            <p className="mt-7 max-w-xl text-lg leading-8" style={{ color: MUTED }}>{data.summary}</p>
            <a href="#models" className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium" style={{ background: GOLD, color: DARK }}>Explore this level <ArrowRight size={16} /></a>
          </div>
          <div className="aspect-[16/10] rounded-[28px] overflow-hidden border" style={{ background: "#f7f4ee", borderColor: "#e3ddd2" }}>
            <img src={data.hero} alt={`${data.title} product range`} className="h-full w-full object-contain p-6 md:p-10" />
          </div>
        </div>
      </section>

      <section className="px-[7vw] py-20 md:py-28">
        <div className="mx-auto max-w-[1500px] grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div><p className="text-xs uppercase tracking-[0.24em]" style={{ color: GOLD }}>Verified capability level</p><h2 className="mt-4 text-3xl md:text-5xl font-light">What this generation adds</h2></div>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.capabilities.map((capability) => <div key={capability} className="flex gap-3 rounded-2xl bg-white p-6 border" style={{ borderColor: "#e5dfd4" }}><Check className="mt-0.5 shrink-0" size={18} style={{ color: GOLD }} /><span className="leading-6">{capability}</span></div>)}
          </div>
        </div>
      </section>

      <section id="models" className="px-[7vw] py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-[1500px]">
          <p className="text-xs uppercase tracking-[0.24em]" style={{ color: GOLD }}>2026 retail catalogue</p>
          <h2 className="mt-4 text-3xl md:text-5xl font-light">Models in {data.title}</h2>
          {data.models.length ? <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {data.models.map((item) => {
              const card = <><div className="aspect-[4/3] rounded-2xl overflow-hidden" style={{ background: "#f6f3ed" }}><img src={item.image} alt={`${item.name} ${data.title}`} loading="lazy" className="w-full h-full object-contain p-5" /></div><div className="mt-4 flex items-center justify-between gap-3"><h3 className="text-lg font-normal">{item.name}</h3>{item.href && <ArrowRight size={16} />}</div></>;
              return item.href ? <Link key={item.name} to={item.href} className="rounded-3xl border p-4 transition-transform hover:-translate-y-1" style={{ borderColor: "#e5dfd4" }}>{card}</Link> : <article key={item.name} className="rounded-3xl border p-4" style={{ borderColor: "#e5dfd4" }}>{card}</article>;
            })}
          </div> : <div className="mt-10 rounded-3xl border p-8 md:p-10 flex gap-4" style={{ borderColor: "#e5dfd4", background: CHAMP_BG }}><ShieldCheck size={26} style={{ color: GOLD }} /><div><h3 className="text-xl">Baseline configuration</h3><p className="mt-2 leading-7" style={{ color: MUTED }}>The current retail catalogue uses 1.0 as the conventional comparison baseline and does not assign a named model on the selection-guide page. Contact WONLY with the project size, opening direction and finish requirement for a current recommendation.</p></div></div>}
        </div>
      </section>
    </main>
    <CtaBand title={`Get ${data.title} Models & Project Pricing`} sub="Share your market, opening size, quantity and required functions. WONLY sales engineering will recommend the right model and configuration." subject={`${data.title} model recommendation and quotation`} /><SiteFooter />
  </div>;
}
