import styles from '../styles/Footer.module.css'
import { IconDiscord, IconGithub, IconInstagram, IconLinkedIn, IconMail, IconTwitter } from '../utils/icons.module'

declare const __APP_YEAR__: string;

const socialLinks = [
  { href: "https://github.com/Melliaganz", icon: <IconGithub />, title: "Mon github" },
  { href: "https://discord.gg/7q5KAbqfdu", icon: <IconDiscord />, title: "Mon discord" },
  { href: "mailto:lucaslengranddev@gmail.com", icon: <IconMail />, title: "Mon mail" },
  { href: "https://x.com/LucasLengrand2", icon: <IconTwitter />, title: "Mon X" },
  { href: "https://www.linkedin.com/in/lucaslengrand", icon: <IconLinkedIn />, title: "Mon linkedIn" },
  { href: "https://www.instagram.com/melliaganz/", icon: <IconInstagram />, title: "Mon instagram" },
];

export const Footer = () => {

  return (
    <section className={styles.footerSection}>
      <footer className={styles.footerContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.socialLinks}>
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.iconLink}
                target="_blank"
                rel="noopener noreferrer"
                title={link.title}
              >
                {link.icon}
              </a>
            ))}
          </div>

          <p className={styles.copyright}>
            © {__APP_YEAR__} Lengrand Lucas. Tous droits réservés.
          </p>
        </div>
      </footer>
    </section>
  );
};
