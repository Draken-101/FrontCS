import { Messages } from '../molecules/Messages'
import { SendMessage } from '../molecules/SendMessage'
import './Chat.css'

export function Chat({ sendMessage, estados, readMessages }) {

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
            <Messages readMessages={readMessages} />
            <SendMessage sendMessage={sendMessage}/>
        </div>
    )
}