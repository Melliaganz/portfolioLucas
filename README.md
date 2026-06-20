# Portfolio Lucas - React - Typescript - Vite

Ce portfolio est une application web ultra-performante et moderne, construite avec **React 19** et **Vite 8**. L'architecture est optimisée pour la rapidité de chargement, l'accessibilité, et intègre une détection de plateforme pour proposer une expérience mobile native.

## 🚀 Optimisations Techniques

Le projet utilise des outils de pointe pour garantir une efficacité maximale :
* **Code-splitting** : Composants chargés à la demande (chunks séparés) avec préchargement (`modulepreload`) injecté au build.
* **Performance CSS** : Utilisation de `lightningcss` pour une minification et une compilation ultra-rapide des styles.
* **SEO & Indexation** : Génération automatique du sitemap grâce à `vite-plugin-sitemap`.
* **Lazy Loading** : Chargement différé des composants (`Suspense`) pour un affichage initial instantané.

## 🛠️ Stack Technique

### Core
* **Framework** : React 19 (dernière version stable)
* **Langage** : TypeScript 6.0
* **Icônes** : React Icons
* **Gestion de paquets** : Yarn 4.17 (Berry, PnP)

### Build & Tooling
* **Bundler** : Vite 8
* **CSS Engine** : Lightning CSS
* **Plugins** : Sitemap, préchargement des chunks lazy (plugin maison), CSP nonce via Edge Middleware

### Qualité & Tests
* **Test Runner** : Vitest 4.1
* **DOM Testing** : React Testing Library & JSDOM
* **Linter** : ESLint 10 (Flat Config) avec plugins React-hooks et Refresh

## 📦 Installation et Utilisation

### Prérequis
* Node.js 20+
* Yarn 4.x

### Commandes principales
```bash
# Installation des dépendances
yarn install

# Lancer le serveur de développement
yarn dev

# Exécuter les tests unitaires (Console)
yarn test

# Lancer l'interface graphique de test (Vitest UI)
yarn test:ui

# Builder le projet pour la production
yarn build
```
### 📱 Expérience Mobile
* **L'application** inclut un système de détection intelligent du système d'exploitation (User-Agent) :

* **Android** : Affiche une popup proposant le téléchargement de l'APK natif (hébergé sur GitHub Releases).

* **iOS** : Notifie l'utilisateur de la disponibilité future sur l'App Store.

**Persistance** : Le choix de l'utilisateur est sauvegardé via le localStorage pour éviter les répétitions intrusives.

### 🧪 Stratégie de Test
* La robustesse de l'application est validée par une suite de tests couvrant :

* Le rendu correct des composants principaux (Header, Hero, Projects, etc.).

* La logique de détection d'OS et l'affichage conditionnel de la popup.

* Le bon fonctionnement des interactions utilisateur (fermeture de popup, liens de téléchargement).

* La persistance des données dans le stockage local.

Développé avec ❤️ par Lucas.
