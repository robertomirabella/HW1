function jsonCheckEmail(json) {
    // Controllo il campo exists ritornato dal JSON
    const span = document.querySelector('.email span');
    if (formStatus.email = !json.exists) {
        span.classList.add('hidden');
    } else {
        span.textContent = "Email già utilizzata";
        span.classList.remove('hidden');
    }
}

function checkEmail(event) {
    const emailInput = singupform.email;
    const span = document.querySelector('.email span');
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(emailInput.value).toLowerCase())) {
        span.textContent = "Email non valida";
        span.classList.remove('hidden');
        formStatus.email = false;
    } else {
        fetch("controllo_mail.php?q="+encodeURIComponent(String(emailInput.value).toLowerCase())).then(onResponse).then(jsonCheckEmail);
    }
}

function jsonCheckcf(json) {
    // Controllo il campo exists ritornato dal JSON
    const span = document.querySelector('.codice_fiscale span');
    if (formStatus.codice_fiscale = json.exists) {
        span.classList.add('hidden');
        console.log('trovato');

    } else {
        console.log('errore');
        span.textContent = "Codice Fiscale non presente nel DB";
        span.classList.remove('hidden');
    }
}

function checkcf(event) {
    const cf = singupform.codice_fiscale;
    const span = document.querySelector('.codice_fiscale span');
    if(!/^[a-zA-Z0-9]{1,16}$/.test(String(cf.value).toLowerCase())) {
        span.textContent = "Codice Fiscale non valido";
        formStatus.codice_fiscale = false;
        span.classList.remove('hidden');
    } else {
        fetch("controllo_cf.php?q="+encodeURIComponent(String(cf.value).toUpperCase())).then(onResponse).then(jsonCheckcf);
    }
}

function checkPassword(event) {
    const passwordInput = singupform.password;
    const span = document.querySelector('.password span');
    if (formStatus.password = passwordInput.value.length >= 8) {
        span.classList.add('hidden');
    } else {
        span.classList.remove('hidden');
    }
}

function checkConfirmPassword(event) {
    const confirmPasswordInput = singupform.confirm_password;
    const span = document.querySelector('.confirm_password span');
    if (formStatus.confirmPassord = confirmPasswordInput.value === document.querySelector('.password input').value) {
        span.classList.add('hidden');
    } else {
        span.classList.remove('hidden');
    }
}


function validazioneFormSignup(event){
    //controllo se tutti i campi sono stati riempiti
    if(singupform.email.value.length == 0 || singupform.password.value.length == 0 || 
       singupform.confirm_password.value.length == 0 || singupform.codice_fiscale.value.length == 0){

        alert('Compilare tutti i campi');
        event.preventDefault();

    }

    if(formStatus.email==false||formStatus.codice_fiscale==false||formStatus.password==false||formStatus.confirm_password==false){
        alert('Registrazione non effettuata, controllare i campi');
        event.preventDefault();
    }


}

function onResponse(response){
    return response.json();
}


let i=0;

const singupform = document.forms['signup'];
const formStatus = {};
singupform.codice_fiscale.addEventListener('keyup', checkcf);
singupform.email.addEventListener('keyup', checkEmail);
singupform.password.addEventListener('keyup', checkPassword);
singupform.confirm_password.addEventListener('keyup', checkConfirmPassword);

singupform.addEventListener('submit', validazioneFormSignup);

