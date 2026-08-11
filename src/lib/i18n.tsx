import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const LANGUAGES = [
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl" },
  { code: "fr", label: "French", nativeLabel: "Français", dir: "ltr" },
  { code: "ru", label: "Russian", nativeLabel: "Русский", dir: "ltr" },
  { code: "es", label: "Spanish", nativeLabel: "Español", dir: "ltr" },
] as const;

export type Locale = (typeof LANGUAGES)[number]["code"];
export const LOCALIZED_LOCALES: Locale[] = ["ar", "fr", "ru", "es"];

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
    Product: "المنتجات", Door: "الأبواب", "Metal Door": "الأبواب المعدنية", "Wooden Door": "الأبواب الخشبية",
    "Smart Lock": "الأقفال الذكية", "Smart Window": "النوافذ الذكية", "Whole-House Intelligence": "حلول المنزل الذكي",
    Advantages: "المزايا", "Manufacturing & R&D": "التصنيع والبحث والتطوير", "Global Strategy": "الانتشار العالمي",
    Partnership: "الشراكة", Contact: "اتصل بنا", Company: "الشركة", "Get in Touch": "تواصل معنا",
    "News & Insights": "المقالات والرؤى", "Privacy Policy": "سياسة الخصوصية", "Terms of Service": "شروط الاستخدام",
    "Get Solutions & Quote": "احصل على حل وعرض سعر", "Select language": "اختر اللغة",
    "Send an Enquiry": "أرسل استفساراً", "Full Name": "الاسم الكامل", "Job Title": "المسمى الوظيفي", "Country / Region": "الدولة / المنطقة", Email: "البريد الإلكتروني", "Phone / WhatsApp": "الهاتف / واتساب", Message: "الرسالة", "Submit Enquiry": "إرسال الاستفسار", "Sending…": "جارٍ الإرسال…", "Headquarters": "المقر الرئيسي", "Previous Site": "الموقع السابق",
    "Business Type": "نوع النشاط", "Estimated Volume": "الكمية المتوقعة", "Target Timeline": "الجدول الزمني", "Products of Interest": "المنتجات المطلوبة", Select: "اختر", "Submit Request": "إرسال الطلب", Close: "إغلاق", "Request received": "تم استلام الطلب", "Tell us about your project": "أخبرنا عن مشروعك",
  },
  fr: {
    Product: "Produits", Door: "Portes", "Metal Door": "Portes métalliques", "Wooden Door": "Portes en bois",
    "Smart Lock": "Serrures intelligentes", "Smart Window": "Fenêtres intelligentes", "Whole-House Intelligence": "Maison intelligente",
    Advantages: "Avantages", "Manufacturing & R&D": "Fabrication et R&D", "Global Strategy": "Présence mondiale",
    Partnership: "Partenariat", Contact: "Contact", Company: "Entreprise", "Get in Touch": "Nous contacter",
    "News & Insights": "Ressources", "Privacy Policy": "Politique de confidentialité", "Terms of Service": "Conditions d’utilisation",
    "Get Solutions & Quote": "Demander une solution et un devis", "Select language": "Choisir la langue",
    "Send an Enquiry": "Envoyer une demande", "Full Name": "Nom complet", "Job Title": "Fonction", "Country / Region": "Pays / Région", Email: "E-mail", "Phone / WhatsApp": "Téléphone / WhatsApp", Message: "Message", "Submit Enquiry": "Envoyer la demande", "Sending…": "Envoi…", Headquarters: "Siège social", "Previous Site": "Ancien site",
    "Business Type": "Type d’activité", "Estimated Volume": "Volume estimé", "Target Timeline": "Délai prévu", "Products of Interest": "Produits recherchés", Select: "Sélectionner", "Submit Request": "Envoyer la demande", Close: "Fermer", "Request received": "Demande reçue", "Tell us about your project": "Présentez-nous votre projet",
  },
  ru: {
    Product: "Продукция", Door: "Двери", "Metal Door": "Металлические двери", "Wooden Door": "Деревянные двери",
    "Smart Lock": "Умные замки", "Smart Window": "Умные окна", "Whole-House Intelligence": "Умный дом",
    Advantages: "Преимущества", "Manufacturing & R&D": "Производство и НИОКР", "Global Strategy": "Глобальное присутствие",
    Partnership: "Партнёрство", Contact: "Контакты", Company: "Компания", "Get in Touch": "Связаться с нами",
    "News & Insights": "Материалы", "Privacy Policy": "Политика конфиденциальности", "Terms of Service": "Условия использования",
    "Get Solutions & Quote": "Получить решение и предложение", "Select language": "Выбрать язык",
    "Send an Enquiry": "Отправить запрос", "Full Name": "Имя и фамилия", "Job Title": "Должность", "Country / Region": "Страна / регион", Email: "Эл. почта", "Phone / WhatsApp": "Телефон / WhatsApp", Message: "Сообщение", "Submit Enquiry": "Отправить запрос", "Sending…": "Отправка…", Headquarters: "Главный офис", "Previous Site": "Предыдущий сайт",
    "Business Type": "Тип бизнеса", "Estimated Volume": "Ожидаемый объём", "Target Timeline": "Сроки", "Products of Interest": "Интересующие продукты", Select: "Выберите", "Submit Request": "Отправить запрос", Close: "Закрыть", "Request received": "Запрос получен", "Tell us about your project": "Расскажите о вашем проекте",
  },
  es: {
    Product: "Productos", Door: "Puertas", "Metal Door": "Puertas metálicas", "Wooden Door": "Puertas de madera",
    "Smart Lock": "Cerraduras inteligentes", "Smart Window": "Ventanas inteligentes", "Whole-House Intelligence": "Hogar inteligente",
    Advantages: "Ventajas", "Manufacturing & R&D": "Fabricación e I+D", "Global Strategy": "Presencia global",
    Partnership: "Colaboración", Contact: "Contacto", Company: "Empresa", "Get in Touch": "Contáctenos",
    "News & Insights": "Recursos", "Privacy Policy": "Política de privacidad", "Terms of Service": "Términos de uso",
    "Get Solutions & Quote": "Solicitar solución y cotización", "Select language": "Seleccionar idioma",
    "Send an Enquiry": "Enviar una consulta", "Full Name": "Nombre completo", "Job Title": "Cargo", "Country / Region": "País / Región", Email: "Correo electrónico", "Phone / WhatsApp": "Teléfono / WhatsApp", Message: "Mensaje", "Submit Enquiry": "Enviar consulta", "Sending…": "Enviando…", Headquarters: "Sede central", "Previous Site": "Sitio anterior",
    "Business Type": "Tipo de negocio", "Estimated Volume": "Volumen estimado", "Target Timeline": "Plazo previsto", "Products of Interest": "Productos de interés", Select: "Seleccionar", "Submit Request": "Enviar solicitud", Close: "Cerrar", "Request received": "Solicitud recibida", "Tell us about your project": "Cuéntenos sobre su proyecto",
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
