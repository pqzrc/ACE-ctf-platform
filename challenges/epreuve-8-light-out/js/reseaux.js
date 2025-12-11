// Section Réseaux - Épreuve de rétablissement du réseau

function renderReseauxContent() {
  return `
    <div class="network-layout">
      <div class="network-storage-panel">
        <div class="network-storage-header">
          <p class="eyebrow">Rétablissement du réseau</p>
          <h3>🌐 Zone de Stockage</h3>
          <p class="muted">Commandes réseau disponibles</p>
        </div>
        <div class="network-storage-area" id="workspace-container">
          <ul id="workspace">
            <li class="command-item" draggable="true" data-cmd-id="fake1">ls -la /var/www/html</li>
            <li class="command-item" draggable="true" data-cmd-id="fake2">cat /etc/passwd</li>
            <li class="command-item" draggable="true" data-cmd-id="fake3">sudo ufw status</li>
            <li class="command-item" draggable="true" data-cmd-id="fake4">traceroute 8.8.8.8</li>
            <li class="command-item" draggable="true" data-cmd-id="fake5">whoami</li>

            <li class="command-item" draggable="true" data-cmd-id="cmd42">ip addr flush dev eth0</li>
            <li class="command-item" draggable="true" data-cmd-id="cmd88">sudo systemctl start networking</li>
            <li class="command-item" draggable="true" data-cmd-id="cmd15">sudo systemctl stop NetworkManager</li>
            <li class="command-item" draggable="true" data-cmd-id="cmd67">ip route add default via 192.168.1.1</li>
            <li class="command-item" draggable="true" data-cmd-id="cmd23">sudo systemctl stop networking</li>
            <li class="command-item" draggable="true" data-cmd-id="cmd51">ip addr add 192.168.1.50/24 dev eth0</li>
            <li class="command-item" draggable="true" data-cmd-id="cmd99">ping -c 4 google.com</li>
            <li class="command-item" draggable="true" data-cmd-id="cmd34">ip link set eth0 down</li>
            <li class="command-item" draggable="true" data-cmd-id="cmd76">echo "nameserver 1.1.1.1" > /etc/resolv.conf</li>
            <li class="command-item" draggable="true" data-cmd-id="cmd58">ip link set eth0 up</li>
          </ul>
        </div>
      </div>

      <div class="network-sequence-panel">
        <div class="network-sequence-content">
          <div class="network-sequence-header">
            <div>
              <p class="eyebrow">Séquence de configuration</p>
              <h3>🔧 Zone de Séquence</h3>
            </div>
            <button class="primary" onclick="sendSequence()">▶️ Exécuter la séquence</button>
          </div>
          <div class="network-sequence-area">
            <div class="network-instructions">
              <p>📋 <strong>Instructions :</strong> Glissez-déposez les <strong>10 commandes correctes</strong> dans l'ordre logique pour rétablir le réseau.</p>
            </div>
            <ul id="command-list" class="network-command-list">
              <!-- Les commandes seront déposées ici -->
            </ul>
            <div id="result-message" class="network-result"></div>
          </div>
        </div>
      </div>
    </div>
   `;
}

// Logique de drag & drop
let draggedItem = null;

