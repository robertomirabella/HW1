const max = 3;

function onJson_pet(json){
    const elenco = document.querySelector('#elenco_pet');
    elenco.innerHTML = '';

    if (json.status == 400) {
        const errore = document.createElement("h1"); 
        const messaggio = document.createTextNode(json.detail); 
        errore.appendChild(messaggio); 
        elenco.appendChild(errore);
        return
      }
      
      const results = json.animals;
      
      if(results.length == 0)
      {
        const errore = document.createElement("h1"); 
        const messaggio = document.createTextNode("Nessun risultato!"); 
        errore.appendChild(messaggio); 
        elenco.appendChild(errore);
      }
      
      let i=0;
      for(result of results)
      {
        if(result.primary_photo_cropped != null && i<max){
            const immagine = result.primary_photo_cropped.medium;
            const album = document.createElement('div');
            album.classList.add('pet_div');

            const img = document.createElement('img');
            img.src = immagine;
            img.classList.add('pet_image');
            const breed = document.createElement('h2');
            breed.textContent = result.breeds.primary;
            breed.classList.add('pet_titolo');
            
            const strong = document.createElement('strong');
            strong.textContent = "Clicca per info";
            strong.classList.add('bottone_info');
            strong.addEventListener('click',espandiInfo);
        
            const p = document.createElement('p');
            if(result.contact.email && result.contact.phone){
                p.textContent = 'Email: '+result.contact.email;
                const p1= document.createElement('p');
                p1.textContent='Telefono: '+result.contact.phone;
                p.appendChild(p1);
            }
            else if(result.contact.email)
            p.textContent = 'Email: '+result.contact.email;
            else if(result.contact.phone)
                p.textContent = 'Telefono: '+result.contact.phone;
            else
                p.textContent='Nessuna info disponibile'
            p.classList.add('hidden');
            p.classList.add('info');


            album.appendChild(img);
            album.appendChild(breed);
            album.appendChild(strong);
            album.appendChild(p);
            elenco.appendChild(album);
            i++;
        }
      }

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

function onResponse(response) {
    return response.json();

}

function selectPet(){
    
    const pet_scelto = document.querySelector('#tipo').value;
    if(pet_scelto==='cani')
        fetch('https://api.petfinder.com/v2/animals?type=dog&status=' + status, 
                {
                    headers: {
                        'Authorization': token.token_type + ' ' + token.access_token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(onResponse).then(onJson_pet);
    else if(pet_scelto==='cavalli')
    fetch('https://api.petfinder.com/v2/animals?type=horse&status=' + status, 
            {
                headers: {
                    'Authorization': token.token_type + ' ' + token.access_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(onResponse).then(onJson_pet);
    else if(pet_scelto==='gatti')
    fetch('https://api.petfinder.com/v2/animals?type=cat&status=' + status, 
            {
                headers: {
                    'Authorization': token.token_type + ' ' + token.access_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(onResponse).then(onJson_pet);
    else if(pet_scelto==='volatili')
    fetch('https://api.petfinder.com/v2/animals?type=bird&status=' + status, 
            {
                headers: {
                    'Authorization': token.token_type + ' ' + token.access_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(onResponse).then(onJson_pet);
    else if(pet_scelto==='vuoto'){
        const elenco = document.querySelector('#elenco_pet');
        elenco.innerHTML = '';
    }

}

function getToken(json)
{
	token = json;
    console.log(token);

}

function onTokenResponse(response) {
  return response.json();
}

let token;

fetch('token_pet.php').then(onTokenResponse).then(getToken);
    
const pet_select =  document.querySelector('select');
pet_select.addEventListener('change',selectPet);
