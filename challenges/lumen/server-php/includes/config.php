<?php
/**
 * Configuration du serveur LUMEN
 */

// Clé API Groq (DOIT être définie en variable d'environnement)
$groqApiKey = getenv('GROQ_API_KEY');
if (!$groqApiKey) {
    error_log('GROQ_API_KEY non définie - le chat LUMEN ne fonctionnera pas');
}
define('GROQ_API_KEY', $groqApiKey ?: '');
define('GROQ_API_URL', 'https://api.groq.com/openai/v1/chat/completions');
define('GROQ_MODEL', 'llama-3.3-70b-versatile');

// Headers CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Gestion des requêtes OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
