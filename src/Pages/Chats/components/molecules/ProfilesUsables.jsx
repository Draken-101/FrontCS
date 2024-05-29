import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProfileUsable } from '../atoms/ProfileUsable';
const Container = styled.div`
  width: 80%;
  height: fit-content;
  padding: 1vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1vw;
`;
export function ProfilesUsables({ setProfileUser }) {
    const [profiles, setProfiles] = useState([]);
    const [selected, setSelected] = useState('');
    useEffect(() => {
        const getProfiles = async () => {
            const idUser1 = localStorage.getItem("idUser1");
            const token = localStorage.getItem('token');
            setSelected(localStorage.getItem('profile'));
            const headers = { 'Content-Type': 'application/json', 'token': token };
            let objet = { idUser1: idUser1 };
            let body = JSON.stringify(objet);
            const Profiles = await axios.post(`http://localhost:3000/profile/getProfiles`, body, { headers });
            setProfiles(Profiles.data)
        }

        getProfiles()
    }, []);

    const changeProfile = (url) => {
        localStorage.setItem('profile', url)
        setSelected(url);
        setProfileUser(url)
    }
    return (
        <Container>
            {
                profiles?.map(p => <ProfileUsable onClick={() => changeProfile(p.url)} Selected={p.url === selected} src={p.url}/>)
            }
        </Container>
    )
}