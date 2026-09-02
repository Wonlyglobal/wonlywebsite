import { Fingerprint, ScanFace, Camera, Wifi, KeyRound, ShieldCheck } from "lucide-react";
import { BASE } from "@/lib/site-ui";
import { ProductPage, type ProductPageData } from "@/lib/product-page";
import { useLocale } from "@/lib/i18n";
import { localizeSmartLocks } from "@/lib/product-locales";

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
    { name: "S80 True-Sensing Smart Lock", tag: "Flagship", d: "Hands-free sensing, biometric access and connected control in WONLY's immersive flagship lock page.", img: `${BASE}images/lock-s80.webp`, path: "/products/smart-locks/s80" },
    { name: "S80 Max Remote-Sensing True Smart Lock", tag: "Flagship 4.0", d: "Hands-free approach recognition, 3D face access, anti-pinch protection and an integrated door viewer.", img: `${BASE}images/catalog-2026/s80.webp`, path: "/products/smart-locks/s80-max" },
    { name: "S60 Max Remote-Sensing Smart Lock", tag: "Max 4.0", d: "Remote sensing, 3D face recognition, video door viewer and optional automatic opening.", img: `${BASE}images/catalog-2026/models/s60-max.webp`, path: "/products/smart-locks/s60-max" },
    { name: "S60 Pro Face Recognition Smart Lock", tag: "Pro 3.0", d: "3D face recognition, remote video, loitering snapshots and a 4.5-inch display.", img: `${BASE}images/catalog-2026/models/s60-pro.webp`, path: "/products/smart-locks/s60-pro" },
    { name: "S50 Pro Face Recognition Smart Lock", tag: "Pro 3.0", d: "Connected face access, remote unlocking, door viewer and rear display.", img: `${BASE}images/catalog-2026/models/s50-pro.webp`, path: "/products/smart-locks/s50-pro" },
    { name: "S58 Pro Video Intercom Smart Lock", tag: "Pro 3.0", d: "Face recognition with video intercom, remote unlock and loitering snapshots.", img: `${BASE}images/catalog-2026/models/s58-pro.webp`, path: "/products/smart-locks/s58-pro" },
    { name: "P10 Pro Biometric Smart Lock", tag: "Palm Vein", d: "Face or palm-vein recognition with a door viewer and 4.5-inch display.", img: `${BASE}images/catalog-2026/models/p10-pro.webp`, path: "/products/smart-locks/p10-pro" },
    { name: "S922 Max Face Recognition Smart Lock", tag: "Compact Max", d: "Face recognition, door viewer, remote unlocking and a 4-inch display.", img: `${BASE}images/catalog-2026/models/s922-max.webp`, path: "/products/smart-locks/s922-max" },
    { name: "S936 Retail Smart Lock", tag: "Retail", d: "Grip-to-open fingerprint, passcode, encrypted card and key access.", img: `${BASE}images/catalog-2026/models/s936.webp`, path: "/products/smart-locks/s936" },
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

export default function SmartLocks() {
  const { locale } = useLocale();
  return <ProductPage data={localizeSmartLocks(data, locale)} />;
}
