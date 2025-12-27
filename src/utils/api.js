// src/utils/api.js

// ---------- AUTH ----------
export const loginUser = async (email, password) => {
  await new Promise((res) => setTimeout(res, 500)); // Thoda delay for realism

  return {
    user: {
      id: 101,
      email,
      role: email === "admin@test.com" ? "admin" : "user",
      name: email.split('@')[0].toUpperCase(),
    },
    token: "fake-jwt-token-12345",
  };
};

// ---------- MOVIES DATA ----------
let movies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    poster: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29_poster.jpg",
  }
];

// ---------- GET ALL ----------
export const getTopMovies = async () => {
  return movies;
};

// ---------- SEARCH ----------
export const searchMovies = async (query) => {
  if (!query) return movies;
  return movies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );
};

// ---------- ADMIN ACTIONS ----------
export const addMovie = async (movieData) => {
  const newMovie = { 
    ...movieData, 
    id: Date.now(),
    rating: movieData.rating || 0 
  };
  movies = [newMovie, ...movies]; // Nayi movie top par dikhegi
  return newMovie;
};

export const getMovie = async (id) => {
  return movies.find((m) => m.id === Number(id));
};

export const updateMovie = async (id, updatedMovie) => {
  movies = movies.map((m) =>
    (m.id === Number(id) ? { ...m, ...updatedMovie } : m)
  );
  return { success: true };
};

// Maine ye delete function add kiya hai
export const deleteMovie = async (id) => {
  movies = movies.filter((m) => m.id !== Number(id));
  return { success: true };
};