const formTurno = document.getElementById('form-turno')

//tipoVehiculo y serviciconstos
let tipoVehiculo = document.getElementById('tipo-vehiculo')
const patente = document.getElementById('patente')
const descripcion = document.getElementById('descripcion');
const fecha = document.getElementById('fecha');
const hora = document.getElementById('hora')

//Datos Personales
const dni = document.getElementById('dni');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const telefono = document.getElementById('telefono');

//para mostrar mensajes de error
const mensaje_valido = document.querySelector('.mensaje-valido'); 
const mensaje_dni = document.querySelector('.mensaje-dni');
const mensaje_email = document.querySelector('.mensaje-email');
const mensaje_fecha = document.querySelector('.mensaje-fecha');
const mensaje_hora = document.querySelector('.mensaje-hora');

//mostrar datos en la tabla 
const listaTabla = document.querySelector('.listaTabla');
const template = document.querySelector('.template-tabla-turno')
const fragment = document.createDocumentFragment();

document.addEventListener("DOMContentLoaded", (event) => {
    obtenerDatosTiposVehiculo()
    obtenerDatosTipoVehiculoServicio();
});

let data=[];

//expresion regular para validar email
const expRegValidarEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

formTurno.addEventListener('submit', (e) =>{
    e.preventDefault()

   // console.log(e)
    const errores = []
  
    if(dni.value.length == 0){
        errores.push({tipo:mensaje_dni, msje:"formato dni no valido..",})        
    }else{
        mensaje_dni.textContent = "";
        mensaje_dni.classList.remove('msje-error');
    }

    if(!expRegValidarEmail.test(email.value)){
        errores.push({tipo:mensaje_email,msje:"formato email no valido..",})        
    }else{
        mensaje_email.textContent = "";
        mensaje_email.classList.remove('msje-error');
    }

    if(fecha.value.length == 0 ){
        errores.push({tipo:mensaje_fecha,msje:"formato fecha no valido..", })        
    }else{
        mensaje_fecha.textContent = "";
        mensaje_fecha.classList.remove('msje-error');
    }

    if(hora.value.length == 0 ){
        errores.push({tipo:mensaje_hora,msje:"formato hora no valido..",})        
    }else{
        mensaje_hora.textContent = "";
        mensaje_hora.classList.remove('msje-error');
    }

    if (errores.length !== 0){
            mostrar_mensajes_error(errores)
    }else{
          enviarDatosTurnoRegistrar(e)
          mostrar_mensaje_form_enviado();
//        localStorage.setItem("datosReserva", JSON.stringify(formTurno));
    }
})

const mostrar_mensaje_form_enviado =()=>{
    mensaje_valido.classList.add('msje-val');
    mensaje_valido.textContent = "formulario enviado con exito.."
    setTimeout(valido, 1000);
}

function valido(){
    mensaje_valido.classList.remove('msje-val')
    mensaje_valido.textContent="";
};

const mostrar_mensajes_error=(errores)=>{
    errores.forEach(items => {
        items.tipo.classList.add('msje-error');
        items.tipo.textContent = items.msje;
    });
}

const cargarTipoVehiculo = (tblTipoVehiculo)=>{
    Object.values(tblTipoVehiculo).forEach(items =>{
        var opciones = document.createElement('option');
        opciones.textContent = items.nombreTipoVehiculo;
        opciones.setAttribute('value', items.idTipoVehiculo);
        tipoVehiculo.appendChild(opciones);
    })    
}

tipoVehiculo.addEventListener('change', ()=>{
    let selecionOpcion = tipoVehiculo.options[tipoVehiculo.selectedIndex].value
    while(listaTabla.firstChild){
        listaTabla.removeChild(listaTabla.firstChild);
    } 
    cargarDatosTabla(selecionOpcion)   
})


/*
listaTabla.addEventListener('change', (e)=>{
        let valorBuscado = idTiposServicios.includes(e.target.value)
        if(e.target.checked && !valorBuscado){
            idTiposServicios.push(e.target.value)
        }else{
            if(valorBuscado){
                const index = idTiposServicios.findIndex((ind) => ind === e.target.value);
                delete(idTiposServicios[index]);
            }
        }
})
*/

const obtenerDatosTiposVehiculo = async ()=>{
    const respuesta = await fetch(`/vehiculos`, {
            method: 'get',
            headers: { "Content-Type": "application/json"}
    })
    if(!respuesta.ok){return msje_error.classList.toggle('autenticacion', false)}
    const resJson = await respuesta.json()
    if(resJson.redirect){window.location.href = resJson.redirect}
    cargarTipoVehiculo(resJson)
}

