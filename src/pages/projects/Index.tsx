import { ArrowRight } from "lucide-react";
import { useSeo } from "@/lib/seo";
import { GOLD, GOLD_DEEP, CHAMP, CHAMP_BG, DARK, MUTED, SILVER, BASE, eyebrow, h2cls, Reveal, SiteHeader, SiteFooter, CtaBand, useQuoteStore } from "@/lib/site-ui";
import { useLocale, type Locale } from "@/lib/i18n";

const PROJECTS = [
  { name: "New Administrative Capital CBD", place: "Cairo, Egypt", tag: "Government", img: `${BASE}images/proj-egypt-cbd.webp` },
  { name: "National Food Centre", place: "Barbados", tag: "Government", img: `${BASE}images/proj-barbados.webp` },
  { name: "New Capital Arc Landmark", place: "Cairo, Egypt", tag: "Landmark", img: `${BASE}images/proj-cairo-hotel.webp` },
  { name: "Jazan Industrial City", place: "Saudi Arabia", tag: "Industrial", img: `${BASE}images/proj-saudi-villa.webp` },
  { name: "Mixed-Use Complex", place: "Mozambique · 35,000 m²", tag: "Commercial", img: `${BASE}images/proj-s-7.webp` },
  { name: "Convention & Expo Center", place: "Asia-Pacific", tag: "Commercial", img: `${BASE}images/proj-1.webp` },
  { name: "International Airport", place: "Aviation Hub", tag: "Infrastructure", img: `${BASE}images/landmark-daxing.webp` },
  { name: "Olympic Sports Center", place: "Stadium & Arena", tag: "Public", img: `${BASE}images/landmark-asiangames.webp` },
  { name: "Metropolitan Residential", place: "Smart Community", tag: "Residential", img: `${BASE}images/landmark-metro.webp` },
];

const STATS = [
  { v: "60+", label: "Countries & Regions" },
  { v: "600+", label: "International Projects" },
  { v: "2010", label: "Overseas Since" },
  { v: "200M+", label: "Users Protected" },
];

