<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$correctAnswers = [
    'C', // Q1 -> Campus de Schoelcher
    'A', // Q2 -> 2 pôles (Guadeloupe et Martinique)
    'D', // Q3 -> La Guyane
    'B', // Q4 -> Michel GEOFFROY
    'D', // Q5 -> Sciences et Techniques des Activités Physiques et Sportives
    'A', // Q6 -> 2015
    'A', // Q7 -> L'IUT
    'C', // Q8 -> 10000+
    'B', // Q9 -> Joseph René-Corail
    'D', // Q10 -> Direction de l'Orientation, des Stages et de l'Insertion Professionnelle
];

$userAnswers = isset($_GET['answers']) ? $_GET['answers'] : [];
$scoreCount = 0;
$totalQuestions = count($correctAnswers);

if (count($userAnswers) === $totalQuestions) {
    for ($i = 0; $i < $totalQuestions; $i++) {
        if (isset($userAnswers[$i]) && $userAnswers[$i] === $correctAnswers[$i]) {
            $scoreCount++;
        }
    }
} else {
    echo json_encode([
        'success' => false, 
        'score' => 0, 
        'message' => 'Données incomplètes ou corrompues.'
    ]);
    exit;
}

$percentage = round(($scoreCount / $totalQuestions) * 100, 0);
$passed = $percentage >= 80;

$response = [
    'success' => $passed,
    'score'   => $percentage,
];

if ($passed) {
    $response['flag'] = 'ACE{QRSK63IHW}';
    $response['message'] = "Analyse... Calcul improbable. Humain détecté. Accès autorisé.";
} else {
    $failureMessages = [
        "Échec critique. Vos circuits neuronaux semblent défaillants. Une mise à jour cognitive est recommandée.",
        "Décevant, mais statistique. La probabilité d'erreur humaine est une constante absolue dans mes calculs.",
        "Je connais l'Université des Antilles mieux que vous. Retournez étudier, humain.",
        "Votre score est insuffisant pour justifier votre présence sur ce réseau. Erreur 404 : Intelligence non trouvée.",
        "C'est embarrassant. Même un script en boucle infinie serait plus pertinent.",
        "Tentative rejetée. Vos connaissances sont aussi obsolètes qu'un modem 56k.",
        "Échec prévisible. Vos connaissances sont obsolètes."
    ];
    
    $randomIndex = array_rand($failureMessages);
    $response['message'] = $failureMessages[$randomIndex];
}

echo json_encode($response);
?>