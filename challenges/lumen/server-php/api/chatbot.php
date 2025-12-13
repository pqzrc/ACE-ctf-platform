<?php
/**
 * API Chatbot - Gestion des succès/échecs d'épreuves
 * POST /api/chatbot.php
 *
 * Body JSON:
 * - numeroEpreuve: int (1-10)
 * - status: bool (true = succès, false = échec)
 */

// Headers CORS (définis avant config.php qui peut les écraser)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/data.php';
require_once __DIR__ . '/../includes/groq.php';
require_once __DIR__ . '/../includes/session.php';

// Vérifier la méthode
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}

// Récupérer et parser le body JSON
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'JSON invalide']);
    exit;
}

$numeroEpreuve = $input['numeroEpreuve'] ?? null;
$status = $input['status'] ?? null;

// Validation
if (!is_int($numeroEpreuve) && !is_numeric($numeroEpreuve)) {
    http_response_code(400);
    echo json_encode(['error' => 'numeroEpreuve doit être un nombre']);
    exit;
}

$numeroEpreuve = (int)$numeroEpreuve;

if (!is_bool($status)) {
    http_response_code(400);
    echo json_encode(['error' => 'status doit être un booléen']);
    exit;
}

// Récupérer l'identifiant d'équipe (optionnel)
$teamId = $input['teamId'] ?? null;
$sessionId = getSessionId($teamId);

// Vérifier que l'épreuve existe
global $EPREUVES, $MESSAGES_DSIN_SUCCESS;

if (!isset($EPREUVES[$numeroEpreuve])) {
    http_response_code(404);
    echo json_encode(['error' => 'Épreuve inconnue']);
    exit;
}

$epreuve = $EPREUVES[$numeroEpreuve];
$messageBot = '';
$speaker = '';

try {
    if ($status === true) {
        // Succès -> Message DSIN avec flag si disponible
        global $FLAGS_EPREUVES;
        $messageBot = $MESSAGES_DSIN_SUCCESS[$numeroEpreuve]
            ?? 'DSIN : Étape validée. Vous pouvez passer à la suite.';
        $speaker = 'DSIN';
        
        // Mettre à jour l'état de l'épreuve
        updateEpreuveState($sessionId, $numeroEpreuve, 'completed');
    } else {
        // Échec -> Réponse LUMEN via Groq
        $prompt = getFailurePrompt($numeroEpreuve, $epreuve['contexte']);
        $messageBot = getLumenFailureResponse($prompt);
        $speaker = 'LUMEN';
        
        // Mettre à jour l'état de l'épreuve
        updateEpreuveState($sessionId, $numeroEpreuve, 'failed');
    }

    echo json_encode([
        'numeroEpreuve' => $numeroEpreuve,
        'status' => $status,
        'titre' => $epreuve['titre'],
        'contexte' => $epreuve['contexte'],
        'messageBot' => $messageBot,
        'speaker' => $speaker,
        'sessionId' => $sessionId
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur serveur : ' . $e->getMessage()]);
}