type ProjectsCopy = { seoTitle:string;seoDescription:string;eye:string;titleA:string;titleB:string;intro:string;discuss:string;stats:string[];selected:string;specified:string;projects:{name:string;place:string;tag:string}[];references:string;where:string;types:string;sectors:[string,string][];ctaTitle:string;ctaSub:string };
const COPY: Partial<Record<Locale, ProjectsCopy>> = {
  ar:{seoTitle:"مشاريع WONLY العالمية — مراجع حكومية ومؤسسية",seoDescription:"تُستخدم أبواب الأمان والأقفال والنوافذ الذكية من WONLY في أكثر من 60 دولة، من العواصم والمؤسسات الوطنية إلى المطارات والملاعب والمجمعات السكنية.",eye:"مشاريع عالمية بارزة",titleA:"موثوق حيث",titleB:"لا مجال للفشل",intro:"من مناطق العواصم السيادية إلى المؤسسات الوطنية، تُعتمد WONLY في أكثر من 60 دولة حيث لا يمكن التهاون في الأمان والحريق والاعتمادية.",discuss:"ناقش مشروعك",stats:["دولة ومنطقة","مشروع دولي","في الأسواق الخارجية منذ","مستخدم محمي"],selected:"مراجع مختارة",specified:"معتمدة في أكثر من 60 دولة",projects:[{name:"منطقة الأعمال بالعاصمة الإدارية الجديدة",place:"القاهرة، مصر",tag:"حكومي"},{name:"المركز الوطني للأغذية",place:"بربادوس",tag:"حكومي"},{name:"معلم القوس بالعاصمة الجديدة",place:"القاهرة، مصر",tag:"معلم"},{name:"مدينة جازان الصناعية",place:"السعودية",tag:"صناعي"},{name:"مجمع متعدد الاستخدامات",place:"موزمبيق · 35,000 م²",tag:"تجاري"},{name:"مركز المؤتمرات والمعارض",place:"آسيا والمحيط الهادئ",tag:"تجاري"},{name:"مطار دولي",place:"مركز طيران",tag:"بنية تحتية"},{name:"مركز رياضي أولمبي",place:"ملعب وصالة",tag:"عام"},{name:"مجمع سكني حضري",place:"مجتمع ذكي",tag:"سكني"}],references:"تشمل المراجع الأخرى بنك الحبشة في إثيوبيا ومشاريع قصور رئاسية في توغو وفانواتو، إلى جانب موزعين وتركيبات في الشرق الأوسط وآسيا وأفريقيا والأمريكتين.",where:"مجالات التنفيذ",types:"حلول لكل أنواع المشاريع",sectors:[["حكومي ومؤسسي","عواصم ووزارات وبنوك ومؤسسات وطنية تتطلب الامتثال والاعتمادية."],["ضيافة ومعالم","فنادق ومطارات وملاعب وأبراج تتطلب التصميم والأداء معاً."],["تطوير سكني","فلل ومجمعات مغلقة وأبراج سكنية مع تكامل أمني ذكي."],["صناعي وعام","مدن صناعية ومستشفيات ومرافق عامة مصممة للحريق والتحكم بالدخول والمتانة."]],ctaTitle:"هل لديك مشروع؟",ctaSub:"أخبرنا عن السوق أو المواصفات؛ نرد خلال 24 ساعة بالمراجع ووثائق المطابقة والأسعار."},
  fr:{seoTitle:"Projets internationaux WONLY — Références publiques et institutionnelles",seoDescription:"Les portes, serrures et fenêtres WONLY équipent plus de 60 pays, des capitales et institutions nationales aux aéroports, stades et résidences emblématiques.",eye:"Projets emblématiques mondiaux",titleA:"La confiance là où",titleB:"l’échec est exclu",intro:"Des quartiers souverains aux institutions nationales, WONLY est spécifié dans plus de 60 pays où sécurité, feu et fiabilité sont impératifs.",discuss:"Parler de votre projet",stats:["Pays et régions","Projets internationaux","À l’international depuis","Utilisateurs protégés"],selected:"Références sélectionnées",specified:"Spécifié dans plus de 60 pays",projects:[{name:"CBD de la nouvelle capitale administrative",place:"Le Caire, Égypte",tag:"Public"},{name:"Centre national de l’alimentation",place:"Barbade",tag:"Public"},{name:"Monument Arc de la nouvelle capitale",place:"Le Caire, Égypte",tag:"Emblématique"},{name:"Ville industrielle de Jazan",place:"Arabie saoudite",tag:"Industriel"},{name:"Complexe multifonction",place:"Mozambique · 35 000 m²",tag:"Commercial"},{name:"Centre de congrès et d’exposition",place:"Asie-Pacifique",tag:"Commercial"},{name:"Aéroport international",place:"Plateforme aérienne",tag:"Infrastructure"},{name:"Centre sportif olympique",place:"Stade et arène",tag:"Public"},{name:"Résidence métropolitaine",place:"Communauté intelligente",tag:"Résidentiel"}],references:"D’autres références comprennent Abyssinia Bank en Éthiopie et des palais présidentiels au Togo et au Vanuatu, ainsi que des installations au Moyen-Orient, en Asie, en Afrique et dans les Amériques.",where:"Nos secteurs",types:"Conçu pour chaque type de projet",sectors:[["Public et institutionnel","Capitales, ministères, banques et institutions où conformité et fiabilité sont obligatoires."],["Hôtellerie et monuments","Hôtels, arènes, aéroports et tours exigeant design et performance."],["Programmes résidentiels","Villas, résidences fermées et immeubles avec sécurité intelligente intégrée."],["Industriel et public","Villes industrielles, hôpitaux et équipements conçus pour feu, accès et durabilité."]],ctaTitle:"Un projet en tête ?",ctaSub:"Indiquez territoire ou spécifications ; réponse sous 24 heures avec références, conformité et prix."},
  ru:{seoTitle:"Международные проекты WONLY — Государственные и институциональные объекты",seoDescription:"Двери, замки и окна WONLY применяются более чем в 60 странах — от столичных районов и национальных учреждений до аэропортов, стадионов и жилых комплексов.",eye:"Знаковые проекты мира",titleA:"Нам доверяют там, где",titleB:"ошибка недопустима",intro:"От столичных деловых районов до национальных учреждений WONLY выбирают более чем в 60 странах, где безопасность, огнестойкость и надёжность обязательны.",discuss:"Обсудить проект",stats:["Стран и регионов","Международных проектов","На зарубежных рынках с","Защищённых пользователей"],selected:"Избранные объекты",specified:"Установлено более чем в 60 странах",projects:[{name:"CBD новой административной столицы",place:"Каир, Египет",tag:"Государственный"},{name:"Национальный продовольственный центр",place:"Барбадос",tag:"Государственный"},{name:"Арка новой столицы",place:"Каир, Египет",tag:"Знаковый"},{name:"Промышленный город Джазан",place:"Саудовская Аравия",tag:"Промышленный"},{name:"Многофункциональный комплекс",place:"Мозамбик · 35 000 м²",tag:"Коммерческий"},{name:"Конгрессно-выставочный центр",place:"Азиатско-Тихоокеанский регион",tag:"Коммерческий"},{name:"Международный аэропорт",place:"Авиационный узел",tag:"Инфраструктура"},{name:"Олимпийский спортивный центр",place:"Стадион и арена",tag:"Общественный"},{name:"Городской жилой комплекс",place:"Умное сообщество",tag:"Жилой"}],references:"Среди других объектов — Abyssinia Bank в Эфиопии и президентские дворцы в Того и Вануату, а также установки на Ближнем Востоке, в Азии, Африке и Америке.",where:"Где мы работаем",types:"Для проектов любого типа",sectors:[["Государственные и институциональные","Столичные районы, министерства, банки и учреждения с обязательным соответствием нормам."],["Гостиничные и знаковые","Отели, арены, аэропорты и башни, где равно важны дизайн и характеристики."],["Жилая застройка","Виллы, закрытые комплексы и высотные дома с интегрированной умной защитой."],["Промышленные и общественные","Промышленные города, больницы и объекты с требованиями к огню, доступу и ресурсу."]],ctaTitle:"Есть проект?",ctaSub:"Сообщите регион или требования — ответим за 24 часа с референсами, документами и ценой."},
  es:{seoTitle:"Proyectos internacionales WONLY — Referencias gubernamentales e institucionales",seoDescription:"Puertas, cerraduras y ventanas WONLY se especifican en más de 60 países, desde capitales e instituciones hasta aeropuertos, estadios y residencias emblemáticas.",eye:"Proyectos emblemáticos mundiales",titleA:"Confianza donde",titleB:"fallar no es una opción",intro:"Desde distritos de capitales soberanas hasta instituciones nacionales, WONLY se especifica en más de 60 países donde seguridad, fuego y fiabilidad son esenciales.",discuss:"Hablemos de su proyecto",stats:["Países y regiones","Proyectos internacionales","En el exterior desde","Usuarios protegidos"],selected:"Referencias seleccionadas",specified:"Especificado en más de 60 países",projects:[{name:"CBD de la nueva capital administrativa",place:"El Cairo, Egipto",tag:"Gobierno"},{name:"Centro Nacional de Alimentos",place:"Barbados",tag:"Gobierno"},{name:"Arco emblemático de la nueva capital",place:"El Cairo, Egipto",tag:"Emblemático"},{name:"Ciudad Industrial de Jazan",place:"Arabia Saudí",tag:"Industrial"},{name:"Complejo de uso mixto",place:"Mozambique · 35.000 m²",tag:"Comercial"},{name:"Centro de Convenciones y Exposiciones",place:"Asia-Pacífico",tag:"Comercial"},{name:"Aeropuerto internacional",place:"Centro aeronáutico",tag:"Infraestructura"},{name:"Centro deportivo olímpico",place:"Estadio y arena",tag:"Público"},{name:"Residencial metropolitano",place:"Comunidad inteligente",tag:"Residencial"}],references:"Otras referencias incluyen Abyssinia Bank en Etiopía y palacios presidenciales en Togo y Vanuatu, además de instalaciones en Oriente Medio, Asia, África y América.",where:"Dónde suministramos",types:"Para cada tipo de proyecto",sectors:[["Gobierno e instituciones","Capitales, ministerios, bancos e instituciones donde el cumplimiento es obligatorio."],["Hospitalidad y edificios emblemáticos","Hoteles, estadios, aeropuertos y torres que exigen diseño y prestaciones."],["Promociones residenciales","Villas, urbanizaciones y edificios con seguridad inteligente integral."],["Industrial y público","Ciudades industriales, hospitales e instalaciones diseñadas para fuego, acceso y durabilidad."]],ctaTitle:"¿Tiene un proyecto en mente?",ctaSub:"Indique territorio o requisitos; respondemos en 24 horas con referencias, conformidad y precios."}
};

