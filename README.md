# QR Designer - React

Application moderne de génération de QR codes personnalisés construite avec React et Vite. Le projet est désormais entièrement open source : il n'y a plus de partie privée ni de fonctionnalité de connexion. Tout le monde peut créer, modifier et partager des QR codes librement.

## Technologies

- **React 19** - Framework UI moderne
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Styling utilitaire
- **Framer Motion** - Animations fluides
- **QR Code Styling** - Génération de QR codes personnalisés
- **React Router** - Navigation SPA
- **Lucide React** - Icônes modernes

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

L'application sera accessible sur http://localhost:5173

## Build Production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`

## Preview Production

```bash
npm run preview
```

## Fonctionnalités

- 🎨 Générateur de QR codes avec personnalisation avancée (styles, palettes, logos)
- 🌙 Mode sombre/clair avec persistance locale
- 📱 Design responsive et PWA-ready
- ⚡ Performance optimisée avec code splitting
- 🎯 Catalogue de templates évolutif avec lazy loading
- 🔔 Système de notifications intégré
- 🛡️ Gestion d'erreurs avec Error Boundaries

## Structure

```
src/
├── components/      # Composants réutilisables
├── context/        # Contextes React (Theme, Notifications)
├── hooks/          # Custom hooks
├── pages/          # Pages de l'application
├── services/       # Services métier (QR generation)
└── App.jsx         # Composant racine
```

## Optimisations

- Code splitting automatique par route
- Lazy loading des composants lourds
- Optimisation des chunks vendor
- Compression terser en production
- PWA manifest pour installation mobile

## Contribuer

Nous accueillons avec enthousiasme vos idées et vos contributions :

1. Forkez le dépôt et créez une branche (`git checkout -b feature/ma-super-idee`).
2. Implémentez vos changements et assurez-vous que `npm run build` passe.
3. Ouvrez une pull request en décrivant clairement la fonctionnalité ou la correction.

Quelques pistes si vous ne savez pas par où commencer :

- Ajouter de nouveaux templates de QR codes ou améliorer ceux existants.
- Étendre les types de contenus pris en charge (paiement, réseaux sociaux, etc.).
- Améliorer l'accessibilité (labels, navigation clavier, contrastes).
- Optimiser les performances ou l'expérience mobile.

N'hésitez pas à créer une issue pour discuter d'une idée avant de vous lancer. Toute suggestion, même petite, aide le projet à grandir !
