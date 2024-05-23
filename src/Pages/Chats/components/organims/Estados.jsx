import styled from 'styled-components';
import { useState } from 'react';
import { Multimedia } from '../molecules/Multimedia';
const Container = styled.div`
    position: relative;
    width: 60vw;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
`;
export function Estados({ estados }) {
    const [onChat, setOnChat] = useState('');
    return (
        <Container>
            <Multimedia/>

        </Container>
    )
}