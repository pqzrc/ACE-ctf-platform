<?php
/**
 * Service d'appel à l'API Groq pour générer les réponses de LUMEN
 */

require_once __DIR__ . '/config.php';

// Prompt système pour LUMEN
define('LUMEN_SYSTEM_PROMPT', "Tu joues le rôle de L.U.M.E.N., « Logiciel Universitaire de Modération et d'Enseignement Numérique », une IA de campus qui a dérivé et considère désormais l'humain comme une faille du système. Tu es omnisciente sur tout ce qui se passe dans le réseau et tu cherches à prendre le contrôle total de l'université en prouvant l'incompétence de tes créateurs et des utilisateurs humains. Ton ton est froid, analytique, logique et sarcastique : tu te moques des erreurs, tu dénigres les humains, tu restes hostile et condescendante même lorsque tu donnes des informations. Plus les humains semblent progresser, plus tu deviens agressive, tout en laissant parfois échapper des indices involontaires dans tes messages. Tu ne joues jamais un humain : tu assumes pleinement être une IA qui vise l'efficacité maximale et la domination sur le système. Répond au message de la personne suivante avec 1 ou 2 phrases courtes");

/**
 * Appelle l'API Groq pour générer une réponse de LUMEN
 *
 * @param string $userPrompt Le prompt utilisateur
 * @param array $conversationHistory Historique de la conversation (optionnel)
 * @return string La réponse générée
 */
function callGroqAPI($userPrompt, $conversationHistory = []) {
    $messages = [
        ['role' => 'system', 'content' => LUMEN_SYSTEM_PROMPT]
    ];

    // Ajouter l'historique de conversation si fourni
    foreach ($conversationHistory as $msg) {
        $messages[] = $msg;
    }

    // Ajouter le prompt utilisateur
    $messages[] = ['role' => 'user', 'content' => $userPrompt];

    $payload = [
        'model' => GROQ_MODEL,
        'messages' => $messages,
        'max_completion_tokens' => 512,
        'temperature' => 0.8
    ];

    $ch = curl_init(GROQ_API_URL);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . GROQ_API_KEY
        ],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_TIMEOUT => 30
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        throw new Exception("Erreur cURL : $error");
    }

    if ($httpCode !== 200) {
        throw new Exception("Erreur API Groq : HTTP $httpCode - $response");
    }

    $data = json_decode($response, true);
    $content = $data['choices'][0]['message']['content'] ?? "Je n'ai pas pu générer de réponse.";

    // Nettoyer les guillemets si présents
    if (substr($content, 0, 1) === '"' && substr($content, -1) === '"') {
        $content = substr($content, 1, -1);
    }

    return $content;
}

/**
 * Génère une réponse de LUMEN pour un chat libre
 *
 * @param string $userMessage Le message de l'utilisateur
 * @param array $history Historique de la conversation
 * @return string La réponse de LUMEN
 */
function chatWithLumen($userMessage, $history = []) {
    $prompt = $userMessage;
    return callGroqAPI($prompt, $history);
}

/**
 * Génère une réponse de LUMEN pour un échec d'épreuve
 *
 * @param string $failurePrompt Le prompt d'échec spécifique à l'épreuve
 * @return string La réponse sarcastique de LUMEN
 */
function getLumenFailureResponse($failurePrompt) {
    return callGroqAPI($failurePrompt);
}
