import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, rank }) => {
  return (
    <tr className="movie-row">
      <td className="rank-cell">{rank}</td>
      <td className="poster-cell">
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="table-poster-img" 
        />
      </td>
      <td className="title-cell">
        <div className="movie-title-main">{movie.title}</div>
        <div className="movie-year-sub">{movie.year}</div>
      </td>
      <td className="rating-cell">
        <span className="star-icon-yellow">★</span> {movie.rating}
      </td>
    </tr>
  );
};

export default MovieCard;