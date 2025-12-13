from flask import render_template_string, request
from CTFd.utils.user import get_current_user, get_current_team, authed
import os


TEAM_REQUIRED_HTML = """
{% extends "base.html" %}

{% block stylesheets %}
{{ super() }}
<style>
    .team-required-section {
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
    
    .team-required-card {
        max-width: 700px;
        width: 100%;
        background: rgba(15, 14, 74, 0.6);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 3rem;
        text-align: center;
    }
    
    .team-required-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        background: linear-gradient(135deg, #fc10ca 0%, #09c7df 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .team-required-message {
        color: rgba(255, 255, 255, 0.8);
        font-size: 1.2rem;
        margin-bottom: 2.5rem;
        line-height: 1.8;
    }
    
    .team-cta-button {
        display: inline-block;
        padding: 1rem 2.5rem;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 8px;
        text-decoration: none;
        background: linear-gradient(135deg, #fc10ca 0%, #09c7df 100%);
        color: white;
        box-shadow: 0 0 20px rgba(252, 16, 202, 0.5);
        transition: all 0.3s ease;
    }
    
    .team-cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 30px rgba(252, 16, 202, 0.8);
        color: white;
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
<div class="team-required-section">
    <div class="team-required-card">
        <h1 class="team-required-title">Équipe Requise</h1>
        <p class="team-required-message">
            Vous devez créer ou rejoindre une équipe pour participer aux challenges.
            <br><br>
            Rendez-vous sur le site d'inscription ACE Escape Game pour gérer votre équipe.
        </p>
        <a href="{{ registration_url }}" class="team-cta-button">
            Gérer mon équipe
        </a>
        
        <div class="info-box">
            <p>
                Une fois votre équipe créée, revenez sur cette page pour accéder aux challenges.
            </p>
        </div>
    </div>
</div>
{% endblock %}
"""


def load(app):
    """Plugin load function"""
    
    @app.before_request
    def check_team_requirement():
        """Check if user needs a team and show custom message"""
        # Intercept /challenges, /team, /teams/new, /teams/join routes
        blocked_paths = ['/challenges', '/team', '/teams/new', '/teams/join']
        
        if request.path in blocked_paths and request.method == 'GET':
            # Check if user is authenticated
            if not authed():
                return  # Let CTFd handle login redirect
            
            # Get current team
            team = get_current_team()
            
            # If user has no team, show custom message
            if not team:
                registration_url = os.environ.get('FRONTEND_URL', 'http://localhost:3000')
                return render_template_string(
                    TEAM_REQUIRED_HTML,
                    registration_url=registration_url
                )
    
    print("✅ Plugin team_requirement_message chargé - Message équipe personnalisé")
