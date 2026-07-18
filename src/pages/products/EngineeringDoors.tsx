import { Flame, Lock, Volume2, Globe, Layers, ShieldCheck } from "lucide-react";
import { BASE } from "@/lib/site-ui";
import { ProductPage, type ProductPageData } from "@/lib/product-page";

const data: ProductPageData = {
  seo: {
    title: "Engineering Doors — Fire, Access-Control & Acoustic | WONLY",
    description: "WONLY engineering doors for projects: EN 1634 90-minute fire doors, access-control and acoustic variants — compliant with Gulf, Southeast Asia and Central Asia standards, supplied at scale.",
    path: "/products/engineering-doors",
  },
  hero: {
    eyebrow: "Engineering Doors",
    title: <>Certified for<br /><span style={{ color: "#D4C4A0" }}>every</span> code</>,
    sub: "Fire, access-control and acoustic doors compliant with Gulf, Southeast Asia and Central Asia standards — standardized and supplied at project scale.",
    img: `${BASE}images/alu-t200.webp`,
    mode: "render",
  },
  highlights: ["EN 1634 — 90-minute fire integrity", "Access-control & acoustic variants", "Standardized, certified project supply"],
  featuresEyebrow: "Project-Ready",
  featuresTitle: "One Supplier For The Whole Spec",
  features: [
    { icon: Flame, t: "Fire Doors", d: "EN 1634-rated with 90-minute integrity for life-safety compliance." },
    { icon: Lock, t: "Access-Control Doors", d: "Card, biometric and controller-ready systems for managed entrances." },
    { icon: Volume2, t: "Acoustic Doors", d: "STC-rated cores for hospitals, hotels, offices and residential corridors." },
    { icon: Globe, t: "Global Standards", d: "Compliant with Saudi, Southeast Asia and Central Asia codes." },
    { icon: Layers, t: "Project-Scale Supply", d: "Standardized, certified volume for large developments and tenders." },
    { icon: ShieldCheck, t: "Tested & Certified", d: "Every model passes in-house destructive testing before it ships." },
  ],
  band: { img: `${BASE}images/proj-1.webp`, eyebrow: "Landmark Projects", title: "Chosen For The Projects That Cannot Fail" },
  specs: [
    ["Fire Rating", "EN 1634 — up to 90 minutes"],
    ["Types", "Fire · Access-control · Acoustic"],
    ["Material", "Steel / cast-aluminum core"],
    ["Compliance", "Gulf · SE Asia · Central Asia standards"],
    ["Supply", "Standardized, project-scale volume"],
    ["Certification", "ISO 9001 · CE · UL · EN 1634"],
  ],
  cta: { title: "Specify WONLY On Your Next Project", sub: "Send your fire, access-control and acoustic requirements — we reply with compliance docs and pricing." },
};

export default function EngineeringDoors() { return <ProductPage data={data} />; }
