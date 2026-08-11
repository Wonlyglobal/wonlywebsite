import { Link } from "react-router-dom";
import { Radar, Fingerprint, Smartphone, ShieldAlert, BatteryCharging, Bell, ArrowRight, Check, ScanFace, DoorOpen, Home, Building2, Hotel, KeyRound } from "lucide-react";
import { useSeo, SITE_URL } from "@/lib/seo";
import { useLocale, type Locale } from "@/lib/i18n";
import { GOLD, CHAMP, SILVER, CHAMP_BG, DARK, MUTED, BASE, eyebrow, h2cls, Reveal, SiteHeader, SiteFooter, CtaBand } from "@/lib/site-ui";

const IMG = {
  lock: `${BASE}images/lock-s80.webp`,
  render: `${BASE}images/lock-s80-render.webp`,
  band: `${BASE}images/factory-abb.webp`,
};

const HIGHLIGHTS = [
  "Hands-free entry the moment you arrive",
  "Enterprise-grade encryption end to end",
  "Silent, weather-sealed for -25 °C to 70 °C",
];

const STEPS = [
  { icon: Radar, n: "01", t: "Sense", d: "Millimetre-wave radar detects your approach from up to two metres and wakes the lock — no button, no reach for a handle." },
  { icon: ScanFace, n: "02", t: "Verify", d: "3D structured-light face and capacitive fingerprint confirm you in under a second, with liveness checks that reject photos and masks." },
  { icon: DoorOpen, n: "03", t: "Enter", d: "The silent motorised bolt retracts and the door is open the instant you reach it — arms full of groceries, no problem." },
];

const FEATURES = [
  { icon: Radar, t: "True Long-Range Sensing", d: "Detects your approach from a distance and unlocks hands-free — the difference between a smart lock and a truly automatic one." },
  { icon: Fingerprint, t: "Multi-Biometric Entry", d: "Fingerprint, face and PIN in one unit, with anti-spoofing algorithms trained on millions of samples." },
  { icon: Smartphone, t: "App & Remote Control", d: "Grant, schedule and revoke access from anywhere; real-time entry logs and one-time guest passes." },
  { icon: ShieldAlert, t: "Tamper-Proof Architecture", d: "Pry, drill and mute-attack detection with instant push alerts and an auto-lock defense mode." },
  { icon: BatteryCharging, t: "12-Month Battery", d: "Ultra-low-power sensing runs up to a year per charge, with USB-C emergency power on the base." },
  { icon: Bell, t: "Smart-Home Ready", d: "Integrates with WONLY whole-house intelligence and major ecosystems for scenes and voice control." },
];

const DESIGN = [
  "Full-height tempered-glass touch fascia",
  "Silent motorised deadbolt drive",
  "Cast-aluminum body, anti-corrosion finish",
  "One-touch interior quick-exit",
];

const SCENARIOS = [
  { icon: Home, t: "Homes & Apartments", d: "Effortless daily entry for the whole family, with guest passes and a full entry history in the app." },
  { icon: Building2, t: "Villas & Estates", d: "Pairs with WONLY security doors and whole-house intelligence for one seamless, coordinated system." },
  { icon: Hotel, t: "Rentals & Short-Let", d: "Issue time-limited codes remotely and revoke them instantly at checkout — no key handovers." },
  { icon: KeyRound, t: "Offices & Commercial", d: "Role-based access, audit logs and alarm integration for controlled, accountable entrances." },
];

const SPECS: [string, string][] = [
  ["Unlocking", "Long-range sensing · Fingerprint · Face · PIN · App · Card · Key"],
  ["Sensor", "3D structured-light face + capacitive fingerprint"],
  ["Material", "Cast-aluminum alloy body, anti-corrosion finish"],
  ["Connectivity", "Wi-Fi + Bluetooth 5.0"],
  ["Power", "Rechargeable Li-ion, ~12 months / charge, USB-C backup"],
  ["Alarms", "Pry / drill / mute-attack / low-battery push alerts"],
  ["Compatibility", "Doors 38–120 mm thick, standard mortise"],
  ["Certification", "CE · FCC · RoHS · national smart-lock standard"],
];

