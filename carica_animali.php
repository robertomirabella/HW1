<?php
    require_once 'database.php';
    
    header('Content-Type: application/json');

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));
    $query = "SELECT * FROM specie";
    $res = mysqli_query($conn, $query);

    $animaliArray = array();
    while($entry = mysqli_fetch_assoc($res)) {
        // Scorro i risultati ottenuti e creo l'elenco di animali
        $animaliArray[] = array('titolo' => $entry['specie'], 'immagine' => $entry['foto'], 'descrizione' => $entry['descrizione']);
    }
    echo json_encode($animaliArray);
    mysqli_close($conn);

?>