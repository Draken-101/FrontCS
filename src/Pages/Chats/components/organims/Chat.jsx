import axios from 'axios';
import { Messages } from '../molecules/Messages'
import { SendMessage } from '../molecules/SendMessage'
import './Chat.css'

export function Chat({ chatInUse, sendMessage, estados }) {
    return (
        <div className='Chat'>
            <div className='Estados'>
                {
                    estados ?
                    estados?.map(estado => <span>{estado.mensaje}</span>)
                    :
                    <span>Sin estados</span>
                }
            </div>
            <Messages mensajes={chatInUse?.mensajes} />
            <SendMessage sendMessage={sendMessage}/>
        </div>
    )
}