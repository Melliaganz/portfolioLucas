import {
  FaCode,
  FaCss3,
  FaDiscord,
  FaGraduationCap,
  FaLinkedin,
  FaMobile,
  FaReact,
  FaSuitcase,
} from "react-icons/fa";
import { GiScrollQuill } from "react-icons/gi";
import { IoMdDownload } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiMapPin2Fill, RiTwitterXFill } from "react-icons/ri";
import {
  SiAndroidstudio,
  SiGithub,
  SiGradle,
  SiInstagram,
  SiJavascript,
  SiKotlin,
  SiMailboxdotorg,
  SiMailgun,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiTypescript,
  SiXcode,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

// Exports individuels pour un Tree-Shaking optimal
export const IconReact = () => <FaReact color="#61dafb" size={24} />;
export const IconCss = () => <FaCss3 color="#204de5" size={24} />;
export const IconTypeScript = () => <SiTypescript color="#2d79c7" size={24} />;
export const IconReactNative = () => <TbBrandReactNative color="#61dafb" size={24} />;
export const IconAndroidStudio = () => <SiAndroidstudio color="#a5c736" size={24} />;
export const IconAppStore = () => <SiXcode color="#1d7df3" size={24} />;
export const IconGradle = () => <SiGradle size={24} />;
export const IconCode = () => <FaCode size={18} />;
export const IconTelecharger = () => <IoMdDownload size={18} />;
export const IconJavaScript = () => <SiJavascript color="#f7df1e" size={24} />;
export const IconMongoDb = () => <SiMongodb color="#139251" size={24} />;
export const IconKotlin = () => <SiKotlin color="#aa23e3" size={24} />;
export const IconGithub = () => <SiGithub size={24} />;
export const IconValise = () => <FaSuitcase size={24} />;
export const IconMail = () => <SiMailgun size={24} />;
export const IconMySQL = () => <SiMysql color="#006f9e" size={24} />;
export const IconNodeJs = () => <SiNodedotjs color="#55b936" size={24} />;
export const IconDiplome = () => <FaGraduationCap size={24} />;
export const IconMobile = () => <FaMobile />;
export const IconParchemin = () => <GiScrollQuill />;
export const IconEmail = () => <SiMailboxdotorg size={24} />;
export const IconMapPin = () => <RiMapPin2Fill size={24} />;
export const IconSend = () => <IoSend size={24} />;
export const IconLinkedIn = () => <FaLinkedin size={24} />;
export const IconTwitter = () => <RiTwitterXFill size={24} />;
export const IconInstagram = () => <SiInstagram size={24} />;
export const IconFerme = () => <MdOutlineKeyboardArrowDown size={24} />;
export const IconDiscord = () => <FaDiscord size={24} />;

// Constante simple pour la puce
export const Puce = "\u2022";
