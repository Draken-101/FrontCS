import styled from 'styled-components';

export const ProfileUsable = styled.img`
    width: calc(100% - 1vw);
    height: 9vw;
    object-fit: cover;
    transition: border 0s !important;
    border-radius: .5vw;
    border: ${props => props.selectedProfile ? ".15vw" : "0"} solid #00ffff;
    padding: .5vw;
    &:hover{
        cursor: pointer;
        border: .15vw solid #00ffff;
    }
`;