import { useEffect, useRef } from 'react';
import { Message } from '../atoms/Message'
import './Messages.css'
export function Messages({ mensajes }) {
    const containerRef = useRef(null);
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [mensajes]);

    return (
        <div ref={containerRef} className='Messages'>
            {
                mensajes?.map(mensaje => {
                    if (mensaje?.idUser === localStorage.getItem('idUser1')) {
                        return (
                            <Message key={mensaje?._id} className='message-right'>
                                {mensaje?.mensaje}
                                <span>
                                    {mensaje?.date}
                                </span>
                            </Message>
                        )
                    } else {
                        return (
                            <Message key={mensaje?._id} className='message-left'>
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