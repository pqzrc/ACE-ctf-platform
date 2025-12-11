/**
 * Widget LUMEN/DSIN - Chat réutilisable pour les challenges
 * 
 * Usage:
 * <script src="https://lumen.challenges.vizyondijital.fr/public/widget/lumen-widget.js"></script>
 * <script>
 *   LumenWidget.init({
 *     apiBase: 'https://lumen.challenges.vizyondijital.fr',
 *     teamId: 'team-123', // Optionnel
 *     currentEpreuve: 1   // Numéro de l'épreuve actuelle
 *   });
 * </script>
 */

(function() {
  'use strict';

  const LumenWidget = {
    config: {
      apiBase: '',
      teamId: null,
      currentEpreuve: null,
      sessionId: null
    },

    state: {
      lumenHistory: [],
      dsinHistory: [],
      isMinimized: {
        lumen: false,
        dsin: false
      }
    },

    /**
     * Initialise le widget
     */
    init(options = {}) {
      this.config = { ...this.config, ...options };
      
      // Récupérer ou créer sessionId
      this.config.sessionId = this.getSessionId();
      
      // Créer les widgets dans le DOM
      this.createWidgets();
      
      // Charger l'intro DSIN si épreuve spécifiée
      if (this.config.currentEpreuve) {
        this.loadDsinIntro(this.config.currentEpreuve);
      }
      
      // Message d'accueil LUMEN
      setTimeout(() => {
        this.addLumenMessage("Je surveille vos actions. Vos tentatives sont... prévisibles.");
      }, 1000);
    },

    /**
     * Récupère ou crée un identifiant de session
     */
    getSessionId() {
      // Vérifier le cookie
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'lumen_session') {
          return value;
        }
      }
      
      // Créer un nouvel ID
      const sessionId = 'anon_' + Math.random().toString(36).substring(2, 15);
      document.cookie = `lumen_session=${sessionId}; path=/; max-age=${3600 * 24}`;
      return sessionId;
    },

    /**
     * Crée les widgets dans le DOM
     */
    createWidgets() {
      // Widget LUMEN (bas droite)
      const lumenWidget = document.createElement('div');
      lumenWidget.id = 'lumen-widget';
      lumenWidget.className = 'lumen-widget';
      lumenWidget.innerHTML = `
        <div class="lumen-widget-header" onclick="LumenWidget.toggle('lumen')">
          <span class="lumen-widget-icon">◈</span>
          <span class="lumen-widget-title">L.U.M.E.N.</span>
          <span class="lumen-widget-toggle">−</span>
        </div>
        <div class="lumen-widget-content" id="lumen-widget-content">
          <div class="lumen-widget-messages" id="lumen-widget-messages"></div>
          <div class="lumen-widget-input">
            <input type="text" id="lumen-widget-input" placeholder="Parler à L.U.M.E.N..." />
            <button id="lumen-widget-send">→</button>
          </div>
        </div>
      `;
      document.body.appendChild(lumenWidget);

      // Widget DSIN (bas gauche)
      const dsinWidget = document.createElement('div');
      dsinWidget.id = 'dsin-widget';
      dsinWidget.className = 'dsin-widget';
      dsinWidget.innerHTML = `
        <div class="dsin-widget-header" onclick="LumenWidget.toggle('dsin')">
          <span class="dsin-widget-icon">◆</span>
          <span class="dsin-widget-title">Canal DSIN</span>
          <span class="dsin-widget-badge">SÉCURISÉ</span>
          <span class="dsin-widget-toggle">−</span>
        </div>
        <div class="dsin-widget-content" id="dsin-widget-content">
          <div class="dsin-widget-messages" id="dsin-widget-messages"></div>
        </div>
      `;
      document.body.appendChild(dsinWidget);

      // Événements
      document.getElementById('lumen-widget-send').addEventListener('click', () => this.sendLumenMessage());
      document.getElementById('lumen-widget-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendLumenMessage();
      });

      // Injecter le CSS
      this.injectCSS();
    },

    /**
     * Injecte le CSS du widget
     */
    injectCSS() {
      const style = document.createElement('style');
      style.textContent = `
        .lumen-widget, .dsin-widget {
          position: fixed;
          width: 350px;
          max-height: 500px;
          background: rgba(15, 14, 74, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          z-index: 10000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
        }

        .lumen-widget {
          bottom: 20px;
          right: 20px;
          border: 1px solid rgba(252, 16, 202, 0.3);
        }

        .dsin-widget {
          bottom: 20px;
          left: 20px;
          border: 1px solid rgba(9, 199, 223, 0.3);
        }

        .lumen-widget-header, .dsin-widget-header {
          padding: 12px 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          user-select: none;
        }

        .lumen-widget-header {
          background: linear-gradient(90deg, rgba(252, 16, 202, 0.15) 0%, transparent 100%);
          border-bottom: 1px solid rgba(252, 16, 202, 0.2);
        }

        .dsin-widget-header {
          background: linear-gradient(90deg, rgba(9, 199, 223, 0.15) 0%, transparent 100%);
          border-bottom: 1px solid rgba(9, 199, 223, 0.2);
        }

        .lumen-widget-icon, .dsin-widget-icon {
          font-size: 1.2rem;
        }

        .lumen-widget-icon {
          color: #fc10ca;
        }

        .dsin-widget-icon {
          color: #09c7df;
        }

        .lumen-widget-title, .dsin-widget-title {
          flex: 1;
          font-weight: 600;
          letter-spacing: 0.1em;
        }

        .lumen-widget-title {
          color: #fc10ca;
        }

        .dsin-widget-title {
          color: #09c7df;
        }

        .dsin-widget-badge {
          font-size: 0.65rem;
          padding: 2px 8px;
          background: rgba(9, 199, 223, 0.2);
          border: 1px solid rgba(9, 199, 223, 0.4);
          border-radius: 4px;
          color: #09c7df;
        }

        .lumen-widget-toggle, .dsin-widget-toggle {
          font-size: 1.5rem;
          line-height: 1;
        }

        .lumen-widget-content, .dsin-widget-content {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
        }

        .lumen-widget-content.minimized,
        .dsin-widget-content.minimized {
          display: none;
        }

        .lumen-widget-messages, .dsin-widget-messages {
          flex: 1;
          padding: 12px;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 350px;
        }

        .lumen-widget-message, .dsin-widget-message {
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .lumen-widget-message {
          background: linear-gradient(135deg, rgba(252, 16, 202, 0.15) 0%, rgba(252, 16, 202, 0.05) 100%);
          border-left: 3px solid #fc10ca;
        }

        .dsin-widget-message {
          background: linear-gradient(135deg, rgba(9, 199, 223, 0.15) 0%, rgba(9, 199, 223, 0.05) 100%);
          border-left: 3px solid #09c7df;
        }

        .lumen-widget-input {
          display: flex;
          gap: 8px;
          padding: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .lumen-widget-input input {
          flex: 1;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(252, 16, 202, 0.3);
          border-radius: 6px;
          padding: 8px 12px;
          color: #f6f2f9;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          outline: none;
        }

        .lumen-widget-input input:focus {
          border-color: #fc10ca;
          box-shadow: 0 0 10px rgba(252, 16, 202, 0.2);
        }

        .lumen-widget-input button {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #fc10ca 0%, #d60bab 100%);
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 1rem;
          transition: transform 0.2s;
        }

        .lumen-widget-input button:hover {
          transform: scale(1.05);
        }

        .lumen-widget-messages::-webkit-scrollbar,
        .dsin-widget-messages::-webkit-scrollbar {
          width: 6px;
        }

        .lumen-widget-messages::-webkit-scrollbar-thumb,
        .dsin-widget-messages::-webkit-scrollbar-thumb {
          background: rgba(252, 16, 202, 0.4);
          border-radius: 3px;
        }

        .dsin-widget-messages::-webkit-scrollbar-thumb {
          background: rgba(9, 199, 223, 0.4);
        }
      `;
      document.head.appendChild(style);
    },

    /**
     * Toggle minimiser/maximiser un widget
     */
    toggle(widget) {
      this.state.isMinimized[widget] = !this.state.isMinimized[widget];
      const content = document.getElementById(`${widget}-widget-content`);
      const toggle = document.querySelector(`.${widget}-widget-toggle`);
      
      if (this.state.isMinimized[widget]) {
        content.classList.add('minimized');
        toggle.textContent = '+';
      } else {
        content.classList.remove('minimized');
        toggle.textContent = '−';
      }
    },

    /**
     * Ajoute un message LUMEN
     */
    addLumenMessage(text) {
      const messages = document.getElementById('lumen-widget-messages');
      const msg = document.createElement('div');
      msg.className = 'lumen-widget-message';
      msg.textContent = text;
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
      this.state.lumenHistory.push({ role: 'assistant', content: text });
    },

    /**
     * Ajoute un message DSIN
     */
    addDsinMessage(text) {
      const messages = document.getElementById('dsin-widget-messages');
      const msg = document.createElement('div');
      msg.className = 'dsin-widget-message';
      // Convertir le texte en HTML (retours à la ligne et code)
      let html = text
        .replace(/`(.*?)`/g, '<code style="background: rgba(0,255,157,0.1); padding: 2px 6px; border-radius: 4px; color: #00ff9d; font-family: monospace;">$1</code>') // `code`
        .replace(/\n\n/g, '</p><p>') // Paragraphes (double saut de ligne)
        .replace(/\n/g, '<br>'); // Retours à la ligne simples
      
      // Encapsuler dans un paragraphe si pas déjà fait
      if (!html.startsWith('<p>')) {
        html = '<p>' + html + '</p>';
      }
      
      // Nettoyer les balises <p> vides
      html = html.replace(/<p><\/p>/g, '').replace(/<p>(<br>)+<\/p>/g, '');
      
      msg.innerHTML = html;
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
      this.state.dsinHistory.push({ role: 'dsin', content: text });
    },

    /**
     * Envoie un message à LUMEN
     */
    async sendLumenMessage() {
      const input = document.getElementById('lumen-widget-input');
      const message = input.value.trim();
      if (!message) return;

      // Afficher le message utilisateur
      const messages = document.getElementById('lumen-widget-messages');
      const userMsg = document.createElement('div');
      userMsg.className = 'lumen-widget-message';
      userMsg.style.background = 'rgba(255, 255, 255, 0.1)';
      userMsg.style.borderLeft = '3px solid rgba(255, 255, 255, 0.3)';
      userMsg.textContent = message;
      messages.appendChild(userMsg);
      messages.scrollTop = messages.scrollHeight;
      input.value = '';

      try {
        const response = await fetch(`${this.config.apiBase}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: message,
            teamId: this.config.teamId
          })
        });

        const data = await response.json();
        if (data.response) {
          this.addLumenMessage(data.response);
        } else if (data.error) {
          this.addLumenMessage(`Erreur: ${data.error}`);
        }
      } catch (error) {
        this.addLumenMessage('Erreur de connexion');
      }
    },

    /**
     * Charge l'intro DSIN pour une épreuve
     */
    async loadDsinIntro(epreuveNum) {
      try {
        const response = await fetch(`${this.config.apiBase}/api/dsin-intro/${epreuveNum}`);
        const data = await response.json();
        if (data.messageBot) {
          this.addDsinMessage(data.messageBot);
        }
      } catch (error) {
        // Silencieux en production
      }
    },

    /**
     * Rapporte un succès/échec d'épreuve
     */
    async reportEpreuveResult(epreuveNum, success) {
      if (!this.config.apiBase) {
        return;
      }
      
      try {
        const url = `${this.config.apiBase}/api/chatbot`;
        const payload = {
          numeroEpreuve: epreuveNum,
          status: success,
          teamId: this.config.teamId
        };
        
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.messageBot) {
          if (data.speaker === 'LUMEN') {
            this.addLumenMessage(data.messageBot);
          } else if (data.speaker === 'DSIN') {
            this.addDsinMessage(data.messageBot);
          }
        }
      } catch (error) {
        // Silencieux en production
      }
    }
  };

  // Exposer globalement
  window.LumenWidget = LumenWidget;
})();

