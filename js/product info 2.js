var contador;
function calificar(item){
    
    contador = item.id[0]; //captura el primer caracter
    let nombre = item.id.substring(1); // captura todo menos el primer caracter

    for (let i =0; i < 5; i++){
        if (i<contador){
            document.getElementById((i+1)+nombre).style.checked;
        } else {
                document.getElementById((i+1)+nombre);
            }
    }

    var califi
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha + ' ' + hora;
    var usuario = document.getElementById('usuarioLogueado').innerHTML;
    var comentario = document.getElementById('newComment').innerHTML;
    let htmlContentToAppend = "";
    for(let i = 0; i < comments.length; i++){
        let comment = comments[i];
        


        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1"><b>` + usuario  +`</b></h6>
                            <small class="text-muted"> `+ fechaYHora +`</small>
                        </div>
                        <h6 class="mb-1">" ` + comentario + ` "</h6>
                        ` + mostrarCalificacion +`
                        
                    </div>
                </div>
            </div>
        `
        document.getElementById('comments').innerHTML = htmlContentToAppend;
    }
}