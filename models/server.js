const express = require('express')
const cors = require('cors');
const { socketControllers } = require('../sockets/controller');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);  // io es el que permite enviar mensajes a todos los cliente , es donde se encuentra toda la info

        //crear rutas son el nombre de las rutas a utilizar
        this.paths = {}


        //Middleware
        this.middlewares();
        //Rutas de la aplicacion
        this.routes();

        // configuracion de Socket
        this.socket();
    }

    middlewares() {
        //CORS -> SE UTILIZA COMO SEGURIDAD LIGERA PARA BACKEND
        this.app.use(cors());

        //Directorio publico que sirve al cliente
        this.app.use(express.static('public'));

    }

    routes() {
        // this.app.use(this.paths.auth,require('../routes/auth'));

    }

    socket(){
        this.io.on('connection', socketControllers);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor listening on port', this.port);
        });
    }

}

module.exports = Server;