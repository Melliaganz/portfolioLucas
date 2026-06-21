import { useEffect, useRef, useState } from "react";

// Révélation au scroll basée sur IntersectionObserver. Renvoie une ref à poser
// sur l'élément observé et `inView`, qui passe à true (une seule fois) quand
// l'élément entre dans le viewport. Dégrade proprement : si l'utilisateur
// préfère réduire les animations ou si IntersectionObserver est indisponible
// (jsdom / SSR), l'élément est considéré visible immédiatement.
export const useInView = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      return true;
    }
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  });

  useEffect(() => {
    if (inView) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return { ref, inView };
};
