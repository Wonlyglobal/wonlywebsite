import { DoorOpen, LayoutGrid, Cpu, Sparkles, ShieldCheck, Moon } from "lucide-react";
import { BASE } from "@/lib/site-ui";
import { ProductPage, type ProductPageData } from "@/lib/product-page";

const data: ProductPageData = {
  seo: {
    title: "Whole-House Intelligence — WONLY Smart Home Ecosystem | WONLY",
    description: "WONLY Whole-House Intelligence: starting at the smart front door, 28 categories of smart products, two systems and one central hub orchestrate AI security and smart-living scenes for the entire home.",
    path: "/products/whole-house",
  },
  hero: {
    eyebrow: "Whole-House Intelligence · WONLY Smart Home",
    title: <>One entrance,<br />a smarter <span style={{ color: "#D4C4A0" }}>home</span></>,
    sub: "It begins at the smart front door — 28 product categories, two systems and a central hub orchestrating your whole home.",
    img: `${BASE}images/lock-s80.webp`,
    mode: "render",
  },
  highlights: ["The entry door is the smart-home gateway", "28 categories of smart products", "2 systems + 1 hub + N smart scenes"],
  seriesEyebrow: "The Ecosystem",
  seriesTitle: "Two Systems, One Connected Home",
  series: [
    { name: "Central Control Hub", tag: "Core", d: "One hub ties every device into a single interface with AI-driven scenes.", img: `${BASE}images/5products/dropdown-control.png` },
    { name: "Smart Entry & Locks", tag: "Entry", d: "The intelligent front door is the gateway to the whole connected home.", img: `${BASE}images/lock-s80.webp`, path: "/products/smart-locks" },
    { name: "Scenes & Automation", tag: "Living", d: "Away-mode, sleep-mode and welcome-home automations at a word or a tap.", img: `${BASE}images/5products/prod-whole-house.jpg` },
  ],
  featuresEyebrow: "One Connected Ecosystem",
  featuresTitle: "Security And Comfort, Orchestrated",
  features: [
    { icon: DoorOpen, t: "Entrance as Gateway", d: "The intelligent front door is the entry point to the whole connected home." },
    { icon: LayoutGrid, t: "28 Product Categories", d: "Locks, sensors, lighting, climate, monitoring and more — one family." },
    { icon: Cpu, t: "Central Control Hub", d: "Two systems and one hub tie every device together into a single experience." },
    { icon: Sparkles, t: "Smart Scenes", d: "Away-mode, sleep-mode and welcome-home automations at a word or a tap." },
    { icon: ShieldCheck, t: "AI Security", d: "The home arms itself when you leave and disarms the moment you return." },
    { icon: Moon, t: "AI Sleep Assist", d: "Environment tuning quietly adjusts the home for better, deeper rest." },
  ],
  band: { img: `${BASE}images/proj-s-7.webp`, eyebrow: "Living, Connected", title: "From The Front Door To Every Room" },
  ecosystem: {
    eyebrow: "Smart-Home Ecosystem",
    title: "28 Categories, One Connected Home",
    items: [
      { img: `${BASE}images/sh-presence.jpg`, name: "Presence Sensor" },
      { img: `${BASE}images/sh-air.jpg`, name: "Air-Quality Sensor" },
      { img: `${BASE}images/sh-fall.jpg`, name: "Fall Detection" },
      { img: `${BASE}images/sh-light.jpg`, name: "Light Sensor" },
      { img: `${BASE}images/sh-cooker.jpg`, name: "Integrated Cooker" },
      { img: `${BASE}images/sh-sofa.jpg`, name: "Smart Sofa" },
    ],
  },
  cta: { title: "Bring WONLY Smart Living To Your Market", sub: "Ask about the ecosystem, integration and OEM/ODM options — we reply within 24 hours." },
};

export default function WholeHouse() { return <ProductPage data={data} />; }
