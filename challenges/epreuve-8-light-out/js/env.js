// Configuration des variables d'environnement
// Ce fichier contient les paramètres configurables de l'application

const ENV = {
  // URL de redirection pour le puzzle Light Out (épreuve 8)
  // Détection automatique local vs production
  DISPOSITIF_URL: (function() {
    const isLocal = window.location.hostname.includes('localhost') || window.location.hostname.includes('.localhost');
    return isLocal
      ? 'http://epreuve8-puzzle.localhost:8081'
      : 'https://epreuve8-puzzle.challenges.vizyondijital.fr';
  })(),

  // Autres configurations peuvent être ajoutées ici
};
