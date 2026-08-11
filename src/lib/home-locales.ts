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
