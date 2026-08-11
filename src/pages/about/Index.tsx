import { Cpu, FlaskConical, Lightbulb, Target, Eye, BadgeCheck, Layers, MapPin, HeartHandshake, Gem, Handshake } from "lucide-react";
import { useSeo, SITE_URL } from "@/lib/seo";
import { GOLD, GOLD_DEEP, CHAMP, SILVER, CHAMP_BG, DARK, MUTED, BASE, eyebrow, h2cls, Reveal, SiteHeader, SiteFooter, CtaBand } from "@/lib/site-ui";
import { useLocale, type Locale } from "@/lib/i18n";

const IMG = {
  hero: `${BASE}images/factory-line-a.webp`,
  factoryB: `${BASE}images/factory-line-b.webp`,
  robot: `${BASE}images/factory-abb.webp`,
  door: `${BASE}images/alu-k300pro.webp`,
  lock: `${BASE}images/lock-s80.webp`,
  wood: `${BASE}images/wood-2.webp`,
  window: `${BASE}images/alu-t200.webp`,
  g20: `${BASE}images/proj-1.webp`,
  egypt: `${BASE}images/proj-2.webp`,
  daxing: `${BASE}images/landmark-daxing.webp`,
  asianGames: `${BASE}images/landmark-asiangames.webp`,
  tianjin: `${BASE}images/proj-s-5.webp`,
  govHousing: `${BASE}images/landmark-govhousing.webp`,
};

const STATS = [
  { v: "30", s: "yrs", label: "Since 1996" },
  { v: "200M", s: "+", label: "Users Protected" },
  { v: "50M", s: "+", label: "Families Served" },
  { v: "No.1", s: "", label: "Brand Value · 14 yrs" },
];

const ECOSYSTEM = [
  { img: IMG.door, name: "Security Doors", d: "Cast-aluminum and robotic anti-theft doors that defeat forced entry while meeting global fire and acoustic codes." },
  { img: IMG.lock, name: "Smart Locks", d: "True-sensing, face-recognition and app-controlled locks — the intelligent layer of the modern entrance." },
  { img: IMG.wood, name: "Wooden & Medical Doors", d: "Steel-wood anti-warp silent doors and hermetic medical doors — craftsmanship meets engineered stability." },
  { img: IMG.window, name: "Windows & Whole-House", d: "Smart aluminum windows and a 28-category whole-house intelligence ecosystem that ties the building together." },
];

const RD = [
  { icon: FlaskConical, t: "5 R&D Bases · 6 Centers", d: "Yongkang, Hangzhou, Shenzhen, Shanghai and Munich — a 400+ engineer team investing ¥80M+ each year, including a joint lab with Peking University." },
  { icon: Lightbulb, t: "1,000+ Patents", d: "Over 1,000 national patents and 300+ invention patents — more than the rest of the industry's top ten combined; co-author of ~100 national and industry standards." },
  { icon: Cpu, t: "National 5G Future Factory", d: "The sector's only state-recognised 5G smart factory — robotic lines with automotive-grade coating precision to 1/10 of a human hair." },
  { icon: Layers, t: "Five Manufacturing Bases", d: "Yongkang, Wuyi, Sichuan, Hangzhou and Hubei (under construction) — 3M smart locks, 3M wooden doors and 6M steel doors a year." },
];

const STORY = [
  { y: "1996", m: "WONLY is founded in Yongkang, Zhejiang — a singular focus on entrance security begins." },
  { y: "2003", m: "Wins the 'Challenge the Lock-Picking Champion' — its locks remain unopened 20+ years on." },
  { y: "2005", m: "Named a China Well-Known Trademark — the sector's only dual commercial + judicial recognition." },
  { y: "2021", m: "Lists on the Shanghai Stock Exchange (605268) — the industry's only main-board company." },
  { y: "2024", m: "Opens the sector's only national-level 5G future factory." },
  { y: "2026", m: "Launches global expansion — the first year of the going-global strategy." },
];

const LANDMARKS = [
  { img: IMG.g20, name: "G20 Summit Venue", place: "Hangzhou, China" },
  { img: IMG.asianGames, name: "Hangzhou Asian Games", place: "Hangzhou, China" },
  { img: IMG.daxing, name: "Beijing Daxing Int'l Airport", place: "Beijing, China" },
  { img: IMG.egypt, name: "New Administrative Capital CBD", place: "Cairo, Egypt" },
  { img: IMG.tianjin, name: "National Games Village", place: "Tianjin, China" },
  { img: IMG.govHousing, name: "Central Ministry Residences", place: "Beijing, China" },
];

