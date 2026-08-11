import type { Locale } from "./i18n";

type LocalizedSeo = { title: string; description: string };

const SEO: Partial<Record<Locale, Record<string, LocalizedSeo>>> = {
  ar: {
    "/": { title: "مصنّع أبواب أمان وأقفال ذكية | WONLY", description: "مصنّع صيني مدرج لأبواب الأمان والأقفال الذكية، يقدم حلول OEM وODM للموزعين والمشاريع العالمية." },
    "/contact": { title: "تواصل معنا واطلب عرض سعر | WONLY", description: "تواصل مع WONLY لطلبات التوزيع والمشاريع وOEM/ODM. يرد فريق المبيعات الخارجية خلال 24 ساعة." },
  },
  fr: {
    "/": { title: "Fabricant de portes de sécurité et serrures intelligentes | WONLY", description: "Fabricant chinois coté de portes de sécurité et serrures intelligentes, avec services OEM/ODM pour distributeurs et projets internationaux." },
    "/contact": { title: "Contact et demande de devis | WONLY", description: "Contactez WONLY pour la distribution, les projets et les demandes OEM/ODM. Notre équipe export répond sous 24 heures." },
  },
  ru: {
    "/": { title: "Производитель защитных дверей и умных замков | WONLY", description: "Китайский биржевой производитель защитных дверей и умных замков. OEM/ODM для дистрибьюторов и международных проектов." },
    "/contact": { title: "Контакты и запрос предложения | WONLY", description: "Свяжитесь с WONLY по вопросам дистрибуции, проектов и OEM/ODM. Экспортная команда отвечает в течение 24 часов." },
  },
  es: {
    "/": { title: "Fabricante de puertas de seguridad y cerraduras inteligentes | WONLY", description: "Fabricante chino cotizado de puertas de seguridad y cerraduras inteligentes, con servicios OEM/ODM para distribuidores y proyectos internacionales." },
    "/contact": { title: "Contacto y solicitud de cotización | WONLY", description: "Contacte con WONLY para distribución, proyectos y OEM/ODM. Nuestro equipo internacional responde en 24 horas." },
  },
};

export function localizedSeo(locale: Locale, path: string, fallback: LocalizedSeo): LocalizedSeo {
  return SEO[locale]?.[path] ?? fallback;
}
