import styled from 'styled-components';
export const AddContact = styled.button`
    border: 0vw;
    cursor: pointer;
    font-size: 1.2vw;
    border-radius: 0.2vw;
    width: fit-content;
    height: 5vh;
    padding: .8vw 1.5vw;
    background-color: #00325f;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        object-fit: cover;
        width: 70%;
        filter: contrast(0%) brightness(100);
    }
    &:hover{
        background-color: #00549e;
    }
`;