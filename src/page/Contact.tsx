import styles from "../styles/Contact.module.css";
import { IconDiscord, IconEmail, IconFerme, IconGithub, IconInstagram, IconLinkedIn, IconMapPin, IconSend, IconTwitter } from "../utils/icons.module";

export const Contact = () => {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.infoColumn}>
            <div className={styles.headerGroup}>
              <div className={styles.accentBar} />
              <h1 className={styles.title}>Travaillons ensemble</h1>
              <p className={styles.subtitle}>
                Spécialiste React & TypeScript, je construis des applications
                web et mobiles évolutives. Discutons de votre prochain projet.
              </p>
            </div>

            <div className={styles.contactDetails}>
              <div className={styles.detailItem}>
                <div className={styles.iconWrapper}>
                  <span
                    className={`material-symbols-outlined ${styles.navIcon}`}
                  >
                   <IconEmail />
                  </span>
                </div>
                <div className={styles.detailText}>
                  <p className={styles.labelSmall}>Email me at</p>
                  <a
                    href="mailto:votre.email@exemple.com"
                    className={styles.detailLink}
                  >
                    lucaslengranddev@gmail.com
                  </a>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.iconWrapper}>
                  <span
                    className={`material-symbols-outlined ${styles.navIcon}`}
                  >
                    <IconMapPin />
                  </span>
                </div>
                <div className={styles.detailText}>
                  <p className={styles.labelSmall}>Based in</p>
                  <span className={styles.staticDetail}>Paris, France</span>
                </div>
              </div>
            </div>

            <div className={styles.socialGroup}>
              <p className={styles.socialTitle}>Suivez-moi</p>
              <div className={styles.socialLinks}>
                <a
                  href="https://discord.gg/7q5KAbqfdu"
                  className={styles.socialBtn}
                  target="_blank"
                  rel="noopener"
                  title="Mon discord"
                >
                  <span className="material-symbols-outlined">
                    <IconDiscord />
                  </span>
                </a>
                <a
                  href="https://github.com/Melliaganz"
                  className={styles.socialBtn}
                  target="_blank"
                  rel="noopener"
                  title="Mon Github"
                >
                  <span className="material-symbols-outlined">
                    <IconGithub />
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/lucaslengrand"
                  className={styles.socialBtn}
                  target="_blank"
                  rel="noopener"
                  title="Mon LinkedIn"
                >
                  <span className="material-symbols-outlined">
                    <IconLinkedIn />
                  </span>
                </a>
                <a
                  href="https://x.com/LucasLengrand2"
                  className={styles.socialBtn}
                  target="_blank"
                  rel="noopener"
                  title="Mon Discord"
                >
                  <span className="material-symbols-outlined">
                    <IconTwitter />
                  </span>
                </a>
                <a
                  href="https://www.instagram.com/melliaganz/"
                  className={styles.socialBtn}
                  target="_blank"
                  rel="noopener"
                  title="Mon Instagram"
                >
                  <span className="material-symbols-outlined">
                    <IconInstagram />
                  </span>
                </a>
                <a
                  href="mailto:lucaslengranddev@gmail.com"
                  className={styles.socialBtn}
                  target="_blank"
                  rel="noopener"
                  title="Mon mail"
                >
                  <span className="material-symbols-outlined">
                    <IconEmail />
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Envoyer un message</h2>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.row}>
                <label className={styles.inputLabel}>
                  Nom
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={styles.input}
                    required
                  />
                </label>
                <label className={styles.inputLabel}>
                  Email
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={styles.input}
                    required
                  />
                </label>
              </div>

              <label className={styles.inputLabel}>
                Sujet
                <div className={styles.selectWrapper}>
                  <select className={styles.select}>
                    <option>Demande de projet</option>
                    <option>Opportunité freelance</option>
                    <option>Question générale</option>
                  </select>
                  <span
                    className={`material-symbols-outlined ${styles.selectArrow}`}
                  >
                    <IconFerme />
                  </span>
                </div>
              </label>

              <label className={styles.inputLabel}>
                Message
                <textarea
                  placeholder="Décrivez votre projet, vos délais et vos objectifs..."
                  className={styles.textarea}
                  required
                />
              </label>

              <button type="submit" className={styles.submitBtn}>
                <span>Envoyer</span>
                <span className={`material-symbols-outlined ${styles.btnIcon}`}>
                  <IconSend />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
