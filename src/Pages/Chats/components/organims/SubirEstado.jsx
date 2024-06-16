import './SubirEstado.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export function SubirEstado({ setSection }) {
    const textareaRef = useRef(null);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

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
        if (loading) return; 

        const token = localStorage.getItem('token');
        const idUser1 = localStorage.getItem('idUser1');
        const amigos = JSON.parse(localStorage.getItem('amigos'));
        const headers = {
            'Content-Type': 'application/json',
            'token': token
        };
        const objet = {
            idUser1: idUser1,
            multimedia: undefined,
            amigos: amigos,
            mensaje: text
        };
        const body = JSON.stringify(objet);

        try {
            //                            http://localhost:3000/estados/postEstados
            const res = await axios.post('http://localhost:3000/estados/postEstados', body, { headers });
            console.log(res.data.message, res.data.estado);
            setSection('Chat');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='SubirEstado'>
            <h1>Subir Estado</h1>
            <textarea
                ref={textareaRef}
                value={text}
                onChange={handleChange}
                placeholder='Diles hola a tus amigos'
            />
            <button type='button' onClick={submit} disabled={loading}>
                {loading ? 'Subiendo...' : 'Subir'}
            </button>
        </div>
    );
}
