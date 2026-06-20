import { useState } from "react";
import styles from "../styles/Contact.module.css";
import { IconEmail, IconFerme, IconMapPin, IconSend } from "../utils/icons.module";
import { socialLinks } from "../data/socialLinks";
import { useLang } from "../i18n/LanguageContext";

const contactSocialLinks = socialLinks.filter((l) => !l.href.startsWith("mailto:"));

export const Contact = () => {
  const { t } = useLang();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const apiKey = import.meta.env.VITE_API_FORM;

  // Affiche l'état final puis revient à "idle" après 5 s.
  const finish = (next: "success" | "error") => {
    setStatus(next);
    setTimeout(() => setStatus("idle"), 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!apiKey) {
      console.error("VITE_API_FORM is not defined");
      finish("error");
      return;
    }

    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", apiKey);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        finish("error");
        return;
      }

      const data = await response.json();

      if (data.success) {
        (e.target as HTMLFormElement).reset();
        finish("success");
      } else {
        finish("error");
      }
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Erreur lors de l'envoi:", error);
      finish("error");
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Colonne Gauche : Infos */}
          <div className={styles.infoColumn}>
            <div className={styles.headerGroup}>
              <div className={styles.accentBar} />
              <h2 className={styles.title}>{t.contact.title}</h2>
              <p className={styles.subtitle}>{t.contact.subtitle}</p>
            </div>

            <div className={styles.contactDetails}>
              <div className={styles.detailItem}>
                <div className={styles.iconWrapper} aria-hidden="true">
                  <IconEmail />
                </div>
                <div className={styles.detailText}>
                  <p className={styles.labelSmall}>{t.contact.email}</p>
                  <a
                    href="mailto:lucaslengranddev@gmail.com"
                    className={styles.detailLink}
                  >
                    lucaslengranddev@gmail.com
                  </a>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.iconWrapper} aria-hidden="true">
                  <IconMapPin />
                </div>
                <div className={styles.detailText}>
                  <p className={styles.labelSmall}>{t.contact.location}</p>
                  <span className={styles.staticDetail}>{t.contact.locationValue}</span>
                </div>
              </div>
            </div>

            <div className={styles.socialGroup}>
              <p className={styles.socialTitle}>{t.contact.follow}</p>
              <div className={styles.socialLinks}>
                {contactSocialLinks.map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.href}
                    className={styles.socialBtn}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={soc.label}
                  >
                    <span aria-hidden="true">{soc.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne Droite : Formulaire */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>{t.contact.formTitle}</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="checkbox"
                name="botcheck"
                className={styles.hidden}
                tabIndex={-1}
                aria-hidden="true"
              />
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.inputLabel}>
                    {t.contact.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t.contact.namePh}
                    className={styles.input}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.inputLabel}>
                    {t.contact.emailLabel}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t.contact.emailPh}
                    className={styles.input}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="subject" className={styles.inputLabel}>
                  {t.contact.subject}
                </label>
                <div className={styles.selectWrapper}>
                  <select
                    id="subject"
                    name="subject"
                    className={styles.select}
                    required
                  >
                    <option value={t.contact.subjectProject}>{t.contact.subjectProject}</option>
                    <option value={t.contact.subjectFreelance}>
                      {t.contact.subjectFreelance}
                    </option>
                    <option value={t.contact.subjectGeneral}>{t.contact.subjectGeneral}</option>
                  </select>
                  <span className={styles.selectArrow}>
                    <IconFerme />
                  </span>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message" className={styles.inputLabel}>
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder={t.contact.messagePh}
                  className={styles.textarea}
                  required
                />
              </div>

              <button
                type="submit"
                className={`${styles.submitBtn} ${
                  status === "loading" ? styles.loading : ""
                }`}
                disabled={status === "loading"}
              >
                <span>
                  {status === "loading"
                    ? t.contact.sending
                    : status === "success"
                    ? t.contact.sent
                    : t.contact.send}
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
