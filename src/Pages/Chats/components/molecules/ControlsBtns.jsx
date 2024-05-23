import styled from 'styled-components';
import { ConfigBtn } from '../atoms/ConfigBtn';
import icon from '../../../../assets/images/config.png'
import { AddContact } from '../atoms/AddContact';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    return(
        <Container>
            <ConfigBtn><img src={icon} alt="" /></ConfigBtn>
            <AddContact onClick={()=> navigate('/People')}>Anadir mas gente</AddContact>
        </Container>
    )
}