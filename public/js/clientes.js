const listado_reserva = document.querySelector('.listado-reserva');
const template = document.querySelector('template').content;
const fragment = document.createDocumentFragment();

if (localStorage.getItem("datosReserva")){
    datosReserva = JSON.parse(localStorage.getItem("datosReserva"));
    console.log(datosReserva);
};

    const fecha = new Date().toLocaleString();
    datosReserva.forEach(element => {
        template.querySelector('#id-reserva').textContent = element.idDatosReservaTurno;
        template.querySelector('#fecha-hora-actual').textContent = fecha;
        template.querySelector('#id-Datos-Personales').textContent = element.idDatosReservaTurno;
        template.querySelector('#apellidos-nombres').textContent = element.apenom;
        template.querySelector('#fecha-hora-reserva').textContent = element.fecha +","+ element.hora;
        template.querySelector('#tipo-vehiculo').textContent = element.idDatosVehiculoPatente;
        template.querySelector('#estado-reserva').textContent = element.estado;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);    
    });

    listado_reserva.appendChild(fragment)