const CERTS = ["ISO 9001", "ISO 14001", "CE", "UL", "EN 1634 Fire", "RoHS", "ETL", "IECEE", "SASO", "FSC"];
const HONORS = [
  "Red Dot Best of the Best",
  "iF Product Design Award",
  "Forbes Design Leader Brand",
  "China Well-Known Trademark (dual-certified)",
  "National Quality Benchmark Enterprise",
  "TOP500 Preferred Supplier — 12 consecutive years",
];
const VALUES = [
  { icon: HeartHandshake, t: "Integrity & Gratitude", d: "We keep our word — to customers, partners and each other — and never forget who put their trust in us." },
  { icon: Gem, t: "Humility & Respect", d: "We respect the craft, the standards and the responsibility that comes with protecting people's homes." },
  { icon: Target, t: "Diligence & Accountability", d: "We push quality relentlessly forward and own every outcome, from the factory floor to the front door." },
  { icon: Handshake, t: "Win-Win Cooperation", d: "We grow by making our partners successful — profitable, protected and supported for the long term." },
];

type AboutCopy={text:Record<string,string>;stats:string[];ecosystem:{name:string;d:string}[];rd:{t:string;d:string}[];story:string[];landmarks:{name:string;place:string}[];honors:string[];values:{t:string;d:string}[]};
const COPY:Partial<Record<Locale,AboutCopy>>={
 ar:{text:{seoTitle:"عن WONLY | العلامة الأولى لأبواب الأمان والأقفال الذكية",seoDescription:"WONLY المدرجة في بورصة شنغهاي 605268: تأسست عام 1996، خمس قواعد إنتاج وستة مراكز بحث وأكثر من 1,000 براءة و200 مليون مستخدم في أكثر من 60 دولة.",about:"عن WONLY",heroA:"نحمي مداخل",heroB:"العالم",heroSub:"منذ 30 عاماً نصمم لحظة فتح الباب لتكون آمنة وسهلة وذكية.",who:"من نحن",numberOne:"العلامة الأولى في الصين لأمن المداخل",heritage1:"WONLY مجموعة أمنية عالية التقنية تجمع البحث والتصميم والتصنيع والمبيعات والخدمة. تأسست عام 1996 في يونغكانغ، وهي الشركة الوحيدة في القطاع المدرجة في السوق الرئيسية للأسهم الصينية (SSE: 605268)، وتحتل المرتبة الأولى في قيمة العلامة منذ 14 عاماً.",heritage2:"يحمي هذا التركيز أكثر من 200 مليون مستخدم و50 مليون أسرة، ويمتد إلى المنازل والبنوك والمستشفيات والمشاريع البارزة في أربع قارات.",mission:"المهمة",missionText:"تمكين الأسر حول العالم من حياة آمنة وذكية وأفضل.",vision:"الرؤية",visionText:"أن نصبح قائد منظومة الأمن الذكي العالمية.",ecosystem:"منظومة واحدة · سبع فئات",rdEye:"البحث والتطوير والتصنيع الذكي",rdTitle:"براءات لا يضاهيها منافس",rdBody:"الأمان الموثوق يجب أن يُهندس ويُثبت. تتحكم WONLY في السلسلة كاملة، من صب الألمنيوم إلى برمجيات القفل، بمحفظة براءات تتجاوز مجموع أكبر عشرة منافسين.",milestones:"محطات التطور",thirty:"ثلاثون عاماً، اتجاه واحد",global:"حضور عالمي",projects:"مختارة للمشاريع التي لا تحتمل الفشل",overseas:"في الخارج منذ 2010 · أكثر من 600 مشروع دولي",globalBody:"في أكثر من 60 دولة عبر أفريقيا والشرق الأوسط وآسيا والأمريكتين، تُختار WONLY للقصور الرئاسية والبنوك السيادية ومواقع القمم والمطارات الدولية.",references:"تشمل المراجع الدولية العاصمة الإدارية الجديدة في مصر وبنك الحبشة في إثيوبيا وقصوراً رئاسية في توغو وفانواتو.",qualifications:"المؤهلات والشهادات والتكريمات",honorsTitle:"16 تكريماً وطنياً وأكثر من 1,000 جائزة",honorsBody:"إذا لم نكن الوحيدين فنحن الأوائل، من أرفع جوائز التصميم إلى معايير الجودة الوطنية.",core:"القيم الأساسية",stand:"ما نؤمن به",cta:"شارك WONLY",ctaSub:"للتوزيع أو المشاريع أو OEM/ODM، أخبرنا بمنطقتك وسيرد فريقنا خلال 24 ساعة."},stats:["منذ 1996","مستخدم محمي","أسرة مخدومة","قيمة العلامة · 14 عاماً"],ecosystem:[{name:"أبواب الأمان",d:"أبواب من الألمنيوم المصبوب وروبوتية تقاوم الاقتحام وتلبي معايير الحريق والصوت."},{name:"أقفال ذكية",d:"استشعار حقيقي وتعرف على الوجه وتحكم بالتطبيق لمدخل عصري."},{name:"أبواب خشبية وطبية",d:"أبواب صامتة مقاومة للالتواء وأبواب طبية محكمة."},{name:"نوافذ ومنزل متكامل",d:"نوافذ ألمنيوم ذكية ومنظومة منزلية من 28 فئة."}],rd:[{t:"5 قواعد بحث · 6 مراكز",d:"أكثر من 400 مهندس واستثمار سنوي يتجاوز 80 مليون يوان ومختبر مشترك مع جامعة بكين."},{t:"أكثر من 1,000 براءة",d:"أكثر من 300 براءة اختراع والمشاركة في نحو 100 معيار وطني وصناعي."},{t:"مصنع 5G وطني للمستقبل",d:"المصنع الذكي الوحيد في القطاع المعترف به وطنياً، بدقة طلاء بمستوى السيارات."},{t:"خمس قواعد تصنيع",d:"يونغكانغ وويي وسيتشوان وهانغتشو وهوبي، بطاقة ملايين الأبواب والأقفال سنوياً."}],story:["تأسست WONLY في يونغكانغ وبدأ التركيز على أمن المداخل.","تفوز بتحدي بطل فتح الأقفال، وما زالت الأقفال غير مفتوحة بعد أكثر من 20 عاماً.","تحصل على لقب علامة تجارية صينية مشهورة باعتراف تجاري وقضائي مزدوج.","تُدرج في بورصة شنغهاي 605268 كالشركة الوحيدة في القطاع بالسوق الرئيسية.","تفتتح المصنع الوطني الوحيد في القطاع بتقنية 5G.","تطلق التوسع العالمي كأول عام لاستراتيجية الانطلاق الدولي."],landmarks:[{name:"موقع قمة G20",place:"هانغتشو، الصين"},{name:"دورة الألعاب الآسيوية",place:"هانغتشو، الصين"},{name:"مطار بكين داشينغ الدولي",place:"بكين، الصين"},{name:"العاصمة الإدارية الجديدة",place:"القاهرة، مصر"},{name:"قرية الألعاب الوطنية",place:"تيانجين، الصين"},{name:"مساكن الوزارات المركزية",place:"بكين، الصين"}],honors:["Red Dot Best of the Best","جائزة iF لتصميم المنتجات","علامة Forbes الرائدة في التصميم","علامة تجارية صينية مشهورة باعتراف مزدوج","مؤسسة وطنية مرجعية للجودة","المورد المفضل TOP500 لمدة 12 عاماً"],values:[{t:"النزاهة والامتنان",d:"نفي بوعودنا للعملاء والشركاء ولا ننسى من منحنا ثقته."},{t:"التواضع والاحترام",d:"نحترم الحرفة والمعايير ومسؤولية حماية منازل الناس."},{t:"الاجتهاد والمساءلة",d:"ندفع الجودة للأمام ونتحمل نتيجة كل خطوة من المصنع إلى الباب."},{t:"تعاون رابح للجميع",d:"ننمو بنجاح شركائنا وربحيتهم وحمايتهم ودعمهم طويل الأمد."}]},
 fr:{text:{seoTitle:"À propos de WONLY | Leader des portes de sécurité et serrures intelligentes",seoDescription:"WONLY, cotée à Shanghai 605268 : fondée en 1996, cinq bases, six centres R&D, plus de 1 000 brevets et 200 millions d’utilisateurs dans plus de 60 pays.",about:"À propos de WONLY",heroA:"Sécuriser les",heroB:"portes du monde",heroSub:"Depuis 30 ans, nous rendons l’ouverture d’une porte sûre, simple et intelligente.",who:"Qui sommes-nous",numberOne:"N°1 chinois de la sécurité des entrées",heritage1:"WONLY est un groupe de haute technologie réunissant R&D, design, fabrication, vente et service. Fondé en 1996 à Yongkang, il est la seule entreprise du secteur cotée au marché principal chinois (SSE : 605268) et première en valeur de marque depuis 14 ans.",heritage2:"Cette spécialisation protège plus de 200 millions d’utilisateurs et 50 millions de familles, dans les logements, banques, hôpitaux et projets emblématiques de quatre continents.",mission:"Mission",missionText:"Permettre aux familles du monde entier de vivre mieux, en sécurité et intelligemment.",vision:"Vision",visionText:"Devenir le leader mondial de l’écosystème de sécurité intelligente.",ecosystem:"Un écosystème · Sept catégories",rdEye:"R&D et fabrication intelligente",rdTitle:"Des brevets sans équivalent",rdBody:"Une sécurité fiable doit être conçue et prouvée. WONLY contrôle toute la chaîne, de la fonte d’aluminium au logiciel de serrure, avec plus de brevets que les dix principaux concurrents réunis.",milestones:"Étapes clés",thirty:"Trente ans, une direction",global:"Présence mondiale",projects:"Choisi pour les projets où l’échec est exclu",overseas:"À l’international depuis 2010 · Plus de 600 projets",globalBody:"Dans plus de 60 pays d’Afrique, du Moyen-Orient, d’Asie et des Amériques, WONLY équipe palais présidentiels, banques souveraines, sommets et aéroports.",references:"Références internationales : nouvelle capitale administrative d’Égypte, Abyssinia Bank en Éthiopie et palais présidentiels au Togo et au Vanuatu.",qualifications:"Qualifications, certifications et distinctions",honorsTitle:"16 distinctions nationales. Plus de 1 000 prix",honorsBody:"Sinon l’unique, le premier : des plus grands prix de design aux références nationales de qualité.",core:"Valeurs fondamentales",stand:"Ce que nous défendons",cta:"Devenez partenaire WONLY",ctaSub:"Distribution, projet ou OEM/ODM : indiquez votre territoire, réponse sous 24 heures."},stats:["Depuis 1996","Utilisateurs protégés","Familles servies","Valeur de marque · 14 ans"],ecosystem:[{name:"Portes de sécurité",d:"Portes en aluminium moulé et robotisées contre l’effraction, conformes aux normes feu et acoustique."},{name:"Serrures intelligentes",d:"Détection réelle, reconnaissance faciale et application pour l’entrée moderne."},{name:"Portes bois et médicales",d:"Portes silencieuses anti-déformation et portes médicales hermétiques."},{name:"Fenêtres et maison complète",d:"Fenêtres aluminium intelligentes et écosystème de 28 catégories."}],rd:[{t:"5 bases R&D · 6 centres",d:"Plus de 400 ingénieurs, 80 M¥ investis par an et laboratoire conjoint avec l’Université de Pékin."},{t:"Plus de 1 000 brevets",d:"Plus de 300 brevets d’invention et participation à près de 100 normes."},{t:"Usine du futur 5G nationale",d:"Seule usine intelligente du secteur reconnue par l’État, avec précision de revêtement automobile."},{t:"Cinq bases industrielles",d:"Yongkang, Wuyi, Sichuan, Hangzhou et Hubei, pour des millions de portes et serrures par an."}],story:["Fondation de WONLY à Yongkang avec une spécialisation dans la sécurité des entrées.","Victoire au défi du champion du crochetage ; les serrures restent inviolées plus de 20 ans après.","Obtention du titre de marque chinoise renommée avec double reconnaissance commerciale et judiciaire.","Introduction à la Bourse de Shanghai 605268, seule société du secteur au marché principal.","Ouverture de la seule usine du futur 5G nationale du secteur.","Lancement de l’expansion mondiale et de la stratégie d’internationalisation."],landmarks:[{name:"Site du sommet G20",place:"Hangzhou, Chine"},{name:"Jeux asiatiques de Hangzhou",place:"Hangzhou, Chine"},{name:"Aéroport international de Beijing-Daxing",place:"Pékin, Chine"},{name:"Nouvelle capitale administrative",place:"Le Caire, Égypte"},{name:"Village des Jeux nationaux",place:"Tianjin, Chine"},{name:"Résidences des ministères centraux",place:"Pékin, Chine"}],honors:["Red Dot Best of the Best","Prix iF Product Design","Marque leader du design Forbes","Marque chinoise renommée à double certification","Entreprise nationale de référence qualité","Fournisseur TOP500 préféré pendant 12 ans"],values:[{t:"Intégrité et gratitude",d:"Nous tenons parole envers clients et partenaires et n’oublions jamais leur confiance."},{t:"Humilité et respect",d:"Nous respectons le métier, les normes et la responsabilité de protéger les foyers."},{t:"Diligence et responsabilité",d:"Nous faisons progresser la qualité et assumons chaque résultat, de l’usine à la porte."},{t:"Coopération gagnant-gagnant",d:"Nous grandissons en assurant le succès durable, rentable et protégé de nos partenaires."}]},
 ru:{text:{seoTitle:"О компании WONLY | Лидер защитных дверей и умных замков",seoDescription:"WONLY, Шанхайская биржа 605268: основана в 1996 году, пять баз, шесть центров НИОКР, более 1 000 патентов и 200 млн пользователей в 60+ странах.",about:"О компании WONLY",heroA:"Защищаем входы",heroB:"по всему миру",heroSub:"Тридцать лет мы делаем момент открытия двери безопасным, лёгким и умным.",who:"Кто мы",numberOne:"№1 в Китае по безопасности входа",heritage1:"WONLY — высокотехнологичная группа, объединяющая НИОКР, дизайн, производство, продажи и сервис. Основана в 1996 году в Юнкане; единственная компания отрасли на основном рынке акций Китая (SSE: 605268) и лидер стоимости бренда 14 лет подряд.",heritage2:"Эта специализация защищает более 200 млн пользователей и 50 млн семей, а также банки, больницы и знаковые объекты на четырёх континентах.",mission:"Миссия",missionText:"Дать семьям по всему миру безопасную, умную и лучшую жизнь.",vision:"Видение",visionText:"Стать лидером глобальной экосистемы умной безопасности.",ecosystem:"Одна экосистема · Семь категорий",rdEye:"НИОКР и умное производство",rdTitle:"Патенты, которым нет равных",rdBody:"Надёжную безопасность нужно спроектировать и доказать. WONLY контролирует всю цепочку — от литья алюминия до прошивки замка — и имеет больше патентов, чем десять крупнейших конкурентов вместе.",milestones:"Основные этапы",thirty:"Тридцать лет, одно направление",global:"Глобальное присутствие",projects:"Выбор для объектов, где ошибка недопустима",overseas:"За рубежом с 2010 года · Более 600 проектов",globalBody:"Более чем в 60 странах Африки, Ближнего Востока, Азии и Америки WONLY выбирают для дворцов, банков, саммитов и международных аэропортов.",references:"Международные объекты включают новую административную столицу Египта, Abyssinia Bank и президентские дворцы в Того и Вануату.",qualifications:"Квалификации, сертификаты и награды",honorsTitle:"16 национальных почестей. Более 1 000 наград",honorsBody:"Если не единственные, то первые — от высших премий дизайна до национальных эталонов качества.",core:"Основные ценности",stand:"Наши принципы",cta:"Станьте партнёром WONLY",ctaSub:"Дистрибуция, проект или OEM/ODM — сообщите регион, и мы ответим в течение 24 часов."},stats:["С 1996 года","Защищённых пользователей","Обслуженных семей","Стоимость бренда · 14 лет"],ecosystem:[{name:"Защитные двери",d:"Литые алюминиевые и роботизированные двери против взлома по нормам огня и акустики."},{name:"Умные замки",d:"Точное обнаружение, распознавание лица и приложение для современного входа."},{name:"Деревянные и медицинские двери",d:"Тихие устойчивые к деформации и герметичные медицинские двери."},{name:"Окна и комплексный дом",d:"Умные алюминиевые окна и домашняя экосистема из 28 категорий."}],rd:[{t:"5 баз НИОКР · 6 центров",d:"Более 400 инженеров, ежегодно свыше 80 млн юаней и совместная лаборатория с Пекинским университетом."},{t:"Более 1 000 патентов",d:"Более 300 патентов на изобретения и участие примерно в 100 стандартах."},{t:"Национальная фабрика будущего 5G",d:"Единственный в отрасли признанный государством умный завод с автомобильной точностью покрытия."},{t:"Пять производственных баз",d:"Юнкан, Уи, Сычуань, Ханчжоу и Хубэй производят миллионы дверей и замков."}],story:["WONLY основана в Юнкане и сосредотачивается на безопасности входа.","Победа в испытании чемпиона по вскрытию; замки остаются невскрытыми более 20 лет.","Статус известной торговой марки Китая с двойным коммерческим и судебным признанием.","Листинг на Шанхайской бирже 605268 — единственная компания отрасли на основном рынке.","Открытие единственной в отрасли национальной фабрики будущего 5G.","Запуск глобального расширения и международной стратегии."],landmarks:[{name:"Площадка саммита G20",place:"Ханчжоу, Китай"},{name:"Азиатские игры в Ханчжоу",place:"Ханчжоу, Китай"},{name:"Аэропорт Пекин-Дасин",place:"Пекин, Китай"},{name:"Новая административная столица",place:"Каир, Египет"},{name:"Деревня Национальных игр",place:"Тяньцзинь, Китай"},{name:"Резиденции центральных министерств",place:"Пекин, Китай"}],honors:["Red Dot Best of the Best","Премия iF Product Design","Лидер дизайна Forbes","Известная торговая марка Китая с двойным признанием","Национальное эталонное предприятие качества","Предпочтительный поставщик TOP500 двенадцать лет"],values:[{t:"Честность и благодарность",d:"Мы держим слово перед клиентами и партнёрами и помним оказанное доверие."},{t:"Скромность и уважение",d:"Мы уважаем мастерство, стандарты и ответственность за защиту домов."},{t:"Трудолюбие и ответственность",d:"Мы постоянно повышаем качество и отвечаем за результат от завода до двери."},{t:"Взаимовыгодное сотрудничество",d:"Мы растём благодаря долгосрочному, прибыльному и защищённому успеху партнёров."}]},
 es:{text:{seoTitle:"Sobre WONLY | Líder en puertas de seguridad y cerraduras inteligentes",seoDescription:"WONLY, cotizada en Shanghái 605268: fundada en 1996, cinco bases, seis centros de I+D, más de 1.000 patentes y 200 millones de usuarios en 60+ países.",about:"Sobre WONLY",heroA:"Protegemos las entradas",heroB:"del mundo",heroSub:"Durante 30 años hemos hecho que abrir una puerta sea seguro, sencillo e inteligente.",who:"Quiénes somos",numberOne:"N.º 1 de China en seguridad de entrada",heritage1:"WONLY es un grupo tecnológico que integra I+D, diseño, fabricación, ventas y servicio. Fundada en 1996 en Yongkang, es la única empresa del sector cotizada en el mercado principal chino (SSE: 605268) y primera en valor de marca durante 14 años.",heritage2:"Esta especialización protege a más de 200 millones de usuarios y 50 millones de familias, además de bancos, hospitales y proyectos emblemáticos en cuatro continentes.",mission:"Misión",missionText:"Permitir que familias de todo el mundo disfruten una vida segura, inteligente y mejor.",vision:"Visión",visionText:"Ser líder del ecosistema mundial de seguridad inteligente.",ecosystem:"Un ecosistema · Siete categorías",rdEye:"I+D y fabricación inteligente",rdTitle:"Patentes sin rival",rdBody:"La seguridad fiable debe diseñarse y demostrarse. WONLY controla toda la cadena, desde fundir aluminio hasta programar la cerradura, con más patentes que los diez principales competidores juntos.",milestones:"Hitos",thirty:"Treinta años, una dirección",global:"Presencia mundial",projects:"Elegida para proyectos donde fallar no es una opción",overseas:"En el exterior desde 2010 · Más de 600 proyectos",globalBody:"En más de 60 países de África, Oriente Medio, Asia y América, WONLY equipa palacios presidenciales, bancos, cumbres y aeropuertos internacionales.",references:"Las referencias incluyen la nueva capital administrativa de Egipto, Abyssinia Bank y palacios presidenciales en Togo y Vanuatu.",qualifications:"Calificaciones, certificaciones y reconocimientos",honorsTitle:"16 reconocimientos nacionales. Más de 1.000 premios",honorsBody:"Si no somos los únicos, somos los primeros: desde los máximos premios de diseño hasta referentes nacionales de calidad.",core:"Valores fundamentales",stand:"Lo que defendemos",cta:"Asóciese con WONLY",ctaSub:"Distribución, proyecto u OEM/ODM: indique su territorio y responderemos en 24 horas."},stats:["Desde 1996","Usuarios protegidos","Familias atendidas","Valor de marca · 14 años"],ecosystem:[{name:"Puertas de seguridad",d:"Puertas robotizadas y de aluminio fundido contra intrusión según normas de fuego y acústica."},{name:"Cerraduras inteligentes",d:"Detección real, reconocimiento facial y aplicación para la entrada moderna."},{name:"Puertas de madera y médicas",d:"Puertas silenciosas anti-deformación y puertas médicas herméticas."},{name:"Ventanas y hogar integral",d:"Ventanas inteligentes y ecosistema doméstico de 28 categorías."}],rd:[{t:"5 bases de I+D · 6 centros",d:"Más de 400 ingenieros, inversión anual superior a ¥80M y laboratorio con la Universidad de Pekín."},{t:"Más de 1.000 patentes",d:"Más de 300 patentes de invención y participación en cerca de 100 normas."},{t:"Fábrica del futuro 5G nacional",d:"Única fábrica inteligente del sector reconocida por el Estado, con precisión de acabado automotriz."},{t:"Cinco bases de fabricación",d:"Yongkang, Wuyi, Sichuan, Hangzhou y Hubei producen millones de puertas y cerraduras."}],story:["WONLY se funda en Yongkang con un enfoque único en la seguridad de entrada.","Gana el desafío al campeón de ganzúa; sus cerraduras siguen sin abrirse más de 20 años después.","Nombrada marca reconocida de China con doble reconocimiento comercial y judicial.","Cotiza en Shanghái 605268 como única empresa del sector en el mercado principal.","Abre la única fábrica del futuro 5G nacional del sector.","Lanza la expansión mundial y la estrategia de internacionalización."],landmarks:[{name:"Sede de la cumbre G20",place:"Hangzhou, China"},{name:"Juegos Asiáticos de Hangzhou",place:"Hangzhou, China"},{name:"Aeropuerto Beijing-Daxing",place:"Pekín, China"},{name:"Nueva capital administrativa",place:"El Cairo, Egipto"},{name:"Villa de los Juegos Nacionales",place:"Tianjin, China"},{name:"Residencias de ministerios centrales",place:"Pekín, China"}],honors:["Red Dot Best of the Best","Premio iF Product Design","Marca líder en diseño Forbes","Marca reconocida de China con doble certificación","Empresa nacional de referencia de calidad","Proveedor preferente TOP500 durante 12 años"],values:[{t:"Integridad y gratitud",d:"Cumplimos nuestra palabra con clientes y socios y recordamos su confianza."},{t:"Humildad y respeto",d:"Respetamos el oficio, las normas y la responsabilidad de proteger hogares."},{t:"Diligencia y responsabilidad",d:"Impulsamos la calidad y respondemos por cada resultado, de fábrica a puerta."},{t:"Cooperación beneficiosa",d:"Crecemos haciendo que nuestros socios tengan éxito rentable, protegido y duradero."}]}
};

