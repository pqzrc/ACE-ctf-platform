from flask import render_template_string, request
from CTFd.models import Challenges


EMPTY_CHALLENGES_HTML = """
{% extends "base.html" %}

{% block stylesheets %}
{{ super() }}
<style>
    .empty-challenges-section {
        min-height: calc(100vh - 100px);
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #050511 0%, #0f0e4a 100%);
        background-image:
            radial-gradient(circle at 50% 0%, rgba(26, 24, 125, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 100% 0%, rgba(252, 16, 202, 0.15) 0%, transparent 30%);
        padding: 60px 20px;
    }
    
    .empty-challenges-card {
        max-width: 700px;
        width: 100%;
        background: rgba(15, 14, 74, 0.6);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 3rem;
        text-align: center;
    }
    
    .empty-challenges-icon {
        font-size: 5rem;
        margin-bottom: 1.5rem;
        opacity: 0.7;
    }
    
    .empty-challenges-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        background: linear-gradient(135deg, #fc10ca 0%, #09c7df 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .empty-challenges-message {
        color: rgba(255, 255, 255, 0.8);
        font-size: 1.2rem;
        margin-bottom: 2rem;
        line-height: 1.8;
    }
    
    .info-box {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 1.5rem;
        margin-top: 2rem;
    }
    
    .info-box p {
        color: rgba(255, 255, 255, 0.7);
        margin: 0;
        font-size: 0.95rem;
    }
</style>
{% endblock %}

{% block content %}
<div class="empty-challenges-section">
    <div class="empty-challenges-card">
        <div class="empty-challenges-icon">
            <i class="fas fa-tasks"></i>
        </div>
        <h1 class="empty-challenges-title">Aucun Challenge Disponible</h1>
        <p class="empty-challenges-message">
            Il n'y a actuellement aucun challenge disponible sur la plateforme.
            <br><br>
            Les challenges seront ajoutés prochainement. Revenez plus tard pour commencer à résoudre les défis !
        </p>
        
        <div class="info-box">
            <p>
                <i class="fas fa-info-circle"></i>
                Les challenges sont importés par les administrateurs. 
                Contactez l'équipe organisatrice si vous avez des questions.
            </p>
        </div>
    </div>
</div>
{% endblock %}
"""


def load(app):
    """Plugin load function"""
    
    @app.before_request
    def check_empty_challenges():
        """Vérifie s'il y a des challenges et affiche un message si la liste est vide"""
        # Intercepter uniquement la route /challenges
        if request.path == '/challenges' and request.method == 'GET':
            # Compter les challenges visibles
            try:
                # Utiliser le modèle CTFd pour obtenir les challenges visibles
                # Cela prend en compte l'état 'visible' des challenges
                challenges = Challenges.query.filter_by(state='visible').all()
                
                # Si aucun challenge visible, afficher le message
                if not challenges or len(challenges) == 0:
                    return render_template_string(EMPTY_CHALLENGES_HTML)
            except Exception as e:
                # En cas d'erreur (ex: base de données non initialisée), 
                # laisser CTFd gérer normalement
                # On ne log pas l'erreur pour éviter de polluer les logs au démarrage
                pass
    
    print("✅ Plugin empty_challenges_message chargé - Message pour challenges vides activé")

