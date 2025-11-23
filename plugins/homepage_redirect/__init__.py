"""
CTFd Plugin: Homepage Redirect
Shows a beautiful homepage with CTFd navbar
"""

from flask import redirect, render_template_string, request
from CTFd.utils.user import authed
from CTFd.utils import config


HOMEPAGE_HTML = """
{% extends "base.html" %}

{% block stylesheets %}
{{ super() }}
<style>
    /* ACE Website Inspired Styles */
    .hero-section {
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
    
    .hero-container {
        max-width: 1200px;
        width: 100%;
        text-align: center;
    }
    
    .hero-title {
        font-size: 4rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        background: linear-gradient(135deg, #fc10ca 0%, #09c7df 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        line-height: 1.2;
    }
    
    .hero-subtitle {
        font-size: 1.5rem;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 3rem;
        font-weight: 300;
    }
    
    .cta-buttons {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 4rem;
    }
    
    .cta-button {
        padding: 1rem 2.5rem;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 8px;
        text-decoration: none;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
    }
    
    .cta-primary {
        background: linear-gradient(135deg, #fc10ca 0%, #09c7df 100%);
        color: white;
        box-shadow: 0 0 20px rgba(252, 16, 202, 0.5);
    }
    
    .cta-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 30px rgba(252, 16, 202, 0.8);
        color: white;
    }
    
    .cta-secondary {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .cta-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        color: white;
    }
    
    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }
    
    .feature-card {
        background: rgba(15, 14, 74, 0.6);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 2rem;
        transition: all 0.3s ease;
    }
    
    .feature-card:hover {
        transform: translateY(-5px);
        border-color: rgba(252, 16, 202, 0.5);
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    }
    
    .feature-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #fc10ca;
    }
    
    .feature-description {
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.6;
    }
    
    @media (max-width: 768px) {
        .hero-title {
            font-size: 2.5rem;
        }
        .hero-subtitle {
            font-size: 1.2rem;
        }
        .features-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
{% endblock %}

{% block content %}
<div class="hero-section">
    <div class="hero-container">
        <h1 class="hero-title">ACE Escape Game 2025</h1>
        <p class="hero-subtitle">Plateforme CTF - Compétition de Cybersécurité</p>
        
        <div class="cta-buttons">
            {% if is_authed %}
                <a href="/challenges" class="cta-button cta-primary">Voir les Challenges</a>
                <a href="/scoreboard" class="cta-button cta-secondary">Classement</a>
            {% else %}
                <a href="{{ frontend_url }}" class="cta-button cta-primary">Se Connecter</a>
                <a href="/scoreboard" class="cta-button cta-secondary">Voir le Classement</a>
            {% endif %}
        </div>
        
        <div class="features-grid">
            <div class="feature-card">
                <h3 class="feature-title">Cybersécurité</h3>
                <p class="feature-description">
                    Challenges variés couvrant Web, Cryptographie, Forensics, PWN et plus encore
                </p>
            </div>
            
            <div class="feature-card">
                <h3 class="feature-title">En Équipe</h3>
                <p class="feature-description">
                    Travaillez ensemble avec votre équipe pour résoudre les défis et progresser
                </p>
            </div>
            
            <div class="feature-card">
                <h3 class="feature-title">Temps Réel</h3>
                <p class="feature-description">
                    Classement mis à jour en direct avec synchronisation automatique des scores
                </p>
            </div>
        </div>
    </div>
</div>
{% endblock %}
"""


def load(app):
    """Plugin load function"""
    
    @app.before_request
    def custom_homepage():
        """Override homepage with custom page"""
        if request.path == '/' and request.method == 'GET':
            is_authed = authed()
            frontend_url = app.config.get('FRONTEND_URL', 'http://localhost:3000')
            
            return render_template_string(
                HOMEPAGE_HTML,
                is_authed=is_authed,
                frontend_url=frontend_url
            )
    
    print("✅ Plugin homepage_redirect chargé - Page d'accueil personnalisée activée")
