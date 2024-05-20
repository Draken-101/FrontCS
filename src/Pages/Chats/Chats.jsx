import { Chat } from "./components/organims/Chat";
import { Contacts } from "./components/organims/Contacts";
import styled from 'styled-components';
const Container = styled.div`
    display: flex;
`;
export function Chats(){
    return(
        <Container>
            <Contacts/>
            <Chat/>
        </Container>
    )
}