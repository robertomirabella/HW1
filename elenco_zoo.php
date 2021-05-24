

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
        <script src="scripts/carica_zoo.js" defer></script>
        <script src="scripts/mhw3_meteo.js" defer></script>
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
            I nostri zoo
        </h1>
        <div class="overlay"></div>
    </header>
    <article>
        <section id="meteo">
            <form name ='search_content' id='search_content'>
                <label>Inserire una città per il meteo: <input type='text' name = 'content' id ='content'></label>	 
                <label>&nbsp;<input class="submit" type='submit' value="Vai"></label>
            </form>
            <section id="container_meteo"></section>
        </section>
        <section class='container'></section>
    </article>
    <footer>
        <img src="img/logo.png">
        <p>Powered by Roberto Mirabella O46002068</p>
        <address>Università di Catania 2020/21</address>
    </footer>

</body>

</html>
