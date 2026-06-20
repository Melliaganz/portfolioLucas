import styles from '../styles/Footer.module.css'
import { socialLinks } from '../data/socialLinks'
import { useLang } from '../i18n/LanguageContext'

declare const __APP_YEAR__: string;

export const Footer = () => {
  const { t } = useLang();
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
              title={link.label}
            >
              <span aria-hidden="true">{link.icon}</span>
            </a>
          ))}
        </div>

        <p className={styles.copyright}>
          © {__APP_YEAR__} Lengrand Lucas. {t.footer.rights}
        </p>
      </div>
    </footer>
  </section>
  );
};
