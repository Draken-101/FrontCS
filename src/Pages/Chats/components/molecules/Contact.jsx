import { ImgProfile } from '../atoms/ImgProfile';
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
export function Contact({ changeChat, data, idContact, contactOnChat, lastMessage, setSection, readMessages }) {
    const [estado, setEstado] = useState(false);

    useEffect(() => {
        if (data.estados !== undefined) {
            setEstado(true)
        }
    }, [data.estados]);

    const handleContainerClick = () => {
        readMessages(idContact);
        setEstado(false);
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
            <ImgProfile src={data.profilePictureUrl} estado={estado ? '.15vw solid #14c500' : '.15vw  solid #001440'} />
            <div>
                <span className='lastTime'>{lastMessage?.date}</span>
                <span className={`checkmark ${data.noReads > 0 ? "noReads" : ""}`}>{
                    lastMessage
                        ?
                        data.noReads > 0
                            ? data.noReads
                            :
                            "✓✓"
                        :
                        'Sin Mensajes'
                }</span>
            </div>
        </Div>
    )
}