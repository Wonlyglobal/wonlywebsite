import { ArrowRight, Check, ShieldCheck, Sparkles, ScanFace, Hand, BatteryCharging, Monitor, Wind, LockKeyhole, DoorOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useSeo, SITE_URL } from "@/lib/seo";
import { BASE, CHAMP, CHAMP_BG, DARK, GOLD, GOLD_DEEP, MUTED, SILVER, SiteFooter, SiteHeader, Reveal, eyebrow, h2cls, useQuoteStore } from "@/lib/site-ui";
import { DoorModelSelector } from "@/lib/DoorModelSelector";

type ProductKey = "s80-max" | "x50-pro" | "t200";

type ProductData = {
  model: string;
  category: string;
  categoryPath: string;
  path: string;
  title: string;
  description: string;
  hero: string;
  intro: string;
  highlights: string[];
  bestFor: string[];
  applications?: { image: string; alt: string; title: string; text: string }[];
  features: { icon: typeof ShieldCheck; title: string; text: string }[];
  gallery: { image: string; alt: string; title: string; text: string }[];
  specs: [string, string][];
  faq: { q: string; a: string }[];
};

const PRODUCTS: Record<ProductKey, ProductData> = {
  "s80-max": {
    model: "S80 Max",
    category: "True Smart Locks",
    categoryPath: "/products/smart-locks",
    path: "/products/smart-locks/s80-max",
    title: "WONLY S80 Max Remote-Sensing True Smart Lock",
    description: "Explore the WONLY S80 Max remote-sensing true smart lock with hands-free approach unlocking, 3D face recognition, anti-pinch protection and app access.",
    hero: `${BASE}images/catalog-2026/s80.webp`,
    intro: "A flagship Smart Lock 4.0 platform designed to recognize an authorized user before they reach the door, then open and close automatically without a handle pull.",
    highlights: ["2-4 m remote-sensing recognition", "Triple-Protection Separation architecture", "Anti-pinch lock body exclusive to WONLY"],
    bestFor: ["Premium apartments", "Villas and smart homes", "Executive residences", "High-end residential projects"],
    features: [
      { icon: Sparkles, title: "Arrive. It Is Already Open.", text: "Remote-sensing recognition works with a dedicated SIM card carried in a phone, watch or key fob to prepare the lock before arrival." },
      { icon: ScanFace, title: "Multiple Verified Entry Methods", text: "3D face recognition, fingerprint, passcode, encrypted M1 card, mechanical key and app access support different users and situations." },
      { icon: Hand, title: "Pinch-Free Operation", text: "The WONLY anti-pinch lock body is designed to keep the moving mechanism away from fingers during automatic closing." },
      { icon: ShieldCheck, title: "Triple-Protection Separation", text: "Capture, recognition and control are assigned to separate boards, reducing the risk that one compromised component controls the entire lock." },
      { icon: Monitor, title: "Sentinel Door Viewer", text: "A 5-inch HD display supports real-time monitoring, remote video, loitering snapshots and video door-viewer functions." },
      { icon: LockKeyhole, title: "Mechanical Security Backup", text: "Compatible WONLY high-security lock bodies and cylindrical electric lock cores retain a mechanical emergency path." },
    ],
    gallery: [
      { image: `${BASE}images/catalog-2026/details/s80-lifestyle.jpg`, alt: "S80 Max installed on a premium entrance door", title: "Designed for a Natural Arrival", text: "The remote-sensing experience starts before the user reaches the door, reducing the need to stop, search for a key or touch the lock." },
      { image: `${BASE}images/catalog-2026/details/s80-panels.jpg`, alt: "S80 Max front and rear smart lock panels", title: "A Complete Inside-and-Outside System", text: "Front recognition hardware, the indoor display and the automatic lock platform are engineered as one entrance solution." },
    ],
    specs: [
      ["Product type", "Remote-sensing true smart lock"], ["Version", "Max / Smart Lock 4.0"], ["Colour", "Xuanwu Gold"],
      ["Standard access", "Fingerprint, passcode, encrypted M1 card, mechanical key and app"],
      ["Optional functions", "Auto-open/auto-close and 220 V mains supply"],
      ["Front panel", "445.1 × 85 × 59 mm"], ["Rear panel", "451.5 × 83.9 × 74.4 mm"],
    ],
    faq: [
      { q: "How does S80 Max hands-free unlocking work?", a: "The lock recognizes an authorized dedicated SIM credential carried in a compatible phone, watch or key fob as the user approaches." },
      { q: "Can S80 Max still be opened without remote sensing?", a: "Yes. Standard access includes fingerprint, passcode, encrypted card, mechanical key and app unlocking." },
      { q: "Which doors and lock bodies are compatible?", a: "Compatibility depends on the selected WONLY mechanical auto-opening or double-action quick-latch lock body and the project door configuration. Submit the door specification for confirmation." },
    ],
  },
  "x50-pro": {
    model: "X50 Pro",
    category: "Smart Security Doors",
    categoryPath: "/products/security-doors",
    path: "/products/security-doors/x50-pro",
    title: "WONLY X50 Pro Smart Security Door 5.0",
    description: "Discover the WONLY X50 Pro Smart Door 5.0 with remote sensing, physical anti-pinch protection, 10.1-inch display and integrated smart-home access.",
    hero: `${BASE}images/catalog-2026/x50.webp`,
    intro: "A complete smart entrance system that combines the door leaf, lock, display, camera, power system and whole-home integration in one engineered platform.",
    highlights: ["Automatic opening and closing", "Remote sensing with physical anti-pinch", "Grade 4 burglary resistance"],
    bestFor: ["Luxury residences", "Smart villas", "Premium apartments", "Residential developments"],
    features: [
      { icon: DoorOpen, title: "Automatic Open and Close", text: "The powered door and lock system supports hands-free entry while preserving an electronic button and mechanical inside release." },
      { icon: Hand, title: "Physical Anti-Pinch", text: "A mechanical protection concept is integrated into the entrance system to reduce finger-trapping risk during powered operation." },
      { icon: Monitor, title: "10.1-Inch IPS Display", text: "A large multi-touch indoor display brings door-viewer video and entrance controls into one clear interface." },
      { icon: ScanFace, title: "Flexible Unlocking", text: "Remote sensing, face recognition, PIN, CPU card, temporary PIN, mechanical key and app access cover daily and visitor use." },
      { icon: ShieldCheck, title: "Security Door Construction", text: "A 1.5 mm engraved steel door leaf, high-security lock body and patented cylindrical core form the physical security layer." },
      { icon: Sparkles, title: "Whole-Home Integration", text: "The entrance can align with the wider smart-home ecosystem instead of operating as an isolated connected device." },
    ],
    gallery: [
      { image: `${BASE}images/catalog-2026/details/x50-exterior.jpg`, alt: "X50 Pro smart security door exterior", title: "A Statement Entrance", text: "The X50 Pro combines a full-height security door, integrated access hardware and premium surface finishing for high-end residential entrances." },
      { image: `${BASE}images/catalog-2026/details/x50-interior.jpg`, alt: "X50 Pro interior panel and large display", title: "Control from the Interior", text: "The interior side brings together the large IPS display, door-viewer functions, power system and manual emergency controls." },
    ],
    specs: [
      ["Opening", "Automatic open and close"], ["Key features", "Remote sensing and physical anti-pinch"],
      ["Burglary resistance", "Grade 4"], ["Display", "10.1-inch IPS multi-touch display"], ["Door viewer", "2 MP"],
      ["Power", "220 V / 24 V mains plus 4,200 mAh backup lithium battery"], ["Door leaf", "1.5 mm engraved steel panel"],
      ["Hinges", "Concealed-mount hinges"], ["Colour options", "Marble Grey, Sycamore Green, Slate Grey, Espresso Brown and Twilight Purple"],
    ],
    faq: [
      { q: "Does X50 Pro work during a power interruption?", a: "The catalogue specifies a 4,200 mAh backup lithium battery alongside mains power. Final runtime depends on configuration and use." },
      { q: "Can X50 Pro connect to a smart-home system?", a: "Yes. It is designed for ecosystem integration; project compatibility should be confirmed with the WONLY sales engineering team." },
      { q: "Can the colour and door configuration be customized?", a: "The catalogue provides five colour options. Door size, handing, lock and project configuration are confirmed through a specification request." },
    ],
  },
  t200: {
    model: "T200",
    category: "Security Doors",
    categoryPath: "/products/security-doors",
    path: "/products/security-doors/t200",
    title: "WONLY T200 Hands-Free Anti-Pinch Security Door",
    description: "Explore the WONLY T200 security door with smart auto-open, pinch-free clearance, threshold-free sealing, privacy monitoring and dual-power protection.",
    hero: `${BASE}images/catalog-2026/t200.webp`,
    intro: "A people-first security entrance built for users who find conventional doors hardest, especially children, older family members and anyone carrying bags or mobility aids.",
    highlights: ["Hands-free opening", "Pinch-free 80 mm clearance", "Threshold-free automatic seal"],
    bestFor: ["Family residences", "Senior-friendly homes", "Accessible apartments", "Premium residential projects"],
    applications: [
      { image: `${BASE}images/catalog-2026/applications/t200-family.webp`, alt: "Family entering a contemporary home through the WONLY T200 security door", title: "Family Residences", text: "Hands-free opening helps parents and children move through the entrance naturally when arriving home with school bags, shopping or luggage." },
      { image: `${BASE}images/catalog-2026/applications/t200-senior.webp`, alt: "Older resident using a WONLY T200 security door at a senior-friendly home", title: "Senior-Friendly Homes", text: "A comfortable approach, generous handle clearance and a flat passage reduce common grip, reach and trip difficulties for older residents." },
      { image: `${BASE}images/catalog-2026/applications/t200-accessible.webp`, alt: "Wheelchair user passing through an accessible entrance fitted with a WONLY T200 security door", title: "Accessible Apartments", text: "The threshold-free automatic seal supports smoother wheelchair and mobility-aid access without adding a raised sill across the doorway." },
      { image: `${BASE}images/catalog-2026/applications/t200-premium.webp`, alt: "WONLY T200 installed at a premium residential project entrance", title: "Premium Residential Projects", text: "Integrated security, smart access and a refined architectural finish make T200 suitable for premium apartments, villas and residential developments." },
    ],
    features: [
      { icon: DoorOpen, title: "Smart Auto-Open", text: "The opener activates only after the lock is fully retracted, helping keep the mechanism synchronized during automatic entry." },
      { icon: Hand, title: "80 mm Pinch-Free Clearance", text: "A large gap between the handle and frame gives hands more space and reduces the risk of trapped fingers." },
      { icon: Wind, title: "Threshold-Free Seal", text: "No raised sill is required: an automatic seal drops on closing and lifts when the door opens." },
      { icon: Monitor, title: "10.1-Inch HD Display", text: "The large indoor screen combines entrance status and connected information in an accessible viewing area." },
      { icon: ShieldCheck, title: "Privacy-Masked Monitoring", text: "The monitoring design focuses on the entrance zone while masking unrelated neighboring areas." },
      { icon: BatteryCharging, title: "Dual Power", text: "A 220 V mains supply with battery backup keeps the door system operating during a power interruption." },
      { icon: LockKeyhole, title: "Patented Cylindrical Core", text: "The Class C cylindrical lock-core platform is presented with 360-minute manipulation resistance." },
      { icon: ShieldCheck, title: "Patented High-Security Lock Body", text: "The lock-body platform is designed around WONLY's security-door expertise and protected engineering." },
    ],
    gallery: [
      { image: `${BASE}images/catalog-2026/details/t200-auto-open.webp`, alt: "T200 security door opening automatically for a resident", title: "Smart Auto-Open", text: "The opener activates only after the lock is fully retracted, so powered entry stays synchronized instead of forcing the mechanism." },
      { image: `${BASE}images/catalog-2026/details/t200-clearance.webp`, alt: "T200 handle with 80 millimetres of anti-pinch clearance", title: "80 mm Pinch-Free Clearance", text: "Extra space between the handle and frame helps keep both left and right hands clear while closing the door." },
      { image: `${BASE}images/catalog-2026/details/t200-threshold.webp`, alt: "T200 threshold-free automatic bottom seal", title: "Threshold-Free Automatic Seal", text: "The seal retracts when opening and drops when closing, keeping the passage flat for children, older users and pushchairs." },
      { image: `${BASE}images/catalog-2026/details/t200-display.webp`, alt: "T200 large indoor display and connected entrance information", title: "10.1-Inch HD Display", text: "A large indoor screen presents entrance status, door-viewer information and connected functions in one accessible interface." },
      { image: `${BASE}images/catalog-2026/details/t200-air-quality.webp`, alt: "T200 air-quality monitoring connected to a mobile phone", title: "Air-Quality Sentry", text: "The entrance system can track temperature, humidity, PM2.5 and formaldehyde, then alert the user when readings move out of range." },
      { image: `${BASE}images/catalog-2026/details/t200-privacy.webp`, alt: "T200 privacy-masked monitoring field around the entrance", title: "Privacy-Masked Monitoring", text: "The camera keeps the user's doorway visible while masking unrelated neighboring areas and supporting parcel monitoring." },
      { image: `${BASE}images/catalog-2026/details/t200-core.webp`, alt: "Exploded view of the T200 patented cylindrical lock core", title: "Class C Cylindrical Lock Core", text: "The patented cylindrical platform is presented with 360-minute resistance to manipulation for a stronger mechanical security layer." },
      { image: `${BASE}images/catalog-2026/details/t200-lock-body.webp`, alt: "T200 patented high-security mechanical lock body", title: "Patented High-Security Lock Body", text: "WONLY's mechanical lock-body platform combines protected engineering with two-way anti-prise hooks." },
      { image: `${BASE}images/catalog-2026/details/t200-dual-power.webp`, alt: "T200 indoor panel with built-in backup battery", title: "Dual-Power Protection", text: "A 220 V mains supply and built-in battery backup help keep essential door functions available during a power interruption." },
    ],
    specs: [
      ["Entrance concept", "Hands-free open, pinch-free close"], ["Handle clearance", "80 mm"],
      ["Floor interface", "Threshold-free automatic drop seal"], ["Indoor display", "10.1-inch HD"],
      ["Monitoring", "Privacy-masked entrance monitoring"], ["Power", "220 V mains with battery backup"],
      ["Lock core", "Patented cylindrical core, Class C"], ["Configuration", "Final size, finish, handing and compliance options confirmed per project"],
    ],
    faq: [
      { q: "Why is T200 suitable for senior-friendly homes?", a: "Hands-free operation, enlarged handle clearance and a threshold-free seal reduce common reach, grip and trip difficulties." },
      { q: "Does the automatic seal leave a raised threshold?", a: "No. The seal is designed to drop when the door closes and lift when it opens, preserving a flat passage." },
      { q: "Can T200 specifications be adapted for a project?", a: "Yes. Door size, finish, handing, access configuration and required compliance documentation are confirmed by the sales engineering team." },
    ],
  },
};

