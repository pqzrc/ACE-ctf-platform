"""
CTFd Plugin: Disable Team Editing
Prevents teams from editing their information in CTFd.
All team information should be managed through the registration site.
"""

from flask import abort, request, render_template, redirect, url_for, flash
from CTFd.plugins import register_plugin_assets_directory
from CTFd.utils.decorators import authed_only
from CTFd.utils.user import is_admin


def load(app):
    """Plugin load function"""

    # Override team edit routes to prevent modifications
    @app.before_request
    def block_team_edits():
        """Block any team edit requests"""
        # Allow admins to do anything
        if is_admin():
            return

        # Block team settings/edit page
        if request.path.startswith('/teams/') and '/settings' in request.path:
            flash("Team editing is disabled. Please use the registration site to manage your team.", "warning")
            return redirect(url_for('teams.listing'))

        # Block API endpoints for team modifications
        if request.method in ['PATCH', 'PUT', 'DELETE']:
            if '/api/v1/teams/' in request.path:
                abort(403, description="Team editing is disabled. Please use the registration site to manage your team.")

        # Block team join/leave/invite/disband endpoints for non-admins
        if request.method == 'POST':
            blocked_paths = [
                '/teams/join',
                '/teams/new',
                '/teams/invite',
                '/api/v1/teams/invite',
            ]
            for path in blocked_paths:
                if request.path.startswith(path):
                    abort(403, description="Team management is disabled. Teams are created through the registration site.")

        # Block specific API actions
        if request.method in ['POST', 'PATCH', 'DELETE']:
            # Block captain change
            if '/captain' in request.path:
                abort(403, description="Captain management is disabled. Please use the registration site.")
            
            # Block team disband/delete
            if '/api/v1/teams/' in request.path and request.method == 'DELETE':
                 abort(403, description="Team deletion is disabled. Please use the registration site.")

    # Inject script into HTML responses
    @app.after_request
    def inject_script(response):
        # Check for both /teams (list/public profile) and /team (private profile)
        if (request.path.startswith('/teams') or request.path == '/team') and response.content_type == 'text/html; charset=utf-8':
            registration_url = app.config.get('FRONTEND_URL', 'http://localhost:3000')
            custom_script = """
            <script>
            document.addEventListener('DOMContentLoaded', function() {
                // Hide Edit Team button
                var editBtn = document.querySelector('a[href*="/teams/"][href*="/settings"]');
                if (editBtn) editBtn.style.display = 'none';
                
                // Hide Invite button
                var inviteBtn = document.querySelector('#team-invite-button');
                if (inviteBtn) inviteBtn.style.display = 'none';
                
                // Hide Disband button
                var disbandBtn = document.querySelector('#team-disband-button');
                if (disbandBtn) disbandBtn.style.display = 'none';
                
                // Hide Captain select
                var captainSelect = document.querySelector('#team-captain-select');
                if (captainSelect) {
                    captainSelect.disabled = true;
                    var parent = captainSelect.closest('.form-group');
                    if (parent) parent.style.display = 'none';
                }

                // Hide Invite Link section (aggressive search)
                var labels = document.querySelectorAll('label');
                labels.forEach(function(label) {
                    if (label.textContent.includes('Invite Link') || label.textContent.includes('Lien d\\'invitation')) {
                        var parent = label.closest('.form-group');
                        if (parent) parent.style.display = 'none';
                    }
                });

                var inputs = document.querySelectorAll('input[value*="/invite"]');
                inputs.forEach(function(input) {
                    var parent = input.closest('.form-group');
                    if (parent) parent.style.display = 'none';
                });
                
                // Add info message
                var container = document.querySelector('.jumbotron .container');
                if (container && !document.getElementById('team-lock-msg')) {
                    var msg = document.createElement('div');
                    msg.id = 'team-lock-msg';
                    msg.className = 'alert alert-info mt-3';
                    msg.innerHTML = '<strong>Note:</strong> La gestion d\\'équipe (nom, membres, capitaine) se fait uniquement sur le <a href="REGISTRATION_URL" target="_blank">site d\\'inscription</a>.';
                    container.appendChild(msg);
                }
            });
            </script>
            """.replace('REGISTRATION_URL', registration_url)
            
            response.set_data(response.get_data(as_text=True).replace('</body>', custom_script + '</body>'))
            
        return response

    print("[Plugin] disable_team_editing loaded - Team editing restricted to admins only")
