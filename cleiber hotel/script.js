// ==========================================
// MENÚ PARA CELULAR
// ==========================================

function abrirMenu() {
    const menu = document.querySelector(".menu");

    menu.classList.toggle("activo");
}


// Cerrar menú al presionar una opción
document.querySelectorAll(".menu a").forEach(enlace => {

    enlace.addEventListener("click", () => {

        const menu = document.querySelector(".menu");

        menu.classList.remove("activo");

    });

});


// ==========================================
// CONFIGURAR FECHAS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const entrada = document.getElementById("entrada");
    const salida = document.getElementById("salida");

    const hoy = new Date();

    const fechaHoy = obtenerFecha(hoy);

    entrada.min = fechaHoy;
    salida.min = fechaHoy;


    // Fecha de entrada por defecto: hoy

    entrada.value = fechaHoy;


    // Fecha de salida por defecto: mañana

    const manana = new Date();

    manana.setDate(manana.getDate() + 1);

    salida.value = obtenerFecha(manana);


    // Cuando cambie la entrada
    entrada.addEventListener("change", () => {

        salida.min = entrada.value;

        if (salida.value <= entrada.value) {

            const nuevaSalida = new Date(
                entrada.value + "T00:00:00"
            );

            nuevaSalida.setDate(
                nuevaSalida.getDate() + 1
            );

            salida.value = obtenerFecha(nuevaSalida);

        }

    });

});


// ==========================================
// CONVERTIR FECHA
// ==========================================

function obtenerFecha(fecha) {

    const año = fecha.getFullYear();

    const mes = String(
        fecha.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
        fecha.getDate()
    ).padStart(2, "0");

    return `${año}-${mes}-${dia}`;

}


// ==========================================
// BUSCAR HABITACIONES
// ==========================================

function buscarHabitaciones() {

    const entrada =
        document.getElementById("entrada").value;

    const salida =
        document.getElementById("salida").value;

    const adultos =
        document.getElementById("adultos").value;

    const ninos =
        document.getElementById("ninos").value;


    if (!entrada || !salida) {

        mostrarMensaje(
            "Selecciona la fecha de entrada y salida."
        );

        return;

    }


    if (salida <= entrada) {

        mostrarMensaje(
            "La fecha de salida debe ser posterior a la entrada."
        );

        return;

    }


    mostrarMensaje(
        `Buscando habitaciones para ${adultos} adulto(s) y ${ninos} niño(s).`
    );


    // Bajar automáticamente hasta las habitaciones

    document
        .getElementById("habitaciones")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// RESERVAR HABITACIÓN
// ==========================================

function reservar(habitacion) {

    const entrada =
        document.getElementById("entrada").value;

    const salida =
        document.getElementById("salida").value;

    const adultos =
        document.getElementById("adultos").value;

    const ninos =
        document.getElementById("ninos").value;


    if (!entrada || !salida) {

        mostrarMensaje(
            "Primero selecciona las fechas de tu estadía."
        );

        document
            .getElementById("reservas")
            .scrollIntoView({
                behavior: "smooth"
            });

        return;

    }


    if (salida <= entrada) {

        mostrarMensaje(
            "Selecciona correctamente las fechas."
        );

        return;

    }


    const noches =
        calcularNoches(
            entrada,
            salida
        );


    mostrarMensaje(
        `${habitacion} seleccionada - ${noches} noche(s).`
    );


    console.log("RESERVA");

    console.log("Habitación:", habitacion);

    console.log("Entrada:", entrada);

    console.log("Salida:", salida);

    console.log("Adultos:", adultos);

    console.log("Niños:", ninos);

    console.log("Noches:", noches);

}


// ==========================================
// CALCULAR NÚMERO DE NOCHES
// ==========================================

function calcularNoches(entrada, salida) {

    const fechaEntrada =
        new Date(
            entrada + "T00:00:00"
        );

    const fechaSalida =
        new Date(
            salida + "T00:00:00"
        );


    const diferencia =
        fechaSalida - fechaEntrada;


    const noches =
        diferencia /
        (1000 * 60 * 60 * 24);


    return Math.round(noches);

}


// ==========================================
// MOSTRAR MENSAJES
// ==========================================

let temporizadorMensaje;


function mostrarMensaje(texto) {

    const mensaje =
        document.getElementById("mensaje");


    clearTimeout(
        temporizadorMensaje
    );


    mensaje.textContent = texto;

    mensaje.style.display = "block";


    temporizadorMensaje =
        setTimeout(() => {

            mensaje.style.display = "none";

        }, 4000);

}


// ==========================================
// CERRAR MENÚ AL CAMBIAR TAMAÑO DE PANTALLA
// ==========================================

window.addEventListener("resize", () => {

    if (window.innerWidth > 700) {

        const menu =
            document.querySelector(".menu");

        menu.classList.remove("activo");

    }

});