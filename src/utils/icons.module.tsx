import {
  FaCode,
  FaCss3,
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

export const icons = {
  react: <FaReact color="#61dafb" size={24} />,
  css: <FaCss3 color="#204de5" size={24} />,
  typeScript: <SiTypescript color="#2d79c7" size={24} />,
  reactNative: <TbBrandReactNative color="#61dafb" size={24} />,
  androidStudio: <SiAndroidstudio color="#a5c736" size={24} />,
  appStore: <SiXcode color="#1d7df3" size={24} />,
  gradle: <SiGradle size={24} />,
  code: <FaCode size={18} />,
  télécharger: <IoMdDownload size={18} />,
  javaScript: <SiJavascript color="#f7df1e" size={24} />,
  mongoDb: <SiMongodb color="#139251" size={24} />,
  kotlin: <SiKotlin color="#aa23e3" size={24} />,
  github: <SiGithub color="" size={24} />,
  valise: <FaSuitcase size={24} />,
  mail: <SiMailgun size={24} />,
  mySQL: <SiMysql color="#006f9e" size={24} />,
  nodeJs: <SiNodedotjs color="#55b936" size={24} />,
  diplome: <FaGraduationCap size={24} />,
  mobile: <FaMobile />,
  parchemin: <GiScrollQuill />,
  puce: "\u2022",
  email: <SiMailboxdotorg size={24} />,
  mapPin: <RiMapPin2Fill size={24} />,
  send: <IoSend size={24} />,
  linkedIn: <FaLinkedin size={24} />,
  twitter: <RiTwitterXFill size={24} />,
  instagram: <SiInstagram size={24}/>,
  ferme: <MdOutlineKeyboardArrowDown size={24} />

};
