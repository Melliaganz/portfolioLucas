import React, { memo } from "react";
import { IconType, IconContext } from "react-icons";
import {
  FaCode,
  FaCss3,
  FaDiscord,
  FaGraduationCap,
  FaLinkedin,
  FaMobile,
  FaReact,
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

interface IconConfig {
  icon: IconType;
  color?: string;
  size?: number;
}

const iconsData: Record<string, IconConfig> = {
  IconReact: { icon: FaReact, color: "#61dafb", size: 24 },
  IconCss: { icon: FaCss3, color: "#204de5", size: 24 },
  IconTypeScript: { icon: SiTypescript, color: "#2d79c7", size: 24 },
  IconReactNative: { icon: TbBrandReactNative, color: "#61dafb", size: 24 },
  IconAndroidStudio: { icon: SiAndroidstudio, color: "#a5c736", size: 24 },
  IconAppStore: { icon: SiXcode, color: "#1d7df3", size: 24 },
  IconGradle: { icon: SiGradle, size: 24 },
  IconCode: { icon: FaCode, size: 18 },
  IconTelecharger: { icon: IoMdDownload, size: 18 },
  IconJavaScript: { icon: SiJavascript, color: "#f7df1e", size: 24 },
  IconMongoDb: { icon: SiMongodb, color: "#139251", size: 24 },
  IconKotlin: { icon: SiKotlin, color: "#aa23e3", size: 24 },
  IconGithub: { icon: SiGithub, size: 24 },
  IconMail: { icon: SiMailgun, size: 24 },
  IconMySQL: { icon: SiMysql, color: "#006f9e", size: 24 },
  IconNodeJs: { icon: SiNodedotjs, color: "#55b936", size: 24 },
  IconDiplome: { icon: FaGraduationCap, size: 24 },
  IconMobile: { icon: FaMobile, size: 24 },
  IconParchemin: { icon: GiScrollQuill, size: 24 },
  IconEmail: { icon: SiMailboxdotorg, size: 24 },
  IconMapPin: { icon: RiMapPin2Fill, size: 24 },
  IconSend: { icon: IoSend, size: 24 },
  IconLinkedIn: { icon: FaLinkedin, size: 24 },
  IconTwitter: { icon: RiTwitterXFill, size: 24 },
  IconInstagram: { icon: SiInstagram, size: 24 },
  IconFerme: { icon: MdOutlineKeyboardArrowDown, size: 24 },
  IconDiscord: { icon: FaDiscord, size: 24 },
};

const generatedIcons: Record<string, React.FC<any>> = {};

Object.keys(iconsData).forEach((key) => {
  const { icon: IconComponent, color, size } = iconsData[key];

  generatedIcons[key] = memo((props: any) => (
    <IconContext.Provider
      value={{
        color: props.color || color,
        size: props.size ? String(props.size) : String(size || 24),
      }}
    >
      <IconComponent {...props} />
    </IconContext.Provider>
  ));
});

export const {
  IconReact,
  IconCss,
  IconTypeScript,
  IconReactNative,
  IconAndroidStudio,
  IconAppStore,
  IconGradle,
  IconCode,
  IconTelecharger,
  IconJavaScript,
  IconMongoDb,
  IconKotlin,
  IconGithub,
  IconMail,
  IconMySQL,
  IconNodeJs,
  IconDiplome,
  IconMobile,
  IconParchemin,
  IconEmail,
  IconMapPin,
  IconSend,
  IconLinkedIn,
  IconTwitter,
  IconInstagram,
  IconFerme,
  IconDiscord,
} = generatedIcons;