export default function CatalogProductDetail({ product }: { product: ProductKey }) {
  const data = PRODUCTS[product];
  const openQuote = useQuoteStore((s) => s.openQuote);
  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Product", name: data.title, model: data.model, brand: { "@type": "Brand", name: "WONLY" }, description: data.description, image: `${SITE_URL}${data.hero.replace(BASE, "/")}`, url: `${SITE_URL}${data.path}/` },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Products", item: `${SITE_URL}/products/` }, { "@type": "ListItem", position: 2, name: data.category, item: `${SITE_URL}${data.categoryPath}/` }, { "@type": "ListItem", position: 3, name: data.model, item: `${SITE_URL}${data.path}/` }] },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: data.faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
  ];
  useSeo({ title: `${data.title} | WONLY`, description: data.description, path: data.path, image: `${SITE_URL}${data.hero.replace(BASE, "/")}`, type: "product", localized: false, jsonLd });
  const quote = () => openQuote({ subject: `${data.model} specifications and quotation` });

  return <div className="min-h-screen font-sans" style={{ background: CHAMP_BG, color: DARK }}>
    <SiteHeader />
    <main>
      <section className="px-[6vw] pt-28 pb-16 md:pt-36 md:pb-24 bg-white">
        <div className="max-w-[1450px] mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs mb-8" style={{ color: MUTED }}><Link to="/">Home</Link><span className="mx-2">/</span><Link to={data.categoryPath}>{data.category}</Link><span className="mx-2">/</span><span>{data.model}</span></nav>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
            <Reveal><div className={eyebrow} style={{ color: GOLD_DEEP }}>{data.category} · Flagship Model</div><h1 className="mt-5 text-[42px] md:text-[68px] font-light leading-[1.04] tracking-[-0.03em]">{data.model}</h1><p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: MUTED }}>{data.intro}</p><div className="mt-7 space-y-2.5">{data.highlights.map((item) => <div key={item} className="flex gap-3 items-start"><Check size={18} className="mt-1 shrink-0" style={{ color: GOLD }} /><span>{item}</span></div>)}</div><button onClick={quote} className="mt-9 inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold" style={{ background: GOLD, color: DARK }}>Get Specifications &amp; Quote <ArrowRight size={16} /></button></Reveal>
            <Reveal className="rounded-3xl overflow-hidden bg-[#ebe7df]" delay={80}><img src={data.hero} alt={`${data.model} ${data.category}`} className="w-full aspect-[4/3] object-cover" fetchPriority="high" /></Reveal>
          </div>
        </div>
      </section>

      {product !== "t200" && <section className="px-[6vw] py-20 md:py-28"><div className="max-w-[1450px] mx-auto"><div className={eyebrow} style={{ color: GOLD_DEEP }}>Product Advantages</div><h2 className={h2cls + " mt-4 max-w-3xl"}>Built Around Real Entrance Needs</h2><div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">{data.features.map((feature, i) => <Reveal key={feature.title} delay={(i % 3) * 60}><article className="h-full rounded-2xl bg-white border p-7" style={{ borderColor: `${SILVER}55` }}><feature.icon size={25} style={{ color: GOLD }} /><h3 className="mt-5 text-xl font-medium">{feature.title}</h3><p className="mt-3 text-sm leading-7" style={{ color: MUTED }}>{feature.text}</p></article></Reveal>)}</div></div></section>}

      <section className="px-[6vw] py-20 md:py-28 bg-white"><div className="max-w-[1450px] mx-auto"><div className={eyebrow} style={{ color: GOLD_DEEP }}>See the Difference</div><h2 className={h2cls + " mt-4 max-w-3xl"}>Functions You Can Understand at a Glance</h2><p className="mt-5 max-w-3xl leading-7" style={{ color: MUTED }}>Each function is shown as a separate product or use-case image, with searchable page text explaining the buyer benefit.</p><div className={`mt-12 grid md:grid-cols-2 ${data.gallery.length > 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"} gap-7`}>{data.gallery.map((item, index) => <Reveal key={item.title} delay={(index % 3) * 60}><article className="h-full overflow-hidden rounded-3xl border" style={{ borderColor: `${SILVER}55`, background: CHAMP_BG }}><div className="aspect-[16/10] bg-[#eeeae2] flex items-center justify-center overflow-hidden"><img src={item.image} alt={item.alt} className="w-full h-full object-contain" loading="lazy" /></div><div className="p-7 md:p-8"><h3 className="text-xl md:text-2xl font-medium">{item.title}</h3><p className="mt-3 leading-7" style={{ color: MUTED }}>{item.text}</p></div></article></Reveal>)}</div></div></section>

      <section className="px-[6vw] py-20 md:py-28"><div className="max-w-[1450px] mx-auto"><div className="max-w-3xl"><div className={eyebrow} style={{ color: GOLD_DEEP }}>Applications</div><h2 className={h2cls + " mt-4"}>Where {data.model} Fits</h2><p className="mt-5 leading-7" style={{ color: MUTED }}>Final product configuration is confirmed by WONLY sales engineering according to the market, door specification and project requirements.</p></div>{data.applications ? <div className="mt-12 grid md:grid-cols-2 gap-7">{data.applications.map((item, index) => <Reveal key={item.title} delay={(index % 2) * 70}><article className="h-full overflow-hidden rounded-3xl bg-white border" style={{ borderColor: `${SILVER}55` }}><div className="aspect-[16/10] overflow-hidden bg-[#e8e2d8]"><img src={item.image} alt={item.alt} className="w-full h-full object-cover" loading="lazy" /></div><div className="p-7 md:p-8"><h3 className="text-xl md:text-2xl font-medium">{item.title}</h3><p className="mt-3 leading-7" style={{ color: MUTED }}>{item.text}</p></div></article></Reveal>)}</div> : <div className="mt-12 grid sm:grid-cols-2 gap-4">{data.bestFor.map((item) => <div key={item} className="rounded-2xl p-6 flex gap-3 items-center bg-white"><Check size={18} style={{ color: GOLD }} /><span className="font-medium">{item}</span></div>)}</div>}</div></section>

      <section className="px-[6vw] py-20 md:py-28"><div className="max-w-5xl mx-auto"><div className={eyebrow} style={{ color: GOLD_DEEP }}>Specifications</div><h2 className={h2cls + " mt-4"}>Catalogue-Verified Details</h2><div className="mt-10 border-t" style={{ borderColor: `${SILVER}88` }}>{data.specs.map(([key, value]) => <div key={key} className="grid md:grid-cols-[0.38fr_0.62fr] gap-2 py-5 border-b" style={{ borderColor: `${SILVER}66` }}><div className="text-xs uppercase tracking-[0.15em] font-semibold" style={{ color: GOLD_DEEP }}>{key}</div><div>{value}</div></div>)}</div><p className="mt-5 text-xs leading-6" style={{ color: MUTED }}>Specifications shown are based on the current WONLY English catalogue. Availability and final configuration must be confirmed with the sales team.</p></div></section>

      <section className="px-[6vw] py-20 md:py-28 bg-white"><div className="max-w-4xl mx-auto"><div className={eyebrow} style={{ color: GOLD_DEEP }}>Buyer Questions</div><h2 className={h2cls + " mt-4"}>Frequently Asked Questions</h2><div className="mt-10 divide-y" style={{ borderColor: `${SILVER}66` }}>{data.faq.map((item) => <article key={item.q} className="py-6"><h3 className="text-lg font-medium">{item.q}</h3><p className="mt-3 leading-7" style={{ color: MUTED }}>{item.a}</p></article>)}</div></div></section>

      <DoorModelSelector group={product === "s80-max" ? "smart-lock" : "security"} currentPath={data.path} />

      <section className="px-[6vw] py-24 text-center" style={{ background: DARK }}><div className="max-w-3xl mx-auto"><div className={eyebrow} style={{ color: CHAMP }}>Sales Consultation</div><h2 className="mt-5 text-white text-[34px] md:text-[54px] font-light leading-tight">Get {data.model} Specifications &amp; Quote</h2><p className="mt-5 text-white/65">Tell us your market or project requirements. The form will identify this product automatically for our sales team.</p><button onClick={quote} className="mt-8 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold" style={{ background: GOLD, color: DARK }}>Contact WONLY Sales <ArrowRight size={16} /></button></div></section>
    </main>
    <SiteFooter />
  </div>;
}
