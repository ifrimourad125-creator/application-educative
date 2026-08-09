export default function StartupScreen() {
  return (
    <section
      className="startup-screen"
      role="status"
      aria-live="polite"
      aria-label="Démarrage de l’application Français Collège"
    >
      <div className="startup-aurora startup-aurora--left" />
      <div className="startup-aurora startup-aurora--right" />

      <div className="startup-content flex flex-col items-center justify-center w-full">
        <div className="flex items-center justify-center w-full mb-8 relative" aria-hidden="true">
          <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none scale-150" />
          <img 
            src="/mon%20logo.png" 
            alt="" 
            className="w-56 h-56 sm:w-72 sm:h-72 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" 
          />
        </div>

        <div className="startup-text text-center">
          <div className="startup-kicker">Collège Pionnier</div>
          <h1>Français Collège</h1>
          <p>Ouverture de votre espace d’apprentissage...</p>
        </div>
        <div className="startup-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  )
}
