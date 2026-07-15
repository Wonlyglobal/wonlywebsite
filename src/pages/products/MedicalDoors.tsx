import { Radar, Wind, Cross, ShieldAlert, EyeOff, Building2 } from "lucide-react";
import { BASE } from "@/lib/site-ui";
import { ProductPage, type ProductPageData } from "@/lib/product-page";

const data: ProductPageData = {
  seo: {
    title: "Medical Doors — Hermetic OR & Auto-Sensing Ward Doors | WONLY",
    description: "WONLY medical doors: touchless auto-sensing ward and operating-room doors — zero-contact one-second open, hermetic sealing, AI anti-pinch and a concealed door operator, for hospitals worldwide.",
    path: "/products/medical-doors",
  },
  hero: {
    eyebrow: "Medical Doors",
    title: <>Hermetic,<br />hands-free,<br /><span style={{ color: "#D4C4A0" }}>hygienic</span></>,
    sub: "Touchless auto-sensing ward and operating-room doors engineered for hospitals — zero-contact opening, hermetic sealing and AI anti-pinch safety.",
    img: `${BASE}images/proj-s-7.webp`,
    mode: "scene",
  },
  highlights: ["Zero-contact, one-second open", "AI anti-pinch safety", "Concealed, hidden door operator"],
  featuresEyebrow: "Clinically Engineered",
  featuresTitle: "Built for sterile, safe environments.",
  features: [
    { icon: Radar, t: "Touchless Auto-Open", d: "Long-range sensing opens the door in a second — hands-free, contamination-free." },
    { icon: Wind, t: "Hermetic OR Doors", d: "Air-tight sealing for operating rooms and clean, pressure-controlled areas." },
    { icon: Cross, t: "HIPAA-Aligned Ward Doors", d: "Privacy and safety engineered for patient wards and treatment rooms." },
    { icon: ShieldAlert, t: "AI Anti-Pinch", d: "Detects people and objects in the path and stops instantly, every time." },
    { icon: EyeOff, t: "Concealed Operator", d: "A hidden door-opening mechanism keeps clean, uninterrupted sightlines." },
    { icon: Building2, t: "Institution-Proven", d: "Deployed across hospitals and public institutions with full project references." },
  ],
  band: { img: `${BASE}images/landmark-govhousing.webp`, eyebrow: "Public Institutions", title: "Specified where hygiene cannot be compromised." },
  cta: { title: "Equip your facility with WONLY medical doors.", sub: "Ward, OR or access-controlled entries — tell us your project and we reply within 24 hours." },
};

export default function MedicalDoors() { return <ProductPage data={data} />; }
