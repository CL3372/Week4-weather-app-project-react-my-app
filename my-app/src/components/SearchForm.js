import { useState } from "react";

function SearchForm({ onSearch, isLoading }) {
  const [city, setCity] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = city.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        id="city-search"
        className="search-form-input"
        name="city"
        type="text"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Enter a city..."
        aria-label="City name"
        autoComplete="address-level2"
        required
      />
      <button
        type="submit"
        className="search-form-button rainbow-button"
        disabled={isLoading}
      >
        <span className="button-label">
          {isLoading ? "Searching..." : "Search"}
        </span>
      </button>
    </form>
  );
}

export default SearchForm;
