## EventSync - Core Platform 📅


## 📝 Présentation
EventSync est une plateforme dynamique de gestion d’événements et d’engagement des participants en temps réel. Développé dans un cadre académique, ce projet vise à remplacer les programmes papier statiques par une interface interactive.
## Utilité & Contexte
L'objectif est de centraliser la gestion des conférences et workshops tout en favorisant l'interaction. Les participants peuvent suivre le planning en direct, poser des questions aux intervenants (système de Q&A) et gérer leur propre itinéraire via des favoris.
------------------------------
## 🚀 Installation et Utilisation
* Node.js (v18+)
* Java JDK (17+)
* Maven
* PostgreSQL
## Clonage du projet

git clone https://github.com
cd eventsync-core-platform

## Lancement du Backend (Spring Boot)

   1. Configurez votre fichier src/main/resources/application.properties (Base de données).
   2. Lancez le serveur :

mvn spring-boot:run

Le serveur sera accessible sur http://localhost:8080
## Lancement du Frontend (Next.js)

   1. Allez dans le dossier frontend : cd frontend
   2. Installez les dépendances : npm install
   3. Lancez le mode développement : npm run dev
   L'application sera accessible sur http://localhost:3000

------------------------------
## 📖 Documentation & Fonctionnalités## Structure du projet

* /backend : API REST robuste gérant les entités (Événements, Sessions, Speakers, Questions).
* /frontend : Interface utilisateur moderne avec rendu côté serveur (SSR) pour le SEO et le dynamisme.

## Fonctionnalités Clés

* Dashboard Admin : Gestion complète du cycle de vie des événements.
* Planning Multi-Track : Visualisation des sessions par salle et par horaire.
* Détection "Live" : Badge automatique sur les sessions en cours.
* Système de Q&A : Pose de questions anonymes et système de "Upvote" en temps réel.
* Favoris : Sauvegarde locale des sessions préférées (Local Storage).

------------------------------
## 🤝 Collaboration
Ce projet est une réalisation collective de l'organisation Gama-HEI.
## Règles de contribution

   1. Branches : Créez une branche par fonctionnalité (feat/nom-feature).
   2. Pull Requests : Chaque PR doit être revue par au moins un autre membre de l'équipe avant d'être fusionnée vers main.
   3. Commits : Merci de respecter la convention [Conventional Commits](https://www.conventionalcommits.org/).

## L'équipe (4 membres)

* Asmine/Pseudo 1] - Lead Frontend / Next.js
* Gael/Pseudo 2] - Lead Backend / Spring Boot
* mahery/mekill404 - Base de données & API
* Arnel - Design & Documentation

------------------------------
## ⚖️ Informations Légales
Ce projet est distribué sous la licence MIT. Dans le cadre de cet examen, le code est libre de consultation pour les évaluateurs et les étudiants.

