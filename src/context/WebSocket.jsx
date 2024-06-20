
const newMessageReciver = async (newMessage, setChats, setContacts, chatId, id) => {
    setContacts(prevContacts => prevContacts.map(contact => {
        if (contact._id == id) {
            contact.lastMessage = newMessage;
            contact.noReads += 1;
            console.log(contact.noReads);
            if (contact.noReads == 1) {
                console.log(contact.noReads);
                setChats(prevChats => prevChats.map(chat => {
                    if (chat._id === chatId) {
                        chat.mensajes.push({ noReads: true });
                        console.log({ noReads: true });
                    }
                    return { ...chat }
                }));
            }
            setChats(prevChats => prevChats.map(chat => {
                if (chat._id === chatId) {
                    chat.mensajes.push(newMessage);
                    console.log(newMessage);
                }
                return { ...chat };
            }));
        }

        return { ...contact };
    }));
};


const newMessageSender = async (newMessage, setChats, setContacts, chatId, id) => {
    setContacts(prevContacts => prevContacts.map(contact => {
        if (contact._id == id) {
            contact.lastMessage = newMessage;
        }
        return { ...contact };
    }));
    setChats(prevChats => prevChats.map(chat => {
        if (chat._id === chatId) {
            chat.mensajes.push(newMessage);
        }
        return { ...chat };
    }));
};

export const initializeWebSocket = (setChats, setContacts, User1) => {

    if (!User1.token) {
        return;
    }

    const ws = new WebSocket('ws://localhost:3000');


    ws.onopen = () => {
        console.log('Conexión WebSocket abierta');
        ws.send(JSON.stringify({ event: "", idUser1: User1.idUser1, token: User1?.token }));
    };

    ws.onmessage = async (event) => {
        const dataJson = JSON.parse(event.data);
        console.log('Mensaje recibido desde el servidor:', dataJson);

        switch (dataJson.event) {
            case 'newMessageReciver':
                console.log('newMessageReciver');
                newMessageReciver(dataJson.newMessage, setChats, setContacts, dataJson.chatId, dataJson.id);
                break;
            case 'newMessageSender':
                console.log('newMessageSender');
                newMessageSender(dataJson.newMessage, setChats, setContacts, dataJson.chatId, dataJson.id);
                break;
            case "newChat":
                console.log("newChat");
                setContacts(prevContacts => prevContacts.map(contact => {
                    if (contact._id === dataJson.idUser2) {
                        contact.lastMessage = dataJson.lastMessage;
                    }
                    return contact;
                }))
                setChats(prevChats => [...prevChats, dataJson.newChat]);
                break;
            default:
                break;
        }
    };

    ws.onerror = (error) => {
        console.error('Error en la conexión WebSocket:', error);
    };

    return ws;
};