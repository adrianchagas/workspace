    
function cargarErrores(id, idMensaje) {
    var datos = document.getElementById(id);
    var error = document.getElementById(idMensaje);

    if (datos.value === '') {
        error.style.display = 'block';
        error.innerHTML= "Debe ingresar " + datos.id;
        datos.classList.add("error");

    } else {(datos.classList.remove("error"))
        error.innerHTML="";
        } 
    }

    function validar() {
        var usuario = document.getElementById('email');
        var contraseña = document.getElementById('contraseña');
        var span1 = document.getElementById('opcion1');
        var span2 = document.getElementById('opcion2');
    
        if (usuario.value === '' || contraseña.value === '') {
            span1.style.display = 'block';
            span2.style.display = 'block';
            span1.innerHTML = '¡Debe ingresar usuario!';
            span2.innerHTML = '¡Debe ingresar contraseña!';
            usuario.classList.add("error");
            contraseña.classList.add("error");
    
       
        } else {
            sessionStorage.setItem('value', usuario.value);
            sessionStorage.setItem('value2', contraseña.value);
            span1.style.display = 'none';
            span2.style.display = 'none';
            usuario.classList.remove("error")
            contraseña.classList.remove("error");
            location.href = 'index.html';
        }
        }

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    sessionStorage.setItem('value', profile.getEmail());
    location.href = 'index.html'

    let botonSalir = document.getElementById('salir');
      botonSalir.style.display = 'block';

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    }



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});