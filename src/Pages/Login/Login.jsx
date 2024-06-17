import { useState } from "react";
import axios from "axios";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        localStorage.setItem('idNewContact', false);
        localStorage.setItem("idUser2", null);
        event.preventDefault();

        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/auth/singin', { username, password });

            if (response.status === 200) {
                localStorage.setItem("idUser1", response.data.idUser1);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("amigos", JSON.stringify(response.data.amigos));
                localStorage.setItem('profile', response.data.profilePictureUrl)
                localStorage.setItem("idUser2", JSON.stringify(response.data.amigos[0]));
                localStorage.setItem("token", response.data.token);
                console.log('Autenticación exitosa. Token:', response.data.token);
                navigate('/Chats')
            } else {
                setError('Error en la autenticación: ' + response.data.message);
            }
        } catch (error) {
            setError('Error en la solicitud: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Login">
            {error && <div className="error">{error}</div>}
            <form className="formLogin" onSubmit={handleLogin}>
                <h1 className="title">LOGIN</h1>
                <input
                    className="usernameBoton"
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="contraseñaBoton"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="loginBoton" type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
                <div>
                    <span>
                        Si no tienes cuenta
                        <Link to="/Register" style={{ marginLeft: '.5vw', color: "blue" }}>
                            <span>
                                Registrate
                            </span>
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
}
