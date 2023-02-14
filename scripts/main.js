// Este proyecto es una calculadora de descuentos de promociones, por ejemplo las de cuenta dni o banco nacion
/*Funciones:
- Por ahora te permite elegir entre listas de descuentos de bancos en .json (la idea seria poder ir actualizandolos cuando cambien los descuentos de los mismos y poder ir agregando nuevas listas) seria genial en lugar de esto usar una api dada por los bancos o algo asi pero pareciera que no existe o al menos yo no la pude encontrar. 
- Te permite tambien agregar tus propios descuentos a la lista de "Otros" los cuales quedan guardados en el sesion storage.
- te permite aumentar el numero de cuentas para aumentar el total hasta donde el descuento te aplica.
- Podes agregar productos a una lista. Cuyo unico parametro obligatorio es el nombre por si alguien lo quiere usar solamente para tener la lista de los nombres. Tambien podes ponerle precio, editar tanto el precio como el nombre, la cantidad, tacharlo para que no te sume su precio a al total y eliminar el producto.
- Tiene buscador por nombre y por precio de los productos
- Y otras cosas mas.*/

//Estos if son para comprobar si esta dicha variable guardada en el sesionstorage y si es asi cargarla en la misma
if (backup("nombredeldescuento", nombredeldescuento)){
    nombredeldescuento = backup("nombredeldescuento", nombredeldescuento)
}
if (backup("nombredelbanco", nombredelbanco)){
    nombredelbanco = backup("nombredelbanco", nombredelbanco)
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
    lista_tachados = JSON.parse(backup("lista_tachados", lista_tachadosjson))
}
if (backup("totaltachados", totaltachados)){
    totaltachados = Number(backup("totaltachados", totaltachados))
}
//renderia todo
renderdescuentos()
calcularrestante()
calculartotales()
renderproducts()