import { useEffect, useState } from "react"

import {
  isSoundEnabled,
  playSound,
  setSoundEnabled,
  subscribeSoundPreference,
} from "../utils/sound"

function SoundToggle({ className = "" }: { className?: string }) {
  const [enabled, setEnabled] = useState(isSoundEnabled())

  useEffect(() => subscribeSoundPreference(setEnabled), [])

  const handleToggle = () => {
    const nextEnabled = !enabled

    playSound("click")
    setSoundEnabled(nextEnabled)
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`sound-toggle ${enabled ? "sound-toggle--on" : "sound-toggle--off"} ${className}`.trim()}
      aria-pressed={enabled}
      aria-label={enabled ? "Désactiver les sons" : "Activer les sons"}
      title={enabled ? "Son activé" : "Son désactivé"}
    >
      <span className="sound-toggle__glow" />
      <span className="sound-toggle__dot" aria-hidden="true" />
      <span className="sound-toggle__icon" aria-hidden="true">
        {enabled ? "🔊" : "🔇"}
      </span>
      <span className="sound-toggle__text">{enabled ? "Son activé" : "Son muet"}</span>
    </button>
  )
}

export default SoundToggle
