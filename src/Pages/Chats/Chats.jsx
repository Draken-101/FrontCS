import { useEffect, useState } from "react";
import { Chat } from "./components/organims/Chat";
import { Contacts } from "./components/organims/Contacts";
import styled from 'styled-components';
import axios from "axios";

const Container = styled.div`
    width: 100vw;
    overflow: hidden;
    background-color: #081f34;
    justify-content: center;
    display: flex;
`;

export function Chats() {
    const [chatInUse, setChatInUse] = useState({});
    const [contacts, setContacts] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        async function fetchContacts() {
            const idUser1 = localStorage.getItem("idUser1");
            const idNewContact = JSON.parse(localStorage.getItem('idNewContact'));
            const amigos = JSON.parse(localStorage.getItem("amigos"));
            const token = localStorage.getItem('token');

            const objet = idNewContact ? { idUser1: idUser1, idContact: localStorage.getItem('idUser2') } : { idUser1: idUser1, amigos: amigos };
            const headers = { 'Content-Type': 'application/json', 'token': token };
            const body = JSON.stringify(objet);

            try {
                const response = await axios.post(`http://localhost:3000/users/${idNewContact ? "getContact" : "contacts"}`, body, { headers });
                setContacts(prevContacts => [...prevContacts, response.data]);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        }

        function initializeWebSocket() {
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
                        const newchat = {...chatInUse, mensajes:[...chatInUse.mensajes, dataJson.newMessage]}
                            setChatInUse(newchat);
                        break;
                    case 'Messages':
                        setChatInUse( dataJson.chat);
                        break;
                    case "newChat":
                        setChatInUse( dataJson.newChat);
                        break;
                    default:
                        break;
                }
            };

            ws.onerror = (error) => {
                console.error('Error en la conexión WebSocket:', error);
            };

            return ws;
        }

        fetchContacts();
        const ws = initializeWebSocket();

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    const sendMessage = (mensaje) => {
        if (socket) {
            const objet = {
                event: "sendMessage",
                token: localStorage.getItem('token'),
                chatId: chatInUse.chat?._id,
                message: mensaje,
                idUser1: localStorage.getItem('idUser1'),
                idUser2: localStorage.getItem('idUser2')
            };
            socket.send(JSON.stringify(objet));
            console.log('Mensaje enviado al servidor:', objet);
        }
    };

    const getChat = (id1, id2) => {
        if (socket) {
            socket.send(JSON.stringify({
                token: localStorage.getItem('token'),
                event: "getChat",
                idUser1: id1,
                idUser2: id2
            }));
        }
    };

    useEffect(() => {
        const idNewContact = JSON.parse(localStorage.getItem('idNewContact'));
        const idUser1 = localStorage.getItem('idUser1');
        const idUser2 = localStorage.getItem('idUser2');
        console.log(idNewContact);
        if (idNewContact) {
            localStorage.setItem('idNewContact', false);
        }
        getChat(idUser1, idUser2);
    }, [socket]);

    return (
        <Container>
            <Contacts contacts={contacts} changeChat={setChatInUse} />
            <Chat chatInUse={chatInUse} sendMessage={sendMessage} />
        </Container>
    );
}
