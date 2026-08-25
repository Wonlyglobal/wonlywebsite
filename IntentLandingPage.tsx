import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { useSeo, SITE_URL } from "@/lib/seo";
import { SiteHeader, SiteFooter, CtaBand, Reveal, GOLD, GOLD_DEEP, DARK, MUTED, CHAMP_BG, eyebrow, h2cls } from "@/lib/site-ui";

type PageKey =
  | "cast-aluminium-security-doors"
  | "fire-rated-security-doors"
  | "hotel-security-doors"
  | "villa-security-doors"
  | "saudi-arabia-security-doors"
  | "uae-security-doors";

type PageData = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  image: string;
  audience: string;
  overviewTitle: string;
  overview: string[];
  requirements: [string, string][];
  process: [string, string][];
  faq: [string, string][];
  related: [string, string][];
};

const PAGES: Record<PageKey, PageData> = {
  "cast-aluminium-security-doors": {
    path: "/products/security-doors/cast-aluminium",
    title: "Cast Aluminium Security Door Manufacturer & OEM | WONLY",
    description: "Source cast aluminium security doors for villas and premium projects with custom sizes, finishes, lock options and OEM engineering support from WONLY.",
    eyebrow: "Product Sourcing",
    h1: "Cast Aluminium Security Doors for Premium Projects",
    lead: "A project-ready sourcing page for distributors, villa developers and door brands comparing structure, finishes, smart-lock integration and custom production.",
    image: "/images/door banner4.png",
    audience: "For distributors, villa developers, architects and OEM door brands",
    overviewTitle: "Specify the Complete Doorset, Not Only the Surface",
    overview: [
      "Cast aluminium is selected for deep decorative relief, corrosion resistance and a premium entrance appearance. Security performance, however, depends on the complete doorset: leaf structure, frame, hinges, locking system, installation and the tested configuration.",
      "WONLY supports specification review before quotation so buyers can align opening size, climate, security target, fire requirement, finish, smart-lock function and packaging with the intended market.",
    ],
    requirements: [
      ["Structure and opening", "Confirm clear opening, wall condition, handing, frame depth, threshold and single- or double-leaf format."],
      ["Finish and climate", "Select colour, texture and protective finish according to UV, humidity, salt exposure and cleaning conditions."],
      ["Lock integration", "Define mechanical, fingerprint, face-recognition or connected-lock requirements together with emergency access."],
      ["Compliance evidence", "Request documents for the exact doorset and configuration; decorative similarity does not establish tested performance."],
      ["Project consistency", "Approve drawings, colour samples and a reference unit before bulk production, then retain batch inspection records."],
      ["Export delivery", "Confirm packaging, loading plan, installation responsibility, spare parts and after-sales documentation before shipment."],
    ],
    process: [
      ["01", "Send opening schedule, quantity, destination market, performance target and preferred design."],
      ["02", "Review drawings, lock compatibility, finish samples, test scope and commercial configuration."],
      ["03", "Approve a reference specification or sample before production and batch inspection."],
      ["04", "Prepare export packaging, technical files, installation guidance and shipment documents."],
    ],
    faq: [
      ["Can cast aluminium security doors be customised?", "Yes. Size, leaf format, decorative panel, colour, handle and lock can be reviewed against engineering and production limits."],
      ["Are they suitable for coastal projects?", "They can be specified for coastal use, but alloy, hardware and finish must be selected for salt exposure and supported by relevant evidence."],
      ["Can a smart lock be integrated?", "Yes. Lock selection should be confirmed early because cut-outs, wiring, power backup and emergency access affect the door structure."],
    ],
    related: [["Security Door Series", "/products/security-doors"], ["Villa Security Doors", "/solutions/villa-security-doors"], ["Cast Aluminium vs Steel", "/insights/cast-aluminium-vs-steel-security-doors"]],
  },
  "fire-rated-security-doors": {
    path: "/products/security-doors/fire-rated",
    title: "Fire-Rated Security Door Manufacturer for Projects | WONLY",
    description: "Specify fire-rated security doors for residential and commercial projects with documentation review, hardware coordination and bulk delivery support from WONLY.",
    eyebrow: "Project Doors",
    h1: "Fire-Rated Security Doors for Project Specifications",
    lead: "Coordinate fire resistance, forced-entry protection, hardware and installation as one documented doorset for residential, hospitality and commercial projects.",
    image: "/images/factory door.png",
    audience: "For consultants, contractors, developers and door distributors",
    overviewTitle: "Fire Rating Belongs to the Tested Assembly",
    overview: [
      "A fire-rated security door combines requirements that are often reviewed separately. The leaf, frame, seals, hinges, lock, closer, glazing and installation method must match the documented assembly.",
      "Buyers should start with the applicable code and opening schedule, then verify the test standard, duration, direction, size range and permitted hardware before approving a commercial offer.",
    ],
    requirements: [
      ["Applicable standard", "State the jurisdiction, building type and required fire-test standard rather than requesting a generic fire certificate."],
      ["Rated duration", "Confirm whether the project requires 60, 90 or 120 minutes and whether integrity, insulation or smoke control applies."],
      ["Security performance", "Define anti-burglary construction and locking needs without changing the tested fire-door configuration."],
      ["Hardware schedule", "Coordinate hinges, closer, panic hardware, access control, seals and lock functions before final approval."],
      ["Installation boundary", "Confirm wall type, anchors, gaps, fire stopping and the party responsible for installation and inspection."],
      ["Submittal package", "Request drawings, applicable reports, datasheets, labels, installation instructions and maintenance requirements."],
    ],
    process: [["01", "Submit the door schedule, fire requirement, opening sizes, hardware and destination code."], ["02", "Map each opening to an applicable tested configuration and identify deviations."], ["03", "Approve shop drawings, hardware matrix, finish and documentation before manufacturing."], ["04", "Inspect labels and configuration, then hand over installation and maintenance files."]],
    faq: [["Is every security door automatically fire-rated?", "No. Fire resistance requires separate evidence for the complete doorset and intended configuration."], ["Can access control be added?", "Often yes, but the selected hardware and preparation must remain within the approved assembly or be reviewed by the responsible authority."], ["What should be included in an RFQ?", "Include standard, duration, quantity, sizes, wall type, handing, hardware, finish, access-control needs and delivery location."]],
    related: [["Engineering Doors", "/products/engineering-doors"], ["60 vs 90 vs 120 Minutes", "/insights/60-90-120-minute-fire-doors"], ["Fire Door Certifications", "/insights/fire-door-certifications-en-1634-ul-10c"]],
  },
  "hotel-security-doors": {
    path: "/solutions/hotel-security-doors",
    title: "Hotel Security Doors & Smart Locks for Projects | WONLY",
    description: "Plan hotel guest-room and back-of-house doors with security, fire, acoustic, access-control and finish requirements coordinated by WONLY.",
    eyebrow: "Hospitality Solution",
    h1: "Hotel Security Doors and Smart Entry Solutions",
    lead: "Coordinate guest-room experience, life safety, access management, acoustic privacy and durable finishes across hotel door packages.",
    image: "/images/proj-cairo-hotel.webp",
    audience: "For hotel developers, operators, designers and contractors",
    overviewTitle: "Different Hotel Openings Need Different Door Packages",
    overview: ["Guest rooms, suites, service corridors, plant rooms and public areas have different risks. A useful hotel schedule separates each opening by fire, acoustic, security, access and design requirements.", "WONLY supports package review across security doors, wooden doors and smart locks so the visible finish, hardware preparation and operational requirements are coordinated before production."],
    requirements: [["Guest-room privacy", "Coordinate acoustic target, door seals, viewer, latch behaviour and corridor light control."], ["Fire and egress", "Map rated openings, self-closing requirements and escape hardware to the applicable hotel code."], ["Access management", "Define card, mobile, biometric or staff access together with audit, power and emergency procedures."], ["Design consistency", "Approve room-type samples, veneer or colour references, hardware and signage locations."], ["Operational durability", "Specify cycle expectations, replaceable wear parts, cleaning resistance and maintenance access."], ["Phased delivery", "Align room batches, floor sequence, packaging labels and site storage with the installation programme."]],
    process: [["01", "Classify openings by room type, fire rating, acoustic target, access and finish."], ["02", "Coordinate the door, frame, lock and hardware matrix with operator and consultant teams."], ["03", "Approve a mock-up room or reference opening before bulk release."], ["04", "Deliver by floor or zone with labels, schedules, spare parts and handover files."]],
    faq: [["Can guest-room doors include smart locks?", "Yes. Confirm the lock platform, credential type, power strategy, emergency access and integration responsibility before door preparation."], ["How are acoustic requirements handled?", "Set a project target and coordinate leaf construction, perimeter seals, threshold and site installation; one component alone does not determine performance."], ["Can finishes match the interior design package?", "Custom colour and surface options can be reviewed using approved physical samples and mock-ups."]],
    related: [["Wooden Door Range", "/products/wooden-doors"], ["Smart Lock Range", "/products/smart-locks"], ["Hotel Door Buying Guide", "/insights/security-doors-for-hotels"]],
  },
  "villa-security-doors": {
    path: "/solutions/villa-security-doors",
    title: "Custom Villa Security Doors & Smart Entry | WONLY",
    description: "Design custom villa security doors with cast-aluminium finishes, smart locks, large openings and climate-specific options through WONLY project support.",
    eyebrow: "Residential Solution",
    h1: "Custom Security Doors for Villas and Premium Homes",
    lead: "Bring architecture, high-security construction and smart entry together for oversized, double-leaf and statement villa entrances.",
    image: "/images/proj-saudi-villa.webp",
    audience: "For villa developers, architects, distributors and private projects",
    overviewTitle: "Start With the Opening, Climate and Entry Experience",
    overview: ["Villa entrance doors are often oversized and highly customised. Weight, hinge system, frame anchoring, weather exposure, threshold and smart-lock preparation must be resolved before decorative details are frozen.", "A structured brief helps compare options without sacrificing installation practicality or emergency access. WONLY reviews drawings, desired appearance and functional requirements as one package."],
    requirements: [["Architectural opening", "Provide finished opening, wall build-up, floor level, canopy condition and desired single-, double- or pivot format."], ["Security concept", "Define locking points, cylinder protection, hinge-side protection and the intended forced-entry evidence."], ["Smart entry", "Choose face, fingerprint, palm-vein, PIN, app or mechanical backup based on users and service conditions."], ["Weather exposure", "Review direct rain, sun, dust, salt and temperature before selecting finish, seals and hardware."], ["Oversized engineering", "Large leaves require weight, hinge, closer, frame and transportation review rather than proportional enlargement."], ["Installation and service", "Agree lifting access, installers, commissioning, spare parts and local maintenance responsibility."]],
    process: [["01", "Share elevation, opening details, location, climate and preferred entrance experience."], ["02", "Develop the configuration, finish direction, lock plan and installation boundary."], ["03", "Approve drawings, material samples and—where appropriate—a reference unit."], ["04", "Inspect, protect and ship the doorset with installation and commissioning guidance."]],
    faq: [["Can WONLY make oversized villa doors?", "Oversized configurations can be reviewed, subject to structural, hardware, transport and installation limits."], ["Which smart-lock method is best for a villa?", "The choice depends on user flow, outdoor exposure, privacy expectations, connectivity and the required emergency backup."], ["Can the finish be matched to the facade?", "Custom colours and textures can be sampled, but final appearance should be approved on a physical reference under relevant lighting."]],
    related: [["Cast Aluminium Doors", "/products/security-doors/cast-aluminium"], ["X70 Security Door", "/products/security-doors/x70"], ["Villa Buying Guide", "/insights/security-doors-for-villas"]],
  },
  "saudi-arabia-security-doors": {
    path: "/global/saudi-arabia/security-doors",
    title: "Security Door Supplier for Saudi Arabia Projects | WONLY",
    description: "Source security doors, villa entrances and smart locks for Saudi Arabia with climate, documentation, customisation and project-delivery review from WONLY.",
    eyebrow: "Saudi Arabia Market",
    h1: "Security Doors and Smart Entry for Saudi Arabia",
    lead: "A sourcing route for Saudi distributors and projects requiring heat-aware finishes, villa-scale entrances, documentation review and coordinated export delivery.",
    image: "/images/gs-saudi-villa.jpg",
    audience: "For Saudi distributors, developers, contractors and design teams",
    overviewTitle: "Specify for the Project, Climate and Approval Route",
    overview: ["Saudi projects range from premium villas to hospitality and large residential packages. Direct sun, heat, dust, coastal exposure and large architectural openings influence the door finish, seals, hardware and smart-entry configuration.", "Compliance requirements vary by building and authority. Buyers should provide the project code, consultant schedule and approval expectations so evidence can be checked against the exact proposed doorset."],
    requirements: [["Project authority", "Identify city, building use, consultant and the approval route before selecting documentation."], ["Climate zone", "State whether the opening faces direct sun, dust, humidity or coastal salt exposure."], ["Arabic documentation", "Confirm whether schedules, labels, manuals or handover materials require Arabic alongside English."], ["Villa and project sizes", "Provide opening schedules early; large leaves and repeated apartment types require different engineering and logistics."], ["Smart-lock service", "Define credentials, connectivity, backup access and the party responsible for commissioning and support."], ["Import and delivery", "Agree Incoterm, port, packaging, batch plan, documents and site receiving constraints."]],
    process: [["01", "Share project location, opening schedule, quantity, target standard and required delivery date."], ["02", "Review climate exposure, door configuration, smart lock and documentation gaps."], ["03", "Approve commercial and technical submittals, samples and packaging labels."], ["04", "Manufacture and deliver in agreed batches with shipment and handover files."]],
    faq: [["Does one Saudi requirement apply to every project?", "No. Requirements depend on location, building use and the approving authority; the project team should identify the applicable route."], ["Are Arabic materials available?", "Arabic-facing labels or documents can be scoped during submittal review where required."], ["Can products be customised for villas?", "Yes. Opening size, decorative finish, lock function and weather exposure can be reviewed for villa entrance packages."]],
    related: [["Global Projects", "/projects"], ["Villa Security Doors", "/solutions/villa-security-doors"], ["Saudi Market Insight", "/insights/saudi-arabia-uae-security-door-market-2026"]],
  },
  "uae-security-doors": {
    path: "/global/uae/security-doors",
    title: "Security Door Supplier for UAE Projects & Villas | WONLY",
    description: "Source security doors, hotel door packages and smart locks for UAE projects with finish, fire, access-control and delivery coordination from WONLY.",
    eyebrow: "United Arab Emirates Market",
    h1: "Security Doors and Smart Locks for UAE Projects",
    lead: "Coordinate premium finishes, coastal exposure, fire-door documentation, smart access and phased delivery for UAE residential and hospitality projects.",
    image: "/images/proj-egypt-cbd.webp",
    audience: "For UAE developers, consultants, contractors and distributors",
    overviewTitle: "Match Each Opening to Its Design and Compliance Role",
    overview: ["UAE developments often combine premium villa entrances, apartment doors, hotel packages, service doors and connected access. Treating them as one generic door type creates approval and installation risk.", "WONLY supports opening-by-opening review across security doors, wooden doors and smart locks, with attention to coastal exposure, finish samples, fire documentation and phased project logistics."],
    requirements: [["Authority and consultant", "Record the emirate, building use, consultant specification and required technical submittal format."], ["Fire-door scope", "Separate rated and non-rated openings, then coordinate labels, hardware, seals and installation requirements."], ["Coastal exposure", "Identify salt, humidity and direct-sun conditions before approving finish and hardware materials."], ["Premium finish", "Use physical samples and mock-ups to coordinate colour, texture, handle and surrounding facade materials."], ["Access integration", "Clarify lock platform, credentials, power, network, emergency operation and system-integrator responsibility."], ["Phased logistics", "Package and label by tower, floor, room type or villa batch to reduce site handling errors."]],
    process: [["01", "Issue the door schedule, specifications, finish references, access requirements and programme."], ["02", "Return a compliance matrix identifying matched configurations, options and open items."], ["03", "Approve samples, mock-ups, drawings and documentation before production release."], ["04", "Deliver by project phase with traceable labels, spares and handover documentation."]],
    faq: [["Can one supplier cover doors and smart locks?", "WONLY can coordinate security-door, wooden-door and smart-lock scopes, subject to the project specification and integration boundary."], ["How should coastal exposure be specified?", "State distance from coast, direct exposure and cleaning regime, then request material and finish evidence for the selected configuration."], ["Can deliveries be split by tower or floor?", "Yes. Phased packaging and labelling can be planned when the release schedule and site receiving process are agreed early."]],
    related: [["Hotel Door Solution", "/solutions/hotel-security-doors"], ["Fire-Rated Security Doors", "/products/security-doors/fire-rated"], ["Middle East Market Insight", "/insights/middle-east-security-door-market-2026"]],
  },
};

