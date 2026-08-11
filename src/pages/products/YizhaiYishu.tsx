import { Gem, ShieldCheck, Cpu, Sparkles, Home, Award } from "lucide-react";
import { BASE } from "@/lib/site-ui";
import { ProductPage, type ProductPageData } from "@/lib/product-page";
import { useLocale, type Locale } from "@/lib/i18n";

const data: ProductPageData = {
  seo: {
    title: "YIZHAI YISHU — Artisan Ultra-Premium Villa Doors | WONLY",
    description: "WONLY YIZHAI YISHU artisan collection: sculptural bespoke villa security doors and integrated smart-home entry systems — protection elevated to heritage craft.",
    path: "/products/yizhai-yishu",
  },
  hero: {
    eyebrow: "YIZHAI YISHU · Artisan Collection",
    title: <>Where security<br />becomes <span style={{ color: "#D4C4A0" }}>art</span></>,
    sub: "Sculptural, bespoke villa doors and integrated smart-home entry systems — protection elevated to heritage craftsmanship, for estates and flagship projects.",
    img: `${BASE}images/yizhai-1.webp`,
    mode: "scene",
  },
  highlights: ["Flagship villa security doors", "Integrated smart-home door systems", "Exclusive bespoke luxury service"],
  featuresEyebrow: "The Artisan Standard",
  featuresTitle: "Heritage Craft, Uncompromising Security",
  features: [
    { icon: Gem, t: "Sculptural Design", d: "Hand-finished relief artistry rendered onto a cast, high-security core." },
    { icon: ShieldCheck, t: "Ultra-High Security", d: "Villa-grade protection engineered beneath the artistry — never a trade-off." },
    { icon: Cpu, t: "Integrated Smart Entry", d: "Face recognition, sensing and whole-house intelligence built in from the start." },
    { icon: Sparkles, t: "Bespoke Customization", d: "Materials, finishes and motifs designed to your private commission." },
    { icon: Home, t: "For Villas & Flagships", d: "Made for estates, penthouses and landmark flagship projects." },
    { icon: Award, t: "Award-Winning", d: "Recognized by Red Dot Best of the Best and the iF Design Award." },
  ],
  band: { img: `${BASE}images/yizhai-3.webp`, eyebrow: "Made to Commission", title: "One Of A Kind, By Design" },
  cta: { eyebrow: "Bespoke Enquiry", title: "Commission A WONLY Artisan Door", sub: "Tell us about your residence or project — our bespoke team will design to your brief." },
};

