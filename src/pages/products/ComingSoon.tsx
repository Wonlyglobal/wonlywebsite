import { Link } from "react-router-dom";

/**
 * Temporary placeholder for the five product-line routes. Swap this out for the
 * real product page (per line) when it's built — the routes in App.tsx already
 * point here so the nav dropdown and homepage gallery never hit a 404.
 */
export default function ProductComingSoon({ name, eyebrow = "WONLY Products" }: { name: string; eyebrow?: string }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ background: "#0d0d0d" }}>
      <div className="text-[11px] tracking-[0.4em] uppercase font-light" style={{ color: "#BFA06A" }}>{eyebrow}</div>
      <h1 className="mt-4 text-3xl md:text-5xl font-light text-white">{name}</h1>
      <p className="mt-4 text-sm md:text-base" style={{ color: "rgba(245,241,234,0.6)" }}>Page coming soon.</p>
      <Link
        to="/"
        className="mt-9 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-transform hover:scale-[1.03]"
        style={{ background: "#BFA06A", color: "#0d0d0d" }}
      >
        ← Back to home
      </Link>
    </main>
  );
}
