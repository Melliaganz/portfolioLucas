import { IconDiscord, IconGithub, IconInstagram, IconLinkedIn, IconMail, IconTwitter } from "../utils/icons.module";
import styles from "../styles/Footer.module.css";
import { currentYear } from "../utils/date";

export const Footer = () => {
  const socialLinks = [
    {
      href: "https://github.com/Melliaganz",
      icon: <IconGithub />,
      title: "Mon github",
    },
    {
      href: "https://discord.gg/YJhEmGKK",
      icon: <IconDiscord />,
      title: "Mon discord",
    },
    {
      href: "mailto:lucaslengranddev@gmail.com",
      icon: <IconMail />,
      title: "Mon mail",
    },
    {
      href: "https://x.com/LucasLengrand2",
      icon: <IconTwitter />,
      title: "Mon X",
    },
    {
      href: "https://www.linkedin.com/in/lucaslengrand",
      icon: <IconLinkedIn />,
      title: "Mon linkedIn",
    },
    {
      href: "https://www.instagram.com/melliaganz/",
      icon: <IconInstagram />,
      title: "Mon instagram",
    },
  ];

  return (
    <section className={styles.footerSection}>
      <footer className={styles.footerContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={styles.iconLink}
                target="_blank"
                rel="noopener"
                title={link.title}
              >
                <span
                  className={`material-symbols-outlined ${styles.iconText}`}
                >
                  {link.icon}
                </span>
              </a>
            ))}
          </div>

          <p className={styles.copyright}>
            © {currentYear} Lengrand Lucas. Tous droits réservés.
          </p>
        </div>
      </footer>
    </section>
  );
};
