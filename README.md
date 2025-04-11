# QT Robot Math Tutor

## Description
QT Robot Math Tutor est une application web interactive conçue pour aider les enfants du CP et du CE1 à apprendre les concepts mathématiques fondamentaux de manière ludique avec leur compagnon robot QT.

## Fonctionnalités principales

### Système d'apprentissage interactif
- Exercices interactifs d'addition, de soustraction, de mesures et de géométrie
- Trois niveaux de difficulté (Facile, Moyen, Difficile)
- Suivi des progrès avec compteur de bonnes/mauvaises réponses
- Feedback immédiat après chaque réponse

### Personnalisation
- **Enregistrement du profil** : 
  - Saisie du nom et de l'âge de l'enfant au démarrage
  - Adaptation du contenu en fonction du niveau scolaire (CP ou CE1)
- **Timer de session** :
  - Chronomètre activé dès la sélection du niveau (CP/CE1)
  - Bouton "Terminer la session" disponible à tout moment

### Système de feedback
- Page de feedback à la fin de chaque session
- Retour à l'accueil après soumission du feedback

### Compagnon robot QT
- **Text-to-Speech** : Le robot parle pour guider l'enfant
- **12 expressions émotionnelles** :
  - Heureux, triste, confus, en colère
  - Peur, parler, bâiller, embrasser
  - Cri, neutre, dégoûté, pleurer
- Interactions adaptées :
  - Encouragements pour les bonnes réponses
  - Conseils en cas d'erreur
  - Feedback émotionnel immédiat

## Contenu éducatif

### Niveau CP
- Addition de base (jusqu'à 10)
- Soustractions simples
- Comparaisons de tailles et longueurs
- Reconnaissance des formes géométriques de base
- Mesures simples (longueur, poids, contenance)

### Niveau CE1
- Additions avec nombres à deux chiffres
- Soustractions avec retenues
- Problèmes mathématiques simples
- Concepts de géométrie avancés
- Mesures et conversions simples

## Comment utiliser l'application

1. **Démarrage** :
   - Accédez à l'application via ce lien : 
   - Clique sur "Commencer"
   - Saisis ton nom et ton âge
   - Le robot QT te souhaite la bienvenue (text-to-speech)

2. **Sélection du niveau** :
   - Choisis entre CP ou CE1
   - Un timer démarre automatiquement

3. **Choix des exercices** :
   - Sélectionne une matière :
     - Additions
     - Soustractions
     - Mesures
     - Géométrie
   - Choisis un niveau de difficulté :
     - Facile
     - Moyen
     - Difficile

4. **Pendant la session** :
   - Le robot guide vocalement à travers les exercices
   - Tu peux à tout moment :
     - Cliquer sur "Terminer la session"
     - Revenir au menu principal

5. **Fin de session** :
   - Page de feedback pour donner ton avis
   - Bouton pour retourner à l'accueil

## Détails techniques

### Stack technique
- **Frontend** : Next.js (React) avec TypeScript
- **Style** : CSS Modules
- **Interactivité** :
  - API Web Speech pour le text-to-speech
  - Animations GIF pour les expressions du robot
- **Suivi du temps** : Timer avec API Web
- **Déploiement** : Vercel
