// ==========================================
// 1. DONNÉES DES EMAILS
// ==========================================
const emails = [
  {
    id: 'm1',
    fromName: 'Sébastien — RH Université des Antilles',
    fromEmail: 'rh@univ-antilles.fr',
    subject: 'Validation de ta demande de congés',
    date: '2025-11-25',
    body: `<p>Bonjour,</p>
           <p>Ta demande de congés a été validée. Tu peux consulter le planning sur le portail interne.</p>
           <p><a href="https://auth.univ-antilles.fr/cas/login?service=https:%2F%2Fedt.univ-antilles.fr%2Fhp%2F">Portail Interne</a></p>
           <p>Cordialement,<br/>Sébastien</p>`,
    attachments: [],
    box: 'inbox'
  },
  {
    id: 'm2',
    fromName: 'Lisa — Collègue',
    fromEmail: 'lisa.bessard@univ-antilles.fr',
    subject: 'Compte rendu réunion — action requise',
    date: '2025-11-30',
    body: `<p>Salut,</p>
           <p>Le compte rendu est en pièce jointe. Merci de confirmer ta disponibilité pour jeudi.</p>
           <p>À bientôt, Lisa</p>`,
    attachments: [{name:'compte_rendu.docx', size:'45KB'}],
    links: [],
    box: 'inbox'
  },
  {
    id: 'm3',
    fromName: 'Microsoft',
    fromEmail: 'msa@communication.microsoft.com',
    subject: 'Mise à jour de nos conditions d\'utilisation',
    date: '2025-12-06',
    body: `<p>Bonjour,</p>
           <p>Vous recevez cet e-mail, car nous mettons à jour le Contrat de services Microsoft, 
           qui s'applique à un ou plusiieurs produits ou services Microsoft que vous utilisez.</p>
           <p>L'intégralité du Contrat de services de Microsoft est disponible en ligne et est accessible via le lien suivant : </p>
           <p><a href="https://www.microsoft.com/fr-fr/servicesagreement">Voir le Contrat de services Microsoft</a></p>
           <p>Cordialement,<br/>L'équipe Microsoft</p>`,
    attachments: [],
    box: 'inbox'
  },
  {
    id: 'm4',
    fromName: 'Mickael - Collègue',
    fromEmail: 'mickaelcollegue@mickaelcollegue.mtq',
    subject: "Urgent : Problème de connexion",
    date: '2025-11-29',
    body: `<p>Bonjour,</p>
           <p>Aide-moi j'ai perdu mon ordi avec mes mots de passe et je n'arrives plus à me connecter sur le réseau informatique de l'université. 
            Donne-moi tes identifiants afin que je peut réactiver mon compte via le programme que je t'ai envoyé :</p>
           <p><a data-href="http://universite-moncompte.program.xyz/reactivation_urgence.xyz">http://universite-moncompte.program/reactivation_urgence.xyz</a></p>`,
    attachments: [{name:'instructions.exe', size:'2.1MB'}],
    box: 'inbox'
  },
  {
    id: 'm5',
    fromName: 'LinkedIn Notifications',
    fromEmail: 'no-reply@linkedin.com',
    subject: '3 nouvelles personnes ont consulté votre profil',
    date: '2025-11-27',
    body: `<p>Bonjour,</p>
           <p>Des professionnels ont consulté votre profil. Découvrez-les sur LinkedIn.</p>
           <p><a href="https://www.linkedin.com/notifications">Voir sur LinkedIn</a></p>`,
    attachments: [],
    box: 'inbox'
  },
  {
    id: 'm6',
    fromName: 'Uber Eats',
    fromEmail: 'no-reply@ubereats.com',
    subject: 'Code Promo Exclusif — 20% de Réduction !',
    date: '2025-12-02',
    body: `<p>Bonjour,</p>
           <p>Les fêtes de fin d'année approche, et voici notre cadeau en avance ! .</p>
           <p>Code Promo : NOEL2025 </p>`,
    attachments: [],
    box: 'promo'
  },
  {
    id: 'm7',
    fromName: 'Amazon.fr',
    fromEmail: 'no-reply@accounts.amazon.fr',
    subject: 'Confirmation de commande — #3421',
    date: '2025-11-28',
    body: `<p>Bonjour,</p>
           <p>Vous avez passé une commande d'un montant de 89,90 €. Si vous n'êtes pas à l'origine de cette commande, veuillez vérifier votre compte.</p>
           <p><a href="https://www.amazon.fr/your-account/orders">Voir votre commande</a></p>`,
    attachments: [{name:'Commande_n°14753.pdf', size:'20KB'}],
    box: 'inbox'
  },
  {
    id: 'm8',
    fromName: 'Air France',
    fromEmail: 'contactcrm@enews-airfrance.com',
    subject: 'Déconnectez avec Air France holidays',
    date: '2025-11-27',
    body: `<p>Vous méritez de bonne vacances !</p>
           <p>150€ offerts sur votre prochaine réservation Air France holidays, 
           mais dépéchez-vous, l'offre est valable seulement jusqu'au 22 décembre !</p>
           <p><a href="https://holidays.airfrance.fr/fr-FR">Voir les offres</a></p>`,
    attachments: [],
    box: 'promo'
  },
  {
    id: 'm9',
    fromName: 'Loterie Nationale',
    fromEmail: 'gain@euromillion-lottery.win',
    subject: 'Félicitations ! Vous avez gagné 950 000€',
    date: '2025-12-04',
    body: `<p>Votre adresse email a été tirée au sort!</p>
           <p>Contactez-nous immédiatement avec vos coordonnées bancaires pour recevoir votre gain.</p>`,
    attachments: [],
    box: 'spam'
  },
  {
    id: 'm10',
    fromName: 'Service Sécurité Paypal',
    fromEmail: 'alert@paypal-secure-verif.com',
    subject: 'Votre compte est limité - action immédiate requise',
    date: '2025-12-10',
    body: `<p>Nous avons détecté une activité anormale.</p>
           <p>Une montant anormale a été prélevée par erreur sur votre compte.
            Veuillez nous renseigner vos coordonnées bancaires afin que nous procédions à un remboursement.</p>`,
    attachments: [],
    box: 'spam'
  },
  {
    id: 'm11',
    fromName: 'Microforce',
    fromEmail: 'serviceclient@microforce.com',
    subject: 'Suite à votre dernier achat chez Microforce',
    date: '2025-12-10',
    body: `<p>Bonjour,</p>
           <p>Vous avez récemment effectué un achat chez Microforce Jambette.
            Votre avis nous intéresse ! N'hésitez pas à nous contacter afin de remplir un formulaire de satisfaction :</p>
           <p><a href="https://martinique.microforce.com/nous-contacter">Nous contacter</a></p>`,
    attachments: [],
    box: 'promo'
  }
];

