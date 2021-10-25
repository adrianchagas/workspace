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

function modificarDatos(){
    var botonModificar = document.getElementById('modificar').onclick;

    let htmlContentToAppend = "";

    if (botonModificar){
        htmlContentToAppend = `
        <ul class="list-group mb-3">
          <li id="nombre-apellido"class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">Nombre y apellido</h6>
                <br>
                <input size="50" type="text" id="Nombre-Completo" placeholder="Nombre y apellido..." onblur="cargarErrores('Nombre-Completo', 'opcion1');" >
                <p><span id="opcion1" style="color: red;"></span></p>
              </div>
          </li>
    
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Edad</h6>
              <br>
              <input size="50" type="text" id="edad" placeholder="Edad..." onblur="cargarErrores('edad', 'opcion2');" >
              <p><span id="opcion2" style="color: red;"></span></p>
            </div>
          </li>
    
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">E-mail</h6>
              <br>
              <input size="50" type="text" id="email" placeholder="E-mail..." onblur="cargarErrores('email', 'opcion3');" >
              <p><span id="opcion3" style="color: red;"></span></p>
            </div>
          </li>
    
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Teléfono de contacto</h6>
              <br>
              <input size="50" type="text" id="telefono" placeholder="N° de teléfono..." onblur="cargarErrores('telefono', 'opcion4');" >
              <p><span id="opcion4" style="color: red;"></span></p>
            </div>
          </li>
        </ul>
        <button id="modificar" onclick="volver();" class="btn btn-primary">Guardar</button>
      </div> 
        `
    }
    document.getElementById('datosPersonales').innerHTML = htmlContentToAppend;
}

function volver(){
    var nombre = document.getElementById('Nombre-Completo').value;
    var edad = document.getElementById('edad').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;

    localStorage.setItem('nombreCompleto', nombre);
    localStorage.setItem('edad', edad);
    localStorage.setItem('email', email);
    localStorage.setItem('numero', telefono);

    if (nombre === "" || edad === "" || email === "" || telefono === ""){
        document.getElementById('opcion1').innerHTML = "¡Debe ingresar nombre y apellido!";
        document.getElementById('opcion2').innerHTML = "¡Debe ingresar edad!";
        document.getElementById('opcion3').innerHTML = "¡Debe ingresar email!";
        document.getElementById('opcion4').innerHTML = "¡Debe ingresar número de contacto!";

    }else{
    let htmlContentToAppend = `
    <ul class="list-group mb-3">
    <li id="nombre-apellido"class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Nombre y apellido</h6>
          <p id="mostrar-nombre-apellido" class="text-muted"></p>
        </div>
    </li>

    <li class="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 class="my-0">Edad</h6>
        <p id="edad" class="text-muted"></p>
      </div>
    </li>

    <li class="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 class="my-0">E-mail</h6>
        <p id="email" class="text-muted"></p>
      </div>
    </li>

    <li class="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 class="my-0">Teléfono de contacto</h6>
        <p id="telefono" class="text-muted"></p>
      </div>
    </li>
  </ul>
  <button id="modificar" onclick="modificarDatos();" class="btn btn-primary">Modificar datos personales</button>
      `;
    document.getElementById('datosPersonales').innerHTML = htmlContentToAppend;

    modificarDatos.innerHTML = htmlContentToAppend;
    document.getElementById('mostrar-nombre-apellido').innerHTML = nombre;
    document.getElementById('edad').innerHTML = edad;
    document.getElementById('email').innerHTML = email;
    document.getElementById('telefono').innerHTML = telefono;
    }
 }


function elemInicio(){
    let htmlContentToAppend = `
   
    <ul class="list-group mb-3">
      <li id="nombre-apellido"class="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 class="my-0">Nombre y apellido</h6>
            <p id="mostrar-nombre-apellido" class="text-muted">${localStorage.getItem('nombreCompleto')}</p>
          </div>
      </li>

      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Edad</h6>
          <p id="edad" class="text-muted">${localStorage.getItem('edad')}</p>
        </div>
      </li>

      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">E-mail</h6>
          <p id="email" class="text-muted">${localStorage.getItem('email')}</p>
        </div>
      </li>

      <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">Teléfono de contacto</h6>
          <p id="telefono" class="text-muted">${localStorage.getItem('numero')}</p>
        </div>
      </li>
    </ul>
    <button id="modificar" onclick="modificarDatos();" class="btn btn-primary">Modificar datos personales</button>
    `;
    document.getElementById('datosPersonales').innerHTML = htmlContentToAppend;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    elemInicio();

});