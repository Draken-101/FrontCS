import { useEffect, useState, useCallback } from "react";
import { Chat } from "./components/organims/Chat";
import { Contacts } from "./components/organims/Contacts";
import styled from 'styled-components';
import axios from "axios";
import { SubirEstado } from "./components/organims/SubirEstado";
import { Configuracion } from "./components/organims/Configuracion";
import { Nothing } from "./components/organims/Nothing";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    width: 100vw;
    overflow: hidden;
    background-color: #081f34;
    justify-content: center;
    display: grid;
    grid-template-columns: 40vw 60vw;
`;

export function Chats({ contacts, chat, socket, idUser2, amigos, setAmigos, isAuthenticated }) {
    const [section2, setSection2] = useState('');
    const navigate = useNavigate();

    if (isAuthenticated) {
        console.log("No validado");
        navigate('/Login');
    }

    const sendMessage = (mensaje) => {
        if (!amigos.includes(idUser2)) {
            setAmigos(idUser2);
        }

        if (socket) {
            const objet = {
                event: "sendMessage",
                token: localStorage.getItem('token'),
                chatId: chat?._id,
                message: mensaje,
                idUser1: localStorage.getItem('idUser1'),
                idUser2: idUser2
            };
            socket.send(JSON.stringify(objet));
            console.log('Mensaje enviado al servidor:', objet);
        }
    };

    const getChat = (id2) => {
        
    };

    return (
        <Container>
            <Contacts
                setEstados={() => {
                    const getEstados = contacts.filter(contact => {
                        if (contact._id === idUser2) {
                            return contact.estados;
                        }
                    })
                    console.log(getEstados);
                }}
                chatInUse={Object.keys(chat ? chat : {}).length === 0}
                contacts={contacts}
                getChat={getChat}
                setSection={setSection2}
            />
            {
                section2 === 'Chat' ? (
                    <Chat chatInUse={chat} sendMessage={sendMessage} />
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
