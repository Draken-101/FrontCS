import { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link } from "react-router-dom";

export function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault(); 

        setError('');
        setLoading(true);

        if (username.trim() === '' || password.trim() === '') {
            setError('Username and password are required.');
            setLoading(false);
            return;
        }

        try {
        
            const response = await axios.post('http://localhost:3000/auth//singup', { username, password });

            if (response.status === 200) {
                console.log('Usuario registrado:', response.data.user);
        
            } else {
                setError('Error en el registro: ' + response.data.error);
            }
        } catch (error) {
            setError('Error en la solicitud: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Register">
            {error && <div className="error">{error}</div>}
            <form className="formulario" onSubmit={handleRegister}>
            <h1 className="title">REGISTER</h1>
                <input
                    className="username"
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="RegisterBoton" type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Register'}
                </button>
                <div>
                    <span>
                        Si ya tienes cuenta
                        <Link to="/Login" style={{ marginLeft: '.5vw', color:"blue" }}>
                            <span>
                                Inicia Sesion
                            </span>
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
}
