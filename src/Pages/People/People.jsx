import { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from "axios";
import { Card } from "./components/organims/Card";
const Container = styled.div`
    width:98vw;
    height: calc(100vh - 2vw);
    padding: 1vw;
    overflow: hidden;
    background-color: #081f34;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1vw;
`;

export function People() {
    const [contacts, setcontacts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let headers = {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
                const body = JSON.stringify({
                    idUser:localStorage.getItem('idUser')
                });
                const fetchedContacts = await axios.post('http://localhost:3000/users/allContacts', body, { headers: headers });
                setcontacts(fetchedContacts.data);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <Container>
            {
                contacts.map(contact => <Card data={contact}/>)
            }
        </Container>
    )
}


