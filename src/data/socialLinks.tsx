import {
  IconDiscord,
  IconGithub,
  IconInstagram,
  IconLinkedIn,
  IconMail,
  IconTwitter,
} from "../utils/icons.module";

export interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export const socialLinks: SocialLink[] = [
  { href: "https://github.com/Melliaganz", icon: <IconGithub />, label: "Github" },
  { href: "https://discord.gg/7q5KAbqfdu", icon: <IconDiscord />, label: "Discord" },
  { href: "mailto:lucaslengranddev@gmail.com", icon: <IconMail />, label: "Email" },
  { href: "https://x.com/LucasLengrand2", icon: <IconTwitter />, label: "Twitter" },
  { href: "https://www.linkedin.com/in/lucaslengrand", icon: <IconLinkedIn />, label: "LinkedIn" },
  { href: "https://www.instagram.com/melliaganz/", icon: <IconInstagram />, label: "Instagram" },
];
