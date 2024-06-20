import { useCallback, useEffect, useState } from "react";
import { Chat } from "./components/organims/Chat";
import { Contacts } from "./components/organims/Contacts";
import styled from 'styled-components';
import { SubirEstado } from "./components/organims/SubirEstado";
import { Configuracion } from "./components/organims/Configuracion";
import { Nothing } from "./components/organims/Nothing";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userAuth";

const Container = styled.div`
    width: 100vw;
    overflow: hidden;
    background-color: #081f34;
    justify-content: center;
    display: grid;
    grid-template-columns: 40vw 60vw;
`;

export function Chats() {
    const { contacts, setContacts, socket, isAuthenticated, setIsAuthenticated, setUser1, User1, User2, chats, estados } = useUserContext();
    const [section2, setSection2] = useState('');
    const [chatInUse, setChatInUse] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getChat(User2.idUser2);
    }, [User2]);

    const getChat = useCallback((idContact) => {
        setChatInUse(chats?.find(chat => chat.participantes.includes(idContact)));
    })
    if (isAuthenticated == undefined || isAuthenticated == false) {
        setIsAuthenticated(false);
        console.log("No validado");
        navigate('/Login');
    }

    const sendMessage = (mensaje) => {
        if (!User1.amigos.includes(User2?.idUser2)) {
            setUser1({ ...User1, amigos: [...User1?.amigos, User2?.idUser2] });
        }
        if (socket) {

            const objet = {
                event: "sendMessage",
                token: User1?.token,
                chatId: chatInUse?._id,
                message: mensaje,
                idUser1: User1?.idUser1,
                idUser2: User2?.idUser2
            };
            socket.send(JSON.stringify(objet));
            console.log('Mensaje enviado al servidor:', objet);
        }
    };

    const readMessages = (idContact) => {
        setContacts(prevContacts => prevContacts.map(contact => {
            if (contact._id == idContact && contact.noReads > 0) {
                console.log(idContact);
                contact.noReads = 0;
            }
            return contact;
        }));

    }

    return (
        <Container >
            <Contacts
                readMessages={readMessages}
                idUser2={User2.idUser2}
                amigos={User1.amigos}
                setEstados={() => {
                    const getEstados = contacts.filter(contact => {
                        if (contact._id === User2?.idUser2) {
                            return contact.estados;
                        }
                    })
                    console.log(getEstados);
                }}
                chatInUse={Object.keys(chatInUse ? chatInUse : {}).length === 0}
                contacts={contacts}
                setSection={setSection2}
            />
            {
                section2 === 'Chat' ? (
                    <Chat readMessages={readMessages} User2={User2} idUser1={User1.idUser1} sendMessage={sendMessage} />
                ) : section2 === 'SubirEstado' ? (
                    <SubirEstado setSection={setSection2} />
                ) : section2 === 'Configuracion' ? (
                    <Configuracion
                        User1={User1}
                        setSection={setSection2} />
                ) : (
                    <Nothing />
                )
            }
        </Container>
    );
}
