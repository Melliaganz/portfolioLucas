// 1. Remplacez l'import de l'objet global par les exports nommés
import { IconMobile, IconCode, IconDiplome } from "../utils/icons.module";
import { getDgfipStoreLink } from "../utils/getStoreLink";

export interface Experience {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  date: string;
  intro?: string; 
  description: string | string[]; 
  isList: boolean; 
  icon: React.ReactNode;
  isActive?: boolean;
}

export const experiences: Experience[] = [
  {
    id: "dgfip",
    title: "Développeur Analyste pour application mobile",
    company: "DGFiP",
    companyUrl: getDgfipStoreLink(),
    location: "Montreuil",
    date: "2023 - Présent",
    // 2. Utilisez directement le nouveau composant d'icône
    icon: <IconMobile />, 
    isActive: true,
    isList: true,
    intro: "Développement de l'application mobile des impôts. Les travaux effectués sont :",
    description: [
      "Étude des spécifications de la MOA",
      "Conception générale et détaillée",
      "Développements des différents CUs",
      "Tests unitaires",
      "Mise en commun des codes sous Subversion",
      "Confection de l’APK et livraison à la MOA",
      "Dépôt sur les stores Apple et Android"
    ]
  },
  {
    id: "freelance",
    title: "Développeur FullStack Freelance",
    company: "Optique Chatenay",
    companyUrl: "https://www.optiquechatenay.fr/",
    location: "Chatenay-Malabry",
    date: "2022 - 2023",
    // 3. Appel de l'icône de code
    icon: <IconCode />,
    isList: false,
    description: "Création d'un site vitrine entièrement développé en React pour la boutique Optique Chatenay. J'ai travaillé en étroite collaboration avec HecateStudio pour le design, en veillant à ce que celui-ci reflète parfaitement l'image de la boutique."
  },
  {
    id: "diplome",
    title: "Obtention du diplôme de développeur web",
    company: "OpenClassrooms",
    companyUrl: "https://openclassrooms.com",
    location: "Paris",
    date: "2021 - 2022",
    // 4. Appel de l'icône de diplôme
    icon: <IconDiplome />,
    isList: false,
    description: "Formation intensive sur la construction de sites web Responsive et dynamiques, la création d'API et de bases de données, l'optimisation des performances et la gestion de projet de A à Z."
  }
];
