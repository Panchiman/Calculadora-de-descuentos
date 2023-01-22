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
let  descuento = prompt("Ingrese el numero de descuento");

let objetoparemover = "";


//Esta funcion es para hacer la comprobacion
function comprobarnombresp(product){
    return product.nombre == nombreproducto;
}

// Este while y los siguientes son para que el usuario si o si tenga que introducir un numero para poder proseguir con el resto del algoritmo
// La idea es que el while solo se cancele is el numero ingresado es un numero y si no lo es dar un mensaje acorde
while (isNaN(descuento) == true || descuento === null || descuento.length == 0 || descuento > 100 || descuento <= 0){
    if (descuento == null || descuento.length == 0){
        descuento = prompt("Es necesario que introduzca un numero de descuento para continuar");
    }
    else if (isNaN(descuento) == true){
        descuento = prompt("Introduzca solo un numero del descuento");
    }
    else if (descuento > 100){
        descuento = prompt("Introduzca un numero del descuento no mayor a 100");
    }
    else if (descuento <= 0){
        descuento = prompt("Introduzca un numero del descuento mayor a 0");
    }
    else {
        break
    }
}
//al final use .innerHTML en lugar de alert() porque asi no desaparece la informacion y es mas comodo, lo mismo para todos los siguientes.
document.getElementById("descuento").innerHTML = "Su numero de descuento es " + "<b>" + descuento +"%." + "</b>";
//Esta variable es el tope que te devuelven, el maximo que te llegan a reintegrar. 
let  topereintegro = prompt("Ingrese el tope de descuento");
while (isNaN(topereintegro) == true || topereintegro === null || topereintegro.length == 0){
    if (topereintegro == null || topereintegro.length == 0){
        topereintegro = prompt("Es necesario que introduzca el tope de reintegro para continuar");
    }
    else if (isNaN(topereintegro) == true){
        topereintegro = prompt("Introduzca solo el numero del tope de reintegro");
    }
    else {
        break
    }
}

//Esta funcion es para que si el numero tiene decimales solo se muestren los ultimos 2
function tofixear2(numero){
    return Number(Number(numero).toFixed(2));
}



//Esta funcion sirve para calcular en cuanto queda el prec1io de un producto con el descuento aplicado
function restdescuento(desc,monto){
return (monto/100)*desc;
}
//En esta variable esta el calculo del maximo que uno puede gastar para que se aplique el descuento a todo.
let descmaximo = tofixear2((topereintegro * 100) / descuento);

document.getElementById("topereintegro").innerHTML = "El tope de reintegro es de " + "<b>" + topereintegro + "</b>" + " pesos.";

document.getElementById("valormaximo").innerHTML = "El monto maximo hasta donde aplica el descuento es: " +  "<b>" + descmaximo + "</b>" + " pesos.";



//clase para construir los distintos productos, con el nombre del producto, el precio y el precio con el descuento del mismo.
class Producto {
    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = precio;
        this.preciocondesct = tofixear2 (this.precio - restdescuento(descuento,this.precio));
    }
}

// Esta funcion es para que el usuario si o si tenga que introducir un numero para poder proseguir con el resto del algoritmo
// La idea es que el while solo se cancele is el numero ingresado es un numero y si no lo es dar un mensaje acorde
function whileprecios() {
    while (isNaN(precioproducto) == true || precioproducto === null || precioproducto.length == 0){
        if (precioproducto == null || precioproducto.length == 0){
            precioproducto = prompt("Es necesario que introduzca un monto del producto para continuar");
        }
        else if (isNaN(precioproducto) == true){
            precioproducto = prompt("Introduzca solo el numero del precio del producto");
        }
        else {
            break;
        }
}}



//Esta funcion es para lo mismo que la anterior pero para el nombre del producto
function whilenombres() {
    while (isNaN(nombreproducto) == false || nombreproducto === null || nombreproducto.length == 0 || productos.find(comprobarnombresp)){
        if (nombreproducto == null || nombreproducto.length == 0){
            nombreproducto = prompt("Es necesario que introduzca un nombre del producto para continuar. Para detener y obtener los resultados introduzca: stop");
        }
        else if (isNaN(nombreproducto) == false){
            nombreproducto = prompt("Introduzca solo el nombre del producto. Para detener y obtener los resultados introduzca: stop");
        }
        else if (productos.find(comprobarnombresp)){
            nombreproducto = prompt("Ese producto ya se encuentra en la lista, ingrese uno diferente. Para detener y obtener los resultados introduzca: stop");
        }
        else {
            break;
        }
}}


