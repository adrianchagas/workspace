
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
        sessionStorage.setItem('user', true);
        span1.style.display = 'none';
        span2.style.display = 'none';
        location.href = 'index.html';
    }
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});