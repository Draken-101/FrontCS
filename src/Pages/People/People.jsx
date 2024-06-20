import styled from 'styled-components';
import { Contacts } from "./components/organims/Contacts";
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../../context/userAuth';
const Container = styled.div`
    width:98vw;
    height: calc(100vh - 2vw);
    padding: 1vw;
    overflow: hidden;
    background-color: #081f34;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 90% 10%;
    .Volver{
        border: 0;
        border-radius: 0.15vw;
        font-size: 2.5vw;
        color: #081f34;
        width: 50%;
        margin-left: 25%;
        height: 80%;
        &:hover{
            cursor: pointer;
            color: #00e5ff;
            background-color: #000000;
        }
    }
`;

export function People() {
    const navigate = useNavigate();
    const { contacts, setContacts, allContacts, setUser2, isAuthenticated } = useUserContext();

    if (!isAuthenticated) {
        navigate("/Login")
    }
    return (
        <Container>
            <Contacts contacts={allContacts}
                setUser2={(user, data) => {
                    if (!contacts?.some(contact => contact?._id === user?.idUser2)) {
                        setContacts(prevContacts => [...prevContacts, data]);
                    }
                    setUser2(user);
                }} />
            <button className="Volver" onClick={() => navigate('/Chats')}>Volver</button>
        </Container>
    )
}


