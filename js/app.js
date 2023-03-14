
const reservas = [{
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3
},
{
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4
},
{
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1
}];

class BookRoom {
    constructor() {
        this._room = [];
        this._subtotal = 0;
        this._subtotalDescuento = 0;
        this._total = 0;
        this.descuento = 0.15;
    }
    calculaTipoHabitacion(tipoHabitacion) {
        return tipoHabitacion === "standard" ? 100 : 150;
    }

    calculaPax(pax) {
        return (pax - 1) * 40;
    }
    calculaDesayuno(desayuno, pax) {
        return desayuno ? 15 * pax : 0;
    }
    calculaSubtotal() {
        this._subtotal = this._room.reduce((acc, { tipoHabitacion, desayuno, pax, noches }) =>
            acc + (this.calculaTipoHabitacion(tipoHabitacion) + this.calculaPax(pax) + this.calculaDesayuno(desayuno, pax)) * noches, 0);
    }

    calculaSubtotalDescuento() {
        this._subtotalDescuento = this._subtotal - (this._subtotal * this.descuento);
    }

    calculaTotal() {
        this._total = this._subtotalDescuento * 1.21;
    }
    get total() {
        return this._total;
    }
    get subtotalDescuento() {
        return this._subtotalDescuento;
    }
    get subtotal() {
        return this._subtotal;
    }
    set room(room) {
        this._room = room;
        this.calculaSubtotal();
        this.calculaSubtotalDescuento();
        this.calculaTotal();
    }
}

console.log("RESERVA BASE --- (Habitaciones a 100€ y 150€, con descuentos)");
let reservaBase = new BookRoom();
reservaBase.room = reservas;
console.log(`Subtotal: ${reservaBase.subtotal} €`);
console.log(`Subtotal con descuento: ${reservaBase.subtotalDescuento} €`);
console.log(`Total: ${reservaBase.total} €`);


class ReservaParticular extends BookRoom {
    constructor() {
        super();
        this.descuento = 0;
    }
}

console.log("");
console.log("RESERVA PARTICULAR --- (Habitaciones a 100€ y 150€, sin descuento) ");
let reservaParticular = new ReservaParticular();
reservaParticular.room = reservas;
console.log(`Subtotal: ${reservaParticular.subtotal} €`);
console.log(`Total: ${reservaParticular.total} €`);


class ReservaTourOperador extends BookRoom {
    calculaTipoHabitacion(tipoHabitacion) {
        return tipoHabitacion = 100;
    }
}

console.log("");
console.log("RESERVA TOUR OPERADOR --- (Habitaciones a 100€, Descuento del 15%)");
let reservaTourOperador = new ReservaTourOperador();
reservaTourOperador.room = reservas;
console.log(`Subtotal: ${reservaTourOperador.subtotal} €`);
console.log(`Subtotal con descuento: ${reservaTourOperador.subtotalDescuento} €`);
console.log(`Total: ${reservaTourOperador.total} €`);


