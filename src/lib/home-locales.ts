import type { Locale } from "./i18n";

export type HomeCopy = {
  hero: { eyebrow: string; line1: string; line2: string; line3: string; subtitle: string; scroll: string };
  reveal: { line1: string; line2: string };
  why: { eyebrow: string; title: string; subtitle: string };
  partnership: { eyebrow: string; title: string };
  contact: { eyebrow: string; line1: string; line2: string; subtitle: string };
};

const COPY: Partial<Record<Locale, HomeCopy>> = {
  ar: {
    hero: { eyebrow: "أبواب أمان · أقفال ذكية · تصنيع OEM/ODM", line1: "افتح الباب", line2: "إلى سوقك", line3: "القادم", subtitle: "مصنّع موثوق للأبواب الأمنية الفاخرة والأقفال الذكية، يخدم الموزعين والمشاريع حول العالم.", scroll: "مرر للدخول" },
    reveal: { line1: "منظومة أمن ذكي", line2: "برؤية عالمية" },
    why: { eyebrow: "لماذا WONLY", title: "شريك قادر على التوسع وموثوق على أعلى مستوى", subtitle: "ثلاثة عقود من قوة التصنيع ومسؤولية الشركة المدرجة والريادة الوطنية تدعم كل باب من WONLY." },
    partnership: { eyebrow: "شارك WONLY", title: "افتح الباب لشراكة جديدة" },
    contact: { eyebrow: "احصل على حل وعرض سعر", line1: "هل أنت مستعد لفتح", line2: "سوقك؟", subtitle: "أخبرنا عن مشروعك أو منطقتك، وسيرد فريقنا خلال 24 ساعة بالمواصفات ووثائق المطابقة والأسعار." },
  },
  fr: {
    hero: { eyebrow: "Portes de sécurité · Serrures intelligentes · OEM/ODM", line1: "Ouvrez la porte", line2: "à votre", line3: "prochain marché", subtitle: "Fabricant de confiance de portes de sécurité haut de gamme et de serrures intelligentes pour distributeurs et projets internationaux.", scroll: "Faire défiler pour entrer" },
    reveal: { line1: "Écosystème mondial", line2: "de sécurité intelligente" },
    why: { eyebrow: "Pourquoi WONLY", title: "Un partenaire dimensionné pour grandir, reconnu au plus haut niveau", subtitle: "Trois décennies de puissance industrielle, de responsabilité boursière et de leadership national soutiennent chaque porte WONLY." },
    partnership: { eyebrow: "Devenez partenaire de WONLY", title: "Ouvrez la porte à un partenariat" },
    contact: { eyebrow: "Solutions et devis", line1: "Prêt à ouvrir", line2: "votre marché ?", subtitle: "Présentez-nous votre projet ou votre territoire : notre équipe répond sous 24 heures avec spécifications, conformité et prix adaptés." },
  },
  ru: {
    hero: { eyebrow: "Защитные двери · Умные замки · OEM/ODM", line1: "Откройте дверь", line2: "на ваш", line3: "новый рынок", subtitle: "Надёжный производитель премиальных защитных дверей и умных замков для дистрибьюторов и проектов по всему миру.", scroll: "Прокрутите, чтобы войти" },
    reveal: { line1: "Глобальная экосистема", line2: "умной безопасности" },
    why: { eyebrow: "Почему WONLY", title: "Партнёр для масштабного роста, которому доверяют лидеры", subtitle: "Тридцать лет производственного опыта, публичная ответственность и лидерство в отрасли стоят за каждой дверью WONLY." },
    partnership: { eyebrow: "Партнёрство с WONLY", title: "Откройте дверь к сотрудничеству" },
    contact: { eyebrow: "Решение и предложение", line1: "Готовы открыть", line2: "свой рынок?", subtitle: "Расскажите о проекте или регионе — наша команда ответит в течение 24 часов и подготовит спецификации, документы и цены." },
  },
  es: {
    hero: { eyebrow: "Puertas de seguridad · Cerraduras inteligentes · OEM/ODM", line1: "Abra la puerta", line2: "a su", line3: "próximo mercado", subtitle: "Fabricante de confianza de puertas de seguridad prémium y cerraduras inteligentes para distribuidores y proyectos de todo el mundo.", scroll: "Desplácese para entrar" },
    reveal: { line1: "Ecosistema global", line2: "de seguridad inteligente" },
    why: { eyebrow: "Por qué WONLY", title: "Un socio preparado para crecer y respaldado al más alto nivel", subtitle: "Tres décadas de capacidad industrial, responsabilidad bursátil y liderazgo nacional respaldan cada puerta WONLY." },
    partnership: { eyebrow: "Asóciese con WONLY", title: "Abra la puerta a una alianza" },
    contact: { eyebrow: "Soluciones y cotización", line1: "¿Listo para abrir", line2: "su mercado?", subtitle: "Cuéntenos sobre su proyecto o territorio; nuestro equipo responde en 24 horas con especificaciones, documentación y precios adaptados." },
  },
};

