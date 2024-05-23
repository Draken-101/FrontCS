import { useEffect, useState } from "react";
import { Chat } from "./components/organims/Chat";
import { Contacts } from "./components/organims/Contacts";
import styled from 'styled-components';
import axios from "axios";
import { useParams } from "react-router-dom";
const Container = styled.div`
    width:100vw;
    overflow: hidden;
    background-color: #081f34;
    justify-content: center;
    display: flex;
`;

export function Chats() {
    const [chatInUse, setChatInUse] = useState({});
    const [contacts, setcontacts] = useState([]);
    const { idNewContact } = useParams();
    const [socket, setSocket] = useState(null);
    useEffect(() => {

        async function peticion() {
            const ws = new WebSocket('ws://localhost:3000');

            ws.onopen = () => {
                console.log('Conexión WebSocket abierta');
                setSocket(ws);

                ws.send(JSON.stringify({
                    token: localStorage.getItem('token'),
                    event: "getChat",
                    idUser1: localStorage.getItem('idUser'),
                    idUser2: idNewContact ? idNewContact : chatInUse.idChat
                }))
            };

            ws.onclose = () => {
                console.log('Conexión WebSocket cerrada');
                setSocket(null);
            };

            ws.onmessage = (event) => {
                const dataJson = JSON.parse(event.data);
                console.log('Mensaje recibido desde el servidor:', dataJson);
            };

            ws.onerror = (error) => {
                console.error('Error en la conexión WebSocket:', error);
            };

            const objet = idNewContact ? {
                idUser: localStorage.getItem("idUser"),
                idContact: idNewContact
            }
                :
                {
                    idUser: localStorage.getItem("idUser"),
                    amigos: JSON.stringify(localStorage.getItem("amigos"))
                };
            let headers = {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
            const body = JSON.stringify(objet);
            const fetchedContacts = await axios.post(`http://localhost:3000/users/${idNewContact ? "getContact" : "contacts"}`, body, { headers: headers });
            setcontacts([fetchedContacts.data]);
        }
        peticion();

    }, []);

    const sendMessage = (mensaje) => {
        if (socket) {
            const objet = {
                event: "sendMessage",
                token: localStorage.getItem('token'),
                chatId: chatInUse.idChat,
                message: mensaje,
                idUser1: localStorage.getItem('idUser'),
                idUser2: chatInUse.idContact
            }
            socket.send(JSON.stringify(objet));
            console.log('Mensaje enviado al servidor:', objet);
        }
    };
    return (
        <Container>
            <Contacts contacts={contacts} changeChat={(e) => setChatInUse(e)} />
            <Chat chatInUse={chatInUse.idChat} idContact={chatInUse.idContact} sendMessage={sendMessage} />
        </Container>
    )
}


