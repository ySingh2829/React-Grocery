import React from 'react';

export default function SearchItems({ handleSearch }) {
  return (
        <div className='search'>
            <label>Search  </label>
            <input type="text"    
                onChange={handleSearch}
            />        
        </div>
    );
}
