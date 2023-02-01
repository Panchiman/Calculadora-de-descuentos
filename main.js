// Esto esta pensado para ser una especie de calculadora de descuentos para ofertas de bancos/tarjetas, por ejemplo las de cuenta dni o banco nacion
// Ya simula las funciones principales de la misma, tomar el descuento, el tope de reintegro y los productos con sus precios y con eso calcular el maximo que podes gastar, darte los productos en orden con su precio normal y con descuento, sumar el resultado y decirte cuanto te queda para seguir gastando.
//Obviamente estas funciones van a ser mucho mas practicas cuando pueda hacerle una interfaz interactiva.


//Este array es para la lista con todos los objetos de los productos
let productos = [];
//Esta variable lleva el total de la suma de los precios de los productos
let total = 0;
//Esta variable lleva el total de la suma de los precios de los productos con el descuento ya aplicado
let totalcondect = 0;
//esta variable tiene toda la informacion que se va a mostrar se los productos.
let text = [];
//Esto es la cantidad de dinero que queda para gastar antes de al tope en el que se aplica el descuento
let restante = 0;
//esta variable es para guardar el nombre que se busca y comprobar si coincide con algun producto
let nombrebusqueda = "";
//esta variable es para guardar el precio que se busca y comprobar si coincide con algun producto
let preciobusqueda = 0;
//Este array y funcion son para tener la lista de los productos que cumplieron con la busqueda
let listaprecio = [];
//Esta variable es para llevar el total de lo que se desconto
let totaldescontado = 0;
// Esta variable es el % del descuento
let descuento = 0;
let topereintegro = 0;
let formularioDescuentos = document.getElementById("descuentos");
let formulariobusquedanombre = document.getElementById("busquedanombre");
let formulariobusquedaprecio = document.getElementById("busquedaprecio");

let descmaximo = 0;
let contadorproductos = 0;
let nombreproducto = "";
let nombreproductob ="";
let precio = 0;
// en este json se va a guardar el array de productos convertido a json
let productosjson = "";
//Esta funcion es para que si el numero tiene decimales solo se muestren los ultimos 2

function tofixear2(numero){
    return Number(Number(numero).toFixed(2));
}

//Esta funcion sirve para calcular en cuanto queda el prec1io de un producto con el descuento aplicado
function restdescuento(desc,monto){
return (monto/100)*desc;
}

//Esta funcion es para hacer la comprobacion
function comprobarnombresp(product){
    return product.nombre == nombreproducto;
}

function renderdescuentos(){
    //al final use .innerHTML en lugar de alert() porque asi no desaparece la informacion y es mas comodo, lo mismo para todos los siguientes.
    document.getElementById("descuento").innerHTML = "Su numero de descuento es " + "<b>" + descuento +"%." + "</b>";
    //Esta variable es el tope que te devuelven, el maximo que te llegan a reintegrar. 
    //let  topereintegro = prompt("Ingrese el tope de descuento");

    //En esta variable esta el calculo del maximo que uno puede gastar para que se aplique el descuento a todo.
    descmaximo = tofixear2((topereintegro * 100) / descuento);

    document.getElementById("topereintegro").innerHTML = "El tope de reintegro es de " + "<b>" + topereintegro + "</b>" + " pesos.";

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
}

function comprobarnombres(product){
    return product.nombre === nombreproducto;
}

function comprobarnombresb(product){
    return product.nombre === nombrebusquedab;
}
//este evento es para registrar el descuento y el tope de reintegro por el formulario y dar un error en caso de ser necesario
formularioDescuentos.addEventListener("submit", function(event){
    event.preventDefault()
    let inputdescuento = document.getElementById("numdescuento")
    let inputtopereinte = document.getElementById("topereinte")
    descuento = Number(inputdescuento.value);
    topereintegro = Number(inputtopereinte.value);
    if (topereintegro === 0 || descuento === 0){
        document.getElementById("errordescuento").innerHTML = "<p class='error'>Debe llenar ambos campos</p>"
    }
    else {
        document.getElementById("errordescuento").innerHTML = ""
        renderdescuentos()
        renderproducts()
    }
})








//clase para construir los distintos productos, con el nombre del producto, el precio y el precio con el descuento del mismo.
class Producto {
    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = precio;
        this.preciocondesct = tofixear2 (this.precio - restdescuento(descuento,this.precio));
    }
}

function renderproducts(){
    text = [];
    console.log(productos)
    for (let x of productos){
        text.push("<p></p><b>Producto: </b>" + x.nombre + "<b> - precio: </b>" + x.precio + "<b> - precio con el descuento: </b>" + x.preciocondesct + "<i class='material-icons' id='"+ x.nombre +"' onclick='remover(`"+ x.nombre +"`)'>close</i>" + "<br></p>")
        document.getElementById("productos").innerHTML = text.join("");
        calcularrestante();
        calculartotales();
    }
}

let formularioagregarproducto = document.getElementById("agregarproducto");
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
        if (nombreproducto === "" || precio === 0){
            document.getElementById("errorproducto").innerHTML = "<p class='error'>Debe llenar ambos campos</p>"
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
            text: productos.find(comprobarnombresb).nombre  + ": " + productos.find(comprobarnombresb).precio,
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
        Swal.fire('Producto eliminado!', '', 'success')
        let index = productos.findIndex(producto => producto.nombre === nombrearemover);
        total = total - productos[index].precio
        productos.splice(index,1,);
        contadorproductos--
        renderproducts();
        calcularrestante();
        calculartotales();
        } else if (result.isDenied) {
        Swal.fire('No se elimino el producto', '', 'error')
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
        total = 0;
        contadorproductos = 0;
        document.getElementById("errortopeproducto").innerHTML = "";

        renderproducts();
        calcularrestante();
        calculartotales();
        } else if (result.isDenied) {
        Swal.fire('No se elimino la lista', '', 'error')
        }
    })
}

// Esta variable es para llevar registro si la lista fue guardada o no
let listaguardada = null;

//esta funcion es para guardar todas las variables en el localstorage, originalmente iba a ser que se guarden automaticamente todo el tiempo, pero me parecio que por ahi era molesto si no querias que se guarden.
function guardarlista(){
    listaguardada = true;
    localStorage.setItem("descuento", descuento);
    localStorage.setItem("topereintegro", topereintegro);
    productosjson = JSON.stringify(productos);
    localStorage.setItem("productos", productosjson)
    localStorage.setItem("contadorproductos", contadorproductos);
    localStorage.setItem("total", total)
    localStorage.setItem("listaguardada", listaguardada);
    Swal.fire({
        icon: 'success',
        title: 'Progreso guardado guardada',
    })
}

listaguardada = localStorage.getItem("listaguardada");
if ((listaguardada != null)){
    descuento = Number(localStorage.getItem("descuento", descuento));
    topereintegro = Number(localStorage.getItem("topereintegro", topereintegro));
    total = Number(localStorage.getItem("total", total));
    productosjson = localStorage.getItem("productos", productosjson);
    productos = JSON.parse(productosjson);
    contadorproductos = Number(localStorage.getItem("contadorproductos", contadorproductos));
    renderdescuentos()
    calcularrestante()
    calculartotales()
    renderproducts()
}

    




