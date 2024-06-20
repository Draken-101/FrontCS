
import { useEffect, useState } from 'react';
import { ProfileImg } from '../atoms/ProfileImg'
import { ProfilesUsables } from '../molecules/ProfilesUsables'
import './Configuracion.css'
import icon from "../../../../assets/images/boton-editar.png"
import axios from 'axios';
import { useUserContext } from '../../../../context/userAuth';
export function Configuracion({ setSection, User1 }) {
    const [profile, setProfile] = useState("");
    const [username, setUsername] = useState("");
    const [edit, setEdit] = useState(false);
    const { setUser1 } = useUserContext();
    useEffect(() => {

        setUsername(User1.username);
        setProfile(User1.profile);
    }, []);

    const handlerEditName = () => {
        setEdit(true)
    }
    const changeUsername = (v) => {
        setUsername(v.target.value);
    }

    const submit = async (event) => {
        event.preventDefault();
        const { idUser1, token, amigos } = User1;
        const headers = { 'Content-Type': 'application/json', 'token': token };
        
        setUser1({
            ...User1,
            username: username,
            profile: profile
        });
        let body = JSON.stringify({ idUser1: idUser1, amigos: amigos, url: profile, username: username });
        await axios.put("http://localhost:3000/users/updateProfile", body, { headers });
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