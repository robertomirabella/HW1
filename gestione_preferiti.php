<?php

    if(!isset($_GET['tipo'])){
        echo "Non dovresti essere qui";
        exit;
    }
    session_start();
    header('Content-Type: application/json');

    if(!isset($_SESSION['preferiti']))
        $_SESSION['preferiti']='';

    $tipo = $_GET['tipo'];

    switch($tipo){
        case 'aggiungi':
            $value = $_GET['value'];
            $_SESSION['preferiti'] = $_SESSION['preferiti'] . $value . '|';
            break;
        case 'rimuovi':
            $value = $_GET['value'];
            $_SESSION['preferiti']=str_replace( $value.'|' , '' , $_SESSION['preferiti']);
            break;
        case 'carica':
            if($_SESSION['preferiti']!=''){
                $array = array();
                $array = explode('|',$_SESSION['preferiti']);
                echo json_encode($array);
            }
            else
                echo json_encode('');
            break;
    }
    
?>