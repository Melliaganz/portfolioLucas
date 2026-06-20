import { QRCodeSVG } from "qrcode.react";
import { track } from "@vercel/analytics";
import styles from "../styles/MobileApp.module.css";
import { IconTelecharger, IconAndroid } from "../utils/icons.module";
import { useLang } from "../i18n/LanguageContext";

const APK_URL =
  "https://github.com/Melliaganz/portfolioLucasMobile/releases/latest/download/PortfolioLucas.apk";

export const MobileApp = () => {
  const { t } = useLang();

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.accentBar} />
          <h2 className={styles.title}>{t.mobileApp.title}</h2>
          <p className={styles.text}>{t.mobileApp.text}</p>
          <a
            href={APK_URL}
            download
            className={styles.downloadBtn}
            onClick={() => track("app_download")}
          >
            <IconTelecharger aria-hidden="true" />
            <span>{t.mobileApp.download}</span>
          </a>
          <p className={styles.androidNote}>
            <IconAndroid aria-hidden="true" />
            <span>{t.mobileApp.androidOnly}</span>
          </p>
        </div>

        <div className={styles.qrWrapper} aria-hidden="true">
          <QRCodeSVG
            value={APK_URL}
            size={148}
            bgColor="#ffffff"
            fgColor="#101622"
            level="M"
            marginSize={2}
          />
          <span className={styles.qrCaption}>{t.mobileApp.scan}</span>
        </div>
      </div>
    </section>
  );
};
