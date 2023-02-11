function backup (key,variable){
    if (localStorage.getItem(key, variable)){
        return localStorage.getItem(key, variable)
    }
    else{
        return false
    }
}


function tofixear2(numero){
    return Number(Number(numero).toFixed(2));
}

//Esta funcion sirve para calcular en cuanto queda el prec1io de un producto con el descuento aplicado
function restdescuento(desc,monto){
return (monto/100)*desc;}

//Esta funcion es para hacer la comprobacion
function comprobarnombresp(product){
    return product.nombre == nombreproducto;
}

function renderdescuentos(){
    
    document.getElementById("nombredeldescuento").innerHTML = "Nombre del descuento: " + "<b>" + nombredeldescuento  + "</b>";
    //al final use .innerHTML en lugar de alert() porque asi no desaparece la informacion y es mas comodo, lo mismo para todos los siguientes.
    document.getElementById("descuento").innerHTML = "Su numero de descuento es " + "<b>" + descuento +"%." + "</b>";
    //Esta variable es el tope que te devuelven, el maximo que te llegan a reintegrar. 
    //let  topereintegro = prompt("Ingrese el tope de descuento");

    //En esta variable esta el calculo del maximo que uno puede gastar para que se aplique el descuento a todo.
    if (descuento == 0 || topereintegro == 0 ){
        descmaximo = 0;
    }
    else{
        descmaximo = (tofixear2((topereintegro * 100) / descuento)) * contador_cuentas;
    }
    document.getElementById("topereintegro").innerHTML = "El tope de reintegro es de " + "<b>" + (topereintegro * contador_cuentas) + "</b>" + " pesos.";

    document.getElementById("valormaximo").innerHTML = "El monto maximo hasta donde aplica el descuento es: " +  "<b>" + descmaximo + "</b>" + " pesos.";
}


//Esto es para mostrar lo que queda restante para gastar, si te pasaste te lo dice y por cuanto, sino te dice cuanto te queda.
function calcularrestante(){
    restante = descmaximo - total;
    if (restante < 0){
        restante = "<b>Te pasaste del maximo por </b>" + Math.abs(restante) + " pesos"
    }
    else{
        restante = tofixear2(restante);
        restante = "Te quedan " + "<b>" + restante + "</b>" + " pesos para llegar al maximo donde el descuento se aplica."
    }
    //muestra el restante para gastar.
    document.getElementById("restante").innerHTML = restante;
}
//Esto es para limitar el descuento total y lo descontado si se pasa del maximo
function calculartotales(){
    if (total >= descmaximo){
        totalcondect = tofixear2(total - topereintegro);
        totaldescontado = topereintegro;
    }
    else{
        totalcondect = tofixear2(total - restdescuento(descuento,total));
        totaldescontado = restdescuento(descuento,total);
    }
    //Muestra los totales:
    document.getElementById("total").innerHTML = "<b>Total sin descuento: </b>" + total + "<b>, total con descuento: </b>" + totalcondect+ "<b>, total descontado: </b>" + totaldescontado;
    //Muestra la variable con toda la info de los productos
    document.getElementById("productos").innerHTML = text.join("");
    localStorage.setItem("total", total)
}

function comprobarnombres(product){
    return product.nombre === nombreproducto;
}

function comprobarnombresb(product){
    return product.nombre === nombrebusquedab;
}










//clase para construir los distintos productos, con el nombre del producto, el precio y el precio con el descuento del mismo.


function comprobartachadas(comprobado){
    for (let x of lista_tachados){
        if (x == comprobado.nombre){
            return true
        }
    }
}

