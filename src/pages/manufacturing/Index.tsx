import { SiteHeader, SiteFooter, CtaBand, GOLD, CHAMP, MUTED, BASE, eyebrow, Reveal } from "@/lib/site-ui";
import { useSeo } from "@/lib/seo";
import { useLocale, type Locale } from "@/lib/i18n";

const STATS = [
  { n: "1,000,000+ m²", l: "Manufacturing Base" },
  { n: "5", l: "Production Bases" },
  { n: "6", l: "R&D Centers" },
  { n: "1,000+", l: "Patents" },
  { n: "6M / 3M", l: "Doors / Locks a Year" },
];

const STORY = [
  {
    img: "mfg-line.jpg", eb: "Vertically Integrated", h: "One Roof, Full Control",
    p: "Stamping, coating, foaming and final assembly all happen in-house across five production bases — so quality, consistency and lead time stay in our hands, not a supply chain's.",
    li: ["In-house stamping, PU foaming, powder coating & assembly", "Five vertically integrated bases across China", "6 million doors & 3 million locks produced per year"],
  },
  {
    img: "mfg-robot.jpg", eb: "Robotic Precision", h: "Automation Export Projects Rely On",
    p: "ABB automated welding cells and robotic handling hold the tolerances that international projects demand — repeatable, certified quality at volume.",
    li: ["ABB automated welding & robotic handling", "CNC machining for tight, repeatable tolerances", "5G-connected smart-factory monitoring"],
  },
  {
    img: "mfg-inspect.jpg", eb: "Quality & Testing", h: "Tested Beyond the Standard",
    p: "Every product line is validated against international security, fire and durability standards before it ships — including 200,000+ open-close cycle testing.",
    li: ["200,000+ cycle durability testing", "Fire, security & acoustic validation", "ISO 9001 · CE · UL certified processes"],
  },
];

const RD = [
  { big: "6", t: "R&D Centers", d: "Six dedicated centers driving continuous innovation in security doors, smart locks and whole-house intelligence." },
  { big: "1,000+", t: "Patents", d: "Over a thousand proprietary patents in structural security, biometric locking and IoT integration." },
  { big: "SSE 605268", t: "Listed Group", d: "The sector's first main-board company on the Shanghai Stock Exchange (2021) — the backing behind every warranty." },
];

