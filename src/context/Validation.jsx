import axios from "axios";

export async function ValidateUser(User1) {
    try {
        const headers = { 'Content-Type': 'application/json', 'token': User1.token };
        const body = JSON.stringify({ idUser1: User1.idUser1 });
        await axios.post('http://localhost:3000/validate', body, { headers });
        return true;
    } catch (error) {
        console.log(false);
        return false;
    }
}