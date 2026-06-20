import { useRef } from "react";
import { track } from "@vercel/analytics";
import styles from "../styles/CvModal.module.css";
import { useFocusTrap } from "../utils/useFocusTrap";
import { IconTelecharger } from "../utils/icons.module";

const CV_URL = "/CVLengrandLucas.pdf";

export const CvModal = ({ onClose }: { onClose: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useFocusTrap({
    active: true,
    onClose,
    containerRef: cardRef,
    initialFocusRef: closeBtnRef,
  });

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.card} ref={cardRef}>
        <div className={styles.header}>
          <h2 id="cv-modal-title" className={styles.title}>
            Mon CV
          </h2>
          <div className={styles.actions}>
            <a
              className={styles.downloadBtn}
              href={CV_URL}
              download="CV_Lengrand_Lucas.pdf"
              onClick={() => track("cv_download")}
            >
              <IconTelecharger aria-hidden="true" />
              <span>Télécharger</span>
            </a>
            <button
              type="button"
              ref={closeBtnRef}
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Fermer l'aperçu du CV"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>
        </div>

        <iframe
          className={styles.viewer}
          src={`${CV_URL}#toolbar=0&navpanes=0`}
          title="Aperçu du CV de Lucas Lengrand"
        />
      </div>
    </div>
  );
};
