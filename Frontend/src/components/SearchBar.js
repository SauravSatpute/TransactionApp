import React from 'react';

const SearchBar = ({ searchText, handleSearch }) => {
    return (
        <input
          type="text"
          placeholder="Search transactions"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
      );
    };

export default SearchBar;