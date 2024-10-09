const cerrar_session = document.querySelector('.cerrar-session')

cerrar_session.addEventListener('click', (e)=>{    
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    console.log('se ha cerrado la session')
    document.location.href = "/"
})

