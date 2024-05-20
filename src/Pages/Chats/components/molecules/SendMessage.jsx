import './SendMessage.css'
import styled from 'styled-components';
import icon from '../../../../assets/images/enviar.png'
const Btn = styled.button`
    background-image: url(${icon});
    background-color: transparent;
    border: 0;
    margin: 25%;
    width: 50%;
    height: 50%;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 50%;
    filter: contrast(0%) brightness(100);
    cursor: pointer;
`;
export function SendMessage(){
    return(
        <div className='SendMessage'>
            <input type="text" placeholder=' Escribe un mensaje'/>
            <Btn/>
        </div>
    )
}