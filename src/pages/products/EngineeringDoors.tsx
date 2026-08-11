import { Flame, Lock, Volume2, Globe, Layers, ShieldCheck } from "lucide-react";
import { BASE } from "@/lib/site-ui";
import { ProductPage, type ProductPageData } from "@/lib/product-page";
import { useLocale, type Locale } from "@/lib/i18n";

const data: ProductPageData = {
  seo: {
    title: "Engineering Doors — Fire, Access-Control & Acoustic | WONLY",
    description: "WONLY engineering doors for projects: EN 1634 90-minute fire doors, access-control and acoustic variants — compliant with Gulf, Southeast Asia and Central Asia standards, supplied at scale.",
    path: "/products/engineering-doors",
  },
  hero: {
    eyebrow: "Engineering Doors",
    title: <>Certified for<br /><span style={{ color: "#D4C4A0" }}>every</span> code</>,
    sub: "Fire, access-control and acoustic doors compliant with Gulf, Southeast Asia and Central Asia standards — standardized and supplied at project scale.",
    img: `${BASE}images/alu-t200.webp`,
    mode: "render",
  },
  highlights: ["EN 1634 — 90-minute fire integrity", "Access-control & acoustic variants", "Standardized, certified project supply"],
  featuresEyebrow: "Project-Ready",
  featuresTitle: "One Supplier For The Whole Spec",
  features: [
    { icon: Flame, t: "Fire Doors", d: "EN 1634-rated with 90-minute integrity for life-safety compliance." },
    { icon: Lock, t: "Access-Control Doors", d: "Card, biometric and controller-ready systems for managed entrances." },
    { icon: Volume2, t: "Acoustic Doors", d: "STC-rated cores for hospitals, hotels, offices and residential corridors." },
    { icon: Globe, t: "Global Standards", d: "Compliant with Saudi, Southeast Asia and Central Asia codes." },
    { icon: Layers, t: "Project-Scale Supply", d: "Standardized, certified volume for large developments and tenders." },
    { icon: ShieldCheck, t: "Tested & Certified", d: "Every model passes in-house destructive testing before it ships." },
  ],
  band: { img: `${BASE}images/proj-1.webp`, eyebrow: "Landmark Projects", title: "Chosen For The Projects That Cannot Fail" },
  specs: [
    ["Fire Rating", "EN 1634 — up to 90 minutes"],
    ["Types", "Fire · Access-control · Acoustic"],
    ["Material", "Steel / cast-aluminum core"],
    ["Compliance", "Gulf · SE Asia · Central Asia standards"],
    ["Supply", "Standardized, project-scale volume"],
    ["Certification", "ISO 9001 · CE · UL · EN 1634"],
  ],
  cta: { title: "Specify WONLY On Your Next Project", sub: "Send your fire, access-control and acoustic requirements — we reply with compliance docs and pricing." },
};

