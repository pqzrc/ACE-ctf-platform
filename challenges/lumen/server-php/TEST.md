# Guide de test du widget LUMEN/DSIN

## ✅ Intégration terminée

Le widget LUMEN/DSIN a été intégré dans l'**Épreuve 3 - Captcha** pour test.

## 🧪 Comment tester

### 1. Accéder à l'épreuve 3

**En local (dev) :**
```
http://epreuve3.localhost/
```

**En production :**
```
http://epreuve3.challenges.vizyondijital.fr/
```

### 2. Vérifier que le widget s'affiche

Vous devriez voir **deux widgets** :
- **Widget LUMEN** (bas droite, rose) : Chat avec LUMEN
- **Widget DSIN** (bas gauche, cyan) : Messages officiels

### 3. Tester le flux complet

#### Étape 1 : Connexion
1. Identifiant : `Admin`
2. Mot de passe : `1234`
3. Cliquez sur "Initialiser le protocole"

#### Étape 2 : Résoudre le captcha
1. Sélectionnez les images demandées
2. Cliquez sur "Vérifier et Prier"

#### Étape 3 : Observer les widgets

**Si vous réussissez :**
- ✅ Widget DSIN affiche un message de succès (peut contenir le flag)
- ✅ Message : "Captcha validé malgré le sabotage..."

**Si vous échouez :**
- ❌ Widget LUMEN affiche un message décourageant
- ❌ Message généré par Groq API (sarcastique et hostile)

#### Étape 4 : Tester le chat libre
1. Cliquez dans le widget LUMEN (bas droite)
2. Tapez un message (ex: "Pourquoi tu es hostile ?")
3. Appuyez sur Entrée ou cliquez sur le bouton →
4. LUMEN répondra via Groq API

### 4. Tester l'isolation des sessions

**Test multi-équipes :**
1. Ouvrez deux onglets différents
2. Dans chaque onglet, envoyez un message différent à LUMEN
3. **Vérifiez** : Les conversations sont séparées (chaque onglet a sa propre session)

**Comment vérifier :**
- Les messages d'un onglet n'apparaissent pas dans l'autre
- Chaque onglet a son propre historique

## 🔍 Vérifications techniques

### Vérifier que le widget est chargé

Ouvrez la console du navigateur (F12) et vérifiez :
```javascript
typeof LumenWidget !== 'undefined'  // Doit retourner true
```

### Vérifier les appels API

Dans l'onglet Network (F12 → Network), vous devriez voir :
- `GET /api/dsin-intro/3` - Chargement de l'intro DSIN
- `POST /api/chatbot` - Rapport succès/échec
- `POST /api/chat` - Messages libres à LUMEN

### Vérifier les sessions

Les fichiers de session sont créés dans :
```
/var/www/html/sessions/
```

Pour voir les sessions actives :
```bash
docker exec ace-challenges-lumen-chat-1 ls -la /var/www/html/sessions/
```

## 🐛 Dépannage

### Le widget ne s'affiche pas

**Vérifier :**
1. Console du navigateur (F12) pour les erreurs
2. Que le script est bien chargé :
   ```javascript
   // Dans la console
   document.querySelector('script[src*="lumen-widget"]')
   ```
3. Que l'URL du widget est correcte :
   ```html
   <script src="https://lumen.challenges.vizyondijital.fr/public/widget/lumen-widget.js"></script>
   ```

### Les messages ne s'affichent pas

**Vérifier :**
1. Que l'API LUMEN est accessible :
   ```bash
   curl http://lumen.localhost/api
   ```
2. Que `GROQ_API_KEY` est configurée (pour les réponses LUMEN)
3. Les logs du container :
   ```bash
   docker logs ace-challenges-lumen-chat-1
   ```

### Erreur CORS

Si vous voyez des erreurs CORS dans la console :
- Vérifiez que les headers CORS sont bien configurés dans `includes/config.php`
- Vérifiez que Traefik n'interfère pas avec les headers

### Les conversations se mélangent

**Vérifier :**
1. Que chaque onglet a son propre cookie `lumen_session`
2. Dans la console :
   ```javascript
   document.cookie  // Doit contenir lumen_session=...
   ```
3. Que les fichiers de session sont séparés :
   ```bash
   docker exec ace-challenges-lumen-chat-1 ls /var/www/html/sessions/
   ```

## 📝 Résultat attendu

### Scénario de succès

1. ✅ Widgets visibles en bas de l'écran
2. ✅ Message DSIN d'intro chargé automatiquement
3. ✅ Message LUMEN d'accueil affiché
4. ✅ En cas d'échec : Message LUMEN décourageant
5. ✅ En cas de succès : Message DSIN avec confirmation
6. ✅ Chat libre fonctionnel avec LUMEN
7. ✅ Isolation des sessions (chaque équipe a sa propre conversation)

### Scénario d'échec (pour tester LUMEN)

1. Connectez-vous avec Admin/1234
2. Sélectionnez **de mauvaises images** dans le captcha
3. Cliquez sur "Vérifier et Prier"
4. **Résultat attendu** : LUMEN affiche un message sarcastique et décourageant

## 🎯 Prochaines étapes

Une fois le test validé, vous pouvez :
1. Intégrer le widget dans les autres épreuves
2. Configurer les flags dans `includes/data.php` → `$MESSAGES_DSIN_SUCCESS`
3. Personnaliser les messages d'intro dans `$MESSAGES_DSIN_INTRO`

## 📚 Documentation

- **Guide d'intégration** : `INTEGRATION.md`
- **Documentation du widget** : `public/widget/README.md`
- **Code du widget** : `public/widget/lumen-widget.js`

