import styled from 'styled-components';
import { Contact } from '../molecules/Contact';
import { useState } from 'react';
const Container = styled.div`
    width: 35vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    border-right: .05vw solid white;
`;
export function Contacts({changeChat}){
    const [onChat, setOnChat] = useState('');
    const handleSetOnChat = (e) =>{
        changeChat(e)
        console.log(e);
        setOnChat(e);
    }
    return(
        <Container>
            <Contact key={'1'} onChat={(e) => handleSetOnChat(e)} id={'1'} idContact={onChat}/>
            <Contact key={'2'} onChat={(e) => handleSetOnChat(e)} id={'2'} idContact={onChat}/>
        </Container>
    )
}