<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Fonction de chiffrement ROT13
function rot13Encrypt($text) {
    return str_rot13($text);
}

// Chemin vers le dossier des logs
$logsDirectory = '../logs/';

// Gestion de l'action demandée
$action = isset($_GET['action']) ? $_GET['action'] : 'list';

if ($action === 'list') {
    // Lister tous les fichiers de logs et crypter leurs noms
    $logFiles = [];
    
    if (is_dir($logsDirectory)) {
        $files = scandir($logsDirectory);
        
        foreach ($files as $file) {
            // Ignorer . et .. et ne garder que les fichiers .txt
            if ($file !== '.' && $file !== '..' && pathinfo($file, PATHINFO_EXTENSION) === 'txt') {
                $filename = pathinfo($file, PATHINFO_FILENAME);
                
                // Crypter le nom du fichier
                $encryptedName = rot13Encrypt($filename);
                
                // Obtenir des informations sur le fichier
                $filepath = $logsDirectory . $file;
                $filesize = filesize($filepath);
                $modifiedTime = filemtime($filepath);
                
                $logFiles[] = [
                    'id' => $encryptedName,
                    'encrypted_name' => $encryptedName,
                    'size' => $filesize,
                    'modified' => date('Y-m-d H:i:s', $modifiedTime)
                ];
            }
        }
    }
    
    echo json_encode([
        'success' => true,
        'files' => $logFiles,
        'count' => count($logFiles)
    ]);
    
} elseif ($action === 'read') {
    // Lire le contenu d'un fichier spécifique
    $encryptedName = isset($_GET['file']) ? $_GET['file'] : '';
    
    if (empty($encryptedName)) {
        echo json_encode([
            'success' => false,
            'error' => 'Nom de fichier manquant'
        ]);
        exit;
    }
    
    // Déchiffrer le nom du fichier pour trouver le fichier original
    $originalName = rot13Encrypt($encryptedName); // ROT13 est symétrique
    $filepath = $logsDirectory . $originalName . '.txt';
    
    if (!file_exists($filepath)) {
        echo json_encode([
            'success' => false,
            'error' => 'Fichier non trouvé'
        ]);
        exit;
    }
    
    // Lire le contenu du fichier
    $content = file_get_contents($filepath);
    
    // Crypter le contenu
    $encryptedContent = rot13Encrypt($content);
    
    echo json_encode([
        'success' => true,
        'file' => $encryptedName,
        'encrypted_content' => $encryptedContent,
        'size' => strlen($content)
    ]);
    
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Action non reconnue'
    ]);
}

?>
