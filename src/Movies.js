import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const token = localStorage.getItem('access_token');
      console.log("Token recibido:", token);

      if (!token) {
        setMessage('❌ No hay token. Redirige al login.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/peliculas/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("Películas recibidas:", response.data);
        setMovies(response.data);
        setMessage('✅ Películas cargadas con éxito.');
      } catch (error) {
        setMessage('❌ Error al cargar películas. Verifica si el token es válido.');
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: 'black', color: 'white' }}>
      <h2>Películas Disponibles</h2>
      <p>{message}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ backgroundColor: '#1c1c1c', padding: '10px', borderRadius: '10px', width: '200px' }}>
            <h3>{movie.title}</h3>
            <p><strong>Género:</strong> {movie.genre}</p>
            <p><strong>Duración:</strong> {movie.duration} min</p>
            <p><strong>Calificación:</strong> {movie.rating}/10</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
