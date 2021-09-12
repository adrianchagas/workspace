var product = {};
var comments = [];

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

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("imagesGallery").innerHTML = htmlContentToAppend;
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
            let productRelatedProductHTML = document.getElementById("relatedProducts");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML =  product.cost + ' ' + product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productRelatedProductHTML.innerHTML = product.relatedProducts;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comments = resultObj.data;

            //Muestro los comentarios
            showComment();
        }
    });

});