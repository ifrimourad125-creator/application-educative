import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

export default class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (import.meta.env.DEV) console.error('Application error:', error);
  }

  private reload = () => {
    if (typeof window !== 'undefined') window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main
        role="alert"
        className="min-h-[100dvh] flex items-center justify-center bg-slate-950 text-slate-100 p-6"
      >
        <section className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-7 text-center shadow-2xl">
          <h1 className="text-xl font-black">Une erreur est survenue</h1>
          <p className="mt-2 text-sm text-slate-300">
            L’application n’a pas pu afficher cette page correctement.
          </p>
          <button
            type="button"
            onClick={this.reload}
            className="mt-5 rounded-xl bg-sky-500 px-5 py-3 font-bold text-white hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            Recharger l’application
          </button>
        </section>
      </main>
    );
  }
}
