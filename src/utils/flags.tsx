// Drapeaux SVG inline (pas d'emoji : rendu incohérent sous Windows). Utilisés
// par le bouton de bascule de langue du Header.

type FlagProps = { className?: string };

export const FlagFR = ({ className }: FlagProps) => (
  <svg
    className={className}
    viewBox="0 0 3 2"
    aria-hidden="true"
    focusable="false"
  >
    <rect width="1" height="2" x="0" fill="#0055A4" />
    <rect width="1" height="2" x="1" fill="#fff" />
    <rect width="1" height="2" x="2" fill="#EF4135" />
  </svg>
);

export const FlagGB = ({ className }: FlagProps) => (
  <svg
    className={className}
    viewBox="0 0 60 30"
    aria-hidden="true"
    focusable="false"
  >
    <clipPath id="flagGbClip">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>
    <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
    <path
      d="M0,0 L60,30 M60,0 L0,30"
      clipPath="url(#flagGbClip)"
      stroke="#C8102E"
      strokeWidth="4"
    />
    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);
