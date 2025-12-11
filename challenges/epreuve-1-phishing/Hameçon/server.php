<?php

header('Content-Type: application/json');

// Récupération de l’ID envoyé par le client
if (!isset($_GET['mail_id'])) {
    echo json_encode([
        "success" => false,
        "error" => "Aucun ID reçu"
    ]);
    exit;
}

$mailId = $_GET['mail_id'];

// ID DU VRAI MAIL SUSPECT (CELUI AVEC phishing: true)
$phishingId = 'm4'; 

// Vérification
if ($mailId === $phishingId) {
    echo json_encode([
        "success" => true
    ]);
} else {
    echo json_encode([
        "success" => false
    ]);
}
