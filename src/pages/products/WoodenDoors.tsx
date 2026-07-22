import { Volume2, Shield, Ruler, Droplets, Lock, Leaf } from "lucide-react";
import { BASE } from "@/lib/site-ui";
import { ProductPage, type ProductPageData } from "@/lib/product-page";

const data: ProductPageData = {
  seo: {
    title: "Wooden Door Supplier — Steel-Wood Anti-Warp Silent Doors | WONLY",
    description: "WONLY wooden door manufacturer and supplier: steel-wood doors with double the silence, a double-keel galvanized-steel frame that never warps, moisture-proof and formaldehyde-free (ENF) — OEM/ODM for distributors.",
    path: "/products/wooden-doors",
  },
  hero: {
    eyebrow: "Wooden Doors",
    title: <>Steel-Wood<br /><span style={{ color: "#D4C4A0" }}>Silent</span> Doors</>,
    sub: "Double the silence, engineered never to warp — where craftsmanship meets a steel-reinforced core for residential, commercial and bespoke interiors.",
    img: `${BASE}images/wood-hero.jpg`,
    mode: "render",
  },
  highlights: ["One door with the effect of two", "ENF-grade, formaldehyde-free build", "Won't sag, warp or fear moisture"],
  seriesEyebrow: "Wooden Door Range",
  seriesTitle: "One Craft, Several Series",
  series: [
    { name: "Steel-Wood Silent Door", tag: "Flagship", d: "A double-keel leaf with a galvanized-steel frame — the quiet, warp-proof benchmark.", img: `${BASE}images/wood-2.webp` },
    { name: "ENF Eco Wood Door", tag: "Formaldehyde-Free", d: "Certified to the ENF standard — no glue, no dust, healthy interiors for family homes.", img: `${BASE}images/5products/prod-wooden-doors.jpg` },
    { name: "YIZHAI Art Wood Door", tag: "Luxury", d: "Bespoke artisan leaves where interior craftsmanship becomes heritage art.", img: `${BASE}images/yizhai-clean.jpg` },
  ],
  featuresEyebrow: "Engineered In",
  featuresTitle: "Quiet, Solid, And Built To Last",
  features: [
    { icon: Volume2, t: "Double Silence", d: "A four-sided stepped-seal patent structure blocks noise, smoke, dust and insects." },
    { icon: Shield, t: "More Secure", d: "Steel door frame and bolt lock rigidly together to resist violent forced entry." },
    { icon: Ruler, t: "Never Sags or Warps", d: "A double-keel door leaf and galvanized-steel-reinforced frame hold their shape for life." },
    { icon: Droplets, t: "Moisture-Proof", d: "Steel-wood bonding blocks contact between the wall and the timber, defeating damp." },
    { icon: Lock, t: "More Private", d: "A 6 cm-thick leaf delivers acoustic privacy on par with a five-star hotel." },
    { icon: Leaf, t: "Eco & Healthy", d: "No sawing, no glue, no dust and no formaldehyde — certified to the ENF standard." },
  ],
  band: { img: `${BASE}images/factory-2.webp`, eyebrow: "Crafted at Scale", title: "3 Million Wooden Doors A Year, Made In-House" },
  cta: { title: "Bring WONLY Wooden Doors To Your Market", sub: "Residential, commercial or custom interior — request the catalog, samples and pricing." },
};

export default function WoodenDoors() { return <ProductPage data={data} />; }
