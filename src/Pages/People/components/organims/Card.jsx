import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const C = styled.div`
    width: 100%;
    height: 20vw;
    background-color: gray;
    border-radius: 0.15vw;
    background-image: url(${props => props.image});
    background-size: cover;
    display: flex;
    align-items: end;
    div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: calc(100% - 2vw);
        height: calc(40% - 2vw);
        padding: 1vw;
        background-color: #000000ad;
    }
    button{
        font-size: 1.2vw;
        padding: .5vw 1vw;
        color: black;
        border: 0vw;
        border-radius: .2vw;
        background-color: #ffffff;
        &:hover{
            cursor: pointer;
            color: #00e5ff;
            background-color: #000000;
        }
    }
`;

export function Card({data}){
    const navigate = useNavigate();
    console.log(data);
    return(
        <C image={data.profilePictureUrl}>
            <div>
                <h2>{data.username}</h2>
                <button onClick={()=>{
                    localStorage.setItem('idNewContact', data._id)
                    navigate(`/Chats`)
                }}>Chatear</button>
            </div>
        </C>
    )
}