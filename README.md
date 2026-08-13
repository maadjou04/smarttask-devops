# SmartTask DevOps

Application de gestion de tâches conteneurisée avec pipeline CI/CD.

## Stack technique
- **Frontend** : React + Nginx
- **Backend** : Node.js / Express (API REST)
- **Base de données** : MySQL 8.0
- **Orchestration** : Docker Compose
- **CI/CD** : Jenkins (pipeline multibranche)

## Architecture
## Démarrage rapide

```bash
git clone https://github.com/<votre-user>/smarttask-devops.git
cd smarttask-devops
cp .env.example .env   # puis modifier les mots de passe
docker compose up -d --build
```

L'application est accessible sur `http://localhost:8080`.

## Structure du projet
## Branches

- `Dev` : développement en cours
- `Prod` : version stable en production

## Pipeline CI/CD

Le pipeline Jenkins automatise :
1. Récupération du code depuis GitHub
2. Construction des images Docker (frontend/backend)
3. Attribution d'un tag
4. Publication sur Docker Hub

## Auteur

Maadjou — Master 1 ISI Dakar, Virtualisation, Cloud & Réseaux
