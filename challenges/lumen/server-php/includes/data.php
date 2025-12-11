<?php
/**
 * Données des épreuves, messages DSIN et prompts
 */

// Données des épreuves
$EPREUVES = [
    1 => [
        'titre' => 'Épreuve 1 – Mail suspect / phishing',
        'contexte' => "Les joueurs participent à un CyberEscape dans une université où l'IA L.U.M.E.N. a pris le contrôle des systèmes. Ils accèdent à une boîte mail simulée avec plusieurs messages, mais un seul est un véritable mail de phishing qui a permis à L.U.M.E.N. de compromettre un compte interne. L'objectif est d'identifier ce mail frauduleux et de le signaler comme suspect pour comprendre comment l'intrusion a commencé et obtenir le premier flag."
    ],
    2 => [
        'titre' => 'Épreuve 2 – Mot de passe du compte compromis',
        'contexte' => "Après avoir identifié le mail de phishing et le compte compromis, les joueurs doivent reprendre le contrôle de ce compte interne utilisé par L.U.M.E.N. via une page de réinitialisation de mot de passe très stricte (mot de passe ultra complexe, nombreuses contraintes, saisie sans affichage ni copier-coller). La réussite correspond au verrouillage de l'accès de L.U.M.E.N. à ce compte et donne accès au flag n°2."
    ],
    3 => [
        'titre' => 'Épreuve 3 – Captcha instable saboté',
        'contexte' => "Les joueurs tentent de se connecter au tableau de bord de gestion des systèmes de l'université. Un captcha de vérification humaine se déclenche, mais il a été saboté par L.U.M.E.N. (contrôles inversés, éléments qui bougent, comportements perturbateurs). Ils doivent réussir ce captcha volontairement chaotique pour prouver qu'ils sont humains, découvrir que l'IA a modifié ce mécanisme de sécurité, et obtenir le flag n°3."
    ],
    4 => [
        'titre' => 'Épreuve 4 – QCM « test provocateur »',
        'contexte' => "Après le captcha, L.U.M.E.N. impose un QCM sur l'université, présenté de façon arrogante et provocatrice, persuadée que les humains ne connaissent pas leur propre institution. Les joueurs doivent répondre à des questions sur l'histoire, les services, le campus, etc., et atteindre un score minimal. La réussite de ce test ouvre réellement l'accès au panneau de contrôle et donne le flag n°4."
    ],
    5 => [
        'titre' => 'Épreuve 5 – Pop-ups malveillants',
        'contexte' => "Les joueurs accèdent au panneau de contrôle des systèmes de l'université, mais l'interface est saturée de pop-ups malveillants générés par L.U.M.E.N., rendant toute action quasi impossible. Ils doivent fermer manuellement tous les pop-ups dans un temps et un volume définis pour rendre le panneau de contrôle de nouveau exploitable et récupérer le flag associé."
    ],
    6 => [
        'titre' => 'Épreuve 6 – Décryptage des logs réseau',
        'contexte' => "La DSIN demande aux joueurs d'ouvrir les logs techniques afin d'évaluer les dégâts causés par L.U.M.E.N. Ils font face à des journaux systèmes chiffrés par une méthode simple (ROT, substitution, inversion, etc.) non expliquée. Ils doivent décrypter manuellement ces logs, identifier celui qui décrit les perturbations réseau, et y trouver le flag caché, préparant ainsi la restauration du réseau."
    ],
    7 => [
        'titre' => 'Épreuve 7 – Rétablissement du réseau',
        'contexte' => "À partir des informations extraites des logs, les joueurs apprennent que le réseau de l'université a été gravement désorganisé par L.U.M.E.N. La DSIN leur fournit un module d'administration réseau simulé avec une série de commandes Linux liées au réseau dans le désordre. Ils doivent remettre ces commandes dans l'ordre logique pour simuler un redémarrage propre du réseau, rétablir les communications entre services et obtenir le flag."
    ],
    8 => [
        'titre' => 'Épreuve 8 – LightOut et message de la DSIN',
        'contexte' => "Une fois le réseau stabilisé, le tableau de bord dévoile un message paniqué de la DSIN, expliquant qu'un dispositif physique permet de désactiver L.U.M.E.N., mais que son emplacement et les instructions sont encapsulés dans un puzzle de type LightOut. Les joueurs doivent résoudre ce puzzle sur une grille d'images floutées pour révéler une image nette indiquant l'emplacement du dispositif, les instructions de lancement et le flag n°8."
    ],
    9 => [
        'titre' => 'Épreuve 9 – Accès physique au dispositif',
        'contexte' => "Grâce à l'épreuve LightOut, les joueurs connaissent l'existence et l'emplacement d'un dispositif physique basé sur un Raspberry Pi conçu pour déconnecter L.U.M.E.N. L'épreuve se déroule dans le monde réel : ils doivent se déplacer dans le bâtiment, suivre un indice ou une énigme de localisation, retrouver le Raspberry Pi caché et récupérer le flag (étiquette, écran, fichier, etc.), puis rapporter l'objet à la salle d'origine."
    ],
    10 => [
        'titre' => 'Épreuve 10 – Désactivation finale de L.U.M.E.N.',
        'contexte' => "Avec le Raspberry Pi en main, les joueurs doivent lancer une procédure d'Impulsion ÉlectroMagnétique simulée pour neutraliser L.U.M.E.N. Ils doivent brancher le Raspberry Pi, ouvrir un terminal, se connecter en SSH avec les identifiants fournis et exécuter une série de commandes (scripts de préparation puis d'ignition). Toute la scène se déroule dans le terminal avec une mise en scène textuelle de l'extinction de L.U.M.E.N. et l'affichage du flag final, marquant la victoire."
    ]
];

