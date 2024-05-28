import './SendMessage.css'
import styled from 'styled-components';
import icon from '../../../../assets/images/enviar.png'
import { useState } from 'react';
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
    filter: contrast(0%) brightness(2);
    cursor: pointer;
    &:hover{
        filter: contrast(30%) brightness(2);
    }
`;
export function SendMessage({ sendMessage }) {
    const [mensaje, setmensaje] = useState();
    const [value, setValue] = useState('');

    const handleChange = (value) => {
        setValue(value);
    };
    return (
        <div className='SendMessage'>
            <input type="text" placeholder=' Escribe un mensaje' 
            value={value}
            onChange={(e) => {
                setmensaje(e.target.value);
                handleChange(e.target.value)
                } } />
            <Btn onClick={() => {
                sendMessage(mensaje)
                setValue('')
                }} />
        </div>
    )
}