import { CloudRain, AlertTriangle, Thermometer, Smartphone, RefreshCw, Wind } from "lucide-react";
import { BASE } from "@/lib/site-ui";
import { ProductPage, type ProductPageData } from "@/lib/product-page";

const data: ProductPageData = {
  seo: {
    title: "Smart Windows — Energy-Saving & Hurricane Aluminum Windows | WONLY",
    description: "WONLY smart aluminum windows: insulation and acoustics that rival a wall, auto-close in wind and rain, 50,000+ slide cycles, app remote control, and a hurricane series.",
    path: "/products/smart-windows",
  },
  hero: {
    eyebrow: "Aluminum & Smart Windows",
    title: <>Warmth in,<br /><span style={{ color: "#D4C4A0" }}>weather</span> out</>,
    sub: "Insulation and acoustics that rival a solid wall — smart windows that close themselves the moment the storm rolls in.",
    img: `${BASE}images/win-scene1.jpg`,
    mode: "scene",
  },
  highlights: ["Auto-closes in wind & rain", "50,000+ slide cycles without deforming", "App remote control & scenes"],
  seriesEyebrow: "Window Range",
  seriesTitle: "A System For Every Opening",
  series: [
    { name: "Energy-Saving Casement", tag: "Best Seller", d: "Thermal-break aluminum that insulates like a wall — quiet, sealed and efficient.", img: `${BASE}images/alu-t200.webp` },
    { name: "Smart Auto-Close Window", tag: "Smart", d: "Senses wind and rain and closes itself; opens to ventilate on smoke or gas.", img: `${BASE}images/5products/dropdown-window.png` },
    { name: "Hurricane Series", tag: "Reinforced", d: "Storm-rated systems engineered for North America and the Caribbean.", img: `${BASE}images/5products/prod-smart-windows.jpg` },
  ],
  featuresEyebrow: "Intelligent by Design",
  featuresTitle: "The Window That Looks After Itself",
  features: [
    { icon: CloudRain, t: "Auto-Close in Bad Weather", d: "Senses changing weather and closes automatically to protect the home." },
    { icon: AlertTriangle, t: "Smoke & Gas Ventilation", d: "On detecting smoke or a gas leak, it opens to ventilate the space safely." },
    { icon: Thermometer, t: "Insulation Like a Wall", d: "Thermal-break construction delivers wall-grade heat and noise isolation." },
    { icon: Smartphone, t: "App Remote Linkage", d: "Open, close and schedule from anywhere with a single tap." },
    { icon: RefreshCw, t: "50,000+ Cycle Tested", d: "Slide-tested over 50,000 times without deforming — quality that lasts." },
    { icon: Wind, t: "Hurricane Series", d: "Reinforced systems engineered for North America and the Caribbean." },
  ],
  band: { img: `${BASE}images/win-scene2.jpg`, eyebrow: "Building Envelope", title: "Windows That Finish The Whole-House System" },
  cta: { title: "Bring WONLY Smart Windows To Your Market", sub: "Energy-saving, balcony/terrace or hurricane series — request specifications and pricing." },
};

export default function SmartWindows() { return <ProductPage data={data} />; }
