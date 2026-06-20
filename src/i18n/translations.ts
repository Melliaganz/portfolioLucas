export type Lang = "fr" | "en";

// Dictionnaires de tous les textes statiques de l'interface. Les textes des
// données (projets, parcours) sont localisés directement dans leurs fichiers
// via le type Localized ci-dessous.
export interface Localized {
  fr: string;
  en: string;
}
export interface LocalizedList {
  fr: string[];
  en: string[];
}

const fr = {
  header: {
    about: "À propos",
    projects: "Projets",
    contact: "Contact",
    cv: "CV",
    cvFormat: " (PDF)",
    backToTop: "Retour en haut",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    nav: "Navigation principale",
    switchToEn: "English",
    switchToFr: "Français",
    langLabel: "Changer de langue",
  },
  hero: {
    available: "Disponible en freelance",
    titleLead: "Développeur",
    react: "React",
    mobile: "Mobile",
    description:
      "Je conçois des expériences web et mobiles performantes, accessibles et modernes. Expert en écosystème JavaScript, je transforme vos idées en produits digitaux robustes.",
    viewProjects: "Voir mes projets",
    contactMe: "Me contacter",
  },
  tech: {
    title: "Stack technique principale",
  },
  projects: {
    title: "Mes Projets",
    subtitleScroll: "Découvrez mes projets (glissez pour explorer).",
    subtitleStatic: "Mes projets.",
    all: "Tout",
    codeAria: (t: string) => `Voir le code source de ${t} sur GitHub`,
    liveAria: (t: string) => `Voir la démo en direct de ${t}`,
  },
  caseStudy: {
    imageAlt: "Logo de l'application Impots.gouv",
    title: "Impots.gouv — l'application mobile officielle",
    subtitle:
      "Développeur / analyste sur une application grand public, de la conception à la livraison sur les stores.",
    contexteTitle: "Contexte",
    contexteText:
      "Au sein de la DGFiP, je participe au développement de l'application mobile officielle des impôts, utilisée par des millions de contribuables sur Android et iOS.",
    roleTitle: "Mon rôle",
    roleItems: [
      "Étude des spécifications de la MOA",
      "Conception générale et détaillée",
      "Développement des cas d'utilisation",
      "Mise en conformité accessibilité (RGAA)",
      "Tests unitaires et mise en commun (Subversion)",
      "Confection des APK/IPA et livraison à la MOA",
      "Dépôt sur les stores Apple et Android",
      "Nombreuses mises en production",
      "Résolution d'incidents en production",
    ],
    defisTitle: "Défis",
    defisText:
      "Opérer une application critique à grande échelle : exigences de sécurité et de conformité du secteur public, cycle de livraison maîtrisé (validation MOA, publication sur les stores) et support de production réactif.",
    impactTitle: "Impact",
    impactText:
      "Application livrée et maintenue sur les deux stores, avec des mises en production régulières et une résolution continue des incidents pour garantir la disponibilité du service.",
    viewApp: "Voir l'application",
  },
  quality: {
    title: "Exigence technique",
    subtitle:
      "La qualité ne se voit pas toujours, mais elle se mesure. Ce site en est la démonstration : voici comment je travaille.",
    perfTitle: "Performance",
    perfText:
      "Code-splitting, préchargement des chunks, images WebP en lazy et CSS minifié. Bundle d'entrée optimisé pour un premier rendu quasi instantané.",
    securityTitle: "Sécurité",
    securityText:
      "CSP stricte (nonce par requête + strict-dynamic), Trusted Types et en-têtes durcis (HSTS, anti-clickjacking) servis via Edge Middleware.",
    a11yTitle: "Accessibilité",
    a11yText:
      "Navigation clavier complète, focus trap sur les modales, respect de prefers-reduced-motion, attributs ARIA et contrastes soignés.",
    reliabilityTitle: "Fiabilité",
    reliabilityText:
      "TypeScript strict, suite de tests automatisés (Vitest) et intégration continue (lint + tests + build) déclenchée à chaque push.",
    repoLink: "Voir le code source de ce site",
  },
  mobileApp: {
    title: "Le portfolio en application",
    text: "Ce site existe aussi en application Android native. Scannez le QR code pour l'installer, ou téléchargez l'APK directement.",
    download: "Télécharger l'APK",
    scan: "Scannez pour installer",
    androidOnly: "Android uniquement",
  },
  parcours: {
    title: "Mon Parcours",
    more: "Voir plus",
    less: "Voir moins",
  },
  contact: {
    title: "Travaillons ensemble",
    subtitle:
      "Spécialiste React & TypeScript, je construis des applications web et mobiles évolutives.",
    email: "Email",
    location: "Localisation",
    locationValue: "Paris, France",
    follow: "Suivez-moi",
    formTitle: "Envoyer un message",
    name: "Nom",
    namePh: "John Doe",
    emailLabel: "Email",
    emailPh: "john@example.com",
    subject: "Sujet",
    subjectProject: "Demande de projet",
    subjectFreelance: "Opportunité freelance",
    subjectGeneral: "Question générale",
    message: "Message",
    messagePh: "Décrivez votre projet...",
    send: "Envoyer",
    sending: "Envoi...",
    sent: "Envoyé !",
  },
  footer: {
    rights: "Tous droits réservés.",
  },
  cvModal: {
    title: "Mon CV",
    download: "Télécharger",
    close: "Fermer l'aperçu du CV",
    iframeTitle: "Aperçu du CV de Lucas Lengrand",
  },
  popup: {
    androidTitle: "Version Android disponible",
    iosTitle: "Application Mobile",
    androidDesc:
      "Téléchargez l'APK pour profiter d'une expérience fluide et native sur votre smartphone.",
    iosDesc:
      "Mon application arrive bientôt sur iOS. En attendant, continuez la visite sur le web !",
    download: "Télécharger l'APK",
    continue: "Continuer sur le navigateur",
  },
};