function botontachadas(nombreproducto){
    let indexproductos = productos.findIndex((element) => element.nombre == nombreproducto)
    let preciotachado = productos[indexproductos].precio;
    let cantidadtachada = productos[indexproductos].cantidad;
    if (lista_tachados.find(element => element == nombreproducto)){
        let nombre = lista_tachados.find(element => element.nombre == nombreproducto);
        let index = lista_tachados.findIndex((element) => element == nombre);
        lista_tachados.splice(index,1,);
        total += preciotachado * cantidadtachada;
        totaltachados -= preciotachado * cantidadtachada;
        renderproducts();
        calculartotales();
        calcularrestante();
        lista_tachadosjson = JSON.stringify(lista_tachados)
        localStorage.removeItem("lista_tachados")
        localStorage.setItem("lista_tachados", lista_tachadosjson)
        localStorage.removeItem("total")
        localStorage.setItem("total", total)
        localStorage.removeItem("totaltachados")
        localStorage.setItem("totaltachados", totaltachados)
    }
    else{
        lista_tachados.push(nombreproducto)
        total -= preciotachado * cantidadtachada;
        totaltachados += preciotachado * cantidadtachada;
        renderproducts();
        calculartotales();
        calcularrestante();
        lista_tachadosjson = JSON.stringify(lista_tachados)
        localStorage.removeItem("lista_tachados")
        localStorage.setItem("lista_tachados", lista_tachadosjson)
        localStorage.removeItem("total")
        localStorage.setItem("total", total)
        localStorage.removeItem("totaltachados")
        localStorage.setItem("totaltachados", totaltachados)
    }
}

function renderproducts(){
    text = [];
    let i = 0;
    for (let x of productos){
        i++
        if (comprobartachadas(x)){
            text.push("<div class='products'><p class='tachado'><b>Producto: </b>" + x.nombre+ "<button><i class='fa-solid fa-pen-to-square edit_icon disabled_icon'></i></button>" + "<b> - Cantidad: </b>" +"<select id='select"+ i + "' onchange='cambiarcantidad(`"+ x.nombre +"`)' disabled>" + selectfunction(x.cantidad) + "</select>" + "<b> - Precio: </b>" + x.precio * x.cantidad + " ("+ x.precio +" c/u)" + "<button><i class='fa-solid fa-pen-to-square edit_icon disabled_icon'></i></button>" + "<b> - Precio con el descuento: </b>" + x.preciocondesct() * x.cantidad + " ("+ x.preciocondesct() +" c/u)" + "<button><i class='material-icons' onclick=botontachadas(`" + x.nombre + "`)>check_box</i></button>" + "<div><button><i class='fa-solid fa-trash error_icon' onclick=remover(`"+ x.nombre +"`)></i></button></div>" + "</p></div>")
        }
        else{
            text.push("<div class='products'><p><b>Producto: </b>" + x.nombre+ "<button><i class='fa-solid fa-pen-to-square edit_icon' onclick=edit_productnombre(`"+ x.nombre +"`)></i></button>" + "<b> - Cantidad: </b>" +"<select id='select"+ i + "' onchange='cambiarcantidad(`"+ x.nombre +"`)'>" + selectfunction(x.cantidad) + "</select>" + "<b> - Precio: </b>" + x.precio * x.cantidad + " ("+ x.precio +" c/u)" + "<button><i class='fa-solid fa-pen-to-square edit_icon' onclick=edit_productprecio(`"+ x.nombre +"`)></i></button>" + "<b> - Precio con el descuento: </b>" + x.preciocondesct() * x.cantidad + " ("+ x.preciocondesct() +" c/u)" + "<button><i class='material-icons' onclick=botontachadas(`" + x.nombre + "`)>check_box_outline_blank</i></button>" +  "<div><button><i class='fa-solid fa-trash error_icon' onclick=remover(`"+ x.nombre +"`)></i></button></div>" + "</p></div>")
        }
        
        document.getElementById("productos").innerHTML = text.join("");
        productosjson = JSON.stringify(productos);
        localStorage.removeItem("productos");
        localStorage.setItem("productos", productosjson)
        localStorage.removeItem("contadorproductos");
        localStorage.setItem("contadorproductos", contadorproductos);
        calcularrestante();
        calculartotales();
}}

function  cambiarcantidad(objeto){
    let index = productos.findIndex(producto => producto.nombre === objeto);
    total -= productos[index].precio * productos[index].cantidad;
    let laid = "select" + (index + 1);
    productos[index].cantidad = Number(document.getElementById(laid).value);
    total += productos[index].precio * productos[index].cantidad;
    calcularrestante()
    calculartotales()
    renderproducts()
}


