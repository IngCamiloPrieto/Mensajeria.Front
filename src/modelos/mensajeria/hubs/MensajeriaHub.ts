
import {mensajeriaHub} from '../../conexiones/';

class MensajeriaHub {
    public async iniciarConexion() {
        return mensajeriaHub.iniciarConexion();
    }

    public async detenerConexion() {
        return mensajeriaHub.detenerConexion();
    }

    public conectarseASala(idSala: string) {
        return mensajeriaHub.ejecutarAccion('ConectarseASala', idSala);
    }

    public recibirMensaje() {
        return mensajeriaHub.subscribirAccion<string>('RecibirMensaje');
    }
}

export default MensajeriaHub;