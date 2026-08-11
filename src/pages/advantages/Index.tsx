import { SiteHeader, SiteFooter, CtaBand, GOLD, CHAMP, MUTED, BASE, eyebrow, Reveal } from "@/lib/site-ui";
import { useSeo } from "@/lib/seo";
import { useLocale, type Locale } from "@/lib/i18n";

const DOOR = {
  img: "hero-door.png", eb: "Why WONLY Door", h: "The Body Built to Defend",
  p: "The door is the fortress — a cast-aluminium shell over a honeycomb steel core, engineered to take fire, force and the harshest weather and keep standing, certified to the codes export projects demand.",
  li: [
    "Cast-aluminium shell over a honeycomb steel core — won't rust or warp",
    "EN 1634 — 90-minute fire integrity",
    "Grade-A forced-entry resistance · 16-bolt, 4-edge locking into the frame",
    "Hurricane-rated (Wind Class 12) · STC 35+ acoustic · 200,000-cycle tested",
  ],
};

const LOCK = {
  img: "lock-s80-render.webp", eb: "Why WONLY Lock", h: "The Brain That Knows You",
  p: "The lock is the intelligence — it recognises your family and opens as you approach, while a patented core and encrypted electronics defend against attack both physical and digital, and tie the entrance into your whole home.",
  li: [
    "3D face · fingerprint · palm-vein · RFID · App · PIN — plus hands-free approach unlock",
    "Patented cylindrical lock core — anti-drill, pick & bump, beyond top national grade",
    "Encrypted remote App control with pry & tamper alarms",
    "Integrates with WONLY whole-home smart control",
  ],
};

const AWARDS = [
  { f: "reddot.png", a: "Red Dot Design Award" },
  { f: "forbes.png", a: "Forbes" },
  { f: "if-design.png", a: "iF Design Award" },
  { f: "china-hardware-gold.png", a: "China Hardware Gold Award" },
];
const CERTS = ["iso", "ce", "ul", "saso", "rohs", "esg", "etl", "fsc", "iecee"];

