import React, { useEffect, useMemo, useState } from 'react';
//import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography} from '@material-ui/core';
import ChatCM from '../chat/ChatCM';
import IMensaje from '../../../modelos/mensajeria/entidades/IMensaje';

const Chat =()=>
{
    //const { idSala } = useParams<{ idSala: string }>();
    const [mensaje,setMensaje] =useState<string>("");
    const chatCM = useMemo(() => new ChatCM(), []);
    useEffect(() => {
        inicializar();
        return () => {
            chatCM.detenerConexion();
        };
    }, []);

    const inicializar = async () => {
        
        await chatCM.iniciarConexion();
        chatCM.conectarseASala("1");
        chatCM.recibirMensaje({
            next: (mensajeString) => {
                const mensaje: IMensaje = JSON.parse(mensajeString);                
                console.log(mensaje);   
                return setMensaje(mensaje.Mensaje);             
            },
        });
    };

    return(
        <Card style={{ overflow: 'auto', height: '100vh' }}>
            <CardContent>
            <Typography component="h5" variant="h5">
                {mensaje}
            </Typography>
            </CardContent>
        </Card>
    )
}

export default Chat;