const About = () => {
  const {locale}=useLocale(); const copy=COPY[locale]; const t=(k:string,f:string)=>copy?.text[k]??f;
  const ecosystem=ECOSYSTEM.map((e,i)=>({...e,...copy?.ecosystem[i]}));
  const rd=RD.map((r,i)=>({...r,...copy?.rd[i]}));
  const story=STORY.map((s,i)=>({...s,m:copy?.story[i]??s.m}));
  const landmarks=LANDMARKS.map((p,i)=>({...p,...copy?.landmarks[i]}));
  const honors=copy?.honors??HONORS; const values=VALUES.map((v,i)=>({...v,...copy?.values[i]}));
  useSeo({
    title: t("seoTitle", "About WONLY | China's No.1 Security Door & Smart Lock Brand (SSE: 605268)"),
    description: t("seoDescription", "WONLY (SSE: 605268) — the industry's only A-share main-board listed door & lock maker, brand value No.1 for 14 years. Founded 1996: 5 bases, 6 R&D centers, 1,000+ patents, 200M+ users across 60+ countries."),
    path: "/about",
    type: "website",
    jsonLd: { "@context": "https://schema.org", "@type": "AboutPage", name: "About WONLY", url: SITE_URL + "/about" },
  });

  return (
    <div className="w-full font-sans antialiased overflow-x-hidden" style={{ background: CHAMP_BG, color: DARK }}>
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[82vh] min-h-[520px] w-full overflow-hidden flex items-center" style={{ background: "#0d0d0d" }}>
        <img src={IMG.hero} alt="WONLY smart factory production line" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.45) 60%, rgba(13,13,13,0.2) 100%)" }} />
        <div className="relative z-10 px-[7vw] max-w-3xl">
          <div className={eyebrow + " mb-6"} style={{ color: CHAMP }}>{t("about","About WONLY")}</div>
          <h1 className="font-light uppercase text-white leading-[1.08] tracking-[0.06em] text-[40px] md:text-[74px]">{t("heroA","Securing the world's")}<br /><span style={{ color: CHAMP }}>{t("heroB","front doors")}</span></h1>
          <p className="mt-7 max-w-lg text-base md:text-lg font-normal leading-relaxed" style={{ color: "#efe9dd" }}>{t("heroSub","For 30 years we have engineered the moment a door opens into something safe, effortless and intelligent.")}</p>
        </div>
      </section>

      {/* Heritage + stats */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal>
            <div className={eyebrow} style={{ color: GOLD_DEEP }}>{t("who","Who We Are")}</div>
            <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{t("numberOne","China's No.1 In Entrance Security")}</h2>
            <p className="mt-6 text-base font-normal leading-relaxed" style={{ color: MUTED }}>
              {t("heritage1","WONLY is a high-tech security group that unites R&D, design, manufacturing, sales and service. Founded in 1996, it is the industry's only company listed on China's A-share main board (SSE: 605268).")}
            </p>
            <p className="mt-4 text-base font-normal leading-relaxed" style={{ color: MUTED }}>
              {t("heritage2","That focus protects more than 200 million users and 50 million families — and now reaches homes, banks, hospitals and landmark projects across four continents.")}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl p-6" style={{ background: "#f7f7f5", border: `1px solid ${SILVER}44` }}>
                  <div className="font-light leading-none whitespace-nowrap" style={{ color: GOLD }}>
                    <span className="text-[32px] md:text-[40px]">{s.v}</span><span className="text-lg ml-0.5">{s.s}</span>
                  </div>
                  <div className="mt-3 text-[11px] tracking-[0.16em] uppercase font-medium" style={{ color: DARK }}>{copy?.stats[STATS.indexOf(s)]??s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: DARK }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <Reveal>
            <div className="flex items-center gap-2.5 mb-5"><Target size={18} style={{ color: GOLD }} /><span className={eyebrow} style={{ color: CHAMP }}>{t("mission","Mission")}</span></div>
            <h3 className="text-2xl md:text-4xl font-light leading-[1.15] text-white">{t("missionText","Let families around the world enjoy a safe, smart and better life.")}</h3>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex items-center gap-2.5 mb-5"><Eye size={18} style={{ color: GOLD }} /><span className={eyebrow} style={{ color: CHAMP }}>{t("vision","Vision")}</span></div>
            <h3 className="text-2xl md:text-4xl font-light leading-[1.15] text-white">{t("visionText","Become the leader of the global smart-security ecosystem.")}</h3>
          </Reveal>
        </div>
        {/* Ecosystem */}
        <div className="mt-16 md:mt-20">
          <Reveal><div className={eyebrow + " mb-8"} style={{ color: CHAMP }}>{t("ecosystem","One Ecosystem · Seven Categories")}</div></Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {ecosystem.map((e, i) => (
              <Reveal key={e.name} delay={(i % 4) * 80}>
                <div className="group rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="h-40 overflow-hidden" style={{ background: "#15100f" }}>
                    <img src={e.img} alt={e.name} loading="lazy" className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h4 className="text-base font-medium text-white">{e.name}</h4>
                    <p className="mt-2 text-[13px] font-light leading-relaxed" style={{ color: "rgba(245,241,234,0.65)" }}>{e.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* R&D + Smart Manufacturing */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[320px] md:h-[440px] rounded-2xl overflow-hidden">
              <img src={IMG.factoryB} alt="WONLY press line" loading="lazy" className="row-span-2 w-full h-full object-cover" />
              <img src={IMG.robot} alt="WONLY robotic automation" loading="lazy" className="w-full h-full object-cover" />
              <img src={IMG.hero} alt="WONLY branded stamping line" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className={eyebrow} style={{ color: GOLD_DEEP }}>{t("rdEye","R&D & Smart Manufacturing")}</div>
            <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{t("rdTitle","Patents No Rival Can Match")}</h2>
            <p className="mt-6 text-base font-normal leading-relaxed" style={{ color: MUTED }}>
              {t("rdBody","Security you can trust has to be engineered and proven. WONLY controls the entire chain and holds a patent portfolio larger than the rest of the industry's top ten combined.")}
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rd.map((r) => (
                <div key={r.t} className="rounded-2xl p-5" style={{ background: "#f7f7f5", border: `1px solid ${SILVER}44` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: GOLD }}><r.icon size={18} style={{ color: "#fff" }} /></div>
                  <h4 className="mt-4 text-base font-medium" style={{ color: DARK }}>{r.t}</h4>
                  <p className="mt-1.5 text-[13px] font-normal leading-relaxed" style={{ color: MUTED }}>{r.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story timeline */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: CHAMP_BG }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD_DEEP }}>{t("milestones","Milestones")}</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{t("thirty","Thirty Years, One Direction")}</h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-8">
          {story.map((t, i) => (
            <Reveal key={t.y} delay={(i % 3) * 90}>
              <div className="relative pt-8 border-t-2" style={{ borderColor: GOLD }}>
                <div className="text-3xl md:text-4xl font-light" style={{ color: DARK }}>{t.y}</div>
                <p className="mt-3 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{t.m}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Global footprint + landmark projects */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Reveal className="max-w-2xl">
            <div className={eyebrow} style={{ color: GOLD_DEEP }}>{t("global","Global Footprint")}</div>
            <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{t("projects","Chosen For The Projects That Cannot Fail")}</h2>
          </Reveal>
          <Reveal>
            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: MUTED }}><MapPin size={16} style={{ color: GOLD }} /> {t("overseas","Overseas since 2010 · 600+ international projects")}</div>
          </Reveal>
        </div>
        <p className="mt-6 max-w-3xl text-base font-normal leading-relaxed" style={{ color: MUTED }}>
          {t("globalBody","Across 60+ countries, WONLY is specified where security cannot be compromised, from presidential palaces and sovereign banks to summit venues and international airports.")}
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {landmarks.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 80}>
              <div className="group rounded-2xl overflow-hidden relative h-[240px]">
                <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(0,0,0,0) 40%, rgba(13,13,13,0.85))" }} />
                <div className="absolute bottom-0 left-0 p-5">
                  <div className="text-white text-base font-medium">{p.name}</div>
                  <div className="mt-1 text-[11px] tracking-[0.14em] uppercase" style={{ color: CHAMP }}>{p.place}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm font-light" style={{ color: MUTED }}>
          {t("references","International references include the Egypt New Administrative Capital CBD, Ethiopia's Abyssinia Bank, and presidential palace projects in Togo and Vanuatu.")}
        </p>
      </section>

      {/* Certifications & honors */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: DARK }}>
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-2.5 mb-5"><BadgeCheck size={18} style={{ color: CHAMP }} /><span className={eyebrow} style={{ color: CHAMP }}>{t("qualifications","Qualifications, Certifications & Honors")}</span></div>
          <h2 className={h2cls + " text-white"}>{t("honorsTitle","16 National Honors. 1,000+ Awards")}</h2>
          <p className="mt-5 text-base font-light leading-relaxed" style={{ color: "rgba(245,241,234,0.7)" }}>{t("honorsBody","If it isn't the only, it's the first — from international design's highest prizes to national quality benchmarks.")}</p>
        </Reveal>
        <div className="mt-12 flex flex-wrap gap-3">
          {CERTS.map((c) => (
            <Reveal key={c}><span className="px-5 py-2.5 rounded-full text-sm font-medium border" style={{ borderColor: "rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.05)", color: "rgba(245,241,234,0.92)" }}>{c}</span></Reveal>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
          {honors.map((h, i) => (
            <Reveal key={h}>
              <div className="flex items-start gap-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <span className="text-sm mt-0.5 font-light" style={{ color: GOLD }}>{`0${i + 1}`}</span>
                <span className="text-base font-light" style={{ color: "rgba(245,241,234,0.9)" }}>{h}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Core values */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD_DEEP }}>{t("core","Core Values")}</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>{t("stand","What We Stand For")}</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <Reveal key={v.t} delay={(i % 4) * 80}>
              <div className="group h-full rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(34,31,32,0.28)]" style={{ background: "#f7f7f5", borderColor: `${SILVER}66` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: GOLD }}>
                  <v.icon size={20} style={{ color: "#fff" }} />
                </div>
                <h3 className="mt-5 text-lg font-medium" style={{ color: DARK }}>{v.t}</h3>
                <p className="mt-2.5 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title={t("cta","Partner With WONLY")} sub={t("ctaSub","Distributor, project or OEM/ODM — tell us your territory and our team will reply within 24 hours.")} />
      <SiteFooter />
    </div>
  );
};

export default About;
