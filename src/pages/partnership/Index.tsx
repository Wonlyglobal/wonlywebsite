import { ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter, CtaBand, GOLD, CHAMP, MUTED, BASE, eyebrow, Reveal, useQuoteStore } from "@/lib/site-ui";
import { useSeo } from "@/lib/seo";
import { useLocale, type Locale } from "@/lib/i18n";

const PATHS = [
  { t: "Distributor Program", d: "Join a global network backed by 30 years of brand equity — with full product training, marketing support and protected territories.", cta: "Become a Distributor", biz: "Distributor / Dealer" },
  { t: "Project Cooperation", d: "Residential, commercial, medical, hotel, government and public projects — certified, project-ready security at scale.", cta: "Submit a Project", biz: "Project / Developer" },
  { t: "OEM / ODM Services", d: "Leverage our smart factories and 1,000+ patents to build your own branded security-door and smart-lock line.", cta: "Request OEM / ODM Brief", biz: "OEM / ODM" },
  { t: "Global Distribution Network", d: "Regional HQs, local offices and authorized partners across the Middle East, Southeast Asia and Central Asia — radiating worldwide.", cta: "Find a Local Partner", biz: "Distributor / Dealer" },
];

const PARTNERS = [
  { img: "partner-huawei.webp", n: "Huawei", y: "2020" },
  { img: "partner-siemens.webp", n: "Siemens", y: "2019" },
  { img: "partner-alibaba.webp", n: "Alibaba", y: "2021" },
  { img: "partner-hikvision.webp", n: "Hikvision", y: "2019" },
  { img: "partner-china-mobile.webp", n: "China Mobile", y: "2019" },
  { img: "partner-china-telecom.webp", n: "China Telecom", y: "2020" },
  { img: "partner-midea.webp", n: "Midea", y: "2021" },
  { img: "partner-foxconn.webp", n: "Foxconn", y: "2018" },
  { img: "partner-shanghai-electric.webp", n: "Shanghai Electric", y: "2019" },
];

const RE = Array.from({ length: 30 }, (_, i) => `re-${String(i + 1).padStart(2, "0")}.png`);

