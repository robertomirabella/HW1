
function onJsonAnimaliTerrestri(json)
{
    
	const contenuti=json;

    const table = document.querySelector('#animali_terrestri');
    table.innerHTML='';
    
    const row = document.createElement('div');
    row.classList.add('TableRow');

    const divID = document.createElement('div');
    divID.classList.add('TableHead');
    const strongID = document.createElement('strong');
    strongID.textContent='Numero Chip';
    divID.appendChild(strongID);

    const divSpecie = document.createElement('div');
    divSpecie.classList.add('TableHead');
    const strongSpecie = document.createElement('strong');
    strongSpecie.textContent='Specie';
    divSpecie.appendChild(strongSpecie);
    
    const divData = document.createElement('div');
    divData.classList.add('TableHead');
    const strongData = document.createElement('strong');
    strongData.textContent='Data di acquisizione';
    divData.appendChild(strongData);
    //corrisponde al peso 
    const divPeso = document.createElement('div');
    divPeso.classList.add('TableHead');
    const strongPeso = document.createElement('strong');
    strongPeso.textContent='Peso';
    divPeso.appendChild(strongPeso);
    
    const divRecinto = document.createElement('div');
    divRecinto.classList.add('TableHead');
    const strongRecinto = document.createElement('strong');
    strongRecinto.textContent='Recinto';
    divRecinto.appendChild(strongRecinto);

    row.appendChild(divID);
    row.appendChild(divSpecie);
    row.appendChild(divData);
    row.appendChild(divPeso);
    row.appendChild(divRecinto);
    table.appendChild(row);

    for(let i = 0;i<contenuti.length;i++){
        const row_i = document.createElement('div');
        row_i.classList.add('TableRow');

        const rdivID = document.createElement('div');
        rdivID.classList.add('TableCell');
        rdivID.textContent=contenuti[i].id;

        const rdivSpecie = document.createElement('div');
        rdivSpecie.classList.add('TableCell');
        rdivSpecie.textContent=contenuti[i].specie;

        const rdivData = document.createElement('div');
        rdivData.classList.add('TableCell');
        rdivData.textContent=contenuti[i].data;

        const rdivPeso = document.createElement('div');
        rdivPeso.classList.add('TableCell');
        rdivPeso.textContent=contenuti[i].peso;

        const rdivRecinto = document.createElement('div');
        rdivRecinto.classList.add('TableCell');
        rdivRecinto.textContent=contenuti[i].recinto;

        row_i.appendChild(rdivID);
        row_i.appendChild(rdivSpecie);
        row_i.appendChild(rdivData);
        row_i.appendChild(rdivPeso);
        row_i.appendChild(rdivRecinto);
        table.appendChild(row_i);
    }

    const last_row = document.createElement('div');
    last_row.classList.add('TableRow');

    const ldivID = document.createElement('div');
    ldivID.classList.add('TableCell');
    ldivID.textContent='Inserisci un nuovo animale';
    
    const ldivSpecie = document.createElement('div');
    ldivSpecie.classList.add('TableCell');
    const inputSpecie = document.createElement('input');
    inputSpecie.type ='text';
    inputSpecie.name='specie';
    inputSpecie.classList.add('text_form');
    ldivSpecie.appendChild(inputSpecie);

    const ldivData = document.createElement('div');
    ldivData.classList.add('TableCell');
    const inputData = document.createElement('input');
    inputData.type ='text';
    inputData.name='data';
    inputData.classList.add('text_form');
    ldivData.appendChild(inputData);

    const ldivPeso = document.createElement('div');
    ldivPeso.classList.add('TableCell');
    const inputPeso = document.createElement('input');
    inputPeso.type ='text';
    inputPeso.name='peso';
    inputPeso.classList.add('text_form');
    ldivPeso.appendChild(inputPeso);
    
    const ldivRecinto = document.createElement('div');
    ldivRecinto.classList.add('TableCell');
    const inputRecinto = document.createElement('input');
    inputRecinto.type ='text';
    inputRecinto.name='recinto';
    inputRecinto.classList.add('text_form');
    ldivRecinto.appendChild(inputRecinto);

    last_row.appendChild(ldivID);    
    last_row.appendChild(ldivSpecie);
    last_row.appendChild(ldivData);
    last_row.appendChild(ldivPeso);
    last_row.appendChild(ldivRecinto);
    table.appendChild(last_row);
}


