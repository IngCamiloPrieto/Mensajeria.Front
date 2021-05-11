import Axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

type ObtenerToken = () => string;

/**
 * @param url url ruta base del servidor 
 * @param token token de autencicación
 */
export default class ServiciosRest {
    public servicio: AxiosInstance;        
    private obtenerToken?: ObtenerToken;

    constructor(baseURL: string, llaveCifrado: string = '', token?: string | ObtenerToken) {        
        this.servicio = Axios.create({
            baseURL
        });        
        if (token && typeof token === 'function') this.obtenerToken = token as ObtenerToken;
        else if (token)
            this.servicio.defaults.headers.common = {
                Authorization: `Bearer ${token}`
            };
    }


    /**
     * Ejecuta el metodo http GET
     * @param ruta url de la petición
     * @param parametros posibles argumentos que tenga la petición
     * @param config configuración de la petición
     * @return promesa con la respuesta del servicio
     */
    public get<T>(ruta: string, parametros?: string, config?: AxiosRequestConfig): AxiosPromise<T> {
        return new Promise((resolve, reject) => {
            const configuracion: AxiosRequestConfig = { ...config };
            if (this.obtenerToken)
                configuracion.headers = {
                    ...config?.headers,
                    Authorization: `Bearer ${this.obtenerToken()}`
                };
            this.servicio
                .get(`${ruta}${parametros ? `/${parametros}` : ''}`, configuracion)
                .then((respuesta) => {
                    resolve(respuesta);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }


    /**
     * Ejecuta el metodo http POST
     * @param ruta url de la petición
     * @param body cuerpo o contenido de la petición
     * @param config configuración de la petición
     * @return promesa con la respuesta del servicio
     */
    public post<T>(ruta: string, body: any, config?: AxiosRequestConfig): AxiosPromise<T> {
        return new Promise((resolve, reject) => {
            const configuracion: AxiosRequestConfig = { ...config };
            if (this.obtenerToken)
                configuracion.headers = {
                    ...config?.headers,
                    Authorization: `Bearer ${this.obtenerToken()}`
                };
            this.servicio
                .post(`${ruta}`, body, configuracion)
                .then((respuesta) => {
                    resolve(respuesta);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }


    /**
     * Ejecuta el metodo http PUT
     * @param ruta url de la petición
     * @param body cuerpo o contenido de la petición
     * @param config configuración de la petición
     * @return promesa con la respuesta del servicio
     */
    public put<T>(ruta: string, body: any, config?: AxiosRequestConfig): AxiosPromise<T> {
        return new Promise((resolve, reject) => {
            const configuracion: AxiosRequestConfig = { ...config };
            if (this.obtenerToken)
                configuracion.headers = {
                    ...config?.headers,
                    Authorization: `Bearer ${this.obtenerToken()}`
                };
            this.servicio
                .put(`${ruta}`, body, configuracion)
                .then((respuesta) => {
                    resolve(respuesta);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }

    /**
     * Ejecuta el metodo http DELETE
     * @param ruta url de la petición
     * @param body cuerpo o contenido de la petición
     * @param config configuración de la petición
     * @return promesa con la respuesta del servicio
     */
    public delete<T>(ruta: string, body: any, config?: AxiosRequestConfig): AxiosPromise<T> {
        return new Promise((resolve, reject) => {
            const configuracion: AxiosRequestConfig = { ...config };
            if (this.obtenerToken)
                configuracion.headers = {
                    ...config?.headers,
                    Authorization: `Bearer ${this.obtenerToken()}`
                };
            this.servicio
                .delete(`${ruta}`, { data: body, ...configuracion })
                .then((respuesta) => {
                    resolve(respuesta);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }

 
}
