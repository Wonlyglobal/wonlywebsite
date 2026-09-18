import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocale } from "@/lib/i18n";
import { SITE_URL, useSeo } from "@/lib/seo";
import { CHAMP_BG, DARK, GOLD, GOLD_DEEP, MUTED, SiteFooter, SiteHeader, eyebrow, h2cls } from "@/lib/site-ui";

const COPY = {
  en: {
    title: "Security Doors for Mexico: Manufacturer & Project Supplier | WONLY",
    description: "Source security doors, smart locks and project entrance systems for Mexico with specification, finish, hardware, documentation and delivery support from WONLY.",
    h1: "Security Doors and Smart Entry for Mexico",
    lead: "A project-focused route for Mexican distributors, developers, contractors and door brands sourcing complete entrance systems from an experienced manufacturer.",
    audience: "Mexico · Distribution · Residential · Hospitality · Commercial Projects",
    introTitle: "Specify for the Mexican Project, Not a Generic Export Model",
    intro: "Mexico combines premium residential, hospitality, mixed-use and commercial demand across different climates and approval paths. A useful quotation starts with the project location, opening schedule, security target, door construction, finish, smart-lock functions and delivery plan.",
    checklist: "Information Required for a Mexico Quotation",
    items: [
      ["Project and location", "State the city, building use, project stage, quantities and delivery sequence."],
      ["Opening schedule", "Provide finished sizes, handing, wall construction and door marks for each opening type."],
      ["Security and fire", "Identify the required forced-entry, fire, egress and evidence requirements instead of assuming equivalence between standards."],
      ["Climate and finish", "Confirm exterior exposure, coastal or high-UV conditions, colour, texture and approved sample process."],
      ["Lock and access", "Define mechanical, biometric, app, access-control, power-backup and emergency-entry requirements."],
      ["Import and service", "Align packaging, labels, documentation, spare parts, local installation and after-sales responsibility."],
    ],
    cta: "Request a Mexico Project Review",
    ctaText: "Send the city, application, quantities, opening schedule and required standards. WONLY will identify the next technical inputs before quotation.",
    button: "Send project details",
    related: "Technical Guides for Selection",
  },
  es: {
    title: "Puertas de seguridad para México: fabricante y proveedor | WONLY",
    description: "Compre puertas de seguridad, cerraduras inteligentes y sistemas de acceso para proyectos en México con soporte técnico, documental y logístico de WONLY.",
    h1: "Puertas de seguridad y acceso inteligente para México",
    lead: "Una ruta de compra para distribuidores, desarrolladores, contratistas y marcas mexicanas que buscan sistemas de entrada completos directamente del fabricante.",
    audience: "México · Distribución · Residencial · Hoteles · Proyectos comerciales",
    introTitle: "Especifique para el proyecto en México, no un modelo genérico",
    intro: "México combina demanda residencial prémium, hotelera, comercial y de uso mixto en climas y procesos de aprobación distintos. Una cotización útil empieza con ciudad, cuadro de huecos, nivel de seguridad, construcción, acabado, funciones inteligentes y plan de entrega.",
    checklist: "Datos necesarios para cotizar en México",
    items: [
      ["Proyecto y ubicación", "Indique ciudad, uso del edificio, fase, cantidades y secuencia de entrega."],
      ["Cuadro de huecos", "Incluya medidas terminadas, mano, muro y código de cada tipo de puerta."],
      ["Seguridad y fuego", "Defina resistencia al robo, fuego, evacuación y documentos exigidos sin asumir equivalencias entre normas."],
      ["Clima y acabado", "Confirme exposición exterior, costa o radiación UV, color, textura y proceso de muestra aprobada."],
      ["Cerradura y acceso", "Defina llave, biometría, app, control de acceso, respaldo eléctrico y apertura de emergencia."],
      ["Importación y servicio", "Alinee embalaje, etiquetas, documentos, repuestos, instalación local y posventa."],
    ],
    cta: "Solicite una revisión para su proyecto en México",
    ctaText: "Envíe ciudad, aplicación, cantidades, cuadro de huecos y normas requeridas. WONLY indicará los datos técnicos pendientes antes de cotizar.",
    button: "Enviar datos del proyecto",
    related: "Guías técnicas para elegir",
  },
} as const;