// Initialisation de l'épreuve réseau
function initReseauxGame() {
  const workspace = document.getElementById("workspace");
  const commandList = document.getElementById("command-list");

  if (!workspace || !commandList) return;

  // Initialisation : Dispersion aléatoire
  const items = workspace.querySelectorAll(".command-item");
  const workspaceContainer = document.getElementById("workspace-container");
  const maxX = workspaceContainer ? workspaceContainer.offsetWidth - 300 : workspace.offsetWidth - 300;
  const maxY = workspaceContainer ? workspaceContainer.offsetHeight - 80 : workspace.offsetHeight - 80;

  items.forEach((item) => {
    const randomTop = Math.floor(Math.random() * Math.max(0, maxY));
    const randomLeft = Math.floor(Math.random() * Math.max(0, maxX));

    item.style.top = `${Math.max(10, randomTop)}px`;
    item.style.left = `${Math.max(10, randomLeft)}px`;
    item.style.position = "absolute";

    addDnDHandlers(item);
  });

  // Ajouter les handlers pour les zones
  [workspace, commandList, workspaceContainer].forEach((zone) => {
    if (zone) {
      zone.addEventListener("dragover", handleDragOverZone);
      zone.addEventListener("drop", handleDropZone);
    }
  });

  // Tri (Reordering) dans la liste de droite
  commandList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(commandList, e.clientY);
    if (draggedItem && draggedItem.parentNode === commandList) {
      if (afterElement == null) {
        commandList.appendChild(draggedItem);
      } else {
        commandList.insertBefore(draggedItem, afterElement);
      }
    }
  });
}

function addDnDHandlers(item) {
  item.addEventListener("dragstart", handleDragStart);
  item.addEventListener("dragend", handleDragEnd);
}

function handleDragStart(e) {
  draggedItem = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", "");
  setTimeout(() => this.classList.add("dragging"), 0);
}

function handleDragEnd(e) {
  this.classList.remove("dragging");
  draggedItem = null;
}

function handleDragOverZone(e) {
  e.preventDefault();
}

function handleDropZone(e) {
  e.preventDefault();
  if (!draggedItem) return;

  const workspace = document.getElementById("workspace");
  const commandList = document.getElementById("command-list");

  if (this.id === "workspace" || this.id === "workspace-container") {
    // Calculer la position relative au workspace
    const workspaceRect = workspace.getBoundingClientRect();
    let x = e.clientX - workspaceRect.left - draggedItem.offsetWidth / 2;
    let y = e.clientY - workspaceRect.top - draggedItem.offsetHeight / 2;

    // Limiter les positions pour que l'élément reste visible
    const maxX = workspace.offsetWidth - draggedItem.offsetWidth - 10;
    const maxY = workspace.offsetHeight - draggedItem.offsetHeight - 10;

    x = Math.max(10, Math.min(x, maxX));
    y = Math.max(10, Math.min(y, maxY));

    workspace.appendChild(draggedItem);
    draggedItem.style.position = "absolute";
    draggedItem.style.left = `${x}px`;
    draggedItem.style.top = `${y}px`;
  } else if (this.id === "command-list") {
    this.appendChild(draggedItem);
    draggedItem.style.position = "static";
    draggedItem.style.left = "";
    draggedItem.style.top = "";
    draggedItem.style.transform = "";
  }
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".command-item:not(.dragging)")];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// Vérification et Pop-up (avec vérification serveur)
async function sendSequence() {
  const commandList = document.getElementById("command-list");
  const resultMessage = document.getElementById("result-message");

  const sequence = Array.from(commandList.children)
    .map((item) => item.dataset.cmdId)
    .join(",");

  resultMessage.textContent = "Analyse de la configuration...";
  resultMessage.className = "";

  try {
    // Envoyer la séquence au serveur pour vérification
    const response = await fetch("api/verify_sequence.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sequence: sequence,
      }),
    });

    const data = await response.json();

    setTimeout(() => {
      if (data.success) {
        // SUCCÈS
        resultMessage.textContent = data.message;
        resultMessage.classList.add("success-message");

        // Afficher le flag dans la console
        console.log("=".repeat(50));
        console.log("🎉 SUCCÈS - RÉSEAU RÉTABLI 🎉");
        console.log("=".repeat(50));
        console.log(`FLAG: ${data.flag}`);
        console.log("=".repeat(50));
      } else {
        // ÉCHEC
        resultMessage.textContent = data.message;
        resultMessage.classList.add("error-message");
      }
    }, 800);
  } catch (error) {
    console.error("Erreur lors de la vérification:", error);
    resultMessage.textContent = "ERREUR : Impossible de contacter le serveur.";
    resultMessage.classList.add("error-message");
  }
}