function onJsonAnimaliAcquatici(json)
{
	const contenuti=json;

    const table = document.querySelector('#animali_acquatici');
    table.innerHTML='';
    
    const row = document.createElement('div');
    row.classList.add('TableRow');

    const divID = document.createElement('div');
    divID.classList.add('TableHead');
    const strongID = document.createElement('strong');
    strongID.textContent='Numero Chip';
    divID.appendChild(strongID);

    const divSpecie = document.createElement('div');
    divSpecie.classList.add('TableHead');
    const strongSpecie = document.createElement('strong');
    strongSpecie.textContent='Specie';
    divSpecie.appendChild(strongSpecie);
    
    const divData = document.createElement('div');
    divData.classList.add('TableHead');
    const strongData = document.createElement('strong');
    strongData.textContent='Data di acquisizione';
    divData.appendChild(strongData);

    const divTipo = document.createElement('div');
    divTipo.classList.add('TableHead');
    const strongTipo = document.createElement('strong');
    strongTipo.textContent='Tipo';
    divTipo.appendChild(strongTipo);
    
    const divRecinto = document.createElement('div');
    divRecinto.classList.add('TableHead');
    const strongRecinto = document.createElement('strong');
    strongRecinto.textContent='Recinto';
    divRecinto.appendChild(strongRecinto);

    row.appendChild(divID);
    row.appendChild(divSpecie);
    row.appendChild(divData);
    row.appendChild(divTipo);
    row.appendChild(divRecinto);
    table.appendChild(row);

    for(let i = 0;i<contenuti.length;i++){
        const row_i = document.createElement('div');
        row_i.classList.add('TableRow');

        const rdivID = document.createElement('div');
        rdivID.classList.add('TableCell');
        rdivID.textContent=contenuti[i].id;

        const rdivSpecie = document.createElement('div');
        rdivSpecie.classList.add('TableCell');
        rdivSpecie.textContent=contenuti[i].specie;

        const rdivData = document.createElement('div');
        rdivData.classList.add('TableCell');
        rdivData.textContent=contenuti[i].data;

        const rdivTipo = document.createElement('div');
        rdivTipo.classList.add('TableCell');
        if(contenuti[i].tipo=='0')
            rdivTipo.textContent='acqua salata';
        else
            rdivTipo.textContent='acqua dolce';

        const rdivRecinto = document.createElement('div');
        rdivRecinto.classList.add('TableCell');
        rdivRecinto.textContent=contenuti[i].recinto;

        row_i.appendChild(rdivID);
        row_i.appendChild(rdivSpecie);
        row_i.appendChild(rdivData);
        row_i.appendChild(rdivTipo);
        row_i.appendChild(rdivRecinto);
        table.appendChild(row_i);
    }

    const last_row = document.createElement('div');
    last_row.classList.add('TableRow');

    const ldivID = document.createElement('div');
    ldivID.classList.add('TableCell');
    ldivID.textContent='Inserisci un nuovo animale';
    
    const ldivSpecie = document.createElement('div');
    ldivSpecie.classList.add('TableCell');
    const inputSpecie = document.createElement('input');
    inputSpecie.type ='text';
    inputSpecie.name='specie';
    inputSpecie.classList.add('text_form');
    ldivSpecie.appendChild(inputSpecie);

    const ldivData = document.createElement('div');
    ldivData.classList.add('TableCell');
    const inputData = document.createElement('input');
    inputData.type ='text';
    inputData.name='data';
    inputData.classList.add('text_form');
    ldivData.appendChild(inputData);

    const ldivTipo = document.createElement('div');
    ldivTipo.classList.add('TableCell');
    const inputTipo = document.createElement('input');
    inputTipo.type ='text';
    inputTipo.name='tipo';
    inputTipo.classList.add('text_form');
    ldivTipo.appendChild(inputTipo);
    
    const ldivRecinto = document.createElement('div');
    ldivRecinto.classList.add('TableCell');
    const inputRecinto = document.createElement('input');
    inputRecinto.type ='text';
    inputRecinto.name='recinto';
    inputRecinto.classList.add('text_form');
    ldivRecinto.appendChild(inputRecinto);

    last_row.appendChild(ldivID);    
    last_row.appendChild(ldivSpecie);
    last_row.appendChild(ldivData);
    last_row.appendChild(ldivTipo);
    last_row.appendChild(ldivRecinto);
    table.appendChild(last_row);
}


