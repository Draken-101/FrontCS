import { Messages } from '../molecules/Messages'
import { SendMessage } from '../molecules/SendMessage'
import './Chat.css'

export function Chat(){
    return(
        <div className='Chat'> 
            <Messages/>
            <SendMessage/>
        </div>  
    )
}