import { IconMobile, IconCode, IconDiplome } from "../utils/icons.module";
import { getSmartLink } from "../utils/smartLink";
import type { Localized, LocalizedList } from "../i18n/translations";

interface Experience {
  id: string;
  title: Localized;
  company: string;
  companyUrl?: string;
  location: string;
  date: Localized;
  intro?: Localized;
  description: Localized | LocalizedList;
  isList: boolean;
  icon: React.ReactNode;
  isActive?: boolean;
}

export const experiences: Experience[] = [
  {
    id: "dgfip",
    title: {
      fr: "Développeur Analyste pour application mobile",
      en: "Developer / Analyst for mobile app",
    },
    company: "DGFiP",
    companyUrl: getSmartLink("dgfip_smart_link"),
    location: "Montreuil",
    date: { fr: "2023 - Présent", en: "2023 - Present" },
    icon: <IconMobile />,
    isActive: true,
    isList: true,
    intro: {
      fr: "Développement de l'application mobile des impôts. Les travaux effectués sont :",
      en: "Development of the tax mobile app. The work carried out includes:",
    },
    description: {
      fr: [
        "Étude des spécifications de la MOA",
        "Conception générale et détaillée",
        "Développements des différents CUs",
        "Tests unitaires",
        "Mise en commun des codes sous Subversion",
        "Confection de l'APK et livraison à la MOA",
        "Dépôt sur les stores Apple et Android",
      ],
      en: [
        "Analysis of the business requirements",
        "High-level and detailed design",
        "Development of the various use cases",
        "Unit testing",
        "Code integration with Subversion",
        "Building the APK and delivery to the business team",
        "Publishing on the Apple and Android stores",
      ],
    },
  },
  {
    id: "freelance",
    title: {
      fr: "Développeur FullStack Freelance",
      en: "Freelance Full-Stack Developer",
    },
    company: "Optique Chatenay",
    companyUrl: "https://www.optiquechatenay.fr/",
    location: "Chatenay-Malabry",
    date: { fr: "2022 - 2023", en: "2022 - 2023" },
    icon: <IconCode />,
    isList: false,
    description: {
      fr: "Création d'un site vitrine entièrement développé en React pour la boutique Optique Chatenay. J'ai travaillé en étroite collaboration avec HecateStudio pour le design, en veillant à ce que celui-ci reflète parfaitement l'image de la boutique.",
      en: "Built a showcase website fully developed in React for the Optique Chatenay store. I worked closely with HecateStudio on the design, making sure it perfectly reflected the store's identity.",
    },
  },
  {
    id: "diplome",
    title: {
      fr: "Obtention du diplôme de développeur web",
      en: "Web developer diploma",
    },
    company: "OpenClassrooms",
    companyUrl: "https://openclassrooms.com",
    location: "Paris",
    date: { fr: "2021 - 2022", en: "2021 - 2022" },
    icon: <IconDiplome />,
    isList: false,
    description: {
      fr: "Formation intensive sur la construction de sites web Responsive et dynamiques, la création d'API et de bases de données, l'optimisation des performances et la gestion de projet de A à Z.",
      en: "Intensive training in building responsive, dynamic websites, creating APIs and databases, performance optimization and end-to-end project management.",
    },
  },
];
