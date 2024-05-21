import styled from 'styled-components';
export const ConfigBtn = styled.button`
    border: 0vw;
    cursor: pointer;
    border-radius: 0.2vw;
    width: 5vh;
    height: 5vh;
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