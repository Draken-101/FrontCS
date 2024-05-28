import styled from 'styled-components';
import { Card } from '../molecules/Card';
const Container = styled.div`
    width: 100%;
    height: fit-content;
    max-height: 100%;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1vw;
    scrollbar-width: none;
    -ms-overflow-style: none;
`;
export function Contacts({contacts}) {
    return (
        <Container>
            {
                contacts.map(contact => <Card data={contact} />)
            }
        </Container>
    )
}