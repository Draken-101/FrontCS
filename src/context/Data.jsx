import axios from "axios";

const safeJSONParse = (data) => {
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error("❌", data);
        return null;
    }
};

export const getData = async (setChats, setContacts, setAllContacts, User1) => {
    try {
        if (!User1.token) {
            console.log(User1.token);
            return;
        }


        const headers = { 'Content-Type': 'application/json', 'token': User1.token };
        const body = JSON.stringify({ idUser1: User1.idUser1 });

        try {
            await axios.get(`http://localhost:3000/chat/${User1.idUser1}`, body, { headers })
                .then(res => {
                    setChats(res.data.chats);
                });

        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
        const source = new EventSource(`http://localhost:3000/clients/${User1.idUser1}/${User1.token}`);

        source.addEventListener('unautorized', (event) => {
            console.log('unautorized');
            const data = safeJSONParse(event.data);
            if (data) {
                console.log(data);
            }
        });

        source.addEventListener('userContacts', (event) => {
            console.log('userContacts');
            const data = safeJSONParse(event.data);
            if (data) {
                setContacts(data);
            }
        });

        source.addEventListener('allContacts', (event) => {
            console.log('allContacts');
            const data = safeJSONParse(event.data);
            if (data) {
                setAllContacts(data);
            }
        });

        source.addEventListener('newUser', (event) => {
            console.log('newUser');
            const data = safeJSONParse(event.data);
            if (data) {
                setAllContacts(prevAllContacts => [...prevAllContacts, data]);
            }
        });

        source.addEventListener('newEstado', (event) => {
            console.log('newEstado');
            const newEstado = safeJSONParse(event.data);
            if (newEstado) {
                setContacts(prevContacts => prevContacts.map(contact => {
                    if (contact._id === newEstado.idUser) {
                        contact.estados?.push(newEstado);
                        return contact;
                    }
                    return contact;
                }));
            }
        });
        
        source.addEventListener('updateContact', (event) => {
            console.log('updateContact');
            const { profilePictureUrl, username, idUser } = safeJSONParse(event.data);
            if (profilePictureUrl && username && idUser) {
                setContacts(prevContacts => prevContacts.map(contact => {
                    if (contact._id === idUser) {
                        contact.username = username;
                        contact.profilePictureUrl = profilePictureUrl;
                    }
                    return contact;
                }));
            }
        });
    } catch (error) {
        throw (error);
    }
};