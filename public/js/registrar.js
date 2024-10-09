const form_registrar_val = document.querySelector('.form-registrar')

const mensaje_usuario = document.querySelector('.mensaje-usuario');        
const mensaje_email = document.querySelector('.mensaje-email');        
const mensaje_password = document.querySelector('.mensaje-password');
const mensaje_valido = document.querySelector('.mensaje-valido'); 
const msje_error = document.querySelector('.msje-error')

const expRegUsuario = /^[a-z0-9_-]{3,10}$/;
const expRegEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
const expRegPassword = /^[a-z0-9_-]{6,18}$/;

form_registrar_val.addEventListener("submit", async (e) =>{
    e.preventDefault();
    const erroresRegistrar = []    
    if(!expRegUsuario.test(e.target.children.usuario.value) ||(!e.target.children.usuario.value.trim())){
        erroresRegistrar.push({
            tipo:mensaje_usuario,
            msje:"formato nombre usuario no valido.. ingrese: letras seguido de numeros ó caracteres, _ , - , y entre 3 y 10 caracteres",
        }) 
    }else{
        mensaje_usuario.classList.remove('msje-error');
        mensaje_usuario.textContent = "";
    }
    
    if(!expRegEmail.test(e.target.children.email.value) || (!e.target.children.email.value.trim())){
        erroresRegistrar.push({
            tipo:mensaje_email,
            msje:"formato email no valido..",
        })                
    }else{
        mensaje_email.classList.remove('msje-error')
        mensaje_email.textContent = "";
    }

    if(!expRegPassword.test(e.target.children.password.value) || (!e.target.children.password.value.trim())){
        erroresRegistrar.push({
            tipo:mensaje_password,
            msje:"formato password no valido.. ingrese: letras seguido de numeros ó caracteres  _ , - , entre 6 y 18 caracteres",
        })                
    }else{
        mensaje_password.classList.remove('msje-error')
        mensaje_password.textContent = "";
    }

    if (erroresRegistrar.length !== 0){
        mostrar_mensajes_error(erroresRegistrar)
    }else{
        enviarDatos(e)          
    }
})
 
const mostrar_mensajes_error=(erroresRegistrar)=>{
    erroresRegistrar.forEach(items => {
        items.tipo.classList.add('msje-error');
        items.tipo.textContent = items.msje;
    });
}

async function enviarDatos(datos){
    const usuario = datos.target.children.usuario.value;
    const email = datos.target.children.email.value;
    const password = datos.target.children.password.value;
    let enviar = { usuario: usuario, email:email, password:password}
    let enviarJson = JSON.stringify(enviar)
    const respuesta = await fetch(`/registrar`,{
        method: 'post',
        headers:{"Content-Type": "application/json"},
        body: enviarJson
    })

    console.log(respuesta.ok)
    
    if(!respuesta.ok) return msje_error.classList.toggle('autenticacion', false)
    const resJson = await respuesta.json();
    if(resJson.redirect){
       window.location.href = resJson.redirect;
    }
}
