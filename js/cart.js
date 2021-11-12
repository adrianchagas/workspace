var cart = {};
var mensaje = {};
let costoEnv = 0;

function showProductCart(array){

    let htmlContentToAppend = "";

        for(let i = 0; i < array.length; i++){
            let product = array[i];

            htmlContentToAppend += `
            <div class="row">
                <div class="col order-1">
                    <img src=` + product.src + ` alt=" ` + product.name + ` " class="img-thumbnail">
                </div>
                <div class="col order-2">
                    <h4 class="mb-1">` + product.name + `</h4>
                </div>
                <div class="col order-3">
                    <label for="cantidad`+ i +`">Cantidad a comprar: </label>
                            <input type="number" class="form-control" id="cantidad" onchange="subTotal();"  value="`+ product.count +`">
                </div>
                <div class="col order-4">
                    <p class="mb-1" style="float: right" >Costo unitario: `+ product.unitCost + " " + product.currency +`</p> 
                    <p class="mb-1" style="float: right" >Costo total: <span id="costo-Total"></span> ` + product.currency + ` </p>
                </div>
            </div>
        `
        document.getElementById("articulo").innerHTML = htmlContentToAppend;
    };
};


function subTotal(){
    var cantidad = document.getElementById('cantidad').value; 
    var precio = cart.articles[0].unitCost;
    var total = (cantidad*precio);
    
    document.getElementById('costo-Total').innerHTML = total;
    document.getElementById("sub-total").innerHTML= total;
    costEnvio2();

}

function formaDePago(){
    var pago = document.getElementById('forma-pago').value;
    let htmlContentToAppend = "";

    if(pago == "0"){
        htmlContentToAppend = "";
        }

    if (pago == "cred"){
        htmlContentToAppend +=
        `
        <label for="tarjeta">Número de tarjeta:</label>
        <input type="text" id="tarjeta" placeholder="Ingresar número de tarjeta" onblur="cargarErrores('tarjeta', 'opcion4')">
        <p><span id="opcion4" style="color: red;"></span></p>

        <label for="tarjeta">Fecha de vencimiento:</label>
        <input type="fecha" id="vencimiento" placeholder="Ingresar fecha de vencimiento" onblur="cargarErrores('vencimiento', 'opcion5')">
        <p><span id="opcion5" style="color: red;"></span></p>

        <label for="tarjeta">Código de verificación:</label>
        <input type="text" id="verificacion" placeholder="Ingresar fecha de vencimiento" onblur="cargarErrores('verificacion', 'opcion6')">
        <p><span id="opcion6" style="color: red;"></span></p>
        <button onclick="erroresPagoCredito();" type="button" class="btn btn-primary">Continuar</button>

        `
        document.getElementById('mostrar-forma-pago').innerHTML = htmlContentToAppend;
        }

    if (pago == "banc"){
        htmlContentToAppend +=
        `
        <select name="banco" id="banco" >
        <option value="Elegir" selected id="AF">Selecciona un banco</option>
        <option value="Banco Itaú Uruguay" id="BIU">Banco Itaú Uruguay</option>
        <option value="Banco Santander" id="BS">Banco Santander</option>
        <option value="BBVA" id="BBVA">BBVA</option>
        <option value="Citibank" id="CB">Citibank</option>
        <option value="HSBC Bank" id="HSBCBank">HSBC Bank</option>
        <option value="Scotiabank Uruguay" id="SBU">Scotiabank Uruguay</option>
        </select>
        <br>
        <label for="cuenta">Número de cuenta:</label>
        <input type="text" id="cuenta" value="" placeholder="Ingresar número de cuenta" onblur="cargarErrores('cuenta', 'opcion7')">
        <p><span id="opcion7" style="color: red;"></span></p>
        <button onclick="errorBanco();" type="button" class="btn btn-primary">Continuar</button>
        `
        document.getElementById('mostrar-forma-pago').innerHTML = htmlContentToAppend;
    }
};

function costEnvio2(){
    
    var cantidad = document.getElementById('cantidad').value;
    var costoEnvio = document.getElementById('costo-envio');
    let precioUnitario = cart.articles[0].unitCost;
    var tipoEnvio = document.getElementById('envio').value;
    
    let total = 0;
    var costoTotal = document.getElementById('costoTotal');

    if(tipoEnvio == "0"){
        costoEnvio.innerHTML = "-";
    }
    else{

    if (tipoEnvio == "standard"){
        costoEnv = ((cantidad * precioUnitario)*0.05).toFixed(0);
        costoEnvio.innerHTML = costoEnv;
        }
    else if (tipoEnvio  == "express"){
        costoEnv = ((cantidad * precioUnitario)*0.07).toFixed(0);
        costoEnvio.innerHTML = costoEnv;
    }
    else {
        costoEnv = ((cantidad * precioUnitario)*0.15).toFixed(0);
        costoEnvio.innerHTML = costoEnv;
    }
    
    
    total = Number(costoEnv) + Number(cantidad * precioUnitario);
    costoTotal.innerHTML = total;
}
}

