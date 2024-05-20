import { ImgProfile } from '../atoms/ImgProfile';
import img from '../../../../assets/images/profile.jpg'
import './Contact.css'
export function Contact(){
    return(
        <div className='ConainerContact'>
            <ImgProfile src={img}/>
            <div>
                <span>Nombre</span>
                <span className='lastMessage'>wawa</span>
            </div>
            <div>
                <span className='lastTime'>4:44</span>
                <span className='checkmark'>✓✓</span>
            </div>
        </div>
    )
}