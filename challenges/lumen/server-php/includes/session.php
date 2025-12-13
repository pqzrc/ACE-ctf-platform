<?php
/**
 * Gestion des sessions par équipe pour isoler les conversations
 * Utilise des fichiers temporaires pour stocker l'historique par équipe
 */

define('SESSION_DIR', __DIR__ . '/../sessions');
define('SESSION_TTL', 3600 * 24); // 24 heures

/**
 * Initialise le répertoire de sessions
 */
function initSessionDir() {
    if (!is_dir(SESSION_DIR)) {
        mkdir(SESSION_DIR, 0755, true);
    }
}

/**
 * Récupère ou crée un identifiant de session pour une équipe
 * 
 * @param string|null $teamId Identifiant d'équipe (peut être null pour session anonyme)
 * @return string Identifiant de session unique
 */
function getSessionId($teamId = null) {
    // Si teamId fourni, l'utiliser comme base
    if ($teamId) {
        return 'team_' . md5($teamId);
    }
    
    // Sinon, utiliser un cookie ou générer un ID unique
    if (isset($_COOKIE['lumen_session'])) {
        return $_COOKIE['lumen_session'];
    }
    
    // Générer un nouvel ID de session
    $sessionId = 'anon_' . bin2hex(random_bytes(16));
    setcookie('lumen_session', $sessionId, time() + SESSION_TTL, '/', '', false, true);
    return $sessionId;
}

/**
 * Récupère l'historique de conversation d'une session
 * 
 * @param string $sessionId Identifiant de session
 * @return array Historique de conversation
 */
function getConversationHistory($sessionId) {
    initSessionDir();
    $file = SESSION_DIR . '/' . $sessionId . '.json';
    
    if (!file_exists($file)) {
        return [];
    }
    
    // Vérifier l'âge du fichier (TTL)
    if (filemtime($file) < (time() - SESSION_TTL)) {
        unlink($file);
        return [];
    }
    
    $content = file_get_contents($file);
    $data = json_decode($content, true);
    
    return $data['history'] ?? [];
}

/**
 * Sauvegarde l'historique de conversation d'une session
 * 
 * @param string $sessionId Identifiant de session
 * @param array $history Historique de conversation
 */
function saveConversationHistory($sessionId, $history) {
    initSessionDir();
    $file = SESSION_DIR . '/' . $sessionId . '.json';
    
    // Limiter l'historique à 50 messages pour éviter les fichiers trop gros
    $history = array_slice($history, -50);
    
    $data = [
        'session_id' => $sessionId,
        'last_update' => time(),
        'history' => $history
    ];
    
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

/**
 * Récupère l'état des épreuves pour une session
 * 
 * @param string $sessionId Identifiant de session
 * @return array État des épreuves (completed, failed, current)
 */
function getEpreuveState($sessionId) {
    initSessionDir();
    $file = SESSION_DIR . '/' . $sessionId . '_epreuves.json';
    
    if (!file_exists($file)) {
        return [
            'completed' => [],
            'failed' => [],
            'current' => null
        ];
    }
    
    if (filemtime($file) < (time() - SESSION_TTL)) {
        unlink($file);
        return [
            'completed' => [],
            'failed' => [],
            'current' => null
        ];
    }
    
    $content = file_get_contents($file);
    $data = json_decode($content, true);
    
    return [
        'completed' => $data['completed'] ?? [],
        'failed' => $data['failed'] ?? [],
        'current' => $data['current'] ?? null
    ];
}

/**
 * Met à jour l'état d'une épreuve pour une session
 * 
 * @param string $sessionId Identifiant de session
 * @param int $epreuveNum Numéro de l'épreuve
 * @param string $status 'completed', 'failed', ou 'current'
 */
function updateEpreuveState($sessionId, $epreuveNum, $status) {
    initSessionDir();
    $file = SESSION_DIR . '/' . $sessionId . '_epreuves.json';
    
    $state = getEpreuveState($sessionId);
    
    if ($status === 'completed') {
        $state['completed'][] = $epreuveNum;
        $state['completed'] = array_unique($state['completed']);
        if (in_array($epreuveNum, $state['failed'])) {
            $state['failed'] = array_diff($state['failed'], [$epreuveNum]);
        }
    } elseif ($status === 'failed') {
        $state['failed'][] = $epreuveNum;
        $state['failed'] = array_unique($state['failed']);
    } elseif ($status === 'current') {
        $state['current'] = $epreuveNum;
    }
    
    $data = [
        'session_id' => $sessionId,
        'last_update' => time(),
        'completed' => array_values($state['completed']),
        'failed' => array_values($state['failed']),
        'current' => $state['current']
    ];
    
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

/**
 * Nettoie les anciennes sessions (appelé périodiquement)
 */
function cleanupOldSessions() {
    initSessionDir();
    $files = glob(SESSION_DIR . '/*.json');
    $now = time();
    
    foreach ($files as $file) {
        if (filemtime($file) < ($now - SESSION_TTL)) {
            unlink($file);
        }
    }
}

