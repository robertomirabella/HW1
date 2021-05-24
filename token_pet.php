<?php

    $key_pet = 'J85BSOI6SXsJQWqaW5PtHparpYNnUU6Mvms8pLH8OxhaHJkBXn';
    $secret_pet = '9FhFifu5BIUJeaijbO0Kfml8pShaUVYJVA1FLO4e';

    //richiesta token con post
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.petfinder.com/v2/oauth2/token' );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    //body e header della richiesta
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=client_credentials&client_id='.$key_pet.'&client_secret='.$secret_pet); 
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded')); 
    $token=json_decode(curl_exec($ch), true);
    curl_close($ch);
    //ritorno il token
    echo json_encode($token);

?>