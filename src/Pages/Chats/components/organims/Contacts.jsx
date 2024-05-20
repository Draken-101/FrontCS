import styled from 'styled-components';
import { Contact } from '../molecules/Contact';
const Container = styled.div`
    width: 40vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-right: .05vw solid white;
`;
export function Contacts(){
    return(
        <Container>
            <Contact/>
            <Contact/>
        </Container>
    )
}