import React from 'react';
import MovieCard from "./MovieCard";
import "./MovieGrid.css";

const MovieGrid = ({ movies }) => {
  return (
    <div className="movie-list-container">
      <table className="movie-table">
        <thead>
          <tr>
            <th className="col-rank">Rank</th>
            <th className="col-poster">Poster</th>
            <th className="col-title">Title & Year</th>
            <th className="col-rating">Rating</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} rank={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieGrid;