import type { Locale } from "./i18n";
import type { ProductPageData } from "./product-page";

type EntranceCopy = {
  seo: { title: string; description: string };
  eyebrow: string; title: string; sub: string; highlights: string[];
  seriesEyebrow: string; seriesTitle: string; series: { name: string; tag: string; description: string }[];
  featuresEyebrow: string; featuresTitle: string; features: { title: string; description: string }[];
  bandEyebrow: string; bandTitle: string; ctaTitle: string; ctaSub: string;
};

const ENTRANCE: Partial<Record<Locale, EntranceCopy>> = {
  ar: {
    seo: { title: "مصنّع أبواب مداخل أمنية وخشبية | WONLY", description: "أبواب مداخل WONLY تشمل أبواب أمان من الألمنيوم المصبوب وأبواباً داخلية هادئة من الفولاذ والخشب، مع تصنيع OEM/ODM للموزعين والمشاريع." },
    eyebrow: "أبواب المداخل", title: "الباب الذي يفتح كل الاحتمالات", sub: "من أبواب الأمان المصنوعة من الألمنيوم المصبوب إلى الأبواب الداخلية الهادئة، تصنع WONLY منظومة المدخل كاملة: حماية في الخارج وهدوء في الداخل.",
    highlights: ["أبواب أمان وداخلية من مصنع واحد", "مقاومة للحريق والسرقة وعازلة للصوت", "أكثر من 3 ملايين باب سنوياً من خطوطنا"],
    seriesEyebrow: "عائلتان من الأبواب", seriesTitle: "اختر مدخلك", series: [{ name: "أبواب الأمان", tag: "خارجي", description: "أبواب ألمنيوم مصبوب بقفل ذاتي واستشعار متعدد الاتجاهات لمحاولات الاقتحام." }, { name: "الأبواب الخشبية", tag: "داخلي", description: "أبواب هادئة من الفولاذ والخشب، مصممة لمقاومة الترهل والالتواء." }],
    featuresEyebrow: "هندسة متكاملة", featuresTitle: "حماية وهدوء وحرفية", features: [{ title: "أمان متعدد الاتجاهات", description: "مستشعرات تكتشف الكسر والخلع والحفر وفتح القفل وترسل تنبيهاً فورياً." }, { title: "مقاومة حريق 90 دقيقة", description: "أبواب خارجية وفق EN 1634 تحافظ على السلامة والعزل لمدة 90 دقيقة." }, { title: "قفل ذكي ذاتي", description: "قفل بيومتري مدعوم بالذكاء الاصطناعي مع تحكم بالتطبيق وحماية من العبث." }, { title: "عزل صوتي", description: "هياكل إحكام متدرجة وألواح سميكة لراحة هادئة داخل المبنى وخارجه." }, { title: "مقاومة للترهل والالتواء", description: "إطارات مدعمة بالفولاذ وألواح مزدوجة تحافظ على شكل الباب طوال عمره." }, { title: "صحة بيئية ENF", description: "أبواب داخلية دون غراء أو غبار ومتوافقة مع معيار ENF منخفض الفورمالديهايد." }],
    bandEyebrow: "تصنيع داخلي", bandTitle: "ملايين الأبواب سنوياً على خطوطنا الخاصة", ctaTitle: "أدخل أبواب WONLY إلى سوقك", ctaSub: "للأمان أو الداخل، للسكن أو المشروع: اطلب الكتالوج والعينات والأسعار.",
  },
  fr: {
    seo: { title: "Fabricant de portes d’entrée sécurisées et en bois | WONLY", description: "Les portes d’entrée WONLY réunissent portes de sécurité en aluminium moulé et portes intérieures silencieuses acier-bois, avec OEM/ODM pour distributeurs et projets." },
    eyebrow: "Portes d’entrée", title: "La porte qui ouvre toutes les possibilités", sub: "Des portes de sécurité en aluminium moulé aux portes intérieures silencieuses acier-bois, WONLY fabrique l’entrée complète : protection dehors, calme dedans.",
    highlights: ["Portes de sécurité et intérieures sous un même toit", "Résistance au feu, à l’effraction et isolation acoustique", "Plus de 3 millions de portes par an sur nos lignes"],
    seriesEyebrow: "Deux familles de portes", seriesTitle: "Choisissez votre entrée", series: [{ name: "Portes de sécurité", tag: "Extérieur", description: "Portes en aluminium moulé avec verrouillage autonome et détection multidirectionnelle des intrusions." }, { name: "Portes en bois", tag: "Intérieur", description: "Portes silencieuses acier-bois, conçues pour ne jamais s’affaisser ni se déformer." }],
    featuresEyebrow: "Conçu dès l’origine", featuresTitle: "Protection, silence et savoir-faire", features: [{ title: "Sécurité multidirectionnelle", description: "Des capteurs détectent forçage, levier, perçage et crochetage, puis alertent immédiatement." }, { title: "Résistance au feu 90 minutes", description: "Les portes extérieures EN 1634 conservent intégrité et isolation pendant 90 minutes." }, { title: "Verrouillage intelligent autonome", description: "Verrouillage biométrique piloté par IA, application mobile et architecture anti-sabotage." }, { title: "Isolation acoustique", description: "Joints étagés et vantaux épais assurent un calme de niveau hôtelier." }, { title: "Sans affaissement ni déformation", description: "Cadres renforcés en acier et vantaux à double ossature gardent leur forme durablement." }, { title: "Éco-santé ENF", description: "Portes intérieures sans colle ni poussière, conformes à la norme ENF sur le formaldéhyde." }],
    bandEyebrow: "Fabrication intégrée", bandTitle: "Des millions de portes par an sur nos propres lignes", ctaTitle: "Introduisez les portes WONLY sur votre marché", ctaSub: "Sécurité ou intérieur, résidentiel ou projet : demandez catalogue, échantillons et prix.",
  },
  ru: {
    seo: { title: "Производитель входных защитных и деревянных дверей | WONLY", description: "Входные двери WONLY: защитные двери из литого алюминия и тихие стально-деревянные межкомнатные двери. OEM/ODM для дистрибьюторов и проектов." },
    eyebrow: "Входные двери", title: "Дверь, открывающая все возможности", sub: "От защитных дверей из литого алюминия до тихих стально-деревянных дверей — WONLY производит весь входной комплекс: защита снаружи и тишина внутри.",
    highlights: ["Защитные и интерьерные двери на одном производстве", "Огнестойкость, защита от взлома и шумоизоляция", "Более 3 миллионов дверей в год на собственных линиях"],
    seriesEyebrow: "Две категории дверей", seriesTitle: "Выберите свой вход", series: [{ name: "Защитные двери", tag: "Наружные", description: "Двери из литого алюминия с автономным запиранием и многовекторным обнаружением вторжения." }, { name: "Деревянные двери", tag: "Интерьерные", description: "Тихие стально-деревянные двери, устойчивые к провисанию и деформации." }],
    featuresEyebrow: "Заложено конструкцией", featuresTitle: "Защита, тишина и мастерство", features: [{ title: "Многовекторная защита", description: "Датчики обнаруживают взлом, отжим, сверление и вскрытие замка и мгновенно оповещают." }, { title: "Огнестойкость 90 минут", description: "Наружные двери по EN 1634 сохраняют целостность и теплоизоляцию 90 минут." }, { title: "Автономное умное запирание", description: "Биометрический замок с ИИ, управлением через приложение и защитой от вмешательства." }, { title: "Шумоизоляция", description: "Ступенчатые уплотнения и толстые полотна обеспечивают тишину гостиничного уровня." }, { title: "Без провисания и деформации", description: "Стальные усиленные рамы и двойной каркас сохраняют форму двери весь срок службы." }, { title: "Экологичность ENF", description: "Межкомнатные двери без клея и пыли, соответствующие стандарту ENF по формальдегиду." }],
    bandEyebrow: "Собственное производство", bandTitle: "Миллионы дверей в год на собственных линиях", ctaTitle: "Выведите входные двери WONLY на свой рынок", ctaSub: "Защитные или интерьерные, жилые или проектные — запросите каталог, образцы и цены.",
  },
  es: {
    seo: { title: "Fabricante de puertas de entrada de seguridad y madera | WONLY", description: "Puertas de entrada WONLY: seguridad en aluminio fundido y puertas interiores silenciosas de acero y madera, con OEM/ODM para distribuidores y proyectos." },
    eyebrow: "Puertas de entrada", title: "La puerta que abre todas las posibilidades", sub: "Desde puertas de seguridad de aluminio fundido hasta puertas interiores silenciosas de acero y madera, WONLY fabrica toda la entrada: protección fuera y calma dentro.",
    highlights: ["Puertas de seguridad e interiores en una misma fábrica", "Resistencia al fuego, antirrobo y aislamiento acústico", "Más de 3 millones de puertas al año en líneas propias"],
    seriesEyebrow: "Dos familias de puertas", seriesTitle: "Elija su entrada", series: [{ name: "Puertas de seguridad", tag: "Exterior", description: "Puertas de aluminio fundido con cierre autónomo y detección multidireccional de intrusiones." }, { name: "Puertas de madera", tag: "Interior", description: "Puertas silenciosas de acero y madera, diseñadas para no ceder ni deformarse." }],
    featuresEyebrow: "Ingeniería integrada", featuresTitle: "Protección, silencio y artesanía", features: [{ title: "Seguridad multidireccional", description: "Sensores detectan fuerza, palanca, perforación y ganzuado y envían alertas inmediatas." }, { title: "Resistencia al fuego de 90 minutos", description: "Las puertas exteriores EN 1634 mantienen integridad y aislamiento durante 90 minutos." }, { title: "Cierre inteligente autónomo", description: "Cierre biométrico con IA, control por aplicación y arquitectura antisabotaje." }, { title: "Aislamiento acústico", description: "Sellos escalonados y hojas gruesas ofrecen silencio de nivel hotelero." }, { title: "Sin hundimiento ni deformación", description: "Marcos reforzados con acero y hojas de doble estructura conservan su forma." }, { title: "Salud ecológica ENF", description: "Puertas interiores sin cola ni polvo, conformes con el estándar ENF de formaldehído." }],
    bandEyebrow: "Fabricación propia", bandTitle: "Millones de puertas al año en nuestras propias líneas", ctaTitle: "Lleve las puertas WONLY a su mercado", ctaSub: "Seguridad o interior, residencial o proyecto: solicite catálogo, muestras y precios.",
  },
};