const COPY:Partial<Record<Locale,{seo:[string,string];eye:string;title:string;sub:string;highlights:string[];featureEye:string;featureTitle:string;features:[string,string][];band:[string,string];specs:string[];cta:[string,string]}>>={
 ar:{seo:["أبواب هندسية للحريق والتحكم بالدخول والعزل الصوتي | WONLY","أبواب هندسية للمشاريع بمقاومة حريق EN 1634 لمدة 90 دقيقة وخيارات للتحكم بالدخول والعزل الصوتي وفق معايير الخليج وآسيا."],eye:"أبواب هندسية",title:"معتمدة لكل معيار",sub:"أبواب للحريق والتحكم بالدخول والعزل الصوتي متوافقة مع معايير الخليج وجنوب شرق ووسط آسيا وموردة بكميات المشاريع.",highlights:["سلامة حريق EN 1634 لمدة 90 دقيقة","خيارات للتحكم بالدخول والعزل الصوتي","توريد مشاريع موحد ومعتمد"],featureEye:"جاهزة للمشاريع",featureTitle:"مورد واحد لكل المواصفات",features:[["أبواب مقاومة للحريق","EN 1634 بسلامة 90 دقيقة لمتطلبات حماية الأرواح."],["أبواب تحكم بالدخول","بطاقات وقياسات حيوية وتجهيز للأنظمة المركزية."],["أبواب عازلة للصوت","قلوب STC للمستشفيات والفنادق والمكاتب والممرات."],["معايير عالمية","متوافقة مع أكواد السعودية وجنوب شرق ووسط آسيا."],["توريد على نطاق المشاريع","كميات موحدة ومعتمدة للتطويرات والمناقصات."],["مختبرة ومعتمدة","اختبارات إتلاف داخلية لكل طراز قبل الشحن."]],band:["مشاريع بارزة","مختارة للمشاريع التي لا تحتمل الفشل"],specs:["مقاومة الحريق","الأنواع","المادة","المطابقة","التوريد","الشهادات"],cta:["اعتمد WONLY في مشروعك القادم","أرسل متطلبات الحريق والتحكم بالدخول والعزل لنقدم الوثائق والأسعار."]},
 fr:{seo:["Portes techniques coupe-feu, contrôle d’accès et acoustiques | WONLY","Portes techniques WONLY pour projets : EN 1634 90 minutes, contrôle d’accès et acoustique, conformes aux normes du Golfe et d’Asie."],eye:"Portes techniques",title:"Certifiées pour chaque code",sub:"Portes coupe-feu, contrôle d’accès et acoustiques conformes aux normes du Golfe, d’Asie du Sud-Est et centrale, fournies à l’échelle projet.",highlights:["Intégrité feu EN 1634 de 90 minutes","Variantes contrôle d’accès et acoustiques","Fourniture standardisée et certifiée"],featureEye:"Prêtes pour les projets",featureTitle:"Un fournisseur pour tout le cahier des charges",features:[["Portes coupe-feu","EN 1634 avec intégrité 90 minutes pour la sécurité des personnes."],["Portes à contrôle d’accès","Cartes, biométrie et compatibilité contrôleur."],["Portes acoustiques","Âmes STC pour hôpitaux, hôtels, bureaux et logements."],["Normes mondiales","Conformes aux codes saoudiens et asiatiques."],["Volumes projet","Fourniture standardisée et certifiée pour grands projets."],["Testées et certifiées","Essais destructifs internes avant expédition."]],band:["Projets emblématiques","Choisies pour les projets où l’échec est exclu"],specs:["Résistance au feu","Types","Matériau","Conformité","Fourniture","Certification"],cta:["Spécifiez WONLY sur votre prochain projet","Envoyez vos exigences feu, accès et acoustique ; nous fournissons conformité et prix."]},
 ru:{seo:["Инженерные противопожарные, акустические двери и контроль доступа | WONLY","Инженерные двери WONLY: EN 1634 90 минут, контроль доступа и акустические варианты по нормам стран Персидского залива и Азии."],eye:"Инженерные двери",title:"Сертифицированы по каждому нормативу",sub:"Противопожарные, акустические двери и контроль доступа по нормам Персидского залива, Юго-Восточной и Центральной Азии в проектных объёмах.",highlights:["EN 1634 — 90 минут огнестойкости","Контроль доступа и акустические варианты","Стандартизированные сертифицированные поставки"],featureEye:"Готовы для проектов",featureTitle:"Один поставщик для всей спецификации",features:[["Противопожарные двери","EN 1634 и целостность 90 минут для безопасности людей."],["Контроль доступа","Карты, биометрия и готовность к контроллерам."],["Акустические двери","Сердечники STC для больниц, отелей, офисов и жилья."],["Мировые нормы","Соответствие кодам Саудовской Аравии и Азии."],["Проектные объёмы","Стандартизированные сертифицированные поставки для тендеров."],["Испытаны и сертифицированы","Разрушающие испытания каждой модели до отгрузки."]],band:["Знаковые проекты","Для объектов, где ошибка недопустима"],specs:["Огнестойкость","Типы","Материал","Соответствие","Поставка","Сертификация"],cta:["Включите WONLY в следующий проект","Пришлите требования по огню, доступу и акустике — подготовим документы и цену."]},
 es:{seo:["Puertas técnicas cortafuego, control de acceso y acústicas | WONLY","Puertas técnicas WONLY: EN 1634 90 minutos, control de acceso y acústicas, conformes con normas del Golfo y Asia."],eye:"Puertas técnicas",title:"Certificadas para cada normativa",sub:"Puertas cortafuego, de control de acceso y acústicas conformes con normas del Golfo, Sudeste Asiático y Asia Central, suministradas a escala de proyecto.",highlights:["Integridad al fuego EN 1634 de 90 minutos","Variantes de acceso y acústicas","Suministro normalizado y certificado"],featureEye:"Preparadas para proyectos",featureTitle:"Un proveedor para toda la especificación",features:[["Puertas cortafuego","EN 1634 con integridad de 90 minutos para seguridad vital."],["Control de acceso","Tarjeta, biometría y preparación para controladores."],["Puertas acústicas","Núcleos STC para hospitales, hoteles, oficinas y viviendas."],["Normas mundiales","Conformes con códigos saudíes y asiáticos."],["Volumen de proyecto","Suministro certificado para grandes desarrollos y licitaciones."],["Probadas y certificadas","Pruebas destructivas internas antes del envío."]],band:["Proyectos emblemáticos","Elegidas para proyectos donde fallar no es una opción"],specs:["Resistencia al fuego","Tipos","Material","Conformidad","Suministro","Certificación"],cta:["Especifique WONLY en su próximo proyecto","Envíe requisitos de fuego, acceso y acústica; respondemos con documentos y precios."]}
};

export default function EngineeringDoors() { const {locale}=useLocale();const c=COPY[locale];if(!c)return <ProductPage data={data}/>;const localized={...data,seo:{...data.seo,title:c.seo[0],description:c.seo[1]},hero:{...data.hero,eyebrow:c.eye,title:<>{c.title}</>,sub:c.sub},highlights:c.highlights,featuresEyebrow:c.featureEye,featuresTitle:c.featureTitle,features:data.features.map((f,i)=>({...f,t:c.features[i][0],d:c.features[i][1]})),band:{...data.band,eyebrow:c.band[0],title:c.band[1]},specs:data.specs?.map((s,i)=>[c.specs[i],s[1]] as [string,string]),cta:{title:c.cta[0],sub:c.cta[1]}};return <ProductPage data={localized}/>; }
