// Contenu de la page Messagerie - Communication DSIN

// Données complètes des messages
const messagesData = {
  msg1: {
    id: "msg1",
    from: "Marc ETIENNE",
    role: "Directeur DSIN",
    avatar: "👤",
    time: "03:22:15",
    subject: "🚨 RÉUNION CRISE IMMÉDIATE - INTRUSION L.U.M.E.N.",
    preview:
      "Équipe, situation critique. Intrusion confirmée sur 4 serveurs majeurs. Réunion de crise dans 10 minutes, salle A301. Tous les ingénieurs sécurité requis...",
    content: `
      <p>Équipe DSIN,</p>
      <p><strong style="color: var(--error);">SITUATION CRITIQUE</strong> - Je convoque une réunion de crise immédiate dans 10 minutes en salle A301.</p>
      <p>Nous avons confirmation d'une intrusion majeure sur nos systèmes. L'attaquant se fait appeler <strong>L.U.M.E.N.</strong> (Logiciel Unifié de Menace et d'Extraction Numérique).</p>
      
      <p><strong>État actuel :</strong></p>
      <ul>
        <li>🔴 4 serveurs critiques compromis (UA-SSO-01, UA-DB-PROD, UA-WEB-FRONT, UA-BACKUP-02)</li>
        <li>🔴 6 fichiers de logs cryptés</li>
        <li>🔴 Données de 12,847 étudiants et 1,243 membres du personnel menacées</li>
        <li>⚠️ Ultimatum : divulgation des données dans moins de 3 heures</li>
      </ul>
      
      <p><strong>Présence requise :</strong></p>
      <ul>
        <li>Sophie (Analyste SOC) - Rapport IOC</li>
        <li>Jean-Paul (Sécurité) - Analyse forensique</li>
        <li>Karim (Réseau) - État de la segmentation</li>
        <li>Thomas (Systèmes) - État des serveurs</li>
        <li>Marie (DPO) - Implications RGPD</li>
      </ul>
      
      <p>Le Président Desrosiers attend un rapport complet dans l'heure. Cette situation engage la réputation de l'université.</p>
      
      <p><strong>Marc ETIENNE</strong><br>
      Directeur DSIN<br>
      Université des Antilles</p>
    `,
    unread: true,
    urgent: true,
    attachments: 0,
  },
  msg2: {
    id: "msg2",
    from: "Sophie BERNARD",
    role: "Analyste SOC",
    avatar: "👩‍💻",
    time: "03:19:42",
    subject: "RE: Alertes SIEM - Détection d'IOC critiques",
    preview:
      "J'ai terminé l'analyse des alertes SIEM. On a 5 IOC confirmés dont l'IP 198.51.100.247 qui fait des requêtes répétées sur le port 8443...",
    content: `
      <p>Bonjour Marc,</p>
      <p>J'ai terminé l'analyse complète des alertes SIEM. Voici le résumé des Indicateurs de Compromission (IOC) identifiés :</p>
      
      <p><strong>🎯 IOC CONFIRMÉS :</strong></p>
      
      <p><strong>1. IP externe suspecte :</strong><br>
      <code style="background: rgba(255,0,85,0.1); padding: 4px 8px; border-radius: 4px;">198.51.100.247</code><br>
      - Connexions répétées vers ports 8443 (HTTPS custom) et 22 (SSH)<br>
      - 847 tentatives de connexion en 2 heures<br>
      - Origine géographique : Serveur proxy TOR (localisation masquée)</p>
      
      <p><strong>2. Hash de fichier malveillant :</strong><br>
      <code style="background: rgba(255,0,85,0.1); padding: 4px 8px; border-radius: 4px;">a3f5e9c7d2b1f4a6e8c9d0f1a2b3c4d5</code><br>
      - Fichier : /usr/bin/.lumen/core<br>
      - Match VirusTotal : 15/68 détections<br>
      - Classification : Trojan.GenericKD, Backdoor.Linux</p>
      
      <p><strong>3. Processus suspect :</strong><br>
      <code style="background: rgba(255,0,85,0.1); padding: 4px 8px; border-radius: 4px;">PID 4782 - /usr/bin/.lumen/core --stealth</code><br>
      - Consommation mémoire anormale : 1.2GB<br>
      - Non signé, lancé par session root non autorisée</p>
      
      <p><strong>4. Domaine C&C :</strong><br>
      <code style="background: rgba(255,0,85,0.1); padding: 4px 8px; border-radius: 4px;">c2.lumen-network.onion</code><br>
      - Serveur Command & Control via réseau TOR<br>
      - Exfiltration de données détectée : ~2.4GB transférés</p>
      
      <p><strong>📊 RECOMMANDATIONS IMMÉDIATES :</strong></p>
      <ul>
        <li>Bloquer l'IP 198.51.100.247 sur tous les firewalls (Karim, tu peux t'en charger ?)</li>
        <li>Isoler les serveurs compromis</li>
        <li>Kill le processus PID 4782</li>
        <li>Analyser les logs réseau pour tracer l'exfiltration</li>
      </ul>
      
      <p>Rapport complet en pièce jointe.</p>
      
      <p>Sophie BERNARD<br>
      Analyste SOC - Centre de supervision</p>
    `,
    unread: true,
    urgent: false,
    attachments: 1,
    attachmentNames: ["rapport_ioc.pdf"],
  },
  msg3: {
    id: "msg3",
    from: "Jean-Paul MARTINEZ",
    role: "Responsable Sécurité",
    avatar: "🛡️",
    time: "03:18:33",
    subject: "LOGS CRYPTÉS - Besoin d'aide décryptage",
    preview:
      "Problème majeur : 6 fichiers de logs ont été cryptés par l'attaquant. Le fichier RÉSEAUX contient des informations critiques sur l'intrusion mais il est illisible...",
    content: `
      <p>Équipe,</p>
      <p><strong style="color: var(--error);">PROBLÈME MAJEUR</strong> avec les fichiers de logs système.</p>
      
      <p>L'attaquant L.U.M.E.N. a réussi à crypter 6 fichiers de logs critiques :</p>
      <ul>
        <li>📄 Messagerie.txt - <span style="color: var(--error);">CRYPTÉ</span></li>
        <li>📄 Pare-feu.txt - <span style="color: var(--error);">CRYPTÉ</span></li>
        <li>📄 Réseaux.txt - <span style="color: var(--error);">CRYPTÉ ⚠️ CRITIQUE</span></li>
        <li>📄 Sauvegarde.txt - <span style="color: var(--error);">CRYPTÉ</span></li>
        <li>📄 Serveur-Web.txt - <span style="color: var(--error);">CRYPTÉ</span></li>
        <li>📄 VPN.txt - <span style="color: var(--error);">CRYPTÉ</span></li>
      </ul>
      
      <p><strong>⚠️ LE FICHIER RÉSEAUX EST CRITIQUE</strong> car il contient :</p>
      <ul>
        <li>L'historique complet des connexions réseau</li>
        <li>Les détails de l'intrusion L.U.M.E.N.</li>
        <li>Les adresses IP et ports utilisés</li>
        <li>Les traces de l'exfiltration de données</li>
      </ul>
      
      <p><strong>🔍 ANALYSE PRÉLIMINAIRE :</strong></p>
      <p>J'ai examiné le contenu du fichier Réseaux.txt. Le texte semble avoir été chiffré avec un algorithme simple. D'après mes premières analyses, il pourrait s'agir d'un <strong style="color: var(--warning);">chiffrement ROT13</strong>.</p>
      
      <p>Le ROT13 est une méthode de chiffrement par substitution simple qui décale chaque lettre de 13 positions dans l'alphabet. C'est réversible : appliquer ROT13 deux fois redonne le texte original.</p>
      
      <p><strong>ACTION REQUISE :</strong></p>
      <p>Quelqu'un peut aller dans la section <strong>LOGS</strong>, ouvrir le fichier <strong>Réseaux</strong>, copier le contenu et utiliser un décodeur ROT13 en ligne pour le décrypter ? On a besoin de ces informations de toute urgence pour comprendre comment L.U.M.E.N. a infiltré nos systèmes.</p>
      
      <p>Décodeurs ROT13 disponibles : rot13.com, convertstring.com, etc.</p>
      
      <p>Jean-Paul MARTINEZ<br>
      Responsable Sécurité<br>
      DSIN - Université des Antilles</p>
    `,
    unread: true,
    urgent: true,
    attachments: 0,
  },
  msg4: {
    id: "msg4",
    from: "Marie DUBOIS",
    role: "DPO (Déléguée à la Protection des Données)",
    avatar: "⚖️",
    time: "03:17:58",
    subject: "⚠️ VIOLATION RGPD - Notification CNIL obligatoire",
    preview:
      "Marc, je viens d'être alertée de l'incident. Nous avons 72h pour notifier la CNIL. Les données de 12,847 étudiants et 1,243 membres du personnel sont potentiellement compromises...",
    content: `
      <p>Marc,</p>
      <p>Je viens d'être alertée de l'incident de sécurité en cours. En tant que DPO, je dois vous informer des <strong style="color: var(--error);">obligations légales immédiates</strong> :</p>
      
      <p><strong>📋 NOTIFICATION CNIL (Article 33 RGPD) :</strong></p>
      <ul>
        <li>⏰ Délai : <strong>72 heures maximum</strong> après la prise de connaissance de la violation</li>
        <li>📊 Données concernées : 12,847 étudiants + 1,243 membres du personnel = <strong>14,090 personnes</strong></li>
        <li>📝 Informations requises : nature de la violation, catégories de données, conséquences probables, mesures prises</li>
      </ul>
      
      <p><strong>📢 NOTIFICATION AUX PERSONNES CONCERNÉES (Article 34 RGPD) :</strong></p>
      <p>Si la violation présente un risque élevé pour les droits et libertés des personnes (ce qui semble être le cas), nous devons également informer directement les 14,090 personnes concernées.</p>
      
      <p><strong>⚠️ SANCTIONS POTENTIELLES :</strong></p>
      <ul>
        <li>Amendes administratives jusqu'à <strong>20 millions d'euros</strong> ou <strong>4% du chiffre d'affaires annuel mondial</strong></li>
        <li>Actions en justice de la part des personnes concernées</li>
        <li>Atteinte majeure à la réputation de l'université</li>
      </ul>
      
      <p><strong>📎 DOCUMENTS NÉCESSAIRES :</strong></p>
      <p>Pour constituer le dossier CNIL, j'ai besoin de :</p>
      <ul>
        <li>Journaux d'audit système (apparemment cryptés...)</li>
        <li>Rapport technique de l'intrusion (Sophie, Jean-Paul ?)</li>
        <li>Liste des données compromises</li>
        <li>Chronologie détaillée des événements</li>
        <li>Mesures de sécurité déjà en place</li>
        <li>Actions correctives entreprises</li>
      </ul>
      
      <p>Je prépare le template de notification CNIL et la checklist de conformité (voir pièces jointes).</p>
      
      <p><strong>URGENCE ABSOLUE</strong> - Le chronomètre tourne.</p>
      
      <p>Marie DUBOIS<br>
      DPO - Déléguée à la Protection des Données<br>
      Université des Antilles<br>
      marie.dubois@univ-antilles.fr</p>
    `,
    unread: true,
    urgent: true,
    attachments: 2,
    attachmentNames: ["template_cnil.docx", "checklist.pdf"],
  },
  msg5: {
    id: "msg5",
    from: "Thomas LAURENT",
    role: "Administrateur Systèmes",
    avatar: "⚙️",
    time: "03:16:47",
    subject: "État des serveurs compromis - Rapport technique",
    preview:
      "Voici le point technique sur les 4 serveurs compromis : UA-SSO-01 (hôte d'authentification), UA-DB-PROD (base données production), UA-WEB-FRONT (serveur web)...",
    content: `
      <p>Équipe,</p>
      <p>Voici l'état détaillé des 4 serveurs compromis par L.U.M.E.N. :</p>
      
      <p><strong>🖥️ UA-SSO-01 - Serveur d'authentification</strong></p>
      <ul>
        <li>Status : <span style="color: var(--error);">COMPROMIS - SESSION ROOT NON AUTORISÉE</span></li>
        <li>IP : 10.20.1.15</li>
        <li>Rôle : Authentification centralisée (SSO) pour tous les services</li>
        <li>Vecteur d'intrusion : Session root depuis IP 198.51.100.247</li>
        <li>Services affectés : ssh-daemon (modifié), simbusd (daemon suspect)</li>
        <li>Impact : Accès potentiel à tous les comptes utilisateurs</li>
      </ul>
      
      <p><strong>💾 UA-DB-PROD - Base de données production</strong></p>
      <ul>
        <li>Status : <span style="color: var(--error);">COMPROMIS - EXFILTRATION DÉTECTÉE</span></li>
        <li>IP : 10.20.2.42</li>
        <li>Rôle : Base de données principale (MySQL 8.0)</li>
        <li>Données : Informations étudiants, personnel, données académiques</li>
        <li>Exfiltration : ~2.4GB de données transférées vers c2.lumen-network.onion</li>
        <li>Impact : 12,847 étudiants + 1,243 personnel compromis</li>
      </ul>
      
      <p><strong>🌐 UA-WEB-FRONT - Serveur Web</strong></p>
      <ul>
        <li>Status : <span style="color: var(--error);">COMPROMIS - BACKDOOR INSTALLÉ</span></li>
        <li>IP : 10.20.3.28</li>
        <li>Rôle : Serveur web public (nginx 1.18)</li>
        <li>Vecteur : nginx service injecté avec code malveillant</li>
        <li>Impact : Porte dérobée pour accès persistant</li>
      </ul>
      
      <p><strong>💿 UA-BACKUP-02 - Serveur de sauvegardes</strong></p>
      <ul>
        <li>Status : <span style="color: var(--warning);">PARTIELLEMENT COMPROMIS</span></li>
        <li>IP : 10.20.4.55</li>
        <li>Rôle : Stockage des backups critiques</li>
        <li>Backups chiffrés : 2/3 (Backup-PROD-Daily 78%, Backup-DB-Weekly 34%)</li>
        <li>Backup intact : Backup-Web-Incremental (copié sur stockage offline)</li>
      </ul>
      
      <p><strong>⚠️ SERVICES SUSPECTS IDENTIFIÉS :</strong></p>
      <ol>
        <li><strong>simbusd</strong> - Daemon inconnu, non référencé dans l'inventaire</li>
        <li><strong>ssh-daemon</strong> - Version SSH modifiée avec backdoor</li>
        <li><strong>nginx</strong> - Service web injecté avec code malveillant</li>
      </ol>
      
      <p><strong>🔧 ACTIONS EN COURS :</strong></p>
      <ul>
        <li>✅ Isolement réseau des serveurs compromis (avec Karim)</li>
        <li>✅ Snapshots forensiques créés pour analyse</li>
        <li>⏳ Identification des comptes compromis</li>
        <li>⏳ Préparation de la restauration depuis backups sains</li>
      </ul>
      
      <p>Rapport complet en pièce jointe (Excel).</p>
      
      <p>Thomas LAURENT<br>
      Administrateur Systèmes<br>
      DSIN - Université des Antilles</p>
    `,
    unread: true,
    urgent: false,
    attachments: 1,
    attachmentNames: ["rapport_serveurs.xlsx"],
  },
  msg6: {
    id: "msg6",
    from: "Karim BENALI",
    role: "Responsable Réseau",
    avatar: "🌐",
    time: "03:15:52",
    subject: "Blocage IP 198.51.100.247 sur tous les firewalls",
    preview:
      "J'ai isolé les systèmes compromis du réseau principal. L'IP externe 198.51.100.247 tente toujours de se connecter. J'ai configuré les règles de blocage...",
    content: `
      <p>Équipe sécurité,</p>
      <p><strong>✅ ACTIONS RÉSEAU COMPLÉTÉES :</strong></p>
      
      <p><strong>1. Segmentation réseau :</strong></p>
      <ul>
        <li>✅ Serveurs compromis isolés dans VLAN de quarantaine (VLAN 999)</li>
        <li>✅ Coupure de l'accès Internet pour ces serveurs</li>
        <li>✅ Maintien d'un accès restreint pour analyse forensique</li>
      </ul>
      
      <p><strong>2. Blocage IP malveillante :</strong></p>
      <code style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 4px; display: block; margin: 10px 0;">
# Règle firewall principale (Fortinet)<br>
deny from 198.51.100.247 to any<br>
log all attempts<br>
<br>
# Firewall secondaire (backup)<br>
iptables -A INPUT -s 198.51.100.247 -j DROP<br>
iptables -A OUTPUT -d 198.51.100.247 -j DROP
      </code>
      
      <p><strong>3. Blocage domaine C&C :</strong></p>
      <ul>
        <li>✅ Domaine c2.lumen-network.onion bloqué sur DNS</li>
        <li>✅ Tout trafic TOR bloqué sur le périmètre</li>
        <li>✅ Analyse DPI (Deep Packet Inspection) activée</li>
      </ul>
      
      <p><strong>4. Monitoring renforcé :</strong></p>
      <ul>
        <li>✅ Capture réseau complète activée (SPAN ports)</li>
        <li>✅ IDS/IPS en mode blocage agressif</li>
        <li>✅ Alertes temps réel configurées</li>
      </ul>
      
      <p><strong>📊 OBSERVATIONS :</strong></p>
      <ul>
        <li>L'IP 198.51.100.247 continue les tentatives de connexion (847 bloquées)</li>
        <li>Tentatives sur ports : 22 (SSH), 8443 (HTTPS custom), 3306 (MySQL)</li>
        <li>Pattern d'attaque : scan automatisé + exploitation ciblée</li>
      </ul>
      
      <p><strong>⚠️ RECOMMANDATION :</strong></p>
      <p>La segmentation réseau limite la propagation MAIS le malware est déjà présent sur les 4 serveurs. Il faut éradiquer la menace au niveau système (Thomas, tu confirmes le plan de nettoyage ?)</p>
      
      <p>Règles firewall complètes en pièce jointe.</p>
      
      <p>Karim BENALI<br>
      Responsable Réseau & Infrastructure<br>
      DSIN - Université des Antilles</p>
    `,
    unread: true,
    urgent: true,
    attachments: 1,
    attachmentNames: ["firewall_rules.txt"],
  },
  msg7: {
    id: "msg7",
    from: "Claire ROUSSEAU",
    role: "Responsable Sauvegardes",
    avatar: "💾",
    time: "03:14:38",
    subject: "Statut des sauvegardes - 2/3 chiffrées",
    preview:
      "Mauvaise nouvelle : l'attaquant a réussi à chiffrer 2 de nos 3 backups principaux. Backup-PROD-Daily (78% chiffré) et Backup-DB-Weekly (chiffrement en cours 34%)...",
    content: `
      <p>Marc, équipe,</p>
      <p><strong style="color: var(--error);">MAUVAISE NOUVELLE</strong> concernant nos sauvegardes...</p>
      
      <p><strong>📊 ÉTAT DES BACKUPS :</strong></p>
      
      <p><strong>❌ Backup-PROD-Daily (PRODUCTION)</strong></p>
      <ul>
        <li>Status : <span style="color: var(--error);">CHIFFRÉ À 78%</span></li>
        <li>Taille : 847GB</li>
        <li>Type : Sauvegarde quotidienne complète</li>
        <li>Dernière sauvegarde saine : Il y a 2 jours</li>
        <li>Impact : Perte de 2 jours de données si restauration</li>
      </ul>
      
      <p><strong>⚠️ Backup-DB-Weekly (BASE DE DONNÉES)</strong></p>
      <ul>
        <li>Status : <span style="color: var(--warning);">CHIFFREMENT EN COURS - 34%</span></li>
        <li>Taille : 1.2TB</li>
        <li>Type : Sauvegarde hebdomadaire complète</li>
        <li>Dernière sauvegarde saine : Il y a 6 jours</li>
        <li>Impact : Si le chiffrement se termine, perte majeure de données</li>
        <li>Action : J'ai stoppé le processus de chiffrement en coupant l'accès</li>
      </ul>
      
      <p><strong>✅ Backup-Web-Incremental (SERVEUR WEB)</strong></p>
      <ul>
        <li>Status : <span style="color: var(--success);">INTACT ET SÉCURISÉ</span></li>
        <li>Taille : 156GB</li>
        <li>Type : Sauvegarde incrémentielle</li>
        <li>Action : Copié sur stockage offline immédiatement</li>
      </ul>
      
      <p><strong>🔒 ACTIONS PRISES :</strong></p>
      <ul>
        <li>✅ Déconnexion du serveur de backup du réseau principal</li>
        <li>✅ Copie d'urgence du Backup-Web-Incremental sur NAS offline</li>
        <li>✅ Arrêt du processus de chiffrement sur Backup-DB-Weekly</li>
        <li>✅ Restauration en cours d'une copie partielle de Backup-PROD-Daily</li>
      </ul>
      
      <p><strong>💡 PLAN DE RESTAURATION :</strong></p>
      <p>Si on doit restaurer les systèmes :</p>
      <ol>
        <li>Utiliser Backup-Web-Incremental (100% intact)</li>
        <li>Restaurer la partie non chiffrée de Backup-DB-Weekly (66%)</li>
        <li>Récupération manuelle des données manquantes si possible</li>
        <li>Perte estimée : 2-6 jours de données selon les systèmes</li>
      </ol>
      
      <p><strong>⚠️ RECOMMANDATION URGENTE :</strong></p>
      <p>On doit neutraliser L.U.M.E.N. rapidement avant qu'il ne termine de chiffrer Backup-DB-Weekly. Ce backup contient toutes nos données de base de données de la semaine.</p>
      
      <p>Claire ROUSSEAU<br>
      Responsable Sauvegardes & Archivage<br>
      DSIN - Université des Antilles</p>
    `,
    unread: false,
    urgent: false,
    attachments: 0,
  },
  msg8: {
    id: "msg8",
    from: "Isabelle MOREL",
    role: "Conseillère Juridique",
    avatar: "⚖️",
    time: "03:12:25",
    subject: "Implications juridiques de l'incident",
    preview:
      "Bonjour à tous, j'ai été informée de l'incident de sécurité. Du point de vue juridique, nous devons : 1) Documenter minutieusement tous les événements, 2) Préserver les preuves...",
    content: `
      <p>Bonjour Marc et l'équipe DSIN,</p>
      <p>J'ai été informée de l'incident de sécurité majeur en cours. Voici les implications juridiques et les obligations légales :</p>
      
      <p><strong>⚖️ CADRE JURIDIQUE APPLICABLE :</strong></p>
      <ul>
        <li><strong>RGPD (Règlement Général sur la Protection des Données)</strong> - Articles 33 & 34</li>
        <li><strong>Loi Informatique et Libertés</strong> modifiée</li>
        <li><strong>Code pénal</strong> - Atteinte aux STAD (Art. 323-1 à 323-7)</li>
        <li><strong>Code de l'éducation</strong> - Obligations des établissements publics</li>
      </ul>
      
      <p><strong>📋 OBLIGATIONS IMMÉDIATES :</strong></p>
      
      <p><strong>1. Documentation rigoureuse :</strong></p>
      <ul>
        <li>Registre de traitement de l'incident (heure par heure)</li>
        <li>Captures d'écran et preuves numériques</li>
        <li>Conservation de tous les logs et traces (même cryptées)</li>
        <li>Témoignages écrits de tous les intervenants</li>
      </ul>
      
      <p><strong>2. Notification CNIL :</strong></p>
      <ul>
        <li>Délai impératif : 72 heures</li>
        <li>Formulaire en ligne sur le site CNIL</li>
        <li>Marie (DPO) est votre interlocutrice principale</li>
      </ul>
      
      <p><strong>3. Information des personnes concernées :</strong></p>
      <ul>
        <li>Si risque élevé → notification individuelle obligatoire</li>
        <li>Contenu : nature de la violation, données concernées, mesures prises, contact DPO</li>
        <li>Moyens : email, courrier, publication sur le site</li>
      </ul>
      
      <p><strong>4. Dépôt de plainte :</strong></p>
      <ul>
        <li>Plainte pénale auprès du Procureur de la République</li>
        <li>Qualification : Accès frauduleux (323-1), Entrave au fonctionnement (323-2)</li>
        <li>Peines encourues pour l'attaquant : 5 ans + 150 000€ d'amende</li>
      </ul>
      
      <p><strong>⚠️ RISQUES JURIDIQUES POUR L'UNIVERSITÉ :</strong></p>
      <ul>
        <li><strong>Sanctions CNIL :</strong> Jusqu'à 20M€ ou 4% du CA mondial</li>
        <li><strong>Actions individuelles :</strong> Dommages et intérêts pour les victimes</li>
        <li><strong>Actions collectives :</strong> Class action possible</li>
        <li><strong>Réputation :</strong> Impact médiatique majeur</li>
      </ul>
      
      <p><strong>🛡️ DÉFENSE JURIDIQUE :</strong></p>
      <p>Pour limiter notre responsabilité, nous devons prouver :</p>
      <ul>
        <li>✅ Mesures de sécurité appropriées en place (à documenter)</li>
        <li>✅ Réaction rapide et coordonnée</li>
        <li>✅ Respect scrupuleux des procédures</li>
        <li>✅ Communication transparente avec la CNIL</li>
      </ul>
      
      <p><strong>📎 DOCUMENTS JOINTS :</strong></p>
      <ul>
        <li>Guide CNIL : Réagir en cas de violation de données</li>
        <li>Template de notification CNIL</li>
        <li>Checklist conformité RGPD</li>
      </ul>
      
      <p>Je reste disponible H24 pour toute question juridique.</p>
      
      <p>Isabelle MOREL<br>
      Conseillère Juridique<br>
      Direction des Affaires Juridiques<br>
      Université des Antilles<br>
      isabelle.morel@univ-antilles.fr<br>
      +590 (0)5 90 48 31 47</p>
    `,
    unread: false,
    urgent: false,
    attachments: 1,
    attachmentNames: ["guide_rgpd_incident.pdf"],
  },
  msg9: {
    id: "msg9",
    from: "Patricia LEROY",
    role: "Directrice Communication",
    avatar: "📢",
    time: "03:10:15",
    subject: "Gestion de crise - Communication externe",
    preview:
      "Marc, nous devons préparer un plan de communication. Si les médias apprennent l'intrusion avant que nous ne communiquions officiellement, ce sera un désastre...",
    content: `
      <p>Marc,</p>
      <p>Je viens d'apprendre l'incident de sécurité. <strong>Nous devons préparer immédiatement un plan de communication de crise.</strong></p>
      
      <p><strong>📰 RISQUE MÉDIATIQUE :</strong></p>
      <ul>
        <li>Si les médias l'apprennent avant nous → Perte de contrôle du narratif</li>
        <li>Risque de panique chez les étudiants et le personnel</li>
        <li>Impact sur la réputation de l'université</li>
        <li>Conséquences sur les inscriptions futures</li>
      </ul>
      
      <p><strong>📋 PLAN DE COMMUNICATION PROPOSÉ :</strong></p>
      
      <p><strong>PHASE 1 - Communication interne (MAINTENANT) :</strong></p>
      <ul>
        <li>✅ Note au Président et au Conseil d'Administration</li>
        <li>⏳ Email aux responsables de services (dès que possible)</li>
        <li>⏳ Réunion de crise avec les acteurs clés (en cours)</li>
      </ul>
      
      <p><strong>PHASE 2 - Communication réglementaire (0-72h) :</strong></p>
      <ul>
        <li>Notification CNIL (Marie s'en occupe)</li>
        <li>Déclaration au Ministère de l'Enseignement Supérieur</li>
        <li>Information au Rectorat</li>
      </ul>
      
      <p><strong>PHASE 3 - Communication aux personnes concernées (Dès que confirmé) :</strong></p>
      <ul>
        <li><strong>Email personnalisé</strong> aux 14,090 personnes concernées</li>
        <li>Contenu : nature de l'incident, données potentiellement affectées, mesures prises</li>
        <li>Hotline dédiée pour répondre aux questions</li>
        <li>FAQ sur le site web de l'université</li>
      </ul>
      
      <p><strong>PHASE 4 - Communication publique (Si nécessaire) :</strong></p>
      <ul>
        <li>Communiqué de presse officiel</li>
        <li>Conférence de presse (Président + Directeur DSIN)</li>
        <li>Publication sur les réseaux sociaux</li>
      </ul>
      
      <p><strong>💬 MESSAGES CLÉS À PORTER :</strong></p>
      <ul>
        <li>✅ "Nous avons détecté l'incident rapidement"</li>
        <li>✅ "Nos équipes techniques travaillent 24/7"</li>
        <li>✅ "La sécurité de nos données est notre priorité"</li>
        <li>✅ "Nous avons immédiatement isolé les systèmes"</li>
        <li>✅ "Les autorités ont été informées"</li>
        <li>❌ Éviter : "Piratage", "Vol de données" → Utiliser "Incident de sécurité", "Accès non autorisé"</li>
      </ul>
      
      <p><strong>🎯 DOCUMENTS EN PRÉPARATION :</strong></p>
      <ul>
        <li>Communiqué de presse (brouillon prêt)</li>
        <li>FAQ pour les étudiants et le personnel</li>
        <li>Script pour la hotline</li>
        <li>Messages pour les réseaux sociaux</li>
      </ul>
      
      <p><strong>⚠️ ATTENTION :</strong></p>
      <p>Chaque communication doit être validée par :</p>
      <ul>
        <li>Le service juridique (Isabelle)</li>
        <li>La DPO (Marie)</li>
        <li>La Direction (Président Desrosiers)</li>
        <li>La DSIN (toi, Marc)</li>
      </ul>
      
      <p>Je propose qu'on se coordonne dès la fin de votre réunion de crise. Je suis disponible toute la nuit si besoin.</p>
      
      <p>Patricia LEROY<br>
      Directrice de la Communication<br>
      Université des Antilles<br>
      patricia.leroy@univ-antilles.fr<br>
      Mobile : +590 (0)6 90 52 14 38</p>
    `,
    unread: false,
    urgent: false,
    attachments: 0,
  },
  msg10: {
    id: "msg10",
    from: "Pr. Alain DESROSIERS",
    role: "Président de l'Université",
    avatar: "🎓",
    time: "03:08:42",
    subject: "Demande de rapport complet sur l'incident",
    preview:
      "Marc, je viens d'être réveillé par l'alerte sécurité. Quelle est l'ampleur de l'incident ? Combien de systèmes sont touchés ? Risque-t-on une fuite de données personnelles ?...",
    content: `
      <p>Marc,</p>
      <p>Je viens d'être réveillé par l'alerte sécurité. La situation semble extrêmement grave.</p>
      
      <p><strong>J'AI BESOIN DE RÉPONSES IMMÉDIATES :</strong></p>
      <ul>
        <li>Quelle est l'ampleur exacte de l'incident ?</li>
        <li>Combien de systèmes sont compromis ?</li>
        <li>Risque-t-on une fuite de données personnelles ?</li>
        <li>Les données des étudiants et du personnel sont-elles en danger ?</li>
        <li>Quelles mesures avez-vous prises ?</li>
        <li>Avons-nous identifié l'origine de l'attaque ?</li>
        <li>Quand pourrons-nous reprendre une activité normale ?</li>
      </ul>
      
      <p><strong>CONTEXTE :</strong></p>
      <p>J'ai une réunion exceptionnelle du Conseil d'Administration prévue à 9h ce matin. Ils vont me demander des comptes. J'ai besoin d'un <strong>rapport complet et détaillé d'ici 1 heure maximum</strong>.</p>
      
      <p><strong>ÉLÉMENTS REQUIS DANS LE RAPPORT :</strong></p>
      <ol>
        <li><strong>Résumé exécutif</strong> (1 page) : Ce qui s'est passé, quand, impact</li>
        <li><strong>Chronologie détaillée</strong> : Heure par heure</li>
        <li><strong>Systèmes affectés</strong> : Liste complète avec niveau de compromission</li>
        <li><strong>Données concernées</strong> : Typologie et nombre de personnes</li>
        <li><strong>Actions entreprises</strong> : Technique, juridique, communication</li>
        <li><strong>Plan d'action</strong> : Court terme (24h), moyen terme (1 semaine)</li>
        <li><strong>Besoins</strong> : Ressources humaines, financières, externes</li>
      </ol>
      
      <p><strong>⚠️ PRÉOCCUPATIONS MAJEURES :</strong></p>
      
      <p><strong>1. Réputation :</strong></p>
      <ul>
        <li>L'Université des Antilles est une institution de référence dans les Caraïbes</li>
        <li>Un incident de cette ampleur peut détruire des années de travail</li>
        <li>Impact sur les partenariats internationaux</li>
        <li>Conséquences sur les inscriptions et le recrutement</li>
      </ul>
      
      <p><strong>2. Responsabilité :</strong></p>
      <ul>
        <li>Ma responsabilité personnelle est engagée</li>
        <li>Le Conseil peut exiger des démissions</li>
        <li>Risques de poursuites judiciaires</li>
      </ul>
      
      <p><strong>3. Opérationnel :</strong></p>
      <ul>
        <li>Pouvons-nous continuer les cours lundi ?</li>
        <li>Les examens prévus cette semaine sont-ils maintenus ?</li>
        <li>Le système de notes est-il affecté ?</li>
      </ul>
      
      <p><strong>4. Financier :</strong></p>
      <ul>
        <li>Coût de la restauration des systèmes</li>
        <li>Sanctions CNIL potentielles (millions d'euros)</li>
        <li>Dommages et intérêts aux victimes</li>
        <li>Budget disponible : limité en cette période</li>
      </ul>
      
      <p><strong>DÉCISIONS À PRENDRE :</strong></p>
      <ul>
        <li>Fermeture temporaire des systèmes informatiques ?</li>
        <li>Report des examens ?</li>
        <li>Communication publique ou attendre ?</li>
        <li>Dépôt de plainte pénale ?</li>
        <li>Appel à des experts externes (ANSSI, cabinet spécialisé) ?</li>
      </ul>
      
      <p>Marc, je compte sur toi et ton équipe. La situation est grave mais je sais que vous faites le maximum. Tenez-moi informé en temps réel.</p>
      
      <p><strong>Rapport attendu pour 04:15 MAXIMUM.</strong></p>
      
      <p>Pr. Alain DESROSIERS<br>
      Président<br>
      Université des Antilles<br>
      president@univ-antilles.fr<br>
      Mobile : +590 (0)6 90 71 22 85</p>
    `,
    unread: false,
    urgent: true,
    attachments: 0,
  },
  msg11: {
    id: "msg11",
    from: "Lucas MOREAU",
    role: "Stagiaire Cybersécurité",
    avatar: "👨‍🎓",
    time: "03:05:33",
    subject: "J'ai trouvé quelque chose de bizarre dans les logs...",
    preview:
      "Bonjour, je faisais ma veille de nuit sur les logs système et j'ai remarqué des connexions SSH très étranges depuis une IP externe vers UA-SSO-01...",
    content: `
      <p>Bonjour l'équipe,</p>
      <p>Je suis Lucas, le stagiaire en cybersécurité (vous vous souvenez, j'ai commencé il y a 2 semaines).</p>
      
      <p>Je faisais ma veille de nuit sur les logs système comme Sophie me l'a demandé, et <strong>j'ai remarqué quelque chose de très bizarre</strong>...</p>
      
      <p><strong>🔍 CE QUE J'AI VU :</strong></p>
      
      <p><strong>1. Connexions SSH suspectes :</strong></p>
      <ul>
        <li>Vers 02:47, j'ai vu des tentatives de connexion SSH répétées sur le serveur UA-SSO-01</li>
        <li>L'IP source : 198.51.100.247 (je l'ai notée)</li>
        <li>Comportement bizarre : Les tentatives étaient très rapides, comme un script automatisé</li>
        <li>Puis vers 03:02, une connexion a réussi... avec le compte root !</li>
      </ul>
      
      <p><strong>2. Processus mystérieux :</strong></p>
      <ul>
        <li>En regardant la liste des processus avec <code>top</code>, j'ai vu un truc louche</li>
        <li>Un processus nommé ".lumen" (avec un point devant, donc caché)</li>
        <li>Il consommait beaucoup de ressources : 1.2GB de RAM !</li>
        <li>Emplacement : /usr/bin/.lumen/core</li>
        <li>Lancé par : root (mais personne n'était censé être connecté en root...)</li>
      </ul>
      
      <p><strong>3. Trafic réseau anormal :</strong></p>
      <ul>
        <li>J'ai lancé <code>iftop</code> pour voir le trafic réseau</li>
        <li>Grosse quantité de données sortantes vers une adresse bizarre</li>
        <li>Genre 200-300 Mbps en continu</li>
        <li>Destination : Une adresse en .onion (réseau TOR je crois ?)</li>
      </ul>
      
      <p><strong>❓ MES QUESTIONS :</strong></p>
      <ul>
        <li>C'est normal tout ça ? Ça me paraît vraiment suspect...</li>
        <li>Qu'est-ce que je devrais faire ?</li>
        <li>J'ai pris des screenshots, je les garde ?</li>
        <li>Est-ce que je dois bloquer quelque chose ?</li>
      </ul>
      
      <p><strong>⚠️ AUTRE TRUC BIZARRE :</strong></p>
      <p>Quand j'ai essayé d'ouvrir les fichiers de logs pour investiguer plus en détail, certains fichiers étaient illisibles. Genre du charabia complet, comme si ils avaient été cryptés ou corrompus.</p>
      
      <p>Fichiers affectés :</p>
      <ul>
        <li>/var/log/Messagerie.txt</li>
        <li>/var/log/Pare-feu.txt</li>
        <li>/var/log/Réseaux.txt</li>
        <li>/var/log/Sauvegarde.txt</li>
        <li>/var/log/Serveur-Web.txt</li>
        <li>/var/log/VPN.txt</li>
      </ul>
      
      <p>Je me dis que c'est peut-être lié ? Ou alors c'est juste moi qui panique pour rien ?</p>
      
      <p><strong>🙋 JE RESTE DISPONIBLE :</strong></p>
      <p>Je suis encore au bureau (bon, c'est mon coin stagiaire dans le SOC). Si vous avez besoin que je fasse des vérifications supplémentaires ou que je récupère des infos, n'hésitez pas à me dire. Je suis hyper motivé pour aider !</p>
      
      <p>C'est la première fois que je vis un vrai incident de sécurité. C'est stressant mais aussi hyper formateur !</p>
      
      <p>Désolé si j'ai fait des bêtises ou si j'ai touché à des trucs que je n'aurais pas dû. Dites-moi et je corrigerai.</p>
      
      <p>Lucas MOREAU<br>
      Stagiaire Cybersécurité (M2 CYBER)<br>
      Centre SOC - DSIN<br>
      lucas.moreau@etu.univ-antilles.fr<br>
      Mobile : +590 (0)6 90 84 52 17</p>
      
      <p><em>P.S. : J'espère que c'est pas grave et que je me suis juste fait des films... Mais au cas où, je préfère vous prévenir !</em></p>
    `,
    unread: false,
    urgent: false,
    attachments: 0,
  },
  msg12: {
    id: "msg12",
    from: "Christophe JEAN",
    role: "Ingénieur Sécurité Senior",
    avatar: "👨‍💻",
    time: "03:35:12",
    subject: "URGENT - Dispositif localisé - Ne pas ignorer",
    preview:
      "Je ne peux pas en dire plus ici. J'ai trouvé quelque chose... le dispositif dont ils parlaient. Celui qui pourrait tout arrêter. Emplacement et commandes d'activation dans le lien...",
    content: `
      <p style="color: rgba(255, 255, 255, 0.9); line-height: 1.6;">Jean-Michel,</p>
      
      <p style="opacity: 0.95;">Je ne sais pas trop par où commencer... et je ne suis pas sûr de pouvoir tout expliquer ici.</p>
      
      <p><strong style="color: var(--warning);">J'ai trouvé quelque chose.</strong></p>
      
      <p style="opacity: 0.9;">En fouillant dans les anciennes archives du laboratoire, je suis tombé sur des documents... des choses qu'on avait tous oubliées. Un <strong style="color: var(--pink);">dispositif</strong>. Quelque chose de physique, développé il y a plusieurs années.</p>
      
      <p style="opacity: 0.9;">Apparemment, l'équipe de recherche en IA avait anticipé certains... <em>scénarios</em>. Des situations où leurs créations pourraient devenir... incontrôlables.</p>
      
      <p style="background: rgba(9, 199, 223, 0.08); padding: 14px; border-left: 3px solid var(--blue); border-radius: 6px; opacity: 0.95;">
        Ils avaient construit une sorte de <strong>mécanisme de sécurité</strong>. Je ne connais pas tous les détails techniques, mais les documents mentionnent un emplacement précis... et une séquence de commandes pour l'activer.
      </p>
      
      <p style="opacity: 0.9;">Le dispositif est toujours là, quelque part dans les installations. Mais je ne peux pas te donner plus de détails par ce canal. Tu comprendras pourquoi.</p>
      
      <p><strong style="color: var(--pink);">L'emplacement et les commandes d'activation se trouvent ici :</strong></p>
      
      <div style="background: rgba(252, 16, 202, 0.12); border: 2px solid rgba(252, 16, 202, 0.4); border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
        <p style="margin: 0 0 18px 0; font-size: 16px; color: var(--text); opacity: 0.95;">
          <strong>📍 LOCALISATION & ACTIVATION DU DISPOSITIF</strong>
        </p>
        <p style="margin: 0 0 20px 0; font-size: 13px; color: rgba(255, 255, 255, 0.7); opacity: 0.9;">
          Emplacement exact • Commandes d'activation • Procédure complète
        </p>
         <a href="${ENV.DISPOSITIF_URL}" target="_blank" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, rgba(252, 16, 202, 0.85), rgba(9, 199, 223, 0.85)); border: none; border-radius: 10px; color: white; font-weight: 700; font-size: 16px; text-decoration: none; box-shadow: 0 8px 24px rgba(252, 16, 202, 0.4); text-transform: uppercase; letter-spacing: 1.2px; transition: all 0.3s ease;">
           📍 LOCALISER LE DISPOSITIF
         </a>
        <p style="margin: 16px 0 0 0; font-size: 11px; color: rgba(255, 255, 255, 0.5); opacity: 0.8;">
          Coordonnées • Codes d'accès • Séquence d'activation
        </p>
      </div>
      
      <p style="opacity: 0.9;">Les informations sont hébergées sur un serveur externe. C'était le seul moyen de les partager sans... <em>interférence</em>.</p>
      
      <p style="opacity: 0.9;">Je ne sais pas si c'est ce que tu cherches, mais au vu de la situation actuelle, ça pourrait être notre meilleure option.</p>
      
      <p style="color: rgba(255, 255, 255, 0.7); font-size: 14px; opacity: 0.85; font-style: italic;">
        Sois prudent avec ces informations. Je ne sais pas qui d'autre pourrait y avoir accès.
      </p>
      
      <p style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
        <strong>Christophe JEAN</strong><br>
        <span style="font-size: 13px; color: rgba(255, 255, 255, 0.6); opacity: 0.9;">
          Ingénieur Sécurité Senior<br>
          DSIN - Université des Antilles
        </span>
      </p>
      
      <div style="margin-top: 20px; padding: 12px; background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(9, 199, 223, 0.3); border-radius: 8px; font-family: 'Courier New', monospace; font-size: 11px; color: rgba(9, 199, 223, 0.8); opacity: 0.85;">
        <p style="margin: 0;">
          [INFO] Message envoyé via connexion sécurisée<br>
          [STATUS] Chiffrement actif : AES-256<br>
          [TRACE] Session anonymisée
        </p>
      </div>
    `,
    unread: true,
    urgent: true,
    attachments: 0,
  },
};

