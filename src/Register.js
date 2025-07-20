import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        username,
        password,
      });
      console.log(response.data);
      setMensaje('✅ Registro exitoso.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMensaje('❌ Error al registrar. Intenta con otro nombre de usuario.');
    }
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px', color: 'white' }}>
      <h2>Registro de usuario</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Registrarse</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
};

export default Register;