export default function IntentLandingPage({ pageKey }: { pageKey: PageKey }) {
  const page = PAGES[pageKey];
  const faqSchema = page.faq.map(([name, answer]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text: answer } }));
  useSeo({
    title: page.title,
    description: page.description,
    path: page.path,
    image: `${SITE_URL}${page.image}`,
    type: page.path.startsWith("/products/") ? "product" : "website",
    localized: false,
    jsonLd: [
      { "@context": "https://schema.org", "@type": "WebPage", name: page.h1, description: page.description, url: `${SITE_URL}${page.path}/`, inLanguage: "en" },
      { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqSchema },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: page.path.startsWith("/global/") ? "Global Markets" : page.path.startsWith("/solutions/") ? "Solutions" : "Products", item: `${SITE_URL}${page.path.startsWith("/global/") ? "/global-strategy/" : page.path.startsWith("/solutions/") ? "/projects/" : "/products/security-doors/"}` },
        { "@type": "ListItem", position: 3, name: page.h1, item: `${SITE_URL}${page.path}/` },
      ] },
    ],
  });

  return <div style={{ background: "#fff", color: DARK }}>
    <SiteHeader />
    <section className="relative min-h-[72vh] flex items-end overflow-hidden bg-[#0d0d0d]">
      <img src={page.image} alt={page.h1} className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25" />
      <div className="relative z-10 px-[7vw] pt-36 pb-20 max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-1 text-xs text-white/65"><Link to="/">Home</Link><ChevronRight size={13}/><span>{page.eyebrow}</span></nav>
        <div className={eyebrow} style={{ color: "#d8c8a7" }}>{page.eyebrow}</div>
        <h1 className="mt-4 max-w-4xl text-[38px] md:text-[64px] font-light leading-[1.05] text-white">{page.h1}</h1>
        <p className="mt-6 max-w-3xl text-[16px] md:text-[18px] leading-relaxed text-white/80">{page.lead}</p>
        <div className="mt-7 text-sm font-medium" style={{ color: "#d8c8a7" }}>{page.audience}</div>
      </div>
    </section>

    <section className="px-[7vw] py-20 md:py-28"><div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr]">
      <Reveal><div className={eyebrow} style={{ color: GOLD_DEEP }}>Buyer Brief</div><h2 className={h2cls + " mt-4"}>{page.overviewTitle}</h2></Reveal>
      <div>{page.overview.map((text) => <p key={text} className="mb-5 text-[16px] leading-[1.8]" style={{ color: MUTED }}>{text}</p>)}</div>
    </div></section>

    <section className="px-[7vw] py-20 md:py-28" style={{ background: CHAMP_BG }}><div className="mx-auto max-w-6xl">
      <div className={eyebrow} style={{ color: GOLD_DEEP }}>Specification Checklist</div><h2 className={h2cls + " mt-4 max-w-3xl"}>What Buyers Should Define Before Quotation</h2>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{page.requirements.map(([title, text], index) => <Reveal key={title} delay={(index % 3) * 60}><div className="h-full rounded-2xl border border-[#ded6c8] bg-white p-6"><div className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: `${GOLD}22` }}><Check size={15} style={{ color: GOLD }}/></span><h3 className="font-semibold">{title}</h3></div><p className="mt-4 text-sm leading-relaxed" style={{ color: MUTED }}>{text}</p></div></Reveal>)}</div>
    </div></section>

    <section className="px-[7vw] py-20 md:py-28"><div className="mx-auto max-w-6xl"><div className={eyebrow} style={{ color: GOLD_DEEP }}>Project Workflow</div><h2 className={h2cls + " mt-4"}>From Requirement to Delivery</h2><div className="mt-12 grid gap-6 md:grid-cols-4">{page.process.map(([step, text]) => <div key={step} className="border-t-2 pt-5" style={{ borderColor: GOLD }}><div className="text-2xl font-light" style={{ color: GOLD_DEEP }}>{step}</div><p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>{text}</p></div>)}</div></div></section>

    <section className="px-[7vw] py-20 md:py-28" style={{ background: CHAMP_BG }}><div className="mx-auto max-w-4xl"><div className={eyebrow} style={{ color: GOLD_DEEP }}>FAQ</div><h2 className={h2cls + " mt-4"}>Procurement Questions</h2><div className="mt-10 divide-y divide-[#ded6c8]">{page.faq.map(([question, answer]) => <div key={question} className="py-6"><h3 className="text-lg font-semibold">{question}</h3><p className="mt-3 leading-relaxed" style={{ color: MUTED }}>{answer}</p></div>)}</div></div></section>

    <section className="px-[7vw] py-16"><div className="mx-auto max-w-6xl"><h2 className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: GOLD_DEEP }}>Related Products & Guides</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{page.related.map(([label, path]) => <Link key={path} to={path} className="group flex items-center justify-between rounded-xl border border-[#ded6c8] p-5 font-medium hover:bg-[#f8f5ee]">{label}<ArrowRight size={17} className="transition-transform group-hover:translate-x-1"/></Link>)}</div></div></section>
    <CtaBand title="Discuss Your Door or Smart-Entry Requirement" sub="Send the market, project type, quantity, opening schedule and target delivery date. Our team will identify the next technical inputs." />
    <SiteFooter />
  </div>;
}
