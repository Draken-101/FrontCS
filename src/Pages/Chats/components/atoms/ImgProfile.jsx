import styled from 'styled-components';
export const ImgProfile = styled.img`
    width: 4vw;
    height: 4vw;
    border-radius: 50%;
    object-fit: cover;
    border: ${props => props.estado} solid Green;
    cursor: pointer;
`;