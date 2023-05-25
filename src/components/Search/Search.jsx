import React from 'react'
import './Search.css'
import SearchIcon from '@mui/icons-material/Search';

export const Search = ({ handleSubmit, setQuery }) => {
  return (
    <div>
      <form action="" id='search-form' onSubmit={handleSubmit}>
        <div class="input-group">
          <div className='icon-container'>
            <SearchIcon sx={{ fontSize: 28 }}/>
          </div>
          <input type='search' 
            id='' 
            class='search-input' 
            placeholder='Explore images...' 
            onChange={(e) => setQuery(e.target.value)}/>

          <button 
            type='submit' 
            class='submit-button' 
            onClick={(e) => handleSubmit(e)}>
            Search
          </button>
        </div>

      </form>
    </div>
  )
}
