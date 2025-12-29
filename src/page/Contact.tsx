import { useState } from "react";

import styles from "../styles/Contact.module.css";
import {
  IconDiscord,
  IconEmail,
  IconFerme,
  IconGithub,
  IconInstagram,
  IconLinkedIn,
  IconMapPin,
  IconSend,
  IconTwitter,
} from "../utils/icons.module";

export const Contact = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const apiKey = import.meta.env.VITE_API_FORM;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);

    if (apiKey) {
      formData.append("access_key", apiKey);
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();

        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setStatus("error");
    }
  };

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
                  <IconEmail />
                </div>
                <div className={styles.detailText}>
                  <p className={styles.labelSmall}>Email me at</p>
                  <a
                    href="mailto:lucaslengranddev@gmail.com"
                    className={styles.detailLink}
                  >
                    lucaslengranddev@gmail.com
                  </a>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.iconWrapper}>
                  <IconMapPin />
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
                  <IconDiscord />
                </a>
                <a
                  href="https://github.com/Melliaganz"
                  className={styles.socialBtn}
                  target="_blank"
                  rel="noopener"
                  title="Mon Github"
                >
                  <IconGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/lucaslengrand"
                  className={styles.socialBtn}
                  target="_blank"
                  rel="noopener"
                  title="Mon LinkedIn"
                >
                  <IconLinkedIn />
                </a>
                <a
                  href="https://x.com/LucasLengrand2"
                  className={styles.socialBtn}
                  target="_blank"
                  rel="noopener"
                  title="Mon Twitter"
                >
                  <IconTwitter />
                </a>
                <a
                  href="https://www.instagram.com/melliaganz/"
                  className={styles.socialBtn}
                  target="_blank"
                  rel="noopener"
                  title="Mon Instagram"
                >
                  <IconInstagram />
                </a>
                <a
                  href="mailto:lucaslengranddev@gmail.com"
                  className={styles.socialBtn}
                  target="_blank"
                  rel="noopener"
                  title="Mon mail"
                >
                  <IconEmail />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Envoyer un message</h2>

            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Honeypot avec aria-label pour l'accessibilité */}
              <input
                type="checkbox"
                id="botcheck"
                name="botcheck"
                className={styles.hidden}
                tabIndex={-1}
                autoComplete="off"
                aria-label="Do not fill this field"
              />

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.inputLabel}>
                    Nom
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.inputLabel}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <label htmlFor="subject" className={styles.inputLabel}>
                Sujet
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="subject"
                  name="subject"
                  className={styles.select}
                  required
                >
                  <option value="Demande de projet">Demande de projet</option>
                  <option value="Opportunité freelance">
                    Opportunité freelance
                  </option>
                  <option value="Question générale">Question générale</option>
                </select>
                <span className={styles.selectArrow}>
                  <IconFerme />
                </span>
              </div>

              <label htmlFor="message" className={styles.inputLabel}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Décrivez votre projet..."
                className={styles.textarea}
                required
              />

              <button
                type="submit"
                className={`${styles.submitBtn} ${
                  status === "loading" ? styles.loading : ""
                }`}
                disabled={status === "loading"}
              >
                <span>
                  {status === "loading"
                    ? "Envoi en cours..."
                    : status === "success"
                    ? "Message envoyé !"
                    : "Envoyer"}
                </span>
                <span className={styles.btnIcon}>
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