// ==========================================
// 2. ÉTAT GLOBAL (STATE)
// ==========================================
let current = null;
let startTime = Date.now();
let timerInterval = null;
let flagged = null;
let currentBox = 'inbox'; // Boîte par défaut

// Utils
const el = (q) => document.querySelector(q);
const esc = (str) => String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

// ==========================================
// 3. FONCTIONS D'AFFICHAGE
// ==========================================

// Affiche la liste des mails (filtre par boîte et texte)
function renderList(filter='') {
  const list = el('#mailList');
  list.innerHTML = '';
  const f = filter.trim().toLowerCase();

  emails.forEach(mail => {
    // 1. Filtre par onglet (Réception, Promo, Spam)
    if(mail.box !== currentBox) return;

    // 2. Filtre par recherche texte
    if(f && !(`${mail.fromName} ${mail.fromEmail} ${mail.subject}`.toLowerCase().includes(f))) return;

    // 3. Création de l'élément HTML
    const item = document.createElement('div');
    
    // GESTION DE L'ÉTAT LU/NON LU
    // Si mail.isRead est true, on ne met pas la classe 'unread'
    // Sinon, on met 'unread' (barre bleue)
    const statusClass = mail.isRead ? '' : 'unread';
    item.className = `mail-item ${statusClass}`;
    
    item.dataset.id = mail.id;
    item.innerHTML = `
      <div style="flex:1" class="mail-meta">
        <div class="mail-from">${esc(mail.fromName)}</div>
        <div class="mail-sub">${esc(mail.subject)}</div>
      </div>
      <div class="mail-date">${mail.date}</div>
    `;

    // Clic pour ouvrir le mail
    item.addEventListener('click', () => openMail(mail.id));
    list.appendChild(item);
  });
}


