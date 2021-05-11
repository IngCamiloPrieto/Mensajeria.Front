import {ServiciosSignalr } from '../../utilitarios/servicios/';

const URL_MENSAJERIA_HUB = 'https://mensajeriaapi.azurewebsites.net/MensajeriaHub';

const mensajeriaHub = new ServiciosSignalr(URL_MENSAJERIA_HUB);

export { mensajeriaHub};