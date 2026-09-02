import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { BASE, CHAMP_BG, DARK, GOLD, GOLD_DEEP, MUTED, SILVER, Reveal, eyebrow, h2cls } from "@/lib/site-ui";

type SelectorGroup = "security" | "wooden" | "smart-lock";

const SECURITY_MODELS = [
  { name: "X70", path: "/products/security-doors/x70", image: `${BASE}images/door/gallery/g1-front.jpg`, label: "Robotic flagship", description: "For premium villas and residences requiring automatic entry, autonomous locking and smart-home integration." },
  { name: "X60 Max", path: "/products/security-doors/x60-max", image: `${BASE}images/catalog-2026/models/x60-max.webp`, label: "Smart Door 5.0", description: "Automatic operation with remote sensing, anti-pinch protection, formaldehyde monitoring and a threshold-free entrance." },
  { name: "X60 Pro", path: "/products/security-doors/x60-pro", image: `${BASE}images/catalog-2026/models/x60-pro.webp`, label: "Connected entrance", description: "Remote-sensing automatic entry with anti-pinch protection and whole-home ecosystem integration." },
  { name: "X50 Max", path: "/products/security-doors/x50-max", image: `${BASE}images/catalog-2026/models/x50-max.webp`, label: "Air-quality smart door", description: "Automatic entry, physical anti-pinch protection and entrance air-quality monitoring for modern homes." },
  { name: "X50 Pro", path: "/products/security-doors/x50-pro", image: `${BASE}images/catalog-2026/x50.webp`, label: "Smart Door 5.0", description: "For high-end residential projects combining a complete security door, large display and connected entrance control." },
  { name: "T200", path: "/products/security-doors/t200", image: `${BASE}images/catalog-2026/t200.webp`, label: "People-first access", description: "For family, senior-friendly and accessible homes needing hands-free opening and a threshold-free passage." },
];

const WOODEN_MODELS = [
  { name: "Custom", path: "/products/wooden-doors/custom", image: `${BASE}images/catalog-2026/wood-custom.webp`, label: "Bespoke interiors", description: "Project-led designs, coordinated colours and finishes for residential and hospitality interiors." },
  { name: "Minimalist", path: "/products/wooden-doors/minimalist", image: `${BASE}images/catalog-2026/wood-minimalist.webp`, label: "Contemporary", description: "Clean-lined soundproof doors for modern apartments, villas and commercial interiors." },
  { name: "PVC", path: "/products/wooden-doors/pvc", image: `${BASE}images/catalog-2026/wood-pvc.webp`, label: "Practical programmes", description: "Easy-care surfaces and repeatable specifications for volume interior-door projects." },
  { name: "Solid Wood", path: "/products/wooden-doors/solid-wood", image: `${BASE}images/catalog-2026/wood-solid.webp`, label: "Natural premium", description: "Solid-wood character for classic and contemporary whole-home interior schemes." },
  { name: "Aluminum Alloy", path: "/products/wooden-doors/aluminum-alloy", image: `${BASE}images/catalog-2026/wood-aluminum.webp`, label: "Slim and light", description: "Slim framed glass doors for kitchens, studies and visually connected living spaces." },
];