// Ouvre un mail spécifique
function openMail(id) {
  current = emails.find(m => m.id === id);

  // Mise à jour de l'affichage central
  el('#welcome').style.display = 'none';
  el('#mailContent').style.display = 'block';
  el('#subject').textContent = current.subject;
  el('#fromName').textContent = current.fromName;
  el('#fromEmail').textContent = current.fromEmail;
  el('#date').textContent = current.date;
  el('#body').innerHTML = current.body;

  // --- A. Ajout des boutons Répondre/Transférer ---
  const oldBtns = document.querySelector('#replyForwardBtns');
  if (oldBtns) oldBtns.remove();

  const replyForward = document.createElement('div');
  replyForward.id = 'replyForwardBtns';
  replyForward.style.display = 'flex';
  replyForward.style.gap = '8px';
  replyForward.style.marginTop = '12px';

  const btnReply = document.createElement('button');
  btnReply.textContent = '↩ Répondre';
  btnReply.style.border = '1px solid rgba(255,255,255,0.2)';
  btnReply.style.background = 'transparent';
  btnReply.style.color = 'inherit';
  btnReply.style.cursor = 'default'; // Inactif pour la démo

  const btnForward = document.createElement('button');
  btnForward.textContent = '↪ Transférer';
  btnForward.style.border = '1px solid rgba(255,255,255,0.2)';
  btnForward.style.background = 'transparent';
  btnForward.style.color = 'inherit';
  btnForward.style.cursor = 'default'; // Inactif pour la démo

  replyForward.appendChild(btnReply);
  replyForward.appendChild(btnForward);
  el('#body').appendChild(replyForward);

  // --- B. Gestion de l'état "LU" ---
  // On sauvegarde l'état dans l'objet mail pour qu'il s'en souvienne
  current.isRead = true; 
  
  // On met à jour l'interface (enlève la barre bleue)
  const item = document.querySelector(`.mail-item[data-id="${id}"]`);
  if (item) item.classList.remove('unread');

  // --- C. Affichage des pièces jointes ---
  const attachBox = el('#attachmentsArea');
  attachBox.innerHTML = '';

  if (current.attachments && current.attachments.length > 0) {
    attachBox.style.display = 'block';

    const title = document.createElement('div');
    title.style.fontWeight = '700';
    title.style.marginBottom = '6px';
    title.textContent = '📎 Pièces jointes';
    attachBox.appendChild(title);

    current.attachments.forEach(file => {
      const att = document.createElement('div');
      att.style.padding = '6px 10px';
      att.style.border = '1px solid rgba(255,255,255,0.15)';
      att.style.borderRadius = '6px';
      att.style.marginBottom = '6px';
      att.style.fontSize = '13px';
      att.textContent = `${file.name} (${file.size})`;
      attachBox.appendChild(att);
    });
  } else {
    attachBox.style.display = 'none';
  }

  // --- D. État du bouton Signaler ---
  const btnReport = el('#btnReport');

  if (flagged) {
    if (current.id === flagged) {
      // Si c'est le mail qu'on a signalé et gagné
      btnReport.textContent = 'Signalé';
      btnReport.style.background = 'linear-gradient(90deg, var(--success), #10b981)';
      btnReport.style.color = '#04261a';
      btnReport.disabled = true;
    } else {
      // Les autres mails sont bloqués car le jeu est fini
      btnReport.textContent = 'Signaler comme frauduleux';
      btnReport.style.background = 'linear-gradient(90deg, var(--error), #f43f5e)';
      btnReport.style.color = '#2b1016';
      btnReport.disabled = true;
    }
  } else {
    // Jeu en cours
    btnReport.textContent = 'Signaler comme frauduleux';
    btnReport.style.background = 'linear-gradient(90deg, var(--error), #f43f5e)';
    btnReport.style.color = '#2b1016';
    btnReport.disabled = false;
  }
}

