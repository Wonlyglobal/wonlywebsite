import { Link } from "react-router-dom";
import { Radar, Fingerprint, Smartphone, ShieldAlert, BatteryCharging, Bell, ArrowRight, Check, ScanFace, DoorOpen, Home, Building2, Hotel, KeyRound } from "lucide-react";
import { useSeo, SITE_URL } from "@/lib/seo";
import { GOLD, CHAMP, SILVER, CHAMP_BG, DARK, MUTED, BASE, eyebrow, h2cls, Reveal, SiteHeader, SiteFooter, CtaBand } from "@/lib/site-ui";

const IMG = {
  lock: `${BASE}images/lock-s80.webp`,
  render: `${BASE}images/lock-s80-render.webp`,
  band: `${BASE}images/factory-abb.webp`,
};

const HIGHLIGHTS = [
  "Hands-free entry the moment you arrive",
  "Enterprise-grade encryption end to end",
  "Silent, weather-sealed for -25 °C to 70 °C",
];

const STEPS = [
  { icon: Radar, n: "01", t: "Sense", d: "Millimetre-wave radar detects your approach from up to two metres and wakes the lock — no button, no reach for a handle." },
  { icon: ScanFace, n: "02", t: "Verify", d: "3D structured-light face and capacitive fingerprint confirm you in under a second, with liveness checks that reject photos and masks." },
  { icon: DoorOpen, n: "03", t: "Enter", d: "The silent motorised bolt retracts and the door is open the instant you reach it — arms full of groceries, no problem." },
];

const FEATURES = [
  { icon: Radar, t: "True Long-Range Sensing", d: "Detects your approach from a distance and unlocks hands-free — the difference between a smart lock and a truly automatic one." },
  { icon: Fingerprint, t: "Multi-Biometric Entry", d: "Fingerprint, face and PIN in one unit, with anti-spoofing algorithms trained on millions of samples." },
  { icon: Smartphone, t: "App & Remote Control", d: "Grant, schedule and revoke access from anywhere; real-time entry logs and one-time guest passes." },
  { icon: ShieldAlert, t: "Tamper-Proof Architecture", d: "Pry, drill and mute-attack detection with instant push alerts and an auto-lock defense mode." },
  { icon: BatteryCharging, t: "12-Month Battery", d: "Ultra-low-power sensing runs up to a year per charge, with USB-C emergency power on the base." },
  { icon: Bell, t: "Smart-Home Ready", d: "Integrates with WONLY whole-house intelligence and major ecosystems for scenes and voice control." },
];

const DESIGN = [
  "Full-height tempered-glass touch fascia",
  "Silent motorised deadbolt drive",
  "Cast-aluminum body, anti-corrosion finish",
  "One-touch interior quick-exit",
];

const SCENARIOS = [
  { icon: Home, t: "Homes & Apartments", d: "Effortless daily entry for the whole family, with guest passes and a full entry history in the app." },
  { icon: Building2, t: "Villas & Estates", d: "Pairs with WONLY security doors and whole-house intelligence for one seamless, coordinated system." },
  { icon: Hotel, t: "Rentals & Short-Let", d: "Issue time-limited codes remotely and revoke them instantly at checkout — no key handovers." },
  { icon: KeyRound, t: "Offices & Commercial", d: "Role-based access, audit logs and alarm integration for controlled, accountable entrances." },
];

const SPECS: [string, string][] = [
  ["Unlocking", "Long-range sensing · Fingerprint · Face · PIN · App · Card · Key"],
  ["Sensor", "3D structured-light face + capacitive fingerprint"],
  ["Material", "Cast-aluminum alloy body, anti-corrosion finish"],
  ["Connectivity", "Wi-Fi + Bluetooth 5.0"],
  ["Power", "Rechargeable Li-ion, ~12 months / charge, USB-C backup"],
  ["Alarms", "Pry / drill / mute-attack / low-battery push alerts"],
  ["Compatibility", "Doors 38–120 mm thick, standard mortise"],
  ["Certification", "CE · FCC · RoHS · national smart-lock standard"],
];

