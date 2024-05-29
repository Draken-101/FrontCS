import styled from 'styled-components';
import './SubirEstado.css'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;
export function SubirEstado({ setSection }) {
    const textareaRef = useRef(null);
    const [text, setText] = useState('');

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

    const submit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json', 'token': token };
        const idUser1 = localStorage.getItem('idUser1');
        const amigos = JSON.parse(localStorage.getItem('amigos'));
        let objet = {
            idUser1: idUser1,
            amigos: amigos,
            mensaje: text
        };
        let body = JSON.stringify(objet);
        const Estado = await axios.post(`http://localhost:3000/estados/postEstados`, body, { headers });
        
        console.log(Estado.data.message, Estado.data.estado);
        setSection('Chat')
    }

    const handleChange = (event) => {
        setText(event.target.value);
    };
    return (
        <Container>
            <form className='SubirEstado' onSubmit={submit}>
                <h1>Subir Estado</h1>
                <textarea ref={textareaRef} name="" id="" value={text} onChange={handleChange} placeholder='Diles hola a tus amigos'> </textarea>
                <button type='submit'>Subir</button>
            </form>
        </Container>
    )
}