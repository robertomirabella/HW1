
function nascondiInfo(event){
    event.currentTarget.parentNode.querySelector('.info').classList.add('hidden');
    event.currentTarget.removeEventListener('click',nascondiInfo);
    event.currentTarget.textContent='Clicca per info';
    event.currentTarget.addEventListener('click',espandiInfo);
}

function espandiInfo(event){
    event.currentTarget.parentNode.querySelector('.info').classList.remove('hidden');
    event.currentTarget.removeEventListener('click',espandiInfo);
    event.currentTarget.textContent='Meno dettagli';
    event.currentTarget.addEventListener('click',nascondiInfo);
}

function onJson(json)
{
    const section = document.querySelector('.container');

    for(let i = 0;i<json.length;i++){
    
        const div = document.createElement('div');
        div.classList.add('content');
        div.classList.add('content_background_zoo');
        div.style.backgroundImage = "url("+json[i].foto+")";
    
        const h3 = document.createElement('h3');
        h3.textContent = json[i].nome;

        const strong = document.createElement('strong');
        strong.textContent = "Clicca per info";
        strong.classList.add('bottone_info');
        strong.addEventListener('click',espandiInfo);
    
        const p1 = document.createElement('p');
        p1.textContent ='Indirizzo: ' + json[i].luogo;
        p1.classList.add('hidden');
        p1.classList.add('info');

        const p2 = document.createElement('p');
        p2.textContent ="Costo d'Ingresso: €" + json[i].costo+' intero, €'+parseInt(json[i].costo*0.8)+' ridotto';
        p2.classList.add('info');
        
        const p3 = document.createElement('p');
        p3.textContent ='Aperti dal ' + json[i].data_apertura.slice(0,4);
        p3.classList.add('info');
        const p4 = document.createElement('p');
        p4.textContent ='Descrizione: ' + json[i].descrizione;
        p4.classList.add('info');
    
        div.appendChild(h3);
        div.appendChild(strong);
        p1.appendChild(p2);
        p1.appendChild(p3);
        p1.appendChild(p4);
        div.appendChild(p1);

        section.appendChild(div);
    }
}

function onResponse(response) {
    console.log(response);
    return response.json();
}

fetch('carica_zoo.php').then(onResponse).then(onJson);