export function homeCopy(locale: Locale, english: HomeCopy): HomeCopy {
  return COPY[locale] ?? english;
}

const SECTION_TEXT: Partial<Record<Locale, Record<string, string>>> = {
  ar: {
    Manufacturing: "التصنيع", "Built In Our Own 5G-Connected Smart Factories": "مصنّع في مصانعنا الذكية المتصلة بتقنية 5G", "Watch the Factory Tour": "شاهد جولة المصنع",
    "Our Products": "منتجاتنا", "Built For Every Opening": "حل لكل فتحة", "Explore Products": "استكشف المنتجات", Discover: "اكتشف",
    "Landmark Projects": "مشاريع بارزة", "Chosen For The Projects That Cannot Fail": "الخيار للمشاريع التي لا تحتمل الفشل",
    "Certified & Recognized": "معتمد ومعترف به", "Held To Standards, Honored At The Top": "ملتزم بالمعايير وحائز على أرفع الجوائز", "Design Awards": "جوائز التصميم", Certifications: "الشهادات",
    "Our Journey": "مسيرتنا", "A Thirty-Year Journey": "مسيرة ثلاثين عاماً", "Global Footprint": "انتشار عالمي", "We Spread Around The World": "ننتشر حول العالم", "From Yongkang, Zhejiang to distributors and projects in 60+ countries and regions — backed by five manufacturing bases and six R&D centers.": "من يونغكانغ في تشجيانغ إلى موزعين ومشاريع في أكثر من 60 دولة ومنطقة، بدعم من خمس قواعد تصنيع وستة مراكز للبحث والتطوير.", "Countries & Regions": "دول ومناطق", "Manufacturing Bases": "قواعد تصنيع", "R&D Centers": "مراكز بحث وتطوير", "Users Worldwide": "مستخدمون حول العالم", "Trusted Across Industries": "ثقة عبر القطاعات", "Trusted By Tech & Real-Estate Leaders": "موثوق لدى رواد التقنية والعقارات", "Trusted by China's Leading Developers": "موثوق لدى كبار المطورين في الصين",
  },
  fr: {
    Manufacturing: "Fabrication", "Built In Our Own 5G-Connected Smart Factories": "Fabriqué dans nos propres usines intelligentes connectées en 5G", "Watch the Factory Tour": "Visiter l’usine en vidéo",
    "Our Products": "Nos produits", "Built For Every Opening": "Une solution pour chaque ouverture", "Explore Products": "Découvrir les produits", Discover: "Découvrir",
    "Landmark Projects": "Projets emblématiques", "Chosen For The Projects That Cannot Fail": "Choisi pour les projets où l’échec n’est pas permis",
    "Certified & Recognized": "Certifié et reconnu", "Held To Standards, Honored At The Top": "Conforme aux normes, récompensé au plus haut niveau", "Design Awards": "Prix de design", Certifications: "Certifications",
    "Our Journey": "Notre parcours", "A Thirty-Year Journey": "Trente ans de parcours", "Global Footprint": "Présence mondiale", "We Spread Around The World": "Une présence dans le monde entier", "From Yongkang, Zhejiang to distributors and projects in 60+ countries and regions — backed by five manufacturing bases and six R&D centers.": "De Yongkang, dans le Zhejiang, à des distributeurs et projets dans plus de 60 pays et régions, avec cinq bases de production et six centres de R&D.", "Countries & Regions": "Pays et régions", "Manufacturing Bases": "Bases de production", "R&D Centers": "Centres de R&D", "Users Worldwide": "Utilisateurs dans le monde", "Trusted Across Industries": "La confiance de multiples secteurs", "Trusted By Tech & Real-Estate Leaders": "La confiance des leaders de la technologie et de l’immobilier", "Trusted by China's Leading Developers": "La confiance des principaux promoteurs chinois",
  },
  ru: {
    Manufacturing: "Производство", "Built In Our Own 5G-Connected Smart Factories": "Производство на собственных умных заводах с подключением 5G", "Watch the Factory Tour": "Посмотреть экскурсию по заводу",
    "Our Products": "Наша продукция", "Built For Every Opening": "Решение для каждого проёма", "Explore Products": "Смотреть продукцию", Discover: "Подробнее",
    "Landmark Projects": "Знаковые проекты", "Chosen For The Projects That Cannot Fail": "Выбор для проектов, где нельзя допустить ошибку",
    "Certified & Recognized": "Сертификация и признание", "Held To Standards, Honored At The Top": "Соответствие стандартам и высшие награды", "Design Awards": "Награды за дизайн", Certifications: "Сертификаты",
    "Our Journey": "Наш путь", "A Thirty-Year Journey": "Тридцать лет развития", "Global Footprint": "Глобальное присутствие", "We Spread Around The World": "Мы работаем по всему миру", "From Yongkang, Zhejiang to distributors and projects in 60+ countries and regions — backed by five manufacturing bases and six R&D centers.": "От Юнкана в провинции Чжэцзян до дистрибьюторов и проектов более чем в 60 странах и регионах при поддержке пяти производственных баз и шести центров НИОКР.", "Countries & Regions": "Страны и регионы", "Manufacturing Bases": "Производственные базы", "R&D Centers": "Центры НИОКР", "Users Worldwide": "Пользователи по всему миру", "Trusted Across Industries": "Нам доверяют разные отрасли", "Trusted By Tech & Real-Estate Leaders": "Нам доверяют лидеры технологий и недвижимости", "Trusted by China's Leading Developers": "Нам доверяют ведущие застройщики Китая",
  },
  es: {
    Manufacturing: "Fabricación", "Built In Our Own 5G-Connected Smart Factories": "Fabricado en nuestras propias fábricas inteligentes conectadas por 5G", "Watch the Factory Tour": "Ver recorrido de la fábrica",
    "Our Products": "Nuestros productos", "Built For Every Opening": "Una solución para cada abertura", "Explore Products": "Explorar productos", Discover: "Descubrir",
    "Landmark Projects": "Proyectos emblemáticos", "Chosen For The Projects That Cannot Fail": "Elegido para proyectos donde no se puede fallar",
    "Certified & Recognized": "Certificado y reconocido", "Held To Standards, Honored At The Top": "Cumplimos normas y recibimos el máximo reconocimiento", "Design Awards": "Premios de diseño", Certifications: "Certificaciones",
    "Our Journey": "Nuestra trayectoria", "A Thirty-Year Journey": "Treinta años de trayectoria", "Global Footprint": "Presencia global", "We Spread Around The World": "Estamos presentes en todo el mundo", "From Yongkang, Zhejiang to distributors and projects in 60+ countries and regions — backed by five manufacturing bases and six R&D centers.": "Desde Yongkang, Zhejiang, hasta distribuidores y proyectos en más de 60 países y regiones, respaldados por cinco bases de fabricación y seis centros de I+D.", "Countries & Regions": "Países y regiones", "Manufacturing Bases": "Bases de fabricación", "R&D Centers": "Centros de I+D", "Users Worldwide": "Usuarios en todo el mundo", "Trusted Across Industries": "Confianza en múltiples sectores", "Trusted By Tech & Real-Estate Leaders": "La confianza de líderes tecnológicos e inmobiliarios", "Trusted by China's Leading Developers": "La confianza de los principales promotores de China",
  },
};

