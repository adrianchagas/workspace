var product = {};
var comments = [];
var contador;
var imagenes = [];
var relacionados = [];

function showImagesGallery(array){
    let htmlContentToAppend = "";
    
    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];         

        if (i==0){
            htmlContentToAppend += 
            `<div class='carousel-item active'> 
            <img class='dblock w-100'  src=` + imageSrc +` alt='`+ [i] + `' width=100 height=600> </div>
            </div>`
            } else{
            htmlContentToAppend += 
                `<div class='carousel-item '>  
                <img class='dblock w-100'  src=" `+ imageSrc +`" alt='`+ [i] + `' width=100 height=600> </div>
                `
        }
        i++; 
     }
    document.getElementById('imagesGallery').innerHTML=htmlContentToAppend;
}

function showRelatedProducts(array){
let htmlContentToAppend = "";

getJSONData(PRODUCTS_URL).then(function(resultObj) {
    if (resultObj.status === "ok") {
        productsList = resultObj.data;
    
            for(let i = 0; i < array.length; i++){
                let relacionados = array[i];

                for (let i = 0; i < productsList.length; i++) {
                    let indice = productsList[i];

                if (relacionados === i){
                htmlContentToAppend += `
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="`+ indice.imgSrc +`" alt="producto relacionado">
                        <div class="card-body">
                            <h5 class="card-text">` + indice.name + ' ' + indice.currency +
                            ' ' + indice.cost + `</h5>
                            <a href="product-info.html" class="card-link">Ver más</a>  
                        </div>
                </div>`
            document.getElementById('relatedProducts').innerHTML = htmlContentToAppend;
            }
           }
        }
      }
   });
}


function cargarErrores(id, idMensaje){
    var comentario = document.getElementById(id);
    var error = document.getElementById(idMensaje);

    if (comentario.value === '') {
        error.style.display = 'block';
        error.innerHTML= "¡Debe ingresar " + comentario.id + "!";
        comentario.classList.add("error");

    } else {(comentario.classList.remove("error"))
        error.innerHTML="";
        } 
    }

function calificar(item){
    contador = item.id[0]; //captura el primer caracter
    let nombre = item.id.substring(1); // captura todo menos el primer caracter

    for (let i =0; i < 5; i++){
        if (i<contador){
            document.getElementById((i+1)+nombre).classList.add("checked");
        } else {
                document.getElementById((i+1)+nombre).classList.remove("checked");
        }
    }
}

function comment(){
    var hoy = new Date();
    var fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha + ' ' + hora;
    var usuario = sessionStorage.getItem('value');
    var comentario = document.getElementById('comentario').value;
    let estrella = `<span class="fa fa-star"></span>`;
    let estrellaCheck = `<span class="fa fa-star checked"></span>`;
    let calificacion = estrellaCheck.repeat(contador);
    let estrellasSobran = estrella.repeat(5 -contador);
    let mostrarCalificacion = calificacion + estrellasSobran;
    let error = document.getElementById('opcion1');
    
    let htmlContentToAppend = "";

    if (comentario === ''){
        error.style.display = 'block';
        error.innerHTML = "¡Para poder comentar, el campo no debe estar vacío... por favor ingrese un comentario!!!";
        document.getElementById('comentario').classList.add('error');
    }else{
        document.getElementById('comentario').classList.remove('error');
        error.innerHTML = '';

        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1" style="color: #4e5057"><b>` +  usuario +`</b></h6>
                            <small class="text-muted"> `+ fechaYHora +`</small>
                        </div>
                        <h6 class="mb-1">" ` + comentario + ` "</h6>
                        ` + mostrarCalificacion +`
                        
                    </div>
                </div>
            </div>
        `
        document.getElementById('comments').innerHTML += htmlContentToAppend;
    }
}

function showComment(){
    let htmlContentToAppend = "";
    for(let i = 0; i < comments.length; i++){
        let comment = comments[i];
        let estrella = `<span class="fa fa-star"></span>`;
        let estrellaCheck = `<span class="fa fa-star checked"></span>`;
        let calificacion = estrellaCheck.repeat(comment.score);
        let estrellasSobran = estrella.repeat(5 -comment.score);
        let mostrarCalificacion = calificacion + estrellasSobran;

        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1"><b>` + comment.user  +`</b></h6>
                            <small class="text-muted"> `+ comment.dateTime +`</small>
                        </div>
                        <h6 class="mb-1">" ` + comment.description + ` "</h6>
                        ` + mostrarCalificacion +`
                        
                    </div>
                </div>
            </div>
        `
        document.getElementById('comments').innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById('productSoldCount')
            let productCategoryHTML = document.getElementById('productCategory')
            //let productRelatedProductHTML = document.getElementById("relatedProducts");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML =  product.cost + ' ' + product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            showRelatedProducts(product.relatedProducts)
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            comments = resultObj.data;
            //Muestro los comentarios
            showComment();
        }
    });

});