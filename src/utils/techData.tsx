import type { Technology } from "../types/navigation";
import {
  IconAndroidStudio,
  IconAppStore,
  IconCss,
  IconGradle,
  IconJavaScript,
  IconKotlin,
  IconMongoDb,
  IconMySQL,
  IconNodeJs,
  IconReact,
  IconReactNative,
  IconTypeScript,
} from "./icons.module";

// Source unique de la stack technique : les noms affichés dans le Hero
// (techNames) sont dérivés de ce tableau pour rester synchronisés avec les
// badges/icônes de TechStack.
export const technologies: Technology[] = [
  { name: "React.js", icon: <IconReact /> },
  { name: "TypeScript", icon: <IconTypeScript /> },
  { name: "React Native", icon: <IconReactNative /> },
  { name: "CSS3", icon: <IconCss /> },
  { name: "Android Studio", icon: <IconAndroidStudio /> },
  { name: "XCode", icon: <IconAppStore /> },
  { name: "Gradle", icon: <IconGradle /> },
  { name: "Javascript", icon: <IconJavaScript /> },
  { name: "MongoDB", icon: <IconMongoDb /> },
  { name: "Kotlin", icon: <IconKotlin /> },
  { name: "MySQL", icon: <IconMySQL /> },
  { name: "NodeJs", icon: <IconNodeJs /> },
];

export const techNames = technologies.map((t) => t.name);