function selectfunction(objeto){
    let select = [];
    for (let i = 1; i < 100; i++) {
        select.push('<option value="'+ i +'">'+ i +'</option>');
        if (i === objeto){
            let opcion = '<option value="'+ i +'" selected>'+ i +' </option>';
            select.splice(objeto - 1,1,opcion);
        }
    }
    return select.join("")
}


formularioagregarproducto.addEventListener("submit", function(event){
    event.preventDefault()
    if (topereintegro === 0 || descuento === 0){
        document.getElementById("errorproducto").innerHTML = "<p class='error'>Primero ingrese un numero de descuento y tope de reintegro</p>"
    }
    else{
        let inputnombre = document.getElementById("nombreproducto")
        let inputprecio = document.getElementById("precioproducto")
        nombreproducto = inputnombre.value;
        precio = Number(inputprecio.value);
        if (nombreproducto === ""){
            precio = 0;
        }
        else if (productos.find(comprobarnombres)){
            document.getElementById("errorproducto").innerHTML = "<p class='error'>Ya existe un producto con ese nombre</p>"
        }
        else {
            document.getElementById("errorproducto").innerHTML = "";
            productos[contadorproductos] = new Producto (nombreproducto, precio)
            total += productos[contadorproductos].precio;
            contadorproductos++;
            renderproducts()
            if (total >= descmaximo){
                document.getElementById("errortopeproducto").innerHTML = "<p class='error'>Se alcanzo el tope donde el descuento se aplica</p>";
            }
        }

    }
})
//este evento es para buscar un producto por el nombre
formulariobusquedanombre.addEventListener("submit", function(event){
    event.preventDefault()
    let inputnombrebusqueda = document.getElementById("nombreproductobusqueda")
    nombrebusquedab = inputnombrebusqueda.value
    if (productos.find(comprobarnombresb)){
        Swal.fire({
            icon: 'success',
            title: 'Producto encontrado',
            text: productos.find(comprobarnombresb).nombre  + ": " + productos.find(comprobarnombresb).precio + "$",
        })
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'No se encontro un producto con ese nombre',
        })
    }
})

//Esta funcion es para hacer la comprobacion
function comprobaprecio(product){
    return product.precio == preciobusqueda;
}

//Esta funcion es para agregar los nombres de los productos del array de objetos que coincidan con la busqueda por precio
function listarprecios(x){
    for (let y of x){
        listaprecio.push(y.nombre);
    }
}
//este evento es para buscar un producto por el precio

formulariobusquedaprecio.addEventListener("submit", function(event){
    event.preventDefault()
    let inputpreciobusqueda = document.getElementById("precioproductobusqueda")
    preciobusqueda = Number(inputpreciobusqueda.value)
    if (productos.filter(comprobaprecio) == ""){
        Swal.fire({
            icon: 'error',
            title: 'No se encontro ningun producto con ese precio',
        })
    }
else{
    let x = productos.filter(comprobaprecio);
    listarprecios(x);
    Swal.fire(
        'Se encontraron productos con ese precio:',
        "<b>Productos: </b>" + listaprecio.join(", "),
        'success'
    )
}
})

function edit_productprecio(nombreaeditar){
    let index = productos.findIndex(producto => producto.nombre === nombreaeditar);
    Swal.fire({
        title: 'Editar el precio del producto',
        input: 'number',
        inputLabel: 'Nombre actual: ' + productos[index].nombre,
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
            return 'Por favor introduce un precio para el producto.'
            }
        },
        inputValidator: (value) => {
            total -= productos[index].precio * productos[index].cantidad,
            productos[index].precio = Number(value),
            total += productos[index].precio * productos[index].cantidad,
            productos[index].preciocondesct(),
            calcularrestante(),
            calculartotales(),
            renderproducts();
        }
    })
}



function edit_productnombre(nombreaeditar){
    let index = productos.findIndex(producto => producto.nombre === nombreaeditar);
    Swal.fire({
        title: 'Editar el nombre del producto',
        input: 'text',
        inputLabel: 'Nombre actual: ' + productos[index].nombre,
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
            return 'Por favor introduce un nombre para el producto.'
            }
        },
        inputValidator: (value) => {
            productos[index].nombre = value;
            renderproducts();}
        })

}