const PRODUCT_DESCRIPTIONS: Partial<Record<Locale, string[]>> = {
  ar: ["أبواب معدنية وخشبية لحماية مداخل المباني وتوفير الهدوء الداخلي.", "أقفال بيومترية ذكية للدخول دون لمس والتحكم المشفر في الوصول.", "أنظمة ألمنيوم محكمة العزل تغلق تلقائياً عند الرياح والمطر.", "منظومة واحدة تربط الأبواب والأقفال والنوافذ ضمن منزل ذكي متكامل."],
  fr: ["Portes métalliques et en bois pour protéger chaque entrée tout en préservant le calme intérieur.", "Serrures biométriques intelligentes avec accès mains libres et contrôle chiffré.", "Systèmes aluminium étanches, isolants et capables de se fermer automatiquement par vent ou pluie.", "Un écosystème reliant portes, serrures et fenêtres dans une couche domotique unique."],
  ru: ["Металлические и деревянные двери для защиты входа и комфорта внутри здания.", "Биометрические замки с бесконтактным входом и зашифрованным контролем доступа.", "Герметичные алюминиевые системы с теплоизоляцией и автозакрытием при ветре и дожде.", "Единая экосистема, объединяющая двери, замки и окна в систему умного дома."],
  es: ["Puertas metálicas y de madera que protegen la entrada y preservan el confort interior.", "Cerraduras biométricas con acceso manos libres y control de acceso cifrado.", "Sistemas de aluminio herméticos, aislantes y con cierre automático ante viento o lluvia.", "Un ecosistema que conecta puertas, cerraduras y ventanas en una sola capa de hogar inteligente."],
};

