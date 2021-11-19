
// Referencias del HTML

const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');


const socket = io();  //socket del cliente 

socket.on('connect', () => {

    console.log('conectado')

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
    
})
socket.on('disconnect', () => {

    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
    console.log('desconectado')

})

socket.on('enviar-mensaje',(payload)=>{

    console.log(payload)  // escuchar desde el lado del cliente
})

btnEnviar.addEventListener('click',()=>{

    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123',
        fecha: new Date().getTime()
    }
    
    socket.emit('enviar-mensaje', payload, (id)=> {
        console.log('desde el server',id)
    }); // envia un mensaje al servidor


})