//Este for es para llevar el contador y porque no se cuantos productos querra agregar el usuario, por lo mismo use un array, para poner cada objeto como una parte de ese array y ya que no podia saber cuantas variables crear para los mismos sino.
for (let contador = 0;; contador += 1) {
    nombreproducto = prompt ("Introduzca un nombre. Para detener y obtener los resultados introduzca: stop");
    whilenombres()
    nombre = nombreproducto;
    //esto es para detener la entrada de productos, a falta de interfaz grafica interactiva se me ocurrio que se detenga con el usuario escribiendo "stop"
    if (nombre == "stop"){
        break
    }
    precioproducto = prompt ("Es necesario que introduzca un monto del producto para continuar");
    whileprecios()
    precio = Number(precioproducto);

    //esto es para crear los objetos
    productos[contador] = new Producto (nombre, precio);
    total += productos[contador].precio;
    //esto es para detenerlo si te pasaste del descuento, aunque aun sigue sumando el precio del producto ese.
    if (total >= descmaximo){
        break
    }
};

function compararproducto(product){
    return product == objetoparemover
}

function remover(texto){
    objetoparemover = texto;
    let indice = productos.findIndex(compararproducto);
    productos.splice(indice,1,"")
    document.getElementById("productos").innerHTML = text.join("");
}

//Este for of es para pasar por todos los objetos de la array con su nombre, precio y precio con descuento.
function agregartexto(){
    for (let x of productos){
        text.push("<p></p><b>Producto: </b>" + x.nombre + "<b>, precio: </b>" + x.precio + "<b>, precio con el descuento: </b>" + x.preciocondesct + "<i class='material-icons' onclick='remover("+ x +")'>close</i>" + "<br></p>" ) 
    }
}
agregartexto()
//Esto es para mostrar lo que queda restante para gastar, si te pasaste te lo dice y por cuanto, sino te dice cuanto te queda.
function calcularrestante(){
    restante = descmaximo - total;
    if (restante < 0){
        restante = "<b>Te pasaste del maximo por </b>" + Math.abs(restante) + " pesos"
    }
    else{
        restante = tofixear2(restante);
        restante = "Te quedan " + "<b>" + restante + "</b>" + " pesos para llegar al maximo que puedes gastar."
    }
    //muestra el restante para gastar.
    document.getElementById("restante").innerHTML = restante;
}
calcularrestante()
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
calculartotales()




//Esta funcion es para hacer la comprobacion
function comprobarnombres(product){
    return product.nombre == nombrebusqueda;
}

//Esta funcion es para hacer la comprobacion
function comprobaprecio(product){
    return product.precio == preciobusqueda;
}
//Esta funcion es la que pide que producto buscar y te devuelve el nombre y precio si lo encuentra, solo funciona con un producto, pero al menos hasta que tenga una interfaz grafica no esta pensado para usar varios productos con el mismo nombre.
function busquedan(){
    nombrebusqueda = prompt("Ingrese el nombre del producto que desea buscar")
    if (productos.find(comprobarnombres)){
        alert(productos.find(comprobarnombres).nombre + ": " + productos.find(comprobarnombres).precio)
    }
else{
    alert("No se encontro un producto con se nombre")
}
};

//Esta funcion es para agregar los nombres de los productos del array de objetos que coincidan con la busqueda por precio
function listarprecios(x){
    for (let y of x){
        listaprecio.push(y.nombre);
    }
}
//Esta funcion es la que se encarga de dar el alert con todos los productos que coincidieron con la busqueda por precio
function busquedap(){
    preciobusqueda = prompt("Ingrese el precio de producto que desea buscar")
    if (productos.filter(comprobaprecio) == ""){
        alert("No se encontro ningun producto con ese precio")
    }
else{
    let x = productos.filter(comprobaprecio);
    listarprecios(x);
    alert("Productos con ese precio: " + listaprecio);
}
};

function busquedanborrar(){
    nombrebusqueda = prompt("Ingrese el nombre del producto que desea borrar")
    if (productos.findIndex(comprobarnombres) != -1){
        let producto = productos.findIndex(comprobarnombres);
        total = total - productos[producto].precio
        console.log(productos[producto].precio)
        productos.splice(producto,1,);
        text = []
        agregartexto()
        calcularrestante()
        calculartotales()
        document.getElementById("productos").innerHTML = text.join("");
        console.log(productos)
        alert("Producto borrado")
    }
else{
    alert("No se encontro un producto con se nombre")
}
};
