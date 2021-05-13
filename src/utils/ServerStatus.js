/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @maintainer Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

class ServerStatus {

    constructor(context) {
        this.context = context;
        this.interval = null;
    }

    /** Métodos de la clase */
    /** Verificar el estado del servidor */
    checkServerStatus(check, game, Messenger) {
        if (check) {
            /** Lanzar un intervalo de 3 segundos para verificar */
            this.interval = setInterval(async () => {
                const { error, status } = await this.context.props.ping(game);
                const errorData = error ? { error, status } : null;

                if (game) 
                    this.handleGameServerStatus();
                else
                    this.handleServerStatus(errorData, Messenger);
            }, 
            3000);
        }
        else
            this.clearInterval();
    }

    /** Detener el intervalo */
    clearInterval() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    handleServerStatus(error, Messenger) {
        const { props } = this.context;
        const { connection, ui } = props;

        if (error) {
            const { status } = error;
                        
            if (status === 500) {
                const message = '¡El servidor está desconectado!';
                if (!ui.notification)
                    props.setNotification({ 
                        error: true, 
                        message, 
                        serverStatus: true, 
                        slide: false 
                    });
            }
            else if (status === 401)
                console.log('¡Token inválido!');
        }
        else {
            Messenger.handleConnection(connection, this.context);
            if (ui.notification && ui.notification.serverStatus) 
                props.setNotification(null);
        }
    }

    handleGameServerStatus() {

    }
}

export default ServerStatus;