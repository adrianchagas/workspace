function validar() {
    var usuario = document.getElementById('email');
    var contraseña = document.getElementById('pass');
    var span1 = document.getElementById('errorusuario');
    var span2 = document.getElementById('errorcontraseña');
    if (usuario.value === '' || contraseña.value === '') {
        span1.style.display = 'block';
        span2.style.display = 'block';
        span1.innerHTML = '¡Debe ingresar usuario!';
        span2.innerHTML = '¡Debe ingresar contraseña!';
        usuario.style.border = '2px solid red';
        contraseña.style.border = '2px solid red';
    } else {
        sessionStorage.setItem('user', usuario.value);
        sessionStorage.setItem('value2', contraseña.value);
        span1.style.display = 'none';
        span2.style.display = 'none';
        location.href = 'index.html';
    }
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    sessionStorage.setItem('user', profile.getEmail());
    location.href = 'index.html'

    let mostrar_boton = document.getElementById('mostrar');
      mostrar_boton.style.display = 'block';

// The ID token you need to pass to your backend:
var id_token = googleUser.getAuthResponse().id_token;
console.log("ID Token: " + id_token);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    let mostrar_boton = document.getElementById("mostrar");
    mostrar_boton.style.display = "none";    
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    let mostrar_boton = document.getElementById("mostrar");
    mostrar_boton.style.display = "none";
});