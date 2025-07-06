# QR Designer - React

Application moderne de génération de QR codes personnalisés construite avec React et Vite.

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

- 🎨 Générateur de QR codes avec personnalisation complète
- 🌙 Mode sombre/clair avec persistance
- 📱 Design responsive et PWA-ready
- ⚡ Performance optimisée avec code splitting
- 🎯 Templates premium avec lazy loading
- 🔔 Système de notifications
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
