import { Radar, Wind, Cross, ShieldAlert, EyeOff, Building2 } from "lucide-react";
import { BASE } from "@/lib/site-ui";
import { ProductPage, type ProductPageData } from "@/lib/product-page";
import { useLocale, type Locale } from "@/lib/i18n";

const data: ProductPageData = {
  seo: {
    title: "Medical Doors — Hermetic OR & Auto-Sensing Ward Doors | WONLY",
    description: "WONLY medical doors: touchless auto-sensing ward and operating-room doors — zero-contact one-second open, hermetic sealing, AI anti-pinch and a concealed door operator, for hospitals worldwide.",
    path: "/products/medical-doors",
  },
  hero: {
    eyebrow: "Medical Doors",
    title: <>Hermetic,<br />hands-free,<br /><span style={{ color: "#D4C4A0" }}>hygienic</span></>,
    sub: "Touchless auto-sensing ward and operating-room doors engineered for hospitals — zero-contact opening, hermetic sealing and AI anti-pinch safety.",
    img: `${BASE}images/proj-s-7.webp`,
    mode: "scene",
  },
  highlights: ["Zero-contact, one-second open", "AI anti-pinch safety", "Concealed, hidden door operator"],
  featuresEyebrow: "Clinically Engineered",
  featuresTitle: "Built For Sterile, Safe Environments",
  features: [
    { icon: Radar, t: "Touchless Auto-Open", d: "Long-range sensing opens the door in a second — hands-free, contamination-free." },
    { icon: Wind, t: "Hermetic OR Doors", d: "Air-tight sealing for operating rooms and clean, pressure-controlled areas." },
    { icon: Cross, t: "HIPAA-Aligned Ward Doors", d: "Privacy and safety engineered for patient wards and treatment rooms." },
    { icon: ShieldAlert, t: "AI Anti-Pinch", d: "Detects people and objects in the path and stops instantly, every time." },
    { icon: EyeOff, t: "Concealed Operator", d: "A hidden door-opening mechanism keeps clean, uninterrupted sightlines." },
    { icon: Building2, t: "Institution-Proven", d: "Deployed across hospitals and public institutions with full project references." },
  ],
  band: { img: `${BASE}images/landmark-govhousing.webp`, eyebrow: "Public Institutions", title: "Specified Where Hygiene Cannot Be Compromised" },
  cta: { title: "Equip Your Facility With WONLY Medical Doors", sub: "Ward, OR or access-controlled entries — tell us your project and we reply within 24 hours." },
};

