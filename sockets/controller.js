



const socketControllers = (socket) => {

    console.log('Cliente conectado',socket.id); // cuando un cliente se conecta

    socket.on('disconnect', () => {

        console.log('Cliente desconectado',socket.id)  // cuando un cliente se desconecta

    });
    socket.on('enviar-mensaje', (payload, callback) => {

        const id = 1233456;
        callback({ id, fecha: new Date().getTime() }); // se puede enviar objetos 

        socket.broadcast.emit('enviar-mensaje',payload) // enviar mensaje a todos

    }) // este callback es lo que se hace el servidor, cuando el cliente emita el mensaje

}

module.exports = {
    socketControllers
}