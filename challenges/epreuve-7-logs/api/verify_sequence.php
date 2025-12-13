<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Gestion des requêtes OPTIONS pour CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Vérifier que c'est une requête POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Méthode non autorisée'
    ]);
    exit();
}

// Récupérer les données JSON
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Vérifier que la séquence est présente
if (!isset($data['sequence'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Séquence manquante'
    ]);
    exit();
}

// Séquence correcte attendue (côté serveur, sécurisé)
// Ordre logique: stop networking -> stop NetworkManager -> eth0 down -> flush -> add IP -> eth0 up -> add route -> DNS -> start networking -> ping
const CORRECT_SEQUENCE = "cmd23,cmd15,cmd34,cmd42,cmd51,cmd58,cmd67,cmd76,cmd88,cmd99";

// Flag à révéler en cas de succès
const FLAG = "ACE{R3S34U7NK}";

// Vérifier la séquence
$sequence = $data['sequence'];

if ($sequence === CORRECT_SEQUENCE) {
    // Succès - Séquence correcte
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'RÉUSSITE ! Configuration validée.',
        'flag' => FLAG
    ]);
} else if (empty($sequence)) {
    // Erreur - Aucune commande
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'ERREUR : Aucune commande n\'a été séquencée.'
    ]);
} else {
    // Échec - Séquence incorrecte
    http_response_code(200);
    echo json_encode([
        'success' => false,
        'message' => 'ÉCHEC : La séquence est incorrecte.',
        'hint' => 'Réfléchissez à l\'ordre logique de configuration réseau...'
    ]);
}
?>

