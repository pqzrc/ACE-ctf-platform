"""
CTFd Plugin: Disable User Settings
Blocks user profile editing and redirects to registration site
"""

from flask import render_template_string, request, redirect
from CTFd.utils.user import authed, is_admin


USER_SETTINGS_BLOCKED_HTML = """
{% extends "base.html" %}

{% block stylesheets %}
{{ super() }}
<style>
    .settings-blocked-section {
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
    
    .settings-blocked-card {
        max-width: 700px;
        width: 100%;
        background: rgba(15, 14, 74, 0.6);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 3rem;
        text-align: center;
    }
    
    .settings-blocked-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        background: linear-gradient(135deg, #fc10ca 0%, #09c7df 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .settings-blocked-message {
        color: rgba(255, 255, 255, 0.8);
        font-size: 1.2rem;
        margin-bottom: 2.5rem;
        line-height: 1.8;
    }
    
    .settings-cta-button {
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
    
    .settings-cta-button:hover {
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
    
    .info-box ul {
        text-align: left;
        color: rgba(255, 255, 255, 0.7);
        margin-top: 1rem;
        line-height: 1.8;
    }
</style>
{% endblock %}

{% block content %}
<div class="settings-blocked-section">
    <div class="settings-blocked-card">
        <h1 class="settings-blocked-title">Paramètres de Profil</h1>
        <p class="settings-blocked-message">
            La gestion de votre profil se fait uniquement via le site d'inscription ACE Escape Game 2025.
            <br><br>
            Pour modifier vos informations, rendez-vous sur le site principal.
        </p>
        <a href="{{ registration_url }}" class="settings-cta-button">
            Gérer mon profil
        </a>
        
        <div class="info-box">
            <p><strong>Vous pouvez modifier :</strong></p>
            <ul>
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Mot de passe</li>
                <li>Établissement scolaire</li>
                <li>Informations d'équipe</li>
            </ul>
        </div>
    </div>
</div>
{% endblock %}
"""


def load(app):
    """Plugin load function"""
    
    @app.before_request
    def block_user_settings():
        """Block user settings page and redirect to registration site"""
        # Block /settings route (user profile editing)
        if request.path in ['/settings', '/user'] and request.method == 'GET':
            # Allow admins to access settings
            if is_admin():
                return
            
            # Check if user is authenticated
            if not authed():
                return  # Let CTFd handle login redirect
            
            # Show custom message
            registration_url = app.config.get('FRONTEND_URL', 'http://localhost:3000')
            return render_template_string(
                USER_SETTINGS_BLOCKED_HTML,
                registration_url=registration_url
            )
        
        # Block PATCH/PUT/POST requests to user profile API
        if request.method in ['PATCH', 'PUT', 'POST']:
            # Block API calls to modify user profile
            if '/api/v1/users/' in request.path and not is_admin():
                from flask import abort, jsonify
                return jsonify({
                    'success': False,
                    'message': 'Les modifications de profil doivent être effectuées via le site d\'inscription.'
                }), 403
    
    print("✅ Plugin disable_user_settings chargé - Modifications de profil bloquées")
