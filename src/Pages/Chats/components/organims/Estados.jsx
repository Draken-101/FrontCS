import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Multimedia } from '../molecules/Multimedia';
const Container = styled.div`
    position: relative;
    width: 60vw;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
`;
export function Estados({}) {
    const [estados, setEstados] = useState('');

    useEffect(() => {
        async function getEstados(){

        }

        getEstados()
        return () => {
            
        };
    }, []);

    return (
        <Container>

            <Multimedia/>

        </Container>
    )
}