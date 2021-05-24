<?php
    require_once 'database.php';
    
    if (!isset($_GET["q"])) {
        echo "Non dovresti essere qui";
        exit;
    }


    header('Content-Type: application/json');
     
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $codice_fiscale = mysqli_real_escape_string($conn, $_GET["q"]);
    $query = "SELECT dati_anagrafici.cf AS cf FROM dipendente JOIN dati_anagrafici ON dipendente.ID=dati_anagrafici.dipendente WHERE cf = '$codice_fiscale'";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));

    echo json_encode(array('exists' => mysqli_num_rows($res) > 0 ? true : false));

    mysqli_close($conn);
?>