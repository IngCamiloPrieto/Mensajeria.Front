import { NextObserver, Subscribable, Unsubscribable } from 'rxjs';

/**
 * Definición del tipo para los llamados de un Observer
 * @param T entidad esperada en el llamado onNext del Observer
 */
export type Manejador<T> = NextObserver<T>;

/**
 * Definición del tipo subscripcion para un Observer de la libreria RxJs
 * @param T Tipo con la definición de la respuesta en la llamada next del Observer
 */

export type Subscripcion<T> = Subscribable<T> & Unsubscribable;

export default class ManejadorObservador {
    private contenedor: Unsubscribable[];
    protected conexionesActivas: number;
    constructor() {
        this.contenedor = [];
        this.conexionesActivas = 0;
    }

    /**
     * Cancela la subscripciones activas en un contenedor pero no los eventos asociados a dichas subscripciones
     */
    public liberarContenedor() {
        this.contenedor.forEach((subscripcion) => {
            subscripcion.unsubscribe();
        });
        this.contenedor = [];
        this.conexionesActivas = 0;
    }

    /**
     * Permite asociar uno u mas observadores en un contenedor común
     * @param delegado función que al ser ejecutada retorna una subscripción
     * @param manejador objeto que contiene las funciones asociadas a los distintos llamados de un Observer
     * @return función para cancelar una subscripción
     */
    protected manejarObservador<T>(delegado: () => Subscripcion<T>, manejador: Manejador<T>): Unsubscribable {
        const subscripcion = delegado().subscribe(manejador);
        this.contenedor.push(subscripcion);
        this.conexionesActivas++;
        return {
            unsubscribe: () => {
                this.conexionesActivas--;
                subscripcion.unsubscribe();
            }
        };
    }
}