//Esto esta para que cuando pulses para borrar un objeto te pida confirmacion y en caso de que sea si borre dicho producto
function remover(nombrearemover){
    Swal.fire({
        title: '¿Seguro que desea eliminar el producto?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
        let index = productos.findIndex(producto => producto.nombre === nombrearemover);
        total = total - (productos[index].precio * productos[index].cantidad)
        productos.splice(index,1,);
        contadorproductos--
        renderproducts();
        calcularrestante();
        calculartotales();
        } 
    })
}
//esta funcion borra toda la lista de productos
function limpiarlista(){
    Swal.fire({
        title: '¿Seguro que desea borrar la lista de productos?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
        Swal.fire('Lista borrada!', '', 'success')
        productos = [];
        productosjson = JSON.stringify(productos);
        total = 0;
        contadorproductos = 0;
        lista_tachados = [];
        totaltachados = 0;
        localStorage.removeItem("productos");
        localStorage.removeItem("total");
        localStorage.removeItem("contadorproductos");
        localStorage.setItem("productos", productosjson)
        localStorage.setItem("total", total)
        localStorage.setItem("contadorproductos", contadorproductos);

        lista_tachadosjson = JSON.stringify(lista_tachados)
        localStorage.removeItem("lista_tachados")
        localStorage.setItem("lista_tachados", lista_tachadosjson)
        localStorage.removeItem("totaltachados")
        localStorage.setItem("totaltachados", totaltachados)





        renderproducts();
        calcularrestante();
        calculartotales();
        } else if (result.isDenied) {
        Swal.fire('No se elimino la lista', '', 'error')
        }
    })
}




function reincorporarproductos(){
    let contador = 0;
    let listatemporal = [];
    for (let x of productos){
    listatemporal[contador] = new Producto (x.nombre, x.precio, x.cantidad)
    contador++
    }
    productos = listatemporal
}

function reincorporarlista_descuentos(){
    let contador = 0;
    let listatemporal = [];
    for (let x of lista_descuentos){
    listatemporal[contador] = new Descuento (x.nombre, x.descuento, x.topedereintegro, x.fecha)
    contador++
    }
    lista_descuentos = listatemporal
}


function opciones_descuentos(){
    let i = 1;
    let opcion = '<option value="1" selected>Elija una promocion</option>';
    for (let x of lista_descuentos){
            i++
            opcion += '<option value="'+ i +'">'+ x.nombre + x.descuento + x.topedereintegro + x.fecha +' </option>';
            }
            let select = "<select id='selectordescuento' onchange='cambiardescuento()'>" + opcion + "</select>"
            document.getElementById("selector_descuentos").innerHTML = select;
}


function cambiarbanco(){
    banco = document.getElementById("bancos").value;
    if (banco == 1){
        fetch("descuentos_cuentadni.json")
            .then((resp) => resp.json())
            .then((data) => {
                document.getElementById("descuentos_otros").style.display = "none";
                document.getElementById("botones_otros").style.display = "none";
                lista_descuentos = data;
                opciones_descuentos()
                })
        }
    else if ( banco == 2){
        fetch("descuentos_bna.json")
            .then((resp) => resp.json())
            .then((data) => {
                document.getElementById("descuentos_otros").style.display = "none";
                document.getElementById("botones_otros").style.display = "none";
                lista_descuentos = data;
                opciones_descuentos()
                })
    }
    else{
        document.getElementById("descuentos_otros").style.display = "flex";
        document.getElementById("botones_otros").style.display = "flex";
        if (backup("lista_descuentos", lista_descuentosjson)){
            lista_descuentos = JSON.parse(backup("lista_descuentos", lista_descuentosjson));
        }
        else{
            lista_descuentos = [];
        }
        opciones_descuentos()
    }
}
function cambiardescuento(){
    let id = document.getElementById("selectordescuento").value;
    if (id != 1){
        nombredeldescuento = lista_descuentos[id-2].nombre;
        descuento = lista_descuentos[id-2].descuento;
        topereintegro = lista_descuentos[id-2].topedereintegro;
        localStorage.removeItem("nombredeldescuento");
        localStorage.setItem("nombredeldescuento", nombredeldescuento);
        localStorage.removeItem("descuento");
        localStorage.setItem("descuento", descuento);
        localStorage.removeItem("topereintegro");
        localStorage.setItem("topereintegro", topereintegro);
        renderdescuentos()
        calcularrestante()
        calculartotales()
        renderproducts()
    }
}

