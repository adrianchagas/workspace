const ORDER_ASC_BY_COST = "min-max";
const ORDER_DESC_BY_COST = "max-min";
const ORDER_DESC_BY_SOLD_COUNT = "relevancia";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aSold = parseInt(a.soldCount);
            let bSold = parseInt(b.soldCount);

            if ( aSold > bSold ){ return -1; }
            if ( aSold < bSold ){ return 1; }
            return 0;
        });
    }
    return result;
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
        ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
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
            </a>
        `
        document.getElementById("list-products").innerHTML = htmlContentToAppend;
    };
};
};

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

function filtrar(){
    var form = document.getElementById('formulario');
    var texto = form.value;
    var listProducts = document.getElementById('list-products');
    var products = listProducts.document.getElementsByTagName('a');
    
    console.log(texto)
        for (i = 0; i < products.length; i++){
            var product = products.document.getElementsByClassName('mb-1');
            let nombre = product[0].innerHTML.toUpperCase();
            let descr = product[1].innerHTML.toUpperCase();
            console.log(products[i])
            if ((nombre.indexOf(texto.toUpperCase()) > -1) || (descr.indexOf(texto.toUpperCase()) > -1)){
                products[i].style.display = "";
            }else {
                products[i].style.display = "none";
            }
        }
};


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
         if (resultObj.status === "ok"){ 
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });


    document.getElementById("sortAscProducts").addEventListener("click", function(){
         sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDescProducts").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCostProducts").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilterProducts").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMinProducts").value = "";
        document.getElementById("rangeFilterCostMaxProducts").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

document.getElementById("rangeFilterCost").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de precio.
    minCost = document.getElementById("rangeFilterCostMinProducts").value;
    maxCost = document.getElementById("rangeFilterCostMaxProducts").value;

    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
        minCost = parseInt(minCost);
    }
    else{
        minCost = undefined;
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
        maxCost = parseInt(maxCost);
    }
    else{
        maxCost = undefined;
    }

    showProductsList();
});
});