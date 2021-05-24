<?php

    $key='606bd8c390ca2d40cbc30576f2c175bf';

    $query = urlencode($_GET["q"]);
    $url = 'https://api.openweathermap.org/data/2.5/weather?q='.$query.'&lang=it&units=metric&appid='.$key;
    
    $ch = curl_init($url);
    // faccio ritornare il valore
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    //invio la richiesta
    $data = curl_exec($ch);
    $json = json_decode($data, true);
    curl_close($ch);
    echo json_encode($json);

?>