import { useEffect, useState } from "react";
import { Chat } from "./components/organims/Chat";
import { Contacts } from "./components/organims/Contacts";
import styled from 'styled-components';
import axios from "axios";
import { SubirEstado } from "./components/organims/SubirEstado";
import { Configuracion } from "./components/organims/Configuracion";
import { Estados } from "./components/organims/Estados";

const Container = styled.div`
    width: 100vw;
    overflow: hidden;
    background-color: #081f34;
    justify-content: center;
    display: grid;
    grid-template-columns: 40vw 60vw;
`;

export function Chats() {
    const [chatInUse, setChatInUse] = useState({});
    const [contacts, setContacts] = useState([]);
    const [socket, setSocket] = useState(null);
    const [section2, setsection2] = useState('');

    useEffect(() => {
        async function fetchContacts() {
            const idUser1 = localStorage.getItem("idUser1");
            const idUser2 = localStorage.getItem("idUser2");
            const idNewContact = JSON.parse(localStorage.getItem('idNewContact'));
            const token = localStorage.getItem('token');



            const headers = { 'Content-Type': 'application/json', 'token': token };
            try {
                let objet = { idUser1: idUser1 };
                let body = JSON.stringify(objet);
                const Contacts = await axios.post(`http://localhost:3000/users/contacts`, body, { headers });
                setContacts(Contacts.data);
                if (idNewContact) {
                    objet = { idUser1: idUser1, idContact: localStorage.getItem('idUser2') };
                    body = JSON.stringify(objet);
                    const contact = await axios.post(`http://localhost:3000/users/getContact`, body, { headers });
                    setContacts([...Contacts.data, contact.data]);
                    getChat(idUser2);
                    localStorage.setItem('idNewContact', false);
                }
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

            ws.onmessage = async (event) => {
                const dataJson = await JSON.parse(event.data);
                console.log('Mensaje recibido desde el servidor:', dataJson);

                switch (dataJson.event) {
                    case 'newMessage':
                        const idUser2 = localStorage.getItem("idUser2");
                        const updateContacts = contacts.map(contact => {
                            console.log(contact);
                            console.log(contact._id === idUser2);
                            if (contact._id === idUser2) {
                                contact.lastMessage = dataJson.newMessage;
                            }
                            return contact;
                        })
                        setContacts(updateContacts);
                        setChatInUse((prevChat) => ({
                            ...prevChat,
                            mensajes: [...prevChat.mensajes, dataJson.newMessage]
                        }));
                        break;
                    case 'Messages':
                        console.log("Messages: ", dataJson.chat);
                        setChatInUse(dataJson.chat);
                        break;
                    case "newChat":
                        console.log("newChat: ", dataJson.newChat);
                        setChatInUse(dataJson.newChat);
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
        async function getContacts() {
            const token = localStorage.getItem('token');
            const idUser1 = localStorage.getItem("idUser1");
            const headers = { 'Content-Type': 'application/json', 'token': token };
            let objet = { idUser1: idUser1 };
            let body = JSON.stringify(objet);
            const Contacts = await axios.post(`http://localhost:3000/users/contacts`, body, { headers });
            setContacts(Contacts.data);
            console.log(Contacts.data);
            setTimeout(getContacts, 5000);
        }
        getContacts();
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
                chatId: chatInUse?._id,
                message: mensaje,
                idUser1: localStorage.getItem('idUser1'),
                idUser2: localStorage.getItem('idUser2')
            };
            socket.send(JSON.stringify(objet));
            console.log('Mensaje enviado al servidor:', objet);
        }
    };

    const getChat = (id2) => {
        if (socket) {
            socket.send(JSON.stringify({
                token: localStorage.getItem('token'),
                event: "getChat",
                idUser1: localStorage.getItem('idUser1'),
                idUser2: id2
            }));
        }
    };

    return (
        <Container>
            <Contacts contacts={contacts} getChat={getChat} lastMessage={''} setSection={(section) => setsection2(section)} />
            {
                section2 == 'Chat' ?
                    <Chat chatInUse={chatInUse} sendMessage={sendMessage} />
                    :
                    section2 == 'SubirEstado' ?
                        <SubirEstado setSection={(section) => setsection2(section)} />
                        :
                        section2 == 'Configuracion' ?
                            <Configuracion />
                            :
                            section2 == 'Estados' ?
                            <Estados/>
                            :
                            <span> Nada por aqui </span>
            }
        </Container>
    );
}
