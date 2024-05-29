
import { useEffect, useState } from 'react';
import { ProfileImg } from '../atoms/ProfileImg'
import { ProfilesUsables } from '../molecules/ProfilesUsables'
import './Configuracion.css'
import icon from "../../../../assets/images/boton-editar.png"
import axios from 'axios';
export function Configuracion({ setSection }) {
    const [profile, setProfile] = useState("");
    const [username, setUsername] = useState("");
    const [edit, setEdit] = useState(false);
    useEffect(() => {
        const getUsername = localStorage.getItem('username');
        const getProfile = localStorage.getItem('profile');

        setUsername(getUsername);
        setProfile(getProfile);
    }, []);

    const handlerEditName = () => {
        setEdit(true)
    }
    const changeUsername = (v) => {
        setUsername(v.target.value);
    }

    const submit = async (event) => {
        event.preventDefault();
        const idUser1 = localStorage.getItem("idUser1");
        const token = localStorage.getItem('token');
        const amigos = JSON.parse(localStorage.getItem('amigos'));
        const headers = { 'Content-Type': 'application/json', 'token': token };
        let objet = { idUser1: idUser1, amigos: amigos, url: profile, username: username };
        let body = JSON.stringify(objet);
        const updateUser = await axios.put("http://localhost:3000/users/postProfile", body, { headers });
        console.log(updateUser);
        setSection('')
    }
    return (
        <form className='Configuracion' onSubmit={submit}>
            <h1>
                {
                    edit ?
                        <input type="text" value={username} onChange={changeUsername} className='NameInput' />
                        :
                        username
                }
                <button type='button' onClick={handlerEditName}>
                    <img src={icon} />
                </button>
            </h1>

            <ProfileImg src={profile} />
            <h2>Elige el que mas te guste:</h2>
            <ProfilesUsables setProfileUser={(url) => setProfile(url)} />
            <button className='Save' type="submit" >Guardar</button>
        </form>
    )
}