const obtenerDatosTipoVehiculoServicio = async ()=>{
    const respuesta = await fetch(`/servicio`, {
            method: 'get',
            headers: { "Content-Type": "application/json"}
    })
        if(!respuesta.ok){return msje_error.classList.toggle('autenticacion', false)}
        const resJson = await respuesta.json()
        if(resJson.redirect){window.location.href = resJson.redirect}
        data.push(resJson);
}

//const cargarDatosTabla =(data)=>{
  
const cargarDatosTabla =(e)=>{
        Object.values(data[0]).forEach(element => {
            const clone = template.content.firstElementChild.cloneNode(true) 
            if(element.idTipoVehiculo === parseInt(e)){
                clone.querySelector('#id').textContent = element.idTipoServicio   
                //const checkbox = clone.querySelector('#chk-tipo-servicio').textContent = element.idTiposServicios   
                clone.querySelector('#nombre-tipo-servicio').textContent = element.nombreTipoServicio   
                clone.querySelector('#precio').textContent = element.precioTipoVehiculoServicio   
                clone.addEventListener('click', (marcar));
                fragment.appendChild(clone)
            }
        })
        listaTabla.appendChild(fragment)       
}

var cheksMarcados = []

const marcar = (evt)=>{
  let data = evt.target.parentElement.parentElement.children[0].textContent;
  if(evt.target.matches(".chk-tipo-servicio")){
        cheksMarcados.push(data)
        console.log(cheksMarcados)  
        console.log("marcado")  
  }
}
 
//async function enviarDatosTurnoRegistrar(d){

function enviarDatosTurnoRegistrar(d){
    //Datos cliente
    let dniC = dni.value
    console.log(dniC)
    let nombreC = nombre.value
    console.log(nombreC)
    const emailC = email.value;
    console.log(emailC)
    const telefonoC = telefono.value;
    console.log(telefonoC)
    //datos automovil
    const tipoV = tipoVehiculo.value
    console.log(tipoV)
    const patenteA = patente.value;
    console.log(patenteA)
    const descripcionA = descripcion.value;
    console.log(descripcionA)
    const fechaR = fecha.value;
    console.log(fechaR)
    const horaR = hora.value
    console.log(horaR)

    console.log(cheksMarcados, "chek medddd.......")
  }

  /*
    
    const usuario = e.target.children.usuario.value;
    const email = e.target.children.email.value;
    const password = es.target.children.password.value;
    let enviar = { usuario: usuario, email:email, password:password}
    let enviarJson = JSON.stringify(enviar)
    const respuesta = await fetch(`/registro`,{
        method: 'post',
        headers:{"Content-Type": "application/json"},
        body: enviarJson
    })

    if(!respuesta.ok) return msje_error.classList.toggle('autenticacion', false)
    const resJson = await respuesta.json();
    if(resJson.redirect){
       window.location.href = resJson.redirect;
    }
    */

/*
   // Datos a insertar
const datosTabla1 = {
    campo1: 'valor1',
    campo2: 'valor2'
  };
  
  const datosTabla2 = {
    campo3: 'valor3'
  };
  
  const datosTabla3 = {
    campo4: 'valor4'
  };
  
  // Iniciar la transacción
  connection.beginTransaction(function(err) {
    if (err) { throw err; }
  
    // Insertar en tabla1
    connection.query('INSERT INTO tabla1 SET ?', datosTabla1, function(err, result) {
      if (err) {
        connection.rollback(function() {
          throw err;
        });
      }
  
      const idTabla1 = result.insertId;
  
      // Insertar en tabla2
      datosTabla2.id_tabla1 = idTabla1;
      connection.query('INSERT INTO tabla2 SET ?', datosTabla2, function(err, result) {
        if (err) {
          connection.rollback(function() {
            throw err;
          });
        }
  
        const idTabla2 = result.insertId;
  
        // Insertar en tabla3
        datosTabla3.id_tabla1 = idTabla1;
        connection.query('INSERT INTO tabla3 SET ?', datosTabla3, function(err, result) {
          if (err) {
            connection.rollback(function() {
              throw err;
            });
          }
  
          connection.commit(function(err) {
            if (err) {
              connection.rollback(function() {
                throw err;
              });
            }
            console.log('Transacción completada con éxito.');
            connection.end(); // Cerrar la conexión
          });
        });
      });
    });
  });

*/