type Copy = { text: Record<string, string>; highlights: string[]; steps: { t: string; d: string }[]; features: { t: string; d: string }[]; design: string[]; scenarios: { t: string; d: string }[]; specs: string[] };
const COPY: Partial<Record<Locale, Copy>> = {
  ar: { text: { seoTitle: "قفل WONLY S80 الذكي بالاستشعار الحقيقي | دخول بيومتري دون لمس", seoDescription: "قفل WONLY S80 باستشعار بعيد المدى ودخول متعدد القياسات الحيوية وتحكم بالتطبيق وهيكل مقاوم للعبث من مصنّع مدرج في بورصة شنغهاي.", eyebrow: "أقفال ذكية · الطراز الرائد", sensing: "استشعار حقيقي", hero: "اقترب وادخل. يستشعر S80 وصولك ويفتح دون استخدام اليدين، مع قياسات حيوية وتحكم بالتطبيق وحماية من العبث.", quote: "اطلب عرض سعر", view: "عرض المواصفات", how: "طريقة العمل", steps: "ثلاث خطوات في أقل من ثانيتين", engineered: "هندسة متكاملة", security: "أمان يعمل من دون أن تفكر فيه", design: "التصميم", angle: "مدروس من كل زاوية", designBody: "واجهة كاملة من الزجاج المقسّى تخفي الكاميرا ومستشعر الوجه ولوحة المفاتيح حتى تحتاج إليها. وتجمع اللوحة الداخلية الخروج بلمسة واحدة والتحكم بالصوت والتجاوز اليدوي في هيكل ألمنيوم مصبوب مقاوم للتآكل.", precision: "هندسة دقيقة", vault: "مصنوع وفق معايير أبواب الخزائن لدينا", fits: "مجالات الاستخدام", every: "قفل واحد لكل أنواع الأبواب", tech: "المواصفات التقنية", full: "كل التفاصيل", note: "المواصفات إرشادية وقد تختلف حسب السوق والتكوين.", order: "الطلب وOEM", cta: "قدّم S80 إلى سوقك", ctaSub: "اطلب الأسعار أو العينات أو تكوينات OEM/ODM؛ يرد فريقنا خلال 24 ساعة." }, highlights: ["دخول دون استخدام اليدين فور وصولك", "تشفير مؤسسي متكامل من طرف إلى طرف", "تشغيل صامت ومحكم ضد الطقس من ‎-25 إلى 70°م"], steps: [{t:"الاستشعار",d:"يكتشف رادار الموجات المليمترية اقترابك من مسافة مترين ويوقظ القفل دون زر أو لمس المقبض."},{t:"التحقق",d:"يتحقق الوجه ثلاثي الأبعاد وبصمة الإصبع خلال أقل من ثانية، مع كشف الحيوية لرفض الصور والأقنعة."},{t:"الدخول",d:"يتراجع المزلاج الآلي الصامت فور وصولك إلى الباب، حتى عندما تكون يداك مشغولتين."}], features: [{t:"استشعار حقيقي بعيد المدى",d:"يكتشف اقترابك ويفتح تلقائياً دون استخدام اليدين."},{t:"دخول متعدد القياسات الحيوية",d:"بصمة ووجه ورمز PIN مع خوارزميات مقاومة الانتحال."},{t:"التطبيق والتحكم عن بعد",d:"امنح الوصول وجدوله وألغِه مع سجلات فورية ورموز ضيوف."},{t:"بنية مقاومة للعبث",d:"كشف الخلع والحفر وكتم الإنذار مع تنبيهات فورية وقفل دفاعي."},{t:"بطارية 12 شهراً",d:"استشعار منخفض الطاقة وشحن طوارئ USB-C."},{t:"جاهز للمنزل الذكي",d:"يتكامل مع منظومة WONLY والمنصات الرئيسية للمشاهد والصوت."}], design:["واجهة لمس كاملة من الزجاج المقسّى","مزلاج آلي صامت","هيكل ألمنيوم مصبوب مقاوم للتآكل","خروج داخلي سريع بلمسة واحدة"], scenarios:[{t:"المنازل والشقق",d:"دخول يومي مريح للعائلة مع تصاريح ضيوف وسجل كامل."},{t:"الفلل والقصور",d:"يتكامل مع أبواب WONLY الأمنية ونظام المنزل الذكي."},{t:"الإيجار قصير المدة",d:"رموز محددة المدة تصدر وتلغى عن بعد دون تسليم مفاتيح."},{t:"المكاتب والمنشآت",d:"صلاحيات حسب الدور وسجلات تدقيق وربط بالإنذار."}], specs:["طرق الفتح","المستشعر","المادة","الاتصال","الطاقة","الإنذارات","التوافق","الشهادات"] },
  fr: { text: { seoTitle:"Serrure intelligente WONLY S80 à détection réelle | Accès biométrique mains libres",seoDescription:"Serrure WONLY S80 avec détection longue portée, accès multibiométrique, application et architecture anti-sabotage, conçue par un fabricant coté.",eyebrow:"Serrures intelligentes · Modèle phare",sensing:"Détection réelle",hero:"Approchez et entrez. La S80 détecte votre arrivée et déverrouille sans les mains, avec biométrie, application et protection anti-sabotage.",quote:"Demander un devis",view:"Voir les spécifications",how:"Fonctionnement",steps:"Trois étapes. Moins de deux secondes",engineered:"Intégré dès la conception",security:"Une sécurité à laquelle vous n’avez pas à penser",design:"Design",angle:"Pensée sous tous les angles",designBody:"La façade en verre trempé dissimule caméra, capteur facial et clavier rétroéclairé jusqu’à leur utilisation. Le panneau intérieur réunit sortie rapide, volume et déverrouillage manuel dans un corps en aluminium moulé anticorrosion.",precision:"Ingénierie de précision",vault:"Fabriquée selon les mêmes exigences que nos portes de chambre forte",fits:"Applications",every:"Une serrure pour chaque type de porte",tech:"Spécifications techniques",full:"Tous les détails",note:"Spécifications indicatives, susceptibles de varier selon le marché et la configuration.",order:"Commande et OEM",cta:"Lancez la S80 sur votre marché",ctaSub:"Demandez prix, échantillons ou configurations OEM/ODM ; réponse sous 24 heures."}, highlights:["Entrée mains libres dès votre arrivée","Chiffrement de niveau entreprise de bout en bout","Silencieuse et étanche de -25 °C à 70 °C"], steps:[{t:"Détecter",d:"Le radar millimétrique détecte votre approche jusqu’à deux mètres et réveille la serrure, sans bouton ni poignée."},{t:"Vérifier",d:"Le visage 3D et l’empreinte confirment votre identité en moins d’une seconde avec détection du vivant."},{t:"Entrer",d:"Le pêne motorisé silencieux se rétracte dès votre arrivée, même lorsque vos mains sont occupées."}], features:[{t:"Détection réelle longue portée",d:"Détecte l’approche et déverrouille automatiquement sans les mains."},{t:"Accès multibiométrique",d:"Empreinte, visage et code PIN avec algorithmes anti-usurpation."},{t:"Application et contrôle distant",d:"Accès programmables, révocables, journaux en temps réel et codes invités."},{t:"Architecture anti-sabotage",d:"Détection du levier, perçage et neutralisation avec alertes immédiates."},{t:"Autonomie de 12 mois",d:"Détection basse consommation et alimentation de secours USB-C."},{t:"Compatible maison intelligente",d:"Intégration WONLY et grands écosystèmes pour scènes et commande vocale."}],design:["Façade tactile en verre trempé pleine hauteur","Pêne motorisé silencieux","Corps en aluminium moulé anticorrosion","Sortie intérieure rapide en une touche"],scenarios:[{t:"Maisons et appartements",d:"Accès familial simple, passes invités et historique complet."},{t:"Villas et propriétés",d:"S’associe aux portes de sécurité et à l’écosystème WONLY."},{t:"Locations courte durée",d:"Codes temporaires créés et révoqués à distance, sans remise de clé."},{t:"Bureaux et commerces",d:"Accès par rôle, journaux d’audit et intégration d’alarme."}],specs:["Déverrouillage","Capteur","Matériau","Connectivité","Alimentation","Alarmes","Compatibilité","Certification"] },
  ru: { text: { seoTitle:"Умный замок WONLY S80 с точным обнаружением | Биометрический доступ",seoDescription:"WONLY S80: дальнее обнаружение, мультибиометрический доступ, приложение и защищённая от вмешательства конструкция от биржевого производителя.",eyebrow:"Умные замки · Флагман",sensing:"Точное обнаружение",hero:"Подойдите и войдите. S80 замечает ваше приближение и открывается без рук — биометрия, приложение и защита от вмешательства.",quote:"Запросить цену",view:"Характеристики",how:"Как это работает",steps:"Три шага. Менее двух секунд",engineered:"Заложено конструкцией",security:"Безопасность, о которой не нужно думать",design:"Дизайн",angle:"Продуман со всех сторон",designBody:"Полноразмерная панель из закалённого стекла скрывает камеру, датчик лица и клавиатуру до момента использования. Внутренняя панель объединяет быстрый выход, громкость и ручное открывание в литом антикоррозийном корпусе.",precision:"Точная инженерия",vault:"Изготовлен по стандартам наших дверей для хранилищ",fits:"Применение",every:"Один замок для любых дверей",tech:"Технические характеристики",full:"Все подробности",note:"Характеристики ориентировочные и могут различаться по рынкам и конфигурациям.",order:"Заказ и OEM",cta:"Представьте S80 на своём рынке",ctaSub:"Запросите цены, образцы или OEM/ODM-конфигурации — ответим за 24 часа."},highlights:["Вход без рук сразу при приближении","Сквозное шифрование корпоративного уровня","Тихая защищённая работа от −25 до 70 °C"],steps:[{t:"Обнаружение",d:"Миллиметровый радар замечает приближение с двух метров и активирует замок без кнопок."},{t:"Проверка",d:"3D-распознавание лица и отпечаток подтверждают личность менее чем за секунду с проверкой живого присутствия."},{t:"Вход",d:"Тихий моторизованный ригель убирается к моменту подхода, даже если руки заняты."}],features:[{t:"Дальнее точное обнаружение",d:"Распознаёт приближение и автоматически открывает дверь без рук."},{t:"Мультибиометрический доступ",d:"Отпечаток, лицо и PIN с алгоритмами защиты от подделки."},{t:"Приложение и удалённый контроль",d:"Выдача, расписание и отзыв доступа, журнал и гостевые коды."},{t:"Защита от вмешательства",d:"Обнаружение взлома, сверления и глушения с мгновенными уведомлениями."},{t:"Батарея на 12 месяцев",d:"Низкое энергопотребление и аварийное питание USB-C."},{t:"Готов к умному дому",d:"Интеграция с WONLY и основными экосистемами, сценариями и голосом."}],design:["Сенсорная панель из закалённого стекла","Тихий моторизованный ригель","Литой алюминиевый корпус с защитой от коррозии","Быстрый выход изнутри одним касанием"],scenarios:[{t:"Дома и квартиры",d:"Удобный семейный доступ, гостевые пропуска и полная история."},{t:"Виллы и усадьбы",d:"Единая система с защитными дверями и умным домом WONLY."},{t:"Краткосрочная аренда",d:"Временные коды выдаются и отзываются удалённо без ключей."},{t:"Офисы и коммерция",d:"Ролевой доступ, аудит и интеграция с сигнализацией."}],specs:["Способы открытия","Датчик","Материал","Связь","Питание","Сигнализация","Совместимость","Сертификация"] },
  es: { text: { seoTitle:"Cerradura inteligente WONLY S80 con detección real | Acceso biométrico",seoDescription:"WONLY S80 con detección de largo alcance, acceso multibiométrico, aplicación y arquitectura antisabotaje de un fabricante cotizado.",eyebrow:"Cerraduras inteligentes · Insignia",sensing:"Detección real",hero:"Acérquese y entre. La S80 detecta su llegada y abre sin manos, con biometría, aplicación y protección antisabotaje.",quote:"Solicitar cotización",view:"Ver especificaciones",how:"Cómo funciona",steps:"Tres pasos. Menos de dos segundos",engineered:"Diseñada desde dentro",security:"Seguridad en la que no tiene que pensar",design:"Diseño",angle:"Pensada desde todos los ángulos",designBody:"La fachada de vidrio templado oculta cámara, sensor facial y teclado hasta que los necesita. El panel interior integra salida rápida, volumen y apertura manual en un cuerpo de aluminio fundido resistente a la corrosión.",precision:"Ingeniería de precisión",vault:"Fabricada con el mismo estándar que nuestras puertas de bóveda",fits:"Aplicaciones",every:"Una cerradura para cada tipo de puerta",tech:"Especificaciones técnicas",full:"Todos los detalles",note:"Las especificaciones son orientativas y pueden variar según mercado y configuración.",order:"Pedidos y OEM",cta:"Lleve la S80 a su mercado",ctaSub:"Solicite precios, muestras o configuraciones OEM/ODM; respondemos en 24 horas."},highlights:["Entrada sin manos al llegar","Cifrado empresarial de extremo a extremo","Silenciosa y sellada de -25 °C a 70 °C"],steps:[{t:"Detectar",d:"El radar milimétrico detecta la aproximación hasta dos metros y activa la cerradura sin botones."},{t:"Verificar",d:"El rostro 3D y la huella confirman en menos de un segundo con prueba de vida contra fotos y máscaras."},{t:"Entrar",d:"El cerrojo motorizado silencioso se retrae al llegar, incluso con las manos ocupadas."}],features:[{t:"Detección real de largo alcance",d:"Detecta la aproximación y abre automáticamente sin manos."},{t:"Acceso multibiométrico",d:"Huella, rostro y PIN con algoritmos contra suplantación."},{t:"Aplicación y control remoto",d:"Conceda, programe y revoque accesos con registros y pases temporales."},{t:"Arquitectura antisabotaje",d:"Detecta palanca, perforación y silenciamiento con alertas inmediatas."},{t:"Batería de 12 meses",d:"Detección de bajo consumo y alimentación de emergencia USB-C."},{t:"Preparada para hogar inteligente",d:"Integra WONLY y ecosistemas principales para escenas y voz."}],design:["Fachada táctil de vidrio templado","Cerrojo motorizado silencioso","Cuerpo de aluminio fundido anticorrosión","Salida interior rápida con un toque"],scenarios:[{t:"Casas y apartamentos",d:"Acceso familiar sencillo, pases invitados e historial completo."},{t:"Villas y fincas",d:"Se integra con puertas de seguridad y hogar inteligente WONLY."},{t:"Alquiler de corta estancia",d:"Códigos temporales remotos sin entrega de llaves."},{t:"Oficinas y comercios",d:"Acceso por funciones, auditoría e integración de alarmas."}],specs:["Desbloqueo","Sensor","Material","Conectividad","Alimentación","Alarmas","Compatibilidad","Certificación"] }
};

