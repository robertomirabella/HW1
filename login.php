<?php
    // Verifica che l'utente sia già loggato, in caso positivo va direttamente alla home
    include 'database.php';
    session_start();
    if(isset($_SESSION['email'])) {
        header("Location: portale_dipendenti.php");
    }
    if(isset($_POST['tipo']))
    switch($_POST['tipo']){
        case 'login':
            if (!empty($_POST["email1"]) && !empty($_POST["password1"]) )
            {
                // Connessione al DB
                $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));
                // Preparazione 
                $email = mysqli_real_escape_string($conn, $_POST['email1']);
                $password = mysqli_real_escape_string($conn, $_POST['password1']);

                $query = "SELECT email, password FROM dipendente WHERE email = '$email'";
                $res = mysqli_query($conn, $query) or die(mysqli_error($conn));;
                if (mysqli_num_rows($res) > 0) {

                    $entry = mysqli_fetch_assoc($res);
                    if (password_verify($_POST['password1'], $entry['password'])) {

                        // Imposto una sessione dell'utente
                        $_SESSION["email"] = $entry['email'];
                        header("Location: portale_dipendenti.php");
                        mysqli_free_result($res);
                        mysqli_close($conn);
                        exit;
                    }
                }
                //utente non è stato trovato o password non verificata
                $error1 = "Email e/o password errati.";
            }
            else if (isset($_POST["email1"]) || isset($_POST["password1"])) {
                // Un solo campo impostato
                $error1 = "Inserisci Email e password.";
            }
            break;


        case 'signup':
            if (!empty($_POST["password"]) && !empty($_POST["email"]) && !empty($_POST["codice_fiscale"]) && 
                !empty($_POST["confirm_password"]))
            {
                $error = array();
                $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die(mysqli_error($conn));
                 # CODICE FISCALE
                // Controlla che l'username rispetti il pattern specificato
                if(!preg_match('/^[a-zA-Z0-9]{1,16}$/', $_POST['codice_fiscale'])) {
                    $error[] = "Codice fiscale non valido";
                    echo '<p>0</p>';
                } 
                else {
                    $codice_fiscale = mysqli_real_escape_string($conn, $_POST['codice_fiscale']);
                    // Cerco se il codice fiscale è presente nel DB
                    $query = "SELECT dati_anagrafici.cf AS cf FROM dipendente JOIN dati_anagrafici ON dipendente.ID=dati_anagrafici.dipendente WHERE cf = '$codice_fiscale'";
                    $res = mysqli_query($conn, $query);
                    $a = mysqli_num_rows($res);
                    if ($a !==1) {
                        $error[] = "Codice fiscale non presente, contattare la sezione informatica";
                    }
                }
                # PASSWORD
                if (strlen($_POST["password"]) < 8) {
                    $error[] = "Caratteri password insufficienti";
                } 
                # CONFERMA PASSWORD
                if (strcmp($_POST["password"], $_POST["confirm_password"]) != 0) {
                    $error[] = "Le password non coincidono";
                }
                # EMAIL
                if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                    $error[] = "Email non valida";
                } 
                else {
                    $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
                    $res = mysqli_query($conn, "SELECT email FROM dipendente WHERE email = '$email'");
                    if (mysqli_num_rows($res) > 0) {
                        $error[] = "Email già utilizzata";
                    }
                }
                # REGISTRAZIONE NEL DATABASE
                if (count($error) == 0) {

                    $password = mysqli_real_escape_string($conn, $_POST['password']);
                    $password = password_hash($password, PASSWORD_BCRYPT);

                    $query = "UPDATE dipendente SET password = '$password' , email= '$email' WHERE id = (SELECT dipendente.id AS id FROM dipendente JOIN dati_anagrafici ON dipendente.ID=dati_anagrafici.dipendente WHERE cf = '$codice_fiscale' LIMIT 1)";
                    
                    if (mysqli_query($conn, $query)) {

                        $_SESSION["email"] = $_POST["email"];

                        header("Location: portale_dipendenti.php");
                        exit;
                    } 
                    else {
                        $error[] = "Errore di connessione al Database";
                    }
                }

                mysqli_close($conn);
            }
            else if (isset($_POST["email"])) {
                $error = array("Riempi tutti i campi");
            }

            break;
            

}

