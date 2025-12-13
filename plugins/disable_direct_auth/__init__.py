"""
CTFd Plugin: Disable Direct Login/Register
Forces users to use SSO from registration site only
"""

from flask import Blueprint, redirect, render_template_string, request, abort
from CTFd.utils.user import is_admin
import os


BLOCKED_PAGE_HTML = """
{% extends "base.html" %}

{% block stylesheets %}
{{ super() }}
<style>
    .auth-blocked-section {
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
    
    .auth-blocked-card {
        max-width: 700px;
        width: 100%;
        background: rgba(15, 14, 74, 0.6);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 3rem;
        text-align: center;
    }
    
    .auth-blocked-title {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        background: linear-gradient(135deg, #fc10ca 0%, #09c7df 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .auth-blocked-message {
        color: rgba(255, 255, 255, 0.8);
        font-size: 1.2rem;
        margin-bottom: 2.5rem;
        line-height: 1.8;
    }
    
    .auth-cta-button {
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
        border: none;
    }
    
    .auth-cta-button:hover {
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
<div class="auth-blocked-section">
    <div class="auth-blocked-card">
        <h1 class="auth-blocked-title">Connexion Requise</h1>
        <p class="auth-blocked-message">
            L'inscription et la connexion se font uniquement via le site d'inscription ACE Escape Game 2025.
            <br><br>
            Veuillez vous connecter depuis le site principal pour accéder à la plateforme CTF.
        </p>
        <a href="{{ registration_url }}" class="auth-cta-button">
            Aller au site d'inscription
        </a>
        
        <div class="info-box">
            <p>
                Une fois connecté sur le site d'inscription, cliquez sur le bouton 
                <strong>"Accéder au CTF"</strong> pour vous authentifier automatiquement.
            </p>
        </div>
    </div>
</div>
{% endblock %}
"""



def load(app):
    """Plugin load function"""
    
    # Get registration site URL from config
    registration_url = os.environ.get('FRONTEND_URL', 'http://localhost:3000')
    
    @app.before_request
    def block_direct_auth():
        """Block direct login and registration pages"""
        # Allow admins to access everything
        if is_admin():
            return
        
        # Block login page
        if request.path == '/login' and request.method == 'GET':
            return render_template_string(BLOCKED_PAGE_HTML, registration_url=registration_url), 403
        
        # Block registration page
        if request.path == '/register':
            return render_template_string(BLOCKED_PAGE_HTML, registration_url=registration_url), 403
        
        # Block login POST (form submission)
        if request.path == '/login' and request.method == 'POST':
            return render_template_string(BLOCKED_PAGE_HTML, registration_url=registration_url), 403
    
    print("✅ Plugin disable_direct_auth chargé - Login/Register bloqués (SSO uniquement)")
