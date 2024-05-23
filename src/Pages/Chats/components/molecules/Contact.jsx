import { ImgProfile } from '../atoms/ImgProfile';
import img from '../../../../assets/images/profile.jpg'
import './Contact.css'
import styled from 'styled-components';
const Div = styled.div`
    background-color: ${props => props.BC};
`;
export function Contact({ data, onChat, idContact, id, estado }){
    return(
        <Div BC={idContact == id ? '#878787' : '#626262'} className='ConainerContact' onClick={() => onChat()}>
            <div>
                <span>{data.username}</span>
                <span className='lastMessage'>wawa</span>
            </div>
            <ImgProfile src={data.profilePictureUrl} estado={estado ? '.15vw solid #14c500' : '.15vw  solid #001440'} onClick={() => {}}/>
            <div>
                <span className='lastTime'>4:44</span>
                <span className='checkmark'>✓✓</span>
            </div>
        </Div>
    )
}