function renderMessagerieContent() {
  return `
    <div class="messagerie-layout-fullwidth">
      <!-- Liste des messages à gauche -->
      <div class="messagerie-list-panel">
        <div class="messagerie-list-header">
          <p class="eyebrow">📬 Boîte de réception</p>
          <h3>Messages récents</h3>
        </div>
        <div class="email-list">
          ${renderEmailList()}
        </div>
      </div>

      <!-- Contenu du message à droite -->
      <div class="messagerie-content-panel">
        <div id="email-content-area">
          <div class="messagerie-empty-state">
            <div style="text-align: center; padding: 60px 20px;">
              <div style="font-size: 64px; margin-bottom: 20px;">📧</div>
              <h3>Sélectionnez un message</h3>
              <p class="muted">Cliquez sur un message dans la liste pour afficher son contenu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Générer la liste des messages
function renderEmailList() {
  const messages = Object.values(messagesData);
  // Trier par heure décroissante (plus récent en premier)
  messages.sort((a, b) => {
    return b.time.localeCompare(a.time);
  });

  return messages
    .map(
      (msg) => `
    <div class="email-item-compact ${msg.unread ? "unread" : "read"} ${msg.urgent ? "urgent" : ""}" 
         data-message-id="${msg.id}" 
         onclick="showEmailContent('${msg.id}')">
      <div class="email-compact-header">
        <div class="email-compact-from">
          <div class="email-avatar-small">${msg.avatar}</div>
          <div class="email-compact-info">
            <strong>${msg.from}</strong>
            <span class="email-compact-time">${msg.time}</span>
          </div>
        </div>
        ${msg.urgent ? '<span class="pill pill-danger pill-tiny">URGENT</span>' : ""}
      </div>
      <div class="email-compact-subject">${msg.subject}</div>
      <div class="email-compact-preview">${msg.preview}</div>
    </div>
  `
    )
    .join("");
}

// Afficher le contenu d'un message
function showEmailContent(messageId) {
  const message = messagesData[messageId];
  if (!message) return;

  // Retirer la classe active de tous les messages
  document.querySelectorAll(".email-item-compact").forEach((item) => {
    item.classList.remove("active");
  });

  // Marquer le message comme lu et actif visuellement
  const emailItem = document.querySelector(`[data-message-id="${messageId}"]`);
  if (emailItem) {
    emailItem.classList.remove("unread");
    emailItem.classList.add("read", "active");
  }

  // Générer le contenu HTML
  const contentHTML = `
    <div class="email-full-content">
      <div class="email-full-header">
        <div class="email-full-from">
          <div class="email-avatar">${message.avatar}</div>
          <div class="email-sender-details">
            <strong>${message.from}</strong>
            <span class="email-role">${message.role}</span>
          </div>
        </div>
        <div class="email-full-meta">
          ${message.urgent ? '<span class="pill pill-danger">URGENT</span>' : ""}
          <span class="email-time">${message.time}</span>
        </div>
      </div>

      <div class="email-full-subject">
        <h3>${message.subject}</h3>
      </div>

      <div class="email-full-body">
        ${message.content}
      </div>

      ${
        message.attachments > 0
          ? `
        <div class="email-attachments">
          <p class="eyebrow">📎 Pièces jointes (${message.attachments})</p>
          <div class="attachment-list">
            ${message.attachmentNames
              .map(
                (name) => `
              <div class="attachment-item">
                <span class="attachment-icon">📄</span>
                <span class="attachment-name">${name}</span>
                <button class="ghost small">Télécharger</button>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `
          : ""
      }

      <div class="email-actions-full">
        <button class="ghost">↩️ Répondre</button>
        <button class="ghost">↪️ Transférer</button>
        <button class="ghost">🗑️ Supprimer</button>
        <button class="ghost">📋 Archiver</button>
      </div>
    </div>
  `;

  // Injecter le contenu
  const contentArea = document.getElementById("email-content-area");
  if (contentArea) {
    // Réinitialiser complètement le contenu
    contentArea.innerHTML = contentHTML;

    // Forcer le scroll vers le haut immédiatement
    const contentPanel = contentArea.closest(".messagerie-content-panel");
    if (contentPanel) {
      contentPanel.scrollTop = 0;
    }

    // Double vérification avec requestAnimationFrame
    requestAnimationFrame(() => {
      if (contentPanel) {
        contentPanel.scrollTop = 0;
      }
    });
  }
}

// Initialiser la messagerie (appelé après le rendu)
function initMessagerieContent() {
  // Trier les messages par heure décroissante
  const messages = Object.values(messagesData);
  messages.sort((a, b) => b.time.localeCompare(a.time));

  // Sélectionner automatiquement le premier message non lu (le plus récent)
  const firstUnread = messages.find((msg) => msg.unread);
  if (firstUnread) {
    setTimeout(() => showEmailContent(firstUnread.id), 100);
  }
}
