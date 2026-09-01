import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { BASE, CHAMP_BG, DARK, GOLD, GOLD_DEEP, MUTED, SILVER, Reveal, eyebrow, h2cls } from "@/lib/site-ui";

type SelectorGroup = "security" | "wooden" | "smart-lock";

const SECURITY_MODELS = [
  { name: "X70", path: "/products/security-doors/x70", image: `${BASE}images/door/gallery/g1-front.jpg`, label: "Robotic flagship", description: "For premium villas and residences requiring automatic entry, autonomous locking and smart-home integration." },
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
      <div className={`mt-12 grid md:grid-cols-2 ${models.length === 3 ? "lg:grid-cols-3" : "xl:grid-cols-5"} gap-5`}>
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
