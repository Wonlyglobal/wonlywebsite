import { Gem, ShieldCheck, Cpu, Sparkles, Home, Award } from "lucide-react";
import { BASE } from "@/lib/site-ui";
import { ProductPage, type ProductPageData } from "@/lib/product-page";

const data: ProductPageData = {
  seo: {
    title: "YIZHAI YISHU — Artisan Ultra-Premium Villa Doors | WONLY",
    description: "WONLY YIZHAI YISHU artisan collection: sculptural bespoke villa security doors and integrated smart-home entry systems — protection elevated to heritage craft.",
    path: "/products/yizhai-yishu",
  },
  hero: {
    eyebrow: "YIZHAI YISHU · Artisan Collection",
    title: <>Where security<br />becomes <span style={{ color: "#D4C4A0" }}>art</span></>,
    sub: "Sculptural, bespoke villa doors and integrated smart-home entry systems — protection elevated to heritage craftsmanship, for estates and flagship projects.",
    img: `${BASE}images/yizhai-1.webp`,
    mode: "scene",
  },
  highlights: ["Flagship villa security doors", "Integrated smart-home door systems", "Exclusive bespoke luxury service"],
  featuresEyebrow: "The Artisan Standard",
  featuresTitle: "Heritage Craft, Uncompromising Security",
  features: [
    { icon: Gem, t: "Sculptural Design", d: "Hand-finished relief artistry rendered onto a cast, high-security core." },
    { icon: ShieldCheck, t: "Ultra-High Security", d: "Villa-grade protection engineered beneath the artistry — never a trade-off." },
    { icon: Cpu, t: "Integrated Smart Entry", d: "Face recognition, sensing and whole-house intelligence built in from the start." },
    { icon: Sparkles, t: "Bespoke Customization", d: "Materials, finishes and motifs designed to your private commission." },
    { icon: Home, t: "For Villas & Flagships", d: "Made for estates, penthouses and landmark flagship projects." },
    { icon: Award, t: "Award-Winning", d: "Recognized by Red Dot Best of the Best and the iF Design Award." },
  ],
  band: { img: `${BASE}images/yizhai-3.webp`, eyebrow: "Made to Commission", title: "One Of A Kind, By Design" },
  cta: { eyebrow: "Bespoke Enquiry", title: "Commission A WONLY Artisan Door", sub: "Tell us about your residence or project — our bespoke team will design to your brief." },
};

export default function YizhaiYishu() { return <ProductPage data={data} />; }
