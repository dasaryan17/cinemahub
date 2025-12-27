import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Real-time search trigger
  };

  return (
    <div className="search-container-wrapper">
      <div className="search-bar-modern">
        <SearchIcon className="search-icon-mui" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search by title, year, or rating..."
          className="search-input-modern"
        />
        {query && (
          <button className="clear-btn" onClick={() => { setQuery(""); onSearch(""); }}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;