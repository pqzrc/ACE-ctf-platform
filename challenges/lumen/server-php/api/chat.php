<?php
/**
 * API Chat - Discussion libre avec LUMEN
 * POST /api/chat.php
 *
 * Body JSON:
 * - message: string (message de l'utilisateur)
 * - history: array (optionnel, historique de conversation)
 */

// Headers CORS (définis avant config.php qui peut les écraser)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../includes/config.php';
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

$userMessage = $input['message'] ?? null;
$teamId = $input['teamId'] ?? null; // Optionnel : identifiant d'équipe

// Validation
if (!$userMessage || !is_string($userMessage)) {
    http_response_code(400);
    echo json_encode(['error' => 'Le champ message est requis']);
    exit;
}

// Limiter la taille du message
if (strlen($userMessage) > 1000) {
    http_response_code(400);
    echo json_encode(['error' => 'Message trop long (max 1000 caractères)']);
    exit;
}

// Récupérer ou créer la session pour cette équipe
$sessionId = getSessionId($teamId);

// Récupérer l'historique de conversation de cette session
$history = getConversationHistory($sessionId);

// Convertir l'historique au format attendu par Groq
$groqHistory = [];
foreach ($history as $msg) {
    $groqHistory[] = [
        'role' => $msg['role'],
        'content' => $msg['content']
    ];
}

// Limiter l'historique à 10 messages pour éviter de dépasser les limites de tokens
$groqHistory = array_slice($groqHistory, -10);

try {
    $response = chatWithLumen($userMessage, $groqHistory);

    // Ajouter le message utilisateur et la réponse à l'historique
    $history[] = [
        'role' => 'user',
        'content' => $userMessage,
        'timestamp' => time()
    ];
    $history[] = [
        'role' => 'assistant',
        'content' => $response,
        'timestamp' => time()
    ];
    
    // Sauvegarder l'historique
    saveConversationHistory($sessionId, $history);

    echo json_encode([
        'success' => true,
        'response' => $response,
        'speaker' => 'LUMEN',
        'sessionId' => $sessionId
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur serveur : ' . $e->getMessage()]);
}