?>


<html>
<head>
        <title>Gestione Zoo Home page</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet">     
        <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="css/mhw1.css">
        <link rel="stylesheet" href="css/login.css">
        <script src="scripts/login.js" defer></script>
    </head>

<body>
    <header>
        <nav>
            <div id="links">
                <a href="mhw1.html">Home</a>
                <a href="mhw2.html">Animali</a>
                <a href="elenco_zoo.php">Elenco Zoo</a>
                <a href="login.php">Log in</a>
            </div>
        </nav>
        <h1>
            Sign up / Login
        </h1>
        <div class="overlay"></div>
    </header>
    <article>
    <div>
        <h3>Area dedicata ai dipendenti dei vari zoo</h3>
        <h3>Per effetuare la registrazione bisogna prima rivolgersi al personale informatico</h3>
        <?php
                if (isset($error1)) {
                    echo "<span class='error'>$error1</span>";
                }  
            ?>
    </div>
        <section class="box">

                <div class="login">
                    <h3>Iscriviti</h3>
                    <form name='signup' method='post'>
                        <div class="codice_fiscale">
                            <div><label for='codice_fiscale'>Codice Fiscale</label></div>
                            <div><input type='text' name='codice_fiscale' <?php if(isset($_POST["codice_fiscale"])){echo "value=".$_POST["codice_fiscale"];} ?>></div>
                            <span class="hidden error">Codice fiscale non valido</span>
                        </div>
                        <div class="email">
                        <div><label for='email'>Email</label></div>
                        <div><input type='text' name='email' <?php if(isset($_POST["email"])){echo "value=".$_POST["email"];} ?>></div>
                        <span class="hidden error">Indirizzo email non valido</span>
                    </div>
                        <div class="password">
                        <div><label for='password'>Password</label></div>
                        <div><input type='password' name='password' <?php if(isset($_POST["password"])){echo "value=".$_POST["password"];} ?>></div>
                        <span class="hidden error">Inserisci almeno 8 caratteri</span>
                    </div>
                    <div class="confirm_password">
                        <div><label for='confirm_password'>Conferma Password</label></div>
                        <div><input type='password' name='confirm_password' <?php if(isset($_POST["confirm_password"])){echo "value=".$_POST["confirm_password"];} ?>></div>
                        <span class="hidden error">Le password non coincidono</span>
                    </div>
                        <div>
                            <input type='submit' value="Iscriviti" class="bottone">
                        </div>
                        <div><input type="hidden" name="tipo" value="signup"></div>
                    </form>
                </div>
            
            <section class="spacer">
                <div>
                    <span></span>
                </div>
            </section>
            
                <div class="login">
                    <h3>Accedi</h3>
                    <form name='login' method='post'>
                        <div class="email">
                            <div><label for='email'>Email</label></div>
                            <div><input type='text' name='email1' <?php if(isset($_POST["email1"])){echo "value=".$_POST["email1"];} ?>></div>
                        </div>
                        <div class="password">
                            <div><label for='password'>Password</label></div>
                            <div><input type='password' name='password1' <?php if(isset($_POST["password1"])){echo "value=".$_POST["password1"];} ?>></div>
                        </div>
                        <div>
                            <input type='submit' value="Accedi" class="bottone">
                        </div>
                        <div><input type="hidden" name="tipo" value="login"></div>
                    </form>
                </div>
            
        </section>
    </article>
    <footer>
        <img src="img/logo.png">
        <p>Powered by Roberto Mirabella O46002068</p>
        <address>Università di Catania 2020/21</address>
    </footer>

</body>

</html>