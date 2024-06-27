import { useCallback, useEffect, useRef, useState } from 'react';
import { Message } from '../atoms/Message'
import './Messages.css'
import { useUserContext } from '../../../../context/userAuth';
import { NoReads } from '../atoms/NoReads';
export function Messages({readMessages}) {
    const containerRef = useRef(undefined);
    const { User1, setChats, User2, chats } = useUserContext()
    const [chatInUse, setChatInUse] = useState({});

    useEffect(() => {
        getChat(User2.idUser2);
    }, [User2]);
    const getChat = useCallback((idContact) => {
        setChats(prevChats => prevChats.map(chat => {
            if (chat._id === chatInUse._id) {
                const newMessages = chat.mensajes.map(m => {
                    if (m.noReads) {
                        return undefined
                    }
                    return m;
                });
                return {...chat, mensajes: newMessages?.filter(message => message !== undefined)}
            }
            return { ...chat };
        }));
        console.log(chats?.find(chat => chat?.participantes.includes(idContact)));
        setChatInUse(chats?.find(chat => chat?.participantes.includes(idContact)));
    })
    useEffect(() => {

        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [chatInUse?.mensajes?.length]);

    const handleDivClick = (event) => {
        if (event.target === event.currentTarget) {
            readMessages(User2.idUser2);
        }
    };
    return (
        <div onClick={handleDivClick} ref={containerRef} className='Messages'>
            {
                chatInUse?.mensajes?.map((mensaje, index) => {
                    if (mensaje?.noReads) {
                        console.log(mensaje);
                        return (
                            <NoReads key={index}>
                                No Leidos
                            </NoReads>
                        )
                    } else if (mensaje?.idUser === User1.idUser1) {
                        return (
                            <Message key={index} className='message-right'>
                                {mensaje?.mensaje}
                                <span>
                                    {mensaje?.date}
                                </span>
                            </Message>
                        )
                    } else {
                        return (
                            <Message key={index} className='message-left'>
                                {mensaje?.mensaje}
                                <span>
                                    {mensaje?.date}
                                </span>
                            </Message>
                        )
                    }

                })
            }
        </div>
    )
}