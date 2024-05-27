import axios from 'axios';
import { Messages } from '../molecules/Messages'
import { SendMessage } from '../molecules/SendMessage'
import './Chat.css'

export function Chat({ chatInUse, sendMessage }) {
    return (
        <div className='Chat'>
            <Messages mensajes={chatInUse?.mensajes} />
            <SendMessage sendMessage={sendMessage}/>
        </div>
    )
}