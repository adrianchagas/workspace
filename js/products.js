var productsArray = [];

function showProducts(PRODUCTS_URL){

    let htmlContentToAppend = "";
    for(let i = 0; i < PRODUCTS_URL.length; i++){
        let product = PRODUCTS_URL[i];

        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src=` + product.imgSrc + ` alt=" ` + product.description + ` " class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + product.name + " " + product.currency + " " + product.cost +`</h4>
                            <small class="text-muted"> `+ product.soldCount +` artículos</small>
                        </div>
                        <p class="mb-1"> ` + product.description + ` </p>
                    </div>
                </div>
            </div>
        `
        document.getElementById("list-products").innerHTML = htmlContentToAppend;
    };
};
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
getJSONData(PRODUCTS_URL).then(function(resultObj){
         if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            //Muestro los productos
            showProducts(productsArray);
        
        };
    });
});