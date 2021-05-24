

function rimuoviPreferiti(event){
    n_preferiti--;
    
    event.currentTarget.removeEventListener('click',rimuoviPreferiti);

    if(n_preferiti===0){
        document.querySelector('#lista_preferiti').classList.add('hidden');
        document.querySelector('.contents_preferiti').classList.add('hidden');
    }

    const titoli_contenuti = document.querySelectorAll('.contents .blocchi .titolo');
    const lista = [];
    
    for(let i = 0;i<titoli_contenuti.length;i++){
        lista.push(titoli_contenuti[i].textContent);
    }
    const trovato = lista.indexOf(event.currentTarget.parentNode.querySelector('h3').textContent);

    const blocco_deselezionato = document.querySelectorAll('.contents .blocchi')[trovato];
    blocco_deselezionato.querySelector('.preferiti').src = 'img/preferiti_1.png';
    blocco_deselezionato.querySelector('.preferiti').addEventListener('click',aggiungiPreferiti);

    fetch('gestione_preferiti.php?tipo=rimuovi&value='+event.currentTarget.parentNode.childNodes[0].textContent);

    event.currentTarget.parentNode.remove();
}

function aggiungiPreferiti(event){
    event.currentTarget.src='img/preferiti_2.png';
    event.currentTarget.removeEventListener('click',aggiungiPreferiti);
    if(n_preferiti===0){
        document.querySelector('#lista_preferiti').classList.remove('hidden');
        document.querySelector('.contents_preferiti').classList.remove('hidden');
    }
    const listaPreferiti = document.querySelector('.contents_preferiti');
    const div = document.createElement('div');
    div.classList.add('blocchi');

    const h3 = document.createElement('h3');
    h3.textContent = event.currentTarget.parentNode.querySelector('h3').textContent;
    
    h3.classList.add('titolo');

    const img_1 = document.createElement('img');
    img_1.src = "img/preferiti_3.png"
    img_1.classList.add('preferiti');
    img_1.addEventListener('click',rimuoviPreferiti);

    const img_2 = document.createElement('img');
    img_2.src = event.currentTarget.parentNode.querySelector('.img_content').src;
    img_2.classList.add('img_content');

    div.appendChild(h3);
    div.appendChild(img_1);
    div.appendChild(img_2);
    listaPreferiti.appendChild(div);
    n_preferiti++;
    fetch('gestione_preferiti.php?tipo=aggiungi&value='+h3.textContent);
}

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

function ricerca(event){
    const titoli_contenuti = document.querySelectorAll('.contents .blocchi .titolo');

    for(let i = 0;i<titoli_contenuti.length;i++)
        if(titoli_contenuti[i].textContent.toLowerCase().search(event.currentTarget.value.toLowerCase())!==-1)
            titoli_contenuti[i].parentElement.classList.remove('hidden');
        else
            titoli_contenuti[i].parentElement.classList.add('hidden');
}

function onJson(json)
{
	let contenuti=json;
    for(let i = 0;i<contenuti.length;i++){
    
        const div = document.createElement('div');
        div.classList.add('blocchi');
    
        const h3 = document.createElement('h3');
        h3.textContent = contenuti[i].titolo;
        h3.classList.add('titolo');
    
        const img_1 = document.createElement('img');
        img_1.src = "img/preferiti_1.png"
        img_1.classList.add('preferiti');
        img_1.addEventListener('click',aggiungiPreferiti);
    
        const img_2 = document.createElement('img');
        img_2.src = contenuti[i].immagine;
        img_2.classList.add('img_content');
    
        const strong = document.createElement('strong');
        strong.textContent = "Clicca per info";
        strong.classList.add('bottone_info');
        strong.addEventListener('click',espandiInfo);
    
        const p = document.createElement('p');
        p.textContent = contenuti[i].descrizione;
        p.classList.add('hidden');
        p.classList.add('info');
    
        div.appendChild(h3);
        div.appendChild(img_1);
        div.appendChild(img_2);
        div.appendChild(strong);
        div.appendChild(p);
        section.appendChild(div);
    }
    fetch('gestione_preferiti.php?tipo=carica').then(onResponse).then(onJsonPreferitiPHP);

}

function onResponse(response) {
    return response.json();
}

function onJsonPreferitiPHP(json){    
    if(json){

        let j;
        console.log(json)
        for(j=0;j<json.length-1;j++){
            console.log(section.childElementCount);
            for(let i = 0;i<section.childElementCount;i++){
                console.log(section.childNodes[i].childNodes[0].textContent);
                if(section.childNodes[i].childNodes[0].textContent == json[j]){
                    document.querySelector('#lista_preferiti').classList.remove('hidden');
                    document.querySelector('.contents_preferiti').classList.remove('hidden');
                    section.childNodes[i].childNodes[1].src='img/preferiti_2.png';
                    section.childNodes[i].childNodes[1].removeEventListener('click',aggiungiPreferiti);


                    const listaPreferiti = document.querySelector('.contents_preferiti');
                    const div = document.createElement('div');
                    div.classList.add('blocchi');
                    

                    const h3 = document.createElement('h3');
                    h3.textContent = section.childNodes[i].childNodes[0].textContent;
                    
                    h3.classList.add('titolo');

                    const img_1 = document.createElement('img');
                    img_1.src = "img/preferiti_3.png"
                    img_1.classList.add('preferiti');
                    img_1.addEventListener('click',rimuoviPreferiti);

                    const img_2 = document.createElement('img');
                    img_2.src = section.childNodes[i].childNodes[2].src;
                    img_2.classList.add('img_content');

                    div.appendChild(h3);
                    div.appendChild(img_1);
                    div.appendChild(img_2);
                    listaPreferiti.appendChild(div);
                }
            }
        }
        n_preferiti = j;
    }
}

let n_preferiti = 0;
const article = document.querySelector('article');
let section = document.querySelector('.contents');

fetch('carica_animali.php').then(onResponse).then(onJson);

const barra_ricerca = document.querySelector('input');
barra_ricerca.addEventListener('keyup',ricerca);

