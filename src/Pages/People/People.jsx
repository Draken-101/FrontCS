import { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from "axios";
import { Card } from "./components/molecules/Card";
import { Contacts } from "./components/organims/Contacts";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
    width:98vw;
    height: calc(100vh - 2vw);
    padding: 1vw;
    overflow: hidden;
    background-color: #081f34;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 90% 10%;
    .Volver{
        border: 0;
        border-radius: 0.15vw;
        font-size: 2.5vw;
        color: #081f34;
        width: 50%;
        margin-left: 25%;
        height: 80%;
        &:hover{
            cursor: pointer;
            color: #00e5ff;
            background-color: #000000;
        }
    }
`;

export function People() {
    const [contacts, setcontacts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                let headers = {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }

                const amigos = JSON.parse(localStorage.getItem('amigos'));
                const body = JSON.stringify({
                    idUser1: localStorage.getItem('idUser1'),
                    amigos: amigos
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
            <Contacts contacts={contacts} />
            <button className="Volver" onClick={() => navigate('/Chats')}>Volver</button>
        </Container>
    )
}


