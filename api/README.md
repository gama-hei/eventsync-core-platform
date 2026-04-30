
# EventSync - Core Platform 📅

## 📝 Overview

EventSync is a dynamic event management and real-time participant engagement platform. Developed as part of an academic project, it aims to replace static paper schedules with an interactive interface.

## Purpose & Context

The goal is to centralize conference and workshop management while fostering interaction. Participants can follow the live schedule, ask speakers questions (via a Q&A system), and manage their own itinerary using a favorites system.

---

## 🚀 Installation & Usage

### Prerequisites

- Node.js (v18+)
- Java JDK (17+)
- Maven
- PostgreSQL

### Clone the Project

```bash
git clone https://github.com
cd eventsync-core-platform
```

### Running the Backend (Spring Boot)

1. Configure your `src/main/resources/application.properties` file (database settings).
2. Start the server:

```bash
mvn spring-boot:run
```

The server will be available at `http://localhost:8080`

### Running the Frontend (Next.js)

1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

The application will be available at `http://localhost:3000`

---

## 📖 Documentation & Features

### Project Structure

- `/backend` : Robust REST API managing entities (Events, Sessions, Speakers, Questions).
- `/frontend` : Modern user interface with Server-Side Rendering (SSR) for SEO and dynamic content.

### Key Features

- **Admin Dashboard** : Full event lifecycle management.
- **Multi-Track Schedule** : View sessions by room and time slot.
- **Live Detection** : Automatic badge on currently running sessions.
- **Q&A System** : Ask anonymous questions and real-time upvoting.
- **Favorites** : Locally save preferred sessions (Local Storage).

---

## 🤝 Collaboration

This project is a collective achievement by the Gama-HEI organization.

### Contribution Guidelines

1. **Branches** : Create one branch per feature (`feat/feature-name`).
2. **Pull Requests** : Each PR must be reviewed by at least one other team member before merging into `main`.
3. **Commits** : Please follow the [Conventional Commits](https://www.conventionalcommits.org/) convention.

### The Team (4 members)

- **Asmine** (`AsmineRazafiarivelo1402`)  & **Arnell** (`Arnel-rah`) - Lead Frontend / Next.js
- **Gael** (`nassaigael`) - Lead Backend / Spring Boot
- **Mahery** (`mekill404`) - Database & Documentation

---

## ⚖️ Legal Information

This project is distributed under the MIT License. As part of this evaluation, the code is freely accessible to reviewers and students.
