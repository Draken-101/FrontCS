import axios from "axios";

export async function ValidateUser() {
    try {
        await axios.post('http://localhost:3000/validate', body, { headers });
        return true;
    } catch (error) {
        return false;
    }
}