export default function Projects() {
  const { locale } = useLocale();
  const copy = COPY[locale];
  const projects = PROJECTS.map((p,i)=>({ ...p, ...copy?.projects[i] }));
  useSeo({
    title: copy?.seoTitle ?? "Global Landmark Projects — Government & Institutional References | WONLY",
    description: copy?.seoDescription ?? "WONLY security doors, smart locks and windows are specified across 60+ countries — from sovereign capital districts and national institutions to airports, stadiums and landmark residential developments.",
    path: "/projects",
    type: "website",
  });
  const openQuote = useQuoteStore((s) => s.openQuote);
  return (
    <div className="w-full font-sans antialiased overflow-x-hidden" style={{ background: CHAMP_BG, color: DARK }}>
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[74vh] min-h-[480px] w-full overflow-hidden flex items-center" style={{ background: "#0d0d0d" }}>
        <img src={`${BASE}images/proj-egypt-cbd.webp`} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.55) 60%, rgba(13,13,13,0.3) 100%)" }} />
        <div className="relative z-10 px-[7vw] max-w-3xl">
          <div className={eyebrow + " mb-6"} style={{ color: CHAMP }}>{copy?.eye ?? "Global Landmark Projects"}</div>
          <h1 className="font-light uppercase text-white leading-[1.08] tracking-[0.05em] text-[40px] md:text-[70px]">{copy?.titleA ?? "Trusted where failure"}<br /><span style={{ color: CHAMP }}>{copy?.titleB ?? "isn't an option"}</span></h1>
          <p className="mt-7 max-w-lg text-base md:text-lg font-normal leading-relaxed" style={{ color: "#efe9dd" }}>{copy?.intro ?? "From sovereign capital districts to national institutions, WONLY is specified across 60+ countries where security, fire performance and reliability cannot fail."}</p>
          <button onClick={() => openQuote()} className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>{copy?.discuss ?? "Discuss Your Project"} <ArrowRight size={15} /></button>
        </div>
      </section>

      {/* Stats */}
      <section className="px-[7vw] py-14 md:py-16" style={{ background: "#fff" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <Reveal key={s.label}>
              <div className="text-4xl md:text-5xl font-light leading-none" style={{ color: GOLD }}>{s.v}</div>
              <div className="mt-2 text-[11px] tracking-[0.16em] uppercase font-medium" style={{ color: DARK }}>{copy?.stats[STATS.indexOf(s)] ?? s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects grid */}
      <section className="px-[7vw] py-20 md:py-28" style={{ background: CHAMP_BG }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD_DEEP }}>{copy?.selected ?? "Selected References"}</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{copy?.specified ?? "Specified Across 60+ Countries"}</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 80}>
              <div className="group relative rounded-2xl overflow-hidden h-[280px]">
                <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,0,0,0) 42%, rgba(13,13,13,0.88))" }} />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-medium" style={{ background: GOLD, color: DARK }}>{p.tag}</div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="text-white text-lg md:text-xl font-medium leading-tight">{p.name}</div>
                  <div className="mt-1 text-[11px] tracking-[0.16em] uppercase" style={{ color: CHAMP }}>{p.place}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm font-light" style={{ color: MUTED }}>{copy?.references ?? "Further references include Ethiopia's Abyssinia Bank and presidential-palace projects in Togo and Vanuatu — alongside distributors and installations across the Middle East, Southeast Asia, Central Asia, Africa and the Americas."}</p>
      </section>

      {/* Sectors */}
      <section className="px-[7vw] py-20 md:py-28" style={{ background: "#fff" }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD_DEEP }}>{copy?.where ?? "Where We Deliver"}</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{copy?.types ?? "Built For Every Project Type"}</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t" style={{ borderColor: `${SILVER}66` }}>
          {(copy?.sectors ?? [
            ["Government & Institutional", "Capital districts, ministries, banks and national institutions where compliance and reliability are mandatory."],
            ["Hospitality & Landmark", "Hotels, arenas, airports and signature towers that demand design and performance in equal measure."],
            ["Residential Developments", "Villas, gated communities and high-rise housing with whole-house smart-security integration."],
            ["Industrial & Public", "Industrial cities, hospitals and public facilities engineered for fire, access-control and durability."],
          ]).map(([t, d]) => (
            <Reveal key={t}>
              <div className="py-7 border-b" style={{ borderColor: `${SILVER}44` }}>
                <h3 className="text-xl font-light" style={{ color: DARK }}>{t}</h3>
                <p className="mt-2 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand eyebrowText={copy?.eye ?? "Global Projects"} title={copy?.ctaTitle ?? "Have A Project In Mind?"} sub={copy?.ctaSub ?? "Tell us your territory or specification — our team replies within 24 hours with references, compliance docs and pricing."} />
      <SiteFooter />
    </div>
  );
}
