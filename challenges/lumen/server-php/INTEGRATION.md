# Intégration LUMEN/DSIN dans les challenges

## Réponse à votre question : Conflit entre équipes ?

### ❌ PROBLÈME INITIAL
**OUI, il y avait un conflit !** Sans système de sessions, toutes les équipes partageaient le même historique de conversation. Si l'équipe A envoyait un message à LUMEN, l'équipe B pouvait voir la réponse dans son contexte.

### ✅ SOLUTION IMPLÉMENTÉE
**Isolation complète par équipe :**
1. **Sessions uniques** : Chaque équipe a sa propre session (via `teamId` ou cookie anonyme)
2. **Historique séparé** : Les conversations sont stockées dans des fichiers séparés par session
3. **Pas de mélange** : Les messages d'une équipe ne sont jamais visibles par une autre

### Comment ça fonctionne ?

```php
// Chaque requête identifie l'équipe
$teamId = $input['teamId'] ?? null;
$sessionId = getSessionId($teamId); // Génère un ID unique par équipe

// L'historique est stocké séparément
$history = getConversationHistory($sessionId); // Fichier: sessions/team_abc123.json
```

**Résultat :**
- Équipe A → Session `team_abc123` → Fichier `sessions/team_abc123.json`
- Équipe B → Session `team_def456` → Fichier `sessions/team_def456.json`
- **Aucun conflit possible !**

---

## Utilisation du widget dans un challenge

### Étape 1 : Ajouter le script

Dans votre fichier HTML de challenge :

```html
<script src="https://lumen.challenges.vizyondijital.fr/public/widget/lumen-widget.js"></script>
```

### Étape 2 : Initialiser le widget

```javascript
LumenWidget.init({
  apiBase: 'https://lumen.challenges.vizyondijital.fr',
  teamId: 'team-123',        // Optionnel : identifiant d'équipe
  currentEpreuve: 1          // Numéro de l'épreuve actuelle
});
```

### Étape 3 : Gérer les succès/échecs

```javascript
// Quand l'utilisateur échoue
function onChallengeFailure() {
  LumenWidget.reportEpreuveResult(1, false);
  // LUMEN répondra avec un message décourageant
}

// Quand l'utilisateur réussit
function onChallengeSuccess() {
  LumenWidget.reportEpreuveResult(1, true);
  // DSIN enverra un message de succès (peut contenir le flag)
}
```

---

## Exemple complet : Épreuve 3 (Captcha)

```html
<!DOCTYPE html>
<html>
<head>
  <title>Épreuve 3 - Captcha saboté</title>
</head>
<body>
  <h1>Résolvez le captcha</h1>
  
  <div id="captcha">
    <!-- Votre challenge captcha ici -->
  </div>
  
  <button onclick="validateCaptcha()">Valider</button>
  
  <!-- Widget LUMEN/DSIN -->
  <script src="https://lumen.challenges.vizyondijital.fr/public/widget/lumen-widget.js"></script>
  <script>
    // Initialiser le widget
    LumenWidget.init({
      apiBase: 'https://lumen.challenges.vizyondijital.fr',
      teamId: getTeamId(),  // À récupérer depuis CTFd ou votre système
      currentEpreuve: 3
    });
    
    function validateCaptcha() {
      if (isCaptchaValid()) {
        // Succès
        submitFlag('FLAG_EPREUVE_3');
        LumenWidget.reportEpreuveResult(3, true);
        alert('Épreuve réussie !');
      } else {
        // Échec
        LumenWidget.reportEpreuveResult(3, false);
        alert('Captcha incorrect. LUMEN vous observe...');
      }
    }
    
    function getTeamId() {
      // Option 1 : Depuis CTFd (si intégré)
      // return window.ctfd?.team?.id;
      
      // Option 2 : Depuis votre système d'authentification
      // return window.user?.teamId;
      
      // Option 3 : Session anonyme (cookie automatique)
      return null;
    }
  </script>
</body>
</html>
```

---

## Donner le flag via DSIN

Pour qu'un message DSIN contienne le flag, modifiez `includes/data.php` :

```php
$MESSAGES_DSIN_SUCCESS = [
    3 => "Captcha validé malgré le sabotage. La preuve d'humanité est enregistrée. Flag: FLAG_EPREUVE_3_ABC123",
    8 => "Puzzle résolu. L'emplacement du dispositif est identifié. Flag: FLAG_EPREUVE_8_XYZ789",
    // ...
];
```

