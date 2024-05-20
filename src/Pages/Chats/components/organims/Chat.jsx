import axios from 'axios';
import { Messages } from '../molecules/Messages'
import { SendMessage } from '../molecules/SendMessage'
import './Chat.css'
import { useEffect, useState } from 'react';

export function Chat({chatInUse}){
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/',)
        .then(res => {
            setData(res.data.Messages)
        })
    }, []);
    return(
        <div className='Chat'> 
            <Messages menssges={data}/>
            <SendMessage/>
        </div>  
    )
}