//este evento es para registrar el descuento y el tope de reintegro por el formulario y dar un error en caso de ser necesario
formularioDescuentos.addEventListener("submit", function(event){
    event.preventDefault()
    let inputnombre = document.getElementById("nombredescuento").value
    let inputdescuento = Number(document.getElementById("numdescuento").value)
    let inputtopereinte = Number(document.getElementById("topereinte").value)
    let inputfecha = document.getElementById("fechadescuento").value
    if (inputnombre === null || inputtopereinte === 0 || inputdescuento === 0){
        document.getElementById("errordescuento").innerHTML = "<p class='error'>Por lo menos debe poner nombre, numero de descuento y el tope de reintegro</p>"
    }
    else {
        document.getElementById("errordescuento").innerHTML = "";
        lista_descuentos.push(new Descuento (inputnombre,inputdescuento,inputtopereinte,inputfecha))
        lista_descuentosjson = JSON.stringify(lista_descuentos)
        localStorage.removeItem("lista_descuentos");
        localStorage.setItem("lista_descuentos", lista_descuentosjson)
        opciones_descuentos()
    }
})

function sumrestcuentas(simbolo){
    if (simbolo == "-"){
        if (contador_cuentas == 1){
        }
        else{
            contador_cuentas--
            document.getElementById("contadorsumaresta").innerHTML = contador_cuentas;
            localStorage.removeItem("contador_cuentas")
            localStorage.setItem("contador_cuentas", contador_cuentas)
            calcularrestante()
            renderdescuentos()
            calcularrestante()
        }
    }
    else{
        contador_cuentas++
        document.getElementById("contadorsumaresta").innerHTML = contador_cuentas;
        localStorage.removeItem("contador_cuentas")
        localStorage.setItem("contador_cuentas", JSON.stringify(contador_cuentas))
        calcularrestante()
        renderdescuentos()
        calcularrestante()
    }
}

function limpiarotros(){
    Swal.fire({
        title: '¿Seguro que desea borrar la lista de descuentos?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
        Swal.fire('Lista borrada!', '', 'success')
        lista_descuentos = [];
        lista_descuentosjson = [];
        localStorage.removeItem("lista_descuentos");
        opciones_descuentos()
        } else if (result.isDenied) {
        Swal.fire('No se elimino la lista', '', 'error')
        }
    })

}

function opciones_descuentospararemover(){
    let i = 1;
    let opcion = '<option value="1" selected>Elija una promocion</option>';
    for (let x of lista_descuentos){
            i++
            opcion += '<option value="'+ i +'">'+ x.nombre + x.descuento + x.topedereintegro + x.fecha +' </option>';
            }
            let select = "<select id='selectordescuentopararemover'>" + opcion + "</select>"
            return select;
}



function otrospararemover(){
}



async function removerdeotros(){
        await Swal.fire({
            title: 'Select field validation',
            html: opciones_descuentospararemover(),
            inputPlaceholder: 'Select a fruit',
            showCancelButton: true,
            preConfirm: () =>{
                let select = document.getElementById("selectordescuentopararemover");
                let valor = select.value
                if (valor == 1){
                    Swal.showValidationMessage("Debe elegir un descuento para remover")
                    return false
                }
                else{
                    lista_descuentos.splice(valor-2,1,)
                    lista_descuentosjson = JSON.stringify(lista_descuentos)
                    localStorage.removeItem("lista_descuentos");
                    localStorage.setItem("lista_descuentos", lista_descuentosjson)
                    opciones_descuentos();
                }
            }
        })
}