export function localizeEntranceDoor(data: ProductPageData, locale: Locale): ProductPageData {
  const c = ENTRANCE[locale];
  if (!c) return data;
  return {
    ...data,
    seo: { ...data.seo, ...c.seo },
    hero: { ...data.hero, eyebrow: c.eyebrow, title: c.title, sub: c.sub },
    highlights: c.highlights,
    seriesEyebrow: c.seriesEyebrow,
    seriesTitle: c.seriesTitle,
    series: data.series.map((item, index) => ({ ...item, name: c.series[index]?.name ?? item.name, tag: c.series[index]?.tag ?? item.tag, d: c.series[index]?.description ?? item.d })),
    featuresEyebrow: c.featuresEyebrow,
    featuresTitle: c.featuresTitle,
    features: data.features.map((item, index) => ({ ...item, t: c.features[index]?.title ?? item.t, d: c.features[index]?.description ?? item.d })),
    band: { ...data.band, eyebrow: c.bandEyebrow, title: c.bandTitle },
    cta: { title: c.ctaTitle, sub: c.ctaSub },
  };
}

const SECURITY_TEXT: Partial<Record<Locale, Record<string, string>>> = {
  ar: {
    "SEO Title": "مصنّع أبواب أمان وأبواب مقاومة للحريق | WONLY", "SEO Description": "WONLY مصنّع ومورّد OEM/ODM لأبواب الأمان: أبواب روبوتية وأبواب EN 1634 مقاومة للحريق 90 دقيقة وأبواب طبية وفاخرة للموزعين والمشاريع.",
    "Security Doors · Since 1996": "أبواب أمان · منذ 1996", "Engineered to": "مصممة من أجل", "defend": "حماية", "every entry": "كل مدخل", "Hero Description": "من الأبواب الروبوتية الرائدة إلى سلاسل المشاريع المقاومة للحريق، حماية معتمدة وجاهزة للمشاريع السكنية والتجارية والمؤسسية حول العالم.", "View the Range": "عرض المجموعة",
    "The Range": "المجموعة", "Six Series. Every Grade And Scenario": "ست سلاسل لكل درجة وكل سيناريو", "Range Description": "تغطي درجات الأمان ومقاومة الحريق والتطبيقات المختلفة، بدعم أكثر من 1,000 براءة اختراع و30 عاماً من الهندسة.", "Core Technology": "التقنية الأساسية", "Six Layers Of Defense, In Every Door": "ست طبقات دفاع في كل باب", "Tested to Destruction": "اختبارات حتى أقصى الحدود", "Certified In Our Own Labs Before It Ships": "يُعتمد في مختبراتنا قبل الشحن", Specifications: "المواصفات", "Technical Excellence, To Spec": "تفوق تقني وفق المواصفات", Applications: "التطبيقات", "Built For Every Space": "مصمم لكل مساحة", "Held To The Highest Security Standards": "ملتزم بأعلى معايير الأمان",
  },
  fr: {
    "SEO Title": "Fabricant de portes de sécurité et coupe-feu | WONLY", "SEO Description": "WONLY fabrique des portes de sécurité OEM/ODM : modèles robotisés, portes EN 1634 coupe-feu 90 minutes, médicales et haut de gamme pour distributeurs et projets.",
    "Security Doors · Since 1996": "Portes de sécurité · Depuis 1996", "Engineered to": "Conçues pour", defend: "défendre", "every entry": "chaque entrée", "Hero Description": "Des portes robotisées phares aux séries techniques coupe-feu, une sécurité certifiée et prête pour les projets résidentiels, commerciaux et institutionnels.", "View the Range": "Voir la gamme",
    "The Range": "La gamme", "Six Series. Every Grade And Scenario": "Six séries pour chaque niveau et chaque usage", "Range Description": "Toutes les classes de sécurité, résistances au feu et applications, soutenues par plus de 1 000 brevets et 30 ans d’ingénierie.", "Core Technology": "Technologie centrale", "Six Layers Of Defense, In Every Door": "Six couches de défense dans chaque porte", "Tested to Destruction": "Testé jusqu’aux limites", "Certified In Our Own Labs Before It Ships": "Certifié dans nos laboratoires avant expédition", Specifications: "Spécifications", "Technical Excellence, To Spec": "Excellence technique conforme au cahier des charges", Applications: "Applications", "Built For Every Space": "Conçu pour chaque espace", "Held To The Highest Security Standards": "Conforme aux normes de sécurité les plus élevées",
  },
  ru: {
    "SEO Title": "Производитель защитных и противопожарных дверей | WONLY", "SEO Description": "WONLY производит защитные двери OEM/ODM: роботизированные модели, двери EN 1634 с огнестойкостью 90 минут, медицинские и премиальные серии для проектов.",
    "Security Doors · Since 1996": "Защитные двери · С 1996 года", "Engineered to": "Созданы, чтобы", defend: "защищать", "every entry": "каждый вход", "Hero Description": "От флагманских роботизированных дверей до противопожарных инженерных серий — сертифицированная защита для жилых, коммерческих и общественных проектов.", "View the Range": "Смотреть серии",
    "The Range": "Модельный ряд", "Six Series. Every Grade And Scenario": "Шесть серий для каждого класса и сценария", "Range Description": "Все классы безопасности, показатели огнестойкости и области применения — более 1 000 патентов и 30 лет инженерного опыта.", "Core Technology": "Ключевые технологии", "Six Layers Of Defense, In Every Door": "Шесть уровней защиты в каждой двери", "Tested to Destruction": "Испытано на пределе", "Certified In Our Own Labs Before It Ships": "Сертификация в собственных лабораториях до отгрузки", Specifications: "Характеристики", "Technical Excellence, To Spec": "Техническое совершенство по спецификации", Applications: "Применение", "Built For Every Space": "Для каждого пространства", "Held To The Highest Security Standards": "Соответствие высшим стандартам безопасности",
  },
  es: {
    "SEO Title": "Fabricante de puertas de seguridad y cortafuego | WONLY", "SEO Description": "WONLY fabrica puertas de seguridad OEM/ODM: modelos robotizados, puertas EN 1634 resistentes al fuego 90 minutos, médicas y de lujo para distribuidores y proyectos.",
    "Security Doors · Since 1996": "Puertas de seguridad · Desde 1996", "Engineered to": "Diseñadas para", defend: "proteger", "every entry": "cada entrada", "Hero Description": "Desde puertas robotizadas insignia hasta series técnicas cortafuego, seguridad certificada para proyectos residenciales, comerciales e institucionales.", "View the Range": "Ver la gama",
    "The Range": "La gama", "Six Series. Every Grade And Scenario": "Seis series para cada nivel y escenario", "Range Description": "Todos los grados de seguridad, resistencias al fuego y aplicaciones, respaldados por más de 1.000 patentes y 30 años de ingeniería.", "Core Technology": "Tecnología central", "Six Layers Of Defense, In Every Door": "Seis capas de defensa en cada puerta", "Tested to Destruction": "Probado hasta el límite", "Certified In Our Own Labs Before It Ships": "Certificado en nuestros laboratorios antes del envío", Specifications: "Especificaciones", "Technical Excellence, To Spec": "Excelencia técnica según especificación", Applications: "Aplicaciones", "Built For Every Space": "Diseñado para cada espacio", "Held To The Highest Security Standards": "Conforme con los estándares de seguridad más exigentes",
  },
};

export function securityDoorText(locale: Locale, text: string): string {
  return SECURITY_TEXT[locale]?.[text] ?? text;
}
