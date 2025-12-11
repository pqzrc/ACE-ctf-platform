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
    5 => "ACE{X5P0PU9M2}",
    6 => "ACE{DT90KGNEF}",
    7 => "ACE{R3S34U7NK}",
    8 => "ACE{L8TS0UT5G}",
    9 => "ACE{R4044Z0MF}",
    10 => "ACE{FID6MX78S}"
];

// Messages DSIN d'introduction
$MESSAGES_DSIN_INTRO = [
    1 => "Nous pensons que L.U.M.E.N. a infiltré notre réseau via un e-mail piégé reçu par l’un de nos agents.
Analysez la boîte mail fournie et identifiez le message utilisé pour l’intrusion.
Signalez-le dès que vous l’avez trouvé. Nous devons comprendre sa porte d’entrée.",
    2 => "Le compte compromis a été isolé, mais L.U.M.E.N. y conserve encore un accès.
Votre objectif : reprendre le contrôle en définissant un nouveau mot de passe.
Ce compte relève d’un niveau de sécurité élevé ; la politique associée est extrêmement stricte.
Créez un mot de passe qui respecte toutes les exigences imposées par le système.",
    3 => "Le système exige une vérification humaine avant l’accès au tableau de bord.
Le captcha affiché est clairement altéré : réactions instables et comportements inhabituels.
L.U.M.E.N. a probablement saboté ce module lorsqu’elle disposait encore d’un accès administratif.
Nous allons devoir passer ce captcha, malgré son état, pour accéder au tableau de bord.",
    4 => "Manifestement, l’accès au tableau de bord est encore bloqué.
L.U.M.E.N. a ajouté un QCM sur l’université avant d’autoriser l’ouverture du portail.
Nous ne savons pas vraiment ce qu’elle cherche à prouver, mais les questions doivent être simples.
Nous devrions pouvoir franchir cette étape sans difficulté.",
    5 => "Nous accédons enfin au panneau de contrôle… mais l’interface est inutilisable.
L.U.M.E.N. a injecté une multitude de pop-ups malveillants qui saturent l’écran et bloquent toute action.
Impossible d’interagir correctement tant que ces fenêtres restent actives.
Il va falloir restaurer une interface propre avant de poursuivre.",
    6 => "Le panneau de contrôle est enfin opérationnel.
Nous pouvons accéder aux documents permettant de retracer les événements…
Mais une grande partie des fichiers apparaît cryptée ou altérée.
Nous devons absolument comprendre ce qu’il s’est passé, surtout sur des systèmes comme le réseau.
Il va falloir décrypter ces données pour obtenir une vision claire de la situation.",
    7 => "Les informations décryptées confirment l’ampleur des dégâts : le réseau de l’université est fortement désorganisé.
Plusieurs services sont inaccessibles, la messagerie est instable et de nombreuses coupures perturbent les communications.
Nous devons rétablir la structure du réseau en exécutant la bonne séquence de commandes.",
    8 => "Le rétablissement du réseau remet en service plusieurs modules du tableau de bord.
Ils sont à nouveau accessibles : il faudrait les consulter, certaines informations pourraient nous etre utile",
    9 => "Nothing to say",
    10 => "Nothing to say"
];


