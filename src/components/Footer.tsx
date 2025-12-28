import { icons } from "../utils/icons.module";
import styles from "../styles/Footer.module.css";
import { currentYear } from "../utils/date";

export const Footer = () => {
  const socialLinks = [
    { href: "https://github.com/Melliaganz", icon: icons.github },
    { href: "href=https://discord.gg/YJhEmGKK", icon: icons.discord },
    { href: "mailto:lucaslengranddev@gmail.com", icon: icons.mail },
    { href: "https://x.com/LucasLengrand2", icon: icons.twitter },
    { href: "www.linkedin.com/in/lucaslengrand", icon: icons.linkedIn },
    { href: "https://www.instagram.com/melliaganz/", icon: icons.instagram },
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
