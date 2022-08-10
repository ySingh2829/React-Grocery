import React from 'react';

export default function SearchItems({ search, handleSearch }) {
  return (
        <form className='search' onSubmit={e => e.preventDefault()}>
            <label>Search  </label>
            <input 
                type="text"
                placeholder="Search"
                value={search}    
                onChange={e => handleSearch(e.target.value)}
            />        
        </form>
    );
}