type ManufacturingCopy={seoTitle:string;seoDescription:string;eye:string;titleA:string;titleB:string;intro:string;stats:string[];story:{eb:string;h:string;p:string;li:string[]}[];rdEye:string;rdA:string;rdB:string;rd:{t:string;d:string}[];ctaEye:string;ctaTitle:string;ctaSub:string};
const COPY:Partial<Record<Locale,ManufacturingCopy>>={
 ar:{seoTitle:"التصنيع والبحث والتطوير | WONLY",seoDescription:"قدرات WONLY التصنيعية: أكثر من مليون م² من المصانع الذكية المتكاملة وخطوط ABB وخمس قواعد إنتاج وستة مراكز بحث وأكثر من 1,000 براءة اختراع.",eye:"التصنيع والبحث والتطوير",titleA:"هندسة على نطاق واسع.",titleB:"مصنوع ليدوم",intro:"ثلاثون عاماً من التصنيع المتكامل في يونغكانغ، تشجيانغ: أكثر من مليون متر مربع من المصانع الذكية وخطوط روبوتية وستة مراكز بحث وراء كل باب وقفل.",stats:["مساحة التصنيع","قواعد الإنتاج","مراكز البحث والتطوير","براءة اختراع","باب / قفل سنوياً"],story:[{eb:"تكامل رأسي",h:"تحكم كامل تحت سقف واحد",p:"تتم عمليات الكبس والطلاء والرغوة والتجميع داخلياً في خمس قواعد إنتاج، لنحافظ على الجودة والاتساق ومدة التسليم.",li:["كبس ورغوة PU وطلاء مسحوق وتجميع داخلي","خمس قواعد متكاملة رأسياً في الصين","6 ملايين باب و3 ملايين قفل سنوياً"]},{eb:"دقة روبوتية",h:"أتمتة تعتمد عليها مشاريع التصدير",p:"تحافظ خلايا لحام ABB والمناولة الروبوتية على سماحات المشاريع الدولية وجودة متكررة ومعتمدة بكميات كبيرة.",li:["لحام ABB آلي ومناولة روبوتية","تشغيل CNC بسماحات دقيقة ومتكررة","مراقبة مصانع ذكية متصلة بـ5G"]},{eb:"الجودة والاختبار",h:"اختبارات تتجاوز المعيار",p:"يتم التحقق من كل خط منتج وفق معايير الأمان والحريق والمتانة الدولية قبل الشحن، بما في ذلك أكثر من 200,000 دورة.",li:["اختبار متانة لأكثر من 200,000 دورة","تحقق من الحريق والأمان والصوتيات","عمليات معتمدة ISO 9001 وCE وUL"]}],rdEye:"البحث والتطوير",rdA:"ستة مراكز،",rdB:"ألف براءة اختراع",rd:[{t:"مراكز بحث وتطوير",d:"ستة مراكز للابتكار المستمر في أبواب الأمان والأقفال الذكية والمنزل الذكي."},{t:"براءات اختراع",d:"أكثر من ألف براءة في الأمن الهيكلي والقفل البيومتري وتكامل إنترنت الأشياء."},{t:"مجموعة مدرجة",d:"أول شركة في القطاع مدرجة بالسوق الرئيسية لبورصة شنغهاي عام 2021، سند كل ضمان."}],ctaEye:"شراكة OEM / ODM",ctaTitle:"ابنِ علامتك على مصانعنا",ctaSub:"استفد من مصانعنا الذكية وأكثر من 1,000 براءة لبناء خط أمان بعلامتك، تصممه وتنتجه WONLY."},
 fr:{seoTitle:"Fabrication et R&D | WONLY",seoDescription:"WONLY : plus d’un million de m² d’usines intégrées, lignes robotisées ABB, cinq bases de production, six centres R&D et plus de 1 000 brevets.",eye:"Fabrication et R&D",titleA:"L’ingénierie à grande échelle.",titleB:"Conçu pour durer",intro:"Trente ans de fabrication intégrée à Yongkang : plus d’un million de m² d’usines intelligentes, lignes robotisées et six centres R&D derrière chaque porte et serrure.",stats:["Surface industrielle","Bases de production","Centres R&D","Brevets","Portes / serrures par an"],story:[{eb:"Intégration verticale",h:"Un site, un contrôle total",p:"Emboutissage, revêtement, moussage et assemblage sont réalisés en interne dans cinq bases afin de maîtriser qualité, régularité et délais.",li:["Emboutissage, mousse PU, thermolaquage et assemblage internes","Cinq bases verticalement intégrées en Chine","6 millions de portes et 3 millions de serrures par an"]},{eb:"Précision robotisée",h:"L’automatisation des projets internationaux",p:"Les cellules de soudage ABB et la manutention robotisée maintiennent les tolérances exigées par les projets internationaux.",li:["Soudage automatisé ABB et manutention robotisée","Usinage CNC aux tolérances répétables","Suivi d’usine intelligente connecté en 5G"]},{eb:"Qualité et essais",h:"Testé au-delà des normes",p:"Chaque ligne est validée selon les normes internationales de sécurité, feu et durabilité avant expédition, avec plus de 200 000 cycles.",li:["Essais de durabilité de plus de 200 000 cycles","Validation feu, sécurité et acoustique","Procédés certifiés ISO 9001, CE et UL"]}],rdEye:"Recherche et développement",rdA:"Six centres,",rdB:"mille brevets",rd:[{t:"Centres R&D",d:"Six centres dédiés à l’innovation des portes, serrures et systèmes de maison intelligente."},{t:"Brevets",d:"Plus de mille brevets en sécurité structurelle, biométrie et intégration IoT."},{t:"Groupe coté",d:"Première société du secteur cotée au marché principal de Shanghai en 2021, garantie de pérennité."}],ctaEye:"Partenariat OEM / ODM",ctaTitle:"Construisez votre marque sur nos usines",ctaSub:"Exploitez nos usines et plus de 1 000 brevets pour une gamme de sécurité conçue et produite par WONLY."},
 ru:{seoTitle:"Производство и НИОКР | WONLY",seoDescription:"WONLY: более 1 млн м² интегрированных умных заводов, роботизированные линии ABB, пять производственных баз, шесть центров НИОКР и более 1 000 патентов.",eye:"Производство и НИОКР",titleA:"Инженерия в масштабе.",titleB:"Создано надолго",intro:"Тридцать лет вертикально интегрированного производства в Юнкане: более миллиона м² умных заводов, роботизированные линии и шесть центров НИОКР.",stats:["Производственная площадь","Производственных баз","Центров НИОКР","Патентов","Дверей / замков в год"],story:[{eb:"Вертикальная интеграция",h:"Полный контроль под одной крышей",p:"Штамповка, покрытие, вспенивание и сборка выполняются на пяти собственных базах, поэтому качество и сроки остаются под нашим контролем.",li:["Собственные штамповка, ППУ, порошковая окраска и сборка","Пять интегрированных баз в Китае","6 млн дверей и 3 млн замков в год"]},{eb:"Роботизированная точность",h:"Автоматизация для экспортных проектов",p:"Сварочные ячейки ABB и роботизированная обработка обеспечивают повторяемые допуски международных проектов.",li:["Автоматическая сварка ABB и роботизированная обработка","CNC-обработка с точными допусками","Мониторинг умного завода по сети 5G"]},{eb:"Качество и испытания",h:"Испытано сверх стандарта",p:"Каждая линейка проверяется по международным нормам безопасности, огня и ресурса, включая более 200 000 циклов.",li:["Более 200 000 циклов на долговечность","Проверка огня, безопасности и акустики","Процессы ISO 9001, CE и UL"]}],rdEye:"Исследования и разработки",rdA:"Шесть центров,",rdB:"тысяча патентов",rd:[{t:"Центры НИОКР",d:"Шесть центров развивают двери, умные замки и комплексный умный дом."},{t:"Патенты",d:"Более тысячи патентов в конструкционной защите, биометрии и IoT."},{t:"Биржевая группа",d:"Первая компания сектора на основном рынке Шанхайской биржи с 2021 года — основа гарантий."}],ctaEye:"Партнёрство OEM / ODM",ctaTitle:"Создайте бренд на базе наших заводов",ctaSub:"Используйте умные заводы и более 1 000 патентов для собственной линейки, разработанной и произведённой WONLY."},
 es:{seoTitle:"Fabricación e I+D | WONLY",seoDescription:"WONLY: más de un millón de m² de fábricas integradas, líneas robotizadas ABB, cinco bases, seis centros de I+D y más de 1.000 patentes.",eye:"Fabricación e I+D",titleA:"Ingeniería a gran escala.",titleB:"Construido para durar",intro:"Treinta años de fabricación integrada en Yongkang: más de un millón de m² de fábricas inteligentes, líneas robotizadas y seis centros de I+D.",stats:["Superficie industrial","Bases de producción","Centros de I+D","Patentes","Puertas / cerraduras al año"],story:[{eb:"Integración vertical",h:"Todo bajo un mismo control",p:"Estampación, revestimiento, espuma y montaje se realizan en cinco bases propias para controlar calidad, uniformidad y plazos.",li:["Estampación, espuma PU, pintura en polvo y montaje internos","Cinco bases integradas en China","6 millones de puertas y 3 millones de cerraduras al año"]},{eb:"Precisión robotizada",h:"Automatización para proyectos internacionales",p:"Las celdas de soldadura ABB y la manipulación robotizada mantienen las tolerancias exigidas por proyectos internacionales.",li:["Soldadura automatizada ABB y manipulación robotizada","Mecanizado CNC de tolerancias repetibles","Supervisión de fábrica inteligente conectada por 5G"]},{eb:"Calidad y pruebas",h:"Ensayado más allá de la norma",p:"Cada línea se valida según normas internacionales de seguridad, fuego y durabilidad antes del envío, con más de 200.000 ciclos.",li:["Más de 200.000 ciclos de durabilidad","Validación de fuego, seguridad y acústica","Procesos certificados ISO 9001, CE y UL"]}],rdEye:"Investigación y desarrollo",rdA:"Seis centros,",rdB:"mil patentes",rd:[{t:"Centros de I+D",d:"Seis centros impulsan puertas, cerraduras y sistemas integrales de hogar inteligente."},{t:"Patentes",d:"Más de mil patentes de seguridad estructural, biometría e integración IoT."},{t:"Grupo cotizado",d:"Primera empresa del sector en el mercado principal de Shanghái desde 2021, respaldo de cada garantía."}],ctaEye:"Asociación OEM / ODM",ctaTitle:"Construya su marca sobre nuestras fábricas",ctaSub:"Aproveche nuestras fábricas y más de 1.000 patentes para una línea diseñada y fabricada por WONLY."}
};

