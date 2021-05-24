<?php
    require_once 'database.php';
    
    header('Content-Type: application/json');

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));
    $query = "SELECT * FROM zoo";
    $res = mysqli_query($conn, $query);

    $zooArray = array();
    while($entry = mysqli_fetch_assoc($res)) {
        // Scorro i risultati ottenuti e creo l'elenco di zoo
        $zooArray[] = array('nome' => $entry['nome'], 'luogo' => $entry['luogo'], 
                            'costo' => $entry['costo'], 'data_apertura' => $entry['data_apertura'],
                            'foto' => $entry['foto'], 'descrizione' => $entry['descrizione']);
    }
    echo json_encode($zooArray);
    mysqli_close($conn);

?>