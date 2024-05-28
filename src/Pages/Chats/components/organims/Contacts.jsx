import styled from 'styled-components';
import { Contact } from '../molecules/Contact';
import { useState } from 'react';
import { ControlsBtns } from '../molecules/ControlsBtns';
const Container = styled.div`
    width: 40vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 93vh 7vh;
    border-right: .05vw solid white;
    background-color: #001324;
    .ContaineContacts{
        display: flex;
        flex-direction: column;
        gap: .5vw;
        padding: 1vw;
        scrollbar-width: none;
        -ms-overflow-style: none;
        overflow-y: scroll; 
        max-height: 93vh;
    }
`;
export function Contacts({ contacts, getChat, setSection }) {
    const [onChat, setOnChat] = useState('');
    const handleSetOnChat = (idContact) => {
        if (localStorage.getItem('idUser2') !== idContact) {
            localStorage.setItem("idUser2", idContact);
            getChat(idContact)
            setOnChat(idContact);
        }
    }
    return (
        <Container>
            <div className='ContaineContacts'>
                {
                    contacts?.map(contact => <Contact setSection={setSection} lastMessage={contact.lastMessage} changeChat={handleSetOnChat} data={contact} key={contact._id} idContact={contact._id} contactOnChat={onChat} />)
                }
            </div>
            <ControlsBtns setSection={setSection} />
        </Container>
    )
}