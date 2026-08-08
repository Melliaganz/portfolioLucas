import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import styles from "../styles/CvModal.module.css";
import { IconTelecharger } from "../utils/icons.module";
import { useLang } from "../i18n/LanguageContext";

const CV_URL = "/CVLengrandLucas.pdf";

export const CvModal = ({ onClose }: { onClose: () => void }) => {
  const { t } = useLang();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onCloseRef.current();
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.target === dialog) onCloseRef.current();
    };

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("mousedown", handleMouseDown);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("mousedown", handleMouseDown);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="cv-modal-title"
    >
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 id="cv-modal-title" className={styles.title}>
            {t.cvModal.title}
          </h2>
          <div className={styles.actions}>
            <a
              className={styles.downloadBtn}
              href={CV_URL}
              download="CV_Lengrand_Lucas.pdf"
              onClick={() => track("cv_download")}
            >
              <IconTelecharger aria-hidden="true" />
              <span>{t.cvModal.download}</span>
            </a>
            <button
              type="button"
              autoFocus
              className={styles.closeBtn}
              onClick={onClose}
              aria-label={t.cvModal.close}
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>
        </div>

        <iframe
          className={styles.viewer}
          src={`${CV_URL}#toolbar=0&navpanes=0`}
          title={t.cvModal.iframeTitle}
          tabIndex={-1}
        />
      </div>
    </dialog>
  );
};