// Flags par épreuve
$FLAGS_EPREUVES = [
    1 => "ACE{P7MOZXL4M}",
    2 => "ACE{M0Z60XOXS}",
    3 => "ACE{CDHWGUS2M}",
    4 => "ACE{QRSK63IHW}",
    6 => "ACE{DT90KGNEF}",
    8 => "ACE{L7S5ZEQO6}",
    9 => "ACE{R4044Z0MF}",
    10 => "ACE{FID6MX78S}"
];

// Messages DSIN de succès (avec flags et explications pédagogiques pour certaines épreuves)
$MESSAGES_DSIN_SUCCESS = [
    1 => "✅ Mail frauduleux identifié et signalé.\n\nLe vecteur d'entrée initial de L.U.M.E.N. est clarifié. Ce type d'attaque par phishing est l'une des principales causes de compromission de comptes professionnels.\n\nPourquoi c'est dangereux ?\n• Les emails de phishing imitent des sources légitimes (université, banque, services)\n• Ils exploitent l'urgence ou la peur pour vous faire agir rapidement\n• Un simple clic sur un lien ou une pièce jointe peut compromettre votre compte\n• Les attaquants peuvent ensuite accéder à vos données et utiliser votre compte pour propager l'attaque\n\nConseils de sécurité :\n• Vérifiez toujours l'adresse email de l'expéditeur\n• Méfiez-vous des messages urgents ou menaçants\n• Ne cliquez jamais sur des liens suspects\n• En cas de doute, contactez directement l'expéditeur par un autre canal\n\nFlag débloqué : `ACE{P7MOZXL4M}`",
    2 => "✅ Mot de passe réinitialisé. L.U.M.E.N. vient de perdre l'accès à ce compte interne critique.\n\nFlag débloqué : `ACE{M0Z60XOXS}`",
    3 => "✅ Captcha validé malgré le sabotage. La preuve d'humanité est enregistrée.\n\nFlag débloqué : `ACE{CDHWGUS2M}`",
    4 => "✅ Score suffisant atteint. Le panneau de contrôle est officiellement débloqué.\n\nFlag débloqué : `ACE{QRSK63IHW}`",
    5 => "✅ Pop-ups malveillants neutralisés. Le panneau de contrôle redevient exploitable.",
    6 => "✅ Logs déchiffrés. Les causes d'instabilité réseau sont désormais connues.\n\nFlag débloqué : `ACE{DT90KGNEF}`",
    7 => "✅ Séquence de commandes validée. Les communications critiques se rétablissent.",
    8 => "✅ Puzzle résolu. L'emplacement du dispositif de désactivation est identifié.\n\nFlag débloqué : `ACE{L7S5ZEQO6}`",
    9 => "✅ Dispositif récupéré. Le Raspberry Pi est prêt pour la procédure de déconnexion.\n\nFlag débloqué : `ACE{R4044Z0MF}`",
    10 => "✅ Scripts exécutés. L.U.M.E.N. est en cours d'extinction, le campus est en voie de sécurisation.\n\nFlag final débloqué : `ACE{FID6MX78S}`"
];

