import { SiteHeader, SiteFooter, CtaBand, GOLD, CHAMP, MUTED, DARK, eyebrow, Reveal } from "@/lib/site-ui";
import { useSeo } from "@/lib/seo";

const UPDATED = "27 July 2026";

type Block = { h: string; ps?: string[]; li?: string[] };

/** Shared legal-page shell: dark hero + white prose card, matching the site style. */
function LegalPage({ eb, title, intro, blocks }: { eb: string; title: string; intro: string; blocks: Block[] }) {
  return (
    <div className="min-w-[320px] bg-[#F5F1EA] text-[#221F20]">
      <SiteHeader />

      {/* Hero */}
      <section className="text-white px-[6vw] pt-[150px] pb-[70px]" style={{ background: "radial-gradient(120% 100% at 78% 15%, #2a2627 0%, #0d0d0d 72%)" }}>
        <Reveal className="max-w-[1000px] mx-auto">
          <div className={eyebrow} style={{ color: CHAMP }}>{eb}</div>
          <h1 className="mt-4 font-light leading-[1.05] tracking-[-1px] text-[clamp(32px,5vw,58px)]">{title}</h1>
          <p className="mt-5 max-w-[640px] text-[15px] leading-[1.75]" style={{ color: "rgba(245,241,234,0.72)" }}>{intro}</p>
          <p className="mt-4 text-[12px] tracking-[0.06em]" style={{ color: "rgba(245,241,234,0.45)" }}>Last updated: {UPDATED}</p>
        </Reveal>
      </section>

      {/* Body */}
      <section>
        <div className="max-w-[860px] mx-auto px-[6vw] py-[70px]">
          {blocks.map((b, i) => (
            <Reveal key={b.h} className={i === 0 ? "" : "mt-10"}>
              <h2 className="font-semibold leading-[1.25] text-[clamp(19px,2.2vw,24px)]">{b.h}</h2>
              {b.ps?.map((p, j) => (
                <p key={j} className="mt-3 text-[15px] leading-[1.8]" style={{ color: MUTED }}>{p}</p>
              ))}
              {b.li && (
                <ul className="mt-3 flex flex-col gap-2">
                  {b.li.map((x) => (
                    <li key={x} className="text-[14.5px] leading-[1.7] pl-[24px] relative" style={{ color: MUTED }}>
                      <span style={{ position: "absolute", left: 0, color: GOLD, fontWeight: 700 }}>·</span>{x}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}

          <Reveal className="mt-12 pt-8 border-t" >
            <p className="text-[14px] leading-[1.8]" style={{ color: DARK }}>
              Questions about this page? Contact us at{" "}
              <a href="mailto:wonlyglobal@wonly.net" style={{ color: GOLD, fontWeight: 600 }}>wonlyglobal@wonly.net</a>.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand eyebrowText="Work With WONLY" title="Partner With a Global Smart-Security Manufacturer" sub="Distributor, project or OEM/ODM enquiry — our team replies within 24 hours." />
      <SiteFooter />
    </div>
  );
}

export function Privacy() {
  useSeo({
    title: "Privacy Policy | WONLY",
    description: "How WONLY (wonlyglobal.com) collects, uses and protects the information you share through our website, contact forms and analytics.",
    path: "/privacy",
  });

  return (
    <LegalPage
      eb="Legal"
      title="Privacy Policy"
      intro="This Privacy Policy explains how WONLY collects, uses, discloses and safeguards the information you provide when you visit wonlyglobal.com or contact us through this website."
      blocks={[
        { h: "1. Who We Are", ps: [
          "This website (wonlyglobal.com) is operated by WONLY, a manufacturer of security doors, smart locks and whole-house smart-security systems serving distributors, projects and partners worldwide.",
          "For any privacy-related request, you can reach us at wonlyglobal@wonly.net.",
        ] },
        { h: "2. Information We Collect", ps: [
          "Information you provide directly: when you submit an enquiry or contact form, we collect the details you enter — such as your name, company, email address, phone number and the content of your message.",
          "Information collected automatically: like most websites, we collect standard technical data such as your IP address, browser and device type, pages visited, referring source and interaction data, through cookies and similar technologies.",
        ] },
        { h: "3. How We Use Your Information", li: [
          "To respond to your enquiries and provide the product, pricing or partnership information you request.",
          "To operate, maintain and improve our website and understand how it is used.",
          "To communicate with you about your enquiry and, where relevant, our products and services.",
          "To comply with applicable legal obligations and protect the security of our website.",
        ] },
        { h: "4. Cookies & Analytics", ps: [
          "We use cookies and analytics tools — including Google Analytics and Microsoft Clarity, managed via Google Tag Manager — to measure traffic and improve the website experience. These tools may set cookies and collect usage data such as pages viewed and general location.",
          "You can control or disable cookies through your browser settings. You may also opt out of Google Analytics using Google's browser add-on. Disabling cookies will not prevent you from browsing the site.",
        ] },
        { h: "5. How We Share Information", ps: [
          "We do not sell your personal information. We may share it with trusted service providers who help us operate the website and process your enquiries (for example, our form-delivery and analytics providers), and only to the extent necessary for those purposes.",
          "We may also disclose information where required by law, regulation or valid legal process, or to protect our rights and the safety of others.",
        ] },
        { h: "6. Third-Party Services", ps: [
          "Our website relies on third-party services including Google (Analytics, Tag Manager), Microsoft (Clarity) and our contact-form delivery provider. These providers process data under their own privacy policies. Our website may also link to third-party sites, whose content and privacy practices we do not control.",
        ] },
        { h: "7. Data Retention", ps: [
          "We retain enquiry information for as long as needed to respond to and follow up on your request, to maintain our business records, and to comply with legal obligations, after which it is deleted or anonymised.",
        ] },
        { h: "8. Your Rights", ps: [
          "Depending on your location, you may have the right to access, correct, update or request deletion of your personal information, to object to or restrict certain processing, and to withdraw consent. To exercise any of these rights, email us at wonlyglobal@wonly.net and we will respond in line with applicable law.",
        ] },
        { h: "9. International Transfers", ps: [
          "As a global manufacturer, we may process information in countries other than your own. Where we do, we take steps to ensure your information remains protected in accordance with this policy and applicable law.",
        ] },
        { h: "10. Children's Privacy", ps: [
          "This website is intended for business audiences and is not directed to children. We do not knowingly collect personal information from children.",
        ] },
        { h: "11. Changes to This Policy", ps: [
          "We may update this Privacy Policy from time to time. The revised version will be posted on this page with an updated \"Last updated\" date.",
        ] },
      ]}
    />
  );
}

export function Terms() {
  useSeo({
    title: "Terms of Service | WONLY",
    description: "The terms governing your use of the WONLY website (wonlyglobal.com), including intellectual property, product information and liability.",
    path: "/terms",
  });

  return (
    <LegalPage
      eb="Legal"
      title="Terms of Service"
      intro="These Terms of Service govern your access to and use of the WONLY website at wonlyglobal.com. By using this website, you agree to these terms."
      blocks={[
        { h: "1. Acceptance of Terms", ps: [
          "By accessing or using wonlyglobal.com, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, please do not use this website.",
        ] },
        { h: "2. About This Website", ps: [
          "This website is an informational and business platform operated by WONLY, presenting our security doors, smart locks, smart windows and whole-house smart-security systems to distributors, projects and partners worldwide. It is not an online store, and submitting an enquiry does not create a binding contract.",
        ] },
        { h: "3. Use of the Website", li: [
          "You may use this website for lawful, informational and legitimate business purposes only.",
          "You agree not to misuse the website, interfere with its operation or security, attempt unauthorised access, or use automated means to extract content without permission.",
          "You are responsible for the accuracy of any information you submit through our forms.",
        ] },
        { h: "4. Intellectual Property", ps: [
          "All content on this website — including text, images, product designs, logos, trademarks and layout — is owned by WONLY or its licensors and is protected by intellectual-property laws. \"WONLY\" and related marks are trademarks of the company.",
          "You may not reproduce, distribute, modify or use any content for commercial purposes without our prior written consent.",
        ] },
        { h: "5. Product Information", ps: [
          "Product specifications, images, certifications and availability are provided for general information and may be updated or improved without notice. Colours, finishes and technical details may vary from those shown. Please confirm current specifications with our team before making any decision.",
        ] },
        { h: "6. Enquiries & Communications", ps: [
          "When you submit an enquiry, you consent to us contacting you in response. No sale, quotation or supply agreement is formed until confirmed separately in writing by WONLY.",
        ] },
        { h: "7. Third-Party Links", ps: [
          "This website may contain links to third-party websites or services that we do not control. We are not responsible for their content, policies or practices, and links do not imply endorsement.",
        ] },
        { h: "8. Disclaimer of Warranties", ps: [
          "This website is provided on an \"as is\" and \"as available\" basis. To the fullest extent permitted by law, WONLY makes no warranties, express or implied, regarding the website's accuracy, reliability or availability, and disclaims all implied warranties.",
        ] },
        { h: "9. Limitation of Liability", ps: [
          "To the fullest extent permitted by law, WONLY shall not be liable for any indirect, incidental or consequential damages arising from your use of, or inability to use, this website or its content.",
        ] },
        { h: "10. Changes to These Terms", ps: [
          "We may revise these Terms of Service at any time. Changes take effect when posted on this page with an updated \"Last updated\" date. Your continued use of the website constitutes acceptance of the revised terms.",
        ] },
        { h: "11. Governing Law", ps: [
          "These terms are governed by the laws of the People's Republic of China, without regard to conflict-of-law principles, unless otherwise required by the mandatory law of your country of residence.",
        ] },
      ]}
    />
  );
}
