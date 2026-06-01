import styles from '../styles/Footer.module.css'
import { socialLinks } from '../data/socialLinks'

declare const __APP_YEAR__: string;

export const Footer = () => (
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
              title={link.label}
            >
              <span aria-hidden="true">{link.icon}</span>
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
