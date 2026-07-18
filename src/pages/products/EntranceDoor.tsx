import { Shield, Flame, Lock, Volume2, Ruler, Leaf } from "lucide-react";
import { BASE } from "@/lib/site-ui";
import { ProductPage, type ProductPageData } from "@/lib/product-page";

const data: ProductPageData = {
  seo: {
    title: "Entrance Doors — Security Doors & Wooden Doors | WONLY",
    description: "WONLY entrance doors: cast-aluminum security doors with autonomous locking and multi-vector intrusion sensing, and steel-wood silent interior doors — the whole building entry, made in-house.",
    path: "/products/entrance-door",
  },
  hero: {
    eyebrow: "Entrance Doors",
    title: <>The door that opens<br /><span style={{ color: "#D4C4A0" }}>everything</span></>,
    sub: "From cast-aluminum security doors to steel-wood silent interior doors, WONLY builds the entire building entry — protection outside, quiet craft within.",
    img: `${BASE}images/alu-k300max.webp`,
    mode: "render",
  },
  highlights: ["Security & interior doors under one roof", "Fire-rated, anti-theft and acoustic", "3M+ doors a year, made in-house"],
  seriesEyebrow: "Two Door Families",
  seriesTitle: "Choose Your Entrance",
  series: [
    { name: "Security Doors", tag: "Exterior", d: "Cast-aluminum security doors with autonomous locking and multi-vector intrusion sensing.", img: `${BASE}images/alu-k300max.webp`, path: "/products/security-doors" },
    { name: "Wooden Doors", tag: "Interior", d: "Steel-wood silent doors — double the quiet, engineered never to sag or warp.", img: `${BASE}images/wood-2.webp`, path: "/products/wooden-doors" },
  ],
  featuresEyebrow: "Engineered In",
  featuresTitle: "Protection, Quiet And Craft",
  features: [
    { icon: Shield, t: "Multi-Vector Security", d: "Sensors detect forced entry, prying, drilling and lock-picking in real time and alert instantly." },
    { icon: Flame, t: "90-Minute Fire Rating", d: "EN 1634-certified exterior doors hold integrity and insulation for 90 minutes under fire." },
    { icon: Lock, t: "Autonomous Smart Locking", d: "AI-driven biometric locking with app control and tamper-proof architecture." },
    { icon: Volume2, t: "Acoustic Insulation", d: "Stepped-seal structures and thick leaves deliver five-star-hotel quiet, inside and out." },
    { icon: Ruler, t: "Never Sags or Warps", d: "Steel-reinforced frames and double-keel leaves hold their shape for the life of the door." },
    { icon: Leaf, t: "ENF Eco-Health", d: "Interior doors are built glue-free and dust-free, certified to the formaldehyde-free ENF standard." },
  ],
  band: { img: `${BASE}images/factory-2.webp`, eyebrow: "Made In-House", title: "Millions Of Doors A Year, Built On Our Own Lines" },
  cta: { title: "Bring WONLY Entrance Doors To Your Market", sub: "Security or interior, residential or project — request the catalog, samples and pricing." },
};

export default function EntranceDoor() { return <ProductPage data={data} />; }