function contenido(){
        var contenido = cart.articles;
        var lista="";
        var cantidad=0;
        if (contenido!=null && contenido.length>0){
            cantidad = contenido.length;
        contenido.forEach(producto => {
            lista+= "<li>" + producto.nombre + " -- $ " + producto.edad +"</li>"; 
        });
        }else {
            lista+="<div class='alert alert-warning'> El carrito está vacío </div>";

        }
        document.getElementById('articulo').innerHTML=lista;
        document.getElementById('cont').innerHTML=cantidad;
}

function erroresPagoCredito(){
    var tarjeta = document.getElementById('tarjeta');
    var vencimiento = document.getElementById('vencimiento');
    var verificacion = document.getElementById('verificacion');
    let errorPago = document.getElementById('errorPago');
    let correct1 = document.getElementById('correct1');

    if(tarjeta.value === "" || vencimiento.value === "" || verificacion.value === ""){
        correct1.style.display = 'none';
        errorPago.style.display = 'block';
        errorPago.innerHTML= "¡Error! Para poder continuar, debe completar todos los campos!";
        document.getElementById('tarjeta').classList.add('error');
        document.getElementById('vencimiento').classList.add('error');
        document.getElementById('verificacion').classList.add('error');
    } else {
        document.getElementById('tarjeta').classList.remove('error');
        document.getElementById('vencimiento').classList.remove('error');
        document.getElementById('verificacion').classList.remove('error');
        errorPago.style.display = 'none';
        correct1.style.display = 'block';
        correct1.innerHTML = "¡Listo! Puede cerrar la ventana y continuar...";
    }
    }

function errorBanco(){
    var cuenta = document.getElementById('cuenta');
    let errorPago = document.getElementById('errorPago');
    let correct1 = document.getElementById('correct1');
    let banco = document.getElementById('banco').value;

    if (cuenta.value == "" || banco == 'Elegir'){
        correct1.style.display = 'none';
        errorPago.style.display = 'block';
        errorPago.innerHTML= "¡Error! Para poder continuar, debe seleccionar un banco e ingresar número de cuenta!";
        document.getElementById('cuenta').classList.add('error');
    }else{
        document.getElementById('cuenta').classList.remove('error');
        errorPago.style.display = 'none';
        correct1.style.display = 'block';
        correct1.innerHTML = "¡Listo! Puede cerrar la ventana y continuar...";
    }
}

function errores(){
    var calle = document.getElementById('calle').value;
    var numero = document.getElementById('numero').value;
    var esquina = document.getElementById('esquina').value;
    
    let error = document.getElementById('error');
    //let correct = document.getElementById('correct');

    if (calle == "" || numero == "" || esquina == ""){
        error.style.display = 'block';
        error.innerHTML = "¡ERROR! ¡Para finalizar el proceso de compra, verifique que haya completado todos los campos, que haya seleccionado un tipo de envío y una forma de pago! ";
        document.getElementById('calle').classList.add('error');
        document.getElementById('numero').classList.add('error');
        document.getElementById('esquina').classList.add('error');
        

    } else {
        document.getElementById('calle').classList.remove('error');
        document.getElementById('numero').classList.remove('error');
        document.getElementById('esquina').classList.remove('error');
       

        error.innerHTML = '';
        mostrarMsjCompra();
        
    }
}

function activarBoton(){
    var envio = document.getElementById('envio').value;
    var pago = document.getElementById('forma-pago').value;
    if (envio === "standard" || envio === "express" || envio === "premium" ){
        enableBtnPagar();
        }else{
        disableBtnPagar();
    }
    if(pago === "cred" || pago === "banc"){
        enableBtnPagar();
    } else {
        disableBtnPagar();
    }
}

function disableBtnPagar() {
    document.getElementById("pagar").disabled = true;
}

function enableBtnPagar() {
    document.getElementById("pagar").disabled = false;
}


function cargarErrores(id, idMensaje) {
    
     var elementos = document.getElementById(id);
      var elementError = document.getElementById(idMensaje);
    if(elementos.value==''){
        elementError.style.display = "block";
        elementError.innerHTML = "Debe ingresar " + elementos.id + "!";
         //elementNombre.classList.add("error");
    }
    else {(elementos.classList.remove("error"));
    elementError.innerHTML="";
 }
}

function mostrarMsjCompra(){
    let htmlContentToAppend =  "";
    
    htmlContentToAppend = `
    <div class="modal fade" id="mensajeCompra" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
    <div class="modal-content">
    <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">Compra finalizada</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
    <div class="text-success">`+ mensaje + `</div>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
    </div>
    </div>
    </div>
    </div>
    `

document.getElementById('mostrarMsj').innerHTML = htmlContentToAppend;

}

$('#medioPago').on('shown.bs.modal', function () {
    $('#tarjeta').trigger('focus')
})

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            cart = resultObj.data;
        }


        contenido();
        showProductCart(cart.articles);
        subTotal();
        activarBoton();
    });   

    getJSONData(CART_BUY_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            mensaje = resultObj.data.msg;
            console.log(mensaje);
    }
 });
});