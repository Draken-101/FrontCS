import { useCallback, useEffect, useState } from "react";
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
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();
    const fetchData = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const amigos = JSON.parse(localStorage.getItem('amigos'));
            const idUser1 = localStorage.getItem('idUser1');

            if (!token || !amigos || !idUser1) {
                throw new Error('Datos locales faltantes o inválidos');
            }

            const headers = {
                'Content-Type': 'application/json',
                'token': token
            };

            const body = {
                idUser1: idUser1,
                amigos: amigos
            };

            const response = await axios.post('http://localhost:3000/users/allContacts', body, { headers });

            console.log('Response data:', response.data);

            setContacts(response.data);
        } catch (error) {
            if (error.response) {
                console.error('Error en la respuesta del servidor:', error.response.data);
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor:', error.request);
            } else {
                console.error('Error al configurar la solicitud:', error.message);
            }
        }
    }, []);

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, [fetchData]);
    return (
        <Container>
            <Contacts contacts={contacts} />
            <button className="Volver" onClick={() => navigate('/Chats')}>Volver</button>
        </Container>
    )
}


