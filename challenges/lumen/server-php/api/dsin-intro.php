<?php
/**
 * API DSIN Intro - Récupère le message d'introduction DSIN pour une épreuve
 * GET /api/dsin-intro.php?epreuve=N
 */

// Headers CORS (définis avant config.php qui peut les écraser)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/data.php';

// Vérifier la méthode
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
    exit;
}

// Récupérer le numéro d'épreuve
$numeroEpreuve = $_GET['epreuve'] ?? null;

if (!$numeroEpreuve || !is_numeric($numeroEpreuve)) {
    http_response_code(400);
    echo json_encode(['error' => 'Paramètre epreuve requis (1-10)']);
    exit;
}

$numeroEpreuve = (int)$numeroEpreuve;

global $EPREUVES, $MESSAGES_DSIN_INTRO;

// Vérifier que l'épreuve existe
if (!isset($EPREUVES[$numeroEpreuve])) {
    http_response_code(404);
    echo json_encode(['error' => 'Épreuve inconnue']);
    exit;
}

$epreuve = $EPREUVES[$numeroEpreuve];
$messageIntro = $MESSAGES_DSIN_INTRO[$numeroEpreuve]
    ?? 'DSIN : Nouvelle épreuve en cours. Restez concentrés.';

echo json_encode([
    'numeroEpreuve' => $numeroEpreuve,
    'titre' => $epreuve['titre'],
    'messageBot' => $messageIntro,
    'speaker' => 'DSIN'
]);
