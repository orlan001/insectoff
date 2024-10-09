const inicio_card = document.querySelector('.card-img-inicio')
const template_card = document.getElementById('template-card-inicio')
const fragment = document.createDocumentFragment()
const msje_error = document.querySelector('.msje-error')
const mensaje = document.querySelector('.mensaje')

const contenedor_table_servicios = document.querySelector('.contenedor-table-servicios')
const template_tabla = document.querySelector('.template-tabla')

document.addEventListener('DOMContentLoaded',()=>{
    obtenerDatos()
})

const obtenerDatos = async ()=>{
    mensaje.classList.toggle('autenticacion', false)
    const respuesta = await fetch(`/servicio`, {
            method: 'get',
            headers: { "Content-Type": "application/json"}
    })
        if(!respuesta.ok){return msje_error.classList.toggle('autenticacion', false)}
        const resJson = await respuesta.json()
        if(resJson.redirect){window.location.href = resJson.redirect}
        mostrarDatos(resJson);
        mostrarDatosTabla(resJson)
        mensaje.classList.toggle('autenticacion', true)
}

const mostrarDatos = (datos)=>{
        let i = 1;
        Object.values(datos).forEach(element => {
            while(element.idTipoServicio == i){
                const clone = template_card.content.cloneNode(true) 
                clone.querySelector('.titulo-servicio-inicio').textContent = element.nombreTipoServicio
                clone.querySelector('.parrafo-inicio').textContent = element.descripcionTipoServicio 
                clone.querySelector('.img-inicio').setAttribute("src", element.imgTipoServicio)
                clone.querySelector('.alt').setAttribute("alt", element.nombreTipoServicio)    
                fragment.appendChild(clone)
                i++;
            }
        })
        inicio_card.appendChild(fragment)       
}

const mostrarDatosTabla = (data)=>{
    let i=1;  
    Object.values(data).forEach(element => {
        const clone = template_tabla.content.cloneNode(true) 
        clone.querySelector('.tipo-vehiculo').textContent = element.nombreTipoVehiculo
        clone.querySelector('.costo-servicio').textContent = element.precioTipoVehiculoServicio   
        if(element.idTipoServicio == i){
            clone.querySelector('.titulo-tabla').textContent = element.nombreTipoServicio
            i++;
        }
        fragment.appendChild(clone)
    })
    contenedor_table_servicios.appendChild(fragment)       
}