const SmartLockS80 = () => {
  useSeo({
    title: "WONLY S80 True-Sensing Smart Lock | Hands-Free Biometric Door Lock",
    description:
      "The WONLY S80 smart lock: hands-free long-range sensing, multi-biometric entry, app control and tamper-proof architecture — engineered by a listed (SSE: 605268) manufacturer.",
    path: "/products/smart-locks/s80",
    type: "product",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "WONLY S80 True-Sensing Smart Lock",
      brand: { "@type": "Brand", name: "WONLY" },
      category: "Smart Lock",
      url: SITE_URL + "/products/smart-locks/s80",
    },
  });

  return (
    <div className="w-full font-sans antialiased overflow-x-hidden" style={{ background: CHAMP_BG, color: DARK }}>
      <SiteHeader />

      {/* Hero */}
      <section className="relative min-h-[92vh] w-full overflow-hidden flex items-center" style={{ background: "radial-gradient(120% 90% at 80% 20%, #2a2627 0%, #0d0d0d 70%)" }}>
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[7vw] grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-24 pb-16">
          <div>
            <div className={eyebrow + " mb-6"} style={{ color: CHAMP }}>Smart Locks · Flagship</div>
            <h1 className="font-light uppercase text-white leading-[1.06] tracking-[0.05em] text-[40px] md:text-[68px]">S80<br /><span style={{ color: CHAMP }}>True-Sensing</span><br />Smart Lock</h1>
            <p className="mt-7 max-w-md text-base md:text-lg font-normal leading-relaxed" style={{ color: "#efe9dd" }}>Walk up and in. The S80 senses your approach and unlocks hands-free — biometric, app-controlled and tamper-proof.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]" style={{ background: GOLD, color: DARK }}>Get a Quote <ArrowRight size={15} /></Link>
              <a href="#specs" className="inline-flex items-center px-7 py-3.5 rounded-full text-sm font-medium border transition-colors hover:bg-white/5" style={{ borderColor: "rgba(255,255,255,0.25)", color: "#fff" }}>View Specs</a>
            </div>
          </div>
          <Reveal className="relative">
            <div className="relative mx-auto w-full max-w-[420px] aspect-[3/4] rounded-3xl overflow-hidden" style={{ background: "linear-gradient(160deg, rgba(212,196,160,0.14), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.1)" }}>
              <img src={IMG.lock} alt="WONLY S80 smart lock" className="absolute inset-0 w-full h-full object-contain p-8" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Overview highlights */}
      <section className="px-[7vw] py-20 md:py-24" style={{ background: "#fff" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h} delay={i * 90}>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: `${GOLD}1f` }}><Check size={14} style={{ color: GOLD }} /></span>
                <span className="text-base font-normal leading-relaxed" style={{ color: DARK }}>{h}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-[7vw] py-20 md:py-28" style={{ background: CHAMP_BG }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>How It Works</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>Three steps. Under two seconds.</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className="rounded-2xl p-8 h-full" style={{ background: "#fff", border: `1px solid ${SILVER}44` }}>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: GOLD }}><s.icon size={22} style={{ color: "#fff" }} /></div>
                  <span className="text-3xl font-light" style={{ color: SILVER }}>{s.n}</span>
                </div>
                <h3 className="mt-6 text-xl font-medium" style={{ color: DARK }}>{s.t}</h3>
                <p className="mt-2.5 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>Engineered In</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>Security you never have to think about.</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <Reveal key={f.t} delay={(i % 3) * 80}>
              <div className="group h-full rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(34,31,32,0.28)]" style={{ background: "#f7f7f5", borderColor: `${SILVER}66` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: GOLD }}>
                  <f.icon size={20} style={{ color: "#fff" }} />
                </div>
                <h3 className="mt-5 text-lg font-medium" style={{ color: DARK }}>{f.t}</h3>
                <p className="mt-2.5 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Design — front & back */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: CHAMP_BG }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <div className={eyebrow} style={{ color: GOLD }}>Design</div>
            <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>Considered from every angle.</h2>
            <p className="mt-6 text-base font-normal leading-relaxed" style={{ color: MUTED }}>
              A full-height tempered-glass fascia keeps the camera, face sensor and backlit keypad hidden until you need them. The interior panel keeps everyday controls within reach — one-touch exit, volume and a manual override — all in a single cast-aluminum body finished to resist corrosion and daily wear.
            </p>
            <ul className="mt-7 space-y-3">
              {DESIGN.map((x) => (
                <li key={x} className="flex items-start gap-3"><span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${GOLD}22` }}><Check size={13} style={{ color: GOLD }} /></span><span className="text-sm font-normal" style={{ color: DARK }}>{x}</span></li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: `1px solid ${SILVER}44` }}>
              <img src={IMG.render} alt="WONLY S80 front and back design" loading="lazy" className="w-full h-auto object-contain p-6" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Precision band */}
      <section className="relative h-[54vh] min-h-[360px] w-full overflow-hidden flex items-center justify-center">
        <img src={IMG.band} alt="WONLY precision manufacturing" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(rgba(34,31,32,0.55), rgba(34,31,32,0.72))" }} />
        <Reveal className="relative z-10 text-center px-6 max-w-4xl">
          <div className={eyebrow + " mb-5"} style={{ color: CHAMP }}>Precision Engineered</div>
          <h2 className="font-light text-white leading-[1.1] text-[28px] md:text-[50px]">Built to the same standard as our vault doors.</h2>
        </Reveal>
      </section>

      {/* Where it fits */}
      <section className="px-[7vw] py-24 md:py-32" style={{ background: "#fff" }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>Where It Fits</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>One lock, every kind of door.</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SCENARIOS.map((s, i) => (
            <Reveal key={s.t} delay={(i % 4) * 80}>
              <div className="group h-full rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(34,31,32,0.28)]" style={{ background: "#f7f7f5", borderColor: `${SILVER}66` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ background: GOLD }}><s.icon size={20} style={{ color: "#fff" }} /></div>
                <h3 className="mt-5 text-lg font-medium" style={{ color: DARK }}>{s.t}</h3>
                <p className="mt-2.5 text-sm font-normal leading-relaxed" style={{ color: MUTED }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Specs */}
      <section id="specs" className="px-[7vw] py-24 md:py-32" style={{ background: CHAMP_BG }}>
        <Reveal className="max-w-3xl">
          <div className={eyebrow} style={{ color: GOLD }}>Technical Specifications</div>
          <h2 className={h2cls + " mt-5"} style={{ color: DARK }}>The details, in full.</h2>
        </Reveal>
        <div className="mt-12 max-w-4xl border-t" style={{ borderColor: `${SILVER}66` }}>
          {SPECS.map(([k, v]) => (
            <Reveal key={k}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 py-5 border-b" style={{ borderColor: `${SILVER}44` }}>
                <div className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: GOLD }}>{k}</div>
                <div className="md:col-span-2 text-sm md:text-base font-normal" style={{ color: DARK }}>{v}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs font-light" style={{ color: MUTED }}>Specifications are indicative and may vary by market and configuration.</p>
      </section>

      <CtaBand eyebrowText="Order & OEM" title="Bring the S80 to your market." sub="Request pricing, samples or OEM/ODM configurations — our team replies within 24 hours." />
      <SiteFooter />
    </div>
  );
};

export default SmartLockS80;
