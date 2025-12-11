#!/usr/bin/env python3


import os
import sys
import yaml
import requests
from pathlib import Path

# Configuration CTFd
CTFD_URL = os.getenv('CTFD_URL', 'http://localhost:8000')
CTFD_TOKEN = os.getenv('CTFD_TOKEN', '')  # Admin API token

# Headers pour l'API
HEADERS = {
    'Authorization': f'Token {CTFD_TOKEN}',
    'Content-Type': 'application/json'
}


def load_challenge_yaml(yaml_path):
    """Charger un fichier challenge.yml"""
    with open(yaml_path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def get_challenge_by_name(challenge_name):
    """Trouver un challenge existant par son nom"""
    response = requests.get(
        f'{CTFD_URL}/api/v1/challenges',
        headers=HEADERS,
        params={'view': 'admin'}
    )
    
    if response.status_code == 200:
        challenges = response.json().get('data', [])
        for challenge in challenges:
            if challenge.get('name') == challenge_name:
                return challenge.get('id')
    return None


def configure_static_scoring():
    """Configurer CTFd pour utiliser un scoring statique"""
    print("Configuration du scoring statique...")
    
    # CTFd utilise par défaut le scoring statique pour les challenges de type 'standard'
    # Le scoring dynamique nécessite des challenges de type 'dynamic'
    # Comme tous nos challenges sont de type 'standard', le scoring est déjà statique
    
    # Vérifier que le mode de score est visible
    try:
        # Configurer la visibilité des scores (public pour que les équipes voient leur score)
        response = requests.patch(
            f'{CTFD_URL}/api/v1/configs/score_visibility',
            json={'value': 'public'},
            headers=HEADERS
        )
        
        if response.status_code in [200, 201]:
            print("✓ Visibilité des scores: public")
        else:
            print("⚠️  Configuration de la visibilité non modifiée")
            
    except Exception as e:
        print(f"⚠️  Configuration automatique non disponible: {e}")
    
    print("   Note: Le scoring statique est utilisé par défaut avec les challenges 'standard'")


def create_or_update_challenge(challenge_data):
    """Créer ou mettre à jour un challenge via l'API CTFd"""
    challenge_name = challenge_data['name']
    challenge_id = get_challenge_by_name(challenge_name)
    
    # Préparer les données pour l'API
    payload = {
        'name': challenge_data['name'],
        'category': challenge_data['category'],
        'description': challenge_data['description'],
        'value': challenge_data['value'],
        'type': challenge_data.get('type', 'standard'),
        'state': challenge_data.get('state', 'visible'),
        'connection_info': challenge_data.get('connection_info', '')
    }
    
    if challenge_id:
        # Mettre à jour le challenge existant
        print(f"Mise à jour du challenge: {challenge_name} (ID: {challenge_id})")
        response = requests.patch(
            f'{CTFD_URL}/api/v1/challenges/{challenge_id}',
            json=payload,
            headers=HEADERS
        )
        
        if response.status_code not in [200, 201]:
            print(f"Erreur lors de la mise à jour: {response.text}")
            return None
        
        print(f"✓ Challenge mis à jour")
        
        # Supprimer les flags, hints et tags existants avant de les recréer
        cleanup_challenge_data(challenge_id)
    else:
        # Créer un nouveau challenge
        print(f"Création du challenge: {challenge_name}")
        response = requests.post(
            f'{CTFD_URL}/api/v1/challenges',
            json=payload,
            headers=HEADERS
        )
        
        if response.status_code not in [200, 201]:
            print(f"Erreur lors de la création: {response.text}")
            return None
        
        challenge_id = response.json()['data']['id']
        print(f"✓ Challenge créé avec l'ID: {challenge_id}")

    # Ajouter les flags
    for flag_text in challenge_data.get('flags', []):
        add_flag(challenge_id, flag_text)

    # Ajouter les hints
    for hint in challenge_data.get('hints', []):
        add_hint(challenge_id, hint)

    # Ajouter les tags
    for tag in challenge_data.get('tags', []):
        add_tag(challenge_id, tag)

    return challenge_id


def cleanup_challenge_data(challenge_id):
    """Supprimer les flags, hints et tags existants d'un challenge"""
    # Supprimer les flags existants
    response = requests.get(
        f'{CTFD_URL}/api/v1/flags',
        headers=HEADERS,
        params={'challenge_id': challenge_id}
    )
    if response.status_code == 200:
        flags = response.json().get('data', [])
        for flag in flags:
            requests.delete(
                f'{CTFD_URL}/api/v1/flags/{flag["id"]}',
                headers=HEADERS
            )
    
    # Supprimer les hints existants
    response = requests.get(
        f'{CTFD_URL}/api/v1/hints',
        headers=HEADERS,
        params={'challenge_id': challenge_id}
    )
    if response.status_code == 200:
        hints = response.json().get('data', [])
        for hint in hints:
            requests.delete(
                f'{CTFD_URL}/api/v1/hints/{hint["id"]}',
                headers=HEADERS
            )
    
    # Supprimer les tags existants
    response = requests.get(
        f'{CTFD_URL}/api/v1/tags',
        headers=HEADERS,
        params={'challenge_id': challenge_id}
    )
    if response.status_code == 200:
        tags = response.json().get('data', [])
        for tag in tags:
            requests.delete(
                f'{CTFD_URL}/api/v1/tags/{tag["id"]}',
                headers=HEADERS
            )


def add_flag(challenge_id, flag_text):
    """Ajouter un flag à un challenge"""
    payload = {
        'challenge_id': challenge_id,
        'content': flag_text,
        'type': 'static'
    }

    response = requests.post(
        f'{CTFD_URL}/api/v1/flags',
        json=payload,
        headers=HEADERS
    )

    if response.status_code in [200, 201]:
        print(f"  ✓ Flag ajouté: {flag_text}")
    else:
        print(f"  ✗ Erreur flag: {response.text}")


def add_hint(challenge_id, hint_data):
    """Ajouter un hint à un challenge"""
    payload = {
        'challenge_id': challenge_id,
        'content': hint_data['content'],
        'cost': hint_data.get('cost', 0)
    }

    response = requests.post(
        f'{CTFD_URL}/api/v1/hints',
        json=payload,
        headers=HEADERS
    )

    if response.status_code in [200, 201]:
        print(f"  ✓ Hint ajouté (coût: {hint_data.get('cost', 0)})")
    else:
        print(f"  ✗ Erreur hint: {response.text}")


def add_tag(challenge_id, tag_name):
    """Ajouter un tag à un challenge"""
    payload = {
        'challenge_id': challenge_id,
        'value': tag_name
    }

    response = requests.post(
        f'{CTFD_URL}/api/v1/tags',
        json=payload,
        headers=HEADERS
    )

    if response.status_code in [200, 201]:
        print(f"  ✓ Tag ajouté: {tag_name}")


def extract_epreuve_number(challenge_name):
    """Extraire le numéro d'épreuve du nom du challenge"""
    import re
    # Chercher "Épreuve N" ou "epreuve-N" dans le nom
    match = re.search(r'[Éé]preuve\s*(\d+)|epreuve-(\d+)', challenge_name, re.IGNORECASE)
    if match:
        return int(match.group(1) or match.group(2))
    return None


def set_challenge_requirements(challenge_id, prerequisite_ids):
    """Définir les prérequis (dépendances) d'un challenge
    
    Les challenges seront visibles mais verrouillés jusqu'à ce que les prérequis soient résolus.
    anonymize: true = visible mais contenu masqué (ce qu'on veut)
    anonymize: false ou absent = complètement caché
    """
    if not prerequisite_ids:
        return
    
    # Format CTFd avec anonymize=true pour garder le challenge VISIBLE
    # mais verrouillé jusqu'à résolution des prérequis
    payload = {
        'requirements': {
            'prerequisites': prerequisite_ids,
            'anonymize': True  # IMPORTANT: garde le challenge visible
        }
    }
    
    response = requests.patch(
        f'{CTFD_URL}/api/v1/challenges/{challenge_id}',
        json=payload,
        headers=HEADERS
    )
    
    if response.status_code in [200, 201]:
        prereq_names = ', '.join([f"#{prereq_id}" for prereq_id in prerequisite_ids])
        print(f"  ✓ Dépendances configurées: {prereq_names} (challenge visible mais verrouillé)")
        return
    
    # Format alternatif: liste directe (certaines versions)
    payload_alt = {
        'requirements': prerequisite_ids
    }
    
    response = requests.patch(
        f'{CTFD_URL}/api/v1/challenges/{challenge_id}',
        json=payload_alt,
        headers=HEADERS
    )
    
    if response.status_code in [200, 201]:
        prereq_names = ', '.join([f"#{prereq_id}" for prereq_id in prerequisite_ids])
        print(f"  ✓ Dépendances configurées: {prereq_names} (challenge visible mais verrouillé)")
    else:
        # Si rien ne fonctionne, afficher l'erreur détaillée
        print(f"  ⚠️  Impossible de configurer les dépendances automatiquement")
        print(f"     Réponse: {response.status_code} - {response.text[:300]}")
        print(f"     Vous devrez configurer manuellement dans CTFd > Challenges > Edit")


def find_challenge_files(base_path):
    """Trouver tous les fichiers challenge.yml"""
    challenge_files = []

    for root, dirs, files in os.walk(base_path):
        if 'challenge.yml' in files:
            challenge_files.append(os.path.join(root, 'challenge.yml'))

    return sorted(challenge_files)


def main():
    """Fonction principale"""
    if not CTFD_TOKEN:
        print("Erreur: CTFD_TOKEN non défini")
        print("Obtenez un token admin depuis CTFd > Settings > Access Tokens")
        sys.exit(1)

    # Vérifier la connexion à CTFd
    try:
        response = requests.get(f'{CTFD_URL}/api/v1/users/me', headers=HEADERS)
        if response.status_code != 200:
            print(f"Erreur: Impossible de se connecter à CTFd ({response.status_code})")
            print("Vérifiez CTFD_URL et CTFD_TOKEN")
            sys.exit(1)
    except requests.exceptions.RequestException as e:
        print(f"Erreur de connexion à CTFd: {e}")
        sys.exit(1)

    # Configurer le scoring statique
    configure_static_scoring()

    # Chemin de base des challenges
    base_path = Path(__file__).parent.parent / 'challenges'

    if not base_path.exists():
        print(f"Erreur: Le dossier {base_path} n'existe pas")
        sys.exit(1)

    # Trouver tous les challenges (exclure le dossier lumen)
    challenge_files = [
        f for f in find_challenge_files(base_path)
        if 'lumen' not in str(f)
    ]

    if not challenge_files:
        print("Aucun challenge trouvé")
        sys.exit(0)

    print(f"\n{'='*60}")
    print(f"Importation de {len(challenge_files)} challenges")
    print(f"{'='*60}\n")

    # Dictionnaire pour stocker les mappings: (numéro_épreuve, nom) -> challenge_id
    challenges_map = {}  # {(epreuve_num, name): challenge_id}
    success_count = 0
    error_count = 0

    # Étape 1: Créer/mettre à jour tous les challenges
    for challenge_file in challenge_files:
        try:
            print(f"\nTraitement: {challenge_file}")
            challenge_data = load_challenge_yaml(challenge_file)
            challenge_name = challenge_data['name']
            
            challenge_id = create_or_update_challenge(challenge_data)

            if challenge_id:
                success_count += 1
                # Extraire le numéro d'épreuve et stocker le mapping
                epreuve_num = extract_epreuve_number(challenge_name)
                if epreuve_num:
                    challenges_map[(epreuve_num, challenge_name)] = challenge_id
            else:
                error_count += 1

        except Exception as e:
            print(f"✗ Erreur: {e}")
            import traceback
            traceback.print_exc()
            error_count += 1

    # Étape 2: Configurer les dépendances séquentielles
    if challenges_map:
        print(f"\n{'='*60}")
        print("Configuration des dépendances séquentielles")
        print("Les épreuves seront VISIBLES mais VERRouillées jusqu'à résolution de la précédente")
        print(f"{'='*60}\n")
        
        # Trier par numéro d'épreuve
        sorted_challenges = sorted(challenges_map.items(), key=lambda x: x[0][0])
        
        for i, ((epreuve_num, challenge_name), challenge_id) in enumerate(sorted_challenges):
            # L'épreuve N dépend de l'épreuve N-1
            if i > 0:
                previous_epreuve_num, previous_name = sorted_challenges[i-1][0]
                previous_challenge_id = sorted_challenges[i-1][1]
                
                print(f"Épreuve {epreuve_num} ({challenge_name})")
                print(f"  → Dépend de l'épreuve {previous_epreuve_num} ({previous_name})")
                print(f"  → Visible mais verrouillée jusqu'à résolution de l'épreuve {previous_epreuve_num}")
                set_challenge_requirements(challenge_id, [previous_challenge_id])
            else:
                print(f"Épreuve {epreuve_num} ({challenge_name})")
                print(f"  → Aucune dépendance (première épreuve - accessible immédiatement)")

    print(f"\n{'='*60}")
    print(f"Résultat: {success_count} réussis, {error_count} erreurs")
    print(f"{'='*60}\n")
    
    if success_count > 0:
        print("✓ Les challenges ont été importés/mis à jour avec succès")
        print("✓ Les dépendances séquentielles ont été configurées")
        print("  Note: Le scoring statique peut nécessiter une configuration manuelle")
        print("        dans CTFd > Settings > Scoring selon votre version")


if __name__ == '__main__':
    main()
