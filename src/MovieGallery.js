import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MovieGallery.module.css';

const MovieGallery = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const token = localStorage.getItem('access_token');
      console.log("Token recibido:", token);

      try {
        const response = await axios.get('http://localhost:8000/api/peliculas/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("Películas recibidas:", response.data);
        setMovies(response.data);
      } catch (error) {
        console.error("Error al obtener películas:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={styles.gallery}>
      <h1>Películas Disponibles</h1>
      <div className={styles.grid}>
        {movies.map((movie) => {
          console.log("ID de película:", movie.id); // 👈 Verifica que cada película tenga un ID

          return (
            <div className={styles.card} key={movie.id}>
              <h2>{movie.titulo}</h2>
              <p><strong>Género:</strong> {movie.genero}</p>
              <p><strong>Duración:</strong> {movie.duracion} min</p>
              <p><strong>Calificación:</strong> {movie.calificacion}/10</p>
              <p><strong>Sinopsis:</strong> {movie.sinopsis}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieGallery;
