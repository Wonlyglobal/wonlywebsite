import { Fingerprint, ScanFace, Camera, Wifi, KeyRound, ShieldCheck } from "lucide-react";
import { BASE } from "@/lib/site-ui";
import { ProductPage, type ProductPageData } from "@/lib/product-page";

const data: ProductPageData = {
  seo: {
    title: "Smart Lock Manufacturer — Fingerprint & Biometric Locks | WONLY",
    description: "WONLY smart lock manufacturer and OEM supplier: hands-free true-sensing entry, palm-vein and fingerprint biometrics, video guard, app control and encrypted, tamper-proof security — for distributors and projects worldwide.",
    path: "/products/smart-locks",
  },
  hero: {
    eyebrow: "Smart Locks",
    title: <>Hands-free,<br /><span style={{ color: "#D4C4A0" }}>true-sensing</span> entry</>,
    sub: "Long-range sensing that opens as you approach, biometric authentication and encrypted, tamper-proof security — the smart heart of the WONLY door.",
    img: `${BASE}images/lock-s80.webp`,
    mode: "render",
  },
  highlights: ["Hands-free long-range sensing", "Palm-vein & fingerprint biometrics", "Encrypted, tamper-proof design"],
  seriesEyebrow: "Lock Range",
  seriesTitle: "A Lock For Every Door",
  series: [
    { name: "S80 True-Sensing Smart Lock", tag: "Flagship", d: "Hands-free long-range sensing with biometric and app control — the WONLY benchmark.", img: `${BASE}images/lock-s80.webp`, path: "/products/smart-locks/s80" },
    { name: "Palm-Vein Push-Pull Lock", tag: "Biometric", d: "Contactless palm-vein recognition with a one-motion push-pull handle.", img: `${BASE}images/5products/dropdown-control.png` },
    { name: "Video Guard Smart Lock", tag: "With Camera", d: "A built-in camera and motion alerts stream visitors straight to your phone.", img: `${BASE}images/5products/prod-smart-locks.jpg` },
    { name: "Commercial Access System", tag: "Enterprise", d: "RFID, PIN and app access control for offices, hotels and public buildings.", img: `${BASE}images/5products/prod-whole-house.jpg` },
  ],
  featuresEyebrow: "Engineered In",
  featuresTitle: "Security You Never Have To Think About",
  features: [
    { icon: ScanFace, t: "True-Sensing Entry", d: "Long-range sensing recognizes you and unlocks hands-free as you approach." },
    { icon: Fingerprint, t: "Multi-Biometric", d: "Palm-vein, fingerprint, PIN, card and app — up to six ways to open." },
    { icon: Camera, t: "Video Guard", d: "A built-in camera with motion detection streams visitors to your phone." },
    { icon: Wifi, t: "App & Scenes", d: "Remote unlock, temporary passwords and whole-home scene linkage." },
    { icon: KeyRound, t: "Tamper-Proof", d: "Encrypted communication with anti-pry, anti-drill architecture." },
    { icon: ShieldCheck, t: "Auto Arm / Disarm", d: "The home arms as you leave and disarms the instant you return." },
  ],
  band: { img: `${BASE}images/factory-abb.webp`, eyebrow: "Made In-House", title: "Millions Of Smart Locks A Year, Built On Our Own Lines" },
  cta: { title: "Bring WONLY Smart Locks To Your Market", sub: "Residential, hospitality or commercial — request the catalog, samples and pricing." },
};

export default function SmartLocks() { return <ProductPage data={data} />; }
