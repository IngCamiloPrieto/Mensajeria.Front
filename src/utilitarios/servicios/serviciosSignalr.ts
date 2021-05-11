import { Subscripcion } from '../manejadorObservador';
import { Observable, Observer } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { debug } from 'console';

/**
 * Clase para el uso de signalr
 * @param url Cadena base de conexión al hub
 */

let conexionHub: HubConnection | undefined = undefined;

export default class ServiciosSignalr {
    private baseUrl: string;
    constructor(url: string) {
        this.baseUrl = url;
    }

    /**
     * Inicia la conexión con el hub establecido
     * @return promesa que resolvera al establecer la conexión
     */
    public iniciarConexion(params?: string) {
        
        debugger;
        const url = params ? this.baseUrl + params : this.baseUrl;
        conexionHub = new HubConnectionBuilder().withUrl(url).build();
        return conexionHub.start();
    }

    /**
     * Detiene la conexión con el hub establecido
     * @return promesa que resolvera al establecer la conexión
     */
    public detenerConexion() {
        if (conexionHub) return conexionHub.stop();
        else throw new Error('No se ha iniciado la conexión');
    }

    /**
     * Genera una subscripción hacia la acción especificada
     * @param acción acción a la que se desea subscribir
     * @return subscripción generada por el Observer
     */
    public subscribirAccion<T>(accion: string): Subscripcion<T> {
        if (conexionHub)
            return Observable.create((observer: Observer<T>) => {
                try {
                    conexionHub!.on(accion, (respuesta: T) => {
                        observer.next(respuesta);
                    });
                } catch (e) {
                    observer.error(e);
                }
            });
        else throw new Error('No se ha iniciado la conexión');
    }

    /**
     * Ejecuta la función especificada
     * @param acción función a ejecutar
     * @param parámetros parametros que puede reciber la función
     */
    public ejecutarAccion = (accion: string, parametros?: any) => {
        if (conexionHub) {
            const multiParametros = Array.isArray(parametros);
            if (multiParametros) conexionHub.invoke(accion, ...parametros);
            else if (parametros) conexionHub.invoke(accion, parametros);
            else conexionHub.invoke(accion);
        } else throw new Error('No se ha iniciado la conexión');
    };
}
