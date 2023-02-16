//Verifica si hay un dato guardado en la memoria para recuperar
function backup (key,variable){
    if (localStorage.getItem(key, variable)){
        return localStorage.getItem(key, variable)
    }
    else{
        return false
    }
}
//Devuelve un numero acortandole los decimales
function tofixear2(numero){
    return Number(Number(numero).toFixed(2));
}
//Esta funcion sirve para calcular en cuanto queda el prec1io de un producto con el descuento aplicado
function restdescuento(desc,monto){
    return (monto/100)*desc;
}
//renderiza los descuentos
function renderdescuentos(){
    if (nombredeldescuento){
        document.getElementById("nombredeldescuento").innerHTML = `Nombre del descuento: <span class='bold-text importante'>${nombredeldescuento} (${nombredelbanco})</span>`;
    }
    document.getElementById("descuento").innerHTML = "Su porcentaje de descuento es " + "<span class='bold-text importante'>" + descuento +"%." + "</span>";
    if (descuento == 0 || topereintegro == 0 ){
        descmaximo = 0;
    }
    else{
        descmaximo = (tofixear2((topereintegro * 100) / descuento)) * contador_cuentas;
    }
    document.getElementById("topereintegro").innerHTML = "El tope de reintegro es de " + "<span class='bold-text importante'>" + (topereintegro * contador_cuentas) + "</span>" + " pesos.";

    document.getElementById("valormaximo").innerHTML = "El monto maximo hasta donde aplica el descuento es de " +  "<span class='bold-text importante'>" + descmaximo + "</span>" + " pesos.";
    document.getElementById("contadorsumaresta").innerHTML = contador_cuentas;
}
//Esto es para calcular lo que queda restante para gastar, si te pasaste te lo dice y por cuanto, sino te dice cuanto te queda.
function calcularrestante(){
    restante = descmaximo - total;
    if (restante < 0 && topereintegro != 0){
        restante = "<span class='bold-text'>Te pasaste del maximo por </span>" + tofixear2(Math.abs(restante)) + " pesos";
        document.getElementById("errortopeproducto").innerHTML = "<p class='error'>Se alcanzo el tope donde el descuento se aplica</p>";
    }
    else{
        restante = tofixear2(restante);
        restante = "Te quedan " + "<span class='bold-text'>" + restante + "</span>" + " pesos para llegar al maximo donde el descuento se aplica."
        document.getElementById("errortopeproducto").innerHTML = "";
    }
    //muestra el restante para gastar.
    document.getElementById("restante").innerHTML = restante;
}
//Esto te calcula los totales y te los renderiza
function calculartotales(){
    if (total >= descmaximo && topereintegro != 0){
        totalcondect = tofixear2(total - topereintegro);
        totaldescontado = topereintegro;
        document.getElementById("errortopeproducto").innerHTML = "<p class='error'>Se alcanzo el tope donde el descuento se aplica</p>";
    }
    else{
        totalcondect = tofixear2(total - restdescuento(descuento,total));
        totaldescontado = restdescuento(descuento,total);
        document.getElementById("errortopeproducto").innerHTML = "";
    }
    //Muestra los totales:
    document.getElementById("total").innerHTML = `<span class='bold-text'>Total sin descuento: </span>${total}<span class='bold-text'>, total con descuento: </span>${totalcondect}<span class='bold-text'>, total descontado: </span><span>${tofixear2(totaldescontado)}</span>`;
    localStorage.setItem("total", total);
}
//comprueba el nombre que le das con el del producto
function comprobarnombres(product){
    return product.nombre === nombreproducto;
}
//Comprueba si esta en la lista de tachadas
function comprobartachadas(comprobado){
    for (let x of lista_tachados){
        if (x == comprobado.nombre){
            return true
        }
    }
}
//funcion del boton de tachadas. Se fija si el nombre del producto ya esta en la lista de tachadas, si no lo esta lo agrega y quita su precio al total, sino lo quita de las tachadas y suma su precio al total de nuevo.
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
//renderiza los productos
function renderproducts(){
    text = [];
    let i = 0;
    if (productos.length == 0){
        document.getElementById("productos").innerHTML = "No hay ningun producto.";
    }
    else{
        for (let x of productos){
            i++
            if (comprobartachadas(x)){
                text.push(`<div class='products container-fluid'><div class='conjuto-productos'><div class='pcp'><div class='pc'><div></div><p class='tachado'><span class='bold-text'>Producto:</span>${x.nombre}<button><i class='fa-solid fa-pen-to-square edit_icon disabled_icon'></i></button></p><p class='tachado'><span class='bold-text'> - Cantidad:</span><select id='select${i}' class="form-select" onchange="cambiarcantidad('` + x.nombre + `')" disabled>${selectfunction(x.cantidad)}</select></p></div><div class='divprecio'><p class='tachado'><span class='bold-text'> - Precio:</span></p><p class='tachado'>${x.precio * x.cantidad} (${x.precio} c/u)<button><i class='fa-solid fa-pen-to-square edit_icon disabled_icon'></i></button></p></div></div><div class='preciod'><div class='divpreciodesc'><p class='tachado'><span class='bold-text'> - Precio con descuento:</span></p><p class='tachado'>${x.preciocondesct() * x.cantidad} (${x.preciocondesct()} c/u)</p></div></div></div><div class='botones'><button><i class='material-icons' onclick="botontachadas('` + x.nombre + `')">check_box</i></button><button><i class='fa-solid fa-trash error_icon' onclick="remover('` + x.nombre + `')"></i></button></div></div><hr>`)
            }
            else{
                text.push(`<div class='products container-fluid'><div class='conjuto-productos'><div class='pcp'><div class='pc'><div></div><p><span class='bold-text'>Producto:</span>${x.nombre}<button><i class='fa-solid fa-pen-to-square edit_icon' onclick="edit_productnombre('` + x.nombre + `')"></i></button></p><p><span class='bold-text'> - Cantidad:</span><select id='select${i}' class="form-select" onchange="cambiarcantidad('` + x.nombre + `')">${selectfunction(x.cantidad)}</select></p></div><div class='divprecio'><p><span class='bold-text'> - Precio:</span></p><p>${x.precio * x.cantidad} (${x.precio} c/u)<button><i class='fa-solid fa-pen-to-square edit_icon' onclick="edit_productprecio('` + x.nombre + `')"></i></button></p></div></div><div class='preciod'><div class='divpreciodesc'><p><span class='bold-text'> - Precio con descuento:</span></p><p>${x.preciocondesct() * x.cantidad} (${x.preciocondesct()} c/u)</p></div></div></div><div class='botones'><button><i class='material-icons' onclick="botontachadas('` + x.nombre + `')">check_box_outline_blank</i></button><button><i class='fa-solid fa-trash error_icon' onclick="remover('` + x.nombre + `')"></i></button></div></div><hr>`)
            }
            
            document.getElementById("productos").innerHTML = text.join("");
            productosjson = JSON.stringify(productos);
            localStorage.removeItem("productos");
            localStorage.setItem("productos", productosjson)
            localStorage.removeItem("contadorproductos");
            localStorage.setItem("contadorproductos", contadorproductos);
            calcularrestante();
            calculartotales();
            if (total >= descmaximo && topereintegro != 0){
                document.getElementById("errortopeproducto").innerHTML = "<p class='error'>Se alcanzo el tope donde el descuento se aplica</p>";
            }
            else{
                document.getElementById("errortopeproducto").innerHTML = "";
            }
        }
    }
}
//funcion que se dispara cuando cambias la cantidad del select de productos
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
//esta funcion crea un select con 99 options cada uno sumandole 1 (para ahorrarme el trabajo de escribir tanto y por si alguna vez quiero cambiar el limite)
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
//detecta cuando agregas un producto, forzandote a poner el tope y descuento primero (para que no salgan numeros raros)
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
            document.getElementById("errorproducto").innerHTML = "<p class='error'>Por favor introduzca el nombre del producto que desea agregar.</p>"
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
            document.getElementById("nombreproducto").value = "";
            document.getElementById("precioproducto").value ="";
        }
        nombreproducto = "";
    }
})
//este evento es para buscar un producto por el nombre
formulariobusquedanombre.addEventListener("submit", function(event){
    event.preventDefault();
    let inputnombrebusqueda = document.getElementById("nombreproductobusqueda");
    nombreproducto = inputnombrebusqueda.value;
    if (nombreproducto == ""){
        Swal.fire('¡Ingrese el nombre de un producto!', '', 'error')
    }
    else{
        if (productos.find(comprobarnombres)){
            Swal.fire({
                icon: 'success',
                title: 'Producto encontrado',
                text: productos.find(comprobarnombres).nombre  + ": " + productos.find(comprobarnombres).precio + "$",
            })
            document.getElementById("nombreproductobusqueda").value = "";
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'No se encontro un producto con ese nombre',
            })
        }
    }
    nombreproducto = "";
})
//Esta funcion es para hacer la comprobacion del precio
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
    if (preciobusqueda == ""){
        Swal.fire('¡Ingrese el precio de un producto!', '', 'error')
    }
    else{
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
                "<span class='bold-text'>Productos: </span>" + listaprecio.join(", "),
                'success'
            )
            document.getElementById("precioproductobusqueda").value = "";
        }
    }
})
//funcion del boton para editar el precio del producto
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
//funcion del boton para editar el nombre del producto
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
    if (productos.length == 0){
        Swal.fire('¡No hay productos en la lista!', '', 'error')
    }
    else{
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
            localStorage.removeItem("totaltachados");
            localStorage.setItem("totaltachados", totaltachados);
            document.getElementById("errortopeproducto").innerHTML = "";
            renderproducts();
            calcularrestante();
            calculartotales();
            } else if (result.isDenied) {
            Swal.fire('No se elimino la lista', '', 'error')
            }
        })
    }
}
//Esta funcion es para volver a crear los productos, ya que cuando los recupero desde el json no lo tienen
function reincorporarproductos(){
    let contador = 0;
    let listatemporal = [];
    for (let x of productos){
    listatemporal[contador] = new Producto (x.nombre, x.precio, x.cantidad)
    contador++
    }
    productos = listatemporal
}
//lo mismo pero para los descuentos, mas que nada por si mas adelante le agrego metodos al mismo
function reincorporarlista_descuentos(){
    let contador = 0;
    let listatemporal = [];
    for (let x of lista_descuentos){
    listatemporal[contador] = new Descuento (x.nombre, x.descuento, x.topedereintegro, x.fecha)
    contador++
    }
    lista_descuentos = listatemporal
}
//renderiza las opciones de los descuentos
function opciones_descuentos(){
    let i = 1;
    let opcion;
    if (lista_descuentos.length == 0){
        opcion = '<option value="1" selected>Agregue un descuento</option>'
    }
    else{
        opcion = '<option value="1" selected>Elija una promocion</option>';
    }
    for (let x of lista_descuentos){
            i++
            opcion += `<option value="${i}">${x.nombre} - ${x.descuento}% - ${x.topedereintegro}$ - ${x.fecha}</option>`;
            }
            let select = `<select id='selectordescuento' class='form-select' aria-label='Default select example' onchange='cambiardescuento()'>${opcion}</select>`
            document.getElementById("selector_descuentos").innerHTML = select;
}
//Detecta cuando elejis entre las distintas opciones de bancos y otros, generando el select con descuentos correspondiente 
function cambiarbanco(){
    banco = document.getElementById("bancos").value;
    if (banco == 1){
        fetch("./descuentos_cuentadni.json")
            .then((resp) => resp.json())
            .then((data) => {
                document.getElementById("descuentos_otros").style.display = "none";
                document.getElementById("botones_otros").style.display = "none";
                document.getElementById("botonagregardescuentos").style.display = "none";
                lista_descuentos = data;
                opciones_descuentos()
                })
        }
    else if ( banco == 2){
        fetch("./descuentos_bna.json")
            .then((resp) => resp.json())
            .then((data) => {
                document.getElementById("descuentos_otros").style.display = "none";
                document.getElementById("botones_otros").style.display = "none";
                document.getElementById("botonagregardescuentos").style.display = "none";
                lista_descuentos = data;
                opciones_descuentos()
                })
    }
    else{
        if (backup("lista_descuentos", lista_descuentosjson)){
            lista_descuentos = JSON.parse(backup("lista_descuentos", lista_descuentosjson));
            document.getElementById("botonagregardescuentos").style.display = "flex";
        }
        else{
            lista_descuentos = [];
            renderagregardescuento()
        }
        opciones_descuentos()
    }
}
//detecta cuando cambias el descuento y vuelve a renderizar todo
function cambiardescuento(){
    let id = document.getElementById("selectordescuento").value;
    if (id != 1){
        nombredeldescuento = lista_descuentos[id-2].nombre;
        nombredelbanco = lista_descuentos[id-2].banco;
        descuento = lista_descuentos[id-2].descuento;
        topereintegro = lista_descuentos[id-2].topedereintegro;
        localStorage.removeItem("nombredeldescuento");
        localStorage.setItem("nombredeldescuento", nombredeldescuento);
        localStorage.removeItem("nombredelbanco");
        localStorage.setItem("nombredelbanco", nombredelbanco);
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
        document.getElementById("nombredescuento").value = "";
        document.getElementById("numdescuento").value = "";
        document.getElementById("topereinte").value = "";
        document.getElementById("fechadescuento").value = "";
        document.getElementById("descuentos_otros").style.display = "none";
        document.getElementById("botones_otros").style.display = "none";
        document.getElementById("botonagregardescuentos").style.display = "flex";
    }
})
//detecta el simbolo de la funcion y dependiendo de este suma o resta al contador
function sumrestcuentas(simbolo){
    if (simbolo == "-"){
        if (contador_cuentas == 1){
        }
        else{
            contador_cuentas--
            document.getElementById("contadorsumaresta").innerHTML = contador_cuentas;
            localStorage.removeItem("contador_cuentas")
            localStorage.setItem("contador_cuentas", contador_cuentas)
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
//boton que limpia la lista de descuentos de la seccion de "otros"
function limpiarotros(){
    if (lista_descuentos.length == 0){
        Swal.fire('¡No hay descuentos en la lista!', '', 'error')
    }
    else{
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
}
//da las opciones para el select de otros que aparece cuando le das al boton de remover, esta aparte para que no haga el resto de cosas del generador de opciones normal y con el id propio
function opciones_descuentospararemover(){
    let i = 1;
    let opcion = '<option value="1" selected>Elija una promocion</option>';
    for (let x of lista_descuentos){
            i++
            opcion += '<option value="'+ i +'">'+ x.nombre + x.descuento + x.topedereintegro + x.fecha +' </option>';
            }
            let select = "<select id='selectordescuentopararemover' class='form-select'>" + opcion + "</select>"
            return select;
}
//boton para remover una opcion de seleccion de "otros"
async function removerdeotros(){
    if (lista_descuentos.length == 0){
        Swal.fire('¡No hay descuentos en la lista!', '', 'error')
    }
    else{
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
                    Swal.fire('¡Descuento borrado!', '', 'success')
                    lista_descuentos.splice(valor-2,1,)
                    lista_descuentosjson = JSON.stringify(lista_descuentos)
                    localStorage.removeItem("lista_descuentos");
                    localStorage.setItem("lista_descuentos", lista_descuentosjson)
                    opciones_descuentos();
                }
            }
        })
    }
}
//boton para hacer aparecer el formulario y botones de los otros descuentos
function renderagregardescuento(){
    document.getElementById("botonagregardescuentos").style.display = "none";
    document.getElementById("descuentos_otros").style.display = "flex";
    document.getElementById("botones_otros").style.display = "flex";
}
