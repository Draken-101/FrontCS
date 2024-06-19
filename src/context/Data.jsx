import axios from "axios";

export const getData = async (setChats, setContacts, contacts, setAllContacts, allContacts) => {
    try {
        const headers = { 'Content-Type': 'application/json', 'token': User1.token };
        const body = JSON.stringify({ idUser1: User1.idUser1 });
        console.log(isAuthenticated);

        try {
            await axios.get(`http://localhost:3000/chat`, body, { headers })
                .then(res => {
                    setChats(res.data.chats);
                });

        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
        const source = new EventSource(`http://localhost:3000/clients/${User1.idUser1}/${User1.token}`);

        source.addEventListener('unautorized', (event) => {
            console.log(JSON.parse(event.data));
        });

        source.addEventListener('userContacts', (event) => {
            setContacts(JSON.parse(event.data));
        });

        source.addEventListener('allContacts', (event) => {
            setAllContacts(JSON.parse(event.data))
        });

        source.addEventListener('newUser', (event) => {
            setAllContacts([...allContacts, JSON.parse(event.data)])
        });

        source.addEventListener('updateContact', (event) => {
            console.log(event.data);
        });

        source.addEventListener('newEstado', (event) => {
            console.log(JSON.parse(event.data));
            const newEstado = JSON.parse(event.data);
            setContacts(contacts?.map(contact => {
                if (contact._id === newEstado.idUser) {
                    contact.estados?.push(newEstado);
                    return contact;
                }
                return contact;
            }))
        });
    } catch (error) {
        throw (error);
    }
};