import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const LANGUAGES = [
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl" },
  { code: "fr", label: "French", nativeLabel: "Français", dir: "ltr" },
  { code: "ru", label: "Russian", nativeLabel: "Русский", dir: "ltr" },
  { code: "es", label: "Spanish", nativeLabel: "Español", dir: "ltr" },
  { code: "pt", label: "Portuguese", nativeLabel: "Português", dir: "ltr" },
] as const;

export type Locale = (typeof LANGUAGES)[number]["code"];
export const LOCALIZED_LOCALES: Locale[] = ["ar", "fr", "ru", "es", "pt"];

export function localeFromPath(pathname: string): Locale {
  const code = pathname.split("/").filter(Boolean)[0] as Locale | undefined;
  return LOCALIZED_LOCALES.includes(code as Locale) ? code as Locale : "en";
}

export function stripLocale(pathname: string): string {
  const locale = localeFromPath(pathname);
  if (locale === "en") return pathname || "/";
  const stripped = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "");
  return stripped || "/";
}

export function pathForLocale(pathname: string, locale: Locale): string {
  const base = stripLocale(pathname);
  if (locale === "en") return base || "/";
  return base === "/" ? `/${locale}/` : `/${locale}${base.startsWith("/") ? base : `/${base}`}`;
}

const UI: Record<Locale, Record<string, string>> = {
  en: {},
  ar: {
    Product: "المنتجات", Door: "الأبواب", "Metal Door": "الأبواب المعدنية", "Smart Door": "الأبواب الذكية", "Wooden Door": "الأبواب الخشبية",
    "Smart Lock": "الأقفال الذكية", "Smart Window": "النوافذ الذكية", "Whole-House Intelligence": "حلول المنزل الذكي",
    Advantages: "المزايا", "Manufacturing & R&D": "التصنيع والبحث والتطوير", "Global Strategy": "الانتشار العالمي",
    Partnership: "الشراكة", Contact: "اتصل بنا", "Get in Touch": "تواصل معنا",
    "News & Insights": "المقالات والرؤى", "Privacy Policy": "سياسة الخصوصية", "Terms of Service": "شروط الاستخدام",
    "Get Solutions & Quote": "احصل على حل وعرض سعر", "Select language": "اختر اللغة", "Your full name": "اسمك الكامل", Company: "الشركة", "Company name": "اسم الشركة", "Country / region": "الدولة / المنطقة", "Please enter your name.": "يرجى إدخال اسمك.", "Please enter your company name.": "يرجى إدخال اسم الشركة.", "Please enter your country or region.": "يرجى إدخال الدولة أو المنطقة.", "Please enter your email.": "يرجى إدخال بريدك الإلكتروني.", "Please enter a valid email address.": "يرجى إدخال بريد إلكتروني صالح.",
    "Send an Enquiry": "أرسل استفساراً", "Full Name": "الاسم الكامل", "Job Title": "المسمى الوظيفي", "Country / Region": "الدولة / المنطقة", Email: "البريد الإلكتروني", "Phone / WhatsApp": "الهاتف / واتساب", Message: "الرسالة", "Submit Enquiry": "إرسال الاستفسار", "Sending…": "جارٍ الإرسال…", "Headquarters": "المقر الرئيسي", "Previous Site": "الموقع السابق",
    "Business Type": "نوع النشاط", "Estimated Volume": "الكمية المتوقعة", "Target Timeline": "الجدول الزمني", "Products of Interest": "المنتجات المطلوبة", Select: "اختر", Interest: "مجال الاهتمام", "Select an option…": "اختر خياراً…", Distributor: "موزع", Project: "مشروع", "OEM / ODM": "OEM / ODM", "Submit Request": "إرسال الطلب", Close: "إغلاق", "Request received": "تم استلام الطلب", "Tell us about your project": "أخبرنا عن مشروعك", "Tell us about your project or territory...": "أخبرنا عن مشروعك أو منطقتك...", "Please select an option.": "يرجى اختيار أحد الخيارات.", "Start with what you need": "ابدأ بتحديد ما تحتاجه", "Please send distributor pricing, MOQ and market-support details.": "يرجى إرسال أسعار الموزعين والحد الأدنى للطلب وتفاصيل دعم السوق.", "Please recommend specifications and pricing for my project.": "يرجى اقتراح المواصفات والأسعار المناسبة لمشروعي.", "Please send your OEM/ODM options, MOQ and lead time.": "يرجى إرسال خيارات OEM/ODM والحد الأدنى للطلب ومدة التسليم.", "No commitment. Your project details stay confidential. We reply within one business day.": "دون أي التزام. تبقى تفاصيل مشروعك سرية، ونرد خلال يوم عمل واحد.",
  },
  fr: {
    Product: "Produits", Door: "Portes", "Metal Door": "Portes métalliques", "Smart Door": "Portes intelligentes", "Wooden Door": "Portes en bois",
    "Smart Lock": "Serrures intelligentes", "Smart Window": "Fenêtres intelligentes", "Whole-House Intelligence": "Maison intelligente",
    Advantages: "Avantages", "Manufacturing & R&D": "Fabrication et R&D", "Global Strategy": "Présence mondiale",
    Partnership: "Partenariat", Contact: "Contact", "Get in Touch": "Nous contacter",
    "News & Insights": "Ressources", "Privacy Policy": "Politique de confidentialité", "Terms of Service": "Conditions d’utilisation",
    "Get Solutions & Quote": "Demander une solution et un devis", "Select language": "Choisir la langue", "Your full name": "Votre nom complet", Company: "Entreprise", "Company name": "Nom de l’entreprise", "Country / region": "Pays / région", "Please enter your name.": "Veuillez saisir votre nom.", "Please enter your company name.": "Veuillez saisir le nom de l’entreprise.", "Please enter your country or region.": "Veuillez saisir votre pays ou région.", "Please enter your email.": "Veuillez saisir votre e-mail.", "Please enter a valid email address.": "Veuillez saisir une adresse e-mail valide.",
    "Send an Enquiry": "Envoyer une demande", "Full Name": "Nom complet", "Job Title": "Fonction", "Country / Region": "Pays / Région", Email: "E-mail", "Phone / WhatsApp": "Téléphone / WhatsApp", Message: "Message", "Submit Enquiry": "Envoyer la demande", "Sending…": "Envoi…", Headquarters: "Siège social", "Previous Site": "Ancien site",
    "Business Type": "Type d’activité", "Estimated Volume": "Volume estimé", "Target Timeline": "Délai prévu", "Products of Interest": "Produits recherchés", Select: "Sélectionner", Interest: "Intérêt", "Select an option…": "Sélectionnez une option…", Distributor: "Distributeur", Project: "Projet", "OEM / ODM": "OEM / ODM", "Submit Request": "Envoyer la demande", Close: "Fermer", "Request received": "Demande reçue", "Tell us about your project": "Présentez-nous votre projet", "Tell us about your project or territory...": "Présentez votre projet ou votre territoire...", "Please select an option.": "Veuillez sélectionner une option.", "Start with what you need": "Commencez par votre besoin", "Please send distributor pricing, MOQ and market-support details.": "Veuillez envoyer les tarifs distributeur, le MOQ et les détails du soutien commercial.", "Please recommend specifications and pricing for my project.": "Veuillez recommander les spécifications et les tarifs adaptés à mon projet.", "Please send your OEM/ODM options, MOQ and lead time.": "Veuillez envoyer vos options OEM/ODM, le MOQ et le délai de livraison.", "No commitment. Your project details stay confidential. We reply within one business day.": "Sans engagement. Les détails de votre projet restent confidentiels. Réponse sous un jour ouvré.",
  },
  ru: {
    Product: "Продукция", Door: "Двери", "Metal Door": "Металлические двери", "Smart Door": "Умные двери", "Wooden Door": "Деревянные двери",
    "Smart Lock": "Умные замки", "Smart Window": "Умные окна", "Whole-House Intelligence": "Умный дом",
    Advantages: "Преимущества", "Manufacturing & R&D": "Производство и НИОКР", "Global Strategy": "Глобальное присутствие",
    Partnership: "Партнёрство", Contact: "Контакты", "Get in Touch": "Связаться с нами",
    "News & Insights": "Материалы", "Privacy Policy": "Политика конфиденциальности", "Terms of Service": "Условия использования",
    "Get Solutions & Quote": "Получить решение и предложение", "Select language": "Выбрать язык", "Your full name": "Ваше имя и фамилия", Company: "Компания", "Company name": "Название компании", "Country / region": "Страна / регион", "Please enter your name.": "Введите ваше имя.", "Please enter your company name.": "Введите название компании.", "Please enter your country or region.": "Введите страну или регион.", "Please enter your email.": "Введите электронную почту.", "Please enter a valid email address.": "Введите корректный адрес электронной почты.",
    "Send an Enquiry": "Отправить запрос", "Full Name": "Имя и фамилия", "Job Title": "Должность", "Country / Region": "Страна / регион", Email: "Эл. почта", "Phone / WhatsApp": "Телефон / WhatsApp", Message: "Сообщение", "Submit Enquiry": "Отправить запрос", "Sending…": "Отправка…", Headquarters: "Главный офис", "Previous Site": "Предыдущий сайт",
    "Business Type": "Тип бизнеса", "Estimated Volume": "Ожидаемый объём", "Target Timeline": "Сроки", "Products of Interest": "Интересующие продукты", Select: "Выберите", Interest: "Направление", "Select an option…": "Выберите вариант…", Distributor: "Дистрибьютор", Project: "Проект", "OEM / ODM": "OEM / ODM", "Submit Request": "Отправить запрос", Close: "Закрыть", "Request received": "Запрос получен", "Tell us about your project": "Расскажите о вашем проекте", "Tell us about your project or territory...": "Расскажите о проекте или регионе...", "Please select an option.": "Выберите один из вариантов.", "Start with what you need": "Начните с выбора задачи", "Please send distributor pricing, MOQ and market-support details.": "Пришлите цены для дистрибьюторов, минимальный заказ и условия поддержки рынка.", "Please recommend specifications and pricing for my project.": "Порекомендуйте характеристики и цены для моего проекта.", "Please send your OEM/ODM options, MOQ and lead time.": "Пришлите варианты OEM/ODM, минимальный заказ и срок поставки.", "No commitment. Your project details stay confidential. We reply within one business day.": "Без обязательств. Данные проекта остаются конфиденциальными. Ответим в течение одного рабочего дня.",
  },
  es: {
    Product: "Productos", Door: "Puertas", "Metal Door": "Puertas metálicas", "Smart Door": "Puertas inteligentes", "Wooden Door": "Puertas de madera",
    "Smart Lock": "Cerraduras inteligentes", "Smart Window": "Ventanas inteligentes", "Whole-House Intelligence": "Hogar inteligente",
    Advantages: "Ventajas", "Manufacturing & R&D": "Fabricación e I+D", "Global Strategy": "Presencia global",
    Partnership: "Colaboración", Contact: "Contacto", "Get in Touch": "Contáctenos",
    "News & Insights": "Recursos", "Privacy Policy": "Política de privacidad", "Terms of Service": "Términos de uso",
    "Get Solutions & Quote": "Solicitar solución y cotización", "Select language": "Seleccionar idioma", "Your full name": "Su nombre completo", Company: "Empresa", "Company name": "Nombre de la empresa", "Country / region": "País / región", "Please enter your name.": "Introduzca su nombre.", "Please enter your company name.": "Introduzca el nombre de la empresa.", "Please enter your country or region.": "Introduzca su país o región.", "Please enter your email.": "Introduzca su correo electrónico.", "Please enter a valid email address.": "Introduzca un correo electrónico válido.",
    "Send an Enquiry": "Enviar una consulta", "Full Name": "Nombre completo", "Job Title": "Cargo", "Country / Region": "País / Región", Email: "Correo electrónico", "Phone / WhatsApp": "Teléfono / WhatsApp", Message: "Mensaje", "Submit Enquiry": "Enviar consulta", "Sending…": "Enviando…", Headquarters: "Sede central", "Previous Site": "Sitio anterior",
    "Business Type": "Tipo de negocio", "Estimated Volume": "Volumen estimado", "Target Timeline": "Plazo previsto", "Products of Interest": "Productos de interés", Select: "Seleccionar", Interest: "Interés", "Select an option…": "Seleccione una opción…", Distributor: "Distribuidor", Project: "Proyecto", "OEM / ODM": "OEM / ODM", "Submit Request": "Enviar solicitud", Close: "Cerrar", "Request received": "Solicitud recibida", "Tell us about your project": "Cuéntenos sobre su proyecto", "Tell us about your project or territory...": "Cuéntenos sobre su proyecto o territorio...", "Please select an option.": "Seleccione una opción.", "Start with what you need": "Empiece por lo que necesita", "Please send distributor pricing, MOQ and market-support details.": "Envíenme precios para distribuidores, MOQ y detalles de apoyo comercial.", "Please recommend specifications and pricing for my project.": "Recomienden especificaciones y precios para mi proyecto.", "Please send your OEM/ODM options, MOQ and lead time.": "Envíenme sus opciones OEM/ODM, MOQ y plazo de entrega.", "No commitment. Your project details stay confidential. We reply within one business day.": "Sin compromiso. Los datos de su proyecto son confidenciales. Respondemos en un día laborable.",
  },
  pt: {
    Product: "Produtos", Door: "Portas", "Metal Door": "Portas metálicas", "Smart Door": "Portas inteligentes", "Wooden Door": "Portas de madeira",
    "Smart Lock": "Fechaduras inteligentes", "Smart Window": "Janelas inteligentes", "Whole-House Intelligence": "Casa inteligente",
    Advantages: "Vantagens", "Manufacturing & R&D": "Fabricação e P&D", "Global Strategy": "Presença global",
    Partnership: "Parcerias", Contact: "Contato", "Get in Touch": "Entre em contato",
    "News & Insights": "Notícias e insights", "Privacy Policy": "Política de privacidade", "Terms of Service": "Termos de uso",
    "Get Solutions & Quote": "Solicitar solução e orçamento", "Select language": "Selecionar idioma", "Your full name": "Seu nome completo", Company: "Empresa", "Company name": "Nome da empresa", "Country / region": "País / região", "Please enter your name.": "Informe seu nome.", "Please enter your company name.": "Informe o nome da empresa.", "Please enter your country or region.": "Informe seu país ou região.", "Please enter your email.": "Informe seu e-mail.", "Please enter a valid email address.": "Informe um endereço de e-mail válido.",
    "Send an Enquiry": "Enviar uma consulta", "Full Name": "Nome completo", "Job Title": "Cargo", "Country / Region": "País / Região", Email: "E-mail", "Phone / WhatsApp": "Telefone / WhatsApp", Message: "Mensagem", "Submit Enquiry": "Enviar consulta", "Sending…": "Enviando…", Headquarters: "Sede", "Previous Site": "Site anterior",
    "Business Type": "Tipo de negócio", "Estimated Volume": "Volume estimado", "Target Timeline": "Prazo previsto", "Products of Interest": "Produtos de interesse", Select: "Selecionar", Interest: "Interesse", "Select an option…": "Selecione uma opção…", Distributor: "Distribuidor", Project: "Projeto", "OEM / ODM": "OEM / ODM", "Submit Request": "Enviar solicitação", Close: "Fechar", "Request received": "Solicitação recebida", "Tell us about your project": "Conte-nos sobre seu projeto", "Tell us about your project or territory...": "Conte-nos sobre seu projeto ou território...", "Please select an option.": "Selecione uma opção.", "Start with what you need": "Comece pelo que precisa", "Please send distributor pricing, MOQ and market-support details.": "Envie preços para distribuidores, MOQ e detalhes de apoio ao mercado.", "Please recommend specifications and pricing for my project.": "Recomende especificações e preços para o meu projeto.", "Please send your OEM/ODM options, MOQ and lead time.": "Envie suas opções OEM/ODM, MOQ e prazo de entrega.", "No commitment. Your project details stay confidential. We reply within one business day.": "Sem compromisso. Os dados do projeto permanecem confidenciais. Respondemos em um dia útil.",
    "Global Smart-Security Ecosystem Leader. SSE: 605268.": "Líder global em ecossistemas de segurança inteligente. SSE: 605268.",
    "Global Smart-Security Ecosystem Leader": "Líder global em ecossistemas de segurança inteligente",
    "Why Wonly Door": "Por que escolher as portas WONLY", "Why Wonly Lock": "Por que escolher as fechaduras WONLY", "Innovation & Certifications": "Inovação e certificações",
    "Security Doors": "Portas de segurança", "Smart Locks": "Fechaduras inteligentes", "Wooden Doors": "Portas de madeira", "Aluminum Windows": "Janelas de alumínio", "Medical Doors": "Portas médicas",
    Custom: "Personalizadas", Minimalist: "Minimalistas", "Solid Wood": "Madeira maciça", "Aluminum Alloy": "Liga de alumínio",
    Partner: "Parceiro", "Previous partners": "Parceiros anteriores", "Next partners": "Próximos parceiros",
    "Ready To Open Your Market?": "Pronto para abrir seu mercado?", "Tell us about your project or territory — our team replies within 24 hours.": "Conte-nos sobre seu projeto ou território; nossa equipe responde em até 24 horas.",
  },
};

export function useLocale() {
  const location = useLocation();
  // BrowserRouter removes its locale-aware basename from useLocation(), so
  // read the full browser path for locale detection and language switching.
  const pathname = typeof window === "undefined" ? location.pathname : window.location.pathname;
  const locale = localeFromPath(pathname);
  const language = LANGUAGES.find((item) => item.code === locale) ?? LANGUAGES[0];
  const t = (text: string) => UI[locale][text] || text;
  return { locale, language, t, pathname };
}

export function LocaleDocument() {
  const { locale, language } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = language.dir;
    document.body.dir = language.dir;
    return () => { document.documentElement.dir = "ltr"; document.body.dir = "ltr"; };
  }, [locale, language.dir]);
  return null;
}
