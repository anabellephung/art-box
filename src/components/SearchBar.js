import React from 'react';

export default function SearchBar(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <label htmlFor="searchterm">
        Search Gallery:
      </label>
      <span className="search">
        <input
          type="text"
          name="searchterm"
          id="searchterm" 
          value={props.value}
          onChange={props.handleChange}
        />
        <input
          type="submit"
          className="fas fa-search"
          aria-label="search"
          value="&#xf002;"
        />
      </span>
    </form>
  );
}