import styled from 'styled-components';
import { ConfigBtn } from '../atoms/ConfigBtn';
import icon from '../../../../assets/images/config.png'
import { AddContact } from '../atoms/AddContact';
const Container = styled.div`
    width: calc(100% - 2vh);
    height: calc(100% - 2vh);
    background-color: #02121f;
    padding: 1vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export function ControlsBtns(){
    return(
        <Container>
            <ConfigBtn><img src={icon} alt="" /></ConfigBtn>
            <AddContact>Anadir mas gente</AddContact>
        </Container>
    )
}