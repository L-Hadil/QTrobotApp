> ⚠️ Recommandation : Pour une meilleure expérience utilisateur, il est conseillé d’utiliser Google Chrome comme navigateur.

## 🧠 Présentation du projet

QT Robot Math Tutor est une application web interactive conçue pour aider les enfants de CP et CE1 (6–8 ans) à apprendre les fondamentaux des mathématiques de manière ludique avec leur compagnon QT Robot.

Fonctionnalités principales :
- Exercices d’addition, soustraction, géométrie et mesures
- Trois niveaux de difficulté : Facile, Moyen, Difficile
- Suivi des progrès avec feedback immédiat
- Minuteur de session et personnalisation du profil
- Robot QT avec :
  - Synthèse vocale (guidage oral)
  - 12 expressions émotionnelles animées
  - Feedback émotionnel et vocal selon les réponses de l’enfant

## ⚙️ Stack technique et fonctionnalités

- Frontend : Next.js (React) avec TypeScript
- Style : CSS Modules
- Interactivité :
  - API Web Speech pour la synthèse vocale
  - GIFs animés pour les expressions du robot
- Logique de session :
  - Enregistrement du nom et âge de l’enfant
  - Timer lancé automatiquement après le choix du niveau (CP/CE1)
  - Sélection d’exercices par thème et difficulté
- Système de feedback :
  - Formulaire d’avis en fin de session
  - Retour à l’accueil après validation
- Déploiement : Application hébergée sur Vercel

## 🚀 Installation & Lancement

> ⚠️ Assurez-vous d’avoir Node.js (version 16 ou supérieure) installé sur votre machine.  
> Vous pouvez vérifier avec la commande :
node -v
Si Node.js est bien installé ou existe sur votre machine alors:
# 1. Cloner le dépôt
git clone https://github.com/L-Hadil/QTrobotApp

# 2. Accéder au dossier du projet
cd QTrobotApp

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npm run dev
Vous devriez voir les logs suivants s’afficher dans votre terminal :

   ▲ Next.js 15.2.2 (Turbopack)
   - Local :       http://localhost:3000
   - Network :     http://172.24.91.195:3000

 ✓ Démarrage en cours...
Pour une expreince avec base de donnés
nano .env.local

# Ajouter cette ligne de code 
MONGODB_URI=(VOTRE_TOKEN)

Vous devriez voir les logs suivants s’afficher dans votre terminal si la connexion à la base de données est correctement configurée via .env.local :

   ▲ Next.js 15.2.2 (Turbopack)
   - Local :        http://localhost:3000
   - Network :      http://172.24.91.195:3000
   - Environnement : .env.local
