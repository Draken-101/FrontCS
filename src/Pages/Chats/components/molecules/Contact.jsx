import { ImgProfile } from '../atoms/ImgProfile';
import img from '../../../../assets/images/profile.jpg'
import './Contact.css'
import styled from 'styled-components';
import { useEffect, useState } from 'react';
const Div = styled.div`
    position: relative;
    z-index: 1;
    background-color: ${props => props.BC};
    img{
        position: relative;
        z-index: 10;
    }
`;
export function Contact({ changeChat, data, idContact, contactOnChat, lastMessage, setSection }) {
    const [estado, setEstado] = useState(false);

    useEffect(() => {
        const idUser1 = localStorage.getItem('idUser1');
        if (data?.estados.length > 0) {
            const tieneVista = data.estados?.some(e => e.viwers.includes(idUser1));
            if (!tieneVista) {
                setEstado(true);
            }
        }
    }, [data?.estados]);

    const handleClick = (event) => {
        event.stopPropagation();
        setSection('Estados')
        let identificadores = data.estados?.map(e => {
            return e.idEstado;
        })

        identificadores = identificadores.filter(e => e !== null || e !== undefined);
        console.log(identificadores);
        setEstado(false);
    };

    const handleContainerClick = () => {
        changeChat(idContact);
    };
    return (
        <Div BC={contactOnChat == idContact ? '#878787' : '#626262'} className='ConainerContact' onClick={() => {
            handleContainerClick()
            setSection('Chat')
        }}>
            <div>
                <span>{data.username}</span>
                <span className='lastMessage'>{lastMessage?.mensaje}</span>
            </div>
            <ImgProfile src={data.profilePictureUrl} estado={estado ? '.15vw solid #14c500' : '.15vw  solid #001440'} onClick={handleClick} />
            <div>
                <span className='lastTime'>{lastMessage?.date}</span>
                <span className='checkmark'>{lastMessage ? "✓✓" : 'Sin Mensajes'}</span>
            </div>
        </Div>
    )
}