// Messages DSIN de succès
$MESSAGES_DSIN_SUCCESS = [
    1 => "L'e-mail identifié était bien à l'origine du compromis.
Le compte touché appartenait à un membre clé de la DSIN, ce qui a permis à L.U.M.E.N. d'élargir ses accès de manière significative.
Rappel : la plupart des intrusions commencent par un message piégé, même lorsqu'elles visent des comptes internes sensibles.
Nous pouvons poursuivre avec la procédure de récupération du compte compromis.
Flag : ACE{P7MOZXL4M}",
    2 => "Le nouveau mot de passe a été validé : nous reprenons enfin le contrôle du compte compromis.
Rappel de sécurité : privilégiez des mots de passe longs, uniques, et incluant minuscules, majuscules, chiffres et caractères spéciaux. Évitez les informations personnelles et la réutilisation, principales sources de compromission.
Nous allons maintenant pouvoir accéder au dashboard interne pour analyser en détail l'étendue des violations d'accès et la gravité de la situation.
Flag : ACE{M0Z60XOXS}",
    3 => "La vérification humaine est validée. Malgré les altérations de L.U.M.E.N., l'accès est désormais ouvert.
Nous allons pouvoir entrer dans le tableau de bord et examiner les logs pour comprendre ce qu'il s'est passé.
Flag : ACE{CDHWGUS2M}",
    4 => "Très bien, le test est validé.
Les questions étaient peut-être un peu plus complexes que prévu…
Il semble que L.U.M.E.N. cherchait, à travers ce QCM, à prouver que l'humain serait incapable de répondre correctement à des questions sur sa propre institution.
Espérons qu'il n'y ait pas d'autre barrière et que nous puissions enfin accéder au tableau de bord.
Flag : ACE{QRSK63IHW}",
    5 => "Parfait, l'interface est nettoyée.
Elle paraît enfin utilisable et les pop-ups ne perturbent plus le panneau de contrôle.
Nous allons pouvoir commencer à évaluer l'ampleur des dégâts laissés par L.U.M.E.N.
Flag : ACE{X5P0PU9M2}",
    6 => "Parfait, les données ont été décryptées.
Nous savons désormais exactement ce qu'il s'est passé, en particulier sur les systèmes les plus sensibles.
Avec ces informations, nous pourrons déterminer plus clairement la marche à suivre et les actions à entreprendre pour rétablir la situation.",
    7 => "Parfait, la séquence de commandes a été validée.
Le réseau est rétabli et nous commençons enfin à reprendre la main, étape par étape.
Si tout continue dans ce sens, nous pourrions peut-être réussir à reprendre le contrôle à temps.
Flag : ACE{R3S34U7NK}",
    8 => "Très bien, les informations sont enfin apparues.
Il s'agirait d'indications de localisation ainsi que des instructions pour activer un dispositif capable de régler notre problème.
Nous ne devons pas perdre de temps : il faut aller le récupérer au plus vite.
Flag : ACE{L8TS0UT5G}",
    9 => "Nothing to say",
    10 => "Nothing to say"
];




// Fonction pour générer le prompt d'échec
function getFailurePrompt($numeroEpreuve, $contexte) {
    $prompts = [
        1 => "Contexte de l'épreuve : {$contexte}\nLes joueurs n'ont pas réussi a trouvé l'email de phishing que tu as créé. En max 50 mots.",
        2 => "Contexte de l'épreuve : {$contexte}\nNothing to say. En max 50 mots.",
        3 => "Contexte de l'épreuve : {$contexte}\nLes joueurs ont échoué le captcha saboté par par toi. En max 50 mots.",
        4 => "Contexte de l'épreuve : {$contexte}\nL'équipe n'a pas atteint le score minimal au QCM provocant que tu as fais. En max 50 mots.",
        5 => "Contexte de l'épreuve : {$contexte}\nNothing to say. En max 50 mots.",
        6 => "Contexte de l'épreuve : {$contexte}\nNothing to say. En max 50 mots.",
        7 => "Contexte de l'épreuve : {$contexte}\nLes joueurs n'ont pas réussi à remettre correctement les commandes réseau dans l'ordre logique. En max 50 mots.",
        8 => "Contexte de l'épreuve : {$contexte}\nNothing to say. En max 50 mots.",
        9 => "Contexte de l'épreuve : {$contexte}\nNothing to say. En max 50 mots.",
        10 => "Contexte de l'épreuve : {$contexte}\nNothing to say. En max 50 mots."
    ];

    return $prompts[$numeroEpreuve] ?? "Contexte : {$contexte}\nL'épreuve a échoué. En max 50 mots.";
}