type AdvantageCopy={seoTitle:string;seoDescription:string;eye:string;titleA:string;titleB:string;intro:string;door:typeof DOOR;genEye:string;genTitle:string;genBody:string;gens:{g:string;t:string;d:string}[];genNote:string;lock:typeof LOCK;innovation:string;recognised:string;certified:string;proof:string;awards:string;certs:string;ctaEye:string;ctaTitle:string;ctaSub:string};
const COPY:Partial<Record<Locale,AdvantageCopy>>={
 ar:{seoTitle:"مزايا أبواب الأمان والأقفال الذكية | WONLY",seoDescription:"لماذا WONLY: أبواب أمان من الألمنيوم المصبوب مقاومة للحريق وأقفال بيومترية وأكثر من 1,000 براءة، مع شهادات ISO وCE وUL وSASO وجوائز Red Dot وiF.",eye:"المزايا",titleA:"هندسة من أجل",titleB:"أداء متفوق",intro:"كل باب وقفل من WONLY مصمم ليتجاوز معايير الأمان والحريق والمتانة الدولية، ومدعوم بالشهادات والاختبارات والجوائز.",door:{...DOOR,eb:"لماذا باب WONLY",h:"هيكل مصمم للدفاع",p:"الباب هو الحصن: غلاف ألمنيوم مصبوب فوق قلب فولاذي بشكل خلية نحل، يتحمل الحريق والقوة والطقس القاسي وفق معايير مشاريع التصدير.",li:["غلاف ألمنيوم مصبوب وقلب فولاذي لا يصدأ أو يتشوه","سلامة حريق EN 1634 لمدة 90 دقيقة","مقاومة اقتحام فئة A وقفل بـ16 مزلاجاً على أربع حواف","مقاومة رياح فئة 12 وعزل STC 35+ واختبار 200,000 دورة"]},genEye:"أجيال الباب الذكي",genTitle:"لماذا لا تكشف الفئة A القصة كاملة",genBody:"بعد تحديث معيار أبواب الأمان، أصبحت أبواب كثيرة تحمل أعلى درجة على الورق مع فروق كبيرة في الواقع. تعتمد WONLY أجيالاً من الذكاء فوق قلب معتمد من الفئة A، لتتنوع المجموعة دون خفض الأمان.",gens:[{g:"الجيل 1",t:"الأساس",d:"أمان فئة A وقفل ميكانيكي ذاتي للفئة الاقتصادية الموثوقة."},{g:"الجيل 2–3",t:"ذكي",d:"قفل مدمج وقياسات حيوية وشاشة HD ومراقبة فورمالديهايد وطاقة مزدوجة."},{g:"الجيل 5",t:"روبوتي — X70",d:"فتح وإغلاق تلقائي واستشعار بعيد ومنع انحشار ومراقبة محيط ورسائل صوتية."}],genNote:"أخبرنا بمستوى سوقك لنساعدك في بناء مجموعة تغطي الأجيال، مع أمان معتمد واختلاف حقيقي في الذكاء.",lock:{...LOCK,eb:"لماذا قفل WONLY",h:"عقل يتعرف عليك",p:"القفل هو الذكاء: يتعرف على عائلتك ويفتح عند الاقتراب، بينما يحمي القلب الحاصل على براءة والتشفير من الهجمات المادية والرقمية ويربط المدخل بالمنزل.",li:["وجه 3D وبصمة وأوردة كف وRFID وتطبيق وPIN وفتح عند الاقتراب","قلب أسطواني حاصل على براءة ومقاوم للحفر والفتح والصدمات","تحكم مشفر بالتطبيق وتنبيهات خلع وعبث","تكامل مع نظام WONLY للمنزل الذكي"]},innovation:"الابتكار والشهادات",recognised:"معترف به.",certified:"معتمد وحائز جوائز.",proof:"أكثر من 1,000 براءة وجوائز تصميم دولية وشهادات وفق متطلبات المشاريع العالمية.",awards:"جوائز التصميم",certs:"الشهادات",ctaEye:"شاهد الفرق",ctaTitle:"اطلب المواصفات ووثائق المطابقة وتقارير الاختبار",ctaSub:"يشارك فريقنا وثائق الشهادات والمواصفات التقنية الكاملة خلال 24 ساعة."},
 fr:{seoTitle:"Avantages des portes de sécurité et serrures intelligentes | WONLY",seoDescription:"Pourquoi WONLY : portes coupe-feu en aluminium moulé, serrures biométriques et plus de 1 000 brevets, certifications ISO, CE, UL, SASO et prix Red Dot et iF.",eye:"Avantages",titleA:"Conçu pour",titleB:"surpasser",intro:"Chaque porte et serrure WONLY dépasse les normes internationales de sécurité, feu et durabilité, avec certifications, essais et prix à l’appui.",door:{...DOOR,eb:"Pourquoi une porte WONLY",h:"Une structure conçue pour défendre",p:"La porte est une forteresse : coque en aluminium moulé sur âme acier alvéolaire, conçue contre feu, force et intempéries selon les codes export.",li:["Aluminium moulé et âme acier alvéolaire, sans rouille ni déformation","Intégrité feu EN 1634 de 90 minutes","Classe A et 16 pênes verrouillés sur quatre côtés","Vent classe 12, acoustique STC 35+ et 200 000 cycles"]},genEye:"Les générations de portes intelligentes",genTitle:"Pourquoi la classe A ne dit pas tout",genBody:"Depuis la mise à jour de la norme, beaucoup de portes obtiennent la classe maximale sur le papier malgré d’importants écarts. WONLY ajoute des générations d’intelligence à une base classe A certifiée.",gens:[{g:"Gén. 1",t:"Fondation",d:"Classe A certifiée et auto-verrouillage mécanique pour une offre fiable."},{g:"Gén. 2–3",t:"Intelligente",d:"Serrure intégrée, biométrie, écran HD, capteur de formaldéhyde et double alimentation."},{g:"Gén. 5",t:"Robotisée — X70",d:"Ouverture automatique, détection à distance, anti-pincement, périmètre et messages vocaux."}],genNote:"Présentez votre marché : nous vous aidons à construire une gamme multigénération, toujours certifiée, différenciée par l’intelligence.",lock:{...LOCK,eb:"Pourquoi une serrure WONLY",h:"L’intelligence qui vous reconnaît",p:"La serrure reconnaît la famille et s’ouvre à l’approche ; cœur breveté et électronique chiffrée protègent des attaques physiques et numériques.",li:["Visage 3D, empreinte, veines de paume, RFID, application, PIN et approche mains libres","Cœur cylindrique breveté anti-perçage, crochetage et bumping","Application chiffrée avec alarmes d’arrachement et sabotage","Intégration à la maison intelligente WONLY"]},innovation:"Innovation et certifications",recognised:"Reconnue.",certified:"Certifiée. Récompensée.",proof:"Plus de 1 000 brevets, des jurys internationaux et les certifications exigées par les projets mondiaux.",awards:"Prix de design",certs:"Certifications",ctaEye:"Voyez la différence",ctaTitle:"Demandez spécifications, conformité et essais",ctaSub:"Notre équipe fournit les certificats et spécifications complets sous 24 heures."},
 ru:{seoTitle:"Преимущества защитных дверей и умных замков | WONLY",seoDescription:"Почему WONLY: огнестойкие двери из литого алюминия, биометрические замки, более 1 000 патентов, сертификаты ISO, CE, UL, SASO и награды Red Dot и iF.",eye:"Преимущества",titleA:"Спроектировано, чтобы",titleB:"превосходить",intro:"Каждая дверь и замок WONLY превосходят международные нормы безопасности, огня и ресурса, что подтверждают сертификаты, испытания и награды.",door:{...DOOR,eb:"Почему двери WONLY",h:"Корпус, созданный для защиты",p:"Дверь — это крепость: литая алюминиевая оболочка и стальной сотовый сердечник выдерживают огонь, взлом и суровую погоду по экспортным нормам.",li:["Литой алюминий и стальной сотовый сердечник без коррозии и деформации","EN 1634 — 90 минут огнестойкости","Класс A и 16 ригелей по четырём сторонам","Ветер класса 12, STC 35+ и 200 000 циклов"]},genEye:"Поколения умных дверей",genTitle:"Почему класс A — ещё не вся история",genBody:"После обновления стандарта многие двери формально получили высший класс, хотя различия огромны. WONLY развивает поколения интеллекта поверх неизменно сертифицированного ядра класса A.",gens:[{g:"Поколение 1",t:"Основа",d:"Класс A и механическое самозапирание — надёжный базовый уровень."},{g:"Поколения 2–3",t:"Умная",d:"Встроенный замок, биометрия, HD-экран, контроль формальдегида и двойное питание."},{g:"Поколение 5",t:"Роботизированная — X70",d:"Автооткрытие, дальние датчики, защита от защемления, периметр и голосовые сообщения."}],genNote:"Расскажите о рынке, и мы поможем сформировать линейку разных поколений без компромисса в сертифицированной защите.",lock:{...LOCK,eb:"Почему замки WONLY",h:"Интеллект, который вас знает",p:"Замок узнаёт семью и открывается при приближении, а патентованный сердечник и шифрование защищают от физических и цифровых атак.",li:["3D-лицо, отпечаток, вены ладони, RFID, приложение, PIN и вход без рук","Патентованный цилиндрический сердечник против сверления, отмычек и бампинга","Зашифрованное приложение и тревоги вмешательства","Интеграция с умным домом WONLY"]},innovation:"Инновации и сертификаты",recognised:"Признано.",certified:"Сертифицировано. Награждено.",proof:"Более 1 000 патентов, международные награды и сертификаты для глобальных проектов.",awards:"Награды за дизайн",certs:"Сертификаты",ctaEye:"Увидьте разницу",ctaTitle:"Запросите параметры, сертификаты и испытания",ctaSub:"Мы предоставим полные документы и технические характеристики в течение 24 часов."},
 es:{seoTitle:"Ventajas de puertas de seguridad y cerraduras inteligentes | WONLY",seoDescription:"Por qué WONLY: puertas cortafuego de aluminio fundido, cerraduras biométricas y más de 1.000 patentes, con ISO, CE, UL, SASO y premios Red Dot e iF.",eye:"Ventajas",titleA:"Diseñado para",titleB:"superar",intro:"Cada puerta y cerradura WONLY supera normas internacionales de seguridad, fuego y durabilidad, respaldada por certificados, pruebas y premios.",door:{...DOOR,eb:"Por qué una puerta WONLY",h:"El cuerpo creado para defender",p:"La puerta es una fortaleza: aluminio fundido sobre núcleo de acero alveolar, diseñada contra fuego, fuerza y clima conforme a códigos internacionales.",li:["Aluminio fundido y núcleo de acero que no se oxida ni deforma","Integridad al fuego EN 1634 de 90 minutos","Clase A y cierre de 16 pernos en cuatro bordes","Viento clase 12, acústica STC 35+ y 200.000 ciclos"]},genEye:"Generaciones de puertas inteligentes",genTitle:"Por qué la clase A no lo cuenta todo",genBody:"Tras actualizarse la norma, muchas puertas califican como grado máximo sobre el papel aunque las diferencias sean enormes. WONLY añade generaciones de inteligencia sobre el mismo núcleo clase A.",gens:[{g:"Gen. 1",t:"Base",d:"Seguridad clase A y cierre mecánico automático para un nivel fiable."},{g:"Gen. 2–3",t:"Inteligente",d:"Cerradura integrada, biometría, pantalla HD, control de formaldehído y doble alimentación."},{g:"Gen. 5",t:"Robotizada — X70",d:"Apertura automática, detección remota, antipinzamiento, perímetro y mensajes de voz."}],genNote:"Cuéntenos su mercado y le ayudaremos a crear una gama multigeneracional, siempre certificada y diferenciada por inteligencia.",lock:{...LOCK,eb:"Por qué una cerradura WONLY",h:"El cerebro que le reconoce",p:"La cerradura reconoce a la familia y abre al acercarse; su núcleo patentado y electrónica cifrada protegen contra ataques físicos y digitales.",li:["Rostro 3D, huella, vena de palma, RFID, aplicación, PIN y apertura por aproximación","Núcleo cilíndrico patentado contra perforación, ganzúa y bumping","Aplicación cifrada con alarmas de palanca y sabotaje","Integración con hogar inteligente WONLY"]},innovation:"Innovación y certificaciones",recognised:"Reconocida.",certified:"Certificada. Premiada.",proof:"Más de 1.000 patentes, premios internacionales y certificaciones para proyectos globales.",awards:"Premios de diseño",certs:"Certificaciones",ctaEye:"Vea la diferencia",ctaTitle:"Solicite especificaciones, conformidad y ensayos",ctaSub:"Nuestro equipo comparte certificados y especificaciones completos en 24 horas."}
};

