# Serveur LUMEN (PHP)

Serveur API pour le chat L.U.M.E.N. et les messages DSIN.

## Prérequis

- PHP 8.0+ avec cURL
- Clé API Groq

## Installation locale

```bash
cd server-php

# Définir la clé API Groq
export GROQ_API_KEY="votre_cle_groq"

# Lancer le serveur PHP intégré
php -S localhost:3000 index.php
```

## Endpoints

### `GET /`
Status du serveur et liste des endpoints.

### `POST /api/chatbot`
Gestion des succès/échecs d'épreuves.

**Body JSON:**
```json
{
  "numeroEpreuve": 1,
  "status": true
}
```

**Réponse:**
```json
{
  "numeroEpreuve": 1,
  "status": true,
  "titre": "Épreuve 1 – Mail suspect / phishing",
  "contexte": "...",
  "messageBot": "Mail frauduleux identifié...",
  "speaker": "DSIN"
}
```

### `GET /api/dsin-intro/{numero}`
Récupère le message d'introduction DSIN pour une épreuve.

**Réponse:**
```json
{
  "numeroEpreuve": 1,
  "titre": "Épreuve 1 – Mail suspect / phishing",
  "messageBot": "Activité anormale détectée...",
  "speaker": "DSIN"
}
```

### `POST /api/chat`
Discussion libre avec LUMEN.

**Body JSON:**
```json
{
  "message": "Qui es-tu ?",
  "history": []
}
```

**Réponse:**
```json
{
  "success": true,
  "message": "Je suis L.U.M.E.N., et vous n'êtes qu'une faille dans le système...",
  "speaker": "LUMEN"
}
```

## Docker

```bash
# Build
docker build -t lumen-server .

# Run
docker run -d -p 3000:80 -e GROQ_API_KEY="votre_cle" lumen-server
```

## Structure

```
server-php/
├── index.php           # Point d'entrée / routeur
├── api/
│   ├── chatbot.php     # POST - Succès/Échec épreuves
│   ├── dsin-intro.php  # GET - Intro DSIN
│   └── chat.php        # POST - Chat libre avec LUMEN
├── includes/
│   ├── config.php      # Configuration
│   ├── data.php        # Données épreuves et messages
│   └── groq.php        # Service API Groq
├── Dockerfile
└── README.md
```
