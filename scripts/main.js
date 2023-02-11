// Esto esta pensado para ser una especie de calculadora de descuentos para ofertas de bancos/tarjetas, por ejemplo las de cuenta dni o banco nacion
// Ya simula las funciones principales de la misma, tomar el descuento, el tope de reintegro y los productos con sus precios y con eso calcular el maximo que podes gastar, darte los productos en orden con su precio normal y con descuento, sumar el resultado y decirte cuanto te queda para seguir gastando.
//Obviamente estas funciones van a ser mucho mas practicas cuando pueda hacerle una interfaz interactiva.






if (backup("nombredeldescuento", nombredeldescuento)){
    nombredeldescuento = backup("nombredeldescuento", nombredeldescuento)
}
if (backup("descuento", descuento)){
    descuento = Number(backup("descuento", descuento))
}
if (backup("topereintegro", topereintegro)){
    topereintegro = Number(backup("topereintegro", topereintegro))
}
if (backup("total", total)){
    total = Number(backup("total", total))
}
if (backup("productos", productosjson)){
    productos = JSON.parse(backup("productos", productosjson))
    reincorporarproductos()
}
if (backup("contadorproductos", contadorproductos)){
    contadorproductos = Number(backup("contadorproductos", contadorproductos))
}
if (backup("contador_cuentas", contador_cuentas)){
    contador_cuentas = Number(backup("contador_cuentas", contador_cuentas))
}

if (backup("lista_tachados", lista_tachadosjson)){
    lista_tachados = JSON.parse(backup("lista_tachados", lista_tachadosjson))}

if (backup("totaltachados", totaltachados)){
    totaltachados = Number(backup("totaltachados", totaltachados))
}

// if (backup("lista_descuentos", lista_descuentosjson)){
//     lista_descuentos = JSON.parse(backup("lista_descuentos", lista_descuentosjson))
//     reincorporarlista_descuentos()
//     console.log(lista_descuentos)
//     console.log(typeof lista_descuentos)
// }

// descuento = Number(localStorage.getItem("descuento", descuento));
// topereintegro = Number(localStorage.getItem("topereintegro", topereintegro));
// total = Number(localStorage.getItem("total", total));
// productosjson = localStorage.getItem("productos", productosjson);
// productos = JSON.parse(productosjson);
// contadorproductos = Number(localStorage.getItem("contadorproductos", contadorproductos));
// reincorporarproductos()
renderdescuentos()
calcularrestante()
calculartotales()
renderproducts()