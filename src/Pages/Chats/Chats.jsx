import { useEffect, useState, useCallback } from "react";
import { Chat } from "./components/organims/Chat";
import { Contacts } from "./components/organims/Contacts";
import styled from 'styled-components';
import axios from "axios";
import { SubirEstado } from "./components/organims/SubirEstado";
import { Configuracion } from "./components/organims/Configuracion";
import { Nothing } from "./components/organims/Nothing";

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
    const [estados, setEstados] = useState([]);
    const [socket, setSocket] = useState(null);
    const [section2, setSection2] = useState('');


    useEffect(() => {

        const handleNewMessage = (newMessage) => {
            const idUser2 = localStorage.getItem("idUser2");
            console.log(contacts);
            const updatedContacts = contacts.map(contact => {
                console.log(contact._id);
                if (contact._id == idUser2) {
                    return { ...contact, lastMessage: newMessage };
                }
                return contact;
            });
            console.log(updatedContacts);
            setContacts(updatedContacts);
            setChatInUse(prevChat => ({
                ...prevChat,
                mensajes: [...prevChat.mensajes, newMessage]
            }));
        };
        async function fetchContacts() {
            const idUser1 = localStorage.getItem("idUser1");
            const idUser2 = localStorage.getItem("idUser2");
            const idNewContact = JSON.parse(localStorage.getItem('idNewContact'));
            const token = localStorage.getItem('token');

            const headers = { 'Content-Type': 'application/json', 'token': token };
            try {
                const body = JSON.stringify({ idUser1 });
                if (idNewContact) {
                    setSection2('Chat');
                    const contactBody = JSON.stringify({ idUser1, idContact: idUser2 });
                    await axios.post(`http://localhost:3000/users/getContact`, contactBody, { headers })
                        .then(res => {
                            setContacts([...contacts, res.data]);
                        });
                    localStorage.setItem('idNewContact', false);
                } else {
                    await axios.post(`http://localhost:3000/users/contacts`, body, { headers })
                        .then(res => {
                            setContacts(res.data);
                        });
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

            ws.onmessage = async (event) => {
                const dataJson = JSON.parse(event.data);
                console.log('Mensaje recibido desde el servidor:', dataJson);

                switch (dataJson.event) {
                    case 'newMessage':
                        handleNewMessage(dataJson.newMessage);
                        break;
                    case 'Messages':
                        setChatInUse(dataJson.chat || {});
                        break;
                    case "newChat":
                        fetchContacts();
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

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    const getProfiles = async () => {
        try {
            const token = localStorage.getItem('token');
            const idUser1 = localStorage.getItem("idUser1");
            const headers = { 'Content-Type': 'application/json', 'token': token };
            const body = JSON.stringify({ idUser1 });
            const response = await axios.post(`http://localhost:3000/users/getProfiles`, body, { headers });
            console.log(response.data);
            const profileData = response.data;
            setContacts(prevContacts => prevContacts.map(contact => {
                if (contact._id === profileData.idAmigo) {
                    return { ...contact, profilePictureUrl: profileData.url };
                }
                return contact;
            }));
        } catch (error) {
            console.error("Error fetching profiles:", error);
        }
        getProfiles();
    };


    const getEstados = async () => {
        try {
            const token = localStorage.getItem('token');
            const idUser1 = localStorage.getItem("idUser1");
            const headers = {
                'Content-Type': 'application/json',
                'token': token
            };
            const body = JSON.stringify({ idUser1: idUser1 });
            try {
                const response = await axios.post(`http://localhost:3000/estados/getEstados`, body, { headers });
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
            setContacts(prevContacts => prevContacts.map(contact => {
                let newEstados = [];
                if (contact.estados !== undefined) {
                    newEstados = contact.estados;
                }
                newEstados.push(estadoData)
                return { ...contact, estados: newEstados };
            }));
        } catch (error) {
            console.error("Error fetching profiles:", error);
        }
        getEstados();
    };

    useEffect(() => {
        getEstados();
    }, []);

    useEffect(() => {
        getProfiles();
    }, []);

    const sendMessage = (mensaje) => {
        const amigos = JSON.parse(localStorage.getItem('amigos'));
        if (!amigos.includes(localStorage.getItem('idUser2'))) {
            amigos.push(localStorage.getItem('idUser2'));
            localStorage.setItem("amigos", JSON.stringify(amigos));
        }

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
            <Contacts
                setEstados={() => {
                    const idUser2 = localStorage.getItem("idUser2");
                    const getEstados = contacts.filter(contact => {
                        if (contact._id === idUser2) {
                            return contact.estados;
                        }
                    })
                    console.log(getEstados);
                }}
                chatInUse={Object.keys(chatInUse).length === 0}
                contacts={contacts}
                getChat={getChat}
                setSection={setSection2}
            />
            {
                section2 === 'Chat' ? (
                    <Chat chatInUse={chatInUse} sendMessage={sendMessage} />
                ) : section2 === 'SubirEstado' ? (
                    <SubirEstado setSection={setSection2} />
                ) : section2 === 'Configuracion' ? (
                    <Configuracion setSection={setSection2} />
                ) : (
                    <Nothing />
                )
            }
        </Container>
    );
}
