import MensajeriaHub from "../../../modelos/mensajeria/hubs/MensajeriaHub";
import ManejadorObservador,{Manejador} from "../../../utilitarios/manejadorObservador";

class chatCM extends ManejadorObservador
{
    private mensajeriaHub:MensajeriaHub;

    constructor() {
        super();
        this.mensajeriaHub= new MensajeriaHub();

    }

    public async iniciarConexion() {
        await this.mensajeriaHub.iniciarConexion();
    }

    public async detenerConexion() {
        await this.mensajeriaHub.detenerConexion();
        this.liberarContenedor();
    }

    public conectarseASala(idGrupo: string) {
        this.mensajeriaHub.conectarseASala(idGrupo);
    }

    public recibirMensaje({ next }: Manejador<string>) {
        this.manejarObservador(() => this.mensajeriaHub.recibirMensaje(), { next });
    }
}

export default chatCM;
