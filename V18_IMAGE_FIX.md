# V18 — Correction des images de lecture

Le test réel a montré une icône d'image cassée sur la séance « Créations écolo ».
La cause était que les fichiers `.webp` présents dans l'archive n'étaient pas des images
WebP valides malgré leur extension.

V18 :
- remplace l'image de « Créations écolo » par une image WebP valide et locale ;
- ajoute un comportement de secours pour éviter l'icône d'image cassée si un autre fichier
  image est encore invalide ;
- ne change ni le texte, ni les routes, ni le design général.

Les autres illustrations doivent ensuite être régénérées individuellement pour garantir
une image réaliste propre à chaque thème.
