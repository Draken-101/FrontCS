import './SubirEstado.css'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
export function SubirEstado({ setSection }) {
    const textareaRef = useRef(null);
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };
    useEffect(() => {
        const updateTextareaHeight = () => {
            if (textareaRef.current) {
                const parentHeight = textareaRef.current.parentNode.clientHeight;
                const maxHeight = parentHeight * 0.8;
                textareaRef.current.style.maxHeight = `${maxHeight}px`;
                textareaRef.current.style.height = 'auto';
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }
        };

        updateTextareaHeight();

        const handleResize = () => {
            updateTextareaHeight();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [text]);

    const submit = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        };
        const idUser1 = localStorage.getItem('idUser1');
        const amigos = JSON.parse(localStorage.getItem('amigos'));
        let objet = {
            idUser1: idUser1,
            amigos: amigos,
            mensaje: text
        };
        let body = JSON.stringify(objet);

        try {
            const Estado = await axios.post(`http://localhost:3000/estados/postEstados`, body, { headers });
            console.log(Estado.data.message, Estado.data.estado);
        } catch (error) {
            console.log(error);
        }

        setSection('Chat')
    }
    return (
        <div className='SubirEstado'>
            <h1>Subir Estado</h1>
            <textarea ref={textareaRef} name="" id="" value={text} onChange={handleChange} placeholder='Diles hola a tus amigos'> </textarea>
            <button type='button' onClick={submit}>Subir</button>
        </div>
    )
}