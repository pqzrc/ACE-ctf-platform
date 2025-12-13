from flask import render_template_string, request
from CTFd.utils.decorators import authed_only
import os
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

def load(app):
    """
    Plugin to lock the scoreboard during the event
    Scoreboard is unlocked at RESULTS_RELEASE_TIME (after prizes ceremony)
    """
    # Get event times from environment variables
    event_start = os.getenv('EVENT_START_TIME')
    event_end = os.getenv('EVENT_END_TIME')
    # RESULTS_RELEASE_TIME = moment où le classement est publié (après remise des prix)
    # Fallback sur EVENT_END_TIME si non défini
    results_release = os.getenv('RESULTS_RELEASE_TIME', event_end)
    
    logger.info(f"✅ Plugin scoreboard_lock chargé - Classement visible à partir de {results_release}")
    
    @app.before_request
    def check_scoreboard_access():
        # Only intercept /scoreboard route
        if request.path != '/scoreboard':
            return None
            
        from datetime import timezone
        now = datetime.now(timezone.utc)
        
        try:
            start_time = datetime.fromisoformat(event_start.replace('Z', '+00:00'))
            end_time = datetime.fromisoformat(event_end.replace('Z', '+00:00'))
            release_time = datetime.fromisoformat(results_release.replace('Z', '+00:00'))
        except Exception as e:
            logger.error(f"❌ Erreur parsing dates: {e}")
            return None
        
        # After results release time - allow normal access
        if now >= release_time:
            return None
        
        # Before or during event - show locked page
        status = 'before' if now < start_time else 'during'
        
        template = """
{% extends "base.html" %}

{% block content %}
<div class="jumbotron">
    <div class="container">
        <h1>Classement</h1>
    </div>
</div>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="text-center" style="margin-top: 2rem;">
                <div class="mb-5">
                    <i class="fas fa-lock" style="font-size: 4rem; color: #ff6b9d;"></i>
                </div>
                
                {% if status == 'before' %}
                    <h2 class="mb-3">L'événement n'a pas encore commencé</h2>
                    <p class="text-muted mb-4">Début de l'épreuve dans :</p>
                {% else %}
                    <h2 class="mb-3">Le classement sera disponible après la remise des prix</h2>
                    <p class="text-muted mb-4">Publication du classement dans :</p>
                {% endif %}
                
                <div class="row mt-5 justify-content-center" id="countdown">
                    <div class="col-md-2 col-3">
                        <div class="p-3" style="background: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                            <div style="font-size: 2rem; font-weight: bold; color: #ff6b9d;" id="days">00</div>
                            <div style="font-size: 0.8rem; color: #888; text-transform: uppercase;">Jours</div>
                        </div>
                    </div>
                    <div class="col-md-2 col-3">
                        <div class="p-3" style="background: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                            <div style="font-size: 2rem; font-weight: bold; color: #ff6b9d;" id="hours">00</div>
                            <div style="font-size: 0.8rem; color: #888; text-transform: uppercase;">Heures</div>
                        </div>
                    </div>
                    <div class="col-md-2 col-3">
                        <div class="p-3" style="background: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                            <div style="font-size: 2rem; font-weight: bold; color: #ff6b9d;" id="minutes">00</div>
                            <div style="font-size: 0.8rem; color: #888; text-transform: uppercase;">Minutes</div>
                        </div>
                    </div>
                    <div class="col-md-2 col-3">
                        <div class="p-3" style="background: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                            <div style="font-size: 2rem; font-weight: bold; color: #ff6b9d;" id="seconds">00</div>
                            <div style="font-size: 0.8rem; color: #888; text-transform: uppercase;">Secondes</div>
                        </div>
                    </div>
                </div>
                
             
                
                <div class="mt-5">
                    <a href="/challenges" class="btn btn-primary">Retour aux challenges</a>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    const status = '{{ status }}';
    const startTime = new Date('{{ start_time }}').getTime();
    const releaseTime = new Date('{{ release_time }}').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        // Before event: count to start, during/after event: count to release time
        const targetTime = status === 'before' ? startTime : releaseTime;
        const diff = targetTime - now;

        if (diff <= 0) {
            window.location.reload();
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
</script>
{% endblock %}
"""
        
        return render_template_string(template, status=status, start_time=event_start, release_time=results_release)
