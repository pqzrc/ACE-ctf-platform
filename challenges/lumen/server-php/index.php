<?php
/**
 * Point d'entrée principal du serveur LUMEN
 * Routeur pour les API et fichiers statiques
 */

// Headers CORS pour les API
function setCorsHeaders() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

// Gestion des requêtes OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    setCorsHeaders();
    http_response_code(200);
    exit;
}

// Récupérer l'URI
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Types MIME pour fichiers statiques
$mimeTypes = [
    'html' => 'text/html',
    'css' => 'text/css',
    'js' => 'application/javascript',
    'json' => 'application/json',
    'png' => 'image/png',
    'jpg' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'gif' => 'image/gif',
    'svg' => 'image/svg+xml',
    'ico' => 'image/x-icon',
    'woff' => 'font/woff',
    'woff2' => 'font/woff2',
    'ttf' => 'font/ttf'
];

// Routage
switch (true) {
    // POST /api/chatbot - Succès/Échec d'épreuve
    case preg_match('#^/api/chatbot/?$#', $uri) && $_SERVER['REQUEST_METHOD'] === 'POST':
        setCorsHeaders();
        require __DIR__ . '/api/chatbot.php';
        break;

    // GET /api/dsin-intro/{numero} - Intro DSIN
    case preg_match('#^/api/dsin-intro/(\d+)/?$#', $uri, $matches):
        setCorsHeaders();
        $_GET['epreuve'] = $matches[1];
        require __DIR__ . '/api/dsin-intro.php';
        break;

    // GET /api/dsin-intro?epreuve=N - Intro DSIN (alternative)
    case preg_match('#^/api/dsin-intro/?$#', $uri) && $_SERVER['REQUEST_METHOD'] === 'GET':
        setCorsHeaders();
        require __DIR__ . '/api/dsin-intro.php';
        break;

    // POST /api/chat - Discussion libre avec LUMEN
    case preg_match('#^/api/chat/?$#', $uri) && $_SERVER['REQUEST_METHOD'] === 'POST':
        setCorsHeaders();
        require __DIR__ . '/api/chat.php';
        break;

    // API status (JSON)
    case $uri === '/api' || $uri === '/api/':
        setCorsHeaders();
        header('Content-Type: application/json');
        echo json_encode([
            'service' => 'L.U.M.E.N. Chat Server',
            'version' => '1.0.0',
            'status' => 'online',
            'endpoints' => [
                'POST /api/chatbot' => 'Gestion succès/échec épreuves',
                'GET /api/dsin-intro/{n}' => 'Message intro DSIN par épreuve',
                'POST /api/chat' => 'Discussion libre avec LUMEN'
            ]
        ]);
        break;

    // Fichiers statiques dans /public
    case preg_match('#^/public/(.+)$#', $uri, $matches):
        $filePath = __DIR__ . '/public/' . $matches[1];
        if (file_exists($filePath) && is_file($filePath)) {
            $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
            $contentType = $mimeTypes[$ext] ?? 'application/octet-stream';
            header('Content-Type: ' . $contentType);
            header('Cache-Control: public, max-age=3600');
            readfile($filePath);
        } else {
            http_response_code(404);
            echo '404 - File not found';
        }
        break;

    // Widget LUMEN (alias pour faciliter l'intégration)
    case preg_match('#^/widget/lumen-widget\.js$#', $uri):
        $filePath = __DIR__ . '/public/widget/lumen-widget.js';
        if (file_exists($filePath)) {
            header('Content-Type: application/javascript');
            header('Cache-Control: public, max-age=3600');
            readfile($filePath);
        } else {
            http_response_code(404);
            echo '404 - Widget not found';
        }
        break;

    // Page d'accueil - Retourne uniquement le statut API (pas d'UI)
    case $uri === '/' || $uri === '/index.php' || $uri === '/index.html':
        setCorsHeaders();
        header('Content-Type: application/json');
        echo json_encode([
            'service' => 'L.U.M.E.N. Chat Server',
            'version' => '1.0.0',
            'status' => 'online',
            'note' => 'Interface web supprimée. Utilisez le widget dans les challenges.',
            'endpoints' => [
                'POST /api/chatbot' => 'Gestion succès/échec épreuves',
                'GET /api/dsin-intro/{n}' => 'Message intro DSIN par épreuve',
                'POST /api/chat' => 'Discussion libre avec LUMEN',
                'GET /public/widget/lumen-widget.js' => 'Widget JavaScript pour intégration'
            ]
        ]);
        break;

    // 404
    default:
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Endpoint non trouvé', 'uri' => $uri]);
}
