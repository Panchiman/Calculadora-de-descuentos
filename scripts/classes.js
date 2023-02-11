class Descuento{
    constructor(nombre, descuento, topedereintegro, fecha = "Sin definir", banco = "otro"){
        this.nombre = nombre;
        this.descuento = descuento;
        this.topedereintegro = topedereintegro;
        this.fecha = fecha;
        this.banco = banco;
    }
}

class Producto {
    constructor(nombre, precio, cantidad = 1){
        this.nombre = nombre;
        this.precio = precio;
        this.preciocondesct = function(){
            return tofixear2 (this.precio - restdescuento(descuento,this.precio))
        };
        this.cantidad = cantidad;
    }
}