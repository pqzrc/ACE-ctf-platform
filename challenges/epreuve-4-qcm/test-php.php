<?php
echo "PHP fonctionne !<br>";
echo "Version PHP : " . phpversion() . "<br>";
echo "Dossier : " . __DIR__ . "<br>";

if (isset($_GET['test'])) {
    echo "Paramètre GET reçu : " . $_GET['test'] . "<br>";
    echo json_encode(['status' => 'success', 'message' => 'Test API OK']);
}
?>