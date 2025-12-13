<?php
// api.php - Validation du captcha et retour du flag
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Récupération sécurisée
$clickSequence = $_GET['clickSequence'] ?? '';
$zone = $_GET['zone'] ?? '';
$valid = $_GET['valid'] ?? '';

// Vérification
if ($clickSequence === 'reverse_ok' && $zone === '3' && $valid === 'true') {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Humanité confirmée. Accès autorisé.",
        "flag" => "ACE{CDHWGUS2M}"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Erreur de validation. Êtes-vous vraiment humain ?"
    ]);
}
?>