const SmartLockS80 = () => {
  const { locale } = useLocale();
  const copy = COPY[locale];
  const t = (key: string, fallback: string) => copy?.text[key] ?? fallback;
  const highlights = copy?.highlights ?? HIGHLIGHTS;
  const steps = STEPS.map((item, i) => ({ ...item, ...copy?.steps[i] }));
  const features = FEATURES.map((item, i) => ({ ...item, ...copy?.features[i] }));
  const design = copy?.design ?? DESIGN;
  const scenarios = SCENARIOS.map((item, i) => ({ ...item, ...copy?.scenarios[i] }));
  useSeo({
    title: t("seoTitle", "WONLY S80 True-Sensing Smart Lock | Hands-Free Biometric Door Lock"),
    description: t("seoDescription", "The WONLY S80 smart lock: hands-free long-range sensing, multi-biometric entry, app control and tamper-proof architecture — engineered by a listed (SSE: 605268) manufacturer."),
    path: "/products/smart-locks/s80",
    type: "product",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "WONLY S80 True-Sensing Smart Lock",
      brand: { "@type": "Brand", name: "WONLY" },
      category: "Smart Lock",
      url: SITE_URL + "/products/smart-locks/s80",
    },
  });

  return (
    <div className="w-full font-sans antialiased overflow-x-hidden" style={{ background: CHAMP_BG, color: DARK }}>
      <SiteHeader />

      {/* Hero */}
      <section className="relative min-h-[92vh] w-full overflow-hidden flex items-center" style={{ background: "radial-gradient(120% 90% at 80% 20%, #2a2627 0%, #0d0d0d 70%)" }}>
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[7vw] grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-24 pb-16">
          <div>
            <div className={eyebrow + " mb-6"} style={{ color: CHAMP }}>{t("eyebrow", "Smart Locks · Flagship")}</div>
            <h1 className="font-light uppercase text-white leading-[1.06] tracking-[0.05em] text-[40px] md:text-[68px]">S80<br /><span style={{ color: CHAMP }}>{t("sensing", "True-Sensing")}</span><br />Smart Lock</h1>
            <p className="mt-7 max-w-md text-base md:text-lg font-normal leading-relaxed" style={{ color: "#efe9dd" }}>{t("hero", "Walk up and in. The S80 senses your approach and unlocks hands-free — biometric, app-controlled and tamper-proof.")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>{t("quote", "Get a Quote")} <ArrowRight size={15} /></Link>
              <a href="#specs" className="inline-flex items-center px-7 py-3.5 rounded-full text-sm font-medium border transition-colors hover:bg-white/5" style={{ borderColor: "rgba(255,255,255,0.25)", color: "#fff" }}>{t("view", "View Specs")}</a>
            </div>
          </div>
          <Reveal className="relative">
            <div className="relative mx-auto w-full max-w-[420px] aspect-[3/4] rounded-3xl overflow-hidden" style={{ background: "linear-gradient(160deg, rgba(212,196,160,0.14), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.1)" }}>
              <img src={IMG.lock} alt="WONLY S80 smart lock" className="absolute inset-0 w-full h-full object-contain p-8" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Overview highlights */}
      <section className="px-[7vw] py-20 md:py-24" style={{ background: "#fff" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {highlights.map((h, i) => (
            <Reveal key={h} delay={i * 90}>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: `${GOLD}1f` }}><Check size={14} style={{ color: GOLD }} /></span>
                <span className="text-base font-normal leading-relaxed" style={{ color: DARK }}>{h}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-[7vw] py-20 md:py-28" style={{ background: CHAMP_BG }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>{t("how", "How It Works")}</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{t("steps", "Three Steps. Under Two Seconds")}</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="rounded-2xl p-8 h-full" style={{ background: "#fff", border: `1px solid ${SILVER}44` }}>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: GOLD }}><s.icon size={22} style={{ color: "#fff" }} /></div>
                  <span className="text-3xl font-light" style={{ color: SILVER }}>{s.n}</span>
                </div>
                <h3 className="mt-6 text-xl font-medium" style={{ color: DARK }}>{s.t}</h3>
                <p className="mt-2.5 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>{t("engineered", "Engineered In")}</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{t("security", "Security You Never Have To Think About")}</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.t} delay={(i % 3) * 80}>
              <div className="group h-full rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(34,31,32,0.28)]" style={{ background: "#f7f7f5", borderColor: `${SILVER}66` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: GOLD }}>
                  <f.icon size={20} style={{ color: "#fff" }} />
                </div>
                <h3 className="mt-5 text-lg font-medium" style={{ color: DARK }}>{f.t}</h3>
                <p className="mt-2.5 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Design — front & back */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: CHAMP_BG }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <div className={eyebrow} style={{ color: GOLD }}>{t("design", "Design")}</div>
            <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{t("angle", "Considered From Every Angle")}</h2>
            <p className="mt-6 text-base font-normal leading-relaxed" style={{ color: MUTED }}>
              {t("designBody", "A full-height tempered-glass fascia keeps the camera, face sensor and backlit keypad hidden until you need them. The interior panel keeps everyday controls within reach — one-touch exit, volume and a manual override — all in a single cast-aluminum body finished to resist corrosion and daily wear.")}
            </p>
            <ul className="mt-7 space-y-3">
              {design.map((x) => (
                <li key={x} className="flex items-start gap-3"><span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${GOLD}22` }}><Check size={13} style={{ color: GOLD }} /></span><span className="text-sm font-normal" style={{ color: DARK }}>{x}</span></li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: `1px solid ${SILVER}44` }}>
              <img src={IMG.render} alt="WONLY S80 front and back design" loading="lazy" className="w-full h-auto object-contain p-6" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Precision band */}
      <section className="relative h-[54vh] min-h-[360px] w-full overflow-hidden flex items-center justify-center">
        <img src={IMG.band} alt="WONLY precision manufacturing" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(34,31,32,0.55), rgba(34,31,32,0.72))" }} />
        <Reveal className="relative z-10 text-center px-6 max-w-4xl">
          <div className={eyebrow + " mb-5"} style={{ color: CHAMP }}>{t("precision", "Precision Engineered")}</div>
          <h2 className="font-light text-white leading-[1.1] text-[28px] md:text-[50px]">{t("vault", "Built To The Same Standard As Our Vault Doors")}</h2>
        </Reveal>
      </section>

      {/* Where it fits */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>{t("fits", "Where It Fits")}</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{t("every", "One Lock, Every Kind Of Door")}</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {scenarios.map((s, i) => (
            <Reveal key={s.t} delay={(i % 4) * 80}>
              <div className="group h-full rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(34,31,32,0.28)]" style={{ background: "#f7f7f5", borderColor: `${SILVER}66` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: GOLD }}><s.icon size={20} style={{ color: "#fff" }} /></div>
                <h3 className="mt-5 text-lg font-medium" style={{ color: DARK }}>{s.t}</h3>
                <p className="mt-2.5 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Specs */}
      <section id="specs" className="px-[7vw] py-24 md:py-32" style={{ background: CHAMP_BG }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>{t("tech", "Technical Specifications")}</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{t("full", "The Details, In Full")}</h2>
        </Reveal>
        <div className="mt-12 max-w-4xl border-t" style={{ borderColor: `${SILVER}66` }}>
          {SPECS.map(([k, v], i) => (
            <Reveal key={k}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 py-5 border-b" style={{ borderColor: `${SILVER}44` }}>
                <div className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: GOLD }}>{copy?.specs[i] ?? k}</div>
                <div className="md:col-span-2 text-sm md:text-base font-normal" style={{ color: DARK }}>{v}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs font-light" style={{ color: MUTED }}>{t("note", "Specifications are indicative and may vary by market and configuration.")}</p>
      </section>

      <CtaBand eyebrowText={t("order", "Order & OEM")} title={t("cta", "Bring The S80 To Your Market")} sub={t("ctaSub", "Request pricing, samples or OEM/ODM configurations — our team replies within 24 hours.")} />
      <SiteFooter />
    </div>
  );
};

export default SmartLockS80;