const SMART_LOCK_MODELS = [
  { name: "S80", path: "/products/smart-locks/s80", image: `${BASE}images/lock-s80.webp`, label: "True-sensing flagship", description: "For premium homes and projects requiring hands-free sensing, biometric access and connected control." },
  { name: "S80 Max", path: "/products/smart-locks/s80-max", image: `${BASE}images/catalog-2026/s80.webp`, label: "Remote-sensing upgrade", description: "For entrances requiring approach recognition, 3D face access, anti-pinch protection and an integrated door viewer." },
  { name: "S60 Max", path: "/products/smart-locks/s60-max", image: `${BASE}images/catalog-2026/models/s60-max.webp`, label: "Remote-sensing", description: "Remote-sensing recognition, 3D face access, video and optional automatic opening." },
  { name: "S60 Pro", path: "/products/smart-locks/s60-pro", image: `${BASE}images/catalog-2026/models/s60-pro.webp`, label: "Face recognition", description: "3D face access, remote video, door viewer and a 4.5-inch indoor display." },
  { name: "S50 Pro", path: "/products/smart-locks/s50-pro", image: `${BASE}images/catalog-2026/models/s50-pro.webp`, label: "Connected video", description: "Face recognition, remote unlock, video viewing and a 4.5-inch rear display." },
  { name: "S58 Pro", path: "/products/smart-locks/s58-pro", image: `${BASE}images/catalog-2026/models/s58-pro.webp`, label: "Video intercom", description: "Face recognition with video intercom, remote unlocking and loitering snapshots." },
  { name: "P10 Pro", path: "/products/smart-locks/p10-pro", image: `${BASE}images/catalog-2026/models/p10-pro.webp`, label: "Palm vein option", description: "Face or palm-vein recognition with door viewer and indoor display." },
  { name: "P15 Pro", path: "/products/smart-locks/p15-pro", image: `${BASE}images/catalog-2026/models/p15-pro.webp`, label: "Slim biometric", description: "A slimmer face or palm-vein model with door viewer and indoor display." },
  { name: "S922 Max", path: "/products/smart-locks/s922-max", image: `${BASE}images/catalog-2026/models/s922-max.webp`, label: "Compact video", description: "Face recognition, remote unlocking, door viewer and a 4-inch indoor display." },
  { name: "S936", path: "/products/smart-locks/s936", image: `${BASE}images/catalog-2026/models/s936.webp`, label: "Retail fingerprint", description: "Grip-to-open semi-automatic model with fingerprint, PIN, card and key access." },
  { name: "A5N", path: "/products/smart-locks/a5n", image: `${BASE}images/catalog-2026/models/a5n.webp`, label: "Retail essential", description: "A practical semi-automatic lock for distribution and renovation programmes." },
];

export function DoorModelSelector({ group, currentPath }: { group: SelectorGroup; currentPath: string }) {
  const models = group === "security" ? SECURITY_MODELS : group === "wooden" ? WOODEN_MODELS : SMART_LOCK_MODELS;
  const title = group === "security" ? "Compare WONLY Security Door Models" : group === "wooden" ? "Choose the Right Wooden Door Series" : "Compare WONLY Smart Lock Models";
  const sectionLabel = group === "smart-lock" ? "Smart Lock Selection Guide" : "Door Selection Guide";
  return <section className="px-[6vw] py-20 md:py-28 bg-white" aria-labelledby={`${group}-door-selector-title`}>
    <div className="max-w-[1450px] mx-auto">
      <div className={eyebrow} style={{ color: GOLD_DEEP }}>{sectionLabel}</div>
      <h2 id={`${group}-door-selector-title`} className={h2cls + " mt-4 max-w-4xl"}>{title}</h2>
      <p className="mt-5 max-w-3xl leading-7" style={{ color: MUTED }}>Compare each range by its intended application, then open the full model page for verified features, specifications and project consultation.</p>
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {models.map((model, index) => {
          const current = model.path === currentPath;
          return <Reveal key={model.path} delay={(index % 3) * 60}>
            <article className="h-full overflow-hidden rounded-3xl border flex flex-col" style={{ borderColor: current ? GOLD : `${SILVER}66`, background: current ? CHAMP_BG : "#fff" }}>
              <div className="aspect-[4/3] overflow-hidden bg-[#ece8e0]"><img src={model.image} alt={`WONLY ${model.name} door model`} className="w-full h-full object-cover" loading="lazy" /></div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-3"><h3 className="text-xl font-medium" style={{ color: DARK }}>{model.name}</h3>{current && <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: GOLD_DEEP }}><Check size={14} /> Current</span>}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.14em] font-semibold" style={{ color: GOLD_DEEP }}>{model.label}</div>
                <p className="mt-4 text-sm leading-6 flex-1" style={{ color: MUTED }}>{model.description}</p>
                {current ? <span className="mt-6 text-sm font-semibold" style={{ color: GOLD_DEEP }}>You are viewing this model</span> : <Link to={model.path} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: GOLD_DEEP }}>View model <ArrowRight size={15} /></Link>}
              </div>
            </article>
          </Reveal>;
        })}
      </div>
    </div>
  </section>;
}