function onJsonRecinto(json)
{
	const contenuti=json;

    const table = document.querySelector('#recinti');
    table.innerHTML='';
    
    const row = document.createElement('div');
    row.classList.add('TableRow');

    const divID = document.createElement('div');
    divID.classList.add('TableHead');
    const strongID = document.createElement('strong');
    strongID.textContent='ID Recinto';
    divID.appendChild(strongID);

    const divTipo = document.createElement('div');
    divTipo.classList.add('TableHead');
    const strongTipo = document.createElement('strong');
    strongTipo.textContent='Tipo';
    divTipo.appendChild(strongTipo);
    
    const divDescrizione = document.createElement('div');
    divDescrizione.classList.add('TableHead');
    const strongDescrizione = document.createElement('strong');
    strongDescrizione.textContent='Descrizione';
    divDescrizione.appendChild(strongDescrizione);
    
    const divNumero = document.createElement('div');
    divNumero.classList.add('TableHead');
    const strongNumero = document.createElement('strong');
    strongNumero.textContent='Numero Animali';
    divNumero.appendChild(strongNumero);

    row.appendChild(divID);
    row.appendChild(divTipo);
    row.appendChild(divDescrizione);
    row.appendChild(divNumero);
    table.appendChild(row);

    for(let i = 0;i<contenuti.length;i++){
        const row_i = document.createElement('div');
        row_i.classList.add('TableRow');

        const rdivID = document.createElement('div');
        rdivID.classList.add('TableCell');
        rdivID.textContent=contenuti[i].id;

        const rdivTipo = document.createElement('div');
        rdivTipo.classList.add('TableCell');
        rdivTipo.textContent=contenuti[i].tipo;

        const rdivDescrizione = document.createElement('div');
        rdivDescrizione.classList.add('TableCell');
        rdivDescrizione.textContent=contenuti[i].descrizione;

        const rdivNumero = document.createElement('div');
        rdivNumero.classList.add('TableCell');
        rdivNumero.textContent=contenuti[i].n_animali;

        row_i.appendChild(rdivID);
        row_i.appendChild(rdivTipo);
        row_i.appendChild(rdivDescrizione);
        row_i.appendChild(rdivNumero);
        table.appendChild(row_i);
    }

    const last_row = document.createElement('div');
    last_row.classList.add('TableRow');

    const ldivID = document.createElement('div');
    ldivID.classList.add('TableCell');
    ldivID.textContent='Crea un nuovo recinto';

    const ldivTipo = document.createElement('div');
    ldivTipo.classList.add('TableCell');
    const inputTipo = document.createElement('input');
    inputTipo.type ='text';
    inputTipo.name='tipo';
    inputTipo.classList.add('text_form');
    ldivTipo.appendChild(inputTipo);
    
    const ldivDescrizione = document.createElement('div');
    ldivDescrizione.classList.add('TableCell');
    const inputDescrizione = document.createElement('input');
    inputDescrizione.type ='text';
    inputDescrizione.name='descrizione';
    inputDescrizione.classList.add('text_form');
    ldivDescrizione.appendChild(inputDescrizione);
    
    const ldivNumero = document.createElement('div');
    ldivNumero.classList.add('TableCell');
    ldivNumero.textContent='\xa0';

    last_row.appendChild(ldivID);
    last_row.appendChild(ldivTipo);
    last_row.appendChild(ldivDescrizione);
    last_row.appendChild(ldivNumero);
    table.appendChild(last_row);
}

function onJsonNome(json){
    console.log(json);
    const anagrafica_h2 = document.querySelector('.anagrafica h2');
    const anagrafica_p = document.querySelector('.anagrafica p');

    anagrafica_h2.textContent = 'Benvenuto/a ' + json[0].nome;
    anagrafica_p.textContent = 'Zoo di rifermento: ' + json[0].zoo;
}

