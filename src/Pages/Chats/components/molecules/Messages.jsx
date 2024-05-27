import { Message } from '../atoms/Message'
import './Messages.css'
export function Messages({ mensajes }) {
    return (
        <div className='Messages'>
            {
                mensajes?.map(mensaje => {
                    if (mensaje?.idUser === localStorage.getItem('idUser')) {
                        return (
                            <Message className='message-left'>
                                {mensaje?.mensaje}
                                <span>
                                    {mensaje?.date}
                                </span>
                            </Message>
                        )
                    } else {
                        return (
                            <Message className='message-right'>
                                {mensaje?.mensaje}
                                <span>
                                    {mensaje?.date}
                                </span>
                            </Message>
                        )
                    }

                })
            }
        </div>
    )
}