function Split({ d, rev }: { d: typeof DOOR; rev?: boolean }) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-14 items-center ${rev ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <Reveal className="rounded-2xl overflow-hidden h-[440px] flex items-center justify-center" style={{ background: "#eceae4" }}>
        <img className="max-h-full max-w-full object-contain p-6" src={`${BASE}images/${d.img}`} alt={d.h} loading="lazy" />
      </Reveal>
      <Reveal>
        <div className={eyebrow} style={{ color: GOLD }}>{d.eb}</div>
        <h3 className="mt-3 font-light leading-[1.1] text-[clamp(26px,3vw,40px)]">{d.h}</h3>
        <p className="mt-4 text-[15px] leading-[1.75] max-w-[480px]" style={{ color: MUTED }}>{d.p}</p>
        <ul className="mt-6 flex flex-col gap-3">
          {d.li.map((x) => (
            <li key={x} className="text-[14.5px] pl-[24px] relative"><span style={{ position: "absolute", left: 0, color: GOLD, fontWeight: 700 }}>✓</span>{x}</li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

export default function Advantages() {
  const {locale}=useLocale(); const copy=COPY[locale];
  const gens=copy?.gens ?? [{g:"Gen 1",t:"Foundation",d:"Certified Class-A security with mechanical self-locking. The dependable value tier — never below the top security grade."},{g:"Gen 2–3",t:"Smart",d:"Embedded smart lock, biometric access, 10.1\" HD display, formaldehyde sentinel and dual power. The door becomes intelligent."},{g:"Gen 5",t:"Robotic — Flagship X70",d:"The door opens and closes for you: remote-sensing auto entry, anti-pinch, perimeter monitoring and voice messaging."}];
  useSeo({
    title: copy?.seoTitle ?? "Advantages | WONLY",
    description: copy?.seoDescription ?? "Why WONLY: fire-rated cast-aluminium security doors, biometric smart locks, and 1,000+ patents — certified by ISO, CE, UL, SASO and honoured with Red Dot & iF Design awards.",
    path: "/advantages",
  });

  return (
    <div className="min-w-[320px] bg-[#F5F1EA] text-[#221F20]">
      <SiteHeader />

      {/* Hero */}
      <section className="text-white px-[6vw] pt-[150px] pb-[90px]" style={{ background: "radial-gradient(120% 100% at 78% 15%, #2a2627 0%, #0d0d0d 72%)" }}>
        <Reveal className="max-w-[1200px] mx-auto">
          <div className={eyebrow} style={{ color: CHAMP }}>{copy?.eye ?? "Advantages"}</div>
          <h1 className="mt-4 font-light leading-[1.05] tracking-[-1px] text-[clamp(34px,5vw,64px)]">{copy?.titleA ?? "Engineered to"} <span style={{ color: CHAMP }}>{copy?.titleB ?? "Outperform"}</span></h1>
          <p className="mt-5 max-w-[560px] text-[15px] leading-[1.75]" style={{ color: "rgba(245,241,234,0.72)" }}>
            {copy?.intro ?? "Every WONLY door and lock is built to exceed international security, fire and durability standards — and certified, tested and awarded to prove it."}
          </p>
        </Reveal>
      </section>

      {/* Why Door */}
      <section id="why-wonly-door" className="scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-[6vw] py-[86px]"><Split d={copy?.door ?? DOOR} /></div>
      </section>

      {/* Generations of the smart door — why "Class A" alone doesn't tell the whole story */}
      <section id="door-generations" className="bg-white scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-[6vw] py-[86px]">
          <Reveal>
            <div className={eyebrow} style={{ color: GOLD }}>{copy?.genEye ?? "The Smart-Door Generations"}</div>
            <h3 className="mt-3 font-light leading-[1.1] text-[clamp(26px,3vw,40px)]">{copy?.genTitle ?? "Why Class A Doesn't Tell the Whole Story"}</h3>
            <p className="mt-4 text-[15px] leading-[1.75] max-w-[560px]" style={{ color: MUTED }}>
              {copy?.genBody ?? "Since the security-door standard was updated, most doors qualify as the top grade on paper — yet the gap between them is enormous. WONLY thinks in generations of the smart door, not just grades."}
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {gens.map((x, i) => (
              <Reveal key={x.t} delay={i * 90}>
                <div className="h-full rounded-2xl p-7 border" style={{ background: "#F5F1EA", borderColor: "#e9e2d4" }}>
                  <div className="text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: GOLD }}>{x.g}</div>
                  <h4 className="mt-2 text-lg font-medium" style={{ color: "#221F20" }}>{x.t}</h4>
                  <p className="mt-2.5 text-sm leading-relaxed" style={{ color: MUTED }}>{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-[13px] leading-[1.7] max-w-[620px]" style={{ color: MUTED }}>
            {copy?.genNote ?? "Talk to us about where your market sits and we'll help you build a range that spans the generations — every model certified and differentiated by intelligence."}
          </p>
        </div>
      </section>

      {/* Why Lock */}
      <section id="why-wonly-lock" className="scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-[6vw] py-[86px]"><Split d={copy?.lock ?? LOCK} rev /></div>
      </section>

      {/* Innovation & Certifications */}
      <section id="innovation-certifications" className="bg-white scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-[6vw] py-[86px]">
          <Reveal className="text-center">
            <div className={eyebrow} style={{ color: GOLD }}>{copy?.innovation ?? "Innovation & Certifications"}</div>
            <h2 className="mt-3 font-light leading-[1.1] text-[clamp(28px,3.4vw,46px)]">{copy?.recognised ?? "Recognised."} <b className="font-semibold">{copy?.certified ?? "Certified. Awarded."}</b></h2>
            <p className="mt-4 max-w-[560px] mx-auto text-[15px] leading-[1.7]" style={{ color: MUTED }}>{copy?.proof ?? "Backed by 1,000+ patents, honoured by international design juries, and certified to the standards global projects require."}</p>
          </Reveal>

          <Reveal className="mt-12">
            <div className="text-center text-[11px] tracking-[0.28em] uppercase font-semibold mb-6" style={{ color: MUTED }}>{copy?.awards ?? "Design Awards"}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[860px] mx-auto">
              {AWARDS.map((a) => (
                <div key={a.f} className="bg-white border rounded-xl h-[92px] flex items-center justify-center p-5" style={{ borderColor: "#e9e2d4" }}>
                  <img className="max-h-[48px] max-w-full object-contain" src={`${BASE}images/awards/${a.f}`} alt={a.a} loading="lazy" />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <div className="text-center text-[11px] tracking-[0.28em] uppercase font-semibold mb-6" style={{ color: MUTED }}>{copy?.certs ?? "Certifications"}</div>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 max-w-[1000px] mx-auto">
              {CERTS.map((c) => (
                <div key={c} className="bg-white border rounded-xl h-[80px] flex items-center justify-center p-4" style={{ borderColor: "#e9e2d4" }}>
                  <img className="max-h-[44px] max-w-full object-contain" src={`${BASE}images/certs/${c}.png`} alt={`${c.toUpperCase()} certification`} loading="lazy" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand eyebrowText={copy?.ctaEye ?? "See the Difference"} title={copy?.ctaTitle ?? "Request Specs, Compliance & Test Reports"} sub={copy?.ctaSub ?? "Our team shares full certification documents and technical specifications within 24 hours."} />
      <SiteFooter />
    </div>
  );
}
