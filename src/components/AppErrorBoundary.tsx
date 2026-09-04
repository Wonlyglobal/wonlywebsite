import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { failed: boolean };

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("WONLY application render failed", error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="min-h-screen grid place-items-center bg-[#0d0d0d] px-6 text-white">
        <section className="max-w-xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.24em] text-[#c8a96b]">WONLY</p>
          <h1 className="text-3xl font-semibold">The page could not finish loading.</h1>
          <p className="mt-4 text-white/70">Please reload to fetch the latest website version. Your enquiry has not been submitted or changed.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button className="rounded-full bg-[#c8a96b] px-6 py-3 font-medium text-[#17130c]" onClick={() => window.location.reload()}>
              Reload page
            </button>
            <a className="rounded-full border border-white/30 px-6 py-3" href="/">Return home</a>
          </div>
        </section>
      </main>
    );
  }
}
