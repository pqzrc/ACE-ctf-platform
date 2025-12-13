// Module de gestion des logs cryptés
// Les logs restent cryptés - à décrypter manuellement par le joueur

// État de la page des logs
let logsState = {
  files: [],
  selectedFile: null,
  selectedContent: null, // Contenu crypté
  selectedFileName: null, // Nom crypté
};

// Charger la liste des fichiers de logs
async function loadLogFiles() {
  try {
    const response = await fetch("api/logs.php?action=list");
    const data = await response.json();

    if (data.success) {
      logsState.files = data.files;
      renderLogsList();
    } else {
      console.error("Erreur lors du chargement des logs:", data.error);
    }
  } catch (error) {
    console.error("Erreur de connexion à l'API:", error);
  }
}

// Charger le contenu d'un fichier de log
async function loadLogContent(encryptedName) {
  try {
    const response = await fetch(`api/logs.php?action=read&file=${encodeURIComponent(encryptedName)}`);
    const data = await response.json();

    if (data.success) {
      logsState.selectedFile = encryptedName;
      logsState.selectedFileName = encryptedName;
      logsState.selectedContent = data.encrypted_content; // Garder le contenu crypté
      renderLogsContentViewer();
    } else {
      console.error("Erreur lors de la lecture du log:", data.error);
    }
  } catch (error) {
    console.error("Erreur de connexion à l'API:", error);
  }
}

// Afficher la liste des fichiers de logs (noms cryptés)
function renderLogsList() {
  const listContainer = document.querySelector(".logs-file-list");
  if (!listContainer) return;

  const filesHTML = logsState.files
    .map((file) => {
      const encryptedName = file.encrypted_name; // Garder le nom crypté
      const isSelected = logsState.selectedFile === file.encrypted_name;
      const sizeKB = Math.round(file.size / 1024);

      return `
      <div class="log-file-item ${isSelected ? "active" : ""}" data-file="${file.encrypted_name}">
        <div class="log-file-icon">🔐</div>
        <div class="log-file-details">
          <strong>${encryptedName}</strong>
          <p class="muted">${sizeKB} KB • ${file.modified}</p>
        </div>
      </div>
    `;
    })
    .join("");

  listContainer.innerHTML = filesHTML;

  // Ajouter les événements de clic
  const fileItems = listContainer.querySelectorAll(".log-file-item");
  fileItems.forEach((item) => {
    item.addEventListener("click", () => {
      const fileId = item.dataset.file;
      loadLogContent(fileId);
    });
  });
}

// Afficher le contenu du fichier sélectionné (crypté)
function renderLogsContentViewer() {
  const contentContainer = document.querySelector(".logs-content-viewer");
  if (!contentContainer) return;

  if (!logsState.selectedContent) {
    contentContainer.innerHTML = `
      <div class="logs-empty-state">
        <p class="eyebrow">Aucun fichier sélectionné</p>
        <h3>🔐 Sélectionnez un fichier de log</h3>
        <p class="muted">Cliquez sur un fichier dans la liste de gauche pour afficher son contenu crypté.</p>
        <div style="margin-top: 20px; padding: 16px; background: rgba(252, 16, 202, 0.1); border: 1px solid rgba(252, 16, 202, 0.3); border-radius: 10px;">
          <p class="eyebrow" style="color: var(--pink);">⚠️ AVERTISSEMENT</p>
          <p style="margin: 8px 0 0; font-size: 14px;">Les logs sont cryptés. Vous devez les décrypter pour trouver les informations cachées.</p>
        </div>
      </div>
    `;
    return;
  }

  const encryptedName = logsState.selectedFileName || "Fichier crypté";

  // Afficher le contenu crypté sans formattage spécial
  const lines = logsState.selectedContent.split("\n");
  const formattedLines = lines
    .map((line) => {
      if (!line.trim()) return '<div class="log-line-empty"></div>';

      return `
      <div class="log-line-encrypted">
        <span class="log-msg-encrypted">${escapeHtml(line)}</span>
      </div>
    `;
    })
    .join("");

  contentContainer.innerHTML = `
    <div class="logs-content-header">
      <div>
        <p class="eyebrow">Contenu crypté</p>
        <h3>🔐 ${encryptedName}</h3>
      </div>
      <button class="ghost" onclick="downloadLogFile()">⬇️ Télécharger</button>
    </div>
    <div class="logs-viewer logs-encrypted">
      ${formattedLines}
    </div>
  `;
}

// Télécharger le fichier de log (crypté)
function downloadLogFile() {
  if (!logsState.selectedContent) return;

  const filename = logsState.selectedFileName ? logsState.selectedFileName + "_encrypted.txt" : "log_encrypted.txt";

  const blob = new Blob([logsState.selectedContent], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// Fonction utilitaire pour échapper le HTML
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Rendu du contenu de la section Logs
function renderLogsContent() {
  return `
    <div class="logs-layout">
      <div class="logs-sidebar">
        <div class="logs-sidebar-header">
          <p class="eyebrow">Fichiers de logs</p>
          <h3>🔐 Système de logs cryptés</h3>
          <p class="muted">Décryptage manuel requis</p>
        </div>
        <div class="logs-file-list">
          <p class="muted" style="text-align: center; padding: 20px;">Chargement des fichiers...</p>
        </div>
      </div>
      <div class="logs-main">
        <div class="logs-content-viewer">
          <div class="logs-empty-state">
            <p class="eyebrow">Aucun fichier sélectionné</p>
            <h3>📋 Sélectionnez un fichier de log</h3>
            <p class="muted">Cliquez sur un fichier dans la liste de gauche pour afficher son contenu.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Initialiser la page des logs
function initLogsPage() {
  loadLogFiles();
}
