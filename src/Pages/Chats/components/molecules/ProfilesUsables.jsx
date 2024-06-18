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
            setSelected(localStorage.getItem('profile'));
            const headers = { 'Content-Type': 'application/json'};
            const Profiles = await axios.get(`http://localhost:3000/profile`, { headers });
            console.log(Profiles.data);
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
                profiles?.map(p => <ProfileUsable key={p._id} onClick={() => changeProfile(p.url)} selectedProfile={p.url === selected} src={p.url}/>)
            }
        </Container>
    )
}