const COPY:Partial<Record<Locale,{seo:[string,string];eye:string;title:string;sub:string;highlights:string[];featureEye:string;featureTitle:string;features:[string,string][];band:[string,string];cta:[string,string,string]}>>={
 ar:{seo:["YIZHAI YISHU — أبواب فلل حرفية فائقة الفخامة | WONLY","مجموعة WONLY الحرفية لأبواب فلل أمنية منحوتة حسب الطلب وأنظمة دخول منزل ذكي متكاملة تجمع الحماية وفن التراث."],eye:"YIZHAI YISHU · مجموعة حرفية",title:"حين يصبح الأمان فناً",sub:"أبواب فلل منحوتة حسب الطلب وأنظمة دخول ذكية متكاملة، حماية ترتقي إلى الحرفية التراثية للقصور والمشاريع الرائدة.",highlights:["أبواب أمان رائدة للفلل","أنظمة أبواب منزل ذكي متكاملة","خدمة فاخرة حصرية حسب الطلب"],featureEye:"المعيار الحرفي",featureTitle:"حرفة تراثية وأمان بلا تنازل",features:[["تصميم منحوت","نقوش يدوية على قلب أمني مصبوب."],["أمان فائق", "حماية للفلل تحت الفن دون مساومة."],["دخول ذكي متكامل","وجه واستشعار ومنزل ذكي مدمج منذ البداية."],["تخصيص حسب الطلب","مواد وتشطيبات وزخارف وفق تكليفك الخاص."],["للفلل والمشاريع الرائدة","للقصور والبنتهاوس والمعالم."],["حائز جوائز","معترف به من Red Dot Best of the Best وiF."]],band:["صنع حسب الطلب","فريد بتصميمه"],cta:["استفسار مخصص","اطلب باب WONLY حرفياً","أخبرنا عن مسكنك أو مشروعك ليصمم فريقنا وفق موجزك."]},
 fr:{seo:["YIZHAI YISHU — Portes artisanales ultra-premium pour villas | WONLY","Collection artisanale WONLY : portes de sécurité sculpturales sur mesure et entrées intelligentes intégrées, entre protection et patrimoine."],eye:"YIZHAI YISHU · Collection artisanale",title:"Quand la sécurité devient art",sub:"Portes sculpturales sur mesure et systèmes d’entrée intelligente intégrés, pour propriétés et projets emblématiques.",highlights:["Portes de sécurité phares pour villas","Systèmes de porte intelligente intégrés","Service de luxe exclusif sur mesure"],featureEye:"Le standard artisanal",featureTitle:"Art patrimonial, sécurité sans compromis",features:[["Design sculptural","Reliefs finis à la main sur un cœur haute sécurité."],["Ultra-haute sécurité","Protection de villa sous l’art, sans compromis."],["Entrée intelligente intégrée","Visage, détection et maison intelligente dès la conception."],["Personnalisation sur mesure","Matériaux, finitions et motifs selon votre commande."],["Pour villas et projets phares","Propriétés, penthouses et réalisations emblématiques."],["Primée","Red Dot Best of the Best et iF Design Award."]],band:["Fabriquée sur commande","Unique par conception"],cta:["Demande sur mesure","Commandez une porte artisanale WONLY","Présentez votre résidence ou projet ; notre équipe conçoit selon votre brief."]},
 ru:{seo:["YIZHAI YISHU — Авторские двери ультрапремиум для вилл | WONLY","Авторская коллекция WONLY: скульптурные защитные двери для вилл и интегрированные умные входные системы на заказ."],eye:"YIZHAI YISHU · Авторская коллекция",title:"Когда безопасность становится искусством",sub:"Скульптурные двери и интегрированные умные входы на заказ — защита уровня наследия для усадеб и флагманских проектов.",highlights:["Флагманские защитные двери для вилл","Интегрированные умные дверные системы","Эксклюзивный сервис на заказ"],featureEye:"Авторский стандарт",featureTitle:"Наследие мастерства без компромисса в защите",features:[["Скульптурный дизайн","Ручной рельеф на литом высокозащищённом ядре."],["Сверхвысокая защита","Безопасность виллы под художественной отделкой."],["Интегрированный умный вход","Лицо, датчики и умный дом заложены изначально."],["Индивидуальное исполнение","Материалы, отделки и мотивы по частному заказу."],["Для вилл и флагманов","Усадьбы, пентхаусы и знаковые проекты."],["Лауреат наград","Red Dot Best of the Best и iF Design Award."]],band:["На заказ","Единственная в своём роде"],cta:["Индивидуальный запрос","Закажите авторскую дверь WONLY","Расскажите о резиденции или проекте — команда создаст дизайн по вашему заданию."]},
 es:{seo:["YIZHAI YISHU — Puertas artesanales ultrapremium para villas | WONLY","Colección artesanal WONLY: puertas de seguridad escultóricas a medida y entradas inteligentes integradas que elevan la protección al arte."],eye:"YIZHAI YISHU · Colección artesanal",title:"Donde la seguridad se convierte en arte",sub:"Puertas escultóricas a medida y sistemas de entrada inteligente para fincas y proyectos emblemáticos.",highlights:["Puertas de seguridad insignia para villas","Sistemas de puerta inteligente integrados","Servicio de lujo exclusivo a medida"],featureEye:"El estándar artesanal",featureTitle:"Artesanía histórica, seguridad sin concesiones",features:[["Diseño escultórico","Relieves acabados a mano sobre núcleo de alta seguridad."],["Seguridad ultraalta","Protección para villas bajo el arte, sin concesiones."],["Entrada inteligente integrada","Rostro, detección y hogar inteligente desde el inicio."],["Personalización a medida","Materiales, acabados y motivos según su encargo."],["Para villas y proyectos insignia","Fincas, áticos y proyectos emblemáticos."],["Premiada","Red Dot Best of the Best e iF Design Award."]],band:["Hecha por encargo","Única por diseño"],cta:["Consulta a medida","Encargue una puerta artesanal WONLY","Cuéntenos su residencia o proyecto; diseñamos conforme a su brief."]}
};

export default function YizhaiYishu(){const{locale}=useLocale();const c=COPY[locale];if(!c)return <ProductPage data={data}/>;return <ProductPage data={{...data,seo:{...data.seo,title:c.seo[0],description:c.seo[1]},hero:{...data.hero,eyebrow:c.eye,title:<>{c.title}</>,sub:c.sub},highlights:c.highlights,featuresEyebrow:c.featureEye,featuresTitle:c.featureTitle,features:data.features.map((f,i)=>({...f,t:c.features[i][0],d:c.features[i][1]})),band:{...data.band,eyebrow:c.band[0],title:c.band[1]},cta:{eyebrow:c.cta[0],title:c.cta[1],sub:c.cta[2]}}}/>;}
