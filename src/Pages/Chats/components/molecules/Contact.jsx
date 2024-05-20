import { ImgProfile } from '../atoms/ImgProfile';
import img from '../../../../assets/images/profile.jpg'
import './Contact.css'
import styled from 'styled-components';
const Div = styled.div`
    background-color: ${props => props.BC};
`;
export function Contact({onChat, idContact, id}){
    return(
        <Div BC={idContact == id ? '#878787' : '#626262'} className='ConainerContact' onClick={() => onChat(id)}>
            <div>
                <span>Nombre</span>
                <span className='lastMessage'>wawa</span>
            </div>
            <ImgProfile src={img}/>
            <div>
                <span className='lastTime'>4:44</span>
                <span className='checkmark'>✓✓</span>
            </div>
        </Div>
    )
}