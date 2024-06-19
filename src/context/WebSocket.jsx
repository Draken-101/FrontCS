
const handleNewMessage = async (newMessage, chats, setChats, setContacts) => {
    const updatedContacts = contacts.map(contact => {
        if (contact._id == User2?.idUser2) {
            return { ...contact, lastMessage: newMessage };
        }
        return contact;
    });
    setContacts(updatedContacts);
    setChats(chats.map(chat => {
        if (chat.participantes.find(User2?.idUser2)) {
            chat.mensajes.push(newMessage);
            return chat;
        }
        return chat;
    }));
};

export const initializeWebSocket = (setChats, chats, setContacts) => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
        console.log('Conexión WebSocket abierta');
    };

    ws.onmessage = async (event) => {
        const dataJson = JSON.parse(event.data);
        console.log('Mensaje recibido desde el servidor:', dataJson);

        switch (dataJson.event) {
            case 'newMessage':
                handleNewMessage(dataJson.newMessage, chats, setChats, setContacts);
                break;
            case 'Messages':
                setChats([...chats, dataJson.chat]);
                break;
            case "newChat":
                setChats([...chats, dataJson.chat]);
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