export default function MexicoSecurityDoors() {
  const { locale } = useLocale();
  const copy = locale === "es" ? COPY.es : COPY.en;
  const path = "/global/mexico/security-doors";
  useSeo({
    title: copy.title,
    description: copy.description,
    path,
    image: `${SITE_URL}/images/alu-k300max.webp`,
    hreflangLocales: ["en", "es"],
    jsonLd: [
      { "@context": "https://schema.org", "@type": "WebPage", name: copy.h1, description: copy.description, url: `${SITE_URL}${locale === "es" ? "/es" : ""}${path}/`, inLanguage: locale === "es" ? "es" : "en" },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "WONLY", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Mexico", item: `${SITE_URL}${locale === "es" ? "/es" : ""}${path}/` },
      ] },
    ],
  });

  return <div style={{ background: "#fff", color: DARK }}>
    <SiteHeader />
    <section className="relative min-h-[70vh] overflow-hidden bg-[#0d0d0d] flex items-end">
      <img src="/images/alu-k300max.webp" alt={copy.h1} className="absolute inset-0 h-full w-full object-contain object-right opacity-65" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/25" />
      <div className="relative z-10 max-w-5xl px-[7vw] pb-20 pt-36">
        <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-1 text-xs text-white/65"><Link to="/">WONLY</Link><ChevronRight size={13}/><span>México</span></nav>
        <div className={eyebrow} style={{ color: "#d8c8a7" }}>Mexico Market</div>
        <h1 className="mt-4 max-w-4xl text-[38px] font-light leading-[1.05] text-white md:text-[64px]">{copy.h1}</h1>
        <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-white/80">{copy.lead}</p>
        <p className="mt-7 text-sm font-medium" style={{ color: "#d8c8a7" }}>{copy.audience}</p>
      </div>
    </section>

    <section className="px-[7vw] py-20 md:py-28"><div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr]">
      <div><div className={eyebrow} style={{ color: GOLD_DEEP }}>Mexico Buyer Brief</div><h2 className={h2cls + " mt-4"}>{copy.introTitle}</h2></div>
      <p className="text-[16px] leading-[1.85]" style={{ color: MUTED }}>{copy.intro}</p>
    </div></section>

    <section className="px-[7vw] py-20 md:py-28" style={{ background: CHAMP_BG }}><div className="mx-auto max-w-6xl">
      <div className={eyebrow} style={{ color: GOLD_DEEP }}>RFQ Checklist</div><h2 className={h2cls + " mt-4"}>{copy.checklist}</h2>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{copy.items.map(([title, text]) => <div key={title} className="rounded-2xl border border-[#ded6c8] bg-white p-6"><div className="flex items-center gap-3"><span className="grid h-7 w-7 place-items-center rounded-full" style={{ background: `${GOLD}22` }}><Check size={15} style={{ color: GOLD }}/></span><h3 className="font-semibold">{title}</h3></div><p className="mt-4 text-sm leading-relaxed" style={{ color: MUTED }}>{text}</p></div>)}</div>
    </div></section>

    <section className="px-[7vw] py-16"><div className="mx-auto max-w-6xl"><h2 className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: GOLD_DEEP }}>{copy.related}</h2><div className="mt-6 grid gap-4 md:grid-cols-3">
      <Link to="/insights/en-1627-rc2-rc3-rc4-security-door-grades" className="rounded-xl border border-[#ded6c8] p-5 font-medium">EN 1627: RC2, RC3 y RC4</Link>
      <Link to="/insights/cylindrical-lock-core-vs-standard-cylinder" className="rounded-xl border border-[#ded6c8] p-5 font-medium">Cilindro y núcleo de cerradura</Link>
      <Link to="/products/security-doors" className="rounded-xl border border-[#ded6c8] p-5 font-medium">{locale === "es" ? "Gama de puertas de seguridad" : "Security door range"}</Link>
    </div></div></section>

    <section className="px-[7vw] py-20 text-white" style={{ background: DARK }}><div className="mx-auto max-w-4xl text-center"><h2 className="text-3xl font-light md:text-5xl">{copy.cta}</h2><p className="mx-auto mt-5 max-w-2xl text-white/70">{copy.ctaText}</p><Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold" style={{ background: GOLD, color: DARK }}>{copy.button}<ArrowRight size={16}/></Link></div></section>
    <SiteFooter />
  </div>;
}
