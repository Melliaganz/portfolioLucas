import { icons } from "../utils/icons.module";
import styles from "../styles/Footer.module.css";
import { currentYear } from "../utils/date";

export const Footer = () => {
  const socialLinks = [
    { href: "#", icon: icons.github },
    { href: "#", icon: icons.discord },
    { href: "#", icon: icons.mail },
    { href: "#", icon: icons.twitter },
    { href: "#", icon: icons.linkedIn },
    { href: "#", icon: icons.instagram },
  ];

  return (
    <section className={styles.footerSection}>
      <footer className={styles.footerContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} className={styles.iconLink}>
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
