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
let formularioDescuentos = document.getElementById("descuentos_otros");
let formulariobusquedanombre = document.getElementById("busquedanombre");
let formulariobusquedaprecio = document.getElementById("busquedaprecio");

let descmaximo = 0;
let contadorproductos = 0;
let nombreproducto = "";
let nombreproductob ="";
let precio = 0;
// en este json se va a guardar el array de productos convertido a json
let productosjson = "";
let lista_descuentosjson ="";
//Esta funcion es para que si el numero tiene decimales solo se muestren los ultimos 2
let banco = "";
let lista_descuentos = [];
let contador_cuentas = 1;
let lista_tachados = [];
let lista_tachadosjson = [];
let totaltachados = 0;
let nombredeldescuento = "";
let formularioagregarproducto = document.getElementById("agregarproducto");
let nombredelbanco = "";