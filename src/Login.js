import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ setToken }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegistering
      ? 'http://localhost:8000/api/register/'
      : 'http://localhost:8000/api/login/';

    try {
      const response = await axios.post(url, {
        username,
        password
      });

      if (isRegistering) {
        setMessage('✅ Registro exitoso. Ahora puedes iniciar sesión.');
      } else {
        const { access, refresh } = response.data;

        // Guardar tokens en localStorage
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        // Establecer token para mostrar galería
        setToken(access);

        setMessage('✅ Inicio de sesión exitoso.');
        console.log('Token recibido:', access);

        // Redirigir (opcional, dependiendo de rutas configuradas)
        navigate('/movies');
      }
    } catch (error) {
      setMessage('❌ Hubo un error. Verifica tus datos.');
    }
  };

  return (
    <div>
      <h1 className="cecyflix-logo">CECYFLIX</h1>
      <h2>{isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {isRegistering ? 'Registrarse' : 'Ingresar'}
        </button>
      </form>
      <p>{message}</p>
      <p>
        {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
        <span
          onClick={() => setIsRegistering(!isRegistering)}
          style={{ color: '#e50914', cursor: 'pointer' }}
        >
          {isRegistering ? 'Inicia sesión' : 'Regístrate'}
        </span>
      </p>
    </div>
  );
};

export default Login;
