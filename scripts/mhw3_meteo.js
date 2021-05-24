function onJson(json){
    console.log(json);
    const meteo=document.querySelector('#container_meteo');
    meteo.innerHTML='';
    const div=document.createElement('div');
    div.classList.add('weather_info');
    
    const img= document.createElement('img');
    img.src='http://openweathermap.org/img/wn/'+json.weather[0].icon+'@2x.png';
    img.classList.add('img_weather');

    const p=document.createElement('p');
    p.textContent="Le previsioni meteo per oggi sono: "+json.weather[0].description;
    const p1 = document.createElement('p');
    p1.textContent=' Temperatura: '+json.main.temp+'°';
    p.appendChild(img);
    p.classList.add('weather_p');
    p1.classList.add('weather_p');

    div.appendChild(p1);
    div.appendChild(p);
    
    if(json.weather[0].main==='Clear'){
        const p2 = document.createElement('p');
        p2.classList.add('weather_frase_bonus');
        p2.textContent="Oggi è un'ottima giornata per fare un giro allo zoo!";
        div.appendChild(p2);
    }

    meteo.appendChild(div);
    
}

function search(event){
	event.preventDefault();
	const content = document.querySelector('#content').value;
    
	if(content) {
	    const text = encodeURIComponent(content);
        const weather_api='token_meteo.php?q='+text;
        fetch(weather_api).then(onResponse).then(onJson);
    }
    else {
		alert("Inserisci il testo per cui effettuare la ricerca");
	}

}

function onResponse(response){
    return response.json();
}

const form = document.querySelector('#search_content');
form.addEventListener('submit', search);