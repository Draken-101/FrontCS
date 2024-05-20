import { useEffect, useState } from "react";
import { Chat } from "./components/organims/Chat";
import { Contacts } from "./components/organims/Contacts";
import styled from 'styled-components';
import axios from "axios";
const Container = styled.div`
    width: 90vw;
    border-radius: .4vw;
    overflow: hidden;
    background-color: #081f34;
    margin: 5vh 5vw;
    justify-content: center;
    display: flex;
`;
export function Chats() {
    const [chatInUse, setChatInUse] = useState('');
    const [contacts, setcontacts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/')
    }, []);
    return (
        <Container>
            <Contacts changeChat={(e) => setChatInUse(e)}/>
            <Chat chatInUse={chatInUse}/>
        </Container>
    )
}