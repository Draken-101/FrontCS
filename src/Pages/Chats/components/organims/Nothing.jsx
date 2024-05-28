import styled from 'styled-components';
import img from '../../../../assets/images/Ozb.gif'
const Container = styled.div`
    background-image: url(${img});
    background-size: cover;
    width: 60vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
        font-size: 3vw;
        color: white;
    }
`;
export function Nothing(){
    return(
        <Container>
            <span> Nada por aqui </span>
        </Container>
    );
}