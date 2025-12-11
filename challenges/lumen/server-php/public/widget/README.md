# Widget LUMEN/DSIN - Guide d'intégration

## Problème résolu : Isolation des conversations

**OUI, il y avait un conflit !** Sans système de sessions, toutes les équipes partageaient le même historique de conversation.

**Solution implémentée :**
- Chaque équipe a sa propre session (via `teamId` ou cookie anonyme)
- L'historique est stocké séparément par session
- Les conversations sont complètement isolées

## Installation dans un challenge

### Méthode 1 : Avec identifiant d'équipe (recommandé)

```html
<!DOCTYPE html>
<html>
<head>
  <title>Épreuve 1 - Phishing</title>
</head>
<body>
  <!-- Votre contenu de challenge -->
  
  <!-- Widget LUMEN/DSIN -->
  <script src="https://lumen.challenges.vizyondijital.fr/public/widget/lumen-widget.js"></script>
  <script>
    // Récupérer l'identifiant d'équipe depuis CTFd ou votre système
    const teamId = getTeamIdFromCTFd(); // À implémenter selon votre setup
    
    LumenWidget.init({
      apiBase: 'https://lumen.challenges.vizyondijital.fr',
      teamId: teamId,              // Identifiant unique de l'équipe
      currentEpreuve: 1            // Numéro de l'épreuve actuelle
    });
    
    // Quand l'utilisateur échoue
    function onChallengeFailure() {
      LumenWidget.reportEpreuveResult(1, false);
    }
    
    // Quand l'utilisateur réussit
    function onChallengeSuccess() {
      LumenWidget.reportEpreuveResult(1, true);
    }
  </script>
</body>
</html>
```

### Méthode 2 : Sans identifiant d'équipe (session anonyme)

```html
<script src="https://lumen.challenges.vizyondijital.fr/public/widget/lumen-widget.js"></script>
<script>
  LumenWidget.init({
    apiBase: 'https://lumen.challenges.vizyondijital.fr',
    currentEpreuve: 1
    // teamId non fourni = session anonyme basée sur cookie
  });
</script>
```

## API du widget

### `LumenWidget.init(options)`
Initialise le widget.

**Options :**
- `apiBase` (string, requis) : URL de base de l'API LUMEN
- `teamId` (string, optionnel) : Identifiant d'équipe pour isolation
- `currentEpreuve` (number, optionnel) : Numéro de l'épreuve actuelle

### `LumenWidget.reportEpreuveResult(epreuveNum, success)`
Rapporte un succès ou échec d'épreuve.

**Paramètres :**
- `epreuveNum` (number) : Numéro de l'épreuve (1-10)
- `success` (boolean) : `true` pour succès, `false` pour échec

**Comportement :**
- Succès → Message DSIN dans le widget gauche
- Échec → Message LUMEN décourageant dans le widget droit

### `LumenWidget.loadDsinIntro(epreuveNum)`
Charge le message d'introduction DSIN pour une épreuve.

### `LumenWidget.addLumenMessage(text)`
Ajoute manuellement un message LUMEN.

### `LumenWidget.addDsinMessage(text)`
Ajoute manuellement un message DSIN.

## Exemple complet

```html
<!DOCTYPE html>
<html>
<head>
  <title>Épreuve 3 - Captcha</title>
</head>
<body>
  <h1>Épreuve 3 : Captcha saboté</h1>
  
  <div id="captcha-container">
    <!-- Votre challenge ici -->
  </div>
  
  <script src="https://lumen.challenges.vizyondijital.fr/public/widget/lumen-widget.js"></script>
  <script>
    // Initialiser le widget
    LumenWidget.init({
      apiBase: 'https://lumen.challenges.vizyondijital.fr',
      teamId: window.teamId || null,  // Si disponible depuis CTFd
      currentEpreuve: 3
    });
    
    // Quand le captcha est résolu
    function onCaptchaSuccess() {
      // Valider le flag dans CTFd
      submitFlag('FLAG_EPREUVE_3');
      
      // Notifier LUMEN du succès
      LumenWidget.reportEpreuveResult(3, true);
    }
    
    // Quand le captcha échoue
    function onCaptchaFailure() {
      // Notifier LUMEN de l'échec (il répondra avec un message décourageant)
      LumenWidget.reportEpreuveResult(3, false);
    }
  </script>
</body>
</html>
```

## Donner le flag via DSIN

Pour donner le flag dans un message DSIN, modifiez `includes/data.php` :

```php
$MESSAGES_DSIN_SUCCESS = [
    3 => "Captcha validé. Flag: FLAG_EPREUVE_3_ABC123",
    // ...
];
```

Le flag apparaîtra automatiquement dans le widget DSIN quand l'épreuve est réussie.

## Notes importantes

1. **Isolation garantie** : Chaque équipe a sa propre session, même sans `teamId` (via cookie)
2. **Pas de conflit** : Les conversations sont complètement séparées
3. **TTL des sessions** : 24 heures (configurable dans `includes/session.php`)
4. **Nettoyage automatique** : Les anciennes sessions sont supprimées après expiration

## Dépannage

**Le widget ne s'affiche pas :**
- Vérifiez que l'URL de l'API est correcte
- Vérifiez la console du navigateur pour les erreurs

**Les messages ne s'affichent pas :**
- Vérifiez que l'API LUMEN est accessible
- Vérifiez que `GROQ_API_KEY` est configurée (pour les réponses LUMEN)

**Les conversations se mélangent :**
- Assurez-vous que `teamId` est unique par équipe
- Vérifiez que les cookies sont activés (pour les sessions anonymes)

