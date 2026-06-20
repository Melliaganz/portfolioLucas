import imageOptique from "../assets/images/optique.webp";
import imageKanap from "../assets/images/kanap.webp";
import imageGroupomania from "../assets/images/Groupomania.webp";
import imagePiquante from "../assets/images/piquante.webp";
import imageNetflix from "../assets/images/Netflix.webp";
import imageImpots from "../assets/images/impots.webp";
import logoDiscord from "../assets/images/discordLogoP.webp";

import type { Localized } from "../i18n/translations";

export interface Project {
  id: number;
  title: string;
  year: string;
  description: Localized;
  tags: string[];
  category: "Mobile" | "React" | "Fullstack" | "Backend";
  image: string;
  githubUrl?: string;
  liveUrl?: string;
}
declare const __APP_YEAR__: string;

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Impots.gouv",
    year: `2023-${__APP_YEAR__}`,
    description: {
      fr: "Développeur / Analyste sur l'application mobile officielle. Conception, développements des CUs, gestion des livraisons APK/IPA et résolution d'incidents de production.",
      en: "Developer / analyst on the official mobile app. Design, use-case development, APK/IPA delivery management and production incident resolution.",
    },
    tags: [
      "React Native",
      "Kotlin",
      "Gradle",
      "Android Studio",
      "Xcode",
      "Firebase",
    ],
    category: "Mobile",
    image: imageImpots,
    liveUrl: "dgfip_smart_link",
  },
  {
    id: 2,
    title: "MellianBot",
    year: "2024",
    description: {
      fr: "Bot Discord multi-serveur spécialisé dans la lecture musicale haute fidélité avec intégration des API Spotify et YouTube.",
      en: "Multi-server Discord bot focused on high-fidelity music playback, with Spotify and YouTube API integration.",
    },
    tags: ["Node.js", "TypeScript", "Spotify API", "YouTube API", "Docker"],
    category: "Backend",
    image: logoDiscord,
    githubUrl: "https://github.com/Melliaganz/MellianBotV2",
    liveUrl:
      "https://discord.com/oauth2/authorize?client_id=1264609819533250600&permissions=3145728&scope=bot",
  },
  {
    id: 3,
    title: "Optique Chatenay",
    year: "2023",
    description: {
      fr: "Site vitrine interactif réalisé sur mesure. Collaboration avec un studio de design et intégration Firebase pour la gestion dynamique de la galerie photos.",
      en: "Custom-built interactive showcase website. Built with a design studio, with Firebase integration for the dynamic photo gallery.",
    },
    tags: ["React", "Firebase", "Vercel"],
    category: "React",
    image: imageOptique,
    liveUrl: "https://www.optiquechatenay.fr/",
  },
  {
    id: 4,
    title: "Clone Netflix",
    year: "2023",
    description: {
      fr: "Application web réactive simulant l'expérience Netflix : navigation fluide, recherche de contenus et base de données temps réel pour les préférences utilisateurs.",
      en: "Responsive web app mirroring the Netflix experience: smooth browsing, content search and a real-time database for user preferences.",
    },
    tags: ["React", "Firebase", "Vercel"],
    category: "React",
    image: imageNetflix,
    githubUrl: "https://github.com/Melliaganz/netflix-clone",
    liveUrl: "https://netflix-clone-iota-vert.vercel.app/",
  },
  {
    id: 5,
    title: "Groupomania",
    year: "2022",
    description: {
      fr: "Réseau social interne d'entreprise. Mise en œuvre d'un stockage sécurisé, authentification utilisateur et interface interactive.",
      en: "Internal corporate social network. Secure storage, user authentication and an interactive interface.",
    },
    tags: ["Node.js", "Express", "React", "MySQL", "Sequelize"],
    category: "Fullstack",
    image: imageGroupomania,
    githubUrl: "https://github.com/Melliaganz/Groupomania",
    liveUrl: "https://groupomania-eta.vercel.app/login",
  },
  {
    id: 6,
    title: "Hot Takes (Piquante)",
    year: "2022",
    description: {
      fr: "Construction d'une API sécurisée pour une application de critique de sauces piquantes. Développement complet du CRUD et sécurisation des données.",
      en: "Built a secure API for a hot-sauce review app. Full CRUD development and data security.",
    },
    tags: ["Node.js", "Express", "MongoDB", "Mongoose"],
    category: "Backend",
    image: imagePiquante,
    githubUrl: "https://github.com/Melliaganz/Piquante",
    liveUrl: "https://piquante.vercel.app/login",
  },
  {
    id: 7,
    title: "Kanap",
    year: "2022",
    description: {
      fr: "Plateforme e-commerce front-end. Gestion dynamique du panier, interaction avec un service web et validation rigoureuse des données.",
      en: "Front-end e-commerce platform. Dynamic cart management, web service interaction and rigorous data validation.",
    },
    tags: ["JavaScript", "HTML5", "CSS3"],
    category: "Fullstack",
    image: imageKanap,
    githubUrl: "https://github.com/Melliaganz/Kanap",
    liveUrl: "https://kanap-lyart.vercel.app/",
  },
];
