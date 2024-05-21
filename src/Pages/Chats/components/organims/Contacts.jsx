import styled from 'styled-components';
import { Contact } from '../molecules/Contact';
import { useState } from 'react';
import { ControlsBtns } from '../molecules/ControlsBtns';
const Container = styled.div`
    width: calc(40vw - 5vh);
    height: 90vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 83vh 7vh;
    border-right: .05vw solid white;
    .ContaineContacts{
    scrollbar-width: none;
    -ms-overflow-style: none;
        overflow-y: scroll; 
        max-height: 83vh;
    }
`;
export function Contacts({ changeChat }) {
    const [onChat, setOnChat] = useState('');
    const handleSetOnChat = (e) => {
        changeChat(e)
        console.log(e);
        setOnChat(e);
    }
    return (
        <Container>
            <div className='ContaineContacts'>
                <Contact key={'1'} onChat={(e) => handleSetOnChat(e)} id={'1'} idContact={onChat} />
                <Contact key={'2'} onChat={(e) => handleSetOnChat(e)} id={'2'} idContact={onChat} />
            </div>
            <ControlsBtns/>
        </Container>
    )
}