const COPY:Partial<Record<Locale,{seo:[string,string];eye:string;title:string;sub:string;highlights:string[];featureEye:string;featureTitle:string;features:[string,string][];band:[string,string];cta:[string,string]}>>={
 ar:{seo:["أبواب طبية محكمة لغرف العمليات والأجنحة | WONLY","أبواب WONLY الطبية باستشعار دون لمس وفتح في ثانية وإحكام لغرف العمليات ومنع انحشار بالذكاء الاصطناعي ومشغل مخفي للمستشفيات."],eye:"أبواب طبية",title:"محكمة، دون لمس، صحية",sub:"أبواب أجنحة وغرف عمليات ذاتية الاستشعار للمستشفيات، مع فتح بلا تلامس وإحكام ومنع انحشار بالذكاء الاصطناعي.",highlights:["فتح بلا تلامس في ثانية","أمان مضاد للانحشار بالذكاء الاصطناعي","مشغل باب مخفي"],featureEye:"هندسة سريرية",featureTitle:"مصممة لبيئات معقمة وآمنة",features:[["فتح تلقائي دون لمس","استشعار بعيد يفتح خلال ثانية دون تلوث."],["أبواب غرف عمليات محكمة","إحكام للغرف النظيفة والمناطق المضبوطة الضغط."],["أبواب أجنحة تراعي الخصوصية","خصوصية وسلامة لغرف المرضى والعلاج."],["منع انحشار بالذكاء الاصطناعي","يكشف الأشخاص والأجسام ويتوقف فوراً."],["مشغل مخفي","آلية فتح مخفية تحافظ على خطوط نظيفة."],["مثبتة مؤسسياً","مستخدمة في المستشفيات والمؤسسات مع مراجع مشاريع."]],band:["مؤسسات عامة","معتمدة حيث لا يمكن التهاون في النظافة"],cta:["جهز منشأتك بأبواب WONLY الطبية","للأجنحة أو غرف العمليات أو الدخول المتحكم به، أرسل مشروعك ونرد خلال 24 ساعة."]},
 fr:{seo:["Portes médicales hermétiques pour blocs et chambres | WONLY","Portes médicales WONLY : détection sans contact, ouverture en une seconde, étanchéité de bloc, anti-pincement IA et opérateur dissimulé."],eye:"Portes médicales",title:"Hermétiques, mains libres, hygiéniques",sub:"Portes automatiques de chambres et blocs opératoires avec ouverture sans contact, étanchéité et sécurité anti-pincement IA.",highlights:["Ouverture sans contact en une seconde","Sécurité anti-pincement IA","Opérateur de porte dissimulé"],featureEye:"Ingénierie clinique",featureTitle:"Conçues pour les environnements stériles",features:[["Ouverture automatique sans contact","La détection longue portée ouvre en une seconde sans contamination."],["Portes de bloc hermétiques","Étanchéité des blocs, zones propres et espaces pressurisés."],["Portes de chambres respectant la confidentialité","Confidentialité et sécurité des chambres et soins."],["Anti-pincement IA","Détecte personnes et objets et s’arrête immédiatement."],["Opérateur dissimulé","Mécanisme caché pour des lignes propres."],["Éprouvées en institution","Déployées dans hôpitaux et établissements publics."]],band:["Institutions publiques","Spécifiées là où l’hygiène est impérative"],cta:["Équipez votre établissement en portes médicales WONLY","Chambres, blocs ou accès contrôlé : présentez votre projet, réponse sous 24 heures."]},
 ru:{seo:["Герметичные медицинские двери для операционных и палат | WONLY","Медицинские двери WONLY: бесконтактное открытие за секунду, герметизация операционных, ИИ-защита от защемления и скрытый привод."],eye:"Медицинские двери",title:"Герметично, без рук, гигиенично",sub:"Автоматические двери палат и операционных с бесконтактным открытием, герметизацией и ИИ-защитой от защемления.",highlights:["Бесконтактное открытие за секунду","ИИ-защита от защемления","Скрытый дверной привод"],featureEye:"Клиническая инженерия",featureTitle:"Для стерильных и безопасных помещений",features:[["Бесконтактное автооткрытие","Дальние датчики открывают за секунду без касания."],["Герметичные двери операционных","Воздухонепроницаемость чистых и контролируемых зон."],["Двери палат с защитой приватности","Приватность и безопасность палат и процедурных."],["ИИ против защемления","Обнаруживает людей и предметы и мгновенно останавливается."],["Скрытый привод","Скрытый механизм сохраняет чистую архитектуру."],["Проверено учреждениями","Установлены в больницах и государственных учреждениях."]],band:["Государственные учреждения","Для мест, где гигиена обязательна"],cta:["Оснастите объект медицинскими дверями WONLY","Палата, операционная или контроль доступа — расскажите о проекте, ответим за 24 часа."]},
 es:{seo:["Puertas médicas herméticas para quirófanos y salas | WONLY","Puertas médicas WONLY: apertura sin contacto en un segundo, sellado de quirófano, antipinzamiento con IA y operador oculto."],eye:"Puertas médicas",title:"Herméticas, sin manos, higiénicas",sub:"Puertas automáticas para salas y quirófanos con apertura sin contacto, sellado hermético y seguridad antipinzamiento con IA.",highlights:["Apertura sin contacto en un segundo","Seguridad antipinzamiento con IA","Operador de puerta oculto"],featureEye:"Ingeniería clínica",featureTitle:"Para entornos estériles y seguros",features:[["Apertura automática sin contacto","La detección de largo alcance abre en un segundo sin contaminación."],["Puertas herméticas de quirófano","Sellado para quirófanos y zonas limpias presurizadas."],["Puertas de sala con privacidad","Privacidad y seguridad para pacientes y tratamiento."],["Antipinzamiento con IA","Detecta personas y objetos y se detiene al instante."],["Operador oculto","Mecanismo oculto que mantiene líneas limpias."],["Probadas en instituciones","Instaladas en hospitales e instituciones públicas."]],band:["Instituciones públicas","Especificadas donde la higiene es irrenunciable"],cta:["Equipe su centro con puertas médicas WONLY","Salas, quirófanos o accesos controlados: cuéntenos el proyecto y respondemos en 24 horas."]}
};

export default function MedicalDoors(){const{locale}=useLocale();const c=COPY[locale];if(!c)return <ProductPage data={data}/>;return <ProductPage data={{...data,seo:{...data.seo,title:c.seo[0],description:c.seo[1]},hero:{...data.hero,eyebrow:c.eye,title:<>{c.title}</>,sub:c.sub},highlights:c.highlights,featuresEyebrow:c.featureEye,featuresTitle:c.featureTitle,features:data.features.map((f,i)=>({...f,t:c.features[i][0],d:c.features[i][1]})),band:{...data.band,eyebrow:c.band[0],title:c.band[1]},cta:{title:c.cta[0],sub:c.cta[1]}}}/>;}
