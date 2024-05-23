import axios from 'axios';
import { Messages } from '../molecules/Messages'
import { SendMessage } from '../molecules/SendMessage'
import './Chat.css'
import { useEffect, useState } from 'react';

export function Chat({chatInUse, idContact, sendMessage}){
    const [data, setData] = useState([]);
    // useEffect(async() => {
    // }, []);
    return(
        <div className='Chat'> 
            <Messages menssges={data}/>
            <SendMessage sendMessage={sendMessage} idChat={chatInUse} idContact={idContact}/>
        </div>  
    )
}