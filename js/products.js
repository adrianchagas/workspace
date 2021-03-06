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
        <div class="col-md-4">
            <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
            <img src="` + product.imgSrc + `" alt="` + product.description + `" class="bd-placeholder-img card-img-top">
            <div class="col-md-12">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1" style="width: 100%;">` + product.name + " " + `(` + product.soldCount + `)</h4>
                        
                        
                    </div>
                    <p>` + product.cost + ` ` + product.currency + `</p>
                    
                    <p style="height: 85px;" class="mb-1">` + product.description + `</p>
                </div>
            </a>
        </div>
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
    var texto = form.value.toUpperCase();
    var listProducts = document.getElementById('list-products');
    var products = listProducts.getElementsByTagName('a');
    
        for (i = 0; i < products.length; i++){
            var product = products[i].getElementsByClassName('mb-1');
            var nombre = product[0].innerHTML.toUpperCase();
            var descr = product[1].innerHTML.toUpperCase();
            if ((nombre.indexOf(texto) > -1) || (descr.indexOf(texto) > -1)){
                products[i].style.display = "";
            }else {
                products[i].style.display = "none";
            }
        }
};

//Funci??n que se ejecuta una vez que se haya lanzado el evento de
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
    //Obtengo el m??nimo y m??ximo de los intervalos para filtrar por precio
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