import { memo } from 'react'
import { IconContext, IconType } from 'react-icons'
import { FaCode, FaCss3, FaDiscord, FaGraduationCap, FaLinkedin, FaMobile, FaReact } from 'react-icons/fa'
import { GiScrollQuill } from 'react-icons/gi'
import { IoMdDownload } from 'react-icons/io'
import { IoSend } from 'react-icons/io5'
import { MdEmail, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { RiMapPin2Fill, RiTwitterXFill } from 'react-icons/ri'
import {
  SiAndroidstudio,
  SiGithub,
  SiGradle,
  SiInstagram,
  SiJavascript,
  SiKotlin,
  SiMailgun,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiTypescript,
  SiXcode,
} from 'react-icons/si'
import { TbBrandReactNative } from 'react-icons/tb'

// On utilise les imports directs pour aider le Tree Shaking
const createIcon = (
  IconComponent: IconType,
  defaultColor?: string,
  defaultSize: number = 24
) => {
  const Icon: React.FC<any> = memo((props: any) => (
    <IconContext.Provider
      value={{
        color: props.color || defaultColor,
        size: props.size ? String(props.size) : String(defaultSize),
      }}
    >
      <IconComponent {...props} />
    </IconContext.Provider>
  ));

  Icon.displayName = `Icon_${IconComponent.name}`;
  return Icon;
};

export const IconReact = createIcon(FaReact, "#61dafb");
export const IconCss = createIcon(FaCss3, "#204de5");
export const IconTypeScript = createIcon(SiTypescript, "#2d79c7");
export const IconReactNative = createIcon(TbBrandReactNative, "#61dafb");
export const IconAndroidStudio = createIcon(SiAndroidstudio, "#a5c736");
export const IconAppStore = createIcon(SiXcode, "#1d7df3");
export const IconGradle = createIcon(SiGradle);
export const IconCode = createIcon(FaCode, undefined, 18);
export const IconTelecharger = createIcon(IoMdDownload, undefined, 18);
export const IconJavaScript = createIcon(SiJavascript, "#f7df1e");
export const IconMongoDb = createIcon(SiMongodb, "#139251");
export const IconKotlin = createIcon(SiKotlin, "#aa23e3");
export const IconGithub = createIcon(SiGithub);
export const IconMail = createIcon(SiMailgun);
export const IconMySQL = createIcon(SiMysql, "#006f9e");
export const IconNodeJs = createIcon(SiNodedotjs, "#55b936");
export const IconDiplome = createIcon(FaGraduationCap);
export const IconMobile = createIcon(FaMobile);
export const IconParchemin = createIcon(GiScrollQuill);
export const IconEmail = createIcon(MdEmail);
export const IconMapPin = createIcon(RiMapPin2Fill);
export const IconSend = createIcon(IoSend);
export const IconLinkedIn = createIcon(FaLinkedin);
export const IconTwitter = createIcon(RiTwitterXFill);
export const IconInstagram = createIcon(SiInstagram);
export const IconFerme = createIcon(MdOutlineKeyboardArrowDown);
export const IconDiscord = createIcon(FaDiscord);