function onJsonControllo(json){
    console.log(json);
}

function onResponse(response){
    return response.json();
}


function validazioneForm(event){
    event.preventDefault();
    switch(event.target){
        case recintiform:
            campi_form = document.querySelector('#recinti').childNodes;
            if(campi_form[campi_form.length-1].childNodes[1].childNodes[0].value.length==0||campi_form[campi_form.length-1].childNodes[2].childNodes[0].value.length==0)
                recintiform.childNodes[3].classList.remove('hidden');
            else{
                recintiform.childNodes[3].classList.add('hidden');
                fetch('carica_tabelle.php?q=recinti_in&tipo='+campi_form[campi_form.length-1].childNodes[1].childNodes[0].value+
                        '&descrizione='+campi_form[campi_form.length-1].childNodes[2].childNodes[0].value).then(onResponse).then(onJsonControllo);

            }
            break;

        case acquaform:
            campi_form = document.querySelector('#animali_acquatici').childNodes;
            if(campi_form[campi_form.length-1].childNodes[1].childNodes[0].value.length==0||campi_form[campi_form.length-1].childNodes[2].childNodes[0].value.length==0
                ||campi_form[campi_form.length-1].childNodes[3].childNodes[0].value.length==0||campi_form[campi_form.length-1].childNodes[4].childNodes[0].value.length==0)
                acquaform.childNodes[5].classList.remove('hidden');
            else{
                acquaform.childNodes[5].classList.add('hidden');
                fetch('carica_tabelle.php?q=animali_acquatici_in&specie='+campi_form[campi_form.length-1].childNodes[1].childNodes[0].value+'&data='+
                campi_form[campi_form.length-1].childNodes[2].childNodes[0].value+'&tipo='+
                campi_form[campi_form.length-1].childNodes[3].childNodes[0].value+'&recinto='+
                campi_form[campi_form.length-1].childNodes[4].childNodes[0].value).then(onResponse).then(onJsonControllo);
                fetch('carica_tabelle.php?q=animali_acquatici_out').then(onResponse).then(onJsonAnimaliAcquatici);

            }
            break;
            
        case terraform:
            campi_form = document.querySelector('#animali_terrestri').childNodes;
            if(campi_form[campi_form.length-1].childNodes[1].childNodes[0].value.length==0||campi_form[campi_form.length-1].childNodes[2].childNodes[0].value.length==0
                ||campi_form[campi_form.length-1].childNodes[3].childNodes[0].value.length==0||campi_form[campi_form.length-1].childNodes[4].childNodes[0].value.length==0)
                terraform.childNodes[3].classList.remove('hidden');
            else{
                terraform.childNodes[3].classList.add('hidden');
                fetch('carica_tabelle.php?q=animali_terrestri_in&specie='+campi_form[campi_form.length-1].childNodes[1].childNodes[0].value+'&data='+
                        campi_form[campi_form.length-1].childNodes[2].childNodes[0].value+'&peso='+
                        campi_form[campi_form.length-1].childNodes[3].childNodes[0].value+'&recinto='+
                        campi_form[campi_form.length-1].childNodes[4].childNodes[0].value).then(onResponse).then(onJsonControllo);
                fetch('carica_tabelle.php?q=animali_terrestri_out').then(onResponse).then(onJsonAnimaliTerrestri);
            }
            break;            
    }
    fetch('carica_tabelle.php?q=recinti_out').then(onResponse).then(onJsonRecinto);

}

let campi_form;

const recintiform = document.forms['recinti'];
recintiform.addEventListener('submit', validazioneForm);

const acquaform = document.forms['animali_acquatici'];
acquaform.addEventListener('submit', validazioneForm);

const terraform = document.forms['animali_terrestri'];
terraform.addEventListener('submit', validazioneForm);

fetch('carica_tabelle.php').then(onResponse).then(onJsonNome);
fetch('carica_tabelle.php?q=recinti_out').then(onResponse).then(onJsonRecinto);
fetch('carica_tabelle.php?q=animali_acquatici_out').then(onResponse).then(onJsonAnimaliAcquatici);
fetch('carica_tabelle.php?q=animali_terrestri_out').then(onResponse).then(onJsonAnimaliTerrestri);