const en: typeof fr = {
  header: {
    about: "About",
    projects: "Projects",
    contact: "Contact",
    cv: "Resume",
    cvFormat: " (PDF)",
    backToTop: "Back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    nav: "Main navigation",
    switchToEn: "English",
    switchToFr: "Français",
    langLabel: "Change language",
  },
  hero: {
    available: "Available for freelance",
    titleLead: "Developer",
    react: "React",
    mobile: "Mobile",
    description:
      "I build fast, accessible and modern web and mobile experiences. A JavaScript ecosystem expert, I turn your ideas into robust digital products.",
    viewProjects: "View my projects",
    contactMe: "Get in touch",
  },
  tech: {
    title: "Core tech stack",
  },
  projects: {
    title: "My Projects",
    subtitleScroll: "Explore my projects (drag to browse).",
    subtitleStatic: "My projects.",
    all: "All",
    codeAria: (t: string) => `View the source code of ${t} on GitHub`,
    liveAria: (t: string) => `View the live demo of ${t}`,
  },
  caseStudy: {
    imageAlt: "Impots.gouv app logo",
    title: "Impots.gouv — the official mobile app",
    subtitle:
      "Developer / analyst on a consumer-grade application, from design to store delivery.",
    contexteTitle: "Context",
    contexteText:
      "At the DGFiP (French tax authority), I help build the official tax mobile app, used by millions of taxpayers on Android and iOS.",
    roleTitle: "My role",
    roleItems: [
      "Analysis of the business requirements",
      "High-level and detailed design",
      "Development of use cases",
      "Accessibility compliance (RGAA standard)",
      "Unit testing and version control (Subversion)",
      "Building the APK/IPA and delivery to the business team",
      "Publishing on the Apple and Android stores",
      "Numerous production releases",
      "Production incident resolution",
    ],
    defisTitle: "Challenges",
    defisText:
      "Operating a critical app at scale: public-sector security and compliance requirements, a controlled delivery cycle (business validation, store publishing) and responsive production support.",
    impactTitle: "Impact",
    impactText:
      "App shipped and maintained on both stores, with regular production releases and continuous incident resolution to keep the service available.",
    viewApp: "View the app",
  },
  quality: {
    title: "Technical standards",
    subtitle:
      "Quality isn't always visible, but it can be measured. This site is the proof: here's how I work.",
    perfTitle: "Performance",
    perfText:
      "Code-splitting, chunk preloading, lazy WebP images and minified CSS. An entry bundle tuned for a near-instant first render.",
    securityTitle: "Security",
    securityText:
      "Strict CSP (per-request nonce + strict-dynamic), Trusted Types and hardened headers (HSTS, anti-clickjacking) served via Edge Middleware.",
    a11yTitle: "Accessibility",
    a11yText:
      "Full keyboard navigation, focus trap on modals, prefers-reduced-motion support, ARIA attributes and careful contrast.",
    reliabilityTitle: "Reliability",
    reliabilityText:
      "Strict TypeScript, an automated test suite (Vitest) and continuous integration (lint + tests + build) on every push.",
    repoLink: "View the source code of this site",
  },
  mobileApp: {
    title: "The portfolio as an app",
    text: "This site also exists as a native Android app. Scan the QR code to install it, or download the APK directly.",
    download: "Download the APK",
    scan: "Scan to install",
    androidOnly: "Android only",
  },
  parcours: {
    title: "My Journey",
    more: "Show more",
    less: "Show less",
  },
  contact: {
    title: "Let's work together",
    subtitle:
      "A React & TypeScript specialist, I build scalable web and mobile applications.",
    email: "Email",
    location: "Location",
    locationValue: "Paris, France",
    follow: "Follow me",
    formTitle: "Send a message",
    name: "Name",
    namePh: "John Doe",
    emailLabel: "Email",
    emailPh: "john@example.com",
    subject: "Subject",
    subjectProject: "Project request",
    subjectFreelance: "Freelance opportunity",
    subjectGeneral: "General question",
    message: "Message",
    messagePh: "Describe your project...",
    send: "Send",
    sending: "Sending...",
    sent: "Sent!",
  },
  footer: {
    rights: "All rights reserved.",
  },
  cvModal: {
    title: "My resume",
    download: "Download",
    close: "Close resume preview",
    iframeTitle: "Resume preview of Lucas Lengrand",
  },
  popup: {
    androidTitle: "Android version available",
    iosTitle: "Mobile App",
    androidDesc:
      "Download the APK for a smooth, native experience on your smartphone.",
    iosDesc:
      "My app is coming soon to iOS. In the meantime, keep browsing on the web!",
    download: "Download the APK",
    continue: "Continue on the web",
  },
};

export const dictionaries = { fr, en };
export type Dictionary = typeof fr;
