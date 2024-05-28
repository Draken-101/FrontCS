
import styled from 'styled-components';
const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: grey;
    z-index: 1;
    video {
        position: relative;
        object-fit: contain; 
        width: 100%;
        height: 100%; 
    }
`;
export function Multimedia({ estado }) {
    return (
        <Container>
        </Container>
    )
}