export default function Manufacturing() {
  const {locale}=useLocale(); const copy=COPY[locale];
  const story=STORY.map((s,i)=>({...s,...copy?.story[i]})); const rd=RD.map((r,i)=>({...r,...copy?.rd[i]}));
  useSeo({
    title: copy?.seoTitle ?? "Manufacturing & R&D | WONLY",
    description: copy?.seoDescription ?? "WONLY manufacturing & R&D: 1,000,000+ m² of vertically integrated smart factories, ABB robotic lines, five production bases, six R&D centers and 1,000+ patents. SSE: 605268.",
    path: "/manufacturing-rd",
  });

  return (
    <div className="min-w-[320px] bg-[#F5F1EA] text-[#221F20]">
      <SiteHeader />

      {/* Hero */}
      <section className="relative min-h-[82vh] flex items-center overflow-hidden text-white px-[6vw] pt-[120px] pb-[80px]">
        <img className="absolute inset-0 w-full h-full object-cover" src={`${BASE}images/mfg-hero.jpg`} alt="WONLY smart factory" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(13,13,13,0.88) 0%,rgba(13,13,13,0.5) 48%,rgba(13,13,13,0.15) 100%)" }} />
        <Reveal className="relative z-10 max-w-[680px]">
          <div className={eyebrow} style={{ color: CHAMP }}>{copy?.eye ?? "Manufacturing & R&D"}</div>
          <h1 className="mt-4 font-light leading-[1.03] tracking-[-1.2px] text-[clamp(36px,5.2vw,68px)]">{copy?.titleA ?? "Engineered at Scale."}<br /><b className="font-semibold" style={{ color: CHAMP }}>{copy?.titleB ?? "Built to Last"}</b></h1>
          <p className="mt-5 max-w-[540px] text-[15px] leading-[1.75]" style={{ color: "rgba(245,241,234,0.82)" }}>
            {copy?.intro ?? "Thirty years of vertically integrated manufacturing from Yongkang, Zhejiang — over 1,000,000 m² of smart factories, robotic precision lines, and six R&D centers behind every door and lock we ship."}
          </p>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="px-[6vw] py-11" style={{ background: "#17140f" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-5 items-start">
          {STATS.map((s) => (
            <div key={s.l}>
              <div className="font-semibold leading-none tracking-[-0.5px] text-[clamp(19px,2vw,31px)] whitespace-nowrap" style={{ color: CHAMP }}>{s.n}</div>
              <div className="mt-2.5 text-[11px] tracking-[0.15em] uppercase leading-[1.3]" style={{ color: "rgba(245,241,234,0.6)" }}>{copy?.stats[STATS.indexOf(s)] ?? s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story sections */}
      {story.map((s, i) => (
        <section key={s.eb} className={i % 2 === 1 ? "bg-white" : ""}>
          <div className="max-w-[1200px] mx-auto px-[6vw] py-[86px]">
            <div className={`grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal className="rounded-2xl overflow-hidden h-[400px] shadow-[0_30px_60px_-40px_rgba(34,31,32,0.4)]">
                <img className="w-full h-full object-cover" src={`${BASE}images/${s.img}`} alt={s.h} loading="lazy" />
              </Reveal>
              <Reveal>
                <div className={eyebrow} style={{ color: GOLD }}>{s.eb}</div>
                <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.3px]">{s.h}</h3>
                <p className="mt-3.5 text-[15px] leading-[1.75] max-w-[460px]" style={{ color: MUTED }}>{s.p}</p>
                <ul className="mt-[18px] flex flex-col gap-2.5">
                  {s.li.map((x) => (
                    <li key={x} className="text-[14px] pl-[22px] relative" style={{ color: "#221F20" }}><span style={{ position: "absolute", left: 0, color: GOLD }}>—</span>{x}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* R&D */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-[6vw] py-[86px]">
          <Reveal>
            <div className={eyebrow} style={{ color: GOLD }}>{copy?.rdEye ?? "Research & Development"}</div>
            <h2 className="mt-3 font-light leading-[1.1] text-[clamp(28px,3.4vw,46px)]">{copy?.rdA ?? "Six Centers,"} <b className="font-semibold">{copy?.rdB ?? "One Thousand Patents"}</b></h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px] mt-[34px]">
            {rd.map((r, i) => (
              <Reveal key={r.t} delay={i * 100}>
                <div className="rounded-2xl p-[30px] h-full border" style={{ background: "#F5F1EA", borderColor: "#e4ddcf" }}>
                  <div className="text-[38px] font-semibold tracking-[-1px]" style={{ color: GOLD }}>{r.big}</div>
                  <div className="text-[16px] font-semibold mt-2">{r.t}</div>
                  <div className="text-[13.5px] mt-2 leading-[1.6]" style={{ color: MUTED }}>{r.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand eyebrowText={copy?.ctaEye ?? "OEM / ODM Partnership"} title={copy?.ctaTitle ?? "Build Your Brand on Our Factories"} sub={copy?.ctaSub ?? "Leverage our smart factories and 1,000+ patents through OEM / ODM — your own branded security line, engineered and produced by WONLY."} />
      <SiteFooter />
    </div>
  );
}