Le flag apparaîtra automatiquement dans le widget DSIN (bas gauche) quand l'épreuve est réussie.

---

## Architecture des widgets

### Widget LUMEN (bas droite)
- **Couleur** : Rose néon (#fc10ca)
- **Fonction** : Chat libre avec LUMEN
- **Comportement** : Réponses sarcastiques et décourageantes
- **Utilisation** : L'utilisateur peut poser des questions

### Widget DSIN (bas gauche)
- **Couleur** : Cyan (#09c7df)
- **Fonction** : Messages officiels de la DSIN
- **Comportement** : Instructions, confirmations, flags
- **Utilisation** : Lecture seule (pas d'input)

---

## Configuration des messages

### Messages DSIN d'introduction
Fichier : `includes/data.php` → `$MESSAGES_DSIN_INTRO`

```php
$MESSAGES_DSIN_INTRO = [
    1 => "Activité anormale détectée. Identifiez le mail frauduleux.",
    3 => "LUMEN altère les interactions. Validez le captcha malgré le sabotage.",
    // ...
];
```

### Messages DSIN de succès
Fichier : `includes/data.php` → `$MESSAGES_DSIN_SUCCESS`

```php
$MESSAGES_DSIN_SUCCESS = [
    1 => "Mail identifié. Flag: FLAG_EPREUVE_1",
    3 => "Captcha validé. Flag: FLAG_EPREUVE_3",
    // ...
];
```

### Messages LUMEN d'échec
Générés automatiquement via Groq API avec le prompt dans `getFailurePrompt()`.

---

## Sécurité et isolation

### Garanties
✅ **Isolation totale** : Chaque équipe a sa propre session  
✅ **Pas de fuite** : Les messages ne sont jamais partagés  
✅ **TTL des sessions** : 24 heures (configurable)  
✅ **Nettoyage automatique** : Les anciennes sessions sont supprimées  

### Fichiers de session
- Emplacement : `/var/www/html/sessions/`
- Format : `team_{hash}.json` ou `anon_{random}.json`
- Permissions : 777 (écriture Apache)
- TTL : 24 heures

### Récupération de teamId

**Option 1 : Depuis CTFd (recommandé)**
```javascript
// Si CTFd expose l'ID d'équipe
const teamId = window.ctfd?.team?.id;
```

**Option 2 : Depuis votre backend**
```javascript
// Via API de votre site d'inscription
fetch('/api/user/team')
  .then(r => r.json())
  .then(data => {
    LumenWidget.init({
      apiBase: 'https://lumen.challenges.vizyondijital.fr',
      teamId: data.teamId,
      currentEpreuve: 1
    });
  });
```

**Option 3 : Session anonyme**
```javascript
// Si teamId n'est pas fourni, un cookie anonyme est créé
LumenWidget.init({
  apiBase: 'https://lumen.challenges.vizyondijital.fr',
  currentEpreuve: 1
  // teamId non fourni = isolation par cookie
});
```

---

## Dépannage

### Le widget ne s'affiche pas
- Vérifiez que l'URL de l'API est correcte
- Vérifiez la console du navigateur (F12)
- Vérifiez que le script est chargé avant l'initialisation

### Les messages ne s'affichent pas
- Vérifiez que l'API LUMEN est accessible
- Vérifiez que `GROQ_API_KEY` est configurée (pour les réponses LUMEN)
- Vérifiez les logs Apache : `docker logs lumen-chat`

### Les conversations se mélangent
- Assurez-vous que `teamId` est unique par équipe
- Vérifiez que les cookies sont activés (pour les sessions anonymes)
- Vérifiez les permissions du répertoire `sessions/`

### Erreur 500 sur l'API
- Vérifiez que `GROQ_API_KEY` est définie dans les variables d'environnement
- Vérifiez les permissions du répertoire `sessions/`
- Vérifiez les logs : `docker logs lumen-chat`

---

## Résumé

✅ **Problème résolu** : Isolation complète des conversations par équipe  
✅ **Widget réutilisable** : Facile à intégrer dans n'importe quel challenge  
✅ **Pas de conflit** : Chaque équipe a sa propre session  
✅ **Flexible** : Fonctionne avec ou sans identifiant d'équipe  

**Prêt à être déployé !** 🚀

