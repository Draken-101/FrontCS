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
    const [socket, setSocket] = useState(null);
    useEffect(() => {

        async function peticion() {
            const ws = new WebSocket('ws://localhost:3000');

            ws.onopen = () => {
                console.log('Conexión WebSocket abierta');
                setSocket(ws);

            };

            ws.onclose = () => {
                console.log('Conexión WebSocket cerrada');
                setSocket(null);
            };

            ws.onmessage = (event) => {
                const dataJson = JSON.parse(event.data);
                console.log('Mensaje recibido desde el servidor:', dataJson);
                switch (dataJson.event) {
                    case 'newMessage':
                        
                        break;
                
                    default:
                        break;
                }
            };

            ws.onerror = (error) => {
                console.error('Error en la conexión WebSocket:', error);
            };

            const objet = localStorage.getItem('idNewContact') ? {
                idUser: localStorage.getItem("idUser1"),
                idContact: localStorage.getItem('idNewContact')
            }
                :
                {
                    idUser: localStorage.getItem("idUser1"),
                    amigos: JSON.stringify(localStorage.getItem("amigos"))
                };
            let headers = {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
            const body = JSON.stringify(objet);
            const fetchedContacts = await axios.post(`http://localhost:3000/users/${localStorage.getItem('idNewContact') ? "getContact" : "contacts"}`, body, { headers: headers });
            setcontacts([...contacts, fetchedContacts.data]);
        }
        peticion();

    }, []);

    const getChat = () => {
        socket.send(JSON.stringify({
            token: localStorage.getItem('token'),
            event: "getChat",
            idUser1: localStorage.getItem('idUser1'),
            idUser2: localStorage.getItem('idNewContact') || localStorage.getItem('idUser2')
        }))
    }

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


