import YouTube from 'react-youtube';
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
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1 // Auto-reproducción
        }
    };
    return (
        <Container>
            <YouTube videoId={'eGMHObp5cx4'} opts={opts} />
        </Container>
    )
}