import imageOptique from "../assets/images/optique.webp";
import imageKanap from "../assets/images/kanap.webp";
import imageGroupomania from "../assets/images/Groupomania.webp";
import imagePiquante from "../assets/images/piquante.webp";
import imageNetflix from "../assets/images/Netflix.webp";
import imageImpots from "../assets/images/impots.webp";
import logoDiscord from "../assets/images/discordLogoP.webp";

interface Project {
  id: number;
  title: string;
  year: string;
  description: string;
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
    description:
      "Développeur / Analyste sur l'application mobile officielle. Conception, développements des CUs, gestion des livraisons APK/IPA et résolution d'incidents de production.",
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
    description:
      "Bot Discord multi-serveur spécialisé dans la lecture musicale haute fidélité avec intégration des API Spotify et YouTube.",
    tags: ["Java", "JDA", "Spotify API", "YouTube API"],
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
    description:
      "Site vitrine interactif réalisé sur mesure. Collaboration avec un studio de design et intégration Firebase pour la gestion dynamique de la galerie photos.",
    tags: ["React", "Firebase", "Vercel"],
    category: "React",
    image: imageOptique,
    liveUrl: "https://www.optiquechatenay.fr/",
  },
  {
    id: 4,
    title: "Clone Netflix",
    year: "2023",
    description:
      "Application web réactive simulant l'expérience Netflix : navigation fluide, recherche de contenus et base de données temps réel pour les préférences utilisateurs.",
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
    description:
      "Réseau social interne d'entreprise. Mise en œuvre d'un stockage sécurisé, authentification utilisateur et interface interactive.",
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
    description:
      "Construction d'une API sécurisée pour une application de critique de sauces piquantes. Développement complet du CRUD et sécurisation des données.",
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
    description:
      "Plateforme e-commerce front-end. Gestion dynamique du panier, interaction avec un service web et validation rigoureuse des données.",
    tags: ["Javascript", "HTML5", "CSS3"],
    category: "Fullstack",
    image: imageKanap,
    githubUrl: "https://github.com/Melliaganz/Kanap",
    liveUrl: "https://kanap-lyart.vercel.app/",
  },
];