type PartnershipCopy = { seoTitle:string; seoDescription:string; eyebrow:string; titleA:string; titleB:string; intro:string; paths:{t:string;d:string;cta:string}[]; strategic:string; trustedA:string; trustedB:string; partner:string; realEstate:string; developersA:string; developersB:string; ctaTitle:string; ctaSub:string };
const COPY: Partial<Record<Locale, PartnershipCopy>> = {
  ar:{seoTitle:"الشراكة مع WONLY | التوزيع والمشاريع وOEM/ODM",seoDescription:"شارك WONLY عبر برامج الموزعين والتعاون في المشاريع وخدمات OEM/ODM، بدعم خمسة مصانع ذكية وأكثر من 1,000 براءة اختراع.",eyebrow:"شارك WONLY",titleA:"افتح الباب أمام",titleB:"الشراكة",intro:"يبني الموزعون والمطورون وعلامات OEM/ODM أعمالهم على 30 عاماً من هندسة WONLY وخمسة مصانع ذكية وأكثر من 1,000 براءة اختراع.",paths:[{t:"برنامج الموزعين",d:"انضم إلى شبكة عالمية مدعومة بقيمة علامة عمرها 30 عاماً مع تدريب وتسويق وحماية للمناطق.",cta:"كن موزعاً"},{t:"التعاون في المشاريع",d:"حلول معتمدة وجاهزة للمشاريع السكنية والتجارية والطبية والفندقية والحكومية.",cta:"أرسل مشروعاً"},{t:"خدمات OEM / ODM",d:"استفد من مصانعنا الذكية وبراءاتنا لبناء خط أبواب أمان وأقفال ذكية بعلامتك.",cta:"اطلب موجز OEM / ODM"},{t:"شبكة توزيع عالمية",d:"مقار ومكاتب وشركاء معتمدون في الشرق الأوسط وجنوب شرق ووسط آسيا مع تغطية عالمية.",cta:"ابحث عن شريك محلي"}],strategic:"الشركاء الاستراتيجيون",trustedA:"موثوق لدى",trustedB:"رواد الصناعة",partner:"شريك",realEstate:"شركاء العقارات",developersA:"موثوق لدى",developersB:"أبرز المطورين في الصين",ctaTitle:"لنبنِ سوقك معاً",ctaSub:"أخبرنا عن منطقتك أو مشروعك؛ يرد فريق الشراكات خلال 24 ساعة بالبرامج والشروط والدعم."},
  fr:{seoTitle:"Partenariat WONLY | Distribution, projets et OEM/ODM",seoDescription:"Devenez partenaire WONLY : programmes distributeurs, coopération projets et services OEM/ODM soutenus par cinq usines intelligentes et plus de 1 000 brevets.",eyebrow:"Devenez partenaire WONLY",titleA:"Ouvrez la porte au",titleB:"partenariat",intro:"Distributeurs, promoteurs et marques OEM/ODM s’appuient sur 30 ans d’ingénierie WONLY, cinq usines intelligentes et plus de 1 000 brevets.",paths:[{t:"Programme distributeurs",d:"Rejoignez un réseau mondial avec formation produit, soutien marketing et territoires protégés.",cta:"Devenir distributeur"},{t:"Coopération projets",d:"Sécurité certifiée pour projets résidentiels, commerciaux, médicaux, hôteliers et publics.",cta:"Soumettre un projet"},{t:"Services OEM / ODM",d:"Exploitez nos usines et brevets pour créer votre gamme de portes et serrures sous votre marque.",cta:"Demander un brief OEM / ODM"},{t:"Réseau mondial de distribution",d:"Sièges régionaux, bureaux et partenaires agréés au Moyen-Orient et en Asie, avec couverture mondiale.",cta:"Trouver un partenaire local"}],strategic:"Partenaires stratégiques",trustedA:"La confiance des",trustedB:"leaders du secteur",partner:"Partenaire",realEstate:"Partenaires immobiliers",developersA:"La confiance des",developersB:"grands promoteurs chinois",ctaTitle:"Construisons votre marché ensemble",ctaSub:"Présentez votre territoire ou projet ; notre équipe répond sous 24 heures avec programmes, conditions et accompagnement."},
  ru:{seoTitle:"Партнёрство с WONLY | Дистрибуция, проекты и OEM/ODM",seoDescription:"Партнёрские программы WONLY для дистрибьюторов, проектов и OEM/ODM на базе пяти умных заводов и более 1 000 патентов.",eyebrow:"Партнёрство с WONLY",titleA:"Откройте дверь для",titleB:"партнёрства",intro:"Дистрибьюторы, девелоперы и OEM/ODM-бренды используют 30 лет инженерного опыта WONLY, пять умных заводов и более 1 000 патентов.",paths:[{t:"Программа дистрибьюторов",d:"Глобальная сеть, обучение продукту, маркетинговая поддержка и защищённые территории.",cta:"Стать дистрибьютором"},{t:"Проектное сотрудничество",d:"Сертифицированные решения для жилых, коммерческих, медицинских, гостиничных и государственных объектов.",cta:"Предложить проект"},{t:"Услуги OEM / ODM",d:"Создайте собственную линейку дверей и умных замков на базе наших заводов и патентов.",cta:"Запросить OEM / ODM"},{t:"Глобальная сеть",d:"Региональные центры, офисы и авторизованные партнёры на Ближнем Востоке и в Азии с мировым охватом.",cta:"Найти местного партнёра"}],strategic:"Стратегические партнёры",trustedA:"Нам доверяют",trustedB:"лидеры отрасли",partner:"Партнёр",realEstate:"Партнёры в недвижимости",developersA:"Нам доверяют",developersB:"ведущие девелоперы Китая",ctaTitle:"Давайте развивать ваш рынок вместе",ctaSub:"Расскажите о регионе или проекте — команда ответит за 24 часа и предложит программу, условия и поддержку."},
  es:{seoTitle:"Asociación con WONLY | Distribución, proyectos y OEM/ODM",seoDescription:"Asóciese con WONLY mediante programas de distribución, cooperación de proyectos y OEM/ODM, respaldados por cinco fábricas inteligentes y más de 1.000 patentes.",eyebrow:"Asóciese con WONLY",titleA:"Abra la puerta a la",titleB:"colaboración",intro:"Distribuidores, promotores y marcas OEM/ODM se apoyan en 30 años de ingeniería WONLY, cinco fábricas inteligentes y más de 1.000 patentes.",paths:[{t:"Programa de distribuidores",d:"Únase a una red mundial con formación, apoyo comercial y territorios protegidos.",cta:"Ser distribuidor"},{t:"Cooperación en proyectos",d:"Seguridad certificada para proyectos residenciales, comerciales, médicos, hoteleros y públicos.",cta:"Presentar un proyecto"},{t:"Servicios OEM / ODM",d:"Aproveche nuestras fábricas y patentes para crear su propia línea de puertas y cerraduras.",cta:"Solicitar información OEM / ODM"},{t:"Red mundial de distribución",d:"Sedes, oficinas y socios autorizados en Oriente Medio y Asia con alcance mundial.",cta:"Encontrar un socio local"}],strategic:"Socios estratégicos",trustedA:"La confianza de los",trustedB:"líderes del sector",partner:"Socio",realEstate:"Socios inmobiliarios",developersA:"La confianza de los",developersB:"principales promotores de China",ctaTitle:"Construyamos juntos su mercado",ctaSub:"Cuéntenos su territorio o proyecto; respondemos en 24 horas con programas, condiciones y apoyo."}
};

