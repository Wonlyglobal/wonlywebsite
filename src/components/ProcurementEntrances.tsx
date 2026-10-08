import { Link } from 'react-router-dom';
import { useLocale } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';
import procurement from '../../content/settings/procurement.json';
export function ProcurementEntrances() {
  const { t } = useLocale();
  return <section id="procurement" className="bg-[#F5F1EA] px-6 py-14 md:px-10 md:py-20"><div className="mx-auto max-w-6xl">
    <h2 className="text-3xl md:text-4xl font-light">{t('Choose Your Procurement Path')}</h2>
    <div className="mt-8 grid gap-4 md:grid-cols-3">{Object.entries(procurement).map(([key, item]) => <Link key={key} to={`/${key}/`} onClick={() => trackEvent('cta_click', { source_section: 'homepage_procurement', cta_name: item.label, destination: `/${key}/` })} className="rounded-2xl border border-[#ded6c8] bg-white p-7 text-lg hover:border-[#BFA06A] focus-visible:outline focus-visible:outline-2"><h3>{t(item.label)}</h3><span className="mt-5 block text-sm">{t('Explore requirements')} →</span></Link>)}</div>
  </div></section>;
}