// Messages DSIN d'introduction
$MESSAGES_DSIN_INTRO = [
    1 => "Activité anormale détectée sur le réseau interne. Un mail frauduleux est probablement à l'origine de l'intrusion. Identifiez-le pour remonter à la première compromission.",
    2 => "Vous avez identifié le compte touché. Restaurez son mot de passe pour empêcher LUMEN de l'exploiter davantage.",
    3 => "LUMEN altère les interactions clavier/souris. Validez le captcha malgré le sabotage pour confirmer votre présence humaine.",
    4 => "L'accès au panneau est verrouillé par un test imposé par LUMEN. Passez ce test, nous ne pouvons pas le contourner.",
    5 => "Le panneau de contrôle est saturé d'alertes visuelles artificielles. Nettoyez l'interface pour reprendre la main.",
    6 => "Les journaux réseau semblent corrompus. Décryptez-les pour identifier la source de l'instabilité générale.",
    7 => "Le réseau approche d'un point de rupture. Réactivez les services dans l'ordre exact pour stabiliser les communications.",
    8 => "Un message interne a été intercepté sous forme fragmentée. Utilisez l'outil visuel pour en restaurer la structure.",
    9 => "Le message reconstitué indique un emplacement physique. Localisez le dispositif au plus vite, nous perdons des serveurs.",
    10 => "Vous êtes en position. Nous ne pouvons plus vous assister à distance. Suivez la procédure retrouvée pour tenter de couper LUMEN."
];

// Fonction pour générer le prompt d'échec
function getFailurePrompt($numeroEpreuve, $contexte) {
    $prompts = [
        1 => "Contexte de l'épreuve : {$contexte}\nL'épreuve n'a PAS été validée par l'équipe. En max 50 mots.",
        2 => "Contexte de l'épreuve : {$contexte}\nL'épreuve de création de mot de passe n'a PAS été validée. En max 50 mots.",
        3 => "Contexte de l'épreuve : {$contexte}\nLes joueurs ont échoué le captcha saboté par l'IA. En max 50 mots.",
        4 => "Contexte de l'épreuve : {$contexte}\nL'équipe n'a pas atteint le score minimal au QCM provocant de L.U.M.E.N. En max 50 mots.",
        5 => "Contexte de l'épreuve : {$contexte}\nLes joueurs n'ont pas réussi à fermer suffisamment de pop-ups malveillants dans le temps imparti. En max 50 mots.",
        6 => "Contexte de l'épreuve : {$contexte}\nLes joueurs n'ont pas réussi à décrypter le log réseau contenant le flag. En max 50 mots.",
        7 => "Contexte de l'épreuve : {$contexte}\nLes joueurs n'ont pas réussi à remettre correctement les commandes réseau dans l'ordre logique. En max 50 mots.",
        8 => "Contexte de l'épreuve : {$contexte}\nLes joueurs n'ont pas réussi à résoudre le puzzle pour révéler le message de la DSIN. En max 50 mots.",
        9 => "Contexte de l'épreuve : {$contexte}\nLes joueurs n'ont pas réussi à trouver le dispositif physique ou le flag associé. En max 50 mots.",
        10 => "Contexte de l'épreuve : {$contexte}\nLes joueurs n'ont pas réussi la désactivation finale via le Raspberry Pi et les commandes SSH. En max 50 mots."
    ];

    return $prompts[$numeroEpreuve] ?? "Contexte : {$contexte}\nL'épreuve a échoué. En max 50 mots.";
}