export default function Partnership() {
  const { locale } = useLocale();
  const copy = COPY[locale];
  const paths = PATHS.map((p,i)=>({ ...p, ...copy?.paths[i] }));
  const openQuote = useQuoteStore((s) => s.openQuote);
  useSeo({
    title: copy?.seoTitle ?? "Partnership | WONLY",
    description: copy?.seoDescription ?? "Partner with WONLY — distributor programs, project cooperation and OEM/ODM services. Trusted by Huawei, Siemens, Alibaba and China's leading developers. SSE: 605268.",
    path: "/partnership",
  });

  return (
    <div className="min-w-[320px] bg-[#F5F1EA] text-[#221F20]">
      <SiteHeader />

      {/* Hero */}
      <section className="relative text-white px-[6vw] pt-[150px] pb-[90px] overflow-hidden" style={{ background: "radial-gradient(120% 100% at 78% 15%, #2a2627 0%, #0d0d0d 72%)" }}>
        <Reveal className="max-w-[1200px] mx-auto">
          <div className={eyebrow} style={{ color: CHAMP }}>{copy?.eyebrow ?? "Partner With WONLY"}</div>
          <h1 className="mt-4 font-light leading-[1.05] tracking-[-1px] text-[clamp(34px,5vw,64px)]">{copy?.titleA ?? "Open the Door to"} <span style={{ color: CHAMP }}>{copy?.titleB ?? "Partnership"}</span></h1>
          <p className="mt-5 max-w-[560px] text-[15px] leading-[1.75]" style={{ color: "rgba(245,241,234,0.72)" }}>
            {copy?.intro ?? "Distributors, developers and OEM/ODM brands build on 30 years of WONLY engineering, five smart factories and 1,000+ patents — with a partner trusted from residences to national institutions."}
          </p>
        </Reveal>
      </section>

      {/* Partnership paths */}
      <section className="max-w-[1200px] mx-auto px-[6vw] py-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paths.map((p, i) => (
            <Reveal key={p.t} delay={i * 90}>
              <div className="h-full bg-white border rounded-2xl p-9 flex flex-col" style={{ borderColor: "#e4ddcf" }}>
                <div className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: GOLD }}>0{i + 1}</div>
                <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.3px]">{p.t}</h3>
                <p className="mt-3 text-[14.5px] leading-[1.7] flex-1" style={{ color: MUTED }}>{p.d}</p>
                <button onClick={() => openQuote({ biz: p.biz })} className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold w-fit" style={{ color: "#221F20" }}>
                  <span className="border-b-[1.5px] pb-0.5" style={{ borderColor: GOLD }}>{p.cta}</span> <ArrowRight size={15} style={{ color: GOLD }} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Strategic partners — ceremony photos */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-[6vw] py-[80px]">
          <Reveal>
            <div className={eyebrow} style={{ color: GOLD }}>{copy?.strategic ?? "Strategic Partners"}</div>
            <h2 className="mt-3 font-light leading-[1.1] text-[clamp(28px,3.4vw,46px)]">{copy?.trustedA ?? "Trusted by"} <b className="font-semibold">{copy?.trustedB ?? "Industry Leaders"}</b></h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-9">
            {PARTNERS.map((p, i) => (
              <Reveal key={p.n} delay={i * 60}>
                <div className="group relative rounded-2xl overflow-hidden h-[240px]">
                  <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={`${BASE}images/partners-ceremony/${p.img}`} alt={`WONLY strategic partnership — ${p.n}`} loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(12,10,9,0.85) 0%,rgba(12,10,9,0.1) 45%,transparent 65%)" }} />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="text-white text-[17px] font-semibold leading-tight">{p.n}</div>
                    <div className="mt-0.5 text-[10px] tracking-[0.14em] uppercase" style={{ color: CHAMP }}>{copy?.partner ?? "Partner"} · {p.y}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Real-estate developers logo wall */}
      <section className="max-w-[1200px] mx-auto px-[6vw] py-[80px]">
        <Reveal>
          <div className={eyebrow} style={{ color: GOLD }}>{copy?.realEstate ?? "Real-Estate Partners"}</div>
          <h2 className="mt-3 font-light leading-[1.1] text-[clamp(28px,3.4vw,46px)]">{copy?.developersA ?? "Trusted by China's"} <b className="font-semibold">{copy?.developersB ?? "Leading Developers"}</b></h2>
        </Reveal>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-9">
          {RE.map((f, i) => (
            <Reveal key={f} delay={(i % 6) * 40}>
              <div className="bg-white border rounded-xl h-[84px] flex items-center justify-center p-4 transition-shadow hover:shadow-[0_14px_30px_-20px_rgba(34,31,32,0.5)]" style={{ borderColor: "#e9e2d4" }}>
                <img className="max-h-[46px] max-w-full object-contain" src={`${BASE}images/partners-re/${f}`} alt="WONLY real-estate developer partner" loading="lazy" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand eyebrowText={copy?.eyebrow ?? "Partner With WONLY"} title={copy?.ctaTitle ?? "Let's Build Your Market Together"} sub={copy?.ctaSub ?? "Tell us about your territory or project — our partnership team replies within 24 hours with programs, terms and support."} />
      <SiteFooter />
    </div>
  );
}