type PartnershipCopy = { title: string; description: string; cta: string };
const PARTNERSHIP_COPY: Partial<Record<Locale, PartnershipCopy[]>> = {
  ar: [
    { title: "برنامج الموزعين", description: "انضم إلى شبكة عالمية مدعومة بخبرة علامة تمتد 30 عاماً وتدريب كامل ودعم تسويقي إقليمي.", cta: "كن موزعاً" },
    { title: "التعاون في المشاريع", description: "حلول للمشاريع السكنية والتجارية والطبية والفندقية والحكومية والعامة.", cta: "قدّم مشروعاً" },
    { title: "خدمات OEM / ODM", description: "استفد من مصانعنا الذكية وأكثر من 1,000 براءة اختراع لبناء خط أمان بعلامتك التجارية.", cta: "اطلب ملف OEM/ODM" },
    { title: "شبكة توزيع عالمية", description: "مقار إقليمية ومكاتب محلية وشركاء معتمدون في الشرق الأوسط وجنوب شرق آسيا وآسيا الوسطى.", cta: "ابحث عن شريك محلي" },
  ],
  fr: [
    { title: "Programme distributeurs", description: "Rejoignez un réseau mondial soutenu par 30 ans de marque, une formation complète et un appui marketing régional.", cta: "Devenir distributeur" },
    { title: "Coopération projets", description: "Solutions pour les projets résidentiels, commerciaux, médicaux, hôteliers, publics et gouvernementaux.", cta: "Soumettre un projet" },
    { title: "Services OEM / ODM", description: "Appuyez-vous sur nos usines intelligentes et plus de 1 000 brevets pour créer votre propre gamme de sécurité.", cta: "Demander le dossier OEM/ODM" },
    { title: "Réseau mondial de distribution", description: "Sièges régionaux, bureaux locaux et partenaires agréés au Moyen-Orient, en Asie du Sud-Est et en Asie centrale.", cta: "Trouver un partenaire local" },
  ],
  ru: [
    { title: "Дистрибьюторская программа", description: "Присоединяйтесь к глобальной сети с 30-летним брендом, обучением по продукции и региональной маркетинговой поддержкой.", cta: "Стать дистрибьютором" },
    { title: "Проектное сотрудничество", description: "Решения для жилых, коммерческих, медицинских, гостиничных, государственных и общественных проектов.", cta: "Предложить проект" },
    { title: "Услуги OEM / ODM", description: "Используйте наши умные заводы и более 1 000 патентов для создания собственной линейки безопасности.", cta: "Запросить материалы OEM/ODM" },
    { title: "Глобальная сеть дистрибуции", description: "Региональные офисы и авторизованные партнёры на Ближнем Востоке, в Юго-Восточной и Центральной Азии.", cta: "Найти местного партнёра" },
  ],
  es: [
    { title: "Programa de distribuidores", description: "Únase a una red global respaldada por 30 años de marca, formación de producto y apoyo de marketing regional.", cta: "Ser distribuidor" },
    { title: "Cooperación en proyectos", description: "Soluciones para proyectos residenciales, comerciales, médicos, hoteleros, gubernamentales y públicos.", cta: "Presentar un proyecto" },
    { title: "Servicios OEM / ODM", description: "Aproveche nuestras fábricas inteligentes y más de 1.000 patentes para crear su propia línea de seguridad.", cta: "Solicitar información OEM/ODM" },
    { title: "Red global de distribución", description: "Sedes regionales, oficinas locales y socios autorizados en Oriente Medio, Sudeste Asiático y Asia Central.", cta: "Encontrar un socio local" },
  ],
};

export function homeSectionText(locale: Locale, text: string): string {
  return SECTION_TEXT[locale]?.[text] ?? text;
}

export function homeProductDescription(locale: Locale, index: number, fallback: string): string {
  return PRODUCT_DESCRIPTIONS[locale]?.[index] ?? fallback;
}

export function homePartnership(locale: Locale, index: number, fallback: PartnershipCopy): PartnershipCopy {
  return PARTNERSHIP_COPY[locale]?.[index] ?? fallback;
}
