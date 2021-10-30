const myObj = {name: "", age: "", email: "", cell: ""}; //objeto
const myObjStrg = JSON.stringify(myObj); //pasa a texto, es con lo que debo trabajar como los json que
                                        //recibo de las URL

//objeto Storage que se puede utilizar para acceder al espacio de almacenamiento local del origen actual.

myStorage = window.localStorage;
//myStorage.setItem('perfil', myObjStrg);

function cargarErrores(id, idMensaje) {
    
    var elementos = document.getElementById(id);
     var elementError = document.getElementById(idMensaje);
   if(elementos.value==''){
       elementError.style.display = "block";
       elementError.innerHTML = "Debe ingresar " + elementos.id + "!";
        elementos.classList.add("error");
   }
   else {(elementos.classList.remove("error"));
   elementError.innerHTML="";
  }
}

function validarYguardar(){
    var nombre = document.getElementById('nombre').value;
    var edad = document.getElementById('edad').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;

    if (nombre === "" || edad === "" || email === "" || telefono === ""){
        document.getElementById('opcion1').innerHTML = "¡Debe ingresar nombre y apellido!";
        document.getElementById('opcion2').innerHTML = "¡Debe ingresar edad!";
        document.getElementById('opcion3').innerHTML = "¡Debe ingresar email!";
        document.getElementById('opcion4').innerHTML = "¡Debe ingresar número de contacto!";

    }else{
    
      localStorage.setItem('perfil', myObjStrg); //guardo el Json pasado a texto en la linea 2
      var localPerfil = localStorage.getItem('perfil'); //obtengo el objeto del local(perfil)
      var usuario = JSON.parse(localPerfil); //convierto el texto "localPerfil" a objeto JSON
      //Le cargo datos al Json "usuario"
      usuario.name = document.getElementById('nombre').value; 
      usuario.age = document.getElementById('edad').value;
      usuario.email = document.getElementById('email').value;
      usuario.cell = document.getElementById('telefono').value;

      localPerfil = JSON.stringify(usuario); //Convierto el Json "usuario" a texto

      myStorage.setItem('perfil', localPerfil); //Cargo el Json que pase a texto, al localStorage
      deshabilitarInputs(); //desabilito los inputs
      document.getElementById('botonguardar').disabled = true;
    }
 }

function habilitarInputs(){
    document.getElementById('nombre').disabled = false;
    document.getElementById('edad').disabled = false;
    document.getElementById('email').disabled = false;
    document.getElementById('telefono').disabled = false;
}

function deshabilitarInputs(){
    document.getElementById('nombre').disabled = true;
    document.getElementById('edad').disabled = true;
    document.getElementById('email').disabled = true;
    document.getElementById('telefono').disabled = true;
}

function botones(){
  var botonGuardar = document.getElementById('botonguardar');
  var botonModificar = document.getElementById('botnomodificar');

  if(botonModificar.onclick){
    botonGuardar.disabled = false;
  }
}

 function cargarPerfil(){
  var valorLocalStorage = myStorage.getItem('perfil'); //obtengo el valor de los datos que guarde en localStorage
  // lo vuelvo a convertir en objeto (JSONusuario) y le cargo los datos
  var JSONusuario = JSON.parse(valorLocalStorage); 
  document.getElementById('nombre').value = JSONusuario.name;
  document.getElementById('edad').value = JSONusuario.age;
  document.getElementById('email').value = JSONusuario.email;
  document.getElementById('telefono').value = JSONusuario.cell;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  deshabilitarInputs();
  cargarPerfil();
  
});