# Analyse des problèmes QR-Designer React  
*(août 2025 – par Cline)*  

---

## 1. Symptômes signalés
| # | Contexte | Comportement observé |
|---|----------|----------------------|
| 1 | Générateur principal (Home Page / `QRGeneratorAdvanced`) | L’aperçu du QR Code ne s’affiche pas ou cesse de se mettre à jour en temps réel après quelques modifications. |
| 2 | Page **Templates** (`/templates`) | En scroll vertical, les mini-prévisualisations de QR Codes mettent plusieurs secondes à apparaître, provoquant des à-coups et une expérience utilisateur médiocre. |

---

## 2. Analyse détaillée

### 2.1 Aperçu en temps réel du générateur

Fichiers clés analysés :
* `src/components/QRGenerator/QRGeneratorAdvanced.jsx`
* `src/components/Dashboard/QRPreview.jsx`
* `src/services/qrService.js`

Constats :

1. **Singleton global dans `qrService`**  
   ```js
   class QRService { /* … */ }
   const qrService = new QRService(); // export par défaut
   ```
   La méthode `generateQRCode` écrase la propriété `this.qrCode` à chaque appel, ce qui génère **un seul objet global** partagé entre toutes les prévisualisations.  
   Effets :  
   * Conflits lorsqu’un deuxième composant tente de manipuler la même instance.  
   * Dans React 18 (Strict Mode), `useEffect` s’exécute deux fois → la 2ᵉ exécution efface le conteneur puis tente d’`append` l’instance déjà détruite.

2. **Cycle de vie dans `QRPreview.jsx`**  
   ```js
   qrContainerRef.current.innerHTML = '';
   const qrCode = qrService.generateQRCode({ … });
   qrCode.append(qrContainerRef.current);
   ```
   * Pas de `qrCode.update` → chaque change recrée l’instance, mais elle reste référencée par le singleton.  
   * Pas de cleanup (`return () => qrCode?.clear()`), d’où des fuites mémoire potentielles.

3. **`QRGeneratorAdvanced.jsx` crée aussi sa propre instance via `new QRCodeStyling`** (sans passer par `qrService`), ce qui entraîne **deux logiques parallèles** :
   * l’une correcte (générateur avancé)  
   * l’autre buggy (preview de dashboard et autres pages).

### 2.2 Lenteur d’affichage sur la page Templates

Fichiers clés analysés :
* `Templates.jsx`
* `TemplateSkeletonLoader.jsx`
* Données volumineuses dans `src/data/templates/*.js`

Constats :

1. **Chaque carte gère sa propre animation + heavy DOM** (CSS gradients, Framer-motion). Pas critique seul, mais combiné à …  
2. **Pas de virtualisation** : la grille peut contenir **> 70 templates premium** ; tous sont montés simultanément.  
3. **Mini-prévisualisation générée à la volée ?**  
   * Actuellement les cartes utilisent un simple bloc coloré – OK.  
   * Mais la version prévue (TODO) vise à générer de « vrais » QR Codes dans les cartes → la lenteur deviendra exponentielle.  
4. **Framer-motion `whileInView`** charge l’animation dès que l’élément rentre dans le viewport, mais le délai `transition.delay = index*0.1` ajoute une latence artificielle pouvant atteindre 6-7 s en bas de page.

---

## 3. Causes racines résumées
1. **Couplage global dans `qrService`** → collision d’instances et effets de bord.
2. **Nettoyage et création de QR Code non maîtrisés** (pas de hook dédié, pas de gestion du double-mount).
3. **Mauvaise stratégie de rendu liste : tout charger + delays cumulés** → jank lors du scroll.

---

## 4. Plan de correction recommandé

| Priorité | Action | Détails de mise en œuvre |
|----------|--------|--------------------------|
| 🔴 Haute | Supprimer le singleton global | • Convertir `qrService.generateQRCode` en **factory pure** : `export const generateQRCode = (opts)=>new QRCodeStyling({...defaultQROptions, ...opts});`<br/>• Retirer l’instance stockée (`this.qrCode`). |
| 🔴 Haute | Créer un **hook `useQRCode`** | Encapsuler la logique (création, update, cleanup) :<br/>```js\nconst useQRCode = (options, containerRef)=>{...};```<br/>– Gère React 18 Strict Mode ;<br/>– Retourne l’instance pour éventuelle mise à jour. |
| 🟠 Moyen | Refactoriser `QRPreview.jsx` | • Utiliser le hook ci-dessus.<br/>• Ajouter `useEffect` cleanup pour vider/refuser l’ancienne instance.<br/>• Dépendances : `data`, `qrType`, etc. |
| 🟠 Moyen | Harmoniser : ne pas mélanger `qrService` et instanciation directe | Choisir une seule voie (probablement le hook) pour **tous** les composants preview. |
| 🟡 Faible | Optimiser Templates Page | • Mettre en place **virtualisation** (react-window, `LazyMotion`, ou `IntersectionObserver`).<br/>• Réduire/retirer `transition.delay` dépendant de l’index ; utiliser une valeur fixe courte.<br/>• Pré-générer des **thumbnails statiques** (png/svg 64 px) pour les cartes et ne générer le vrai QR qu’au clic. |
| 🟡 Faible | Dégrader gracieusement sur mobiles | Option : charger 12 templates max puis bouton “Voir plus”. |

---

## 5. Étapes de test proposées

1. **Unité** : jest + @testing-library pour vérifier qu’une mise à jour de `data` déclenche l’update de l’instance sans erreurs console.  
2. **E2E** : Cypress – taper dans l’éditeur → aperçus mis à jour < 200 ms.  
3. **Perf** : Lighthouse sur `/templates` : viser < 2 s Time-to-Interactive et 60 fps lors du scroll jusqu’en bas.

---

## 6. Checklist de mise à jour rapide

- [ ] Créer `src/hooks/useQRCode.js` avec gestion propre.  
- [ ] Adapter `QRPreview.jsx`, `QRGeneratorAdvanced.jsx`, `QRCodeCard`, etc.  
- [ ] Supprimer/archiver `qrService.js`.  
- [ ] Mettre en place lazy-load/virtualisation des cartes dans `Templates.jsx`.  
- [ ] Retirer `transition.delay` basé sur index ou le limiter à 0 – 0.2 s.  
- [ ] Regénérer les snapshots tests + storybook si présent.  
- [ ] Vérifier en mode production (`npm run build && vite preview`).  

---

### Références utiles
* [QRCodeStyling 2.x API](https://github.com/kozakdenys/qr-code-styling)  
* [React 18 Strict Mode Effects](https://react.dev/learn/strict-mode)  
* [react-window Virtualisation](https://github.com/bvaughn/react-window)  

---

> Ce document ne touche pas au code source ; il fournit une **feuille de route** claire pour corriger et optimiser les deux problèmes évoqués.
