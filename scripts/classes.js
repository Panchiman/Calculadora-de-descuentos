//Clase constructora para los descuentos
class Descuento{
    constructor(nombre, descuento, topedereintegro, fecha = "Sin definir", banco = "otros"){
        this.nombre = nombre;
        this.descuento = descuento;
        this.topedereintegro = topedereintegro;
        this.fecha = fecha;
        this.banco = banco;
    }
}
//Clase constructora para los Productos, el metodo que tiene es para que devuelva su precio con el descuento ya aplicado
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