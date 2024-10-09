const form_login = document.querySelector('.form-login')

const mensaje_usuario = document.querySelector('.mensaje-usuario');        
const mensaje_password = document.querySelector('.mensaje-password');
const mensaje_valido = document.querySelector('.mensaje-valido'); 
const msje_error = document.querySelector('.msje-error'); 

form_login.addEventListener("submit", async (e) =>{
    e.preventDefault();    
    const erroresLogin = []    
    if((e.target.children.email.value.trim().length == 0)){
        erroresLogin.push({
            tipo:mensaje_usuario,
            msje:"formato email no valido....",
        }) 
    }else{
        mensaje_usuario.classList.remove('msje-error');
        mensaje_usuario.textContent = "";
    }
    
    if((e.target.children.password.value.trim().length == 0)){
        erroresLogin.push({
            tipo:mensaje_password,
            msje:"formato password no valido....",
        })                
    }else{
        mensaje_password.classList.remove('msje-error')
        mensaje_password.textContent = "";
    }
    
    if (erroresLogin.length !== 0){
        mostrar_mensajes_error(erroresLogin)
    }else{
       obtenerAutenticacion(e)       
    }
})

//http://localhost:4000/api/user
async function obtenerAutenticacion(even){
    const email = even.target.children.email.value;
    const password = even.target.children.password.value;
    const datos = {email:email, password:password}
    const enviarJson = JSON.stringify(datos)
    const respuesta = await fetch(`/login`,{
        method: 'post',
        headers: {"Content-Type":"application/json"},
        body: enviarJson
    })

    if(!respuesta.ok) return msje_error.classList.toggle('autenticacion', false)
    const resJson = await respuesta.json();
    console.log(resJson, "....")
    localStorage.setItem('token', JSON.stringify(resJson.token))
    if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
}

const mostrar_mensajes_error=(erroresLogin)=>{
    erroresLogin.forEach(items => {
        items.tipo.classList.add('msje-error');
        items.tipo.textContent = items.msje;
    });
}

