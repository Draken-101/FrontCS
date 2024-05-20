import { Message } from '../atoms/Message'
import './Messages.css'
export function Messages(){
    return(
        <div className='Messages'>
            <Message className='message-left'>Hola</Message>
            <Message className='message-right'>Hola</Message>
        </div>
    )
}