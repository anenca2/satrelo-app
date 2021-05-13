/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

import socketIOClient from 'socket.io-client';

class Messenger {

    constructor() {
        /** Singleton */
        if (Messenger.instance instanceof Messenger) 
            return Messenger.instance;

        this.socketURL = process.env.REACT_APP_SOCKET_URL;
        this.socketClient = null;
        this.heartbeat = null;
        Messenger.instance = this;
    }

    /** Métodos de la clase */
    /** Conectar el socket al servidor */
    connectSocket(userId, context) {
        if (!this.socketClient) {
            this.socketClient = socketIOClient.connect(this.socketURL, {
                reconnection: false
            });
            /** Enviar un mensaje para registrar el usuario */
            this.socketClient.emit('register', { userId });
            this.handleSocketEvents(context);
        }
    }

    closeSocket(context) {
        if (this.socketClient) {
            this.socketClient = null;
            context.props.setConnectedId(null);
            /** Cuado se presenta un error de conexión */
            if (context.props.connectSocket)
                context.props.setConnectSocket(false);
        }
    }

    /** Desconectar el socket del servidor */
    disconnectSocket(userId) {
        if (this.socketClient) {
            /** Enviar un mensaje para eliminar al usuario del registro */
            this.socketClient.emit('unregister', { userId });
            this.socketClient.disconnect();
        }
    }

    /** Manejar la conexión del socket */
    handleConnection(connection, context) {
        const { connectSocket, connectedId } = connection;
        if (connectSocket) 
            this.connectSocket(connectedId, context);
        else
            this.disconnectSocket(connectedId);
    }

    /** Manejar todos los eventos detectados por el socket */
    handleSocketEvents(context) {
        this.socketClient.on('disconnect', () => {
            console.log('Socket desconectado!');
            this.closeSocket(context);
            clearInterval(this.heartbeat);
        });

        this.socketClient.on('error', () => {
            this.closeSocket(context);
        });

        /** Eventos propios */
        this.socketClient.on('avatar_message', (message) => {
            console.log(message);
        });

        this.socketClient.on('beat', () => {
            console.log('beat');
        });

        this.socketClient.on('exit_game', (message) => {
            console.log(message);
            context.props.setFullScreen(false);
        });

        this.socketClient.on('registered', () => {
            this.heartbeat = setInterval(() => {
                this.socketClient.emit('heart');
            }, 3000);
        });
    }
}

const MessengerSingleton = new Messenger();
export default MessengerSingleton;