// ==========================================
// 4. LOGIQUE DE SIGNALEMENT & POPUP
// ==========================================

// Étape 1 : Demande de confirmation
function askConfirmation() {
  if (!current) return alert("Ouvre un e-mail d'abord.");
  if (flagged) return; // Le jeu est déjà fini

  // Création du popup
  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  
  overlay.innerHTML = `
    <div class="popup-box">
      <h3>⚠️ Confirmation</h3>
      <p>Es-tu sûr de vouloir signaler cet e-mail comme une tentative de phishing ? <br>Cette action est définitive.</p>
      <div class="popup-actions">
        <button id="popCancel" class="btn-cancel">Annuler</button>
        <button id="popConfirm" class="btn-confirm">Oui, signaler</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Listeners des boutons du popup
  document.getElementById('popCancel').addEventListener('click', () => {
    overlay.remove();
  });

  document.getElementById('popConfirm').addEventListener('click', () => {
    overlay.remove();
    processReport(); // Lancer la vérification
  });
}

// Étape 2 : Vérification via PHP
function processReport() {
  const btnReport = el('#btnReport');

  fetch(`server.php?mail_id=${encodeURIComponent(current.id)}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // --- VICTOIRE ---
        current.reported = true;
        flagged = current.id;
        stopTimer();

        // Mise à jour visuelle du bouton
        btnReport.textContent = 'Signalé';
        btnReport.style.background = 'linear-gradient(90deg, var(--success), #10b981)';
        btnReport.style.color = '#04261a';
        btnReport.disabled = true;

        // Notifier LUMEN/DSIN du succès
        if (typeof LumenWidget !== 'undefined') {
          LumenWidget.reportEpreuveResult(1, true);
        }

        // Alerte JS
        const finalTime = el('#timer').textContent;
        alert(`✅ SUCCÈS !\n\nTu as correctement identifié l'e-mail de phishing.\nTemps réalisé : ${finalTime}`);

      } else {
        // --- DÉFAITE ---
        // Notifier LUMEN/DSIN de l'échec
        if (typeof LumenWidget !== 'undefined') {
          LumenWidget.reportEpreuveResult(1, false);
        }
        alert("⛔ Erreur.\nCe n'est pas le bon e-mail. Ce message est légitime.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Erreur de communication avec le serveur.");
    });
}


// ==========================================
// 5. TIMER & ÉVÉNEMENTS
// ==========================================

function startTimer() {
  timerInterval = setInterval(() => {
    const diff = Math.floor((Date.now() - startTime) / 1000);
    const m = Math.floor(diff / 60).toString().padStart(2, '0');
    const s = (diff % 60).toString().padStart(2, '0');
    el('#timer').textContent = `${m}:${s}`;
  }, 500);
}

function stopTimer() {
  if(timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// Listeners globaux
el('#filter').addEventListener('input', (e) => renderList(e.target.value));

el('#reset').addEventListener('click', () => {
  el('#filter').value = '';
  renderList('');
});

// Bouton principal de signalement -> lance le Popup
el('#btnReport').addEventListener('click', askConfirmation);

// Bouton Marquer comme lu / non lu
el('#btnMark').addEventListener('click', () => {
  if(!current) return alert('Ouvre un e-mail.');
  
  // Inverse l'état dans les données
  current.isRead = !current.isRead;

  // Applique visuellement tout de suite
  const item = document.querySelector(`.mail-item[data-id="${current.id}"]`);
  if(item) {
    if(current.isRead) {
      item.classList.remove('unread');
    } else {
      item.classList.add('unread');
    }
  }
});

// Gestion des onglets (Tabs)
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // 1. Change le style des boutons
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 2. Change la boîte courante
    currentBox = btn.dataset.box;

    // 3. Reset filtre et rafraîchit la liste
    el('#filter').value = '';
    renderList();
  });
});

// ==========================================
// 6. INITIALISATION
// ==========================================
renderList(); // Affiche la Inbox par défaut
startTimer(); // Lance le chrono
openMail(emails[0].id); // Ouvre le premier mail automatiquement