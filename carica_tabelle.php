<?php
    require_once 'database.php';
    //riprendo la sessione per l'email, così da ricavare il dipendente
    session_start();
    header('Content-Type: application/json');

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));
    $email = mysqli_real_escape_string($conn, $_SESSION['email']);
    $query_zoo = "SELECT z.id AS id
                        FROM dipendente d JOIN impiego i ON d.id=i.dipendente JOIN zoo z ON z.id=i.zoo JOIN dati_anagrafici d_a ON d_a.dipendente=d.id
                        WHERE email='$email'";
    $res = mysqli_query($conn, $query_zoo);
    $entry = mysqli_fetch_assoc($res);
    $zoo =(int) $entry['id'];

    if(!isset($_GET['q'])){
        $query_nome = "SELECT d_a.nome AS nome, z.nome AS zoo
                        FROM dipendente d JOIN impiego i ON d.id=i.dipendente JOIN zoo z ON z.id=i.zoo JOIN dati_anagrafici d_a ON d_a.dipendente=d.id
                        WHERE email='$email'";
        $res = mysqli_query($conn, $query_nome);
        if($entry = mysqli_fetch_assoc($res)) {
            $nome_zoo[] = array('nome'=>$entry['nome'], 'zoo'=>$entry['zoo']);
            echo json_encode($nome_zoo);
        }
    }
    else
        switch($_GET['q']){

            case 'recinti_out':
                $query = "SELECT r.descrizione AS descrizione, r.ID AS id, r.n_animali AS n_animali, r.tipo As tipo
                                FROM dipendente d JOIN impiego i ON d.id=i.dipendente JOIN zoo z ON z.id=i.zoo JOIN recinti r ON r.zoo=z.id
                                WHERE email='$email'";
                $res = mysqli_query($conn, $query);
                $array=array();
                while($entry = mysqli_fetch_assoc($res)) {
                    $array[] = array('descrizione'=>$entry['descrizione'], 'id'=>$entry['id'], 'n_animali'=>$entry['n_animali'], 'tipo'=>$entry['tipo']);
                }
                echo json_encode($array);

                break;

            case 'animali_acquatici_out':
                $query = "SELECT a.ID_chip AS id, a.specie AS specie, a.data_acquisizione AS data, a.tipo As tipo, a.recinto AS recinto
                                FROM dipendente d JOIN impiego i ON d.id=i.dipendente JOIN recinti r ON r.zoo=i.zoo join animali_acquatici a on a.zoo=i.zoo and a.recinto = r.id
                                WHERE email='$email'";
                $res = mysqli_query($conn, $query);
                $array=array();
                while($entry = mysqli_fetch_assoc($res)) {
                    $array[] = array('id'=>$entry['id'], 'specie'=>$entry['specie'], 'data'=>$entry['data'], 'tipo'=>$entry['tipo'], 'recinto'=>$entry['recinto']);
                }
                echo json_encode($array);
                break;

            case 'animali_terrestri_out':
                $query = "SELECT a.ID_chip AS id, a.specie AS specie, a.data_acquisizione AS data, a.peso AS peso, a.recinto AS recinto
                                FROM dipendente d JOIN impiego i ON d.id = i.dipendente JOIN recinti r ON r.zoo=i.zoo join animali_terrestri a on a.zoo=i.zoo and a.recinto = r.id
                                WHERE email='$email'";
                $res = mysqli_query($conn, $query);
                $array=array();
                while($entry = mysqli_fetch_assoc($res)) {
                    $array[] = array('id'=>$entry['id'], 'specie'=>$entry['specie'], 'data'=>$entry['data'], 'peso'=>$entry['peso'], 'recinto'=>$entry['recinto']);
                }
                echo json_encode($array);
                break;    

                case 'recinti_in':
                    $tipo=mysqli_real_escape_string($conn, $_GET['tipo']);
                    $descrizione=mysqli_real_escape_string($conn, $_GET['descrizione']);
                    $query = "INSERT INTO recinti (id,zoo,tipo,n_animali,descrizione) VALUES(0,$zoo,'$tipo',0,'$descrizione')";
                    if(!mysqli_query($conn, $query)){
                        echo'qualcosa è andato storto';
                    }
                    else
                        echo 'true';
                    break;

                case 'animali_acquatici_in':
                    $tipo=mysqli_real_escape_string($conn, $_GET['tipo']);
                    $data=mysqli_real_escape_string($conn, $_GET['data']);
                    $specie=mysqli_real_escape_string($conn, $_GET['specie']);
                    $recinto=(int)mysqli_real_escape_string($conn, $_GET['recinto']);
                    if(!strcmp($tipo,'acqua salata'))
                        $tipo_bool=false;
                    else
                        $tipo_bool=true;
                    $query = "INSERT INTO animali_acquatici (id_chip,specie,data_acquisizione,tipo,recinto,zoo) VALUES(0,'$specie','$data',$tipo_bool,$recinto,$zoo)";
                    if(!mysqli_query($conn, $query)){
                        echo mysqli_error($conn);
                    }
                    else
                        echo 'true';
                    break;

                case 'animali_terrestri_in':
                    $peso=(float)mysqli_real_escape_string($conn, $_GET['peso']);
                    $data=mysqli_real_escape_string($conn, $_GET['data']);
                    $specie=mysqli_real_escape_string($conn, $_GET['specie']);
                    $recinto=(int)mysqli_real_escape_string($conn, $_GET['recinto']);
                    $query = "INSERT INTO animali_terrestri (id_chip,specie,data_acquisizione,peso,recinto,zoo) VALUES(0,'$specie','$data',$peso,$recinto,$zoo)";
                    if(!mysqli_query($conn, $query)){
                        echo mysqli_error($conn);
                    }
                    else
                        echo 'true';
                    break;

        }
        mysqli_close($conn);

?>