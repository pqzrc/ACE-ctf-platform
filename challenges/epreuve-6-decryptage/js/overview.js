// Contenu de la page Vue d'ensemble - État général du système
function renderOverviewContent() {
  return `
    <article class="card alert-danger full-width">
      <p class="eyebrow">🚨 DÉFAILLANCES MULTIPLES CRITIQUES</p>
      <h3>ÉTAT D'URGENCE — SYSTÈMES DÉFAILLANTS</h3>
      <p class="muted">Défaillances majeures détectées sur l'ensemble de l'infrastructure. Consultation immédiate des logs requise pour analyse forensique.</p>
      <div class="status-metrics">
        <div class="metric">
          <span class="metric-value danger">17</span>
          <span class="metric-label">Alertes critiques</span>
        </div>
        <div class="metric">
          <span class="metric-value danger">8</span>
          <span class="metric-label">Systèmes affectés</span>
        </div>
        <div class="metric">
          <span class="metric-value warning">6</span>
          <span class="metric-label">Fichiers logs cryptés</span>
        </div>
      </div>
    </article>

    <article class="card alert-danger full-width">
      <p class="eyebrow">🔒 ALERTE JOURNALISATION</p>
      <h3>FICHIER LOGS RÉSEAUX CRYPTÉ - INTRUSION DÉTECTÉE</h3>
      <p class="muted"><strong style="color: var(--error);">URGENT :</strong> Le fichier de logs RÉSEAUX contient des informations critiques sur l'intrusion L.U.M.E.N. mais a été crypté.</p>
      <div class="alert-actions">
        <span class="pill pill-danger">🌐 Logs RÉSEAUX cryptés</span>
        <span class="pill pill-danger">ROT13</span>
        <span class="pill pill-warning">⚠️ ALLER À LA SECTION LOGS</span>
        <span class="pill pill-warning">🔍 CHERCHER FICHIER RÉSEAUX</span>
      </div>
    </article>

    <article class="card status-card critical">
      <div class="status-header">
        <div class="status-icon critical">⚠️</div>
        <div>
          <p class="eyebrow">STATUT GLOBAL</p>
          <h3>INCIDENT MAJEUR EN COURS</h3>
        </div>
      </div>
      <p class="muted">Intrusion IA hostile L.U.M.E.N. — Multiples vecteurs d'attaque actifs — Exfiltration de données en cours</p>
      <div class="status-metrics">
        <div class="metric">
          <span class="metric-value danger">4</span>
          <span class="metric-label">Serveurs compromis</span>
        </div>
        <div class="metric">
          <span class="metric-value danger">12,847</span>
          <span class="metric-label">Données menacées</span>
        </div>
        <div class="metric">
          <span class="metric-value warning">02:47:33</span>
          <span class="metric-label">Avant divulgation</span>
        </div>
      </div>
    </article>

    <article class="card">
      <p class="eyebrow">Infrastructures</p>
      <h3>État des systèmes</h3>
      <div class="systems-grid">
        <div class="system-card danger">
          <div class="system-header">
            <span class="system-icon">🖥️</span>
            <span class="pill pill-danger">CRITIQUE</span>
          </div>
          <strong>Serveurs</strong>
          <p class="system-stat">4/7 compromis</p>
        </div>
        <div class="system-card danger">
          <div class="system-header">
            <span class="system-icon">🌐</span>
            <span class="pill pill-danger">CRITIQUE</span>
          </div>
          <strong>Réseau</strong>
          <p class="system-stat">Logs réseau cryptés !</p>
        </div>
        <div class="system-card danger">
          <div class="system-header">
            <span class="system-icon">📋</span>
            <span class="pill pill-danger">CRYPTÉ</span>
          </div>
          <strong>Logs</strong>
          <p class="system-stat">6 fichiers cryptés</p>
        </div>
        <div class="system-card danger">
          <div class="system-header">
            <span class="system-icon">🔐</span>
            <span class="pill pill-danger">COMPROMIS</span>
          </div>
          <strong>Sécurité</strong>
          <p class="system-stat">Périmètre rompu</p>
        </div>
        <div class="system-card warning">
          <div class="system-header">
            <span class="system-icon">💾</span>
            <span class="pill pill-warning">ALERTE</span>
          </div>
          <strong>Backups</strong>
          <p class="system-stat">2/3 chiffrés</p>
        </div>
        <div class="system-card danger">
          <div class="system-header">
            <span class="system-icon">👤</span>
            <span class="pill pill-danger">CRITIQUE</span>
          </div>
          <strong>Identités</strong>
          <p class="system-stat">Session root piratée</p>
        </div>
      </div>
    </article>

    <article class="card">
      <p class="eyebrow">Alertes récentes</p>
      <h3>Derniers événements critiques</h3>
      <div class="events-list">
        <div class="event-item critical">
          <span class="event-time">03:18:12</span>
          <span class="event-badge critical">CRITIQUE</span>
          <span class="event-text">⚠️ LOGS CRYPTÉS: /var/log/auth.log inaccessible [AES-256]</span>
        </div>
        <div class="event-item critical">
          <span class="event-time">03:17:45</span>
          <span class="event-badge critical">CRITIQUE</span>
          <span class="event-text">⚠️ LOGS CRYPTÉS: /var/log/syslog corrompu (78%)</span>
        </div>
        <div class="event-item critical">
          <span class="event-time">03:17:28</span>
          <span class="event-badge critical">CRITIQUE</span>
          <span class="event-text">Préparation notification CNIL - Violation RGPD imminente</span>
        </div>
        <div class="event-item critical">
          <span class="event-time">03:16:52</span>
          <span class="event-badge critical">CRITIQUE</span>
          <span class="event-text">⚠️ LOGS CRYPTÉS: /var/log/security.log inaccessible</span>
        </div>
        <div class="event-item critical">
          <span class="event-time">03:16:12</span>
          <span class="event-badge critical">CRITIQUE</span>
          <span class="event-text">🔐 LOGS RÉSEAU: Fichiers d'activité réseau cryptés - Intrusion détectée</span>
        </div>
        <div class="event-item warning">
          <span class="event-time">03:15:34</span>
          <span class="event-badge warning">ALERTE</span>
          <span class="event-text">Message chiffré dans syslog: [ENCRYPTED:L.U.M.E.N.]</span>
        </div>
        <div class="event-item critical">
          <span class="event-time">03:15:18</span>
          <span class="event-badge critical">CRITIQUE</span>
          <span class="event-text">⚠️ LOGS: Tentative récupération forensique ÉCHEC</span>
        </div>
        <div class="event-item critical">
          <span class="event-time">03:15:03</span>
          <span class="event-badge critical">CRITIQUE</span>
          <span class="event-text">Propagation malware sur UA-DB-PROD et UA-WEB-FRONT</span>
        </div>
        <div class="event-item critical">
          <span class="event-time">03:14:45</span>
          <span class="event-badge critical">CRITIQUE</span>
          <span class="event-text">SIEM: Escalade automatique - Multiple IOC détectés</span>
        </div>
        <div class="event-item critical">
          <span class="event-time">03:14:27</span>
          <span class="event-badge critical">CRITIQUE</span>
          <span class="event-text">DÉTECTION INITIALE: Session root non autorisée UA-SSO-01</span>
        </div>
      </div>
    </article>

    <article class="card">
      <p class="eyebrow">Indicateurs clés</p>
      <h3>Métriques critiques</h3>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-icon">🔒</div>
          <div class="metric-info">
            <span class="metric-number danger">6</span>
            <span class="metric-desc">Logs cryptés</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">⚠️</div>
          <div class="metric-info">
            <span class="metric-number danger">78%</span>
            <span class="metric-desc">Données corrompues</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">🚨</div>
          <div class="metric-info">
            <span class="metric-number danger">17</span>
            <span class="metric-desc">Alertes critiques</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">🎯</div>
          <div class="metric-info">
            <span class="metric-number warning">5</span>
            <span class="metric-desc">IOC confirmés</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">📊</div>
          <div class="metric-info">
            <span class="metric-number warning">3</span>
            <span class="metric-desc">Services injectés</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon">⏱️</div>
          <div class="metric-info">
            <span class="metric-number danger">02:47</span>
            <span class="metric-desc">Avant divulgation</span>
          </div>
        </div>
      </div>
    </article>

    <article class="card">
      <p class="eyebrow">Actions prioritaires</p>
      <h3>Tâches critiques urgentes</h3>
      <div class="priority-list">
        <div class="priority-item urgent">
          <span class="priority-badge urgent">URGENT #1</span>
          <div class="priority-content">
            <strong>🌐 TROUVER LE FICHIER LOGS RÉSEAUX</strong>
            <p class="muted">Aller dans la section LOGS → Chercher le fichier "Réseaux" → Décrypter (ROT13)</p>
          </div>
        </div>
        <div class="priority-item urgent">
          <span class="priority-badge urgent">URGENT #2</span>
          <div class="priority-content">
            <strong>🔍 ANALYSER LES LOGS RÉSEAUX</strong>
            <p class="muted">Le fichier de logs RÉSEAUX contient les détails de l'intrusion L.U.M.E.N.</p>
          </div>
        </div>
        <div class="priority-item urgent">
          <span class="priority-badge urgent">URGENT #3</span>
          <div class="priority-content">
            <strong>🔐 Décrypter les logs réseau (ROT13)</strong>
            <p class="muted">Utiliser un décodeur ROT13 pour lire le contenu du fichier Réseaux</p>
          </div>
        </div>
        <div class="priority-item urgent">
          <span class="priority-badge urgent">URGENT</span>
          <div class="priority-content">
            <strong>Bloquer exfiltration de données</strong>
            <p class="muted">IP 198.51.100.247 active — 12,847 enregistrements menacés</p>
          </div>
        </div>
        <div class="priority-item high">
          <span class="priority-badge high">HAUTE</span>
          <div class="priority-content">
            <strong>Restaurer backups</strong>
            <p class="muted">2/3 sauvegardes chiffrées par L.U.M.E.N.</p>
          </div>
        </div>
        <div class="priority-item high">
          <span class="priority-badge high">HAUTE</span>
          <div class="priority-content">
            <strong>Neutraliser processus malveillant</strong>
            <p class="muted">PID 4782 actif — /usr/bin/.lumen/core</p>
          </div>
        </div>
      </div>
    </article>

    <article class="card message-card full-width">
      <p class="eyebrow">🔍 ANALYSE CRITIQUE DE LA SITUATION</p>
      <div class="situation-analysis">
        <p><strong>Résumé de la menace :</strong> Une intelligence artificielle hostile nommée <em>L.U.M.E.N.</em> (Logiciel Unifié de Menace et d'Extraction Numérique) a infiltré les systèmes de l'Université des Antilles. L'attaquant a compromis 4 serveurs critiques, <strong style="color: var(--error);">crypté 6 fichiers de logs essentiels</strong>, et menace de divulguer des données personnelles de 12,847 étudiants et 1,243 membres du personnel.</p>
        <p><strong>État des journaux système :</strong> <span style="color: var(--error);">CRITIQUE — Le fichier de logs RÉSEAUX a été crypté</span>. Ce fichier contient les informations essentielles sur l'intrusion L.U.M.E.N.</p>
        <p><strong>Instructions :</strong> 1) Cliquez sur "Logs" dans le menu → 2) Cherchez le fichier dont le nom crypté correspond à "Réseaux" → 3) Cliquez dessus pour voir le contenu → 4) Utilisez un décodeur ROT13 en ligne pour décrypter le texte → 5) Trouvez les détails de l'intrusion dans le fichier décrypté.</p>
        <p><strong>Impact RGPD :</strong> Violation majeure en cours. Notification CNIL obligatoire sous 72h. Risque de sanctions financières importantes. Les journaux d'audit requis pour la conformité sont corrompus.</p>
        <div class="alert-actions" style="margin-top: 16px;">
          <span class="pill pill-danger">Niveau 5 — Critique</span>
          <span class="pill pill-danger">Logs cryptés</span>
          <span class="pill pill-warning">⚠️ Consulter LOGS</span>
          <span class="pill pill-warning">⚠️ Consulter AUDIT</span>
        </div>
      </div>
    </article>
  `;
}
